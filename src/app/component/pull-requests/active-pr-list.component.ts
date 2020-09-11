import {Component, OnInit} from '@angular/core';
import {PullRequest} from './pull-request';
import {BitbucketService} from '../../service/bitbucket.service';

@Component({
  selector: 'app-active-pr-list',
  templateUrl: './active-pr-list.component.html',
  styleUrls: ['./active-pr-list.component.scss']
})
export class ActivePrListComponent implements OnInit {
  pullRequests: PullRequest[] = [];

  constructor(private bitbucketService: BitbucketService) {
  }

  ngOnInit(): void {
    this.getActivePRs();
  }

  private getActivePRs(): void {
    const that = this;
    this.bitbucketService.getAllProjects().subscribe(result => {
        if (result) { this.getProjectRepos(result, that); }
      });
  }

  private getProjectRepos(result, that): void {
    result.values.map(project => project.key).forEach(projectKey => {
      this.bitbucketService.getProjectRepositories(projectKey).subscribe(repos => {
        if (repos) {
          this.getPullRequests(repos, projectKey, that);
        }
      });
    });
  }

  private getPullRequests(repos, projectKey, that): void {
    repos.values.forEach(repo => {
      this.bitbucketService.getRepoPullRequests(projectKey, repo.name).subscribe(result => {
        if (result && result.values && result.values.length > 0) {
          const pullRequests: PullRequest[] = result.values.map(pr => <PullRequest> {
            id: pr.id,
            project: projectKey,
            repo: repo.name,
            url: pr.links.self[0].href,
            open: pr.open,
            author: pr.author.user.displayName,
            title: pr.title, status: pr.author.status,
            createdDate: pr.createdDate
          });
          that.pullRequests = that.pullRequests.concat(pullRequests);
        }
      });
    });
  }
}
