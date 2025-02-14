'use client';

import { useEffect, useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  useReactTable,
} from '@tanstack/react-table';
import styles from './dataTable.module.scss';
import DataTablePagination from './DataTablePagination';

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data?: TData[];
  total: number;
  paginationState: PaginationState;
  onPaginationChange: (state: PaginationState) => void;
  onClickRow?: (rowData: Row<TData>) => void;
};

const DataTable = <TData, TValue>({
  columns,
  data = [],
  total,
  paginationState,
  onPaginationChange,
  onClickRow,
}: DataTableProps<TData, TValue>) => {
  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    rowCount: total,
    initialState: {
      pagination: paginationState,
    },
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableColumnResizing: false,
  });

  const tablePaginationState = table.getState().pagination;

  const [pagination, setPagination] = useState(() => ({
    pageIndex: paginationState?.pageIndex ?? 0,
    pageSize: paginationState?.pageSize ?? 10,
  }));

  const handleChangePageSize = (pageSize: number) => {
    setPagination((prev) => ({ ...prev, pageSize }));
  };

  const handleChangePagination = (newPaginationState: PaginationState) => {
    if (
      pagination.pageIndex === newPaginationState.pageIndex &&
      pagination.pageSize === newPaginationState.pageSize
    )
      return;

    setPagination((prev) => ({ ...prev, ...newPaginationState }));
    onPaginationChange(newPaginationState);
  };

  useEffect(() => {
    if (
      pagination.pageIndex === tablePaginationState.pageIndex &&
      pagination.pageSize === tablePaginationState.pageSize
    ) {
      return;
    }

    handleChangePagination(tablePaginationState);
  }, [tablePaginationState]);

  return (
    <div>
      <div className={styles.tableBorder}>
        <table className={styles.tableContainer}>
          <thead className={styles.tableHeader}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr className="table-row" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      className={styles.tableHead}
                      key={header.id}
                      style={{ width: `${header.getSize()}%` }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="table-body">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  className={styles.tableRow}
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  onClick={() => onClickRow?.(row)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      className={styles.tableCell}
                      key={cell.id}
                      style={{
                        width: `${cell.column.getSize()}%`,
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="table-row">
                <td className={styles.tableCell} colSpan={columns.length}>
                  No results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <DataTablePagination
        pageIndex={paginationState.pageIndex}
        totalPages={total}
        onChangePage={(pageNumber) =>
          handleChangePagination({
            pageIndex: pageNumber,
            pageSize: pagination.pageSize,
          })
        }
      />
      {/* <span className="flex items-center gap-1">
        <div>Page</div>
        <strong>
          {table.getState().pagination.pageIndex + 1} /
          {table.getPageCount().toLocaleString()}
        </strong>
      </span> */}
    </div>
  );
};

export default DataTable;
