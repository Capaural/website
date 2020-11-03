import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photo-interactive',
  templateUrl: './photo-interactive.component.html',
  styleUrls: ['./photo-interactive.component.scss']
})
export class PhotoInteractiveComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showInfos(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.title.value; 
    alert(idAttr);
  }

}
