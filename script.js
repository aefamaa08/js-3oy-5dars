const formInput = document.getElementById("country-input");
const resultsList = document.getElementById("results");
const detailsContainer = document.getElementById("details");
const searchForm = document.getElementById("search-form");

let countries = [];

async function loadCountries() {
    try {
        const res = await fetch('https://restcountries.com/v3.1/all');
        countries = await res.json();
    } catch (error) {
        console.error('Mamlakatlarni yuklashda xatolik:', error);
        resultsList.innerHTML = '<p style="color: red;">Mamlakatlarni yuklab bo‘lmadi. Iltimos, internetni tekshiring.</p>';
    }
}

function display(show){
    resultsList.innerHTML = '';
    detailsContainer.innerHTML = '';
    if(show.length === 1){
        details(show[0]);
    } else{
        show.forEach(country => {
            const item = document.createElement('div');
            item.classList.add('item');
            item.textContent = country.name.common;
            item.addEventListener("click", () => details(country))
            resultsList.appendChild(item)
        }); 
    }
}

function details(country){
    detailsContainer.innerHTML =`
    <h2>${country.name.common}</h2>
    <p><strong>Poytaxt:</strong> ${country.capital ? country.capital[0] : "Poytaxt yo‘q"}</p>
    <p><strong>Aholi soni:</strong> ${country.population.toLocaleString()}</p>
    <p><strong>Region:</strong> ${country.region}</p>
    <img src="${country.flags.png}" alt="${country.name.common} bayrog‘i" width="150">
    `;
}


function search() {
    const searchValue = formInput.value.trim().toLowerCase();
    
    if(searchValue === ''){
        display(countries)
    }
    const filtered = countries.filter(country =>
        country.name.common.toLowerCase().includes(searchValue));

    if(filtered.length > 0){
        display(filtered)
        return;
    } else{
        resultsList.innerHTML = '<p style="color: red;">Hech narsa topilmadi</p>';
        detailsContainer.innerHTML = '';
    }
};

formInput.addEventListener("input", search)

searchForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    search();
} )

loadCountries();
