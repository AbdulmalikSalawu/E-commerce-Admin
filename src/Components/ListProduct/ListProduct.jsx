import React, { useEffect,useState } from 'react'
import './ListProduct.css'

const ListProduct = () => {

  const [allProducts,setAllProducts] = useState([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")

  const fetchData = async () => {
    const response = await fetch('https://storeformalik.onrender.com/getAllProducts', {
     method: 'GET',
      });
      const data = await response.json();
      setAllProducts(data.data)
  }

  useEffect(()=>{
    fetchData();
  },[])

  const deleteProduct = async (paramId,paramName) => {
    if(window.confirm(`are you deleting ${paramName}`)){
        await fetch("https://storeformalik.onrender.com/deleteProduct", {
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
    // Get unique categories for the dropdown
    const categories = ["all", ...Array.from(new Set(allProducts.map(p => p.category)))];

   // Filter products based on search query and category
    const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "all" || product.category === category)
  )

  return (
        <div className="list-product">
            <h1>All Products List</h1>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", margin: "1rem 0" }}>

          <input type="text" placeholder="Search by product name..." value={search} onChange={e => setSearch(e.target.value)} className="search-input" style={{ margin: "1rem 0", padding: "0.5rem", width: "50%",borderRadius: "20px",border: "1px solid gray" }}
          />
          <select value={category} onChange={e => setCategory(e.target.value)}      className="category-filter" style={{ padding: "0.5rem", borderRadius: "20px" }}
          >
            {categories.map(cat => (
                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
        </select>
        
      </div>
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
                {filteredProducts.map((product)=>{
                    return <>
                    <div key={product._id} className="listproduct-format-main listproduct-format">
                        <img src={product.newImage} alt="" className="listproduct-product-icon" />
                        <p key={product.name}>{product.name}</p>
                        <p>${product.oldPrice}</p>
                        <p>${product.newPrice}</p>
                        <p>{product.category}</p>
                        <p key={product._id} onClick={() => deleteProduct(product._id,product.name)} className='listproduct-remove-icon'>X</p>
                    </div>
                    <hr /></>
                })}
            </div>
        </div>
  )
}

export default ListProduct
