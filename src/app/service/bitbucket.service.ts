import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BbActivityResponse} from '../model/bitbucket-activity-response';


@Injectable({
  providedIn: 'root'
})
export class BitbucketService {

  private static readonly BASE_URL: string = '/api';
  private static readonly EXIMEE: string = 'hudson_eximee:t#7_^qBLWeVD*HsP';
  private static readonly IB24: string = 'hudson_emb24:w7EwCgJhcc';
  private static readonly LIMIT: string = '1000';

  constructor(private http: HttpClient) {
  }

  getPullRequestActivity(project: string, repoName: string, prId: number): Observable<BbActivityResponse> {
    return this.http.get<BbActivityResponse>(this.getUrl(project, repoName, prId), {headers: this.headersIb24()});
  }

  getAllProjects(): Observable<any> {
    return this.http.get<any>(`${BitbucketService.BASE_URL}/projects`, {headers: this.headersEximee()});
  }

  getProjectRepositories(projectKey: string): Observable<any> {
    return this.http.get<any>(`${BitbucketService.BASE_URL}/projects/${projectKey}/repos?limit=${BitbucketService.LIMIT}`, {headers: this.headersEximee()});
  }

  getRepoPullRequests(projectName: string, repositoryName: string): Observable<any> {
    return this.http.get<any>(`${BitbucketService.BASE_URL}/projects/${projectName}/repos/${repositoryName}/pull-requests?limit=${BitbucketService.LIMIT}`, {headers: this.headersEximee()});
  }

  private getUrl(project: string, repoName: string, prId: number): string {
    return `${BitbucketService.BASE_URL}/projects/${project}/repos/${repoName}/pull-requests/${prId}/activities`;
  }

  private headersEximee(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Basic ${btoa(BitbucketService.EXIMEE)}`);
  }

  private headersIb24(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Basic ${btoa(BitbucketService.IB24)}`);
  }
}
