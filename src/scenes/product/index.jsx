import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import "./style.css";
import axios from "axios";
import { useState } from "react";
import BASE_URL from "../../hooks/baseURL";
const Product = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const token = localStorage.getItem("token");
  const [filterModel, setFilterModel] = useState({
    items: [{ columnField: "name", operatorValue: "contains", value: "" }],
  });
  const { data, loading, reFetch } = useFetch(`${BASE_URL}/product`);
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure to delete this product?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`${BASE_URL}/product/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        reFetch();
      } catch (err) {
        console.error(err);
      }
    }
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      flex: 0.5,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
            <Link
              to={`${BASE_URL}/product/edit/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">Edit</div>
            </Link>
          </div>
        );
      },
    },
  ];
  const columns = [
    { field: "_id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 0.5,
    },
    {
      field: "count",
      headerName: "Count",
      flex: 0.5,
    },
    {
      field: "img1",
      headerName: "Image",
      flex: 1,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Product"
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="PRODUCTS" subtitle="List of Products" />
      <Link className="link" to="/product/new">
        Add New Product
      </Link>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]} !important`,
            },
          }}
        >
          <DataGrid
            rows={data}
            columns={columns.concat(actionColumn)}
            components={{ Toolbar: GridToolbar }}
            getRowId={(row) => row._id}
            filterModel={filterModel}
            onFilterModelChange={(model) => setFilterModel(model)}
          />
        </Box>
      )}
    </Box>
  );
};

export default Product;
