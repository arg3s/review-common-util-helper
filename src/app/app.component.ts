import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
      <app-comment-list></app-comment-list>
      <h2>Received {{receivedMessage}}</h2>
      <button (click)="sendMessage()">Send message to content script</button>
      <app-active-pr-list></app-active-pr-list>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'review-common-util-helper';
  counter = 0;
  receivedMessage = '';
  port;


  constructor(private ref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.port = chrome.runtime.connect({name: 'name'});
    this.port.onDisconnect.addListener(() => this.receivedMessage = 'Disconnected');
    this.port.onMessage.addListener((msg) => {
      this.handleMessage(msg);
    });
  }

  sendMessage(): void {
    this.port.postMessage('Hello there from angular' + this.counter);
  }

  handleMessage(msg: any): void {
    this.receivedMessage = msg;
    this.ref.detectChanges();
    this.counter++;
  }
}
