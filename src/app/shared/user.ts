export class User{
  static users: User[] = [];
  userName: string;
  Email: string;
  password: string;
  constructor(u, e, p){
    this.userName = u;
    this.Email = e;
    this.password = p;     // must be encrypted
  }

}
