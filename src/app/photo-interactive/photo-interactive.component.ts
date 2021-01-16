import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Member } from '../models/Member.model';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'app-photo-interactive',
  templateUrl: './photo-interactive.component.html',
  styleUrls: ['./photo-interactive.component.scss']
})
export class PhotoInteractiveComponent implements OnInit {
  @ViewChild('presentationModal')
  private presModal: TemplateRef<any>;

  presentedMember: Member;
  name: string;
  lastName: string;
  role: string;
  description: string;
  alias: string;
  members: Member[];
  memberSubscription: Subscription;
  
  constructor(private modalService: NgbModal,
              private membersService: MembersService) {}
  
  ngOnInit(): void {
    this.members = null;
    this.memberSubscription = this.membersService.membersSubject.subscribe(
      (members: Member[]) => {
        this.members = members;
      }
    );
  }
  
  showInfos(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.title.value;

    if (!this.members || idAttr > this.members.length) {return;}

    // Il va juste falloir changer le titre de chaque ligne du svg pour ouvrir la bonne personne
    idAttr = 1;
    this.presentedMember = this.members[idAttr];
    
    this.modalService.open(this.presModal, {ariaLabelledBy: 'modal-basic-title'});
  }
}
