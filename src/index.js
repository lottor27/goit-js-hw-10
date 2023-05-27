//  Вместо select.breed-select можешь использовать любую библиотеку с красивыми селектом, например
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const selectBreed = document.querySelector('.breedselect');
const pLoader = document.querySelector('.loader');
const pError = document.querySelector('.error');
const catInfoBox = document.querySelector('.cat-info');

pLoader.classList.add('hide');
pError.classList.add('hide');
let storedBreeds = [];

const urlBreeds = `https://api.thecatapi.com/v1/breeds`;
const urlSearch = `https://api.thecatapi.com/v1/images/search`;
const api_key =
  'live_GmEyPinTRF7Q7LURfrAEdeqCEigZuDD4dcT4ZAQbZLhtFQ0FHyICoGRmHHGSy1P0';

function fetchBreeds() {
  return fetch(urlBreeds,
    {
    headers: {
      'x-api-key': api_key,
    },
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      //filter to only include those with an `image` object
      data = data.filter(img => img.image?.url != null);

      storedBreeds = data;

      for (let i = 0; i < storedBreeds.length; i++) {
        const breed = storedBreeds[i];
        let option = document.createElement('option');

        //skip any breeds that don't have an image
        if (!breed.image) continue;

        //use the current array index
        option.value = i;
        option.innerHTML = `${breed.name}`;
        selectBreed.appendChild(option);
      }

      creatingBox();
      showBreedImage(0);
    })

    .catch(function (error) {
      console.log(error);
    });
}


console.log(fetchBreeds());
function creatingBox() {
  
  const box = `<div class = "cat_text_info">
  <h2 id="breed_name"></h2>
<a id="wiki_info" target="_blank"></a>
<ul class="temp_list">Temperament
<li id="breed_json"></li></ul>
</div>

<div>
<img id="breed_image" width = "340"  ></img>
</div>`;
  catInfoBox.insertAdjacentHTML('afterbegin', box);
}

function showBreedImage(index) {
  // console.log(data);
  document.getElementById('breed_name').textContent = storedBreeds[index].name;
  

  document.getElementById('breed_image').src = storedBreeds[index].image.url;

  document.getElementById('breed_json').textContent =
    storedBreeds[index].temperament;


  document.getElementById('wiki_info').innerHTML =
    storedBreeds[index].description;
  
  
}

selectBreed.addEventListener('click', fetchCatByBreed);

function fetchCatByBreed() {
  // console.log(event.currentTarget.value);
   const breedId = event.currentTarget.value;
  showBreedImage(breedId);
}

