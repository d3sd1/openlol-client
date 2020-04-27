import {GameClient} from "./game-client";
import {GameData} from "./game-data";
import {GameDodge} from "./game-dodge";
import {GameMap} from "./game-map";

export class FlowStatus {
  gameClient: GameClient;
  gameData: GameData;
  gameDodge: GameDodge;
  map: GameMap;
  phase: string = ''; // LEGAL VALUES: Lobby
  isReadyToAcceptMatch: boolean;
  isInQueue: boolean;
  isInLobby: boolean;

}
