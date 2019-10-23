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

topicOne();
topicTwo();
populateFavorites();
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
                        <button class="icon fas fa-eye eye1" data-toggle="modal" data-target="#exampleModalCenter"></button>
                    </div>
                </div>
            </div>
        </div>
        `
        $('#topic-1-content').append(template);
        
    })

    $('.heart1').on('click', (event) =>{
        console.log(`heart 1 clicked`)
        let url = $(event.target).parent().parent().parent().find('img')[0].currentSrc;
        let giphId = $(event.target).parent().parent().parent().find('img')[0].id;
        console.log(url);
        console.log(giphId);
        const template3 = `
        <div class="card" style="width: 18rem;">
            <img id="${giphId}" src="${url}" width="285" height="265"/>
                <div class="image-content">
                </div>
            </div>
        </div>
        `
    // $('#favorite-content').append(template3);

    const favoriteUrl = `http://localhost:3000/api/v1/createfavorite/${giphId}` // CAMEL CASE
  
    let favoriteData = {
      "giphId": giphId, 
      "url": url, 
      "userId": userId
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
    // populateFavorites();
    })
   // ALI CODE
   $('.eye1').on('click', (event) =>{
    $('.modal-body').empty();
    let url = $(event.target).parent().parent().parent().find('img')[0].currentSrc;
    let giphId = $(event.target).parent().parent().parent().find('img')[0].id;
    console.log(url);
    console.log(giphId);
   
    const template5 = `
    <div class="card" style="width: 18rem;">
        <img id="${giphId}" src="${url}" width="485" height="465"/>
    <div class="image-content">
    </div>
    </div>
    </div>
    `

    $('.modal-body').append(template5);
  });
  //  ALI CODE END 

}



let count2 = 0
const onSuccess2 = (response) => {
    count2 += 26;
    response.data.forEach((giphy)=>{
        const template2 = `
        <div class="card" style="width: 18rem;">
            <img id="${giphy.id}" src="${giphy.images.downsized.url}" width="285" height="265"/>
                <div class="image-content">
                    <div class="icons">
                        <button class="icon fas fa-heart heart2"></button>
                        <button  class="icon fas fa-eye eye2" data-toggle="modal" data-target="#exampleModalCenter"></button>
                    </div>
                </div>
            </div>
        </div>
        `
        $('#topic-2-content').append(template2);
    })

    $('.heart2').on('click', (event) =>{
        console.log(`heart 2 clicked`)
        let url = $(event.target).parent().parent().parent().find('img')[0].currentSrc;
        let giphId = $(event.target).parent().parent().parent().find('img')[0].id;
        console.log(url);
        console.log(giphId);
        const template4 = `
        <div class="card" style="width: 18rem;">
            <img id="${giphId}" src="${url}" width="285" height="265"/>
                <div class="image-content">
                </div>
            </div>
        </div>
        `
    // $('#favorite-content').append(template4);

    const createFavoriteUrl = `http://localhost:3000/api/v1/createfavorite/${giphId}` // CAMEL CASE
  
    let favoriteData = {
      "giphId": giphId, 
      "url": url, 
      "userId": userId,
    }

    $.ajax({
      method: `POST`,
      url: `${createFavoriteUrl}`,
      data: favoriteData,
      success: console.log('favorite schema populated'),
      error: (error) => {
        console.log({error});
      }
    });
    // populateFavorites();
    })
     // ALI CODE
     $('.eye2').on('click', (event) =>{
      $('.modal-body').empty();
      let url = $(event.target).parent().parent().parent().find('img')[0].currentSrc;
      let giphId = $(event.target).parent().parent().parent().find('img')[0].id;
      console.log(url);
      console.log(giphId);
     
      const template6 = `
      <div class="card" style="width: 18rem;">
          <img id="${giphId}" src="${url}" width="485" height="465"/>
      <div class="image-content">
      </div>
      </div>
      </div>
      `
  
      $('.modal-body').append(template6);
    //  END ALI CODE
  });
}

  


const topicOne = () => {
    // event.preventDefault();
    let topic1Header = $(`#topic-1-header`).text()
    console.log(`https://api.giphy.com/v1/gifs/search?q=${topic1Header}&api_key=dc6zaTOxFJmzC`)
    $('#topic-1-content').empty();
    $.ajax({
        method: "GET",
        url: `https://api.giphy.com/v1/gifs/search?q=${topic1Header}&api_key=dc6zaTOxFJmzC`,
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

const successCreatedFav = (response) => {
  console.log(`response from success created fav`);
  $(`#favorite-content`).empty();
  response.data.forEach((favoritedGiphy) => {
    const template = `
    <div class="card" style="width: 18rem;">
      <img id="${favoritedGiphy.giphId}" src="${favoritedGiphy.url}" width="285" height="265"/>
      <div class="image-content">
      </div>
    </div>
    `
  $('#favorite-content').append(template);
    
  })
}

const populateFavorites = () => {
  $.ajax({
      method: `GET`,
      url: `http://localhost:3000/api/v1/showfavorite/${userId}`,
      success: successCreatedFav,
      error: onError

  });
}


const removeFavorite = () => {
  $.ajax({
    method: `DELETE`,
    url: `http://localhost:3000/api/v1/deletefavorite/${giphId}`,
    success: 'destroyed favorite',
    error: onError,
  })
}

function onError(xhr, status, errorThrown) {
	alert("Sorry, there was a problem!");
	console.log("Error: " + errorThrown);
	console.log("Status: " + status);
	console.dir(xhr);
}




