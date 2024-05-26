document.getElementById('themeSelect').addEventListener('change', function() {
    document.body.className = this.value;
});

document.getElementById('searchButton').addEventListener('click', async () => {
    const name = document.getElementById('searchInput').value;
    const response = await fetch(`https://qvvu82pwnl.execute-api.us-east-1.amazonaws.com/dev/character?name=${name}`);
    const data = await response.json();
    displayCharacter(data);
});

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
        // Sort characters based on the number of non-empty properties
        data.data.sort((a, b) => countNonEmptyProperties(b) - countNonEmptyProperties(a));

        data.data.forEach(character => {
            const characterDiv = document.createElement('div');
            characterDiv.className = 'character';

            const name = document.createElement('h2');
            name.textContent = character.name;
            characterDiv.appendChild(name);

            if (character.imageUrl) {
                const image = document.createElement('img');
                image.src = character.imageUrl;
                characterDiv.appendChild(image);
            }

            const films = document.createElement('p');
            films.textContent = `Films: ${character.films.join(', ')}`;
            characterDiv.appendChild(films);

            const tvShows = document.createElement('p');
            tvShows.textContent = `TV Shows: ${character.tvShows.join(', ')}`;
            characterDiv.appendChild(tvShows);

            const videoGames = document.createElement('p');
            videoGames.textContent = `Video Games: ${character.videoGames.join(', ')}`;
            characterDiv.appendChild(videoGames);

            const parkAttractions = document.createElement('p');
            parkAttractions.textContent = `Park Attractions: ${character.parkAttractions.join(', ')}`;
            characterDiv.appendChild(parkAttractions);

            const sourceUrl = document.createElement('p');
            const link = document.createElement('a');
            link.href = character.sourceUrl;
            link.textContent = 'More Information';
            link.target = '_blank';
            sourceUrl.appendChild(link);
            characterDiv.appendChild(sourceUrl);

            resultsDiv.appendChild(characterDiv);
        });
    } else {
        resultsDiv.textContent = 'No characters found';
    }
}

const audioElement = document.getElementById('backgroundMusic');
const musicSelect = document.getElementById('musicSelect');
const volumeControl = document.getElementById('volumeControl');
const playButton = document.getElementById('playButton');

// Function to play selected music
function playMusic(selectedMusic) {
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
    if (selectedMusic) {
        audioElement.play();
    } else {
        audioElement.pause();
    }
}

// Autoplay Frozen background music on window load
window.addEventListener('load', () => {
    playMusic('frozen');
});

musicSelect.addEventListener('change', function() {
    playMusic(musicSelect.value);
});

volumeControl.addEventListener('input', function() {
    audioElement.volume = volumeControl.value;
});