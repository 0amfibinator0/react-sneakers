import Card from '../components/Card';

function Home({items, cartItems, searchValue, setSearchValue, onChangeSearchInput, onAddToFavourite, onAddToCart}) {
  
  const renderItems = () => {
    
    return items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((item, index) => (
      <Card
        key={index}
        onFavourite={(obj) => onAddToFavourite(obj)}
        onPlus={(obj) => onAddToCart(obj)}
        added={cartItems.some(obj => Number(obj.id) === Number(item.id))}
        loading={false}
        {...item}
      />
    ))
  }

  return(
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" />
          {searchValue && <img onClick={() => setSearchValue('')} className="clear cu-p" src="/img/btn-remove.svg" alt="clear" />}
          <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
        </div>
      </div>
      <div className="d-flex flex-wrap">
        {renderItems()}
      </div>
    </div>
  )
}

export default Home;