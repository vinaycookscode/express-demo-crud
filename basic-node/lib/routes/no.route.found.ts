import { Application, Request, Response } from 'express'

export class NoRouteFound {
	public static _noRouteFound( _app: Application) {
		_app.all('*', (req: Request, resp: Response) => {
			resp.status(400).send({ msg : 'sorry no route found'});
		});
	}
}