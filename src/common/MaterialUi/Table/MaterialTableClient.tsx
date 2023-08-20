import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface Props {
  data: any[];
  columns: GridColDef[];
  onChangeSelected: any;
  pageSize?: number;
}

export default function MaterialTableClient({
  data,
  columns,
  onChangeSelected,
  pageSize,
}: Props) {
  return (
    <div className="bg-white dark:bg-black">
      <DataGrid
        checkboxSelection
        rows={data}
        columns={columns}
        onRowSelectionModelChange={onChangeSelected}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: pageSize || 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        paginationMode="client"
      />
    </div>
  );
}
