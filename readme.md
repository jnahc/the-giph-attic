# The Giph Attic
## App Name

http://memeattic.herokuapp.com/

## Technologies Used
- Express API
- RESTful Routes
 - Full CRUD on User model, GET, POST, and DELETE on Favorites model
- AJAX
- jQuery
- Templating
- MongoDB
 - User Model, Favorites Model
- Git
 - 200+ commits 
- Visual Design
 - Flexbox
 - Vanilla CSS
 - BootStrap
- Heroku
 - http://memeattic.herokuapp.com/

## Existing Features
- Homepage
 - Trending GIFs (Stretch Goal!)
- Sign Up
 - Simple Form Validation 
- Login
 - Check for ID w/ existing email, and verify password
- Profile
 - Delete Account
 - Home Button to go back to /
 - Logout, to login page
 - See 2 topics from signup
  - Edit Both Topics (Stretch Goal!)
 - Refresh gifs related to topic (Stretch Goal!)
 - GIF in Modal (Stretch Goal!)
 - Favorite GIFs
  - Remove Favorite GIFs (Stretch Goal!)
 - Change Name


## Planned Features
- Family Friend VS Adult Mode (G Rating, R Rating)
- Explore other users by topic
- Suggested GIFs
- More CSS
 - Animation
- Auth
 - Sessions

## Triumphs
- Meets MVP requirements
- Teamwork
- Hit 5 stretch goals
- Improved debugging skills
- So much learning, where do we start???
- Fun Logo
- Great Practice in Git
 - Merging conflicts, resolving errors
- We both got to work out of our comfort zone (backend vs frontend)
- Getting AUTH set up error free on first try
- Trello

## Challenges
- READ REQUIREMENTS!
- Building out CSS/Design
- The UD of CRUD
-

## Words of Wisdom
- READ REQUIREMENTS! 

## Code We're Proud Of
Favorite Function
```
   $('.heart1').on('click', (event) =>{
        let url = $(event.target).parent().parent().parent().find('img')[0].currentSrc;
        let giphId = $(event.target).parent().parent().parent().find('img')[0].id;

    const favoriteUrl = `/api/v1/create-favorite/${giphId+userId}` // CAMEL CASE
  
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
```

View in Modal Function
```
$('.eye1').on('click', (event) =>{
    $('.modal-body').empty();
    let url = $(event.target).parent().parent().parent().find('img')[0].currentSrc;
    let giphId = $(event.target).parent().parent().parent().find('img')[0].id;
   
    const template5 = `
    <div class="card" style="width: 18rem;">
        <img id="${giphId}" src="${url}" width="465" height="auto"/>
    <div class="image-content">
    </div>
    </div>
    </div>
    `

    $('.modal-body').append(template5);
  });

```
Unique gif ID

```
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
  

```


## Appendix
- Project Planning Documents - https://drive.google.com/drive/folders/1hx5oKqZsZ-wDkwWCQzknCPu7DpIx9Gsj