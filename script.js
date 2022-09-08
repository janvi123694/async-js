'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const renderCountry = function(data){
    const html = `
        <article class="country">
            <img class="country__img" src="${data.flags.png}" />
            <div class="country__data">
                <h3 class="country__name">${data.name.common}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span></span>POP people</p>
                <p class="country__row"><span></span>LANG</p>
                <p class="country__row"><span></span>CUR</p>
            </div>
        </article>
        `
        countriesContainer.insertAdjacentHTML('beforeend', html); 
}


const renderError = function(msg){
    countriesContainer.insertAdjacentHTML('beforeend', msg)
}

const getJSON = function(url , errorMsg = `error`){
    return fetch(url)
    .then(function(response){ // return json promise
        if(!response.ok) throw new Error(`${errorMsg} ${response.status}`)
        return response.json(); // returns json promise
    }) // 2 cbs
}

const getCountryData = function(country){
    //country1
     getJSON(`https://restcountries.com/v3.1/name/${country}`)
    .then(function(data){  // return promise of nbr's fetch req

        renderCountry(data[0])

        const nbr = data[0].borders[0]
        if(!nbr) return; 
        //country2
        return getJSON(`https://restcountries.com/v3.1/name/${nbr}` , 'country not found') // json promise
    })  
    .then(function(data){
        renderCountry(data[0])
    })
    .catch((err) => renderError(`${err.message}`))
    .finally( () => console.log('finally cb'))
}

btn.addEventListener('click', function(){
    getCountryData('portugal'); 
})

