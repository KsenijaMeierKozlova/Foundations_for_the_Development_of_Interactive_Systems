const daysElement = document.getElementById('days');
const hoursElement = document.querySelector('#hours');
const minutesElement = document.querySelector('#minutes');
const secondsElement = document.querySelector('#seconds');

function countDown() {
    const currentDate = new Date();
    // console.log(currentDate.getTime()/1000);

    const endDate = new Date(2026, 0, 1);
    const totalSeconds = (endDate - currentDate)/1000;

    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor(totalSeconds % (3600 * 24) / 3600);
    const minutes = Math.floor(totalSeconds % (3600 * 24) % 3600 / 60);
    const seconds = Math.floor(totalSeconds % (3600 * 24) % 3600 % 60);

    // console.log(days, hours, minutes, seconds);

    daysElement.innerHTML = days;
    hoursElement.innerHTML = hours;
    minutesElement.innerHTML = minutes;
    secondsElement.innerHTML = seconds;
}

countDown();
setInterval(countDown, 1000);