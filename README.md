# Endless Maze Game

Navigate a maze and solve puzzles to escape! 

[Play here](https://m1robyndunstan.github.io/EndlessMazeGame/)

## Setup

1. Download the latest version of the game from [here](https://github.com/m1robyndunstan/EndlessMazeGame/tree/main/dist).
1. Unzip the folder.
1. Open `index.html` in a browser. Double-clicking the file should open it in your default browser.

## Developer Setup

1. Clone this repository.
1. Install [Node.js](https://nodejs.org/en/).
1. Install Yarn. Run the following command on the commandline. `npm i -g yarn`
1. Install the [Angular CLI](https://angular.io/). Run the following command on the commandline. `npm i -g @angular/cli`
1. To use angular commands, the commandline must be in folder `<git repository directory>/endless-maze-game`. This is the folder for the angular project.

### Run Locally

1. Open a commandline and navigate to folder `<git repository directory>/endless-maze-game`.
1. Run `yarn`.
1. Run `ng serve`.
1. Open a browser to URL [http://localhost:4200/](http://localhost:4200/).

### Run in Docker

1. Open Docker.
1. Check Docker settings.
    1. Right-click the Docker icon in the lower right corner and select Settings.
    1. Under Resources, File Sharing - check that the folder for this repository is shared.
    1. Under General - check that WSL2 is not being used.
1. Open a Git Bash commandline window.
1. Run the following commands in Git Bash.
    1. `./dock clean` to remove any previous builds or containers
    1. `./dock build` to build the project into a container
    1. `./dock run` to run the container with this project
1. Open a browser to URL [http://localhost:8080/](http://localhost:8080). The container may take a few minutes to finish starting up. To view the container's progress in startup processing, open the Docker Dashboard and click the container name to display the log.

### Build for Distribution

1. Open a commandline and navigate to folder `<git repository directory>/endless-maze-game`.
1. Run `yarn`.
1. Build the application. Run the following command on the commandline. `ng build --base-href ./`
1. Go to folder `<git repository directory>/endless-maze-game/dist/endless-maze-game`. Rename the folder to `endless-maze-game-#.#` where `#.#` is the version number.
1. Zip the contents of the folder into an archive (ex: `endless-maze-game-#.#.zip`).
1. Copy the archive to folder `<git repository directory>/dist`.
1. To deploy to GitHub Pages the contents of `<git repository directory>/endless-maze-game/dist/endless-maze-game` to `<git repository directory>/docs`.

## Technologies

- [Angular 12](https://angular.io/)
- [Font Awesome 5](https://fontawesome.com/)
- [Bootstrap 5](https://getbootstrap.com/)
- [Gimp](https://www.gimp.org/)

## Sources

- Maze Algorithm - I've lost the original link I learned from, but the algorithm is close to [Recursive Backtracker](https://en.wikipedia.org/wiki/Maze_generation_algorithm#Iterative_implementation).

### Images

- [Bush](https://unsplash.com/photos/zMWfRUiFqq0)
- [Sky](https://unsplash.com/photos/rOAFxjnfRgg)
- [Grass](https://unsplash.com/photos/Y90MI--vSuI)
- [Pavement Stones](https://pixabay.com/photos/stone-pavement-road-gray-stone-3582751/)
- [Map and Compass](https://openclipart.org/detail/179935/map-and-compass)
- Most other graphics are taken from [Glitch](https://www.glitchthegame.com/)

## Change Log

### [1.2] - 2022-05-02

- Display a map of the maze (Yes, this makes the game very easy. The map will be hidden under a cheat code in future versions.)

### [1.1] - 2022-04-27

- Use cursors on the image for travel instead of buttons

### [1.0] - 2022-04-25

Basic version of the game complete.
- Use maze algorithm to generate a random map for each game
- Walk through the maze
- Interact with the exit door
