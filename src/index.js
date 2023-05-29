//  Вместо select.breed-select можешь использовать любую библиотеку с красивыми селектом, например
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const selectBreed = document.querySelector('.breedselect');
const pLoader = document.querySelector('.loader');
const pError = document.querySelector('.error');
const catInfoBox = document.querySelector('.cat-info');


pError.classList.add('hide');
pLoader.classList.add('hide');
let storedBreeds = [];

new SlimSelect({
  select: '#selectElement',
});

selectBreed.setAttribute('id', 'selectElement');

const urlBreeds = `https://api.thecatapi.com/v1/breeds`;

const api_key =
  'live_GmEyPinTRF7Q7LURfrAEdeqCEigZuDD4dcT4ZAQbZLhtFQ0FHyICoGRmHHGSy1P0';

function fetchBreeds() {
  
  loaderShow();

  return fetch(urlBreeds,
    {
    headers: {
      'x-api-key': api_key,
    },
    })
    
    .then(response => {
      if (response.ok) {
        return response.json();
      }
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
      
      setTimeout(() => {
        creatingBox();
        showBreedImage(0);
        
      }, 500);
      loaderHide();
    })
  
    .catch(function (error) {
  pError.classList.remove('hide');
      console.log(error);
      loaderHide();
});
}


fetchBreeds();
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
  loaderShow();
catInfoBox.classList.add('hide');
  
  setTimeout(() =>
  {
    // console.log(data);
    document.getElementById('breed_name').textContent =
      storedBreeds[index].name;

    document.getElementById('breed_image').src = storedBreeds[index].image.url;

    document.getElementById('breed_json').textContent =
      storedBreeds[index].temperament;

    document.getElementById('wiki_info').innerHTML =
      storedBreeds[index].description;
    loaderHide();
    catInfoBox.classList.remove('hide');
  }, 500)
  
}

selectBreed.addEventListener('change', fetchCatByBreed);


function fetchCatByBreed() {
 
   const breedId = event.currentTarget.value;
  showBreedImage(breedId);
  console.log(breedId);
}


function loaderHide() {
  if (!pLoader.classList.contains("hide")) {
    pLoader.classList.add('hide');
  } return
};

function loaderShow() {
  if (pLoader.classList.contains('hide')) {
    pLoader.classList.remove('hide');
  } return
};