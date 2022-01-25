import { MazeScreen } from "./MazeScreen";
import { MazeBlock } from "./MazeBlock";
import { MazeDirection } from "./MazeDirection";

class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    getNextPoint(dir: MazeDirection) : Point {
        switch (dir) {
            case MazeDirection.East:
                return new Point(this.x + 1, this.y);
            case MazeDirection.North:
                return new Point(this.x, this.y - 1);
            case MazeDirection.South:
                return new Point(this.x, this.y + 1);
            case MazeDirection.West:
                return new Point(this.x - 1, this.y);
            default:
                return new Point(-1, -1);
        }
    }
}

export class MazeState {
    currentScreen: MazeScreen;
    dimensions: number[];
    maze: MazeBlock[][];
    playerLocation: Point;
    playerDirection: MazeDirection;

    defaultDimension: number = 5;

    constructor(dimX?: number, dimY?:number) {
        // set maze dimensions
        this.dimensions = [];
        this.dimensions.push(dimX ? dimX : this.defaultDimension);
        this.dimensions.push(dimY ? dimY : this.defaultDimension);

        this.currentScreen = MazeScreen.Intro;

        this.maze = [];
        this.buildMaze(this.dimensions[0], this.dimensions[1]);
        this.playerLocation = new Point(-1, -1);
        this.playerDirection = MazeDirection.North;
    }

    private buildMaze(dimX: number, dimY: number) {
        // Declare classes, functions and variables needed only for this function
        this.maze = [];
        let visit1: Point[] = [];
        let visit2: Point[] = [];

        function isVisited(p: Point) : boolean {
            return visit1.some((v) => v.x == p.x && v.y == p.y);
        }

        function isVisitedTwice(p: Point) : boolean {
            return visit2.some((v) => v.x == p.x && v.y == p.y);
        }

        function getUnvisitedDirections(p: Point) : MazeDirection[] {
            let dirs: MazeDirection[] = [];

            if (p.y > 0 && !isVisited(p.getNextPoint(MazeDirection.North))) {
                dirs.push(MazeDirection.North);
            }

            if (p.x < dimX - 1 && !isVisited(p.getNextPoint(MazeDirection.East))) {
                dirs.push(MazeDirection.East);
            }

            if (p.y < dimY - 1 && !isVisited(p.getNextPoint(MazeDirection.South))) {
                dirs.push(MazeDirection.South);
            }

            if (p.x > 0 && !isVisited(p.getNextPoint(MazeDirection.West))) {
                dirs.push(MazeDirection.West);
            }

            return dirs;
        }

        // Initialize with no paths
        for (let indexX = 0; indexX < dimX; indexX++) {
            let mazeCol: MazeBlock[] = [];
            for (let indexY = 0; indexY < dimY; indexY++) {
                mazeCol.push(new MazeBlock());
            }
            this.maze.push(mazeCol);
        }

        // Start building maze paths
        // Get random starting point and mark as visited
        let p = new Point (
            Math.floor(Math.random() * dimX),
            Math.floor(Math.random() * dimY)
        );
        visit1.push(p);
        do {
            // Get random visited point to start this branch
            let here = visit1[Math.floor(Math.random() * visit1.length)];
            while (isVisitedTwice(here)) {
                here = visit1[Math.floor(Math.random() * visit1.length)];
            }
            visit2.push(here);

            // Get next direction
            let dirs = getUnvisitedDirections(here);
            // Continue branch until dead end
            while (dirs.length > 0) {
                let nextDir = dirs[Math.floor(Math.random() * dirs.length)];

                // Open the wall
                this.maze[here.x][here.y].paths.push(nextDir);
                here = here.getNextPoint(nextDir);
                this.maze[here.x][here.y].paths.push(((nextDir + 2) % 4) as MazeDirection);
                visit1.push(here);
                dirs = getUnvisitedDirections(here);
            }
        } while (visit1.length < dimX * dimY);
    }

    startMaze(): void {
        this.playerLocation = new Point(
            Math.floor(Math.random() * this.dimensions[0]),
            Math.floor(Math.random() * this.dimensions[1])
        );
        this.playerDirection = Math.floor(Math.random() * 4) as MazeDirection;
    }
}