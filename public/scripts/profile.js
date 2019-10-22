
let count = 0
const onSuccess = (response) => {
    count += 26;
    response.data.forEach((giphy)=>{
        const template = `
        <div class="card" style="width: 18rem;">
            <img src="${giphy.images.downsized.url}" width="285" height="265"/>
                <div class="image-content">
                    <div class="icons">
                        <a href="#" class="icon fas fa-heart"></a>
                        <a href="#" class="icon fas fa-eye"></a>
                    </div>
                </div>
            </div>
        </div>
        `
        $('#topic-1-content').append(template);
        
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
                        <a href="#" class="icon fas fa-heart"></a>
                        <a href="#" class="icon fas fa-eye"></a>
                    </div>
                </div>
            </div>
        </div>
        `
        $('#topic-2-content').append(template2);
    })
}


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


