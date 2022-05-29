import { For } from "solid-js";
import { Card } from "../card/Card";

import styles from "./cardsHolder.module.css";

export function CardsHolder(props) {
  return (
    <section classList={{[styles.section]: true, [props.className]: true}}>
      <h1 className={styles.title}>{props.title}</h1>

      <div className={styles.cardsContainer}>
        <For each={props.cards}>{(card) =>
          <Card card={card} />
        }</For>
      </div>
    </section>
  );
}
