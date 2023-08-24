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
            pageSize: 5,
          },
        },
      }}
      slots={{ toolbar: GridToolbar }}
      pageSizeOptions={[5]}
      checkboxSelection
      disableRowSelectionOnClick
      sx={{
        "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer":
          {
            display: "none",
          },
      }}
    />
  );
}

export default DataTable;
