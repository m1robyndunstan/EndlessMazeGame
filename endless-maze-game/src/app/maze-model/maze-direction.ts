export enum MazeDirection {
    North = 1, 
    East = 2, 
    South = 3, 
    West = 4
}

export namespace MazeDirection {
    export function calcDirection(input: number): MazeDirection {
        while (input < 1) {
            input += 4;
        }
        while (input > 4) {
            input -= 4;
        }
        return input as MazeDirection;
    }
}