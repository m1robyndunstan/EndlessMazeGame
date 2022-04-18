import { MazeBlock } from "./maze-block";
import { MazeDirection } from "./maze-direction";
import { MazeSpecial } from "./maze-special";

export class FlavorText {
  public buildFlavorText(locationDetails: MazeBlock, facing: MazeDirection) : string {
    let hedgeText = "The walls of the hedge maze are too high for you to see over. ";
    let startText = "You are still holding the book, but the pages are now blank. You close the book and proceed to explore your surroundings. ";

    let specialDirText = MazeDirection[locationDetails.specialDir];
    let exitText = `There is a wooden door in the hedge wall to the ${specialDirText}.`

    let playerDirText = MazeDirection[facing];
    let playerText = `You are facing ${playerDirText}. `;

    let pathText = this.buildPathList(locationDetails.paths);

    switch(locationDetails.specialDesc) {
      case MazeSpecial.Exit:
        return hedgeText + pathText + exitText + playerText;
      case MazeSpecial.Start:
        return startText + hedgeText + pathText + playerText;
      case MazeSpecial.None:
      default:
        return hedgeText + pathText + playerText;
    }
  }

  private buildPathList(paths: MazeDirection[]): string {
    paths.sort();
    let pathText = "";

    if (paths.length == 1) {
      pathText = "There is a path to the " + MazeDirection[paths[0]] + ". ";
    }
    else if (paths.length > 1) {
      pathText += "There are paths to the " + MazeDirection[paths[0]];
            for (let index = 0; index < paths.length - 2; index++) {
                pathText += ", " + MazeDirection[paths[index + 1]];
            }
            pathText += " and " + MazeDirection[paths[paths.length - 1]] + ". ";
    }

    return pathText;
  }
}
