import { v4 as uuidv4 } from 'uuid';

export class MessageData {
  constructor(user, message) {
    this.user = user;
    this.message = message;
    this.id = uuidv4();
  }
}
