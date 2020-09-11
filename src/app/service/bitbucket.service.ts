import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BbActivityResponse} from '../model/bitbucket-activity-response';


@Injectable({
  providedIn: 'root'
})
export class BitbucketService {

  private BASE_URL = 'https://git.consdata.local/rest/api/1.0/projects';

  constructor(private http: HttpClient) {
  }

  getPullRequestActivity(project: string, repoName: string, prId: number): Observable<BbActivityResponse> {
    return this.http.get<BbActivityResponse>(this.getUrl(project, repoName, prId));
  }

  getUrl(project: string, repoName: string, prId: number): string {
    return `${this.BASE_URL}/${project}/repos/${repoName}/pull-requests/${prId}/activities`;
  }
}
