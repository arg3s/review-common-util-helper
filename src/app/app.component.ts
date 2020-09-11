import {AfterViewInit, Component, OnInit} from '@angular/core';
import {BitbucketService} from './bitbucket/bitbucket.service';
import {BitbucketProject} from './bitbucket/bitbucket-project';
import {BitbucketRepository} from './bitbucket/bitbucket-repository';
import {BitbucketPullRequest} from './bitbucket/bitbucket-pull-request';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'review-common-util-helper';
  projects: BitbucketProject[] = [];

  constructor(private bitbucketService: BitbucketService) {
  }

  ngOnInit(): void {
    this.bitbucketService.getAllProjectKeys()
      .subscribe(result => {
        this.setProjects(result);
        console.log(this.projects);
      });
  }

  private setProjects(result): void {
    if (result) {
      this.projects = result.values.map(project => <BitbucketProject> {key: project.key});
      this.projects.forEach(project => {
        this.setRepositoryNames(project);
      });
    }
  }

  private setRepositoryNames(project: BitbucketProject): any {
    this.bitbucketService.getProjectRepositories(project.key)
      .subscribe(result => {
        if (result) {
          project.repositories = result.values.map(repo => <BitbucketRepository> {name: repo.name});
          project.repositories.forEach(repo => {
            this.setRepoPullRequests(project.key, repo);
          });
        }
      });
  }

  private setRepoPullRequests(project: string, repository: BitbucketRepository): void {
    this.bitbucketService.getRepoPullRequests(project, repository.name)
      .subscribe(result => {
        if (result) {
          repository.pullRequests = result.values.map(pr => <BitbucketPullRequest> {id: pr.id});
        }
      });
  }
}
