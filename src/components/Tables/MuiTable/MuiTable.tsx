"use client";
import React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Badge from "@mui/material/Badge";
import Checkbox from "@mui/material/Checkbox";

import MuiTableHead from "./MuiTableHead";
import MuiTableHeadToolbar from "./MuiTableHeadToolbar";
import { getComparator, stableSort } from "./functions";
import { Button } from "@mui/material";
import FIcon from "@/common/FIcon";
import { UseBoolean } from "@/hooks/state/useBoolean";

export interface BodyRow {
  id: ID;
  name: string;
  price: number;
}

interface MuiTableProps {
  tableCells: MuiTableHeader<any>[];
  rows: any[];
  tableTitle: string;
  onDeleteMultiple?: (id: ID[]) => void;
  deleting: UseBoolean;
}

export default function MuiTable({
  tableCells,
  rows,
  tableTitle,
  onDeleteMultiple,
  deleting,
}: MuiTableProps) {
  const [order, setOrder] = React.useState<TableOrder>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof BodyRow>("name");
  const [selected, setSelected] = React.useState<ID[]>([]);
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof BodyRow
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: ID) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: ID[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: ID) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <MuiTableHeadToolbar
          tableTitle={tableTitle}
          selected={selected}
          deleting={deleting}
          onDeleteMultiple={onDeleteMultiple}
        />
        <TableContainer>
          <Table aria-labelledby="tableTitle">
            <MuiTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={tableCells}
            />

            <TableBody>
              {visibleRows.map((row: any, index) => (
                <TableRow
                  hover
                  onClick={(event) => handleClick(event, row.id)}
                  role="checkbox"
                  aria-checked={isSelected(row.id)}
                  tabIndex={-1}
                  key={row.id}
                  selected={isSelected(row.id)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" checked={isSelected(row.id)} />
                  </TableCell>

                  {tableCells.map(
                    ({
                      key,
                      RenderComponent,
                      WrapperComponent,
                      className,
                      align,
                    }) => (
                      <TableCell
                        key={key as string}
                        align={align}
                        className={className}
                      >
                        {RenderComponent ? (
                          <RenderComponent row={row} />
                        ) : typeof row[key] === "object" ? (
                          index == 0 ? (
                            <div className="max-w-[200px] text-yellow-600">
                              Hey bro, this is got object, please use custom
                              <b> RenderComponent </b>
                              in tableCells
                              <pre className="bg-black p-3 rounded text-yellow-300 mt-3">
                                {JSON.stringify(row[key], null, 2)}
                              </pre>
                            </div>
                          ) : null
                        ) : WrapperComponent ? (
                          <WrapperComponent row={row}>
                            {row[key]}
                          </WrapperComponent>
                        ) : (
                          row[key]
                        )}
                      </TableCell>
                    )
                  )}

                  <TableCell>
                    <div className="space-x-1">
                      <Button
                        color="warning"
                        variant="contained"
                        size="small"
                        startIcon={<FIcon icon="pencil" className="w-3" />}
                      >
                        Edit
                      </Button>
                      <Button
                        color="info"
                        variant="contained"
                        size="small"
                        startIcon={<FIcon icon="trash" className="w-3" />}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
