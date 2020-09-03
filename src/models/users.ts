class User{
  static last_id = 0;

  id: string;
  firstname: string;
  lastname: string;
  email: string;

  constructor(firstname: string, lastname: string, email: string){
    User.last_id += 1;

    this.id = User.last_id.toString();
    this.lastname = lastname;
    this.firstname = firstname;
    this.email = email;
  }

  status(){
    return `My name is ${this.firstname} ${this.lastname}.`
  }
}

export = User;