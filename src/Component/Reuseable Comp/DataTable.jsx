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
      disableRowSelectionOnClick
      sx={{
        // boxShadow: 2,
        border: 2,
        background: "#ffffff",
        borderColor:"#ffffff",
        width:"auto"
      }}
      
    />
  );
}

export default DataTable;
