// grabbing information from user db - jeff code

const userId = window.location.pathname.split(`/`)[2];

const onWorking = (response)=>{
  console.log(response);
  $(`#welcome-user`).empty();
  $(`#welcome-user`).append(`Welcome, ${response.data.name}`);
  $(`#topic-1-header`).empty();
  $(`#topic-1-header`).append(`${response.data.topic}`)
  $(`#topic-2-header`).empty();
  $(`#topic-2-header`).append(`${response.data.topic2}`)
}

$.ajax({
  method: `GET`,
  url: `http://localhost:3000/api/v1/profile/${userId}`,
  success: onWorking,
  error: (error) => {
    console.log({error})
  }
})

const onLogoutSuccess = () => {
  window.location = `/login`
}

$(`#logout`).click(`click`, (event) => {
  event.preventDefault();
  console.log(`logout clicked`);
  $.ajax({
    method: `DELETE`,
    url: `http://localhost:3000/api/v1/logout`,
    success: onLogoutSuccess,
    error: (error) => {
      console.log({error})
    }
  });
});

// end jeff code

// let fave = [];
let count = 0
const onSuccess = (response) => {
    count += 26;
    response.data.forEach((giphy)=>{
        const template = `
        <div class="card" style="width: 18rem;">
            <img id="${giphy.id}" src="${giphy.images.downsized.url}" width="285" height="265"/>
                <div class="image-content">
                    <div class="icons">
                        <button class="icon fas fa-heart heart1"></button>
                        <button class="icon fas fa-eye"></button>
                    </div>
                </div>
            </div>
        </div>
        `
        $('#topic-1-content').append(template);
        
    })

    $('.heart1').on('click', (event) =>{
        let url1 = $(event.target).parent().parent().parent().find('img')[0].currentSrc;
        let giphId1 = $(event.target).parent().parent().parent().find('img')[0].id;
        // fave.push(url1);
        console.log(url1);
        console.log(giphId1);
    })
}


let count2 = 0
const onSuccess2 = (response) => {
    count2 += 26;
    response.data.forEach((giphy)=>{
        const template2 = `
        <div class="card" style="width: 18rem;">
            <img src="${giphy.images.downsized.url}" width="285" height="265"/>
                <div class="image-content">
                    <div class="icons">
                        <button class="icon fas fa-heart heart2"></button>
                        <button class="icon fas fa-eye"></button>
                    </div>
                </div>
            </div>
        </div>
        `
        $('#topic-2-content').append(template2);
    })
    
    $('.heart2').on('click', (event) =>{
        let url = $(event.target).parent().parent().parent().find('img')[0].currentSrc;
        let giphId = $(event.target).parent().parent().parent().find('img')[0].id;
        // fave.push(url1);
        console.log(url);
        console.log(giphId);
    })
}


$('.heart').on('click', (event) => {
    event.preventDefault();
    const favoriteUrl = `http://localhost:3000/api/v1/favorite`
  
    let favoriteData = {
      "memeId": url, 
      "url": giphId, 
    }
  
    $.ajax({
      method: `POST`,
      url: `${favoriteUrl}`,
      data: favoriteData,
      success: console.log('favorite schema populated'),
      error: (error) => {
        console.log({error});
      }
    });
  });

const topicOne = () => {
    // event.preventDefault();
    $('#topic-1-content').empty();
    $.ajax({
        method: "GET",
        url: `https://api.giphy.com/v1/gifs/search?q=${$(`#topic-1-header`).text()}&api_key=dc6zaTOxFJmzC`,
        success: onSuccess,
        error: onError
    });
}

const topicTwo = () => {
    // event.preventDefault();
    $('#topic-2-content').empty();
    $.ajax({
        method: "GET",
        url: `https://api.giphy.com/v1/gifs/search?q=${$(`#topic-2-header`).text()}&api_key=dc6zaTOxFJmzC`,
        success: onSuccess2,
        error: onError
    });
}



function onError(xhr, status, errorThrown) {
	alert("Sorry, there was a problem!");
	console.log("Error: " + errorThrown);
	console.log("Status: " + status);
	console.dir(xhr);
}

topicOne();
topicTwo();


