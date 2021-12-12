let timer;
let deleteFirstPhotoDelay;

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
        createSlideShow(data.message);
    }
});

let slideShow = document.querySelector('.slideshow');

function createSlideShow(images) {
    let currentPosition = 0;
    clearInterval(timer);
    clearTimeout(deleteFirstPhotoDelay);
    if(images.length > 1) {
        let slide1 = document.createElement('div');
        let slide2 = document.createElement('div');
        slide1.classList.add('slide');
        slide2.classList.add('slide');
        slide1.style.backgroundImage = `Url('${images[0]}')`;
        slide2.style.backgroundImage = `Url('${images[1]}')`;
        slideShow.append(slide1);
        slideShow.append(slide2);
        currentPosition += 2;

        
        timer = setInterval(() => {
            let slide = document.createElement('div');
            slide.classList.add('slide');
            slide.style.backgroundImage = `Url('${images[currentPosition]}')`;
            slideShow.insertAdjacentElement("beforeend", slide);

            deleteFirstPhotoDelay = setTimeout(() => {
                document.querySelector(".slide").remove();
            }, 1000);

            if(currentPosition + 1 >= images.length) {
                currentPosition = 0;
            } else {
                currentPosition++;
            }
        }, 3000);
    } else {
        let slide = document.createElement('div');
        slide.classList.add('slide');
        slide.style.backgroundImage = `Url('${images[currentPosition]}')`;
        slideShow.appendChild(slide);
    }
}