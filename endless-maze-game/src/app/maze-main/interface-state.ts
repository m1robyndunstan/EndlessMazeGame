export class InterfaceState {
    public showTaskbar: boolean;
    public mapEnabled: boolean;
    public mapDisplayed: boolean;
    public inventoryDisplayed: boolean;

    constructor() {
        this.showTaskbar = false;
        this.mapEnabled = false;
        this.mapDisplayed = false;
        this.inventoryDisplayed = false;
    }
}
