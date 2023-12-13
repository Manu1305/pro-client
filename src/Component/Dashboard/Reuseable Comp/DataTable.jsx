import { DataGrid,GridToolbar } from "@mui/x-data-grid";

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
        p: 3,
        background: "#ffffff",
        width: "auto",
        height: "auto",
        fontFamily: "Plus Jakarta Sans, sans-serif",
        color: "black",
      }}
    />
  );
}

export default DataTable;
