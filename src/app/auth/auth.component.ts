import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {User} from '../shared/user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  status = true;
  @Output() event: EventEmitter<boolean> = new EventEmitter();
  user  = new FormGroup({
    usernameOrEmail: new FormControl('', [Validators.required,
      Validators.maxLength(50),
    Validators.minLength(4)]),
    password: new FormControl('', [Validators.required,
    Validators.minLength(8)])
  });
  constructor(private userService: UserService) { }
  ngOnInit(): void {
  }
  singIn(): void{
    this.status = this.userService.singIn({usernameOrEmail: this.user.controls.usernameOrEmail.value,
      password: this.user.controls.password.value});
    if (this.status){
      this.user.reset();
      this.event.emit(true);
    }
  }
}
