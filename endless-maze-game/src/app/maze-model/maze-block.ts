import { MazeDirection } from "./maze-direction";
import { MazeSpecial } from "./maze-special";

export class MazeBlock {
    paths: MazeDirection[];
    specialDesc: MazeSpecial;
    specialDir: MazeDirection;

    constructor() {
        this.paths = [];
        this.specialDesc = MazeSpecial.None;
        this.specialDir = MazeDirection.North;
    }
}
