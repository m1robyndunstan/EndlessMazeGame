import { MazeDirection } from "./MazeDirection"
import { MazeSpecial } from "./MazeSpecial"

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