import { MazeScreen } from "./MazeScreen";
import { MazeBlock } from "./MazeBlock";
import { MazeDirection } from "./MazeDirection";

export class MazeState {
    currentScreen: MazeScreen;
    dimensions: number[];
    maze: MazeBlock[][];

    defaultDimension: number = 5;

    constructor(dimX?: number, dimY?:number) {
        // set maze dimensions
        this.dimensions = [];
        this.dimensions.push(dimX ? dimX : this.defaultDimension);
        this.dimensions.push(dimY ? dimY : this.defaultDimension);

        this.currentScreen = MazeScreen.Intro;

        this.maze = [];
        this.buildMaze(this.dimensions[0], this.dimensions[1]);
    }

    private buildMaze(dimX: number, dimY: number) {
        // Declare classes, functions and variables needed only for this function
        class Point {
            x: number;
            y: number;
            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
            }
        }

        this.maze = [];
        let visit1: Point[] = [];
        let visit2: Point[] = [];

        function isVisited(p: Point) : boolean {
            return visit1.some((v) => {v.x == p.x && v.y == p.y});
        }

        function getUnvisitedDirections(p: Point) : MazeDirection[] {
            let dirs: MazeDirection[] = [];

            if (p.y > 0 && !isVisited(new Point(p.x, p.y - 1))) {
                dirs.push(MazeDirection.North);
            }

            if (p.x < dimX - 1 && !isVisited(new Point(p.x + 1, p.y))) {
                dirs.push(MazeDirection.East);
            }

            if (p.y < dimY - 1 && !isVisited(new Point(p.x, p.y + 1))) {
                dirs.push(MazeDirection.South);
            }

            if (p.x > 0 && !isVisited(new Point(p.x - 1, p.y))) {
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

        } while (visit1.length < dimX * dimY);

        
    }
}