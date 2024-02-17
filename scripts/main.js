let search = document.querySelector('.anime')
let results = document.getElementById('results')

document.addEventListener('keydown', e =>{
    if(e.key == 'Enter') showAnimeInfos(document.querySelector('.anime').value)
})

async function showAnimeInfos(element){
    let anime = element

    let urlData = await fetch(`https://api.jikan.moe/v4/anime?q=${anime}&sfw`);
    let data = await urlData.json();
    
    for(let i = 0; i < data.data.length; i++){
        
        // create the cards where show the all anime info's
        let divCard = document.createElement('div');
        divCard.setAttribute('class', 'card');

        // create the info div where store the text
        let divInfo = document.createElement('div');
        divInfo.setAttribute('class', 'info');

        // create the the title info
        let title = document.createElement('p');
        title.setAttribute('class', 'title')
        let bTitle = document.createElement('strong');

        // create the synopsis info
        let desc = document.createElement('p');
        let bDesc = document.createElement('strong');

        // create the img tag for store a anime image
        let img = document.createElement('img');

        // create the episodes info
        let episodes = document.createElement('p');
        let bEpispdes= document.createElement('strong');

        // create the score info
        let score = document.createElement('p');
        let bScore = document.createElement('strong');

        results.appendChild(divCard); // adding the div "card" on div "results"
        divCard.appendChild(divInfo);

        bTitle.textContent = 'Title: ' // title text
        title.textContent = data.data[i].title != null ? data.data[i].title: '{ API NOT FOUND A RESULT }'; // title founded on API

        bDesc.textContent = 'Synopsis: '
        desc.textContent = replaceEnd(data.data[i].synopsis)

        img.setAttribute('src', data.data[i].images.jpg.image_url)

        bEpispdes.textContent = 'Episodes: '
        episodes.textContent = data.data[i].episodes != null ? data.data[i].episodes: '{ API NOT FOUND A RESULT }';

        bScore.textContent = 'Score: '
        score.textContent = data.data[i].score != null ? data.data[i].score: '{ API NOT FOUND A RESULT }';

        divInfo.appendChild(bTitle);
        divInfo.appendChild(title);

        divInfo.appendChild(bDesc);
        divInfo.appendChild(desc);

        divInfo.appendChild(bEpispdes);
        divInfo.appendChild(episodes);
        
        divInfo.appendChild(bScore)
        divInfo.appendChild(score)

        divCard.appendChild(img);
    }
    search.value = ''
    search.blur()
}

// remover all elements of results
function clearAll(){
    let elements = document.getElementById('results');
    // trocar
    if(document.getElementsByClassName('card').length > 1){
        while(elements){
            if(document.getElementsByClassName('card').length == 0) {
                break
            }
            elements.removeChild(elements.firstChild)
        }
    }

}

// Function for replace the text that execed the limit of character (490)
function replaceEnd(e){

    if(e.length > 490){
        return e.substr(0, 490) + '...'
        
    } else{
        return e
    }
    
}