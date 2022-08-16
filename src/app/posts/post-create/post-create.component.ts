import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Post } from '../post.model';
import { PostsService } from "../posts.service";
@Component({
  selector: '<app-post-create>',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent implements OnInit{
  enteredTitle: any;
  enteredContent: any;
  // @Output() postCreated = new EventEmitter<Post>();
  constructor(private postsService: PostsService){}
  ngOnInit() {

  }

  addPost(form: NgForm){
    if(form.invalid){
      return;
    }

    /* sharing data from child to parent
    const post: Post = {
      title: form.value.title,
      content: form.value.content
    }
    this.postCreated.emit(post); */

    this.postsService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }

}
