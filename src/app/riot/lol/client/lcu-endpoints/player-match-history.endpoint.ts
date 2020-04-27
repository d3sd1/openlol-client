import {LcuEndpoint} from "../model/lcu-endpoint";
import {ApiCallType} from "../model/api-call-type";

export class PlayerMatchHistoryEndpoint extends LcuEndpoint {
  apiCallType = ApiCallType.GET;
  endpointUri = '/lol-acs/v2/matchlists?accountId=42751156'; //TODO: match accountid to current sess
}
