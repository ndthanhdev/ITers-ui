import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-footer',
  template: `
  <footer class="bg-inverse text-center footer">
    <span class="text-white">Made with 
      <span class="text-danger"><i class="fa fa-heart" aria-hidden="true"></i></span> by vunguyenhung
    </span>
  </footer>
  `,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
