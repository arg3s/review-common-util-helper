import {BitbucketPullRequest} from './bitbucket-pull-request';

export interface BitbucketRepository {
  name: string;
  pullRequests: BitbucketPullRequest[];
}
