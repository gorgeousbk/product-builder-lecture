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
    themeBtn.textContent = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
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
    numberDiv.classList.add(getColorClass(number));
    numberDiv.textContent = number;
    return numberDiv;
}

generateBtn.addEventListener('click', () => {
    numbersContainer.innerHTML = '';
    const numbers = new Set();
    
    // Generate 6 main numbers
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    
    // Sort and display main numbers
    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);
    sortedNumbers.forEach(number => {
        numbersContainer.appendChild(createNumberDiv(number));
    });

    // Add "+" separator for bonus number
    const separator = document.createElement('div');
    separator.classList.add('bonus-separator');
    separator.textContent = '+';
    numbersContainer.appendChild(separator);

    // Generate and display 1 bonus number
    let bonusNumber;
    do {
        bonusNumber = Math.floor(Math.random() * 45) + 1;
    } while (numbers.has(bonusNumber));
    
    numbersContainer.appendChild(createNumberDiv(bonusNumber));
});