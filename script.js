const questions = [
    { text: "Are you looking for an internship?", type: "yesno" },
    { text: "Would you like to sign up for daily updates or weekly updates?", type: "frequency" },
    { text: "What is your email?", type: "email" }
];
let answers = [];
let currentQuestion = 0;

document.getElementById('userInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && this.value) {
        processInput(this.value.trim());
        this.value = ''; // Clear input after enter
    }
});

function processInput(input) {
    if (!validateInput(input, questions[currentQuestion].type)) {
        addTextToConsole("Invalid input. Please try again.", false);
        return;
    }

    answers.push(input);
    addTextToConsole(input, true);
    currentQuestion++;

    if (currentQuestion < questions.length) {
        typeQuestion(questions[currentQuestion].text);
    } else {
        addTextToConsole("Thank you for completing the questions.", false);
        document.getElementById('userInput').style.display = 'none'; // Hide input after completion
    }
}

function typeQuestion(question) {
    let display = '> ' + question;
    addTextToConsole(display, false);
}

function addTextToConsole(text, addSpace) {
    const consoleDiv = document.getElementById('console');
    consoleDiv.innerHTML += text + '<br>' + (addSpace ? '<br>' : '');
    consoleDiv.scrollTop = consoleDiv.scrollHeight; // Scroll to bottom
}

function validateInput(input, type) {
    if (type === 'email') {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(input);
    } else if (type === 'yesno') {
        return input.toLowerCase() === 'yes' || input.toLowerCase() === 'no';
    } else if (type === 'frequency') {
        return input.toLowerCase() === 'daily' || input.toLowerCase() === 'weekly';
    }
    return true; // Always valid for other text inputs
}

typeQuestion(questions[currentQuestion].text); // Start with the first question
