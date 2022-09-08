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

const getCountryAndNbrs = function(country){
    //ajax call country1
    const req = new XMLHttpRequest(); 
    req.open('GET', `https://restcountries.com/v3.1/name/${country}`); 
    req.send(); 

    req.addEventListener('load', function(){
        const [data] = JSON.parse(this.responseText) 
        console.log(data)
        renderCountry(data);

        //fetch country2
        const [nbr] = data.borders; 
        if(!nbr) return; 

        //ajax call country2
        const req2 = new XMLHttpRequest(); 
        req2.open('GET', `https://restcountries.com/v3.1/alpha/${nbr}`); 
        req2.send();
        req2.addEventListener('load', function(){
            const [data2] = JSON.parse(this.responseText)
            console.log(data2)
            renderCountry(data2);
        })
    })
}

getCountryAndNbrs("portugal")