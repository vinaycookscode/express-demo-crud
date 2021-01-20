import { Request, Response} from 'express'
import { HTTPResponse } from '../helper/final-response';
import { UserBL } from '../BL/user.bl';
import { IFunctionalResponse } from 'interfaces/IFunctional.response';
export class UserController {

	static createNewUser(req: Request, res: Response) {
		UserBL.createNewUser(req, (blResponse) => {
			if (blResponse?.status)  {
				HTTPResponse.successResponse(res, blResponse);
			} else {
				HTTPResponse.failureResponse(res, blResponse);
			}
		});
	}

	static getUserDetails(req: Request, res: Response) {
		UserBL.getUserDetails(req, (blResponse: IFunctionalResponse) => {
			if (blResponse?.status)  {
				HTTPResponse.successResponse(res, blResponse);
			} else {
				HTTPResponse.noRecordFound(res, blResponse);
			}
		});
	}

	static loginUser(req: Request, res: Response) {
		try{
			UserBL.getUserDetailsByUserNamePassword(req, (blResponse) => {
				if (blResponse?.status)  {
					HTTPResponse.successResponse(res, blResponse);
				} else {
					HTTPResponse.getFailureResponse(res, blResponse);
				}
			});
		} catch(exception) {
			HTTPResponse.getFailureResponse(res, exception);
		}
	}

	static updateUserDetails() {

	}

	static deleteUser(req: Request, res: Response) {
		UserBL.deleteUser(req, (blResponse) => {
			if (blResponse?.status)  {
				HTTPResponse.successResponse(res, blResponse);
			} else {
				HTTPResponse.getFailureResponse(res, blResponse);
			}
		});
	}
}