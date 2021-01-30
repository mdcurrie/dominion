export function logMessage({ message, logIds }) {
  return {
    type: "ADD_LOG",
    message,
    logIds
  };
}
