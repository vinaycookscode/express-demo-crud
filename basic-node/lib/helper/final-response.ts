import { RESPONSE_STATUS_CODES } from "../utils/constants/global.constants";
import { Response } from 'express';
import { IFinalResponse } from "../interfaces/IFinal.response";
import { IFunctionalResponse } from "interfaces/IFunctional.response";

export class HTTPResponse {
    static successResponse (res: Response, data: IFinalResponse | IFunctionalResponse) {
        
        data.errors = this.handleObject(data?.errors);
        res.status(RESPONSE_STATUS_CODES?.SUCCESS).send(data);
    }

    static failureResponse (res: Response, data: IFinalResponse | IFunctionalResponse) {
        data.errors = this.handleObject(data?.errors);
        res.status(RESPONSE_STATUS_CODES?.BAD_REQUEST).send(data);
    }

    static getFailureResponse(res: Response, data: IFinalResponse | IFunctionalResponse) {
        data.errors = this.handleObject(data?.errors);
        res.status(RESPONSE_STATUS_CODES?.NO_RECORD_FOUND).send(data);
    }

    static noTokenFoundResponse(res: Response, data: IFinalResponse | IFunctionalResponse) {
        data.errors = this.handleObject(data?.errors);
        res.status(RESPONSE_STATUS_CODES?.BAD_REQUEST).send(data);
    }

    static noRecordFound(res: Response, data: IFinalResponse | IFunctionalResponse) {
        data.errors = this.handleObject(data?.errors);
        res.status(RESPONSE_STATUS_CODES?.NO_RECORD_FOUND).send(data);
    }

    static handleObject = (errors) => {
        let finalError: [{ key: string, message: string}] | any = [];
        if (errors && errors?.errors) {
    
            for (const [key, value] of Object.entries(errors?.errors)) {
                finalError.push({ key: key, message: value['message'] });
            }
        } else {
            finalError.push(errors);
        }
        return finalError;
    };

}