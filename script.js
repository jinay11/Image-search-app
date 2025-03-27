const searchForm = document.querySelector("form");
const imagesContainer = document.querySelector(".images-container");
const searchInput = document.querySelector(".search-input");
const accessKey = "9cgarYV7F4rY_MQHgLIyS2aXzr6XT05DBWLweJs35MQ";

// function to fetch images using Unsplash API
const fetchImages = async (query) => {

    imagesContainer.innerHTML = '';

    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=30&client_id=${accessKey}`

    const response = await fetch(url);
    const data = await response.json();

    data.results.forEach(photo => {
        const imageElement = document.createElement('div');
        imageElement.classList.add("imageDiv")
        imageElement.innerHTML = `<img src='${photo.urls.regular}' />`

        // creating overlay element
        const overlayElement = document.createElement('div');
        overlayElement.classList.add('overlay');

        imageElement.appendChild(overlayElement);
        imagesContainer.appendChild(imageElement);

        // create overlay text
        const overlayText = document.createElement('h3');
        overlayText.innerText = `${photo.alt_description}`
        overlayElement.appendChild(overlayText);
    });

}

// adding event listener to search form
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputText = searchInput.value.trim();

    if (inputText !== '') {
        fetchImages(inputText);
    } else {
        imagesContainer.innerHTML = `<h2>Please enter a search query</h2>`
    }
});
