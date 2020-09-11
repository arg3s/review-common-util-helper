import {AfterContentInit, ChangeDetectorRef, Component} from '@angular/core';

export interface BitbucketRequest {
  project: string;
  repoName: string;
  pullRequestId: number;
}

@Component({
  selector: 'app-root',
  template: `
      <app-comment-list [request]="request"></app-comment-list>
      <button (click)="ref.detectChanges()">Detect changes</button>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit {
  request: BitbucketRequest;
  port;
  tabsPort;

  constructor(public ref: ChangeDetectorRef) {
  }

  ngAfterContentInit(): void {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      if (tabs.length > 0) {
        this.tabsPort = chrome.tabs.connect(tabs[0].id);
        this.tabsPort.onMessage.addListener((msg) => {
          this.request = this.prepareBitbucketRequest(msg);
        });
      }
    });

    this.port = chrome.runtime.connect({name: 'name'});
    this.port.onDisconnect.addListener(() => {
    });
    this.port.onMessage.addListener((msg) => {
    });
  }

  private prepareBitbucketRequest(location: string): BitbucketRequest {
    const splitUrl = location.split('/');
    console.log(location);
    return {
      project: splitUrl[splitUrl.findIndex(val => val === 'projects') + 1],
      repoName: splitUrl[splitUrl.findIndex(val => val === 'repos') + 1],
      pullRequestId: Number(splitUrl[splitUrl.findIndex(val => val === 'pull-requests') + 1])
    };
  }
}
