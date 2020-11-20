import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-photo-interactive',
  templateUrl: './photo-interactive.component.html',
  styleUrls: ['./photo-interactive.component.scss']
})
export class PhotoInteractiveComponent implements OnInit {
  title = 'appBootstrap';

  closeResult: string;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  showInfos(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.title.value; 
    alert(idAttr);
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
