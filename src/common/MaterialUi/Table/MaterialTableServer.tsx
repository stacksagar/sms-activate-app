import { DataGrid, GridColDef } from '@mui/x-data-grid';
import AppPagination from './AppPagination';
import { FetchDataParams } from '../../../hooks/redux/useFetchWithPagination';
import { Button, IconButton } from '@mui/material';
import SearchInput from '../../Forms/SearchInput';
import FIcon from '../../Icons/FIcon';
import useString from '../../../hooks/state/useString';
import dynamic_filter from '../../../utils/dynamic_filter';
import ComponentTopLoader from '../../Loaders/ComponentTopLoader';
import { Link } from 'react-router-dom';

interface Props {
  data: any[];
  columns: GridColDef[];
  onChangeSelected: any;

  totalItems?: number;
  totalPages?: number;
  currentPage?: number;
  changePage?: ({ ...props }: FetchDataParams) => any;
  limit?: number;
  hidePagination?: boolean;
  loading?: boolean;

  filterKeys?: string[];

  addNewLink?: string;
  addNewText?: string;
  addNewHandler?: () => void;
  filterHandler?: () => void;
  showMultipleDeleteHandler?: boolean;
  multipleDeleteHandler?: () => void;
  downloadHandler?: () => void;
}

export default function MaterialTableServer({
  data,
  columns,
  onChangeSelected,
  totalItems,
  totalPages,
  currentPage,
  changePage,
  limit,
  hidePagination,
  loading,
  filterKeys,

  addNewLink,
  addNewText,
  addNewHandler,
  filterHandler,
  downloadHandler,
  multipleDeleteHandler,
  showMultipleDeleteHandler,
}: Props) {
  const filterText = useString('');

  return (
    <div className="server-table bg-white dark:bg-black">
      {/* Header/Handlers */}
      <div className="flex flex-wrap justify-start gap-2 p-4">
        <div className="w-full 2xsm:w-[250px]">
          <SearchInput onChange={filterText.change} placeholder="Search..." />
        </div>

        {filterHandler ? (
          <Button
            onClick={filterHandler}
            className="space-x-2 focus:ring focus:ring-offset-1"
            color="primary"
            variant="contained"
            size="large"
          >
            <FIcon icon="sliders" />
            <span>Filter</span>
          </Button>
        ) : null}

        {multipleDeleteHandler && showMultipleDeleteHandler ? (
          <Button
            onClick={multipleDeleteHandler}
            className="space-x-2 focus:ring focus:ring-offset-1"
            color="error"
            variant="contained"
            size="large"
          >
            <FIcon icon="trash" />
            <span>Delete Selected</span>
          </Button>
        ) : null}

        <div className="flex flex-row-reverse items-center gap-2 lg:ml-auto lg:flex-row">
          {downloadHandler ? (
            <IconButton onClick={downloadHandler} size="small">
              <FIcon icon="download" />
            </IconButton>
          ) : null}

          {addNewHandler ? (
            <Link to={addNewLink || '#'}>
              <Button
                onClick={addNewHandler}
                className="space-x-2 focus:ring focus:ring-offset-1"
                color="primary"
                variant="contained"
                size="large"
              >
                <FIcon icon="plus" />
                <span>{addNewText}</span>
              </Button>
            </Link>
          ) : null}
        </div>
      </div>

      {/* Body/Table */}
      <div className="relative">
        <ComponentTopLoader loading={loading} />
        <DataGrid
          checkboxSelection
          rows={dynamic_filter(data, filterKeys, filterText.value)}
          columns={columns}
          onRowSelectionModelChange={onChangeSelected}
          hideFooterPagination
        />
      </div>

      {/* Footer/Pagination */}
      <div className="p-4">
        {hidePagination ? null : (
          <AppPagination
            limit={limit || 0}
            totalPages={totalPages || 0}
            totalItems={totalItems || 0}
            currentPage={currentPage || 0}
            changePage={changePage}
          />
        )}
      </div>
    </div>
  );
}
