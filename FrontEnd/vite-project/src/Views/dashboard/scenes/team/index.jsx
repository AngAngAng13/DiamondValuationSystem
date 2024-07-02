import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, useTheme, Button, Modal, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNotify } from "../../../../Provider/NotifyProvider";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [users, setUsers] = useState([]);
  const { notifySuccess, notifyError, notifyFetching } = useNotify(); // Destructure the notification functions

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        notifyFetching("Fetching users...", { toastId: "fetching-users" });
        const response = await axios.get("http://localhost:3000/admin/users");
        setUsers(response.data);
        notifySuccess("Users loaded successfully!", { toastId: "fetching-users-success" });
      } catch (error) {
        notifyError("Error fetching users.", { toastId: "fetching-users-error" });
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [notifyFetching, notifySuccess, notifyError]);

  const handleOpenUpdateModal = (row) => {
    setSelectedRow(row);
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
    setSelectedRow(null);
  };

  const handleOpenDeleteDialog = (row) => {
    setSelectedRow(row);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedRow(null);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/admin/users/${selectedRow.id}`);
      setUsers(users.filter(user => user.id !== selectedRow.id));
      notifySuccess("User deleted successfully!", { toastId: "delete-user-success" });
      handleCloseDeleteDialog();
    } catch (error) {
      notifyError("Error deleting user.", { toastId: "delete-user-error" });
      console.error("Error deleting user:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/admin/users/${selectedRow.id}`, selectedRow);
      setUsers(users.map(user => (user.id === selectedRow.id ? selectedRow : user)));
      notifySuccess("User updated successfully!", { toastId: "update-user-success" });
      handleCloseUpdateModal();
    } catch (error) {
      notifyError("Error updating user.");
      console.error("Error updating user:", error);
    }
  };

  const columns = [
    { field: "uid", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box width="60%" m="0 auto" p="5px" display="flex" justifyContent="center" backgroundColor={access === "admin" ? colors.greenAccent[600] : access === "manager" ? colors.greenAccent[700] : colors.greenAccent[700]} borderRadius="4px">
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box display="flex" justifyContent="space-around" width="100%">
            {params.row.access !== "admin" && (
              <>
                <Button onClick={() => handleOpenUpdateModal(params.row)}>
                  <EditIcon color="secondary" />
                </Button>
                <Button onClick={() => handleOpenDeleteDialog(params.row)}>
                  <DeleteIcon color="secondary" />
                </Button>
              </>
            )}
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
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
        <DataGrid checkboxSelection rows={users} columns={columns} />
      </Box>

      {/* Update Modal */}
      <Modal open={openUpdateModal} onClose={handleCloseUpdateModal}>
        <Box sx={{ ...style, width: 400 }}>
          <Typography variant="h6" component="h2">
            Update User
          </Typography>
          <TextField label="Name" fullWidth margin="normal" value={selectedRow?.name || ""} onChange={(e) => setSelectedRow({ ...selectedRow, name: e.target.value })} />
          <TextField label="Phone" fullWidth margin="normal" value={selectedRow?.phone || ""} onChange={(e) => setSelectedRow({ ...selectedRow, phone: e.target.value })} />
          <TextField label="Email" fullWidth margin="normal" value={selectedRow?.email || ""} onChange={(e) => setSelectedRow({ ...selectedRow, email: e.target.value })} />
          <Button onClick={handleUpdate} color="secondary" variant="contained">
            Update
          </Button>
        </Box>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>{"Delete User"}</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this user?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default Team;
