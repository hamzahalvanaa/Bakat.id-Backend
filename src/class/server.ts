import express from 'express';
import { SERVER_PORT } from '../config/server.config';

export default class Server {
  public app: express.Application;
  public port = SERVER_PORT;

  constructor() {
    this.app = express();
    this.app.set('port', process.env.PORT || SERVER_PORT);
  }

  listen(callback: Function) {
    this.app.listen(this.app.get('port'), callback);
  }
}