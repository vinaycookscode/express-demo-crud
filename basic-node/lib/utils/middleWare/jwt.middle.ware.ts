import { HTTPResponse } from "../../helper/final-response";
import { IFinalResponse } from "../../interfaces/IFinal.response";
import { JwtHandler } from "../../utils/jwt/jwt.handler";

export class JWTMiddleWare {
    public static finalResponse: IFinalResponse = {
        status: false,
        data: [],
        msg: '',
    };
    constructor() {
    }

    static verifyTokenInMiddleWear(req, resp, next) {
        try {
            if (req?.headers?.authorization) {
                const handlerResponse = JwtHandler.isTokenExpired(req?.headers?.authorization);
            } else {
                this.finalResponse.status = false;
                this.finalResponse.data = [];
                this.finalResponse.msg = 'No authorization token found',
                this.finalResponse.errors = 'No authorization token found';
                HTTPResponse.noTokenFoundResponse(resp, this.finalResponse);
            }   
        } catch (error) {
            this.finalResponse.msg = error?.message;
            this.finalResponse.errors = error;
            HTTPResponse.failureResponse(resp, this.finalResponse);
        }
    }
}