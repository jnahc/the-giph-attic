console.log(`profile-jeff connected`)

const userId = window.location.pathname.split(`/`)[2];

const onSuccess = (response)=>{
  console.log(response);
  $(`#welcome-user`).empty();
  $(`#welcome-user`).append(`Welcome, ${response.data.name}`);
  $(`#topic-1-header`).empty();
  $(`#topic-2-header`).append(``)
}

$.ajax({
  method: `GET`,
  url: `http://localhost:3000/api/v1/profile/${userId}`,
  success: onSuccess,
  error: (error) => {
    console.log({error})
  }
})