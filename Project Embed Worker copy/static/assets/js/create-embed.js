const form = document.getElementById('generate_embed_form')
form.addEventListener('submit', UploadEmbed)

async function UploadEmbed(event) {
    event.preventDefault()
    
    const emid = generateString(5)
    const title = document.querySelector(".title-input").value
    const description = document.querySelector(".description-input").value
    const image =  document.querySelector(".image-input").value
    const hex_colour = document.querySelector(".colour-input").value

    const response = await fetch('/uploader/worker/v1', {
        method: 'POST',
        headers:  {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            emid,
            title,
            description,
            image,
            hex_colour,
        })
    }).then((res) => res.json())
     
    if(response.status === 'ok') {
        alert("successfully created")
    } else {
        alert("error")
    }
}
function generateString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}
