export const QUERY_ROUND_IND = "roundInd";

export function getRoundInd() {
  const search = new URLSearchParams(window.location.search);

  const searchInd = search.get(QUERY_ROUND_IND);
  const ind = searchInd ? Number(searchInd) : 0;

  return ind || 0;
}
