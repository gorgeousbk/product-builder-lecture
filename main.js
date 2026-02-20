const generateBtn = document.getElementById('generate');
const numbersContainer = document.getElementById('numbers');
const themeBtn = document.getElementById('theme-btn');

// Theme toggle logic
themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeButton(newTheme);
});

function updateThemeButton(theme) {
    themeBtn.textContent = theme === 'dark' ? '☀️ 라이트 모드' : '🌙 다크 모드';
}

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeButton(savedTheme);

function getColorClass(number) {
    if (number <= 10) return 'range-1';
    if (number <= 20) return 'range-11';
    if (number <= 30) return 'range-21';
    if (number <= 40) return 'range-31';
    return 'range-41';
}

function createNumberDiv(number) {
    const numberDiv = document.createElement('div');
    numberDiv.classList.add('number');
    // We don't add the color class yet for the "drawing" state
    return numberDiv;
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

generateBtn.addEventListener('click', async () => {
    generateBtn.disabled = true;
    numbersContainer.innerHTML = '';
    const numbers = new Set();
    
    // Generate all numbers first
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);
    
    let bonusNumber;
    do {
        bonusNumber = Math.floor(Math.random() * 45) + 1;
    } while (numbers.has(bonusNumber));

    // Draw main numbers one by one
    for (let i = 0; i < sortedNumbers.length; i++) {
        const num = sortedNumbers[i];
        const ball = createNumberDiv();
        ball.classList.add('drawing');
        numbersContainer.appendChild(ball);
        
        await sleep(600); // Wait while "spinning"
        
        ball.classList.remove('drawing');
        ball.classList.add('reveal');
        ball.classList.add(getColorClass(num));
        ball.textContent = num;
        
        await sleep(200); // Small pause before next ball
    }

    // Draw separator
    const separator = document.createElement('div');
    separator.classList.add('bonus-separator');
    separator.textContent = '+';
    numbersContainer.appendChild(separator);
    await sleep(100);
    separator.classList.add('visible');

    // Draw bonus number
    const bonusBall = createNumberDiv();
    bonusBall.classList.add('drawing');
    numbersContainer.appendChild(bonusBall);
    
    await sleep(800); // Bonus ball takes a bit longer
    
    bonusBall.classList.remove('drawing');
    bonusBall.classList.add('reveal');
    bonusBall.classList.add(getColorClass(bonusNumber));
    bonusBall.textContent = bonusNumber;

    generateBtn.disabled = false;
});