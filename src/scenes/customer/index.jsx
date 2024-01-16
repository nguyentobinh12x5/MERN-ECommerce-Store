import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import useFetchToken from "../../hooks/useFetchToken";
import axios from "axios";
import { Link } from "react-router-dom";
import BASE_URL from "../../hooks/baseURL";
const Customer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data, loading, reFetch } = useFetchToken(`${BASE_URL}/user`);
  const token = localStorage.getItem("token");
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure to delete this user?");
    if (confirmDelete) {
      try {
        await axios.delete(`${BASE_URL}user/${id}`, {
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
  const columns = [
    { field: "_id", headerName: "ID", flex: 0.5 },
    {
      field: "fullName",
      headerName: "Full Name",
      flex: 0.5,
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
      headerName: "Address",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      renderCell: ({ row: { role } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              role === "admin"
                ? colors.greenAccent[600]
                : role === "admin"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {role === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {role === "employee" && <SecurityOutlinedIcon />}
            {role === "customer" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {role}
            </Typography>
          </Box>
        );
      },
    },
  ];
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
              to={`${BASE_URL}/user/edit/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">Edit</div>
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <Box m="20px">
      <Header title="CUSTOMER" subtitle="Managing the Customer" />
      {loading ? (
        <Typography>Loading....</Typography>
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

export default Customer;
