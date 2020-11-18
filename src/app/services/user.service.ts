import { Injectable } from '@angular/core';
import '/src/assets/smtp.js';
import * as CryptoJS from 'crypto-js';
import {User} from '../shared/user';
import {Email} from '../../assets/smtp';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: User;
  codeVerify: string;
  constructor() { }
  createNewUser(user: User): void{
    user.password = this.encryptPassword(user.password, user.userName);
    User.users.push(user);
    this.currentUser = user;
  }
  private encryptPassword(password, username): string{
    return CryptoJS.AES.encrypt(password.trim(), username.toString().trim()).toString();
  }
  private decrypt(transitMessage, username): void{
    return CryptoJS.AES.decrypt(transitMessage, username.trim()).toString(CryptoJS.enc.Utf8);
  }
  getUsers(): User[]{
    return User.users;
  }
  singIn({usernameOrEmail, password}): boolean{
    let validUser: User;
    User.users.forEach(
      (item) => {
        if (item.userName === usernameOrEmail || item.Email === usernameOrEmail){
            const enPass = this.decrypt(item.password, item.userName);
            console.log(enPass);
            if (password === enPass){
              validUser = item;
              this.codeVerify = this.sendVerify(item.Email);
            }
        }
      }
    );
    console.log(validUser);
    if (validUser){
      this.currentUser = validUser;
      return true;
    }else{
      this.currentUser = null;
      return false;
    }
  }
  exit(): void{
    this.currentUser = null;
  }
  sendVerify(EMAIL): string{
    const code = this.generateCode();
    const text = 'Hello,' + EMAIL + ',\n Код для подтверждения \n' + code;
    Email.send({
      Host : 'smtp.elasticemail.com',
      Username : 'ilyarredmi@gmail.com',
      Password : 'AAA75F5F6AC1049E25C3A6B196003CF1139B',
      To : EMAIL.toString(),
      From : 'ilyarredmi@gmail.com',
      Subject : 'Idrwla Services',
      Body : text
    }).then();
    return code;
  }
  generateCode(): string {
    return Math.random().toString(36).substring(2, 15);
  }
  secondAuth(code): boolean{
    if (code !== this.codeVerify){
      this.currentUser = null;
      return false;
    }
    return true;
  }
}
