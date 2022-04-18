import { MazeBlock } from "./maze-block";
import { MazeDirection } from "./maze-direction";
import { Point } from "./point";

export class MazeMap {
    dimensions: number[];
    maze?: MazeBlock[][];
    defaultDimension: number = 5;

    constructor(dimX?: number, dimY?:number) {
        // set maze dimensions
        this.dimensions = [];
        this.dimensions.push(dimX ? dimX : this.defaultDimension);
        this.dimensions.push(dimY ? dimY : this.defaultDimension);

        this.buildMaze(this.dimensions[0], this.dimensions[1]);
    }

    public getDimensions(): number[] {
        return this.dimensions;
    }

    public getBlock(x: number, y:  number) : MazeBlock {
        if (this.maze 
            && this.maze.length > x && x > 0
            && this.maze[x].length > y && y > 0) {
                return this.maze[x][y];
        }
        else {
            return new MazeBlock();
        }
    }

    private buildMaze(dimX: number, dimY: number) {
        this.maze = [];
        let visit1: Point[] = [];
        let visit2: Point[] = [];

        function isVisited(p: Point) : boolean {
            return visit1.some((v) => v.equals(p));
        }

        function isVisitedTwice(p: Point) : boolean {
            return visit2.some((v) => v.equals(p));
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
                this.maze[here.x][here.y].paths.push(MazeDirection.calcDirection(nextDir + 2));
                visit1.push(here);
                dirs = getUnvisitedDirections(here);
            }
        } while (visit1.length < dimX * dimY);

        // Create maze exit
        let exitBlock: MazeBlock;
        switch (Math.ceil(Math.random() * 4) as MazeDirection) {
            case MazeDirection.North:
                exitBlock = this.maze[Math.floor(Math.random() * this.maze.length)][0];
                exitBlock.specialDir = MazeDirection.North;
                break;
            case MazeDirection.East:
                exitBlock = this.maze[this.maze.length - 1][Math.floor(Math.random() * this.maze[0].length)];
                exitBlock.specialDir = MazeDirection.East;
                break;
            case MazeDirection.South:
                exitBlock = this.maze[Math.floor(Math.random() * this.maze.length)][this.maze.length - 1];
                exitBlock.specialDir = MazeDirection.South;
                break;
            case MazeDirection.West:
                exitBlock = this.maze[0][Math.floor(Math.random() * this.maze[0].length)];
                exitBlock.specialDir = MazeDirection.West;
                break;
            default:
                exitBlock = this.maze[0][0];
                exitBlock.specialDir = MazeDirection.North;
                break;
        }
    }
}
