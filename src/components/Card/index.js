import React from 'react';
import ContentLoader from "react-content-loader";
import styles from './Card.module.scss'

function Card({ id, title, imageUrl, price, onFavourite, onPlus, favourited = false, added = false, loading = false }) {
  // console.log('added', added);
  // console.log('isAdded', isAdded);
  const [isAdded, setIsAdded] = React.useState(added)
  const [isFavourite, setIsFavourite] = React.useState(favourited)
  React.useEffect(() => {
    
  }, [])

  const onClickPlus = () => {
    onPlus({ id, title, imageUrl, price});
    setIsAdded(!isAdded);
  };
  const onClickFavourite = () => {
    onFavourite({id, title, imageUrl, price});
    setIsFavourite(!isFavourite);
  }

  return (
    <div className={styles.card}>
      {
        loading ? (
          <ContentLoader 
            speed={2}
            width={155}
            height={225}
            viewBox="0 0 155 210"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb">
            <rect x="0" y="0" rx="10" ry="10" width="155" height="90" /> 
            <rect x="0" y="98" rx="5" ry="5" width="155" height="15" /> 
            <rect x="0" y="122" rx="5" ry="5" width="100" height="15" /> 
            <rect x="0" y="166" rx="5" ry="5" width="80" height="25" /> 
            <rect x="124" y="162" rx="10" ry="10" width="32" height="32" />
          </ContentLoader>
        ) : (
          <>
            <div className={styles.favourite} onClick={onClickFavourite}>
              <img src={isFavourite ? "/img/liked.svg" : "/img/unliked.svg"} alt="Like" />
            </div>
            <img width={133} height={112} src={imageUrl} alt="sneakers" />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Цена:</span>
                <b>{price} руб.</b>
              </div>
              <img className={styles.plus} onClick={onClickPlus} src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt="Plus" />
            </div>
          </>
        )
      }

    </div>
  );
}

export default Card;