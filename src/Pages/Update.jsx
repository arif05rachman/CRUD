import React, { useState, useEffect } from "react";
import {useParams, useHistory} from 'react-router-dom'
import { Form, Button, Card } from "react-bootstrap";
import Swal from "sweetalert2";

export default () => {
  const { id } = useParams();
  const history = useHistory()
  let [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
    date: "",
  });
  const handleChange = (e) => {
    let change = { ...product };
    change[e.target.id] = e.target.value;
    setProduct(change);
  };

  const handleUpdate = async (e) => {
    e.preventDefault()
    const responseRaw = await fetch("http://localhost:3000/product/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    const response = await responseRaw.json();
    if (response) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Product updated",
          timer: 1500,
        });
      history.push('/')
    }
  };
  const getProduct = async () => {
    const responseRaw = await fetch("http://localhost:3000/product/" + id, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
    const response = await responseRaw.json();
    setProduct(response)
  }
  useEffect(() => {
    getProduct()
  }, []);
  return (
    <div className="d-flex justify-content-center mt-4">
      <Card className="w-50 border p-4">
        <h3 className="d-flex justify-content-center">Add Product</h3>
        <Form className="p-4">
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Product Name"
              id="name"
              value={product.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Product Price"
              id="price"
              value={product.price}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Product Stock"
              id="stock"
              value={product.stock}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="date"
              id="date"
              value={product.date}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleUpdate}>
            Submit
          </Button>
        </Form>
      </Card>
    </div>
  );
};
