import { useState, useEffect } from "react";
import styles from './Waiter.module.css'

import ProductCard from "../../components/ProductCard/ProductCard";
import Order from "../../components/Order/Order";

function WaiterView() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const accessToken = localStorage.getItem('accessToken')

  useEffect(() => {
    fetch('http://localhost:8080/products', {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    })
      .then(res => res.json())
      .then(json => {
        setProducts(json)
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }, [])

  const [orderedProducts, setOrderedProducts] = useState([1,2, 3, 4])

  return (
    loading ? <h3>Cargando...</h3> :

      <div>
        <h1>Mesera</h1>

        <div className={styles.container}>
          <div className={styles.productsContainer}>
            {
              products.map((product) => {
                return (
                  <ProductCard
                    key={product.id}
                    img={product.image}
                    name={product.name}
                    price={product.price} />
                )
              })
            }
          </div>
          <Order orderedProducts={orderedProducts}/>
        </div>
      </div>
  )
};

export default WaiterView;