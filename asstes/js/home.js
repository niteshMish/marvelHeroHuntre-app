const search = document.getElementById('search-hero');
const searchInput = document.getElementById('search-input');
let superherolist = document.getElementById('heros-list');
console.log("---search" +searchInput);
// import md5 from 'crypto-js';


// Get yours APIs key at https://developer.marvel.com

// let generetedHash = function hashcode (){

// const PUBLIC_KEY = 'bf6fa6601a02b38821f743614f27c307'; // your public key
// const PRIVATE_KEY = 'bf23005944d8a38a24c1b2daf10e4f4354da7c6a'; // youur private key
// const ts = Number(new Date());
// const hash = CryptoJS.MD5(ts + PRIVATE_KEY + PUBLIC_KEY);
// console.log(hash);
// }
// generetedHash();
// export default function Heroes({ navigation }) {
//   const [feedHeroes, setFeedHeroes] = useState([]);

//   useEffect(() => {
//       async function loadHeroesCharacters() {
//         const ts = Number(new Date());
//         const hash = md5.create();
//         hash.update(ts + PRIVATE_KEY + PUBLIC_KEY);
//       }
//     });
// }
//take input from search bar and send a request to api to find the hero
// let typingTimer;                
// let doneTypingInterval = 250;  
// searchInput.addEventListener('keyup',() =>{
//     clearTimeout(typingTimer);
//     if (searchInput.value) {
//         typingTimer = setTimeout(getHero, doneTypingInterval);
//     }
// });

searchInput.addEventListener('input',getHero);
getHero();
// send request to api to get information about a hero
function getHero(){
    
    console.log(searchInput);
    let url ;
    if(searchInput.value==""){
        url = `https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=d06be3cefa09399f84d12402ed228a70&hash=3016962b4bb1956e45f354936372bed5`;
    }else{
        url = `https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=d06be3cefa09399f84d12402ed228a70&hash=3016962b4bb1956e45f354936372bed5&name=${searchInput.value}`; 
    }
    
    let xhrRequest = new XMLHttpRequest();
    xhrRequest.open('get',url,true);
    
    xhrRequest.onload = function(){
        let data = JSON.parse(xhrRequest.responseText);
        console.log('Data---->',data);
        displayInfo(data);
    }
    xhrRequest.send();
}

// When clicked on more info take user to hero info page 
function showHeroInfo(hero){
    console.log('Hero clicked',hero);
    // similar behavior as an HTTP redirect
    window.location.replace(`./hero_details.html`);
}


// To  add a hero to favorite list
function addToFavorite(id,btnId){

    let favHeroes;
    // check if our favorite is already present 
    // if not create a new array to store our favorite heroes
    if(localStorage.getItem('favHeroes') === null){
        console.log(localStorage.getItem('favHeroes'));
        favHeroes = [];
    }else{
        // or get the favorite array 
        favHeroes = JSON.parse(localStorage.getItem('favHeroes'));
    }
    // add superheroes id to the array check if id is already present
    if(!favHeroes.includes(id)){
        favHeroes.push(id);
    }
    
    btnId.innerHTML = `Added to Favorites`
    btnId.style.backgroundColor = '#cc0000'; 
    localStorage.setItem('favHeroes',JSON.stringify(favHeroes));
    console.log(`hero id${id}`);
}

// display heroes according to the response received by the api
function displayInfo(data){

    // if results found, display the results
    let results = data.data.results;
    if(!results){
        document.getElementById('heros-list').innerText = 'No hero found';
    }else{
        // else create a card for a particular hero and add it to the div
        superherolist.innerHTML = '';
        for(let hero of results){
           
            // create div to display info about single hero 
           let infoCard = document.createElement('div');
           infoCard.setAttribute('class','superhero');

            // image div to display image of hero

           let imageDiv = document.createElement('div');
           imageDiv.setAttribute('class','image');
           
           let image = document.createElement('img');
           image.setAttribute('src',`${hero.thumbnail.path}`+'.'+`${hero.thumbnail.extension}`);
           imageDiv.appendChild(image);
           infoCard.appendChild(imageDiv);



           //// hero details page link

        //    let redirectDiv = document.createElement('div');
        //    redirectDiv.setAttribute('class','link');
        //    let anchor = document.createElement('a');
        //    anchor.setAttribute('src',`${hero.urls[0].url}` , 'value' , image);
        //    imageDiv.appendChild(anchor)
        //    infoCard.appendChild(redirectDiv);
            
            // name div to display name of hero
           let nameDiv = document.createElement('div');
           nameDiv.setAttribute('class','name');
           nameDiv.innerHTML = `Name : ${hero.name}`
            infoCard.appendChild(nameDiv);

            // add favorite button  
            let favBtn = document.createElement('div');
            favBtn.setAttribute('class','fav-btn');

            if(localStorage.getItem('favHeroes') == null){
                favBtn.innerHTML = `Add to Favorite &nbsp; &nbsp;  <i class="fas fa-heart"></i>`;
                    favBtn.setAttribute('class','fav-btn');
            }else{
                if(localStorage.getItem('favHeroes')!= null){
                    let heroes = JSON.parse(localStorage.getItem('favHeroes'));
                    if(heroes.includes(hero.id)){
                        favBtn.innerHTML = `Added to Favorites`;
                        favBtn.setAttribute('class','fav-btn');
                        favBtn.style.backgroundColor = '#cc0000';
                    }else{
                         favBtn.innerHTML = `Add to Favorite &nbsp; &nbsp;  <i class="fas fa-heart"></i>`;
                         favBtn.setAttribute('class','fav-btn');
                    }
                 }
            }
           
            
            // on clicking add to favorite btn add id of the hero to local Storage
            favBtn.addEventListener('click',()=>{
                addToFavorite(hero.id,favBtn);
            });

            let moreInfo = document.createElement('div');
            moreInfo.setAttribute('class','more-info');
            moreInfo.innerHTML = `More Info..`;
            
            // show more info when clicked on more-info button
            moreInfo.addEventListener('click', (event) =>{
                console.log('Inside moreInfo');
                localStorage.setItem('id',hero.id);
                showHeroInfo(hero);
                console.log('hero', event);
            });


            // add the created divs to infoCard of a hero 
            infoCard.appendChild(favBtn);
            infoCard.appendChild(moreInfo);

        // add the card of the hero to the div on the page 
        superherolist.appendChild(infoCard);
           
        }


    }

}