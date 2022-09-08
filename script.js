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



const getCountryData = function(country){
    //country1
    fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(function(response){ // return json promise
        return response.json(); 
 
    }, (err) => { console.log(err) })
    .then(function(data){  // return promise of nbr's fetch req
        renderCountry(data[0])
        const nbr = data[0].borders[0]
        if(!nbr) return; 
        //country2
        return fetch(`https://restcountries.com/v3.1/name/${nbr}`)
    })  
    .then(function(res){ // return json promise of nbr1
        return res.json()
    })
    .then(function(data){
        renderCountry(data[0])
    })
}

btn.addEventListener('click', function(){
    getCountryData('portugal'); 
})

