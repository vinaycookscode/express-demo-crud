import * as express from "express";
import * as bodyParser from "body-parser";
import { UserRoutes } from '../routes/user.router';
import { NoRouteFound } from '../routes/no.route.found';
import { WinstonLogger } from './winston-logger'
import { JWTMiddleWare } from "../utils/middleWare/jwt.middle.ware";
const morgan = require('morgan');
var cors = require('cors')
class App {
   public app: express.Application;
   constructor() {
      this.app = express();
      this.config();
   }
private config(): void {
      // support application/json type post data
      var mongoose = require('mongoose');
      mongoose.connect('mongodb://localhost/nodebasic', {useNewUrlParser: true, useUnifiedTopology: true});
      const db = mongoose.connection;
      db.on('error', console.error.bind(console, 'Mongodb connection failed'));
      db.once('open', function() {
        console.log('Connected to mongodb')
      });
      this.app.use(cors());
      this.app.use(bodyParser.json());
      this.app.use( (req, res, next) => {
         if (req?.url !== '/api/user/login/' && req?.url !== '/api/user/signup/') {
            JWTMiddleWare.verifyTokenInMiddleWear(req, res, next);
            next();
         } else {
            next();
         }
      });
      let winstonLoggerObject = WinstonLogger.CreateLogger();
      this.app.use(morgan('combined', { stream:  winstonLoggerObject.stream}));
      this.app.use(bodyParser.urlencoded({ extended: false }));
      UserRoutes._route(this.app);
      NoRouteFound._noRouteFound(this.app);
   }
}
export default new App().app;