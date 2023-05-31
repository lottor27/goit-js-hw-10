import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

import { fetchBreeds, fetchBreedById, selectBreed } from './cat-api.js';


let storedBreed = [];
let breedId = [];

fetchBreeds()
  .then(response => {
    if (response) {
      return response.json();
    }
  })
  .catch(function (error) {
    pError.classList.remove('hide');
    Notiflix.Report.failure(error);
    loaderHide();
  });



// fetchBreedById()
//   .then(response => {
//     if (response) {
//       return response.json();
//     }
//   })
//   .then(data => {})
//   .catch(function (error) {
//     pError.classList.remove('hide');
//     Notiflix.Report.failure(error);
//   });
  














// const select = document.querySelector('.breed-select');
// const cotInfo = document.querySelector('.cat-info');

// select.addEventListener('change', functionSelect);

// fetchBreeds()
//   .then(data => {
//     const markup = createMarkup(data);
//     select.innerHTML = markup;
//   })
//   .catch(err => {
//     console.error(err);
//   });

// function functionSelect() {
//   const selectedOptionValue = select.value;
//   if (selectedOptionValue) {
//     fetchBreeds(select.value);
//   }
// }

// function createMarkup(arr) {
//   return arr
//     .map(
//       breed => `<option value="${breed.id}">${breed.name}</option>
//     `
//     )
//     .join('');
// }

// function createMarkupInfo(arr) {
//   console.log(arr);
//   return arr
//     .map(
//       breed => `<ul>
//       <img src="${breed.url}" alt="${breed.name}">
//       <li>${breed.id}</li>
//       <li>${breed.description}</li>
//       <li>${breed.temperament}</li>
//     </ul>`
//     )
//     .join('');
// }

// fetchCatByBreed()
//   .then(data => {
//     const markupInfo = createMarkupInfo(data);
//     console.log(data);
//   })
//   .catch(err => {
//     console.error(err);
//   });
