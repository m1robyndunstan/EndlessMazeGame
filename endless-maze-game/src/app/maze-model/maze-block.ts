import { MazeSpecial } from "../MazeSpecial";
import { MazeDirection } from "./maze-direction";

export class MazeBlock {
    paths: MazeDirection[];
    specialDesc: MazeSpecial;
    specialDir: MazeDirection;
    flavorText: string;

    constructor() {
        this.paths = [];
        this.specialDesc = MazeSpecial.None;
        this.specialDir = MazeDirection.North;
        this.flavorText = "";
    }
}
