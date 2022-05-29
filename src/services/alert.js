import { createSignal } from "solid-js";

const [alertMessage, setAlertMessage] = createSignal('');

function showAlertMessage(message) {
  setAlertMessage(message);

  setTimeout(() => {
    setAlertMessage("");
  }, 3000);
}

export {
  alertMessage,
  showAlertMessage
}
