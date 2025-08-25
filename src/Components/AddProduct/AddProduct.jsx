import React, { useState } from "react";
import axios from "axios";
import "./AddProduct.css";
import uploadpic from "../../assets/upload.svg";
import { useNavigate } from "react-router";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const [newImage, setNewImage] = useState(false);
  const [file, setFile] = useState("");

  const getFile = (e) => {
    const myFile = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(myFile);
    reader.onload = () => {
      setFile(reader.result);
    };
  };

  const upload = () => {
    if (file == "") {
      setUploadStatus("(🤳 select an image)");
    } else {
      setUploadStatus("(uploading)");
    }
    const url = "https://abdulmalikyinka.onrender.com/saveFile";
    const userData = { file };
    axios
      .post(url, userData)
      .then((response) => {
        setNewImage(response.data.image);
        setUploadStatus("(image added ✔)");
        console.log("image added");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const changeHandler = (e) => {
  //   setProductDetails({...productDetails,[e.target.name]:e.target.value})
  // }

  const addProduct = async () => {
    console.log(name, category);
    const url = "https://storeformalik.onrender.com/addProduct"
    // const url = "http://localhost:4000/addProduct";
    try {
      await axios
        .post(url, {
          name,
          newImage,
          oldPrice,
          newPrice,
          category,
          description,
        })
        .then((response) => {
          console.log(response.data);
          setMessage(response.data.message);
          if (response.data.message == "Product Added") {
            navigate("/addproduct");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-product">
      <div className="add-produc">
        <h1>{message}</h1>
        <div className="addproduct-itemfield">
          <p>Product title</p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            placeholder="type here"
          />
        </div>
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            value={oldPrice}
            onChange={(e) => setOldPrice(e.target.value)}
            type="text"
            name="oldPrice"
            placeholder="type here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            type="text"
            name="newPrice"
            placeholder="type here"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          name="category"
          className="add-product-selector"
          id=""
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
          <option value="gadgets">Gadgets</option>
          <option value="beauty">Beauty</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        {uploadStatus}
        {/* <label htmlFor="file-input"> */}
        <img
          src={uploadpic}
          onClick={upload}
          alt=""
          className="addproduct-thumbnail-img"
        />
        {/* </label> */}
        <input
          type="file"
          id="file-input"
          onChange={(e) => getFile(e)}
          hidde
          className="w-50"
        />
      </div>
      <div className="addproduct-itemfield">
        <p>Description</p>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          name="description"
          placeholder="type here"
        />
      </div>
      <button onClick={addProduct} className="addproduct-btn">
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
