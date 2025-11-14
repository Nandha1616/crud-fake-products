import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  Snackbar,
  Alert
} from "@mui/material";

export default function Update() {
  const [update, setUpdate] = useState({
    title: "",
    price: "",
    category: ""
  });

  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/products/${id}`).then((res) => {
      setUpdate(res.data);
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:3000/products/${id}`, update).then(() => {
      setOpen(true);
      setTimeout(() => navigate("/"), 1200);
    });
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 3,
          background: "linear-gradient(135deg, #8e2de2, #4a00e0)", // Purple gradient
        }}
      >
        <Card
          sx={{
            width: { xs: "90%", sm: 450 },
            padding: 3,
            borderRadius: 4,
            background: "white", // WHITE FORM BOX
            boxShadow: "0px 8px 30px rgba(0,0,0,0.2)",
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              align="center"
              sx={{
                fontWeight: "bold",
                mb: 3,
                color: "#333", // Dark text
              }}
            >
              Update Product
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Title"
                variant="outlined"
                sx={{ mb: 2 }}
                value={update.title}
                onChange={(e) =>
                  setUpdate({ ...update, title: e.target.value })
                }
              />

              <TextField
                fullWidth
                label="Price"
                variant="outlined"
                sx={{ mb: 2 }}
                value={update.price}
                onChange={(e) =>
                  setUpdate({ ...update, price: e.target.value })
                }
              />

              <TextField
                fullWidth
                label="Category"
                variant="outlined"
                sx={{ mb: 2 }}
                value={update.category}
                onChange={(e) =>
                  setUpdate({ ...update, category: e.target.value })
                }
              />

              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{
                  mt: 2,
                  py: 1.3,
                  borderRadius: 3,
                  fontWeight: "bold",
                  background: "linear-gradient(45deg, #ff6a00, #ee0979)", // Button gradient
                }}
              >
                Update Product
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>

      <Snackbar open={open} autoHideDuration={1500} onClose={() => setOpen(false)}>
        <Alert severity="success" variant="filled">
          Product updated successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
