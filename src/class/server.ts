import express from 'express';
import { SERVER_PORT } from '../config/server.config';

export default class Server {
  public app: express.Application;
  public port = SERVER_PORT;

  constructor() {
    this.app = express();
    this.app.set('port', process.env.PORT || SERVER_PORT);
    this.app.get('/', function (req, res) {
      res.json({ message: 'Bakat.id API v0.3.3' });
    });
  }

  listen(callback: Function) {
    this.app.listen(this.app.get('port'), callback);
  }
}