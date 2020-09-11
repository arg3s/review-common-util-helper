import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BitbucketService} from '../bitbucket/bitbucket.service';
import {Activity} from '../comments-model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-comment-list',
  template: `
    <mat-card>
      <mat-card-title>
        Pull request [{{pullRequestId}}] w {{repoName}}
      </mat-card-title>
      <div class="comments-single" *ngFor="let activity of activities | async">
        <app-comment-single [activity]="activity"></app-comment-single>
      </div>
    </mat-card>
  `,
  styleUrls: ['./comment-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentListComponent implements OnInit {

  activities: Observable<Activity[]>;
  repoName: string;
  project: string;
  pullRequestId: number;

  constructor(private bbService: BitbucketService) {
    this.project = 'BZA';
    this.repoName = 'ib24-client';
    this.pullRequestId = 7358;
  }

  ngOnInit(): void {
    this.activities = this.bbService
      .getPullRequestActivity(this.project, this.repoName, this.pullRequestId)
      .pipe(
        map(response => response.values),
        map(activities => activities.filter(single => single.action === 'COMMENTED')));
  }


}
