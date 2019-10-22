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