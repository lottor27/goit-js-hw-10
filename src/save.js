//  Вместо select.breed-select можешь использовать любую библиотеку с красивыми селектом, например
//  Вместо select.breed-select можешь использовать любую библиотеку с красивыми селектом, например
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const selectBreed = document.querySelector('.breedselect');
const pLoader = document.querySelector('.loader');
const pError = document.querySelector('.error');
const catInfoBox = document.querySelector('.cat-info');


pError.classList.add('hide');
pLoader.classList.add('hide');
let storedBreed = [];
let breedCard = [];
let breedinfo = [];
// let breedId = [];

new SlimSelect({
  select: '#selectElement',
});

selectBreed.setAttribute('id', 'selectElement');

const api_key =
  'live_GmEyPinTRF7Q7LURfrAEdeqCEigZuDD4dcT4ZAQbZLhtFQ0FHyICoGRmHHGSy1P0';
const urlBreeds = `https://api.thecatapi.com/v1/breeds`;



function fetchBreeds() {
  
  Notiflix.Loading.standard(`${pLoader.textContent}`);

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
      storedBreeds = data;
      for (let i = 0; i < storedBreeds.length; i++) {
        
        const breed = storedBreeds[i];
        let option = document.createElement('option');
      
        option.value = breed.id;
        option.innerHTML = `${breed.name}`;
        selectBreed.appendChild(option);
      }
      Notiflix.Loading.remove(500);
    })
    .catch(function (error) {
  pError.classList.remove('hide');
      Notiflix.Report.failure(error);
});
}

fetchBreeds();

selectBreed.addEventListener('change', fetchCatByBreed);

function fetchCatByBreed(event) {
  breedId = event.currentTarget.value;
  
}


selectBreed.addEventListener('change', () => { 
  fetchBreedById()
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(data => {
      catBox(data)
      Notiflix.Loading.remove(500);
    })
    .catch(function (error) {
      pError.classList.remove('hide');
      Notiflix.Report.failure(error);
      loaderHide();
    });
});




function fetchBreedById() {
  
  fetchCatByBreed();
  const urlSearchBreeds = `https://api.thecatapi.com/v1/images/search?api_key=${api_key}&breed_ids=${breedId}`;

  return fetch(urlSearchBreeds, {
    headers: {
      'x-api-key': api_key,
    },
  }).then(
    (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}











// let breedinfo = [];






// function showBreedImage() {
//   // fetchBreedById();
//   // loaderShow();
//   // catInfoBox.classList.add('hide');

//   console.log(data);
  // const qqq = JSON.stringify(data);
  // console.log(storedBreedInfo);
  // console.log(storedBreed);
  // console.log(qqq.name);
  // console.log(qqq.id);

  // document.getElementById('breed_name').textContent = breed.name;

  // document.getElementById('breed_image').src = storedBreeds[index].image.url;

  // document.getElementById('breed_json').textContent =
  //   storedBreeds[index].temperament;

  // document.getElementById('wiki_info').innerHTML =
  //   storedBreeds[index].description;
  // loaderHide();
  // catInfoBox.classList.remove('hide');
// }

// showBreedImage();

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

function catBox(data) {
const breedinfo = data[0].breeds[0];
  const box = `<div class="cat_text_info">
<h2 >"${breedinfo.name}"</h2>
<a target="_blank">"${breedinfo.description}"</a>
<ul class="temp_list">Temperament
<li>"${breedinfo.temperament}"</li>
</ul>
</div>

<div>
<img id="breed_image" width="340" src="${data[0].url}" alt="${breedinfo.alt_names}"></img>
</div>`;
  catInfoBox.insertAdjacentHTML('afterbegin', box);
}
