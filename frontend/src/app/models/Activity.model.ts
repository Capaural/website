
export class Activity {
    constructor(public lineColor: string, public dotColor: string,public icon: string, public hour: string, public title: string, public description: string) {
        if (this.icon) {
            this.dotColor += " is-icon";
        }
    }
}