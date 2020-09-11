export interface BbActivityResponse {
  size: number;
  limit: number;
  isLastPage: boolean;
  values: Activity[];
  start: number;
}

export interface Activity {
  id: number;
  createdDate: number;
  user: User;
  action: string;
  addedReviewers?: any[];
  removedReviewers?: User[];
  commentAction?: string;
  comment?: Comment;
}

export interface Comment {
  properties: Properties;
  id: number;
  version: number;
  text: string;
  author: User;
  createdDate: number;
  updatedDate: number;
  comments: any[];
  tasks: any[];
  permittedOperations: PermittedOperations;
}

export interface User {
  name: string;
  emailAddress: string;
  id: number;
  displayName: string;
  active: boolean;
  slug: string;
  type: string;
  links: Links;
}

export interface Links {
  self: Self[];
}

export interface Self {
  href: string;
}

export interface PermittedOperations {
  editable: boolean;
  deletable: boolean;
}

export interface Properties {
  likedBy: LikedBy;
  repositoryId: number;
}

export interface LikedBy {
  total: number;
  likers: User[];
}
