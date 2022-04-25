# Endless Maze Game
Navigate a maze and solve puzzles to escape! 

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

### Build for Distribution

1. Open a commandline and navigate to folder `<git repository directory>/endless-maze-game`.
1. Run `yarn`.
1. Build the application. Run the following command on the commandline. `ng build --base-href ./`
1. Go to folder `<git repository directory>/endless-maze-game/dist/endless-maze-game`. Rename the folder to `endless-maze-game-#.#` where `#.#` is the version number.
1. Zip the contents of the folder into an archive (ex: `endless-maze-game-#.#.zip`).
1. Copy the archive to folder `<git repository directory>/dist`.

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
- Most other graphics are taken from [Glitch](https://www.glitchthegame.com/)

## Change Log

### [1.0] - 2022-04-25

Basic version of the game complete.
- Use maze algorithm to generate a random map for each game
- Walk through the maze
- Interact with the exit door
