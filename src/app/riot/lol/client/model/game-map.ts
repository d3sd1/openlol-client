export class GameMap {
  assets: object; //TODO: validate this
  categorizedContentBundles: object; //TODO: validate this
  description: string;
  gameMode: string;
  gameModeName: string;
  gameModeShortName: string;
  gameMutator: string;
  id: number; //TODO: validate this field
  isRGM: boolean; //TODO: validate this field
  mapStringId: string; // LEGAL VALUES -> TODO, known TFT
  name: string;  // LEGAL VALUES -> TODO, known Teamfight Tactics
  platformId: string;
  platformName: string;
  properties: object; //TODO: validate this
}
