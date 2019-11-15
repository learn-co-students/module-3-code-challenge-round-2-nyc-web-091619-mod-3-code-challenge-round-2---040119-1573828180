document.addEventListener("DOMContentLoaded", ()=>{

    let beerURL = 'http://localhost:3000/beers'
    let beerDetail = document.getElementById("beer-detail")
    
    fetch(beerURL)
    .then(function(resp){return resp.json()})
    .then(function(data){data.forEach(appendBeer)})
    
    
    function appendBeer(beer){
        let beerUl = document.getElementById("list-group")
        let beerLi = document.createElement("li")
        beerLi.className = "list-group-item"
        beerLi.innerText = beer.name
        
        beerUl.appendChild(beerLi)
        
        beerLi.addEventListener("click", function(){
            hideBeerInfo()
            showBeerInfo(beer)
        })
        
        function showBeerInfo(beer){
            let beerName = document.createElement('h1')
            let beerImg = document.createElement("img")
            let beerTagline = document.createElement("h3")
            let beerDescription = document.createElement("textarea")
            let beerButton = document.createElement("button")
            beerButton.className = "btn btn-info"
            beerButton.id = "edit-beer"
            beerButton.innerText = "Save"
            
            beerName.innerText = beer.name
            beerImg.src = beer.image_url
            beerTagline.innerText = beer.tagline
            beerDescription.value = beer.description
            
            beerDetail.appendChild(beerName)
            beerDetail.appendChild(beerImg)
            beerDetail.appendChild(beerTagline)
            beerDetail.appendChild(beerDescription)
            beerDetail.appendChild(beerButton)
            
            beerButton.addEventListener("click", function(){
                fetch(`http://localhost:3000/beers/${beer.id}` ,{
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json"
                    },
                    body: JSON.stringify({
                        description: beerDescription.value
                    })
                })
            })//end beerButton event listener
        }//end showBeerInfo
    }//end of appendBeer
    
    function hideBeerInfo(){
        beerDetail.innerHTML = ""
    }//end hideBeerInfo
    
})//end of DOM Content