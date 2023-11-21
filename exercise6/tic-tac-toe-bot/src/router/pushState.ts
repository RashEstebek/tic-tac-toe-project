const pushState = (...args: Parameters<typeof window.history.pushState>) => {
  window.history.pushState(...args);
  const pushChangeEvent = new CustomEvent("pushstate");
  window.dispatchEvent(pushChangeEvent);
};

export default pushState;
