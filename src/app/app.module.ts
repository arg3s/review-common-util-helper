import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {CommentListComponent} from './component/comment-list/comment-list.component';
import {HttpClientModule} from '@angular/common/http';
import {ActivePrListComponent} from './component/pull-requests/active-pr-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CommentListComponent,
    ActivePrListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
