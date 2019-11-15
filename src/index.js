document.addEventListener('DOMContentLoaded', (event) => {

fetch('http://localhost:3000/beers')
    .then(resp=>resp.json())
    .then(beers=>{renderBeers(beers); console.log(beers)})

let beerList = document.getElementById('list-group')
let beerDetail = document.getElementById('beer-detail')


function renderBeers(beers){
    beers.forEach((beer)=>{
        beerList.innerHTML += 
        `
        <li class="list-group-item" id='${beer.id}'>${beer.name}</li>
        `
    })
}

document.addEventListener('click', (e)=>{
    if (e.target.classList[0] === 'list-group-item'){
        console.log(e.target)
        getBeerDetails(e.target.id)
    }
})

function getBeerDetails(beerId){
    fetch(`http://localhost:3000/beers/${beerId}`)
        .then(resp=>resp.json())
        .then(beer=>beerDetails(beer))
}

function beerDetails(beer){
    beerDetail.innerHTML =
    `
    <h1 class='${beer.id}'>${beer.name}</h1>
    <img src="${beer.image_url}">
    <h3>${beer.tagline}</h3>
    <textarea>${beer.description}</textarea>
    <button id="edit-beer" class="btn btn-info">
    Save
    </button>
    `
}

let details = document.getElementById('beer-detail')

details.addEventListener('click', (e)=>{
    if (e.target.classList[0] === 'btn'){
        // let description = 
        // console.log(e.target.previousSibling.previousSibling.innerText)
        let id = e.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.classList[0]
        console.log(id)
        editInfo(id, description)
        

    }
})

function editInfo(id, description){
    fetch(`http://localhost:3000/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            description
        }),
        headers: { 
            'Content-Type': 'application/json',
            'accept': 'application/json'
        }
    })
}


}); // END OF DOM CONTENT LOADED

// beer names should show up as

/* <ul class="list-group">
  <li class="list-group-item">Beer title 1</li>
  <li class="list-group-item">Beer title 2</li>
</ul> */

// click a beer name
// <div id="beer-detail">
// </div>

// edit beer details

// beerDetail.innerHTML =
// `
// <h1>${beer.name}</h1>
// <img src="${beer.image_url}">
// <h3>${beer.tagline}</h3>
// <textarea>${beer.description}</textarea>
// <button id="edit-beer" class="btn btn-info">
// Save
// </button>
// `