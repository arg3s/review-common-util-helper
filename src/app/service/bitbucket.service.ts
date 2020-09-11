import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BitbucketService {

  private BASE_URL = 'https://git.consdata.local/rest/api/1.0/projects/';

  constructor(private http: HttpClient) {
  }

  getPullRequestActivity(project: string, repoName: string, prId: number): Observable<any> {
    const targetUrl = this.buildUrl(project, repoName, prId);
    return this.http.get<any>(targetUrl);
  }

  buildUrl(project: string, repoName: string, prId: number): string {
    // todo przerobic na lepsze budowanie url
    return this.BASE_URL + project + '/repos/' + repoName + '/pull-requests/' + prId + '/activities';
  }
}
