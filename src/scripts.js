function handleSearch(query) {
    window.location.href = `characters.html?search=${query}`;
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

window.addEventListener('load', () => {
    const searchQuery = getUrlParameter('search');
    if (searchQuery) {
        performSearch(searchQuery);
    }
});

document.getElementById('themeSelect').addEventListener('change', function() {
    document.body.className = this.value;
});

document.getElementById('headerSearchButton').addEventListener('click', () => {
    const query = document.getElementById('headerSearchInput').value;
    handleSearch(query);
});

document.getElementById('headerSearchInput').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const query = event.target.value;
        handleSearch(query);
    }
});

document.getElementById('mainSearchButton').addEventListener('click', () => {
    const query = document.getElementById('mainSearchInput').value;
    handleSearch(query);
});

document.getElementById('mainSearchInput').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const query = event.target.value;
        handleSearch(query);
    }
});

if (document.getElementById('searchButton')) {
    document.getElementById('searchButton').addEventListener('click', () => {
        const name = document.getElementById('searchInput').value;
        performSearch(name);
    });

    document.getElementById('searchInput').addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const name = document.getElementById('searchInput').value;
            performSearch(name);
        }
    });
}

function performSearch(name) {
    fetch(`https://qvvu82pwnl.execute-api.us-east-1.amazonaws.com/dev/character?name=${name}`)
        .then(response => response.json())
        .then(data => displayCharacter(data));
}

function countNonEmptyProperties(character) {
    let count = 0;
    for (let key in character) {
        if (Array.isArray(character[key])) {
            if (character[key].length > 0) count++;
        } else if (character[key]) {
            count++;
        }
    }
    return count;
}

function displayCharacter(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (data.data && data.data.length > 0) {
        data.data.sort((a, b) => countNonEmptyProperties(b) - countNonEmptyProperties(a));

        data.data.forEach(character => {
            const characterDiv = document.createElement('div');
            characterDiv.className = 'character-card';

            const detailsDiv = document.createElement('div');
            detailsDiv.className = 'details';

            const name = document.createElement('h2');
            name.textContent = character.name;
            detailsDiv.appendChild(name);

            const films = document.createElement('p');
            films.textContent = `Films: ${character.films.join(', ')}`;
            detailsDiv.appendChild(films);

            const tvShows = document.createElement('p');
            tvShows.textContent = `TV Shows: ${character.tvShows.join(', ')}`;
            detailsDiv.appendChild(tvShows);

            const videoGames = document.createElement('p');
            videoGames.textContent = `Video Games: ${character.videoGames.join(', ')}`;
            detailsDiv.appendChild(videoGames);

            const parkAttractions = document.createElement('p');
            parkAttractions.textContent = `Park Attractions: ${character.parkAttractions.join(', ')}`;
            detailsDiv.appendChild(parkAttractions);

            const sourceUrl = document.createElement('p');
            const link = document.createElement('a');
            link.href = character.sourceUrl;
            link.textContent = 'More Information';
            link.target = '_blank';
            sourceUrl.appendChild(link);
            detailsDiv.appendChild(sourceUrl);

            characterDiv.appendChild(detailsDiv);

            if (character.imageUrl) {
                const image = document.createElement('img');
                image.src = character.imageUrl;
                characterDiv.appendChild(image);
            }

            resultsDiv.appendChild(characterDiv);
        });
    } else {
        resultsDiv.textContent = 'No characters found';
    }
}

const audioElement = document.getElementById('backgroundMusic');
const musicSelect = document.getElementById('musicSelect');
const volumeControl = document.getElementById('volumeControl');

function setDefaultMusic() {
    musicSelect.value = 'tangled-one';
    const event = new Event('change');
    musicSelect.dispatchEvent(event);
}

window.addEventListener('load', setDefaultMusic);

musicSelect.addEventListener('change', function() {
    const selectedMusic = musicSelect.value;
    switch (selectedMusic) {
        case 'frozen':
            audioElement.src = 'https://disneycharacter.s3.amazonaws.com/bgms/Frozen_LetItGo.mp3';
            break;
        case 'tangled-one':
            audioElement.src = 'https://disneycharacter.s3.amazonaws.com/bgms/Tangled_ISeeTheLight.mp3';
            break;
        case 'tangled-two':
            audioElement.src = 'https://disneycharacter.s3.amazonaws.com/bgms/Tangled_WhenWillMyLifeBegin.mp3';
            break;
        case 'the-little-mermaid':
            audioElement.src = 'https://disneycharacter.s3.amazonaws.com/bgms/TheLittleMermaid_PartOfYourWorld.mp3';
            break;
        default:
            audioElement.src = '';
    }
});

document.getElementById('playButton').addEventListener('click', function() {
    if (audioElement.src) {
        audioElement.play();
    }
});

document.getElementById('pauseButton').addEventListener('click', function() {
    audioElement.pause();
});

document.getElementById('stopButton').addEventListener('click', function() {
    audioElement.pause();
    audioElement.currentTime = 0;
});

volumeControl.addEventListener('input', function() {
    audioElement.volume = volumeControl.value;
});
