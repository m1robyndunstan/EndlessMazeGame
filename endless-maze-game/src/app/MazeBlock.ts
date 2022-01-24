import { MazeDirection } from "./MazeDirection"

export class MazeBlock {
    paths: MazeDirection[];

    constructor() {
        this.paths = [];
    }
}