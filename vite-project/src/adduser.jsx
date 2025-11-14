import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Snackbar,
  Alert,
  Box
} from "@mui/material";

export default function Adduser() {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: ""
  });

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:3000/products`, product)
      .then(() => {
        setOpen(true);
        setProduct({ title: "", price: "", category: "" });

        setTimeout(() => {
          navigate("/");
        }, 1200);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <>

      {/* Background Section */}
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 3
        }}
      >

        {/* Glass Card */}
        <Card
          sx={{
            width: 420,
            padding: 2,
            borderRadius: 4,
            boxShadow: "0px 8px 20px rgba(0,0,0,0.3)",
            background: "rgba(255,255,255,0.2)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.3)"
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              align="center"
              sx={{ color: "white", fontWeight: "bold", mb: 2 }}
            >
              Add New Product
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Title"
                variant="filled"
                sx={{ mb: 2, background: "white", borderRadius: 1 }}
                value={product.title}
                onChange={(e) =>
                  setProduct({ ...product, title: e.target.value })
                }
              />

              <TextField
                fullWidth
                label="Price"
                variant="filled"
                sx={{ mb: 2, background: "white", borderRadius: 1 }}
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
              />

              <TextField
                fullWidth
                label="Category"
                variant="filled"
                sx={{ mb: 2, background: "white", borderRadius: 1 }}
                value={product.category}
                onChange={(e) =>
                  setProduct({ ...product, category: e.target.value })
                }
              />

              <Button
                variant="contained"
                fullWidth
                type="submit"
                sx={{
                  mt: 1,
                  py: 1.5,
                  background: "linear-gradient(45deg, #ff512f, #dd2476)",
                  fontWeight: "bold",
                  fontSize: "16px",
                  borderRadius: 3,
                  "&:hover": {
                    background: "linear-gradient(45deg, #dd2476, #ff512f)"
                  }
                }}
              >
                Add Product
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={open}
        autoHideDuration={1500}
        onClose={() => setOpen(false)}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{ background: "#4caf50", fontSize: "16px" }}
        >
          Product added successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
