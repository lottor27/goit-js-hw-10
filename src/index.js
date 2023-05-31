
import Notiflix from 'notiflix';

import { fetchBreeds, fetchBreedById } from './cat-api.js';

export {
  loaderHide,
  loaderShow,
  storedBreed,
  breedId,
  catInfoBox,
  pLoader,
  pError,
};
  
const selectBreed = document.querySelector('.breedselect');
const pLoader = document.querySelector('.loader');
const pError = document.querySelector('.error');
const catInfoBox = document.querySelector('.cat-info');
let breedId = [];
let storedBreed = [];


Notiflix.Loading.standard(`${pLoader.textContent}`);
fetchBreeds()
  .then(response => {
    if (response.ok) {
      return response.json();
    }
  })

  .then(data => {
    allBreedSelect(data);
    Notiflix.Loading.remove();
    selectBreed.classList.remove('hide');
  })

  .catch(function (error) {
    console.log('erreo');
    pError.classList.remove('hide');
    Notiflix.Report.failure(error);
  });



function allBreedSelect(data) {
  storedBreed = data;
  for (let i = 0; i < storedBreed.length; i++) {
    const breed = storedBreed[i];
    // console.log(storedBreed[i]);
    let option = document.createElement('option');

    option.value = breed.id;

    option.innerHTML = `${breed.name}`;
    selectBreed.appendChild(option);
  }
}



const fetchCatByBreed = event => {
  breedId = event.currentTarget.value;
  console.log(breedId);
  catInfoBox.classList.add('hide');
  loaderShow();
  fetchBreedById(breedId)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(data => {
      getCatInfo(data);
      Notiflix.Loading.remove(500);
      loaderHide();
      catInfoBox.classList.remove('hide');
      
    })
    .catch(function (error) {
      pError.classList.remove('hide');
      Notiflix.Report.failure(error);
    });
};

selectBreed.addEventListener('change', fetchCatByBreed);



function getCatInfo(data) {
  const breedinfo = data[0].breeds[0];
  document.getElementById('breed_image').src = data[0].url;
  document.getElementById('breed_image').alt = breedinfo.id;
  document.querySelector('.cat-name').textContent = breedinfo.name;
  document.querySelector(
    '.cat-description'
  ).textContent = `Description: ${breedinfo.description}`;
  document.querySelector(
    '.cat-temperament'
  ).textContent = `Temperament: ${breedinfo.temperament}`;

  console.log(breedinfo.id);
}

function catBox() {
  const box = `<div class="cat_text_info">
<h2 class ="cat-name"></h2>
<p class = "cat-description"></p>
<ul class="temp_list">
<li class="cat-temperament"></li>
</ul>
</div>

<div>
<img id="breed_image" width="390"></img>
</div>`;
  catInfoBox.insertAdjacentHTML('afterbegin', box);
}

catBox();

function loaderHide() {
  if (!pLoader.classList.contains('hide')) {
    pLoader.classList.add('hide');
  }
  return;
}

function loaderShow() {
  if (pLoader.classList.contains('hide')) {
    pLoader.classList.remove('hide');
  }
  return;
}
