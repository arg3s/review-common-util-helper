export interface PullRequest {
  id: number;
  project: string;
  repo: string;
  url: string;
  open: boolean;
  author: string;
  title: string;
  status: string;
  createdDate: Date;
}
