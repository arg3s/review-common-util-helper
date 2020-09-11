import {Component, OnInit} from '@angular/core';
import {BitbucketService} from '../../service/bitbucket.service';
import {Value} from '../../model/bitbucket-activity-response';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {

  comments: Value[];
  repoName: string;
  project: string;
  pullRequestId: number;

  constructor(private bbService: BitbucketService) {
    this.project = 'EXM';
    this.repoName = 'eximee-pko-nnw-junior';
    this.pullRequestId = 251;
  }

  ngOnInit(): void {
    this.bbService.getPullRequestActivity(this.project, this.repoName, this.pullRequestId).subscribe(r => {
      this.comments = r.values.filter(v => v.action === 'COMMENTED');
      console.log(r.values);
    });
  }


}
