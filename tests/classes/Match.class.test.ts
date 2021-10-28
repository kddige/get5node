import Match, { MatchErrors } from "../../src/classes/Match.class";
("../../src/classes/MatchConfig.class");

const match = new Match({
  matchid: "test",
  maplist: [],
  num_maps: 1,
  cvars: {
    sv_alltalk: "0",
  },
  team1: {
    flag: "",
    players: [],
    logo: "",
    name: "Team 1",
    tag: "",
  },
  team2: {
    flag: "",
    players: [],
    logo: "",
    name: "Team 2",
    tag: "",
  },
  favored_percentage_team1: 50,
  favored_percentage_text: "50%",
  min_players_to_ready: 2,
  min_spectators_to_ready: 0,
  players_per_team: 5,
  side_type: "balanced",
  skip_veto: false,
  spectators: {
    players: [""],
  },
  veto_first: "",
});
const validSteamId = "STEAM_0:1:523139124";

it("should create a MatchConfig", () => {
  expect(match).toBeInstanceOf(Match);
});

it("should throw error when adding invalid steam id", () => {
  expect(() => {
    match.addPlayer("STEAM:1:12321", "team1");
  }).toThrowError(MatchErrors.INVALID_STEAMID);
});

it("should add a player when adding valid steam id", () => {
  match.addPlayer(validSteamId, "team1");
  expect(match.config.team1.players).toContain(validSteamId);
});

it("should remove a player when removing valid steam id", () => {
  match.removePlayer(validSteamId, "team1");
  expect(match.config.team1.players).not.toContain(validSteamId);
});

it("should add a map when adding any map to maplist", () => {
  match.addMap("de_dust2");
  expect(match.config.maplist).toContain("de_dust2");
});

it("should throw error when adding existing map to maplist", () => {
  expect(() => {
    match.addMap("de_dust2");
  }).toThrowError(MatchErrors.MAP_ALREADY_IN_LIST);
});

it("should remove a map when removing any map from maplist", () => {
  match.removeMap("de_dust2");
  expect(match.config.maplist).not.toContain("de_dust2");
});

it("should throw error when removing non existing map from maplist", () => {
  expect(() => {
    match.removeMap("de_dust2");
  }).toThrowError(MatchErrors.MAP_NOT_IN_LIST);
});

it("fake test", () => {
  expect(true).toBe(false);
});
