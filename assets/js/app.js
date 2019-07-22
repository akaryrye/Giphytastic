/*
When page loads:
    render input and output divs
    
When search submitted:
    call API
    render images
        onclick => animate/still
    render buttons
        onclick => perform search with that topic
    
Save searches in an array:
    loop through on page load or new search, 
*/

document.addEventListener('DOMContentLoaded', function() {

    let images = document.getElementById("images");
    let input = document.getElementById("search");
    let submit = document.getElementById("submit");
    let buttons = document.getElementById("buttons");
    let slider = document.getElementById("imgQuantity");
    let quantityDisp = document.getElementById("quantityDisp");

    // Define how each image is rendered:
    function createImageElement(target, src, title) {   
        let newImg = document.createElement("img");
        let imgDiv = document.createElement("div");
        newImg.setAttribute('alt', title);
        newImg.setAttribute('src', src);
        imgDiv.setAttribute('class', 'image');
        imgDiv.appendChild(newImg);
        images.appendChild(imgDiv)
    }

    // Send API call to Giphy for images on the given topic:
    function populateImages (topic) {
        images.innerHTML = "";
        let url = `https://api.giphy.com/v1/gifs/search?q=${topic}&limit=${limit}&api_key=${apiKey}`;
        fetch(url).then((obj) => obj.json())
            .then(function(obj) {
                for (let i = 0; i < obj.data.length; i++) {
                    createImageElement(images, obj.data[i].images.downsized.url, obj.data[i].title) 
                };
            }); 
    }

    // Render quick-search buttons:
    function createButtons(arr) {
        buttons.innerHTML = "";
        for (let i = 0; i < arr.length; i++) {
            let button = document.createElement("button");
            button.setAttribute("class", "btn");
            button.setAttribute("data", i);
            button.textContent = arr[i];
            buttons.appendChild(button)
        }
    }

    //update limit variabale with slider
    slider.onchange = function() {
        quantityDisp.innerHTML = this.value;
        limit = this.value;
    };

    // misc variables:
    let btnArray = JSON.parse(localStorage.getItem('btnArray'));
    if (!btnArray) { btnArray = ['kitty'] };
    const apiKey = "vITl6BK9Hgs5yLJLzWGwkqOwptsed4xH";
    let limit = slider.value;
    let topic = btnArray[0];

    // functions to run on page load:
    createButtons(btnArray);
    populateImages(topic)

    // when submit is clicked, save input value to array + load images:
    submit.addEventListener('click', function () {
        topic = input.value;
        if (!btnArray.includes(topic)) {
            btnArray.push(topic);
        }
        localStorage.setItem('btnArray', (JSON.stringify(btnArray)));
        console.log(topic);
        populateImages(topic);
        createButtons(btnArray);
    })

    // when buttons are clicked, load images on that topic:
    document.addEventListener('click', function(e) {
        if (e.target.getAttribute('class') == 'btn') {
            let index = e.target.getAttribute('data');
            topic = btnArray[index];
            console.log(index, topic);
            populateImages(topic);
        }
    });

});