import { DataGrid,GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
function DataTable({ rows, columns }) {


  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        "& .super-app-theme--header": {
          backgroundColor: "rgba(255, 7, 0, 0.55)",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns= {columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        pageSizeOptions={[20]}
        sx={{
          p: 3,
          background: "#ffffff",
          width: "auto",
          height: "auto",
          fontFamily: "Plus Jakarta Sans, sans-serif",
          color: "black",
        }}
      />
    </Box>
  );
}

export default DataTable;
