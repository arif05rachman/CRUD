import React, {useState, useEffect} from "react";
import { Form, Button, Card } from "react-bootstrap";
import Swal from 'sweetalert2'

export default () => {
  let [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
    date: ""
  })
  const handleChange = (e) => {
    let change = {...product}
    change[e.target.id] = e.target.value
    setProduct(change)
  }
  
  const handleAdd = async (e) => {
    e.preventDefault()
    const responseRaw = await fetch("http://localhost:3000/product", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    const response = await responseRaw.json()
    if (response.id) {
      console.log(response)
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Product Added",
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
   };
  
  useEffect(() => {
    console.log(product)
    console.log();
  }, [product])
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
          <Button variant="primary" type="submit" onClick={handleAdd}>
            Submit
          </Button>
        </Form>
      </Card>
    </div>
  );
};
