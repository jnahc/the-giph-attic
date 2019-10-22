
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

// form.addEventListener(`submit`, (event) => {
//   event.preventDefault();
//   console.log(`a form was submitted`);
// });

$(`form`).submit(`submit`, (event) => {
  event.preventDefault();
  // console.log(`submitted`)
  const apiUrl = `http://localhost:3000/api/v1/signup`

  let subscriberData = {
    "name": $fullname.val(),
    

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

