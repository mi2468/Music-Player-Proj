const musicList = document.querySelector(".music-list ul");
const allPlaylistButton = document.getElementById("allPlaylist");
const rockButton = document.getElementById("rock");
const popButton = document.getElementById("pop");
const melodyButton = document.getElementById("melody");
const heading = document.getElementById("heading");
const heartIcon = document.getElementById("heartIcon");
const icon = document.getElementById("icon");
const mainAudio = document.getElementById("main-audio");
const songDetails = document.querySelector(".song-details");
const imgArea = document.getElementById("imgArea");
const playPauseButton = document.querySelector(".play-pause i");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const repeatBtn = document.querySelector("#repeat-plist");
const shuffleBtn = document.querySelector("#shuffle");
const progressArea = document.querySelector(".progress-area");
const progressBar = document.querySelector(".progress-bar");
const currentTimeElement = document.querySelector(".current-time");
const maxDurationElement = document.querySelector(".max-duration");
const gifContainer = document.getElementById("gifContainer");

var updatedLists = [];
var all = [];
var selectedPlaylistType = 'all';

function handleApi() {
    fetch('script.json')
        .then(response => response.json())
        .then(data => {
            var songsAll = data.playlists;
            songsAll.forEach(song => {
                1
                updatedLists.push(song);
                all.push(song);
            });
            console.log("all", updatedLists);

            const storedData = localStorage.getItem('playlistData');
            if (storedData) {
                updatedLists = JSON.parse(storedData);
                updateMusicList(updatedLists);
            }
        })
        .catch(error => {
            console.log('Error loading JSON:', error);
        });
}

handleApi();

function updateMusicList(songs) {
    allPlaylistButton.addEventListener("click", function (event) {
        event.preventDefault();
        selectedPlaylistType = 'all';
        updatedLists = all;
        console.log("All Playlists", updatedLists.map(item => item.name));
        updateMusicList(updatedLists);
        localStorage.setItem('playlistData', JSON.stringify(updatedLists));
    });
    musicList.innerHTML = "";
    heading.innerHTML = "All Playlists";
    songs.forEach(song => {
        const listItem = document.createElement("li");
        const songInfo = document.createElement('div');
        const img = document.createElement('img');
        musicList.appendChild(listItem);
        listItem.appendChild(songInfo);
        img.classList.add("songImg");
        img.src = song.coverimage;
        songInfo.innerHTML = ` ${song.name}`;
        songInfo.appendChild(img);
        listItem.style.fontSize = "20px";
        listItem.addEventListener("click", () => {
            playSong(song);
            if (!isPlaying) {
                mainAudio.play();
                playPauseButton.textContent = "pause";
            }

            // isPlaying = !isPlaying;
        });
    });
}

function playSong(song, index) {
    // const songs = updatedLists[index];
    mainAudio.src = song.src;
    mainAudio.play();
    imgArea.style.display = "block";
    imgArea.src = song.coverimage;
    songDetails.innerHTML = `
    <p class="name">${song.name}</p>
    <p class="artist">${song.artist}</p>
    `;
    currentIndex = index;

    mainAudio.addEventListener("timeupdate", updateProgressBar); 

    mainAudio.addEventListener("ended", function () {
        playPauseButton.textContent = "play_arrow";
        isPlaying = false;
        let getText = repeatBtn.innerText;
        let currentIndex = 0;
        switch (getText) {
            // case "repeat":
            //     currentIndex = (currentIndex) % updatedLists.length;
            //     playSong(updatedLists[currentIndex], currentIndex);
            //     playPauseButton.textContent = "pause"
            //     break;
                case "repeat_one":
                    mainAudio.currentTime = 0;
                    mainAudio.play();
                    playPauseButton.textContent = "pause";
                break;
        }
        
    });
    // if (mainAudio.src !== song.src) {
    //     // Check if the selected song is different from the currently playing song
    //     mainAudio.src = song.src;
    //     mainAudio.load(); // Load the new audio source
    // }
    // mainAudio.play().then(() => {
    //     // Playback started successfully
    //     imgArea.style.display = "none";
    //     songDetails.innerHTML = `
    //         <p class="name">${song.name}</p>
    //         <p class="artist">${song.artist}</p>
    //     `;
    //     currentIndex = index;

    //     mainAudio.addEventListener("timeupdate", updateProgressBar);

    //     mainAudio.addEventListener("ended", function () {
    //         playPauseButton.textContent = "play_arrow";
    //         isPlaying = false;
    //         let getText = repeatBtn.innerText;
    //         switch (getText) {
    //             case "repeat":
    //                 currentIndex = (currentIndex + 1) % updatedLists.length;
    //                 playSong(updatedLists[currentIndex], currentIndex);
    //                 if (currentIndex === 0) {
    //                     // If we've reached the end of the playlist, loop back to the first song
    //                     currentIndex = 0;
    //                     playSong(updatedLists[currentIndex], currentIndex);
    //                 }
    //                 break;
    //             case "repeat_one":
    //                 mainAudio.currentTime = 0;
    //                 mainAudio.play();
    //                 break;
    //         }
    //     });
    // }).catch(error => {
    //     console.log("Play error:", error);
    // });
}


function handleRock() {
    selectedPlaylistType = 'rock';
    const nameSongs = all.filter(item => item.type.toLowerCase() === rockButton.value);
    updatedLists = nameSongs;
    heading.innerHTML = "Rock Playlist";
    musicList.innerHTML = "";
    nameSongs.forEach(song => {
        const listItem = document.createElement("li");
        const songInfo = document.createElement('div');
        const img = document.createElement('img');
        musicList.appendChild(listItem);
        listItem.appendChild(songInfo);
        img.classList.add("songImg");
        img.src = song.coverimage;
        songInfo.innerHTML = ` ${song.name}`;
        songInfo.appendChild(img);
        listItem.style.fontSize = "20px";
        listItem.addEventListener("click", () => {
            playSong(song);
            if (!isPlaying) {
                mainAudio.play();
                playPauseButton.textContent = "pause";
            }
        });
    });
}


function handleMelody() {
    selectedPlaylistType = 'melody';
    const melodySongs = all.filter(item => item.type.toLowerCase() === melodyButton.value);
    updatedLists = melodySongs;
    heading.innerHTML = "Melody Playlist";
    musicList.innerHTML = "";
    melodySongs.forEach(song => {
        const listItem = document.createElement("li");
        const songInfo = document.createElement('div');
        const img = document.createElement('img');
        musicList.appendChild(listItem);
        listItem.appendChild(songInfo);
        img.classList.add("songImg");
        img.src = song.coverimage;
        songInfo.innerHTML = ` ${song.name}`;
        songInfo.appendChild(img);
        listItem.style.fontSize = "20px";
        listItem.addEventListener("click", () => {
            playSong(song);
            if (!isPlaying) {
                mainAudio.play();
                playPauseButton.textContent = "pause";
            }
        });
    });
}

function handlePop() {
    selectedPlaylistType = 'pop';
    const popSongs = all.filter(item => item.type.toLowerCase() === popButton.value);
    console.log(popSongs);
    updatedLists = popSongs;
    heading.innerHTML = "Pop Playlist";
    musicList.innerHTML = "";
    popSongs.forEach(song => {
        const listItem = document.createElement("li");
        const songInfo = document.createElement('div');
        const img = document.createElement('img');
        musicList.appendChild(listItem);
        listItem.appendChild(songInfo);
        img.classList.add("songImg");
        img.src = song.coverimage;
        songInfo.innerHTML = ` ${song.name}`;
        songInfo.appendChild(img);
        listItem.style.fontSize = "20px";
        listItem.addEventListener("click", () => {
            playSong(song);
            if (!isPlaying) {
                mainAudio.play();
                playPauseButton.textContent = "pause";
            }
        });
    });
}

let isPlaying = false;
progressArea.addEventListener("click", function (e) {
    const progressAreaRect = progressArea.getBoundingClientRect();
    const clickX = e.clientX - progressAreaRect.left;
    const progressAreaWidth = progressAreaRect.width;
    const seekTime = (clickX / progressAreaWidth) * mainAudio.duration;

    mainAudio.currentTime = seekTime;
});
function updateProgressBar() {
    const currentTime = mainAudio.currentTime;
    const duration = mainAudio.duration;
    const progress = (currentTime / duration) * 100;

    progressBar.style.width = `${progress}%`;

    currentTimeElement.textContent = formatTime(currentTime);
    maxDurationElement.textContent = formatTime(duration);
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
repeatBtn.addEventListener("click", () => {
    let getText = repeatBtn.innerText;
    switch (getText) {
        case "repeat":
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "Song looped");
            break;
        case "repeat_one":
            repeatBtn.innerText = "repeat";
            repeatBtn.setAttribute("title", "Playlist looped");
            break;
    }
})
playPauseButton.addEventListener("click", function () {
    if (isPlaying) {
        mainAudio.pause();
        // playPauseButton.textContent = "play_arrow"; 
    } else {
        mainAudio.play();
        // playPauseButton.textContent = "pause";
    }
    isPlaying = !isPlaying;
    playPauseButton.textContent = isPlaying ? "pause" : "play_arrow";

})



let currentIndex = 0;
prevBtn.addEventListener("click", function () {
    if (currentIndex > 0) {
        currentIndex--;
        playPauseButton.textContent = "pause";
    } else {
        currentIndex = updatedLists.length - 1;
    }
    playSong(updatedLists[currentIndex], currentIndex);
});

nextBtn.addEventListener("click", function () {
    if (currentIndex < updatedLists.length - 1) {
        currentIndex++;
        playPauseButton.textContent = "pause";

    } else {
        currentIndex = 0;
    }
    playSong(updatedLists[currentIndex], currentIndex);
}) 

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleBtn.addEventListener("click", () => {
    if (selectedPlaylistType === 'all') {
        shuffleArray(all);
        updatedLists = all;
        playPauseButton.textContent = "pause";
    } else {
        shuffleArray(updatedLists);
    }

    updateMusicList(updatedLists);

    currentIndex = 0;
    playSong(updatedLists[currentIndex], currentIndex);
});