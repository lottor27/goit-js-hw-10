// Вместо select.breed-select можешь использовать любую библиотеку с красивыми селектом, например
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

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
      document.getElementById('breed_selector').appendChild(option);
    }
    //show the first breed by default
    showBreedImage(0);
  })
  .catch(function (error) {
    console.log(error);
  });

function showBreedImage(index) {
  document.getElementById('breed_image').src = storedBreeds[index].image.url;

  document.getElementById('breed_json').textContent =
    storedBreeds[index].temperament;

  document.getElementById('wiki_link').href = storedBreeds[index].wikipedia_url;
  document.getElementById('wiki_link').innerHTML =
    storedBreeds[index].wikipedia_url;
}

// const celector = document.querySelector('.breed-select');
// const catInfoBox = document.querySelector('.breed-select');

// new SlimSelect({
//   select: '#selectElement',
// });

// // Вместо p.loader можешь использовать любую библиотеку с красивыми CSS-загрузчиками, например

// celector.addEventListener('click', fetchBreeds);

// function fetchBreeds(event) {
//     // const searchQuery = event.currentTarget.elements.query.value;

//     const myId =
//       'live_GmEyPinTRF7Q7LURfrAEdeqCEigZuDD4dcT4ZAQbZLhtFQ0FHyICoGRmHHGSy1P0';

//     const options = {
//       headers: {
//         id: myId,
//       },
//     };

//     const url = 'https://api.thecatapi.com/v1/breeds';

//     fetch(url, options)
//       .then(response => response.json())
//       .then(data => {
//         catInfoBox.innerHTML = `<h1> ${data.name} </h1>`;
//           console.log(data);
//       })
//       .catch(error => {
//         // Error handling
//       });


// };

// function qqq(arr) {
//     return arr.map({ breeds, id, });
// }



//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   })
//   .then(data => {
//     // Data handling
//   })
//   .catch(error => {
//     // Error handling
//   });


//   [
//     {
//       id: 'ebv',
//       url: 'https://cdn2.thecatapi.com/images/ebv.jpg',
//       width: 176,
//       height: 540,
//       breeds: [],
//       favourite: {},
//     },
// ];
  
// 'x-api-key';
// live_GmEyPinTRF7Q7LURfrAEdeqCEigZuDD4dcT4ZAQbZLhtFQ0FHyICoGRmHHGSy1P0;