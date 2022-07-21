// Get id fromt the localStorage of the hero's info to be viewed 
let heroID = localStorage.getItem('id');

// Get hero info from the api by making request
function getHeroInfo(){
    let url = `https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=d06be3cefa09399f84d12402ed228a70&hash=3016962b4bb1956e45f354936372bed5&id=${heroID}`;
    console.log(url);
    let xhrRequest = new XMLHttpRequest();
    xhrRequest.open('get',url,true);
    xhrRequest.send();
    xhrRequest.onload = function(){
        let data = JSON.parse(xhrRequest.responseText);
        console.log('Data',data);
        findDetails(data);
    }
}

// Display info about the hero on the page 
function findDetails(hero){

    // let infoPage = document.getElementById('info-page');

    // // Create new div to add image of the hero
    // let imageDiv = document.createElement('div');
    // imageDiv.setAttribute('id','image');
    // let image = document.createElement('a');
    // // set url to the image 
    // // image.setAttribute('src',`${hero.data.results[0].thumbnail.path}`+'.'+`${hero.data.results[0].thumbnail.extension}`);
    // image.setAttribute('href',`${hero.data.results[0].urls[0].url}`)
    // imageDiv.appendChild(image);
    
    // Create div to display name of hero 
    // let heroDetails = document.createElement('div');
    // heroName.innerHTML = `${hero.data.results[0].urls[0].url}`
    let url = 'https://www.marvel.com/characters/3-d-man-chandler?ts=1&apikey=d06be3cefa09399f84d12402ed228a70&hash=3016962b4bb1956e45f354936372bed5'
    // let url = hero.data.results[0].urls[0].url;
    console.log(url);
    let xhrRequest = new XMLHttpRequest();
    



    xhrRequest.open('get',url,true);
    xhrRequest.send();
    xhrRequest.onload = function(){
        let data = JSON.parse(xhrRequest.responseText);
        console.log('Data',data);
        // displayInfo(data);
    }

}
function displayInfo (hero){
    // Appearance Div
    // // Create div to show apperance info of the hero
    // let appearanceDiv = document.createElement('div');
    // appearanceDiv.setAttribute('id','appearance')
    // appearanceDiv.innerHTML = `<h3>Appereance</h3>`;
    // let gender = document.createElement('p');
    // gender.innerHTML = `<span>Gender :</span> ${hero.appearance.gender}`;

    // let race = document.createElement('p');
    // race.innerHTML = `<span>Race :</span> ${hero.appearance.race}`

    // let height = document.createElement('p');
    // height.innerHTML = `<span>Height :</span> ${hero.appearance.height}`;
    
    // let weight =  document.createElement('p');
    // weight.innerHTML = `<span>Occupation :</span> : ${hero.appearance.weight}`;

    // let eyeColor = document.createElement('p');
    // eyeColor.innerHTML = `<span>Eye Color :</span> ${hero.appearance['eye-color']}`;

    // // add the created div to the the appearanceDiv 
    // appearanceDiv.appendChild(gender);
    // appearanceDiv.appendChild(race);
    // appearanceDiv.appendChild(height);
    // appearanceDiv.appendChild(weight);
    // appearanceDiv.appendChild(eyeColor);


    // Biograpghy

    // Create div to display biography of the hero
    // let bioDiv = document.createElement('div');
    // bioDiv.setAttribute('id','bio');
    // bioDiv.innerHTML = `<h3>Biography</h3>`
    // let fullName = document.createElement('p');
    // fullName.innerHTML = `<span>Full Name:</span> ${hero.biography['full-name']}`;

    // let allignment = document.createElement('p');
    // allignment.innerHTML = `<span>Alignment:</span>${hero.biography.alignment}`;

    // let firstApperance = document.createElement('p');
    // firstApperance.innerHTML = `<span>First Appearance:</span> : ${hero.biography['first-appearance']}`;


    // let placeOfBirth = document.createElement('p');
    // placeOfBirth.innerHTML = `<span>Place of Birth :</span> ${hero.biography['place-of-birth']}`;

    // let publisher = document.createElement('p');
    // publisher.innerHTML = `<span>Publisher:</span> ${hero.biography.publisher}`;
    
    // // add the created divs to the Biodiv
    // bioDiv.appendChild(fullName);
    // bioDiv.appendChild(allignment);
    // bioDiv.appendChild(firstApperance);
    // bioDiv.appendChild(placeOfBirth);
    // bioDiv.appendChild(publisher);


    // Power Stats 
    // create div to display power stats of the hero
    // let powerDiv = document.createElement('div');
    // powerDiv.setAttribute('id','power-stats');
    // powerDiv.innerHTML = `<h3>Power Stats</h3>`;

    // let intell = document.createElement('p');
    // intell.innerHTML = `<span>Intelligence :</span> ${hero.powerstats.intelligence}`

    // let strength = document.createElement('p');
    // strength.innerHTML = `<span>Strength :</span> ${hero.powerstats.strength}`;

    // let speed = document.createElement('p');
    // speed.innerHTML = `<span>Speed :</span> ${hero.powerstats.speed}`;

    // let durability = document.createElement('p');
    // durability.innerHTML = `<span>Durability :</span> ${hero.powerstats.durability}`;

    // let power = document.createElement('p');
    // power.innerHTML = `<span>Power :</span> ${hero.powerstats.power}`;

    // // add the created divs to the power Div 
    // powerDiv.appendChild(intell);
    // powerDiv.appendChild(strength);
    // powerDiv.appendChild(speed);
    // powerDiv.appendChild(durability);
    // powerDiv.appendChild(power);


    // Work 
    // Create work div display info about occupation and base
    // let workDiv = document.createElement('div');
    // workDiv.setAttribute('id','work');
    // workDiv.innerHTML = `<h3>Work</h3>`;

    // let occupation = document.createElement('p');
    // occupation.innerHTML = `<span>Occupation:</span> ${hero.work.occupation}`;

    // let base = document.createElement('p');
    // base.innerHTML = `<span>Base:</span> ${hero.work.base}`;

    // // add created divs to the workDiv
    // workDiv.appendChild(occupation);
    // workDiv.appendChild(base);

    // add all create divs to the main page
    infoPage.appendChild(imageDiv);
    // infoPage.appendChild(heroName);
    // infoPage.appendChild(bioDiv);
    // infoPage.appendChild(appearanceDiv);
    // infoPage.appendChild(powerDiv);
    // infoPage.appendChild(workDiv);

}


getHeroInfo();