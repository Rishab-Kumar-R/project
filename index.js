if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
const User = require("./models/userModel");
const generateToken = require("./utils/generateToken");
const asyncHandler = require("express-async-handler");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
require("./config/googleAuth");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const protect = require("./middleware/authMiddleware");
const authenticateUser = require("./middleware/userMiddleware");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const PORT = process.env.PORT;
const app = express();

// connect to database
connectDB();

// parse incoming requests with JSON payloads
app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));

// set the view engine to ejs
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

// parse incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

// middleware to check if user is logged in
const requireLogin = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }
  next();
};

const requireDoctor = (req, res, next) => {
  const user = User.findById(req.session.userId);
  if (user.role !== "As Specialists") {
    return res.redirect("/login");
  } else {
    next();
  }
};

// static page
app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/register", (req, res) => {
  res.render("register");
});
app.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { username, email, gender, password, role } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.render("register", { error: "User already exists" });
    } else {
      const user = await User({
        username,
        email,
        password,
        gender,
        role,
      });
      await user.save();
      req.session.user_id = user._id;
      generateToken(res, user._id);
      res.redirect("/home");
    }
  })
);

app.get("/login", (req, res) => {
  res.render("login");
});
app.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.comparePassword(password))) {
      req.session.userId = user._id;
      generateToken(res, user._id);
      res.redirect("/home");
    } else {
      res.render("login", { error: "Invalid email or password" });
    }
  })
);

// google Authentication using Passport.js
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/home",
    failureRedirect: "/login",
  })
);

// static page
app.get("/home", requireLogin, (req, res) => {
  res.render("home");
});

app.get("/home/ADHD", requireLogin, (req, res) => {
  res.render("user/ADHD");
});
app.get("/home/depression", requireLogin, (req, res) => {
  res.render("user/depression");
});
app.get("/home/relationship", requireLogin, (req, res) => {
  res.render("user/relationship");
});
app.get("/home/anxiety-and-stress", requireLogin, (req, res) => {
  res.render("user/anxiety");
});
app.get("/home/grief-and-loss", requireLogin, (req, res) => {
  res.render("user/grief");
});
app.get("/home/trauma", requireLogin, (req, res) => {
  res.render("user/trauma");
});
app.get("/home/LGBTQIA", requireLogin, (req, res) => {
  res.render("user/LGBTQIA");
});
app.get("/home/psychosis", requireLogin, (req, res) => {
  res.render("user/psychosis");
});

app.get("/doctor/dashboard", requireLogin, requireDoctor, (req, res) => {
  res.render("doctor/dashboard");
});
app.get("/doctor/profile", requireLogin, requireDoctor, (req, res) => {
  res.render("doctor/profile");
});
app.get("/doctor/session", requireLogin, requireDoctor, (req, res) => {
  res.render("doctor/session");
});

app.get("/counselors", requireLogin, (req, res) => {
  res.render("navPages/counselors");
});

// static page
app.get("/how-it-works", requireLogin, (req, res) => {
  res.render("navPages/howItWorks");
});

// static page
app.get("/contents", requireLogin, (req, res) => {
  res.render("navPages/contents");
});
app.get("/contents/page-2", requireLogin, (req, res) => {
  res.render("navPages/contents-2");
});

app.get("/online-councelling", requireLogin, (req, res) => {
  res.render("navPages/onlineCouncelling");
});

app.get("/support", requireLogin, (req, res) => {
  res.render("navPages/support");
});
app.get("/support/voice-assistant", requireLogin, (req, res) => {
  res.render("navPages/voiceAssistant");
});

app.get("/accounts", requireLogin, (req, res) => {
  res.render("navPages/accounts");
});
app.get("/user/profile", requireLogin, (req, res) => {
  res.render("user/profile");
});
app.get("/user/chats", requireLogin, (req, res) => {
  res.render("user/chats");
});
app.get("/user/chat/comments", requireLogin, (req, res) => {
  res.render("user/comments");
});
app.get("/user/medication", requireLogin, (req, res) => {
  res.render("user/medication");
});
app.get("/user/session", requireLogin, (req, res) => {
  res.render("user/session");
});

app.get("/schedule-your-session", requireLogin, (req, res) => {
  res.render("body/scheduleYourSession");
});

app.get("/payments", requireLogin, (req, res) => {
  res.render("navPages/payments");
});

app.post("/logout", (req, res) => {
  req.session.destroy();
  res.clearCookie("jwt");
  res.redirect("/");
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
