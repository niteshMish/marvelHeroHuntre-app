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
        displayInfo(data);
    }
}

// Display info about the hero on the page 
function displayInfo(hero){

    let infoPage = document.getElementById('info-page');

    // Create new div to add image of the hero
    let imageDiv = document.createElement('div');
    imageDiv.setAttribute('id','image');
    let image = document.createElement('img');
    // set url to the image 
    image.setAttribute('src',`${hero.data.results[0].thumbnail.path}`+'.'+`${hero.data.results[0].thumbnail.extension}`);
    // image.setAttribute('src',`${hero.data.results[0].urls[0].url}`)
    imageDiv.appendChild(image);
    
    // Create div to display name of hero 
     let heroName = document.createElement('div');
     heroName.innerHTML = `<h2>${hero.data.results[0].name}</h2>`


     
     // comics section
    let  comicDiv = document.createElement('div');
    comicDiv.setAttribute('class','comic');
    let name_of_comic_section = document.createElement('h1');
    name_of_comic_section.innerHTML = `Comics`;
    comicDiv.appendChild(name_of_comic_section);
    console.log("len" + hero.data.results[0].comics.items.length );
    for( let i = 0 ; i < hero.data.results[0].comics.returned ;i++){
        let comicName = document.createElement('div');
        comicName.setAttribute('class' , 'comicName');
        console.log(hero.data.results[0].comics.items[i].name);
        comicName.innerHTML = `<h2>${hero.data.results[0].comics.items[i].name}<h2>`;
        comicDiv.appendChild(comicName);
    }
    

    ////// stories section

    /// story div
    let  storiesDiv = document.createElement('div');
    storiesDiv.setAttribute('class','stories');
     // name of div
    let name_of_story_section = document.createElement('h1');
    name_of_story_section.innerHTML = `Stories`;
    storiesDiv.appendChild(name_of_story_section);
    
    console.log("len" + hero.data.results[0].stories.items.length );
    for( let i = 0 ; i < hero.data.results[0].stories.returned ;i++){
        let storyName = document.createElement('div');
        storyName.setAttribute('class' , 'storyName');
        console.log(hero.data.results[0].stories.items[i].name);
        storyName.innerHTML = `<h2>${hero.data.results[0].stories.items[i].name}<h2>`;
        storiesDiv.appendChild(storyName);
    }

    
     
   ////// serise section 
     let  seriesDiv = document.createElement('div');
     seriesDiv.setAttribute('class','series');
     let name_of_series_section = document.createElement('h1');
     name_of_series_section.innerHTML = `Series`;
     seriesDiv.appendChild(name_of_series_section);
    
     console.log("len" + hero.data.results[0].series.items.length );
     for( let i = 0 ; i < hero.data.results[0].series.returned ;i++){
         console.log(hero.data.results[0].series.items[i].name);
         let seriesName = document.createElement('div');
         seriesName.setAttribute('class' , 'seriesName');
         seriesName.innerHTML = `<h2>${hero.data.results[0].series.items[i].name}<h2>`;
         seriesDiv.appendChild(seriesName);
     }
    // anouther div to contain comic div , series div , story div
    let  infoDiv = document.createElement('div');
    seriesDiv.setAttribute('class','info-div');
    
    infoDiv.appendChild(comicDiv);
    infoDiv.appendChild(seriesDiv);
    infoDiv.appendChild(storiesDiv);
    

///// finally  added to infopage div whisch is main div
    infoPage.appendChild(imageDiv);
    infoPage.appendChild(heroName);
    infoPage.appendChild(infoDiv);
    
    

}


getHeroInfo();