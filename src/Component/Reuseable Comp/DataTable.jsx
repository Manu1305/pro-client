import { DataGrid, GridToolbar } from "@mui/x-data-grid";

function DataTable({ rows, columns }) {


  return (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 20,
          },
        },
      }}
      slots={{ toolbar: GridToolbar }}
      pageSizeOptions={[10]}
      sx={{
        m: 2,
        p: 3,
        background: "#ffffff",
        width: "100%",
        height: "530px",
        fontFamily: "Plus Jakarta Sans, sans-serif",
        color: "black",
      }}
    />
  );
}

export default DataTable;
