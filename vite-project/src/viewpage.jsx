import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Button,
  Typography,
  Box
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Viewpage() {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const loadData = () => {
    axios
      .get("http://localhost:3000/products")
      .then((res) => setUser(res.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/products/${id}`).then(() => loadData());
    alert("Product Deleted Successfully");
  };

  return (
    <>
      {/* Animated Gradient Background */}
      <Box
        sx={{
          minHeight: "100vh",
          padding: 4,
          background: `linear-gradient(120deg,#ff6a00,#ee0979,#8e2de2,#4a00e0)`,
          backgroundSize: "300% 300%",
          animation: "gradientMove 12s ease infinite",
          "@keyframes gradientMove": {
            "0%": { backgroundPosition: "0% 50%" },
            "50%": { backgroundPosition: "100% 50%" },
            "100%": { backgroundPosition: "0% 50%" }
          }
        }}
      >
        {/* Page Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 3,
            alignItems: "center"
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: "white",
              textShadow: "2px 2px 10px rgba(0,0,0,0.4)"
            }}
          >
            Product Dashboard
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              px: 3,
              py: 1.2,
              borderRadius: 3,
              fontSize: "16px",
              background: "linear-gradient(45deg,#ff512f,#dd2476)",
              boxShadow: "0px 5px 20px rgba(255, 81, 47, 0.6)",
              "&:hover": {
                background: "linear-gradient(45deg,#dd2476,#ff512f)",
                boxShadow: "0px 8px 25px rgba(255, 81, 47, 0.8)"
              }
            }}
            onClick={() => navigate("/adduser")}
          >
            Add Product
          </Button>
        </Box>

        {/* Glassmorphism Table Card */}
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 4,
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(12px)",
            boxShadow: "0px 8px 30px rgba(0,0,0,0.3)",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.2)"
          }}
        >
          <Table>
            <TableHead
              sx={{
                background: "rgba(255,255,255,0.25)",
                backdropFilter: "blur(12px)"
              }}
            >
              <TableRow>
                {["ID", "Title", "Price", "Category", "Actions"].map((head) => (
                  <TableCell
                    key={head}
                    sx={{
                      fontWeight: "bold",
                      color: "white",
                      textShadow: "1px 1px 4px rgba(0,0,0,0.3)"
                    }}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {user.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.2)",
                      cursor: "pointer"
                    }
                  }}
                >
                  <TableCell sx={{ color: "white" }}>{item.id}</TableCell>
                  <TableCell sx={{ color: "white" }}>{item.title}</TableCell>
                  <TableCell sx={{ color: "white" }}>₹{item.price}</TableCell>
                  <TableCell sx={{ color: "white" }}>{item.category}</TableCell>

                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<EditIcon />}
                      sx={{
                        mr: 1,
                        borderRadius: 2,
                        backgroundColor: "#42a5f5",
                        "&:hover": { backgroundColor: "#1e88e5" }
                      }}
                      onClick={() => navigate(`/update/${item.id}`)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="contained"
                      size="small"
                      color="error"
                      startIcon={<DeleteIcon />}
                      sx={{ borderRadius: 2 }}
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
