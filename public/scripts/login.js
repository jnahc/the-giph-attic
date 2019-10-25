console.log(`yup`);

$submit = $(`#submit`);
$email = $(`#email`);
$password = $(`#password`);


const onSuccess = (res) => {
  console.log(`login success`)
  window.location = `/profile/${res.data.id}`;
}

$(`form`).submit(`submit`, (event) => {
  event.preventDefault();
  console.log(`submitted`)
  const apiUrl = `/api/v1/login`

  let subscriberData = {
    "email": $email.val(),
    "password": $password.val(),    
  }  
  console.log(`Submitter user login-> `,subscriberData);

  $.ajax({
    method: `POST`,
    url: `${apiUrl}`,
    data: subscriberData,
    success: onSuccess,
    error: (error) => {
      console.log({error});
    }
  });
});

// --------HOME BUTTON LINK---------//
const returnHome = () => {
  window.location = '/'
}

$('.home').on('click', () => {
  returnHome();
})
