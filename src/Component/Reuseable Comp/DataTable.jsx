import { DataGrid, GridToolbar } from "@mui/x-data-grid";

function DataTable({ rows, columns }) {
  const { id } = columns;
  console.log(columns);
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
      pageSizeOptions={[20]}
      // autoHeight={true}
      sx={{
        m: 2,
        background: "#ffffff",
        width: "100%",
        height: "530px",
        fontFamily: "Plus Jakarta Sans, sans-serif",
        color: "black",
        p:3,
      }}
    />
  );
}

export default DataTable;
