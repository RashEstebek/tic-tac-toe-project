export const QUERY_GAME_IND = "gameInd";

export function getGameInd() {
  const search = new URLSearchParams(window.location.search);

  const searchInd = search.get(QUERY_GAME_IND);
  const ind = searchInd ? Number(searchInd) : 0;

  return ind || 0;
}
