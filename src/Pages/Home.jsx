import React, { useState, useEffect } from "react";
import {useHistory} from 'react-router-dom'
import { Table, Card, Button } from "react-bootstrap";
import Swal from "sweetalert2";
export default () => {
  const history = useHistory()
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const responseRaw = await fetch("http://localhost:3000/product", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const response = await responseRaw.json();
      console.log(response);
      setProducts(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
    console.log(products);
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const responseRaw = await fetch("http://localhost:3000/product/" + id, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        const response = await responseRaw.json();
        getProducts();
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <div>
      <Card className="d-flex justify-content-center my-3 mx-2">
        <div className="p-4">
          <h3 className="text-center">List Product</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products
                ? products.map((value, idx) => {
                    return (
                      <tr key={value.id}>
                        <td>{idx + 1}</td>
                        <td>{value.name}</td>
                        <td>{value.price}</td>
                        <td>{value.stock}</td>
                        <td>{value.date}</td>
                        <td className="d-flex justify-content-center align-item-center">
                          <Button size="sm" variant="primary" className="mr-1" onClick={()=>{history.push('update/'+value.id)}}>
                            Update
                          </Button>
                          <Button
                            size="sm"
                            variant="info"
                            className="mr-1"
                            onClick={() => handleDelete(value.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                : " No data "}
            </tbody>
          </Table>
        </div>
      </Card>
    </div>
  );
};
