console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', function() {
    dogPics();
    dogBreeds();
})


function dogPics() {
    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(function(response) {
        return response.json();
    })
    .then(function(json){
        json.message.forEach(message => {
           renderDogPics(message)
        })
    })
}

const renderDogPics = (message) => {
    const imageContainer = document.getElementById('dog-image-container')

        let imageHolder = document.createElement('li')
        imageContainer.appendChild(imageHolder)
    
        let dogImage = document.createElement('img')
        dogImage.src = message
        imageHolder.appendChild(dogImage)
}

function dogBreeds() {
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
    .then(breeds => {
        breedList = Object.keys(breeds.message)
       
            filteredBreedList(breedList);
            breedDropdownListener()
    })
}

const renderDogBreeds = (breed) => {
    let breedContainer = document.querySelector('#dog-breeds');

        let breedHolder = document.createElement('li');
        breedHolder.innerText = breed
        breedContainer.appendChild(breedHolder)

        breedHolder.addEventListener('click', () => {
            breedHolder.style.color = "red"
        })
        
}

function filteredBreedList(breedList) {
    let breedContainer = document.querySelector('#dog-breeds');
    removeChildNode(breedContainer)
    breedList.forEach(breed => renderDogBreeds(breed))
}

function removeChildNode(element) {
    let childNode = element.lastElementChild;
    while (childNode) {
        element.removeChild(childNode);
        childNode = element.lastElementChild;
    }
}

function breedWithSelectedLetter(letter) {
    filteredBreedList(breedList.filter(breed => breed.startsWith(letter)));
}

function breedDropdownListener() {
    const breedDropdown = document.querySelector('#breed-dropdown');
    breedDropdown.addEventListener('change', function (event) {
        breedWithSelectedLetter(event.target.value)
    })
}