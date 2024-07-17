import React from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom'
import addProduct from '../../assets/cart2.svg'
import listProduct from '../../assets/list-check.svg'

const Sidebar = () => {
  return (
    <div>
        <div className="sidebar">
            <Link to={'/addproduct'} style={{textDecoration:"none"}}>
                <div className="sidebar-item">
                    <img src={addProduct} alt="" />
                    <p>Add Product</p>
                </div>
            </Link>
            <Link to={'/listproduct'} style={{textDecoration:"none"}}>
                <div className="sidebar-item">
                    <img src={listProduct} alt="" />
                    <p>Product List</p>
                </div>
            </Link>
        </div>
    </div>
  )
}

export default Sidebar
