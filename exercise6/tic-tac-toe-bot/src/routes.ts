import Tournament from "./model/Tournament.ts";
import { Route, Router as _Router } from "./router";
import TournamentIntro from "./views/pages/TournamentIntro";
import GameIntro from "./views/pages/GameIntro";
import Playboard from "./views/pages/Playboard";
import GameResult from "./views/pages/GameResult";
import TournamentResult from "./views/pages/TournamentResult";

export type PathName =
  | "/404"
  | "/"
  | "/game"
  | "/round"
  | "/game/result"
  | "/result";

export type Routes = Route<PathName>[];

export type Router = _Router<PathName>;

export function newRouter(tournament: Tournament): Router {
  const routes: Routes = [
    {
      path: "/",
      page: new TournamentIntro(tournament),
    },
    {
      path: "/game",
      page: new GameIntro(tournament),
    },
    {
      path: "/round",
      page: new Playboard(tournament),
    },
    {
      path: "/game/result",
      page: new GameResult(tournament),
    },
    {
      path: "/result",
      page: new TournamentResult(tournament),
    },
  ];

  return new _Router(routes);
}
