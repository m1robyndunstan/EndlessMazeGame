import { MazeScreen } from "./MazeScreen";
import { MazeBlock } from "./MazeBlock";
import { MazeDirection } from "./MazeDirection";
import { MazeSpecial } from "./MazeSpecial";
import { BuiltinFunctionCall } from "@angular/compiler/src/compiler_util/expression_converter";

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

        // Assign default flavor text
        this.maze.forEach(mazeRow => {
            mazeRow.forEach(block => {
                block.flavorText = "The walls of the hedge maze are too high for you to see over. ";
                block.paths.sort();
                if (block.paths.length == 1) {
                    block.flavorText += "There is a path to the " + block.paths[0].toString() + ". ";
                }
                else {
                    block.flavorText += "There are paths to the " + block.paths[0].toString();
                    for (let index = 0; index < block.paths.length - 2; index++) {
                        block.flavorText += ", " + block.paths[index + 1].toString();
                    }
                    block.flavorText += " and " + block.paths[block.paths.length - 1].toString() + ". ";
                }
            });
        });

        // Create maze exit
        let exitBlock: MazeBlock;
        switch (Math.floor(Math.random() * 4) as MazeDirection) {
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
        exitBlock.flavorText += "There is a wooden door in the hedge wall to the " + exitBlock.specialDir.toString(); + ". "
    }

    startMaze(): void {
        this.playerLocation = new Point(
            Math.floor(Math.random() * this.dimensions[0]),
            Math.floor(Math.random() * this.dimensions[1])
        );
        this.playerDirection = Math.floor(Math.random() * 4) as MazeDirection;
        this.getCurrentBlock().specialDesc = MazeSpecial.Start;
        this.getCurrentBlock().flavorText += "You are still holding the book, but the pages are now blank. You close the book and proceed to explore your surroundings. "
    }

    getFlavorText(): string {
        let flavorText = this.getCurrentBlock().flavorText;
        flavorText += "You are facing " + MazeDirection[this.playerDirection] + ". ";
        return flavorText;
    }

    // Navigation functions
    hasForwardPath(): boolean {
        return this.getCurrentBlock().paths.includes(this.playerDirection);
    }
    hasRightPath(): boolean {
        return this.getCurrentBlock().paths.includes(((this.playerDirection + 1) % 4) as MazeDirection);
    }
    hasLeftPath(): boolean {
        return this.getCurrentBlock().paths.includes(((this.playerDirection + 3) % 4) as MazeDirection);
    }

    // Special location functions
    hasSpecial(): boolean {
        return this.getCurrentBlock().specialDesc != MazeSpecial.None;
    }
    getSpecialType(): MazeSpecial {
        return this.getCurrentBlock().specialDesc;
    }
    isSpecialForward(): boolean {
        return this.isForward(this.playerDirection, this.getCurrentBlock().specialDir);
    }
    isSpecialRight(): boolean {
        return this.isRight(this.playerDirection, this.getCurrentBlock().specialDir);
    }
    isSpecialLeft(): boolean {
        return this.isLeft(this.playerDirection, this.getCurrentBlock().specialDir);
    }

    // Travel functions
    moveForward(): void {
        switch (this.playerDirection) {
            case MazeDirection.North:
                this.playerLocation.y -= 1;
                break;
            case MazeDirection.East:
                this.playerLocation.x += 1;
                break;
            case MazeDirection.South:
                this.playerLocation.y += 1;
                break;
            case MazeDirection.West:
                this.playerLocation.x -= 1;
                break;
            default:
                break;
        }
    }
    turnRight(): void {
        this.playerDirection = ((this.playerDirection + 1) % 4) as MazeDirection;
    }
    turnLeft(): void {
        this.playerDirection = ((this.playerDirection + 3) % 4) as MazeDirection;
    }

    // private functions
    private getCurrentBlock(): MazeBlock {
        return this.maze[this.playerLocation.x][this.playerLocation.y];
    }

    private isForward(facingDirection: MazeDirection, queryDirection: MazeDirection) {
        return facingDirection == queryDirection;
    }
    private isRight(facingDirection: MazeDirection, queryDirection: MazeDirection) {
        return ((facingDirection + 1) % 4) as MazeDirection == queryDirection;
    }
    private isLeft(facingDirection: MazeDirection, queryDirection: MazeDirection) {
        return ((facingDirection + 3) % 4) as MazeDirection == queryDirection;
    }
}