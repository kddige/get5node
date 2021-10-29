import { MatchConfigInterface } from "../models";
import { validateRegex } from "../utils";
import { Get5MatchErrors } from "../types";
import { RegexValidators } from "./RegexValidators.class";

export class Get5Match {
  private _config: MatchConfigInterface;

  constructor(config: MatchConfigInterface) {
    this._config = config;
  }

  /**
   * Gets the config object
   * @returns {MatchConfigInterface}
   */
  get config(): MatchConfigInterface {
    return this._config;
  }

  /**
   * Updates the config object with new values, overwirtes old values
   * @param {Partial<MatchConfigInterface>} config
   * @returns {void}
   */
  updateConfig(config: Partial<MatchConfigInterface>) {
    this._config = { ...this._config, ...config };
  }

  /**
   * Adds a player by either steamID, steamID3 or steamID64 to the config object
   * @param {string} steamId
   * @param {string} team
   * @returns {void}
   * @throws {Get5MatchErrors.INVALID_STEAMID}
   */
  addPlayer(steamID: string, team: "team1" | "team2" | "spectators"): void {
    if (!this.validateSteamID(steamID)) {
      throw new Error(Get5MatchErrors.INVALID_STEAMID);
    }
    this._config[team].players.push(steamID);
  }

  /**
   * Removes a player by either steamID, steamID3 or steamID64 from the config object
   * @param {string} steamId
   * @param {string} team
   * @returns {void}
   */
  removePlayer(steamID: string, team: "team1" | "team2" | "spectators"): void {
    if (!this.validateSteamID(steamID)) {
      throw new Error(Get5MatchErrors.INVALID_STEAMID);
    }
    this._config[team].players = this._config[team].players.filter((player) => player !== steamID);
  }

  /**
   * Adds a map to the config object
   * @param {string} map
   * @returns {void}
   * @throws {Get5MatchErrors.MAP_ALREADY_IN_LIST}
   */
  addMap(map: string): void {
    if (this.validateMap(map)) {
      throw new Error(Get5MatchErrors.MAP_ALREADY_IN_LIST);
    }
    this._config.maplist.push(map);
  }

  /**
   * Removes a map from the config object
   * @param {string} map
   * @returns {void}
   * @throws {Get5MatchErrors.MAP_NOT_IN_LIST}
   */
  removeMap(map: string): void {
    if (!this.validateMap(map)) {
      throw new Error(Get5MatchErrors.MAP_NOT_IN_LIST);
    }
    this._config.maplist = this._config.maplist.filter((m) => m !== map);
  }

  private validateSteamID(steamID: string): boolean {
    return RegexValidators.isSteamID(steamID);
  }

  private validateMap(map: string): boolean {
    return this._config.maplist.includes(map);
  }
}
