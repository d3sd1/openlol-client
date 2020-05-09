import {LcuEndpoint} from "../model/lcu-endpoint";
import {ApiCallType} from "../model/api-call-type";

export class ChampSelectSessionEndpoint extends LcuEndpoint {
  apiCallType = ApiCallType.GET;
  endpointUri = '/lol-champ-select/v1/session';
}
