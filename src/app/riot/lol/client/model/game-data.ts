import {GameQueue} from "./game-queue";

export class GameData {
  gameId: number;
  gameName: string;
  isCustomGame: boolean;
  password: string;
  playerChampionSelections: []; //TODO: validate this field
  queue: GameQueue;
  spectatorsAllowed: boolean;
  teamOne: []; //TODO: VALIDATE THIS FGIELD
  teamTwo: []; //TODO: VALIDATE THIS FGIELD
}
