import {GameClient} from "./game-client";
import {GameData} from "./game-data";
import {GameDodge} from "./game-dodge";
import {GameMap} from "./game-map";

export class FlowStatus {
  gameClient: GameClient;
  gameData: GameData;
  gameDodge: GameDodge;
  map: GameMap;
  phase: string; // LEGAL VALUES: Lobby
  isReadyToAcceptMatch: boolean;
  isInQueue: boolean;
  isInLobby: boolean;

  constructor(gameClient: GameClient, gameData: GameData, gameDodge: GameDodge, map: GameMap, phase: string) {
    this.gameClient = gameClient;
    this.gameData = gameData;
    this.gameDodge = gameDodge;
    this.map = map;
    this.phase = phase;

    // Formatted values
    this.isReadyToAcceptMatch = this.phase.toLowerCase() === 'readycheck';
    this.isInQueue = this.phase.toLowerCase() === 'matchmaking';
    this.isInLobby = this.phase.toLowerCase() === 'lobby';
  }

}
