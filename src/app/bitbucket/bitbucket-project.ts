import {BitbucketRepository} from './bitbucket-repository';

export interface BitbucketProject {
  key: string;
  repositories: BitbucketRepository[];
}
