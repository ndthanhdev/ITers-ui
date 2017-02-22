import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PostRoutingModule} from "./post-routing.module";
import {PostComponent} from "./post/post.component";
import {SharedModule} from "../../shared/shared.module";
import {PostListComponent} from "./post-list/post-list.component";
import {PostDetailComponent} from "./post-detail/post-detail.component";
import {FroalaEditorModule, FroalaViewModule} from "angular2-froala-wysiwyg";
import {PostInputComponent} from "./post-input/post-input.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FroalaEditorModule,
    FroalaViewModule,
    PostRoutingModule
  ],
  declarations: [PostComponent, PostListComponent, PostDetailComponent, PostInputComponent]
})
export class PostModule { }
