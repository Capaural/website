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
  members: Member[];
  memberSubscription: Subscription;

  enigmeContent: string;
  enigmeCode: string;

  constructor(private modalService: NgbModal,
    private membersService: MembersService) { }

  ngOnInit(): void {
    this.members = null;
    this.memberSubscription = this.membersService.membersSubject.subscribe(
      (members: Member[]) => {
        this.members = members;
      }
    );
    if (!this.members) this.membersService.emitMembers();
  }

  showInfos(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.title.value;

     if (target.id == "Darraillan") {
       this.enigmeContent = "Vous avez pas faim vous?";
       this.enigmeCode = "4hxS";
     } else {
       this.enigmeContent = "";
       this.enigmeCode = "";
     }

    if (!this.members || this.members.length == 0 || idAttr > this.members.length) { return; }

    this.presentedMember = this.members[idAttr];

    this.modalService.open(this.presModal, { ariaLabelledBy: 'modal-basic-title' });
  }
}
