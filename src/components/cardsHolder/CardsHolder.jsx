import { createMemo, For } from "solid-js";
import { Card } from "../card/Card";

import styles from "./cardsHolder.module.css";

export function CardsHolder(props) {
  const points = createMemo(() => {
    const existSpecialCard = props.cards.some(
      card => ["JACK", "QUEEN", "KING"].includes(card.value)
    );

    return props.cards.reduce((acc, card) => {
      let value = 0;

      if (card.value === "ACE") {
        value = existSpecialCard ? 11 : 1;
      } else if (["JACK", "QUEEN", "KING"].includes(card.value)) {
        value = 10;
      } else {
        value = parseInt(card.value, 10);
      }

      return acc + value;
    }, 0);
  });

  return (
    <section classList={{
      [styles.section]: true,
      [props.className]: props.className,
      [styles.sectionWithTitleOnBottom]: props.titleOnBottom
    }}>
      <h1 className={styles.title}>
        {props.title} - <span style="color: crimson;">{points()}</span>
      </h1>

      <div className={styles.cardsContainer}>
        <For each={props.cards}>{(card) =>
          <Card card={card} />
        }</For>
      </div>
    </section>
  );
}
