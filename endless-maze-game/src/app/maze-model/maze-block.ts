import { MazeDirection } from "../MazeDirection";
import { MazeSpecial } from "../MazeSpecial";

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
