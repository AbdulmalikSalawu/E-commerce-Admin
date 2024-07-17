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

  const deleteUser = async (paramId,paramName) => {
    if(window.confirm(`are you deleting ${paramName}`)){
        await fetch("http://localhost:4000/deleteUser", {
              method: "POST",
              crossDomain: true,
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                uniqueid:paramId,
              }),
            })
            .then((res)=>res.json())
            .then((data)=> {
                alert(data.data)
                fetchData()
              })}
    }

  return (
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
                {allProducts.map((product)=>{
                    return <>
                    <div key={product._id} className="listproduct-format-main listproduct-format">
                        <img src={product.newImage} alt="" className="listproduct-product-icon" />
                        <p key={product.name}>{product.name}</p>
                        <p>${product.oldPrice}</p>
                        <p>${product.newPrice}</p>
                        <p>{product.category}</p>
                        <p key={product._id} onClick={() => deleteUser(product._id,product.name)} className='listproduct-remove-icon'>X</p>
                    </div>
                    <hr /></>
                })}
            </div>
        </div>
  )
}

export default ListProduct
