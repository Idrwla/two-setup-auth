import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../shared/user';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  pageUser: User;
  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.pageUser = this.service.currentUser;
  }

}
