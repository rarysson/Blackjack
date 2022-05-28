import { createSignal } from "solid-js";

const [alertMessage, setAlertMessage] = createSignal('');

export {
  alertMessage,
  setAlertMessage
}
