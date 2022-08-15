import { Component, Input, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Post } from '../post.model';
import { PostsService } from "../posts.service";
@Component({
  selector: '<app-posts-list>',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})

export class PostsListComponent implements OnInit {
  // posts = [
  //   {title: 'First Post', content: "this is first post content"},
  //   {title: 'Second Post', content: "this is second post content"},
  //   {title: 'Third Post', content: "this is third post content"}
  // ]
  // @Input()
  posts: Post[] = [];
  private postsSub?: Subscription;
  constructor(private postsService: PostsService){}
  ngOnInit() {
    // this.posts =
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostsUpdatedListener().subscribe((posts: Post[]) => {
      this.posts = posts;
    })

  }

  ngOnDestroy(){
    this.postsSub?.unsubscribe();
  }
}
