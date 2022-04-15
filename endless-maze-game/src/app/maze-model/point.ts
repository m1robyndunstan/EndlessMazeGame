import { MazeDirection } from "./maze-direction";

export class Point {
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