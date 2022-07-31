import React from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favourites from './pages/Favourites';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favourites, setFavourites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    axios.get('https://62e16e35fa99731d75d66e03.mockapi.io/items')
      .then((res) => {
        setItems(res.data);
      });
    axios.get('https://62e16e35fa99731d75d66e03.mockapi.io/cart')
      .then((res) => {
        setCartItems(res.data);
      });
    axios.get('https://62e16e35fa99731d75d66e03.mockapi.io/favourites')
      .then((res) => {
        setFavourites(res.data);
      });
    }, []);

  const onAddToCart = (obj) => {
    axios.post('https://62e16e35fa99731d75d66e03.mockapi.io/cart', obj);
    setCartItems((prev) => [...prev, obj]);
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://62e16e35fa99731d75d66e03.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter(item => item.id !== id));
  }

  const onAddToFavorite = (obj) => {
    axios.post('https://62e16e35fa99731d75d66e03.mockapi.io/favourites', obj);
    setFavourites((prev) => [...prev, obj]);
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  return <div className="wrapper clear">
    {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />}
    <Header onClickCart={() => setCartOpened(true)}/>

    <Routes>
      <Route path="/" element={<Home 
        items={items}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onChangeSearchInput={onChangeSearchInput}
        onAddToFavorite={onAddToFavorite}
        onAddToCart={onAddToCart}
      />}/>
      <Route path="/favourites" element={<Favourites
        items={favourites}
      />}/>
    </Routes>

    
  </div>
}

export default App;