import { Get5Match } from "../../src/classes";
import { Get5MatchErrors } from "../../src/types";

const match = new Get5Match({
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
const validSteamId2 = "STEAM_0:1:000000000";
const validSteamId3 = "[U:1:1046278249]";
const validSteamId64 = "76561199006543977"

it("should create a MatchConfig", () => {
  expect(match).toBeInstanceOf(Get5Match);
});

it("should add a player when adding valid Steam 2 ID", () => {
  match.addPlayer(validSteamId2, "team1");
  expect(match.config.team1.players).toContain(validSteamId2);
});

it("should add a player when adding valid Steam 3 ID", () => {
  expect(() => {
    match.addPlayer(validSteamId3, "team1");
  }).not.toThrowError(Get5MatchErrors.INVALID_STEAMID);
});

it("should add a player when adding valid Steam 64 ID", () => {
  expect(() => {
    match.addPlayer(validSteamId64, "team1");
  }).not.toThrowError(Get5MatchErrors.INVALID_STEAMID);
});

it("should remove a player when removing valid steam id", () => {
  match.removePlayer(validSteamId2, "team1");
  expect(match.config.team1.players).not.toContain(validSteamId2);
});

it("should add a map when adding any map to maplist", () => {
  match.addMap("de_dust2");
  expect(match.config.maplist).toContain("de_dust2");
});

it("should throw error when adding existing map to maplist", () => {
  expect(() => {
    match.addMap("de_dust2");
  }).toThrowError(Get5MatchErrors.MAP_ALREADY_IN_LIST);
});

it("should remove a map when removing any map from maplist", () => {
  match.removeMap("de_dust2");
  expect(match.config.maplist).not.toContain("de_dust2");
});

it("should throw error when removing non existing map from maplist", () => {
  expect(() => {
    match.removeMap("de_dust2");
  }).toThrowError(Get5MatchErrors.MAP_NOT_IN_LIST);
});
