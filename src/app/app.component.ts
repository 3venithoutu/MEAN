import { Component } from '@angular/core';
import { Post } from './posts/post.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mean-course';
  posts: Post[] = [];

  postAdded(post: any){
    this.posts.push(post);
    console.log("app", this.posts);
  }
}
