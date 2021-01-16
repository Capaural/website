import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-photo-interactive',
  templateUrl: './photo-interactive.component.html',
  styleUrls: ['./photo-interactive.component.scss']
})
export class PhotoInteractiveComponent implements OnInit {
  @ViewChild('presentationModal')
  private presModal: TemplateRef<any>;

  nom: string;
  
  constructor(private modalService: NgbModal) {}
  
  ngOnInit(): void {}
  
  showInfos(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.title.value; 
    this.nom = idAttr;
    this.modalService.open(this.presModal, {ariaLabelledBy: 'modal-basic-title'});
  }
}
