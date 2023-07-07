let products = {
  data: [
    {
      productName: "Dr. Anjina PPA",
      category: "Topwear",
      price: " MD, MHC , B.A",
    },
    {
      productName: "Dr. Srujan Agarwal",
      category: "Bottomwear",
      price: "MMBS, MD(DPM)",
    },
    {
      productName: "Dr. Ahana Ghosh",
      category: "Watch",
      price: "MA in Clinical Psychology",
    },
    {
      productName: "Dr. Summit Patel",
      category: "Watch",
      price: "MA in Clinical Psychology",
    },
    {
      productName: "Dr. Smrita Chettri",
      category: "Watch",
      price: "MA in Clinical Psychology",
    },
    {
      productName: "Dr. Smrita Patil",
      category: "Watch",
      price: "MA in Clinical Psychology",
    },
    {
      productName: "Dr.Yogendra Singh",
      category: "Jacket",
      price: "MBBS & MD in Psychiatry",
    },
    {
      productName: "Dr. Yogesh Nath",
      category: "Bottomwear",
      price: "PHD in psychology",
      image: "pink-trousers.jpg",
    },
    {
      productName: "Dr. Amrith Nath",
      category: "Bottomwear",
      price: "PHD in psychology",
      image: "pink-trousers.jpg",
    },
    {
      productName: "Dr. Rohit Sharma",
      category: "Bottomwear",
      price: "MA, MBA, BBA",
      image: "pink-trousers.jpg",
    },
    {
      productName: "Dr. Nishi Prantik Mahanta",
      category: "Jacket",
      price: "MD(DPM), MB in Human Psychology",
      image: "brown-jacket.jpg",
    },
    {
      productName: "Dr. Deeksha Reddy",
      category: "Topwear",
      price: " MD, MHC , B.A",
    },
    {
      productName: "Dr. Rishab Kumar",
      category: "Jacket",
      price: "MD(DPM), Mental Health",
      image: "brown-jacket.jpg",
    },
    {
      productName: "Dr. Chandranath Yadav",
      category: "MA in Psychology",
      price: "49",
      image: "comfy-gray-pants.jpg",
    },
  ],
};
for (let i of products.data) {
  //Create Card
  let card = document.createElement("div");
  //Card should have category and should stay hidden initially
  card.classList.add("card", i.category, "hide");
  //image div
  //img tag
  //container
  let container = document.createElement("div");
  container.classList.add("container");
  //product name
  let name = document.createElement("h5");
  name.classList.add("product-name");
  name.innerText = i.productName.toUpperCase();
  container.appendChild(name);
  //price
  let price = document.createElement("h6");
  price.innerText = "Speciality " + i.price;
  container.appendChild(price);
  card.appendChild(container);
  document.getElementById("products").appendChild(card);
}
//parameter passed from button (Parameter same as category)
function filterProduct(value) {
  //Button class code
  let buttons = document.querySelectorAll(".button-value");
  buttons.forEach((button) => {
    //check if value equals innerText
    if (value.toUpperCase() == button.innerText.toUpperCase()) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
  //select all cards
  let elements = document.querySelectorAll(".card");
  //loop through all cards
  elements.forEach((element) => {
    //display all cards on 'all' button click
    if (value == "all") {
      element.classList.remove("hide");
    } else {
      //Check if element contains category class
      if (element.classList.contains(value)) {
        //display element based on category
        element.classList.remove("hide");
      } else {
        //hide other elements
        element.classList.add("hide");
      }
    }
  });
}
//Search button click
document.getElementById("search").addEventListener("click", () => {
  //initializations
  let searchInput = document.getElementById("search-input").value;
  let elements = document.querySelectorAll(".product-name");
  let cards = document.querySelectorAll(".card");
  //loop through all elements
  elements.forEach((element, index) => {
    //check if text includes the search value
    if (element.innerText.includes(searchInput.toUpperCase())) {
      //display matching card
      cards[index].classList.remove("hide");
    } else {
      //hide others
      cards[index].classList.add("hide");
    }
  });
});
//Initially display all products
window.onload = () => {
  filterProduct("all");
};
