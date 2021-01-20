import { UserController } from '../controllers/user.controller';
import {Application, Request, Response} from 'express'
export class UserRoutes  {
	
	public static _route(_app: Application) {
		
		_app.post('/api/user/login/', (req: Request, resp: Response) => {
			UserController.loginUser(req, resp);
		});
		_app.post('/api/user/signup', (req: Request, resp: Response) => {
			UserController.createNewUser(req, resp);
		});
		_app.get('/api/user/:id?', (req: Request, resp: Response) => {
			UserController.getUserDetails(req, resp);
		});
		_app.delete('/api/user/:id', (req: Request, resp: Response) => {
			UserController.deleteUser(req, resp);
		});
	}
}
