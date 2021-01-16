import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Member } from 'src/app/models/Member.model';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-new-member',
  templateUrl: './new-member.component.html',
  styleUrls: ['./new-member.component.scss']
})
export class NewMemberComponent implements OnInit {

  memberForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(private formBuilder: FormBuilder,
              private gameService: MembersService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.memberForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      alias: ['', Validators.required],
      role: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSaveMember() {
    //Form informations
    const name = this.memberForm.get('name').value;
    const lastname = this.memberForm.get('lastname').value;
    const alias = this.memberForm.get('alias').value;
    const role = this.memberForm.get('role').value;
    const description = this.memberForm.get('description').value;

    const newMember = new Member(name, lastname, alias, role, description);
    if (this.fileUrl && this.fileUrl !== '') {
      newMember.photo = this.fileUrl;
    }
    this.gameService.createNewMember(newMember);
    this.router.navigate(['/home']);
  }

  onFileUpload(file: File) {
    this.fileIsUploading = true;
    this.gameService.uploadFile(file).then(
      (url: string) => {
        console.log("url :" + url);
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  detectFiles(event) {
    this.onFileUpload(event.target.files[0]);
  }
}
