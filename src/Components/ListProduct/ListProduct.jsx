import React, { useEffect,useState } from 'react'
import './ListProduct.css'

const ListProduct = () => {

  const [allProducts,setAllProducts] = useState([])

  const fetchData = async () => {
    const response = await fetch('http://localhost:4000/getAllProducts', {
     method: 'GET',
      });
      const data = await response.json();
      setAllProducts(data.data)
  }

  useEffect(()=>{
    fetchData();
  },[])

  return (
    <div>
        <div className="list-product">
            <h1>All Products List</h1>
            <div className="listproduct-format-main">
              <p>Products</p>
              <p>Title</p>
              <p>Old Price</p>
              <p>New Price</p>
              <p>Category</p>
              <p>Demo</p>
            </div>
            <div className="listproduct-allproducts">
                <hr />
                {allProducts.map((product,index)=>{
                    return <div key={index} className="listproduct-format-main listproduct-format">
                        <img src={product.newImage} alt="" className="listproduct-product-icon" />
                        <p>{product.name}</p>
                        <p>${product.oldPrice}</p>
                        <p>${product.newPrice}</p>
                        <p>{product.category}</p>
                        {/* <img src="" className='removeProduct' alt="" /> */}
                    </div>
                })}
            </div>
        </div>
    </div>
  )
}

export default ListProduct
