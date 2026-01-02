'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
          <img class="country__img" src="${data.flag}"/>
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}M people </p>
            <p class="country__row"><span>🗣️</span>${
              (data.languages[1] && data.languages[1].name) !== undefined
                ? data.languages[1].name
                : data.languages[0]?.name
            }</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};
// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////

// const getCountryAndNeighbour = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country} `);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     renderCountry(data);

//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v2/alpha/${data.borders?.[0]} `);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const data1 = JSON.parse(this.responseText);
//       console.log(data1);
//       renderCountry(data1,'neighbour');
//     });
//   });
// };

// getCountryAndNeighbour('usa');
// const getJSON = function (url, errorMsg = 'Something went wrong') {
//   fetch(url).then(response => {
//     if (!response.ok) {
//       throw new Error(`${errorMsg} ${response.status}`);
//     }
//     return response.json();
//   });
// };
// const getCountry = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => {
//       console.log(response);
//       if (!response.ok) {
//         throw new Error(`Country not found ${response.status}`);
//       }
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       console.log(data[0]);
//       //const neighbour = data[0].borders[0];
//       const neighbour = 'ssddffgggg';

//       if (!neighbour) return;
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`Country not found ${response.status}`);
//       }
//       return response.json();
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err =>
//       renderError(`Something went wrong ${err.message}. Try again!`)
//     )
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// const getJSON = function (url, errorMsg = 'Something went wrong') {
//   return fetch(url).then(response => {
//     if (!response.ok) {
//       throw new Error(`${errorMsg} ${response.status}`);
//     }
//     return response.json();
//   });
// };
// const getCountry = function (country) {
//   getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
//     .then(data => {
//       console.log(data[0]);
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0] ?? undefined;
//       if (neighbour === undefined || neighbour === null)
//         throw new Error('No neighbour found!');

//       //   if (!neighbour) return;
//       return getJSON(
//         `https://restcountries.com/v2/alpha/${neighbour}`,
//         'Country not found'
//       );
//     })

//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err =>
//       renderError(`Something went wrong ${err.message}. Try again!`)
//     )
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   //   getCountry('rsa');
//   getCountry('australia');
// });

const whereAmI = function (lat, lng) {
  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(`Problem with geocoding ${response.status}`);
      }
      console.log(response);
      console.log(response.json);
      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.countryName}`);
      //getCountry(data.countryName);
      return fetch(`https://restcountries.com/v2/name/${data.countryName}`);
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Country not found ${response.status}`);
      }
      console.log(response);
      console.log(response.json);
      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message}`));
};

whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);
