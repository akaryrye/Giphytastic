
const apiKey = "vITl6BK9Hgs5yLJLzWGwkqOwptsed4xH";
let topic;
let url; 
let data = {};

let element = document.getElementById("buttons");
let input = document.getElementById("search");
let submit = document.getElementById("submit");


function createImageElement(target, src, title) {
    
    var newDiv = document.createElement("img");
    newDiv.setAttribute('alt', title);
    newDiv.setAttribute('src', src);
    target.appendChild(newDiv);

}

// save input value to a variable
submit.addEventListener('click', function () {
    let topic = input.value;
    url = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&limit=5&api_key=" + apiKey;
    fetch(url)
    .then((data) => data.json())
    .then(function(data) {
        console.log(data)
        element.innerHTML = "";
        for (let i = 0; i < data.data.length; i++) {
            createImageElement(element, data.data[i].images.downsized.url, data.data[i].title)
        }
    }); 
})