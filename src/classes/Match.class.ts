import { MatchConfigInterface } from "../interfaces";
import { validateRegex } from "../utils";
import { regex_STEAMID } from "../const";

export default class Match {
  private _config: MatchConfigInterface;

  constructor(config: MatchConfigInterface) {
    this._config = config;
  }

  get config(): MatchConfigInterface {
    return this._config;
  }

  updateConfig(config: Partial<MatchConfigInterface>) {
    this._config = { ...this._config, ...config };
  }

  addPlayer(steamID: string, team: "team1" | "team2" | "spectators"): void {
    if (!this.validateSteamID(steamID)) {
      throw new Error(MatchErrors.INVALID_STEAMID);
    }
    this._config[team].players.push(steamID);
  }

  removePlayer(steamID: string, team: "team1" | "team2" | "spectators"): void {
    if (!this.validateSteamID(steamID)) {
      throw new Error(MatchErrors.INVALID_STEAMID);
    }
    this._config[team].players = this._config[team].players.filter((player) => player !== steamID);
  }

  addMap(map: string): void {
    if (this.validateMap(map)) {
      throw new Error(MatchErrors.MAP_ALREADY_IN_LIST);
    }
    this._config.maplist.push(map);
  }

  removeMap(map: string): void {
    if (!this.validateMap(map)) {
      throw new Error(MatchErrors.MAP_NOT_IN_LIST);
    }
    this._config.maplist = this._config.maplist.filter((m) => m !== map);
  }

  private validateSteamID(steamID: string): boolean {
    return validateRegex(steamID, regex_STEAMID);
  }

  private validateMap(map: string): boolean {
    return this._config.maplist.includes(map);
  }
}

export enum MatchErrors {
  INVALID_STEAMID = "Invalid SteamID",
  MAP_ALREADY_IN_LIST = "Map is already in list",
  MAP_NOT_IN_LIST = "Map is not in list",
}
