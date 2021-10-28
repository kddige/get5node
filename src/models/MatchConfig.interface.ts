export interface Spectators {
  players: string[];
}

export interface Team {
  name: string;
  tag: string;
  flag: string;
  logo: string;
  players: string[];
}

export interface CVars {
  [key: string]: string;
}

export interface MatchConfig {
  matchid: string;
  num_maps: number;
  players_per_team: number;
  min_players_to_ready: number;
  min_spectators_to_ready: number;
  skip_veto: boolean;
  veto_first: string;
  side_type: string;
  spectators: Spectators;
  maplist: string[];
  favored_percentage_team1: number;
  favored_percentage_text: string;
  team1: Team;
  team2: Team;
  cvars?: CVars;
}
