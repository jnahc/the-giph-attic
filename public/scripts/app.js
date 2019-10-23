
console.log(`yup`);

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

// already existing --- email, password, submit

// SHOW PAGE
$logout = $(`#logout`);

// EVENT LISTENERS

const onSignUpSuccess = () => {
  console.log(`sign up success`)
  window.location = `/login`;
}

$(`form`).submit(`submit`, (event) => {
  event.preventDefault();
  // console.log(`submitted`)
  const apiUrl = `http://localhost:3000/api/v1/signup`

  let subscriberData = {
    "name": $fullname.val(),
    "email": $email.val(),
    "password": $password.val(),
    "topic": $favoritetopic.val(),
    "topic2": $favoritetopic2.val(),
  }
  
  console.log(subscriberData);

  $.ajax({
    method: `POST`,
    url: `${apiUrl}`,
    data: subscriberData,
    success: onSignUpSuccess,
    error: (error) => {
      console.log({error});
    }
  });
});

// $('.heart').on('click', (event) => {
//   event.preventDefault();
//   const favortireUrl = `http://localhost:3000/api/v1/profile`

//   let favoriteData = {
//     // "topic": String, 
//     // "name": String,
//     // "ring, userId": St
//     "memeId": url1, 
//     "url": giphId, 
//   }

//   $.ajax({
//     method: `POST`,
//     url: `${favortireUrl}`,
//     data: favoriteData,
//     success: console.log('favorite schema populated'),
//     error: (error) => {
//       console.log({error});
//     }
//   });
// });

$signup.click(function(){
  console.log(`signup`);
});

$login.click(function(){
  console.log(`login`);
});

$logout.click(function(){
  console.log(`logout`)
})

