import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import useFetchToken from "../../hooks/useFetchToken";
import { Link } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../hooks/baseURL";
const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data, loading, reFetch } = useFetchToken(`${BASE_URL}/order/`);
  const token = localStorage.getItem("token");
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure to delete this order?");
    if (confirmDelete) {
      try {
        await axios.delete(`${BASE_URL}/order/${id}`, {
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
              style={{ textDecoration: "none" }}
              to={`/product/edit/${params.row._id}`}
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
      field: "fullName",
      headerName: "Full Name",
      flex: 0.5,
      cellClassName: "name-column--cell",
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.5,
    },
    {
      field: "address",
      headerName: "address",
      flex: 1,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 0.5,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {params.row.totalPrice} VND
        </Typography>
      ),
    },
    {
      field: "Status",
      headerName: "Status",
      flex: 0.5,
    },
  ];

  return (
    <Box m="20px">
      <Header title="INVOICES" subtitle="List of Invoice Balances" />
      {loading ? (
        <Typography>Loading...</Typography>
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
          }}
        >
          <DataGrid
            checkboxSelection
            rows={data}
            columns={columns.concat(actionColumn)}
            getRowId={(row) => row._id}
          />
        </Box>
      )}
    </Box>
  );
};

export default Invoices;
