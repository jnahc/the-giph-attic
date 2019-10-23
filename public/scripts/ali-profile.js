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


const template5 = `
<div class="card" style="width: 18rem;">
    <img id="39xDerRCIoX2WeUVBz" src="https://media2.giphy.com/media/39xDerRCIoX2WeUVBz/giphy.gif?cid=e1bb72ff5ce4eaba16ac94ca77b9771fdac4157601ddc2d5&rid=giphy.gif" width="285" height="265"/>
        <div class="image-content">
        </div>
    </div>
</div>
`

$('button').on('click', () => {       
 $('.modal-body').append(template5);
})

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

    // populate
// app.get('/api/v1/user', (req, res) => {
//   db.User.find({})
//       .populate('Favorite')
//       .exec((error, allUsers) => {
//           if (error) return console.log(error);
//           res.json({
//               status: 200,
//               count: allUsers.length,
//               data: allUsers,
//               requestedAt: new Date().toLocaleString()
//           });
//       })
// });
    

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
    $('#favorite-content').append(template3);

    const favoriteUrl = `http://localhost:3000/api/v1/createfavorite` // CAMEL CASE
  
    let favoriteData = {
      "memeId": giphId, 
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

    })
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
                        <button class="icon fas fa-eye"></button>
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
    $('#favorite-content').append(template4);

    const favoriteUrl = `http://localhost:3000/api/v1/createfavorite` // CAMEL CASE
  
    let favoriteData = {
      "memeId": giphId, 
      "url": url, 
      "userId": userId,
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

    })
    
}


/* <div class="icons">
<button class="icon fas fa-heart heart2"></button>
<button class="icon fas fa-eye"></button>
</div> */

// $('.heart').on('click', (event) => {
//     event.preventDefault();
//     console.log(`heart 1 clicked`)
//     // const favoriteUrl = `http://localhost:3000/api/v1/favorite`
  
//     // let favoriteData = {
//     //   "memeId": url, 
//     //   "url": giphId, 
//     // }

//     // $.ajax({
//     //   method: `POST`,
//     //   url: `${favoriteUrl}`,
//     //   data: favoriteData,
//     //   success: console.log('favorite schema populated'),
//     //   error: (error) => {
//     //     console.log({error});
//     //   }
//     // });
//   });

  


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



function onError(xhr, status, errorThrown) {
	alert("Sorry, there was a problem!");
	console.log("Error: " + errorThrown);
	console.log("Status: " + status);
	console.dir(xhr);
}


