async function getDogData() {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    createBreedList(data.message);
}

getDogData();

let list = document.querySelector(".list");

function createBreedList(breedList) {

    Object.keys(breedList).forEach((breed) => {
        let option = document.createElement('option');
        option.textContent = breed;
        list.appendChild(option);
    });
}

list.addEventListener('change', (event) => {
    let breed = event.target.value;
    if(breed != "Choose a Dog Breed") {
        console.log(breed);
    }
})
