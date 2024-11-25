import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import ProductCarousel from "./ProductCarousel";
import io from 'socket.io-client';
import './Productdetail.css'

const socket = io('http://localhost:3001'); // Initialize socket connection

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [msg, setMsg] = useState('');
  const [msgs, setMsgs] = useState([]);
  const [user, setUser] = useState(null);
  const { productId } = useParams(); // Destructure productId from params

  // Fetch product details
  useEffect(() => {
    const url = `http://localhost:3001/getproduct/${productId}`;
    axios.get(url)
      .then((res) => {
        if (res.data.product) {
          setProduct(res.data.product);
        }
      })
      .catch(() => {
        alert('Server Error: Unable to fetch product details.');
      });
  }, [productId]);

  // Handle incoming messages
  useEffect(() => {
    socket.emit('joinRoom', productId); // Join a specific room for the product

    socket.on('getMsg', (data) => {
      const filteredData = data.filter(item => item.productId === productId);
      setMsgs(filteredData);
    });

    // Clean up on component unmount
    return () => {
      socket.off('getMsg');
    };
  }, [productId]);

  // Handle sending a new message
  const handleSend = () => {
    if (msg.trim()) {
      const data = {
        username: localStorage.getItem('userName'),
        msg,
        productId
      };

      socket.emit('sendMsg', data); // Emit the message to the server
      setMsgs([...msgs, data]); // Update local state to reflect the new message
      setMsg(''); // Clear input field
    }
  };

  // Handle fetching contact details
  const handleContact = (addedBy) => {
    const url = `http://localhost:3001/getuser/${addedBy}`;
    axios.get(url)
      .then((res) => {
        if (res.data.user) {
          setUser(res.data.user);
        }
      })
      .catch(() => {
        alert("Server Error: Unable to fetch contact details.");
      });
  };

  return (
    <div>
      <Header />
      <h3 style={{ margin: "2%" }}>Product Details</h3>
      <div>
        {product && (
          <div className="d-flex justify-content-space-around flex-wrap" style={{ margin: "2%" }}>
            <div>
              <ProductCarousel images={[product.pimage, product.pimage2]} />
              <h4>Product Description</h4>
              <p>{product.pdesc}</p>
            </div>
            <div className="price-div" style={{ marginLeft: "5%" }}>
              <h3 className="m-2 price-text">Rs. {product.price} /-</h3>
              <h5 className="m-2">{product.pname} | {product.category}</h5>
              <br>
              </br>
              
              {product.addedBy && (
                <button
                  className="btn btn-success contact-btn"
                  onClick={() => handleContact(product.addedBy)}
                >
                  Show Contact Details
                </button>
              )}
              <br />
              <br />
              {user && (
                <div>
                  <h5><span>Name: </span>{user.username}</h5>
                  <h5><span>Mobile No: </span>{user.mobile}</h5>
                  <h5><span>Email: </span>{user.email}</h5>
                </div>
              )}
            </div>
            <div style={{ marginLeft: "5%",marginTop:"2px" }}>
              <h3>Chats</h3>
              {msgs && msgs.length > 0 ? (
                msgs.map((item, index) => (
                  <p
                    key={index}
                    style={{
                      color: "#fff",
                      margin: item.username === localStorage.getItem('userName') ? "0 100px 0 auto" : "0 auto 0 100px",
                      background: item.username === localStorage.getItem('userName') ? "#61dafb" : "#282c34",
                      borderRadius: "5px",
                      padding: "5px",
                    }}
                  >
                    {item.username}: {item.msg}
                  </p>
                ))
              ) : (
  
                <h5>No messages yet.</h5>
              )}
              <input
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                className="form-control"
                type="text"
                placeholder="Type a message..."
              />
              <button onClick={handleSend} className="btn btn-primary mt-2">SEND</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
