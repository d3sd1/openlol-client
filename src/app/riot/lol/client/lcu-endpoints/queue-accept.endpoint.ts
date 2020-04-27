import {LcuEndpoint} from "../model/lcu-endpoint";
import {ApiCallType} from "../model/api-call-type";

export class QueueAcceptEndpoint extends LcuEndpoint {
  apiCallType = ApiCallType.POST;
  endpointUri = '/lol-matchmaking/v1/ready-check/accept';
}




