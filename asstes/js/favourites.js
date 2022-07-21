// Display list of favorite hereos 
function displayFavHeros(){
    // check if any heros are stored in favorite list in localStorage
    if(localStorage.getItem('favHeroes') !== null){
        let heroes = JSON.parse(localStorage.getItem('favHeroes'));
        // for every hero id in our favorite heros list make an api request to get info about a hero and add info to the page
        console.log("heroes",heroes);
        heroes.forEach(hero => {
            let url = `https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=d06be3cefa09399f84d12402ed228a70&hash=3016962b4bb1956e45f354936372bed5&id=${hero}`;
            console.log(url);
            let xhrRequest = new XMLHttpRequest();
            xhrRequest.open('get',url,true);
            xhrRequest.send();
            xhrRequest.onload = function(){
            let data = JSON.parse(xhrRequest.responseText);
            console.log('Data',data);
            displayInfo(data);
            }
            }
        );
    }
}

// Create a card of a hero and show it the favorite list
function displayInfo(hero){
     
    // get the display container  div 
    let display = document.getElementById('fav-list');

    // create heroDiv to store all info about the hero eg: image,name,more-info button
    let heroDiv = document.createElement('div');


    let sideDiv = document.createElement('div');
    sideDiv.setAttribute('class','sideDiv');

    // Create the div to add image to it
    let imageDiv = document.createElement('div');
    // heroDiv.setAttribute('class','heroCard');

    console.log("hero" +hero.data.results);
    
    // create image Element and src to it from the response from the api 
    let image = document.createElement('img');
    image.setAttribute('src',`${hero.data.results[0].thumbnail.path}`+'.'+`${hero.data.results[0].thumbnail.extension}`);
    imageDiv.appendChild(image);

    // Div to add name of hero
    let nameDiv = document.createElement('div');
    nameDiv.setAttribute('class','name');
    nameDiv.innerHTML = `<span>Name </span>: ${hero.name}`

    // add more info button 
    let moreInfo = document.createElement('div');
    moreInfo.setAttribute('class','more-info');
    moreInfo.innerHTML = `More info..`;
    moreInfo.addEventListener('click',()=>{
        localStorage.setItem('id',hero.id);
        showHeroInfo(hero);
    })

    nameDiv.appendChild(moreInfo);
    
    let remFav = document.createElement('div');
    remFav.innerHTML = `<i class="fas fa-trash"></i>`;
    remFav.setAttribute('class','trash');
    remFav.addEventListener('click',()=>{

        removeFromFav(hero.id,heroDiv);
    });

    sideDiv.appendChild(nameDiv);

    // add the created divs to the heroDiv
    heroDiv.appendChild(imageDiv);
    heroDiv.appendChild(nameDiv);
    heroDiv.appendChild(remFav)
    heroDiv.appendChild(sideDiv);

    heroDiv.classList.add('heroCard');

    // add hero card of a single user to the div 
    display.appendChild(heroDiv);
}

// when clicked on more info take the user to show info about the selected hero
function showHeroInfo(hero){
    console.log('Hero clicked',hero);
    // similar behavior as an HTTP redirect
    window.location.replace(`./info.html`);
}

// remove a hero from fovorite list
function removeFromFav(heroId,heroDiv){
    heroDiv.style.display = 'none';

    // check if our fav heros list is present in localStorage

    // if found remove the id of the the hero from out fav hero list and remove the element from the page as well
    if(localStorage.getItem('favHeroes')!== null){
        let heroes = JSON.parse(localStorage.getItem('favHeroes'));
        const index = heroes.indexOf(heroId);
        console.log('Index of hero', index);
        if(heroes.includes(heroId)){
            console.log('Includes id');
            heroes.splice(index,1);
            localStorage.setItem('favHeroes',JSON.stringify(heroes));
        }
    }else{
        let display = document.getElementById('fav-list');
        display.innerHTML = `Add Favorite Heroes!`
    }
}

displayFavHeros();