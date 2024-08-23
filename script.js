const questions = [
    { text: "Are you looking for an internship?", type: "yesno" },
    { text: "Would you like to sign up for daily updates or weekly updates?", type: "frequency" },
    { text: "What is your email?", type: "email" }
];
let answers = [];
let currentQuestion = 0;

const appElement = document.getElementById('app');
const consoleElement = document.getElementById('console');
const userInputElement = document.getElementById('userInput');
const summaryElement = document.getElementById('summary');

function addTextToConsole(text, isUserInput = false) {
    const p = document.createElement('p');
    p.textContent = isUserInput ? `> ${text}` : text;
    consoleElement.appendChild(p);
    consoleElement.scrollTop = consoleElement.scrollHeight;
}

function processInput(input) {
    if (!validateInput(input, questions[currentQuestion].type)) {
        addTextToConsole("Invalid input. Please try again.");
        return;
    }

    answers.push(input);
    addTextToConsole(input, true);
    currentQuestion++;

    if (currentQuestion < questions.length) {
        addTextToConsole(questions[currentQuestion].text);
    } else {
        addTextToConsole("Thank you for completing the questions.");
        userInputElement.style.display = 'none';
        displaySummary();
    }
}

function validateInput(input, type) {
    if (type === 'email') {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
    } else if (type === 'yesno') {
        return ['yes', 'no'].includes(input.toLowerCase());
    } else if (type === 'frequency') {
        return ['daily', 'weekly'].includes(input.toLowerCase());
    }
    return true;
}

function displaySummary() {
    const totalInternships = 591;
    const internshipsThisWeek = 75;
    summaryElement.innerHTML = `
        <p>Found ${totalInternships} internships total.</p>
        <p>Found ${internshipsThisWeek} internships this week.</p>
    `;
}

userInputElement.addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && this.value.trim()) {
        processInput(this.value.trim());
        this.value = '';
    }
});

// Handle virtual keyboard
const originalHeight = window.innerHeight;
function handleResize() {
    if (window.innerHeight < originalHeight) {
        // Keyboard is likely visible
        appElement.style.height = `${window.innerHeight}px`;
        appElement.style.fontSize = 'calc(14px + 0.5vw)';  // Reduce font size when keyboard is visible
    } else {
        appElement.style.height = '100%';
        appElement.style.fontSize = 'calc(16px + 1vw)';  // Restore original font size
    }
    consoleElement.scrollTop = consoleElement.scrollHeight;
}

window.addEventListener('resize', handleResize);

userInputElement.addEventListener('focus', () => {
    setTimeout(handleResize, 300);  // Delay to ensure keyboard is fully visible
});

userInputElement.addEventListener('blur', () => {
    setTimeout(handleResize, 300);  // Delay to ensure keyboard is fully hidden
});

// Start with the first question
addTextToConsole(questions[currentQuestion].text);