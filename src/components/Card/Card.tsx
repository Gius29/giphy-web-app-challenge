import React, { PureComponent } from "react";
import { CardModel } from "./CardModel";

import styles from "./Card.module.scss";

interface StateProps {
  card: CardModel;
}

class Card extends PureComponent<StateProps> {
  render() {
    const { bitlyUrl, gifUrl, gifAlt } = this.props.card;

    return (
      <article className={styles.cardContainer}>
        <a href={bitlyUrl} target="_blank" rel="noreferrer noopener">
          <img src={gifUrl} alt={gifAlt} />
        </a>
      </article>
    );
  }
}

export default Card;
