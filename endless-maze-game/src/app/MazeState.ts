import { MazeScreen } from "./MazeScreen";
import { MazeSpecial } from "./MazeSpecial";
import { MazeBlock } from "./maze-model/maze-block";
import { MazeDirection } from "./maze-model/maze-direction";

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

    equals(otherPoint: Point) : boolean {
        return this.x == otherPoint.x && this.y == otherPoint.y;
    }
}

export class MazeState {
    currentScreen: MazeScreen;
    dimensions: number[];
    maze?: MazeBlock[][];
    playerLocation?: Point;
    playerDirection?: MazeDirection;

    defaultDimension: number = 5;

    constructor(dimX?: number, dimY?:number) {
        // set maze dimensions
        this.dimensions = [];
        this.dimensions.push(dimX ? dimX : this.defaultDimension);
        this.dimensions.push(dimY ? dimY : this.defaultDimension);

        this.currentScreen = MazeScreen.Intro;

        this.buildMaze(this.dimensions[0], this.dimensions[1]);
    }

    private buildMaze(dimX: number, dimY: number) {
        // Declare classes, functions and variables needed only for this function
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

        // Assign default flavor text
        this.maze.forEach(mazeRow => {
            mazeRow.forEach(block => {
                this.buildDefaultFlavorText(block);
            });
        });

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
        exitBlock.specialDesc = MazeSpecial.Exit;
        exitBlock.flavorText += "There is a wooden door in the hedge wall to the " + MazeDirection[exitBlock.specialDir] + ". "
    }

    private buildDefaultFlavorText(block: MazeBlock) : void {
        block.flavorText = "The walls of the hedge maze are too high for you to see over. ";
        block.paths.sort();
        if (block.paths.length == 1) {
            block.flavorText += "There is a path to the " + MazeDirection[block.paths[0]] + ". ";
        }
        else {
            block.flavorText += "There are paths to the " + MazeDirection[block.paths[0]];
            for (let index = 0; index < block.paths.length - 2; index++) {
                block.flavorText += ", " + MazeDirection[block.paths[index + 1]];
            }
            block.flavorText += " and " + MazeDirection[block.paths[block.paths.length - 1]] + ". ";
        }
    }

    startMaze(): void {
        do {
        this.playerLocation = new Point(
            Math.floor(Math.random() * this.dimensions[0]),
            Math.floor(Math.random() * this.dimensions[1])
        );
        } while (this.maze && this.maze[this.playerLocation.x][this.playerLocation.y].specialDesc == MazeSpecial.Exit);
        
        this.playerDirection = Math.ceil(Math.random() * 4) as MazeDirection;
        this.getCurrentBlock().specialDesc = MazeSpecial.Start;
        this.getCurrentBlock().flavorText += "You are still holding the book, but the pages are now blank. You close the book and proceed to explore your surroundings. "
    }

    getFlavorText(): string {
        let flavorText = this.getCurrentBlock().flavorText;
        if (this.playerDirection) flavorText += "You are facing " + MazeDirection[this.playerDirection] + ". ";
        return flavorText;
    }

    // Navigation functions
    hasForwardPath(): boolean {
        return this.playerDirection ? this.getCurrentBlock().paths.includes(this.playerDirection) : false;
    }
    hasRightPath(): boolean {
        return this.playerDirection ? this.getCurrentBlock().paths.includes(MazeDirection.calcDirection(this.playerDirection + 1)) : false;
    }
    hasLeftPath(): boolean {
        return this.playerDirection ? this.getCurrentBlock().paths.includes(MazeDirection.calcDirection(this.playerDirection + 3)) : false;
    }

    // Special location functions
    hasSpecial(): boolean {
        return this.getCurrentBlock().specialDesc != MazeSpecial.None;
    }
    getSpecialType(): MazeSpecial {
        return this.getCurrentBlock().specialDesc;
    }
    isSpecialForward(): boolean {
        return this.hasSpecial() && this.playerDirection ? this.isForward(this.playerDirection, this.getCurrentBlock().specialDir) : false;
    }
    isSpecialRight(): boolean {
        return this.hasSpecial() && this.playerDirection ? this.isRight(this.playerDirection, this.getCurrentBlock().specialDir) : false;;
    }
    isSpecialLeft(): boolean {
        return this.hasSpecial() && this.playerDirection ? this.isLeft(this.playerDirection, this.getCurrentBlock().specialDir) : false;
    }

    // Travel functions
    moveForward(): void {
        if (this.playerLocation && this.playerDirection) {
            // If at maze start, make it a regular block
            if (this.getSpecialType() == MazeSpecial.Start) {
                let here = this.getCurrentBlock();
                here.specialDesc = MazeSpecial.None;
                this.buildDefaultFlavorText(here);
            }

            // move location
            this.playerLocation = this.playerLocation.getNextPoint(this.playerDirection);
        }
    }
    turnRight(): void {
        if (this.playerDirection) {
            this.playerDirection = MazeDirection.calcDirection(this.playerDirection + 1);
        }
    }
    turnLeft(): void {
        if (this.playerDirection) {
            this.playerDirection = MazeDirection.calcDirection(this.playerDirection + 3);
        }
    }

    // private functions
    private getCurrentBlock(): MazeBlock {
        return this.maze && this.playerLocation ? this.maze[this.playerLocation.x][this.playerLocation.y] : new MazeBlock();
    }

    private isForward(facingDirection: MazeDirection, queryDirection: MazeDirection) {
        return facingDirection == queryDirection;
    }
    private isRight(facingDirection: MazeDirection, queryDirection: MazeDirection) {
        return MazeDirection.calcDirection(facingDirection + 1) == queryDirection;
    }
    private isLeft(facingDirection: MazeDirection, queryDirection: MazeDirection) {
        return MazeDirection.calcDirection(facingDirection + 3) == queryDirection;
    }
}