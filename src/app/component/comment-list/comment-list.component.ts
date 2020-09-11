import {Component, OnInit} from '@angular/core';
import {BitbucketService} from '../../service/bitbucket.service';
import {Activity} from '../../model/bitbucket-activity-response';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
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
