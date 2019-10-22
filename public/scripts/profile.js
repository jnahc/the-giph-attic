

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
        url: `https://api.giphy.com/v1/gifs/search?q=spongebob&api_key=dc6zaTOxFJmzC`,
        success: onSuccess,
        error: onError
    });
}

const topicTwo = () => {
    // event.preventDefault();
    $('#topic-2-content').empty();
    $.ajax({
        method: "GET",
        url: `https://api.giphy.com/v1/gifs/search?q=southpark&api_key=dc6zaTOxFJmzC`,
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




"https://media2.giphy.com/media/3oEduVI94O3u3Q9ZXG/…e7293fc8f9be057c48cdd3ec230b3e178fd&rid=giphy.gif"