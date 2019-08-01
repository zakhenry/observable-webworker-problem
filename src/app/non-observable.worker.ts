/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const response = `Hello from non-observable worker`;
  postMessage(response);
});
