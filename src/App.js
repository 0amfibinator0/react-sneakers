import React from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import AppContext from './context';

import Home from './pages/Home';
import Favourites from './pages/Favourites';
import Orders from './pages/Orders';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favourites, setFavourites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favouritesResponse, itemsResponse] = await Promise.all([
          axios.get('https://62e16e35fa99731d75d66e03.mockapi.io/cart'),
          axios.get('https://62e16e35fa99731d75d66e03.mockapi.io/favourites '),
          axios.get('https://62e16e35fa99731d75d66e03.mockapi.io/items')
        ])

        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavourites(favouritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert('Ошибка при запросе данных ;(')
        console.error(error)
      }
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id))
      if (findItem) {
        setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)))
        await axios.delete(`https://62e16e35fa99731d75d66e03.mockapi.io/cart/${findItem.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);
        const {data} = await axios.post('https://62e16e35fa99731d75d66e03.mockapi.io/cart', obj);
        setCartItems((prev) => prev.map(item => {
          if (item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id
            };
          }
          return item;
        }));
      }
    } catch (error) {
      alert('Ошибка при добалении в козрину ;(')
      console.error(error)
    }
  }

  const onRemoveItem = async (id) => {
    try {
      await axios.delete(`https://62e16e35fa99731d75d66e03.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(id)));
    } catch (error) {
      alert('Ошибка при удалении товара из корзины')
      console.error(error)
    }
  }

  const onAddToFavourite = async (obj) => {
    try {
      if (favourites.find(favObj => Number(favObj.id) === Number(obj.id))) {
        await axios.delete(`https://62e16e35fa99731d75d66e03.mockapi.io/favourites/${obj.id}`);
        setFavourites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
      } else {
        const { data } = await axios.post('https://62e16e35fa99731d75d66e03.mockapi.io/favourites', obj);
        setFavourites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты')
      console.error(error)
    }
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  const isItemAdded = (id) => {
    return cartItems.some( obj => Number(obj.parentId) === Number(id))
  }

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favourites,
        isItemAdded,
        onAddToFavourite,
        onAddToCart,
        setCartOpened,
        setCartItems
      }}>
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />
        <Header onClickCart={() => setCartOpened(true)}/>

        <Routes>
          <Route path="/" exact element={
            <Home 
              items={items}
              cartItems={cartItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavourite={onAddToFavourite}
              onAddToCart={onAddToCart}
              isLoading={isLoading}
            />
          }/>

          <Route path="/favourites" exact element={
            <Favourites/>
          }/>

          <Route path="/orders" exact element={
            <Orders/>
          }/>

        </Routes>
      </div>
    </AppContext.Provider>
  )
}

export default App;