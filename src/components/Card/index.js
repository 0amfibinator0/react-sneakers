import React from 'react'
import styles from './Card.module.scss'

function Card({ id, title, imageUrl, price, onFavourite, onPlus, favourited = false }) {
  const [isAdded, setIsAdded] = React.useState(false)
  const [isFavourite, setIsFavourite] = React.useState(favourited)
  
  const onClickPlus = () => {
    onPlus({title, imageUrl, price});
    setIsAdded(!isAdded);
  };
  const onClickFavourite = () => {
    onFavourite({id, title, imageUrl, price});
    setIsFavourite(!isFavourite);
  }

  React.useEffect(() => {
  }, [isAdded]);

  return (
    <div className={styles.card}>
      <div className={styles.favourite} onClick={onClickFavourite}>
        <img src={isFavourite ? "/img/liked.svg" : "/img/unliked.svg"} alt="Like" />
      </div>
      <img className="sneakers-img" src={imageUrl} alt="sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <img className={styles.plus} onClick={onClickPlus} src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt="Plus" />
      </div>
    </div>
  );
}

export default Card;