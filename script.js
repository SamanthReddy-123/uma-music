let musicTracks = JSON.parse(localStorage.getItem('musicTracks')) || [];
let audio = new Audio();
let currentTrackIndex = -1;

function displayTracks() {
    const trackList = document.getElementById('tracks');
    trackList.innerHTML = '';
    musicTracks.forEach((track, index) => {
        const li = document.createElement('li');
        li.textContent = `${track.title} - ${track.artist}`;
        li.dataset.index = index;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';
        removeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            musicTracks.splice(index, 1);
            localStorage.setItem('musicTracks', JSON.stringify(musicTracks));
            displayTracks();
        });

        li.appendChild(removeButton);
        trackList.appendChild(li);
    });
}

displayTracks();

document.getElementById('add-track-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('track-title').value;
    const artist = document.getElementById('track-artist').value;
    const fileInput = document.getElementById('track-file');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select an audio file.');
        return;
    }

    const newTrack = { title, artist, file };
    musicTracks.push(newTrack);
    localStorage.setItem('musicTracks', JSON.stringify(musicTracks));
    displayTracks();
    e.target.reset();
    alert('Track added successfully!');
});

function playTrack(index) {
    if (index < 0 || index >= musicTracks.length) return;
    const track = musicTracks[index];
    const url = URL.createObjectURL(track.file);
    audio.src = url;
    audio.play();
    currentTrackIndex = index;
}

document.getElementById('play-btn').addEventListener('click', () => {
    if (currentTrackIndex !== -1) {
        audio.play();
    } else if (musicTracks.length > 0) {
        playTrack(0); // Play the first track if nothing is playing
    }
});

document.getElementById('pause-btn').addEventListener('click', () => {
    audio.pause();
});

document.getElementById('stop-btn').addEventListener('click', () => {
    audio.pause();
    audio.currentTime = 0;
});

document.getElementById('next-btn').addEventListener('click', () => {
    if (currentTrackIndex < musicTracks.length - 1) {
        playTrack(currentTrackIndex + 1);
    }
});

document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentTrackIndex > 0) {
        playTrack(currentTrackIndex - 1);
    }
});
