// Example IDs:
// Steam 2 ID: STEAM_0:1:523139124
// Steam 3 ID: [U:1:1046278249]
// Steam 64 ID: 76561199006543977



export class RegexValidators {
  // Steam ID 2 regex
  static STEAM_2_ID = /^STEAM_0:[01]:\d{1,10}$/;
  // Steam ID 3 regex
  static STEAM_3_ID = /^\[U:1:\d{1,10}\]$/;
  // Steam ID 64 regex
  static STEAM_64_ID = /^\d{17,19}$/;


  static isSteam2ID(steamID: string): boolean {
    return RegexValidators.STEAM_2_ID.test(steamID);
  }

  static isSteam3ID(steamID: string): boolean {
    return RegexValidators.STEAM_3_ID.test(steamID);
  }

  static isSteam64ID(steamID: string): boolean {
    return RegexValidators.STEAM_64_ID.test(steamID);
  }

  static isSteamID(steamID: string): boolean {
    return RegexValidators.isSteam2ID(steamID) || RegexValidators.isSteam3ID(steamID) || RegexValidators.isSteam64ID(steamID);
  }
}
