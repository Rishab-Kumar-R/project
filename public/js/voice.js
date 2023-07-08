const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(sentence) {
    const text_speak = new SpeechSynthesisUtterance(sentence);

    text_speak.rate = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    var day = new Date();
    var hr = day.getHours();

    if(hr >= 0 && hr < 12) {
        speak("Good Morning User");
    }

    else if(hr == 12) {
        speak("Good noon User");
    }

    else if(hr > 12 && hr <= 17) {
        speak("Good Afternoon User");
    }

    else {
        speak("Good Evening USer");
    }
}

window.addEventListener('load', ()=>{
    speak("Activating MCare");
    speak("Going online");
    wishMe();
})

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    content.textContent = transcript;
    speakThis(transcript.toLowerCase());
}

btn.addEventListener('click', ()=>{
    recognition.start();
})

function speakThis(message) {
    const speech = new SpeechSynthesisUtterance();

    speech.text = "I did not understand what you said please try again";

    if(message.includes('hey') || message.includes('hello')) {
        const finalText = "Hello User";
        speech.text = finalText;
    }

    else if(message.includes('how are you')) {
        const finalText = "I am fine Use tell me how can i help you to provide information about Mental Health Care.";
        speech.text = finalText;
    }

    else if(message.includes('name')) {
        const finalText = "My name is MCare";
        speech.text = finalText;
    }

    else if(message.includes('What is this website about?')) {
        const finalText = "This website will help you to provide information about Counselors, Therapists, Doctors.";
        speech.text = finalText;
    }
    else if(message.includes('How to book a Session')) {
        const finalText = "To Book a Session you will have to buy our Subscription plans for best recommendation of specialists";
        speech.text = finalText;
    }

     else if(message.includes('Tpes of plans')) {
        const finalText = "We provide Monthly and Annually based Subscription plans";
        speech.text = finalText;
    }

    else if(message.includes('What is Trauma?')) {
        const finalText = "Trauma can make you more vulnerable to developing mental health problems. It can also directly cause post-traumatic stress disorder (PTSD).";
        speech.text = finalText;
    }
    else if(message.includes('What is Stress')) {
        const finalText = "Stress has a psychological impact that can manifest as irritability or aggression, a feeling of loss of control, insomnia, fatigue or exhaustion, sadness or tears, concentration or memory problems, or more.";
        speech.text = finalText;
    }

    else if(message.includes('open google')) {
        window.open("https://google.com", "_blank");
        const finalText = "Opening Google";
        speech.text = finalText;
    }

    else if(message.includes('open instagram')) {
        window.open("https://instagram.com", "_blank");
        const finalText = "Opening instagram";
        speech.text = finalText;
    }

    else if(message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what i found on internet regarding " + message;
        speech.text = finalText;
    }

    else if(message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`, "_blank");
        const finalText = "This is what i found on wikipedia regarding " + message;
        speech.text = finalText;
    }

    else if(message.includes('time')) {
        const time = new Date().toLocaleString(undefined, {hour: "numeric", minute: "numeric"})
        const finalText = time;
        speech.text = finalText;
    }

    else if(message.includes('date')) {
        const date = new Date().toLocaleString(undefined, {month: "short", day: "numeric"})
        const finalText = date;
        speech.text = finalText;
    }

    else if(message.includes('calculator')) {
        window.open('Calculator:///')
        const finalText = "Opening Calculator";
        speech.text = finalText;
    }

    else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on google";
        speech.text = finalText;
    }

    speech.volume = 1;
    speech.pitch = 1;
    speech.rate = 1;

    window.speechSynthesis.speak(speech);
}