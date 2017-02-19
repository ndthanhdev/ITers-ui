import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-navbar',
  template: `
  <nav class="navbar navbar-toggleable-md navbar-light bg-faded fixed-top">
    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
            data-target="#app-navbar" aria-controls="app-navbar-control" aria-expanded="false"
            aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand" routerLink="/">ITers</a>
  
    <div class="collapse navbar-collapse" id="app-navbar">
      <div class="navbar-nav mr-auto mt-2 mt-md-0">
        <a class="nav-item nav-link" routerLink="/">
          <span>Hello, Vu Nguyen Hung</span>
          <small class="text-primary">
            <i class="fa fa-circle" aria-hidden="true"></i>
            <span>Admin</span>
          </small>
        </a>
        <a class="nav-item nav-link" routerLink="/" placement="right" ngbTooltip="Dashboard">
          <i class="fa fa-globe fa-lg" aria-hidden="true"></i>
        </a>
      </div>
      <form class="form-inline my-2 my-lg-0">
        <div class="input-group mr-sm-2">
          <input class="form-control" type="text" placeholder="Search">
          <span class="input-group-addon"><i class="fa fa-search" aria-hidden="true"></i></span>
        </div>
        <button class="btn btn-outline-primary my-2 my-sm-0" type="button">Logout</button>
      </form>
    </div>
  </nav>
  `,
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
