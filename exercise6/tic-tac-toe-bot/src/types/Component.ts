interface Component {
  abortCtrl?: AbortController;

  render(props?: object): Promise<HTMLElement>;

  cleanup?(): Promise<void>;
}

export default Component;
