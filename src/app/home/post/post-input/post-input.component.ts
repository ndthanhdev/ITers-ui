import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-post-input',
  template: `
  <div class="mb-3" [froalaEditor]></div>
  <button type="button" class="btn btn-primary float-right mb-4">New Post</button>
  `,
  styleUrls: ['./post-input.component.scss']
})
export class PostInputComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
