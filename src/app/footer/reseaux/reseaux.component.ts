import { Component, OnInit } from '@angular/core';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';



@Component({
  selector: 'app-reseaux',
  templateUrl: './reseaux.component.html',
  styleUrls: ['./reseaux.component.scss']
})
export class ReseauxComponent implements OnInit {
  fbIcon = faFacebookF;
  constructor() { }

  ngOnInit(): void {
  }

}
