import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enigma',
  templateUrl: './enigma.component.html',
  styleUrls: ['./enigma.component.scss']
})
export class EnigmaComponent implements OnInit {

  timeToUnlock = "21h00";

  clues = [
    {
      value: "Seul le president est au courant... (Ne lui envoyez pas de message privé)",
      time: this.timeToUnlock
    },
    {
      value: "Si vous avez faim, notre menu peut éventuellement vous aider.",
      time: "21h20"
    },
    {
      value: "Le lien était à l'envers, pourquoi pas le contenu aussi ?",
      time: "21h40"
    },
    {
      value: "Un de nos agents a déposé un indice sur notre compte Instagram.",
      time: "22h00"
    },
    {
      value: "Lorsque l'on vous parle de guerre mondiale, du côté des initiales il faut regarder.",
      time: "22h20"
    },
    {
      value: "En chiffrement, vous connaissez César et _ _ _ _ _ _ _ _.",
      time: "22h40"
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

  isTime(value: string) {
    var timeToCompare = new Date();
    const now = new Date();

    timeToCompare.setHours(parseInt(value.split('h')[0]), parseInt(value.split('h')[1]), 0);

    return now >= timeToCompare;
  }

}
