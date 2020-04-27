import {LcuEndpoint} from "../model/lcu-endpoint";
import {ApiCallType} from "../model/api-call-type";

export class FlowStatusEndpoint extends LcuEndpoint {
  apiCallType = ApiCallType.GET;
  endpointUri = '/lol-gameflow/v1/session';
}




