document.addEventListener('DOMContentLoaded', () => {
    const welcomeContainer = document.getElementById('welcomeContainer');
    const characterContainer = document.getElementById('characterContainer');
    const homeLink = document.getElementById('homeLink');
    const charactersLink = document.getElementById('charactersLink');
    const mainSearchForm = document.getElementById('mainSearchForm');
    const secondarySearchForm = document.getElementById('secondarySearchForm');
    const headerSearchForm = document.getElementById('headerSearchForm');
    const audioElement = document.getElementById('backgroundMusic');
    const themeSelect = document.getElementById('themeSelect');
    const volumeControl = document.getElementById('volumeControl');
    const musicSelect = document.getElementById('musicSelect');
    const readmeButton = document.getElementById('readmeButton');
    const popup = document.getElementById('popup');
    const popupClose = document.getElementById('popupClose');

    homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        welcomeContainer.style.display = 'block';
        characterContainer.style.display = 'none';
    });

    charactersLink.addEventListener('click', (e) => {
        e.preventDefault();
        welcomeContainer.style.display = 'none';
        characterContainer.style.display = 'block';
    });

    readmeButton.addEventListener('click', () => {
        popup.style.display = 'block';
    });

    popupClose.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == popup) {
            popup.style.display = 'none';
        }
    });

    function handleSearch(event) {
        event.preventDefault();
        const query = event.target.querySelector('input[type="text"]').value;
        fetch(`https://qvvu82pwnl.execute-api.us-east-1.amazonaws.com/dev/character?name=${query}`)
            .then(response => response.json())
            .then(data => {
                displayCharacter(data);
                welcomeContainer.style.display = 'none';
                characterContainer.style.display = 'block';

                if (audioElement.paused) {
                    const currentTheme = localStorage.getItem('selectedTheme');
                    setThemeMusic(currentTheme);  // Play the theme music
                }
            });
    }

    if (mainSearchForm) mainSearchForm.addEventListener('submit', handleSearch);
    if (headerSearchForm) headerSearchForm.addEventListener('submit', handleSearch);
    if (secondarySearchForm) secondarySearchForm.addEventListener('submit', handleSearch);

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

    if (themeSelect) {
        themeSelect.addEventListener('change', function() {
            document.body.className = this.value;
            localStorage.setItem('selectedTheme', this.value);
            setThemeMusic(this.value);
        });
    }

    if (document.getElementById('playButton')) {
        document.getElementById('playButton').addEventListener('click', () => {
            audioElement.play();
        });
    }

    if (document.getElementById('pauseButton')) {
        document.getElementById('pauseButton').addEventListener('click', () => {
            audioElement.pause();
        });
    }

    if (document.getElementById('stopButton')) {
        document.getElementById('stopButton').addEventListener('click', () => {
            audioElement.pause();
            audioElement.currentTime = 0;
        });
    }

    // if (musicSelect) {
    //     musicSelect.addEventListener('change', function() {
    //         playMusic(this.value);
    //         localStorage.setItem('selectedMusic', this.value);
    //     });
    // }

    if (volumeControl) {
        volumeControl.addEventListener('input', function() {
            audioElement.volume = this.value;
            localStorage.setItem('volume', this.value);
        });
    }

    function setThemeMusic(theme) {
        let selectedMusic = '';
        switch (theme) {
            case 'classic':
                selectedMusic = 'tangled-one';
                break;
            case 'tangled':
                selectedMusic = 'tangled-two';
                break;
            case 'frozen':
                selectedMusic = 'frozen';
                break;
            case 'the-little-mermaid':
                selectedMusic = 'the-little-mermaid';
                break;
            default:
                selectedMusic = '';
        }
        playMusic(selectedMusic);
        localStorage.setItem('selectedMusic', selectedMusic);
    }

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

    window.addEventListener('load', () => {
        const savedTheme = localStorage.getItem('selectedTheme');
        if (savedTheme) {
            document.body.className = savedTheme;
            themeSelect.value = savedTheme;
        }

        const savedVolume = localStorage.getItem('volume');
        if (savedVolume) {
            audioElement.volume = savedVolume;
            volumeControl.value = savedVolume;
        }
    });

    readmeButton.addEventListener('click', () => {
        popup.style.display = 'block';
    });

    popupClose.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == popup) {
            popup.style.display = 'none';
        }
    });
});