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

list.addEventListener('change', async (event) => {
    let breed = event.target.value;
    if(breed != "Choose a Dog Breed") {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
        const data = await response.json();
        // console.log(data);
        await createSlideShow(data.message);
    }
});

let slideShow = document.querySelector('.slideshow');

function createSlideShow(images) {
    let slide = document.createElement('div');
    slide.classList.add('slide');
    slide.style.backgroundImage = `Url('${images[0]}')`;
    slideShow.append(slide);
    console.log(slide);
}