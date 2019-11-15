const URL = "http://localhost:3000/beers"
const beerDetails = document.querySelector("#beer-detail")
const listGroup = document.querySelector(".list-group")
// let description = document.querySelector(".beerDescription")



document.addEventListener("DOMContentLoaded",(event)=>{
    fetch(URL)
    .then(resp=>resp.json())
    .then(beers=>getBeer(beers));

// console.log(listGroup)
// check fetch 



    function getBeer(beers){
       beers.forEach(beer=>{
            // console.log(listGroup)
            listGroup.insertAdjacentHTML('beforeend',`<li id=${beer.id} class="list-group-item">${beer.name}</li>`)
            // console.log(beer)
        })
    }
    listGroup.addEventListener("click", function(event){
        let thisBeer = event.target.id
        
        // console.log(thisBeer)

        fetch(`http://localhost:3000/beers/${thisBeer}`)
        .then(resp=>resp.json())
        .then(beer => beerDetail(beer));
        // console.log(event.target)

    })

        function beerDetail(beer){
        beerDetails.innerHTML=
        `
            <h1>${beer.name}</h1>
            <img src=${beer.image_url}>
            <h3>${beer.tagline}</h3>
            <textarea class="beerDescription">${beer.description}</textarea>
            <button id="${beer.id}" class="btn btn-info">
            Save
             </button>
        `
        
    }
        beerDetails.addEventListener("click", function(event){
            let thisBeerButton = event.target.id
            let description = document.querySelector('.beerDescription')
            // console.log(description.value)

            fetch(`http://localhost:3000/beers/${thisBeerButton}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            body: JSON.stringify({
                // id: beer.id
                description: description.value
                // key:value
            })
            
            
            })
        })
})


// *** Things to do in this order ***
// Add Event Listener on the Page.
// Fetch Get request with a function.
// create that function.
// console.log to see if it works.
// Create a const/let with list-group (querySelector, getElementByID) - it's a class so use a (.).
// Beer-Detail is an instance so use (#).
// Insert HTML in list-group with Beer.id and Beer.name.
// Create a event listener on list-group to show each beer with event.target - create your own variable and set it to that.
// Fetch with that beer URL + the variable.
// BeerDeatil (div) for each beer in fetch.
// create a function for BeerDetail and create a inner HTML for that.
// Create a event listener on that innerHTML  - click.
// Fetch PATCH - Key:Value.
// Console.log each code.
// Double check the spellings, arrow space, brackets.
// ****
