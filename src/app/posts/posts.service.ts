import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';
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
    this.http.get<{message: string, posts: any}>(
      'http://localhost:3000/api/posts'
    ).pipe(map((postData) => {
      return postData.posts.map((post: any) => {
        return {
          title: post.title,
          content: post.content,
          id: post._id
        }
      })
    }))
    .subscribe((transformedPosts) => {
      this.posts = transformedPosts;
      this.postUpdated.next([...this.posts]);
    })
  }

  getPostsUpdatedListener(){
    return this.postUpdated.asObservable();
  }

  deletePost(postId: string){
    this.http.delete<{message: string, posts: Post[]}>('http://localhost:3000/api/posts/'+ postId)
    .subscribe((result) => {
      console.log("delete post", result);
      const updatedPosts = this.posts.filter(post => post.id !== postId);
      this.posts = updatedPosts;
      this.postUpdated.next([...this.posts]);
    })
  }

  addPost(title: string, content: string){
    const post = { id: 'null', title: title, content: content};
    this.http.post<{message: string, post: Post}>('http://localhost:3000/api/posts', post).subscribe((response) => {
      this.posts.push(post);
      this.postUpdated.next([...this.posts]);
    });
  }

}
