export class GameQueue {
  allowablePremadeSizes: []; //TODO: validate this field
  areFreeChampionsAllowed: boolean;
  assetMutator: string;
  category: string;
  championsRequiredToPlay: number;
  description: string;
  detailedDescription: string;
  gameMode: string;
  gameTypeConfig: object; //TODO: validate this
  id: number;
  isRanked: boolean;
  isTeamBuilderManaged: boolean;
  isTeamOnly: boolean;
  lastToggledOffTime: bigint;
  lastToggledOnTime: bigint;
  mapId: number;
  maxLevel: number;
  maxSummonerLevelForFirstWinOfTheDay: number;
  maximumParticipantListSize: number;
  minLevel: number;
  minimumParticipantListSize: number;
  name: string;
  numPlayersPerTeam: number;
  queueAvailability: string;
  queueRewards: object; //TODO validate this
  removalFromGameAllowed: boolean;
  removalFromGameDelayMinutes: number;
  shortName: string;
  showPositionSelector: boolean;
  spectatorEnabled: boolean;
  type: string;
}
