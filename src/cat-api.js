import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
export { fetchBreeds, fetchBreedById, selectBreed };
    
    const selectBreed = document.querySelector('.breedselect');
    const pLoader = document.querySelector('.loader');
    const pError = document.querySelector('.error');
const catInfoBox = document.querySelector('.cat-info');
    
let breedId = [];
let storedBreed = [];

pError.classList.add('hide');
pLoader.classList.add('hide');

    const api_key =
      'live_GmEyPinTRF7Q7LURfrAEdeqCEigZuDD4dcT4ZAQbZLhtFQ0FHyICoGRmHHGSy1P0';
    const urlBreeds = `https://api.thecatapi.com/v1/breeds`; 
  

function fetchBreeds() {
    selectBreed.classList.add('hide');
    Notiflix.Loading.standard(`${pLoader.textContent}`)

    return fetch(urlBreeds, {
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
        allBreedSelect(data);
          Notiflix.Loading.remove();
          selectBreed.classList.remove('hide');
      })

        .catch(function (error) {
          console.log("erreo");
        pError.classList.remove('hide');
        Notiflix.Report.failure(error);
      });
    
}
;

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
    fetchBreedById();
};

selectBreed.addEventListener('change', fetchCatByBreed);



function fetchBreedById() {
    catInfoBox.classList.add('hide');
loaderShow()
const urlSearchBreeds = `https://api.thecatapi.com/v1/images/search?api_key=${api_key}&breed_ids=${breedId}`;

    
return fetch(urlSearchBreeds, {
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
    getCatInfo(data);
    Notiflix.Loading.remove(500);
    loaderHide();
    catInfoBox.classList.remove('hide');
  })
  .catch(function (error) {
    pError.classList.remove('hide');
    Notiflix.Report.failure(error);
  });
}
    

function getCatInfo(data) {
    
    const breedinfo = data[0].breeds[0];
    document.querySelector('.cat-name').textContent = breedinfo.name
    document.querySelector(
      '.cat-description'
    ).textContent = `Description: ${breedinfo.description}`;
    document.querySelector(
      '.cat-temperament'
    ).textContent = `Temperament: ${breedinfo.temperament}`;
     
    document.getElementById('breed_image').src = data[0].url;
    document.getElementById('breed_image').alt = breedinfo.id;
    console.log(breedinfo.id);
    
}

function catBox()
{    const box = `<div class="cat_text_info">
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
  if (!pLoader.classList.contains("hide")) {
    pLoader.classList.add('hide');
  } return
};

function loaderShow() {
  if (pLoader.classList.contains('hide')) {
    pLoader.classList.remove('hide');
  } return
};






// export {fetchBreeds, fetchCatByBreed};
// const API_KEY = 'live_PeQIm7clvMSlGltRB8qyWPC8h4vJpnzq15HYHXZFt4wayVOb6jvRMCRXSexktexb';
// const BASE_URL = 'https://api.thecatapi.com/v1';
// const SECOND_URL = 'https://api.thecatapi.com/v1/images/search';

// function fetchBreeds(){

//     return fetch(`${BASE_URL}/breeds?api_key=${API_KEY}`)
//     .then(resp =>{console.log(resp)
//     if(!resp.ok){
//     throw new Error(resp.statusText)
//     }
//     return resp.json()
//     })
//     .then(data => {
//         return data;
//       })
//       .catch(error => {
//         console.error(error);
//       });
//     };

//     function fetchCatByBreed(breedId) {

//       return fetch(`https://api.thecatapi.com/v1/images/0XYvRd7oD`)
//         .then(resp => {
//           if (!resp.ok) {
//             throw new Error(resp.statusText);
//           }
//           return resp.json();
//         })
//         .then(data => {
//           return data;
//         })
//         .catch(error => {
//           console.error(error);
//         });
//     }
