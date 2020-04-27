export class SessionInfo {
  accountId: bigint;
  connected: boolean;
  error: string;
  gasToken: string;
  idToken: string;
  isInLoginQueue: boolean;
  isNewPlayer: boolean;
  puuid: string;
  state: string; //TODO: found states: SUCCEEDED
  summonerId: bigint;
  userAuthToken: string; //TODO: subdecode
  username: string;
}
