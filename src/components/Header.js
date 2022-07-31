import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <header header className="d-flex justify-between align-center p-40">
        <Link to='/'>
          <div className="d-flex align-center">
            <img className="logo" src="/img/logo.png" alt="logo" />
            <div>
              <h3 className="text-uppercase"> React Sneakers</h3>
              <p className="opacity-5"> Магазин лучших кроссовок</p>
            </div>
          </div>
        </Link>
      <ul className="d-flex">
        <li className="mr-30 d-flex align-center cu-p" onClick={props.onClickCart}>
          <img width={18} height={18} src="/img/cart.svg" alt="Корзина" />
          <span>1205 руб.</span>
        </li>
        <li className="mr-20 d-flex align-center cu-p">
          <Link to='/favourites'><img width={18} height={18} src="/img/heart.svg" alt="Закладки" /></Link>
        </li>
        <li className="d-flex align-center cu-p">
          <img width={18} height={18} src="/img/user.svg" alt="Пользователь" />
        </li>
      </ul>
    </header>
  );
}

export default Header;