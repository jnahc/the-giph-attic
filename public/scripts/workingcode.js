$('.heart2').on('click', (event) =>{
  console.log(`heart 2 clicked`)
  let url = $(event.target).parent().parent().parent().find('img')[0].currentSrc;
  let giphId = $(event.target).parent().parent().parent().find('img')[0].id;
  // fave.push(url1);
  console.log(url);
  console.log(giphId);
  const template4 = `
  <div class="card" style="width: 18rem;">
      <img id="${giphId}" src="${url}" width="285" height="265"/>
          <div class="image-content">
              <div class="icons">
                  <button class="icon fas fa-heart heart2"></button>
                  <button class="icon fas fa-eye"></button>
              </div>
          </div>
      </div>
  </div>
  `
$('#favorite-content').append(template4);
const favoriteUrl = `/api/v1/createfavorite`
let favoriteData = {
  "memeId": giphId, 
  "url": url, 
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
