
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




const api_key =
  'live_GmEyPinTRF7Q7LURfrAEdeqCEigZuDD4dcT4ZAQbZLhtFQ0FHyICoGRmHHGSy1P0';

function fetchBreeds() {
  const urlBreeds = `https://api.thecatapi.com/v1/breeds`;
  return fetch(urlBreeds, {
    headers: {
      'x-api-key': api_key,
    },
  });
}


function fetchBreedById(breedId) {
  const urlSearchBreeds = `https://api.thecatapi.com/v1/images/search?api_key=${api_key}&breed_ids=${breedId}`;

  return fetch(urlSearchBreeds, {
    headers: {
      'x-api-key': api_key,
    },
  });
}









async function fetchData(END_POINT, options) {
  const response = await fetch(`${BASE_URL}${END_POINT}`, options);
  const data = await response.json();
  return data.results.slice(0, 3);
}

async function fetchGenres(options) {
  const response = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?language=en`,
    options
  );
  const data = await response.json();
  return data.genres;
}


function onPageLoad() {
  fetchData(END_POINT, options).then(movieData => {
    renderMarkup(movieData).then(markup => {
      addMarkup(weeklyUlRef, markup);
    });
  });
}



















