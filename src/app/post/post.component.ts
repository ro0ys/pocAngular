import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() title: string;
  @Input() content: string;
  loveIts = 0;
  created_at = new Date();

  constructor() { }

  ngOnInit() {
  }

  likeAction() {
    this.loveIts += 1;
  }

  dislikeAction() {
    this.loveIts -= 1;
  }

}
