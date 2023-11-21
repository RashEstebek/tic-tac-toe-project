import Tournament from "../model/Tournament.ts";
import Component from "../types/Component.ts";

interface Page extends Component {
  readonly tournament: Tournament;
}

export default Page;
