

export class User {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}


export default class Message {
  id: string = crypto.randomUUID();
  user: User;
  content: string = '';
  timestamp: string = '';

  constructor(content: string, user: User) {
    this.content = content;
    this.user = user;
    this.timestamp = new Date().toISOString();
  }
}