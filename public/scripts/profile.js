// grabbing information from user db - jeff code

const userId = window.location.pathname.split(`/`)[2];

const onWorking = (response)=>{
  // console.log(response);
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

const updateHeaders = () => {
  $.ajax({
    method: `GET`,
    url: `http://localhost:3000/api/v1/profile/${userId}`,
    success: onWorking,
    error: (error) => {
      console.log({error})
    }
  })
}

updateHeaders();




// --------HOME BUTTON LINK---------//
const returnHome = () => {
  window.location = '/'
}

$('.home').on('click', () => {
  returnHome();
})


const onLogoutSuccess = () => {
  window.location = `/login`
}

$(`#welcome-area`).on(`click`,`#change-name`, (event) => {
  event.preventDefault();
  console.log(`change name clicked`)
  $(`#welcome-area`).empty();
  $(`#welcome-area`).append(`
  <form>
    <div class="form-group">
      <label for="fullname"></label>
      <textarea class="form-control" id="fullname" name="fullname" rows="1"></textarea>
    </div>
    <button type="button" class="btn btn-secondary btn-sm" id="confirm-name-change">
      Confirm Name Change
    </button>
    <button type="button" class="btn btn-secondary btn-sm" id="cancel-name-change">
      Cancel
    </button>
  </form>
  `)

})

$(`#welcome-area`).on(`click`, "#cancel-name-change", (event) => {
  event.preventDefault();
  console.log(`cancel button clicked`);
  $(`#welcome-area`).empty();
  $(`#welcome-area`).append(`
  <span class="navbar-brand mb-0 mx-auto" id="welcome-user">Welcome, User!</span>
  <button type="button" class="btn btn-secondary btn-sm" id="change-name">
    Change Name
  </button>
  `);
  updateHeaders();
})

$(`#welcome-area`).on(`click`, "#confirm-name-change", (event) => {
  event.preventDefault();
  let newNameVal = $(`#fullname`).val()
  console.log(`confirm name change button clicked`);
  console.log(newNameVal);
  $(`#welcome-area`).empty();
  $(`#welcome-area`).append(`
  <span class="navbar-brand mb-0 mx-auto" id="welcome-user">Welcome, User!</span>
  <button type="button" class="btn btn-secondary btn-sm" id="change-name">
    Change Name
  </button>
  `)

    $.ajax({
    method: `PUT`,
    url: `http://localhost:3000/api/v1/update/${userId}`,
    data: 
    {"name": newNameVal}
    ,
    success: (success) => {
      console.log(success);
    },
    error: (error) => {
      console.log({error})
    }
  });
  updateHeaders();
})

$(`#manage-account`).on(`click`,`#delete-account`, (event) => {
  event.preventDefault();
  console.log(`delete account clicked`)
  $(`#manage-account`).empty();
  $(`#manage-account`).append(`
  <button class="btn btn-outline-danger" type="button" id="confirm-delete">Confirm Account Delete</button>
  <button class="btn btn-outline-info" type="button" id="cancel-delete">No, I love Giphs</button>
  `)
})

$(`#manage-account`).on(`click`, `#cancel-delete`, (event) => {
  event.preventDefault();
  console.log(`cancel delete clicked`)
  $(`#manage-account`).empty();
  $(`#manage-account`).append(`
  <button class="btn btn-outline-danger" type="button" id="delete-account">Delete Account</button>
  `)
})

const onDeleteSuccess = () => {
  window.location = `/`
}

$(`#manage-account`).on(`click`, `#confirm-delete`, (event) => {
  event.preventDefault();
  console.log(`confirm delete clicked`);
  $.ajax({
    method: `DELETE`,
    url: `http://localhost:3000/api/v1/delete/${userId}`,
    success: onDeleteSuccess,
    error: (error) => {
      console.log({error});
    }
  });
});

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




let count = 0
const onSuccess = (response) => {
    count += 25;
    response.data.forEach((giphy)=>{
        const template = `
        <div class="card" style="width: 18rem;">
            <img id="${giphy.id}" src="${giphy.images.downsized.url}" width="275" height="265"/>
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

    const favoriteUrl = `http://localhost:3000/api/v1/create-favorite/${giphId+userId}` // CAMEL CASE
  
    let favoriteData = {
      "giphId": giphId+userId, 
      "url": url, 
      "userId": userId
    }

    $.ajax({
      method: `POST`,
      url: `${favoriteUrl}`,
      data: favoriteData,
      success: populateFavorites,
      error: (error) => {
        console.log({error});
      }
    });
    
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
    count2 += 25;
    response.data.forEach((giphy)=>{
        const template2 = `
        <div class="card" style="width: 18rem;">
            <img id="${giphy.id}" src="${giphy.images.downsized.url}" width="275" height="265"/>
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
      

    const createFavoriteUrl = `http://localhost:3000/api/v1/create-favorite/${giphId+userId}` // CAMEL CASE
   
  
    let favoriteData = {
      "giphId": giphId+userId, 
      "url": url, 
      "userId": userId,
    }

    $.ajax({
      method: `POST`,
      url: `${createFavoriteUrl}`,
      data: favoriteData,
      success: populateFavorites,
      error: (error) => {
        console.log({error});
      }
    });
    })
 
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
   
    let topic1Header = $(`#topic-1-header`).text()
    $('#topic-1-content').empty();
    $.ajax({
        method: "GET",
        url: `https://api.giphy.com/v1/gifs/search?q=${topic1Header}&api_key=dc6zaTOxFJmzC&limit=10`,
        success: onSuccess,
        error: onError
    });
    $('.redo').on('click',() => {
      $('#topic-1-content').empty();
      $.ajax({
          method: "GET",
          url: `https://api.giphy.com/v1/gifs/search?q=${topic1Header}&api_key=dc6zaTOxFJmzC&offset=${count}&limit=10`,
          success: onSuccess,
          error: onError
      });
  })
}

const topicTwo = () => {
    // event.preventDefault();
    let topic2Header = $(`#topic-2-header`).text()
    $('#topic-2-content').empty();
    $.ajax({
        method: "GET",
        url: `https://api.giphy.com/v1/gifs/search?q=${topic2Header}&api_key=dc6zaTOxFJmzC&limit=10`,
        success: onSuccess2,
        error: onError
    });
    $('.redo2').on('click',() => {
      $('#topic-2-content').empty();
      $.ajax({
          method: "GET",
          url: `https://api.giphy.com/v1/gifs/search?q=${topic2Header}&api_key=dc6zaTOxFJmzC&offset=${count2}&limit=10`,
          success: onSuccess2,
          error: onError
      });
  })
}

const successCreatedFav = (response) => {
  console.log(`response from success created fav`);
  $(`#favorite-content`).empty();
  response.data.forEach((favoritedGiphy) => {
    const template = `
    <div class="card" style="width: 18rem;">
      <img id="${favoritedGiphy.giphId}" src="${favoritedGiphy.url}" width="285" height="265"/>
      <div class="image-content">
        <div class="icons">
           <button id="delete" class="icon fas fa-times x1"></button>
           <button  class="icon fas fa-eye eye3" data-toggle="modal" data-target="#exampleModalCenter"></button>
        </div>
      </div>
    </div>
    `
  $('#favorite-content').append(template);
    
  })
  $('#favorite-content').on('click',`#delete`, (event) => {
    let giphId = $(event.target).parent().parent().parent().find('img')[0].id;
    console.log('x clicked');
    console.log(giphId);
      $.ajax({
        method: `DELETE`,
        url: `http://localhost:3000/api/v1/delete-favorite/${giphId}`,
        success: (res)=>{console.log(res)},
        error: onError,
      })
      populateFavorites();
  })
  $('.eye3').on('click', (event) =>{
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

const populateFavorites = () => {
  $.ajax({
      method: `GET`,
      url: `http://localhost:3000/api/v1/show-favorite/${userId}`,
      success: successCreatedFav,
      error: onError

  });
}


function onError(xhr, status, errorThrown) {
	alert("Sorry, there was a problem!");
	console.log("Error: " + errorThrown);
	console.log("Status: " + status);
	console.dir(xhr);
}

$(`#topic-1-header`).on(`click`, `#topicOneSearchButton`, (event) => {
  event.preventDefault();
  console.log(`topic 1 search button clicked`)
  $.ajax({
    method: `PUT`,
    url: `http://localhost:3000/api/v1/update/${userId}`,
    data: {
      "topic":$(`#topicOneSearch`).val()
    },
    success: topicSearch,
    error: (error) => {
      console.log({error})
    }
  })
})

$(`#topic-1-header`).on(`click`, () => {
  const onTopicSearch = (response)=>{    
    let topicOneValue = response.data.topic;   
    let topicTwoValue = response.data.topic2;
    $(`#topic-1-header`).empty();
    $(`#topic-1-header`).append(`
    <form>
      <div class="form-group">
        <label for="topicOneSearch"></label>
        <textarea class="form-control" id="topicOneSearch" name="topicOneSearch"  rows="1">${topicOneValue}</textarea>
      </div>
      <button type="button" class="btn btn-secondary btn-sm" id="topicOneSearchButton">Search</button
    </form>
    `);
    $(`#topic-2-header`).empty();
    $(`#topic-2-header`).append(`
    <form>
      <div class="form-group">
        <label for="topicTwoSearch"></label>
        <textarea class="form-control" id="topicTwoSearch" name="topicTwoSearch"  rows="1">${topicTwoValue}</textarea>
      </div>
      <button type="button" class="btn btn-secondary btn-sm" id="topicOneSearchButton">Search</button
    </form>
    `)
  }  
  $.ajax({
    method: `GET`,
    url: `http://localhost:3000/api/v1/profile/${userId}`,
    success: onTopicSearch,
    error: (error) => {
      console.log({error})
    }
  })

})





