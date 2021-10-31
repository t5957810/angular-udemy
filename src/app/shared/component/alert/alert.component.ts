import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() message: string;
  close$ = new Subject<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onClose() {
    this.close$.next('close button');
  }

}
