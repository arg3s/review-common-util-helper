import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Activity} from '../../comments-model';

@Component({
  selector: 'app-comment-single',
  template: `
    <span>{{activity.user.displayName}}: {{activity.comment.text}} </span>
  `,
  styleUrls: ['./comment-single.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentSingleComponent implements OnInit {

  @Input() activity: Activity;

  constructor() {
  }

  ngOnInit(): void {
  }

}
