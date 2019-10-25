
// -------------------- SELECTORS

// HOMEPAGE
$signup = $(`#signup`);
$login = $(`#login`);

// SIGN UP PAGE
$fullname = $(`#fullname`);
$email = $(`#email`)
$password = $(`#password`);
$password2 = $(`#password2`);
$favoritetopic = $(`#favoritetopic`);
$favoritetopic2 = $(`#favoritetopic2`);
$agecheck = $(`#agecheck`);
$submit = $(`#submit`);

// LOGIN
$('.signup').on('click', () => {
  window.location = '/signup';
})

$('.login').on('click', () => {
  window.location = '/login';
})

// SHOW PAGE
$logout = $(`#logout`);

// EVENT LISTENERS

const onSignUpSuccess = () => {
  window.location = `/login`;
}

$(`form`).submit(`submit`, (event) => {
  event.preventDefault();
  const apiUrl = `api/v1/signup`

  if ($password.val() !== $password2.val()) {
    alert(`Passwords must match!`)
  } else {
    let subscriberData = {
      "name": $fullname.val(),
      "email": $email.val(),
      "password": $password.val(),
      "topic": $favoritetopic.val(),
      "topic2": $favoritetopic2.val(),
    }
    $.ajax({
      method: `POST`,
      url: `${apiUrl}`,
      data: subscriberData,
      success: onSignUpSuccess,
      error: (error) => {
        console.log({error});
      }
    });
  }
});


//homepage gif display
$gifGallery = $(`.gif-gallery`);

const onSuccessHomepage = (response)=>{
  response.data.forEach((gif)=>{
    const template = `<img src="${gif.images.fixed_height.webp}" />`
    $gifGallery.append(template);
  })
}

$.ajax({
  method: `GET`,
  url: `https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC&limit=25`,
  success: onSuccessHomepage,
  error: (error) => {
    console.log({error});
  }
})


$signup.click(function(){
  console.log(`signup`);
});

$login.click(function(){
  console.log(`login`);
});

$logout.click(function(){
  console.log(`logout`)
})

// --------HOME BUTTON LINK---------//
const returnHome = () => {
  window.location = '/'
}

$('.home').on('click', () => {
  returnHome();
})