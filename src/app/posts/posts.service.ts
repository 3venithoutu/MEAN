import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class PostsService{

  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts(){
    // return this.posts;
    this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts').subscribe((postData) => {
      this.posts = postData.posts;
      this.postUpdated.next([...this.posts]);
    })
  }

  getPostsUpdatedListener(){
    return this.postUpdated.asObservable();
  }

  addPost(title: string, content: string){
    const post = { id: 'null', title: title, content: content};
    this.http.post<{message: string, post: Post}>('http://localhost:3000/api/posts', post).subscribe((response) => {
      console.log(response);
      this.posts.push(post);
      this.postUpdated.next([...this.posts]);
    });
  }

}
