class User{
  static last_id = 0;

  constructor(firstname, lastname, email){
    User.last_id += 1;

    this.id = User.last_id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
  }

  status(){
    return `My name is ${this.firstname} ${this.lastname}.`
  }
}

module.exports = User;