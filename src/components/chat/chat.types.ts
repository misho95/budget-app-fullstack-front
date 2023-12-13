export interface MessageType {
  _id: string;
  userName: string;
  message: string;
  sendFrom: string;
  sendTo: string;
  createdAt: Date;
  updatedAt: Date;
}
