import React from 'react'
import AppContext from '../context';

const Info = ({ title, image, description }) => {
    const { setCartOpened } = React.useContext(AppContext)

    return (
        <div className="cartEmpty d-flex flex-column flex align-center justify-center">
            <img width='120px' src={image} alt="пустая корзина" className="mb-20" />
            <h2>{title}</h2>
            <p className="opacity-6">{description}</p>
            <button onClick={() => setCartOpened(false)} className="greenButton">
                <img src="/img/arrow.svg" alt="Arrow" />
                Вернуться назад
            </button>
        </div>
    )
}

export default Info;