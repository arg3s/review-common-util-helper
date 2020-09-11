import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class BitbucketService {
  static readonly BASE_URL = '/api';
  static readonly USERNAME = 'hudson_eximee';
  static readonly PASSWORD = 't#7_^qBLWeVD*HsP';
  static readonly LIMIT = 1000;

  constructor(private http: HttpClient) {
  }

  getAllProjectKeys(): Observable<any> {
    return this.http.get<any>(`${BitbucketService.BASE_URL}/projects`, {headers: this.headers()});
  }

  getProjectRepositories(name: string): Observable<any> {
    return this.http.get<any>(`${BitbucketService.BASE_URL}/projects/${name}/repos?limit=${BitbucketService.LIMIT}`, {headers: this.headers()});
  }

  getRepoPullRequests(projectName: string, repositoryName: string): Observable<any> {
    return this.http.get<any>(`${BitbucketService.BASE_URL}/projects/${projectName}/repos/${repositoryName}/pull-requests?limit=${BitbucketService.LIMIT}`, {headers: this.headers()});
  }

  private headers(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Basic ${btoa(BitbucketService.USERNAME + ':' + BitbucketService.PASSWORD)}`);
  }
}
