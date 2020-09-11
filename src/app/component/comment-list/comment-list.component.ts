import {Component, Input} from '@angular/core';
import {BitbucketService} from '../../service/bitbucket.service';
import {Activity} from '../../model/bitbucket-activity-response';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {BitbucketRequest} from '../../app.component';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent {

  activities: Observable<Activity[]>;
  repoName: string;
  project: string;
  pullRequestId: number;

  @Input() set request(request: BitbucketRequest) {
    if (!!request) {
      this.repoName = request.repoName;
      this.pullRequestId = request.pullRequestId;
      this.project = request.project;
      this.activities = this.bbService
        .getPullRequestActivity(this.project, this.repoName, this.pullRequestId)
        .pipe(
          map(response => response.values),
          map(activities => activities.filter(single => single.action === 'COMMENTED')));
    }
  }

  constructor(private bbService: BitbucketService) {
  }
}
