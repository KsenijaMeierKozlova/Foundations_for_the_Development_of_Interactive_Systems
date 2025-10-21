const colors = ["green", "red", "rgba(133,122,200)", "#f15025"];

const btn1 = document.querySelector('.btn1');
const btn2 = document.querySelector('.btn2');
const btn3 = document.querySelector('.btn3');

const colorText = document.querySelector('#colorCode');
const colorPanel = document.querySelector('#colorPanel');

function randomColor() {
    let colorIndex = Math.floor(Math.random() * colors.length);
    const color = colors[colorIndex];
    colorPanel.style.backgroundColor = color;
    colorText.innerText = color;
}

function randomRGB() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const rgbColor = `rgba(${r}, ${g}, ${b})`;
    colorPanel.style.backgroundColor = rgbColor;
    colorText.innerText = rgbColor;
}

function randomHEX() {
    const hexChars = '0123456789ABCDEF';
    let hexColor = '#';
    for (let i = 0; i < 6; i++) {
        hexColor += hexChars[Math.floor(Math.random() * 16)];
    }
    colorPanel.style.backgroundColor = hexColor;
    colorText.innerText = hexColor;
}

btn1.addEventListener('click', randomColor);
btn2.addEventListener('click', randomRGB);
btn3.addEventListener('click', randomHEX);