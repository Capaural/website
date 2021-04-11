import { Component, OnInit} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Defi } from '../models/Defi.model';
import { DefisService } from '../services/defis.service';

@Component({
  selector: 'app-defi-list',
  templateUrl: './defi-list.component.html',
  styleUrls: ['./defi-list.component.scss']
})
export class DefiListComponent implements OnInit {

  defis: Defi[];
  planningSubscription: Subscription;
  safe_url: SafeResourceUrl;

  constructor(
    private defisService: DefisService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    const form_url: string = "https://docs.google.com/forms/d/e/1FAIpQLSeg6iqXRzG2PvVMgJKpW6g__Ke6PAQ-luvGo6KuTXXNC-8SSw/viewform?embedded=true"
    this.safe_url = this.sanitizer.bypassSecurityTrustResourceUrl(form_url);
    this.defis = null;
    this.planningSubscription = this.defisService.defisSubject.subscribe(
      (defis: Defi[]) => {
        this.defis = defis;
      }
    );
    if (!this.defis) this.defisService.emitDefis();
  }
}
