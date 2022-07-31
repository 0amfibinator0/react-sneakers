import Card from '../components/Card';

function Favourites({items}) {
  return(
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Мои закладки</h1>
      </div>

      <div className="d-flex flex-wrap">
        {items.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            price={item.price}
            imageUrl={item.imageUrl}
            favourited={true}
          />
        ))}
      </div>
    </div>
  )
}

export default Favourites;