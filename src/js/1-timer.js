import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startButton = document.querySelector('[data-start]');
const datetimePicker = document.querySelector('#datetime-picker');
const daysField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minutesField = document.querySelector('[data-minutes]');
const secondsField = document.querySelector('[data-seconds]');

const izitoastOptions = {
  position: 'topRight',
  transitionIn: 'fadeInDown',
  iconUrl: './img/bi_x-octagon.svg',
  iconColor: 'white',
  message: 'Warning!',
  color: 'red',
};

let userSelectedDate;
let timeDifference;

startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    handleClose();
  },
};

flatpickr('input#datetime-picker', options);

const handleClose = () => {
  timeDifference = userSelectedDate - Date.now();
  if (timeDifference <= 0) {
    iziToast.show({
      ...izitoastOptions,
      message: 'Please choose a date in the future',
    });
    return;
  }

  const timeArray = convertMs(timeDifference);
  updateDisplay(timeDifference);

  startButton.disabled = false;
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const updateDisplay = ms => {
  if (ms < 0) {
    ms = 0;
  }

  const { days, hours, minutes, seconds } = convertMs(ms);

  daysField.textContent = days.toString().padStart(2, '0');
  hoursField.textContent = hours.toString().padStart(2, '0');
  minutesField.textContent = minutes.toString().padStart(2, '0');
  secondsField.textContent = seconds.toString().padStart(2, '0');
};

const startCountdown = () => {
  startButton.disabled = true;
  datetimePicker.disabled = true;
  let countdownInterval = setInterval(() => {
    timeDifference = userSelectedDate - Date.now();
    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      // alert('Stop!');
      iziToast.show({
        ...izitoastOptions,
        message: 'Stop',
      });
      updateDisplay(0);
      datetimePicker.disabled = false;
    }
    const timeArray = convertMs(timeDifference);
    updateDisplay(timeDifference);
  }, 1000);
};

startButton.addEventListener('click', startCountdown);
