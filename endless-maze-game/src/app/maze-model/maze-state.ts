import { MazeScreen } from "../maze-main/maze-screen";
import { FlavorText } from "./flavor-text";
import { MazeBlock } from "./maze-block";
import { MazeDirection } from "./maze-direction";
import { MazeMap } from "./maze-map";
import { MazeSpecial } from "./maze-special";
import { Point } from "./point";

export class MazeState {
    currentScreen: MazeScreen;
    map: MazeMap;
    playerLocation?: Point;
    playerDirection?: MazeDirection;
    flavorText: FlavorText;

    constructor(dimX?: number, dimY?:number) {
        // set maze dimensions
        this.map = new MazeMap(dimX, dimY);
        this.currentScreen = MazeScreen.Intro;
        this.flavorText = new FlavorText();
    }

    startMaze(): void {
        do {
        this.playerLocation = new Point(
            Math.floor(Math.random() * this.map.getDimensions()[0]),
            Math.floor(Math.random() * this.map.getDimensions()[1])
        );
        } while (this.map.getBlock(this.playerLocation.x,this.playerLocation.y).specialDesc == MazeSpecial.Exit);
        
        this.playerDirection = Math.ceil(Math.random() * 4) as MazeDirection;
        this.getCurrentBlock().specialDesc = MazeSpecial.Start;
    }

    getFlavorText(): string {
        return this.playerLocation && this.playerDirection 
            ? this.flavorText.buildFlavorText(this.getCurrentBlock(), this.playerDirection)
            : "";
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
        return this.map && this.playerLocation ? this.map.getBlock(this.playerLocation.x, this.playerLocation.y) : new MazeBlock();
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