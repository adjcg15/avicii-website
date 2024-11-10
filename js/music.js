window.onload = function() {
    const musicPlayers = document.getElementsByClassName("song__player");
    
    for (let player of musicPlayers) {
        player.addEventListener("click", handlePlayerClick);
    }
}

function handlePlayerClick(event) {
    const buttonClicked = event.currentTarget;
    const songId = buttonClicked.value;
    const song = document.getElementById(songId);
    
    stopOtherSongs(songId);

    if(song.paused) {
        song.play();
        buttonClicked.classList.add("isPlaying");
        song.ontimeupdate = () => updateSongProgressbar(song, buttonClicked);
    } else {
        song.pause();

        buttonClicked.classList.remove("isPlaying");
        buttonClicked.style.background = "transparent";
    }
}

function stopOtherSongs(currentSongId) {
    const songsList = document.getElementsByTagName("audio");

    for (let song of songsList) {
        if(song.id !== currentSongId) {
            song.pause();
        }
    }

    updateUnusedPlayersGUI(currentSongId);
}

function updateUnusedPlayersGUI(currentSongId) {
    const playersList = document.getElementsByClassName("song__player");

    for (let player of playersList) {
        if(currentSongId !== player.value) {
            player.classList.remove("isPlaying");
            player.style.background = "transparent";
        }
    }
}

function updateSongProgressbar(audio, buttonClicked) {
    const progress = (audio.currentTime / audio.duration) * 100;
    buttonClicked.style.background = `conic-gradient(#609ddf calc(${progress} * 3.6deg), #0068d870 0deg)`;
}

function stopAllSongs() {
    const songElements = document.getElementsByTagName("audio");
    for (let song of songElements) {
        song.pause();
    }

    const musicPlayers = document.getElementsByClassName("song__player");
    for (let player of musicPlayers) {
        player.classList.remove("isPlaying");
        player.style.background = "transparent";
    }
}