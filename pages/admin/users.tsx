import useSWR from "swr";
import { PeopleOutline } from "@mui/icons-material";
import { AdminLayout } from "../../components/layouts/AdminLayout";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Grid, MenuItem, Select } from "@mui/material";
import { IUser } from "../../interfaces";

const UsersPage = () => {
  const columns: GridColDef[] = [
    { field: "email", headerName: "Email", width: 250 },
    { field: "name", headerName: "Name", width: 250 },
    {
      field: "role",
      headerName: "Role",
      width: 250,
      renderCell: ({ row }: GridValueGetterParams) => {
        return (
          <Select value={row.role} label="Role" sx={{ width: "300px" }}>
            <MenuItem value="admin"> Admin </MenuItem>
            <MenuItem value="admin"> Admin </MenuItem>
            <MenuItem value="admin"> Admin </MenuItem>
            <MenuItem value="admin"> Admin </MenuItem>
          </Select>
        );
      },
    },
  ];

  const { data, error } = useSWR<IUser[]>("/api/admin/users");
  if (!data && !error) {
    return <></>;
  }

  const rows = data!.map((user) => ({
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  }));

  return (
    <AdminLayout
      title={"Users"}
      subTitle={""}
      icon={<PeopleOutline></PeopleOutline>}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{ mt: 2, height: "calc(100vh - 200px)", width: "100px" }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          ></DataGrid>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default UsersPage;
