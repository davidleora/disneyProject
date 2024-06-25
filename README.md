# Disney Character Search

Welcome to the Disney Character Search project! This web application allows you to search for Disney characters using the Disney API, and includes background music with four different themes. The project is hosted on Amazon S3 and is accessible [here](http://disneycharacter.s3-website-us-east-1.amazonaws.com/).

## Features

- **Search Functionality**: Enter a character's name in the search bar to fetch details about the character, including images, films, TV shows, video games, and park attractions.
- **Background Music**: Enjoy background music from four themes - Classic Disney, Tangled, The Little Mermaid, and Frozen. The music changes according to the selected theme.
- **Theme Selection**: Choose between different themes to change the look and feel of the website.
- **Volume Control**: Adjust the volume of the background music using the volume slider.
- **Responsive Design**: The application is designed to work on various screen sizes.

## How It Works

### API Integration

The application uses the [Disney API](https://disneyapi.dev/) to fetch data about Disney characters. When a user searches for a character, the application makes a call to the API and displays the results, including images, films, TV shows, video games, and park attractions.

### Music and Themes

The application includes background music that matches the selected theme. Users can choose from four themes: Classic Disney, Tangled, The Little Mermaid, and Frozen. Each theme has a specific background music track:
- **Classic Disney**: Tangled - I See The Light
- **Tangled**: Tangled - When Will My Life Begin
- **Frozen**: Frozen - Let It Go
- **The Little Mermaid**: The Little Mermaid - Part of Your World

The selected theme and volume settings are saved in the user's local storage to maintain preferences across sessions.

### Deployment

The application is deployed to an Amazon S3 bucket and is publicly accessible. You can view the live application [here](http://disneycharacter.s3-website-us-east-1.amazonaws.com/).

## Usage

1. **Search for Characters**: Enter the name of a Disney character in the search bar and click "Search". The application will display a list of characters that match the search query, along with their details.

2. **Change Theme**: Use the theme selector to change the theme of the application. The background music and styles will update accordingly.

3. **Control Music**: Use the play, pause, and stop buttons to control the background music. Adjust the volume using the volume slider.

## Contributing

Contributions are welcome! If you find a bug or have a suggestion for improvement, please create an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Disney API](https://disneyapi.dev/) for providing the character data.
- [Amazon S3](https://aws.amazon.com/s3/) for hosting the application.
- Background music and images are owned by Disney and used for educational purposes only.

---

### Contact

If you have any questions or feedback, feel free to contact me at [your-email@example.com](mailto:your-email@example.com).

---

_Last updated: 2024/05/29_
