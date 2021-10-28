import { MatchConfigInterface } from "../models";
import { validateRegex } from "../utils";
import { Get5MatchErrors } from "../types";
import { RegexValidators } from "./RegexValidators.class";

export class Get5Match {
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
      throw new Error(Get5MatchErrors.INVALID_STEAMID);
    }
    this._config[team].players.push(steamID);
  }

  removePlayer(steamID: string, team: "team1" | "team2" | "spectators"): void {
    if (!this.validateSteamID(steamID)) {
      throw new Error(Get5MatchErrors.INVALID_STEAMID);
    }
    this._config[team].players = this._config[team].players.filter((player) => player !== steamID);
  }

  addMap(map: string): void {
    if (this.validateMap(map)) {
      throw new Error(Get5MatchErrors.MAP_ALREADY_IN_LIST);
    }
    this._config.maplist.push(map);
  }

  removeMap(map: string): void {
    if (!this.validateMap(map)) {
      throw new Error(Get5MatchErrors.MAP_NOT_IN_LIST);
    }
    this._config.maplist = this._config.maplist.filter((m) => m !== map);
  }

  private validateSteamID(steamID: string): boolean {
    return validateRegex(steamID, RegexValidators.STEAM_ID);
  }

  private validateMap(map: string): boolean {
    return this._config.maplist.includes(map);
  }
}
