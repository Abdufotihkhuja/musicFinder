let ul = document.querySelector(".list")
async function getMusic(artist){
    let response = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${artist}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "e9ec0982bamsh56ce9453ad35772p1abc19jsn85027a3009fa",
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
        }
    })
    let musicData = await response.json()
    for(let element of musicData.data){
        let artistName = element.artist.name
        let musicName = element.title
        let musicFullVersion = element.link
        let audioLink = element.preview
        let artistPage = element.artist.link
        let bgImage = element.album.cover_big

        let li = document.createElement("li")
        let image = document.createElement("img")
        let headerDiv = document.createElement("div")
        let musicTitle = document.createElement("p")
        let artist = document.createElement("a")
        let musicLink = document.createElement("a")
        let shortAudio = document.createElement("audio")

        li.classList.add("item")
        image.setAttribute(`id`,`item--img`);
        headerDiv.classList.add("item--header")
        musicTitle.classList.add("music--title")
        artist.classList.add("artist")
        musicLink.setAttribute(`id`,"music--link")
        shortAudio.setAttribute(`id`,`music--audio`);
        shortAudio.controls;

        image.setAttribute(`src`,bgImage);
        musicTitle.textContent = musicName
        artist.textContent = artistName
        artist.setAttribute(`href`,artistPage)
        musicLink.setAttribute(`href`,musicFullVersion)
        musicLink.textContent = `Listen full music`
        shortAudio.controls = true
        shortAudio.setAttribute(`src`,audioLink)

        ul.appendChild(li)
        li.appendChild(image)
        li.appendChild(headerDiv)
        headerDiv.appendChild(musicTitle)
        headerDiv.appendChild(artist)
        li.appendChild(musicLink)
        li.appendChild(shortAudio)
    }
}
document.addEventListener('play',(event)=>{
    let audios = document.querySelectorAll("#music--audio")
    for(let audio of audios){
        if(audio != event.target){
            audio.pause()
        }
    }
},true)
search.onkeyup = (event)=>{
    if(event.keyCode == 13){
        ul.innerHTML = null
        getMusic(search.value)
        search.value = null
    }
}

getMusic()