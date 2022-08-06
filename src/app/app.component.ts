import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mean-course';
  posts: any = [];

  postAdded(post: any){
    this.posts.push(post);
    console.log("app", this.posts);
  }
}
