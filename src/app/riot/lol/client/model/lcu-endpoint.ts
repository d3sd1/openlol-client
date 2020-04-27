import {ApiCallType} from "./api-call-type";

export abstract class LcuEndpoint {
  abstract apiCallType: ApiCallType;
  abstract endpointUri: string;
}
