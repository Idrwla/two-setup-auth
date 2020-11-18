import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../shared/user';

@Component({
  selector: 'app-secondauth',
  templateUrl: './secondauth.component.html',
  styleUrls: ['./secondauth.component.css']
})
export class SecondauthComponent implements OnInit {
  code: string;
  errormessage: string;
  @Output() event: EventEmitter<boolean> = new EventEmitter();
  constructor(private service: UserService) { }

  ngOnInit(): void {
  }
  verify(event): void{
    const accepted = this.service.secondAuth(event.toString());
    if (accepted === true){
      this.event.emit(accepted);
      this.errormessage = null;
    }else{
     this.errormessage = 'Вы ввели не правильный пароль!Пожалуйста верьнитесь обратно на страницу входа';
    }
  }
}
