export function showAlert(title, message, type, callback) {
  alert(`${title}: ${message}`);
  if (callback) callback();
}
export function showLoader(text) {
  console.log("Loading:", text);
}
export function hideLoader() {
  console.log("Loading complete");
}
