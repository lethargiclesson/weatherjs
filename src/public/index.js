import { API_KEY } from './config.js';
import coords from './locale.js';
import displayError from './displayError.js';

const iconElement = document.querySelector('.climate--icon');
const temperatureElement = document.querySelector('.climate--temperature');
const locationElement = document.querySelector('.climate--location');
const spinnerElement = document.querySelector('.spinner');

const displaySpinner = (display) => {
  const actionAdd = () => {
    spinnerElement.classList.remove('opacity-0');
    spinnerElement.classList.add('opacity-100');
  };

  const actionRemove = () => {
    spinnerElement.classList.remove('opacity-100');
    spinnerElement.classList.add('opacity-0');
  };
  display ? actionAdd() : actionRemove();
};


const temperatures = async (API_KEY, { lat, lng }, unit) => {
  const sys = unit === 'C' ? 'metric' : unit === 'F' ? 'imperial' : 'stantard';
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=${sys}`
    );

    try {
      if (!response.ok)
        throw new Error(
          'Não foi possivel estabelecer conexão com openweathermap'
        );
    } catch (error) {
      error.status = response.status;
      displayError(error);
      throw error;
    }

    displaySpinner(1);

    const data = await response.json();
    temperatureElement.textContent = `${data.main.temp}º ${unit}`;
    locationElement.textContent = data.name;

    await processoImg(data.weather[0].icon);

  } catch (error) {
    console.error(`${error.message}`);
  }
};

const processoImg = (src) => {
  return new Promise((resolve, reject) => {
    iconElement.src = `http://openweathermap.org/img/wn/${src}@2x.png`;
    iconElement.addEventListener('load', () => {
      iconElement.classList.remove('opacity-0');
      iconElement.classList.add('opacity-100');
      displaySpinner(0);
      resolve();
    });

    iconElement.addEventListener('error', () => {
      reject(new Error('Não foi possivel carregar imagem!'));
    });
  });
};


const getLocation = async () => {
  try {
    const location = await coords();
    temperatures(API_KEY, location, 'C');
  } catch (error) {
    displayError(error);
  }
};

getLocation();
