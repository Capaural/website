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
      value: "Seul le president est au courant... (Le spammez pas de MP il est pas au courant)",
      time: this.timeToUnlock
    },
    {
      value: "Notre menu vous l'avez trouvé commment?",
      time: "21h20"
    },
    {
      value: "Quand on reverse, on reverse tout non?",
      time: "21h40"
    },
    {
      value: "Vous connaissez Instagram, on y a commenté notre menu",
      time: "22h00"
    },
    {
      value: "Changez le www par tous vos morceaux",
      time: "22h20"
    },
    {
      value: "En chiffrement, vous connaissez Cesar et - - - - - - - -",
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
