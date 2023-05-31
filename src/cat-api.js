
import Notiflix from 'notiflix';
import {
  loaderHide,
  loaderShow,
  storedBreed,
  breedId,
  catInfoBox,
  pLoader,
  pError,
} from './index';
export { fetchBreeds, fetchBreedById };

const selectBreed = document.querySelector('.breedselect');
const pLoader = document.querySelector('.loader');

const api_key =
  'live_GmEyPinTRF7Q7LURfrAEdeqCEigZuDD4dcT4ZAQbZLhtFQ0FHyICoGRmHHGSy1P0';

function fetchBreeds() {
  Notiflix.Loading.standard(`${pLoader.textContent}`);

  const urlBreeds = `https://api.thecatapi.com/v1/breeds`;
  return fetch(urlBreeds, {
    headers: {
      'x-api-key': api_key,
    },
  });
}
// console.log(breedId);

function fetchBreedById() {
  catInfoBox.classList.add('hide');
  loaderShow();
  const urlSearchBreeds = `https://api.thecatapi.com/v1/images/search?api_key=${api_key}&breed_ids=${breedId}`;

  return fetch(urlSearchBreeds, {
    headers: {
      'x-api-key': api_key,
    },
  });
}
