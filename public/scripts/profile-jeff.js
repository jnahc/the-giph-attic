console.log(`profile-jeff connected`)

const userId = window.location.pathname.split(`/`)[2];

const onWorking = (response)=>{
  console.log(response);
  $(`#welcome-user`).empty();
  $(`#welcome-user`).append(`Welcome, ${response.data.name}`);
  $(`#topic-1-header`).empty();
  $(`#topic-1-header`).append(`${response.data.topic}`)
  $(`#topic-2-header`).empty();
  $(`#topic-2-header`).append(`${response.data.topic2}`)
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

// https://media3.giphy.com/media/PkLPBuyozY7F31wCxF/giphy.gif?cid=e1bb72ff30bc091b50a125cb0ebb8e34d82cb1e79949f33f&rid=giphy.gif