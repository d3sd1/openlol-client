import {LcuEndpoint} from "../model/lcu-endpoint";
import {ApiCallType} from "../model/api-call-type";

export class SessionInfoEndpoint extends LcuEndpoint {
  apiCallType = ApiCallType.GET;
  endpointUri = '/lol-login/v1/session';
}
