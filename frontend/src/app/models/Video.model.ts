import { SafeResourceUrl } from "@angular/platform-browser";

export class Video {
    constructor(public name: string, public link: SafeResourceUrl) {}
}