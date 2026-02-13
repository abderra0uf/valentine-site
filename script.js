const questions = [
    { q: "Where did we go on a date to a restaurant named...", a: "dolce", hint: "It starts with a D." },
    { q: "What was the name of one of the cocktails we ordered?", a: "blue lagon", hint: "Think of a blue body of water." },
    { q: "You revealed your gifts for me: a shirt and a...", a: "wallet", hint: "Something for your cards." },
    { q: "I brought you three things: skincare, headphones, and a...", a: "mirror", hint: "To see your reflection." },
    { q: "On the back of the letter I gave you, what were the three words?", a: "i love us", hint: "Subject, Verb, Object." },
    { q: "The final question: Will you be my Valentine? (Type: 'yes i wanna be your valentine')", a: "yes i wanna be your valentine", hint: "Type: 'yes i wanna be your valentine'" }
];

let currentStep = 0;
const tiles = document.querySelectorAll('.puzzle-tile');
const photo = document.getElementById('us-photo');
const inputField = document.getElementById('answer-input');
const submitBtn = document.getElementById('submit-btn');
const errorMsg = document.getElementById('error-msg');
const hintToggle = document.getElementById('hint-toggle');

function updateVisuals() {
    const totalSteps = questions.length;
    let progress = currentStep / totalSteps; 

    const gray = 100 - (progress * 100);
    const blur = 18 - (progress * 18);
    
    photo.style.filter = `grayscale(${gray}%) blur(${blur}px)`;
}

function checkAnswer() {
    const userAns = inputField.value.toLowerCase().trim();
    const correctAns = questions[currentStep].a.toLowerCase();
    const isLast = currentStep === questions.length - 1;

    if (userAns.includes(correctAns) || (isLast && userAns === correctAns)) {
        if (currentStep < tiles.length) {
            tiles[currentStep].classList.add('tile-hidden');
        }
        
        currentStep++;
        updateVisuals();
        updateUI();
    } else {
        inputField.classList.add('shake');
        errorMsg.innerText = "Try again...";
        errorMsg.style.opacity = '1';
        setTimeout(() => inputField.classList.remove('shake'), 400);
        
        if (isLast && userAns.length > 0) {
            provideIncrementalHint(userAns, correctAns);
        }
    }
}

function provideIncrementalHint(input, target) {
    const targetWords = target.split(' ');
    const inputWords = input.split(' ');
    let hintStr = "Hint: ";
    for (let i = 0; i < targetWords.length; i++) {
        if (inputWords[i] === targetWords[i]) {
            hintStr += targetWords[i] + " ";
        } else {
            hintStr += "[...] ";
            break;
        }
    }
    errorMsg.innerText = hintStr;
}

function updateUI() {
    if (currentStep >= questions.length) {
        document.body.innerHTML = `
            <div class="final-screen">
                <h1 class="serif italic final-text fade-in">Forever it is.</h1>
            </div>
        `;
        return;
    }
    document.getElementById('q-count').innerText = `Memory 0${currentStep + 1} // 06`;
    document.getElementById('question-text').innerText = questions[currentStep].q;
    inputField.value = '';
    errorMsg.style.opacity = '0';
}

hintToggle.onclick = () => {
    errorMsg.innerText = questions[currentStep].hint;
    errorMsg.style.opacity = '1';
};

submitBtn.onclick = checkAnswer;
inputField.addEventListener('keypress', (e) => { if(e.key === 'Enter') checkAnswer(); });

// Initial setup
updateUI();
updateVisuals();