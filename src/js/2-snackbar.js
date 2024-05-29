import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconСheckСircle from '/img/check-circle.svg';
import iconXOctagon from '/img/bi_x-octagon.svg';

const izitoastOptions = {
  position: 'topRight',
  transitionIn: 'fadeInDown',
  iconUrl: iconСheckСircle,
  iconColor: 'white',
  message: 'Warning!',
  color: 'red',
};

const theForm = document.querySelector('.form');

const handleSubmit = event => {
  event.preventDefault();

  const delay = Number(event.target.elements.delay.value);
  const result = event.target.elements.state.value;

  if (delay <= 0) {
    iziToast.show({
      ...izitoastOptions,
      iconUrl: iconXOctagon,
      message: 'Number must be greater than zero',
    });
    return;
  }

  const thePromise = new Promise((resolve, reject) => {
    if (result === 'fulfilled') {
      setTimeout(() => {
        resolve(`Fulfilled promise in ${delay}ms`);
      }, delay);
    } else {
      setTimeout(() => {
        reject(`Rejected promise in ${delay}ms`);
      }, delay);
    }
  });

  thePromise
    .then(res => {
      iziToast.show({
        ...izitoastOptions,
        message: res,
        color: 'green',
        timeout: 5000,
      });
    })
    .catch(error => {
      iziToast.show({
        ...izitoastOptions,
        iconUrl: iconXOctagon,
        message: error,
        timeout: 5000,
      });
    });
};

theForm.addEventListener('submit', handleSubmit);
