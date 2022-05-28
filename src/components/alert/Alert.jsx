import { Portal, Show } from "solid-js/web";
import { alertMessage } from "../../services/alert";

import styles from './alert.module.css';

export function Alert() {
	return (
		<Portal>
			<Show when={alertMessage()}>
				<div className={styles.alertContainer}>
					<p className={styles.message}>{ alertMessage() }</p>
				</div>
			</Show>
		</Portal>
	);
}
