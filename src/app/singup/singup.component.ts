import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {User} from '../shared/user';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {
  @Output() event: EventEmitter<User> = new EventEmitter();
  constructor(private userService: UserService) { }
  userForSingUp = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    pass: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confPass: new FormControl('', [Validators.required, Validators.minLength(8)])
  });
  ngOnInit(): void {
  }
  confPassCheck(): boolean{
    if (this.userForSingUp.controls.pass.value !== this.userForSingUp.controls.confPass.value){
      return true;
    }else {
      return false;
    }
  }
  register(): void{
    if (this.userForSingUp.controls.pass.value === this.userForSingUp.controls.confPass.value){
      const user: User = new User(this.userForSingUp.controls.username.value,
        this.userForSingUp.controls.email.value,
        this.userForSingUp.controls.pass.value);
      this.userService.createNewUser(user);
      this.event.emit(this.userService.currentUser);
      this.userForSingUp.reset();
    }
  }
  test(): void{
    console.log(this.userForSingUp);
  }

}
