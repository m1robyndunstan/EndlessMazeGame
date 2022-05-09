import { InventoryItems } from "../inventory/inventory-items";
import { InterfaceState } from "../maze-main/interface-state";
import { MazeScreen } from "../maze-main/maze-screen";
import { FlavorText } from "./flavor-text";
import { MazeBlock } from "./maze-block";
import { MazeDirection } from "./maze-direction";
import { MazeMap } from "./maze-map";
import { MazeSpecial } from "./maze-special";
import { Point } from "./point";

export class MazeState {
    currentScreen: MazeScreen;
    interface: InterfaceState;

    map: MazeMap;
    playerLocation?: Point;
    playerDirection?: MazeDirection;
    flavorText: FlavorText;
    doorLocked: boolean;
    inventory: InventoryItems[];

    constructor(dimX?: number, dimY?:number) {
        // set maze dimensions
        this.map = new MazeMap(dimX, dimY);
        this.currentScreen = MazeScreen.Intro;
        this.interface = new InterfaceState();
        this.flavorText = new FlavorText();
        this.doorLocked = true;
        this.inventory = [];
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
        this.doorLocked = true;
        this.map.whereIsStuff();
        this.interface.showTaskbar = true;
        this.interface.mapEnabled = true;
    }
    newMaze(): void {
        this.map = new MazeMap(this.map.getDimensions()[0], this.map.getDimensions()[1]);
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
    hasBackPath(): boolean {
        return this.playerDirection ? this.getCurrentBlock().paths.includes(MazeDirection.calcDirection(this.playerDirection + 2)) : false;
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
    isSpecialBack(): boolean {
        return this.hasSpecial() && this.playerDirection ? this.isBack(this.playerDirection, this.getCurrentBlock().specialDir) : false;
    }

    // Action functions
    hasAction(): boolean {
        switch (this.getSpecialType()) {
            case MazeSpecial.Exit:
                return true;
            case MazeSpecial.None:
            case MazeSpecial.Start:
            default:
                return false;
        }
    }
    getActionText(): string {
        switch (this.getSpecialType()) {
            case MazeSpecial.Exit:
                return "Examine Door";
            default:
                return "";
        }
    }
    doAction(): void {
        switch (this.getSpecialType()) {
            case MazeSpecial.Exit:
                this.currentScreen = MazeScreen.Exit;
                break;
            default:
                break;
        }
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
    turnAround(): void {
        if (this.playerDirection) {
            this.playerDirection = MazeDirection.calcDirection(this.playerDirection + 2);
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
    private isBack(facingDirection: MazeDirection, queryDirection: MazeDirection) {
        return MazeDirection.calcDirection(facingDirection + 2) == queryDirection;
    }
}