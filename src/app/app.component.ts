import {Component, Input, ViewChild} from '@angular/core';
import {User} from './shared/user';
import {UserService} from './services/user.service';
import {PageComponent} from './page/page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: User;
  loggedIn: boolean;
  singInComp: boolean;
  singUpComp: boolean;
  secondAuth: boolean;
  asDefault  = true;
  @ViewChild('pageComponent') page: PageComponent;
  constructor(private service: UserService) {
  }
  accepted(event): void{
    if (event === true){
      this.loggedIn = true;
    }else {
      this.loggedIn = false;
    }
  }
  log(event): void{
    this.user = event;
    this.loggedIn = true;
    this.asDefault = false;
  }
  redirectToSecondAuth(event): void{
    if (event === true){
      this.secondAuth = true;
      this.singInComp = false;
    }
  }
  directory(dirName: string): void{
    if (dirName === 'singIn'){
      this.singInComp = true;
      this.secondAuth = false;
    }else {
      this.singInComp = false;
    }
    if (dirName === 'singUp'){
      this.singUpComp = true;
      this.secondAuth = false;
    }
    else {
      this.singUpComp = false;
    }
    this.asDefault = false;
  }
  exit(): void{
    this.user = null;
    this.service.exit();
    this.loggedIn = false;
    this.page.pageUser = null;
  }
}
