import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Activity} from '../../comments-model';

@Component({
  selector: 'app-comment-single',
  template: `
    <mat-card>
      <div style="font-weight: bold">{{activity.user.displayName}}:</div>
      <span>{{activity.comment.text}} </span>
      <div style="width: 100%">
        <mat-icon class="go-to-comment" (click)="onCommentClick()">forward</mat-icon>
      </div>
    </mat-card>
  `,
  styleUrls: ['./comment-single.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentSingleComponent {

  @Input() activity: Activity;


  onCommentClick() {
    // TODO wysylka do backgroundu idka commenta

  }
}
