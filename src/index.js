// Вместо select.breed-select можешь использовать любую библиотеку с красивыми селектом, например
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

selectBread = document.querySelector('.breed-select');
pLoader = document.querySelector('.loader');
pError = document.querySelector('.error');
catInfoBox = document.querySelector('.cat-info');

pLoader.setAttribute('disable', 'disable');
pError.setAttribute('disable', 'disable');

const url = `https://api.thecatapi.com/v1/breeds`;
const api_key =
  'live_GmEyPinTRF7Q7LURfrAEdeqCEigZuDD4dcT4ZAQbZLhtFQ0FHyICoGRmHHGSy1P0';
let storedBreeds = [];
  
fetch(url, {
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
      selectBread.appendChild(option);
    }
    //show the first breed by default
    // showBreedImage(0);
  })
  .catch(function (error) {
    console.log(error);
  });

