import {
  ColumnDef,
  ColumnFiltersState,
  HeaderGroup,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { Loading } from "~/components/helpers/Loading";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { useQueryResponse } from "../core/QueryResponseProvider";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const Header = <TData,>({ headerGroups }: { headerGroups: HeaderGroup<TData>[] }) => (
  <TableHeader>
    {headerGroups.map((headerGroup) => (
      <TableRow key={headerGroup.id}>
        {headerGroup.headers.map((header) => {
          return (
            <TableHead key={header.id} colSpan={header.colSpan}>
              {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
            </TableHead>
          );
        })}
      </TableRow>
    ))}
  </TableHeader>
);

const BodyWithItems = <TData,>({ rows }: { rows: Row<TData>[] }) => (
  <>
    {rows.map((row) => (
      <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
        ))}
      </TableRow>
    ))}
  </>
);

const EmptyBody = ({ colSpan }: { colSpan: number }) => (
  <TableRow>
    <TableCell colSpan={colSpan} className="h-24 text-center">
      No items found.
    </TableCell>
  </TableRow>
);

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const { isLoading } = useQueryResponse();
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const rows = table.getRowModel().rows;

  return (
    <div className="space-y-4 relative">
      <DataTableToolbar table={table} />
      <div className="rounded-md border">
        <Table>
          <Header headerGroups={table.getHeaderGroups()} />
          <TableBody>{rows.length ? <BodyWithItems rows={rows} /> : <EmptyBody colSpan={columns.length} />}</TableBody>
        </Table>
      </div>
      {isLoading && <Loading />}
      <DataTablePagination table={table} />
    </div>
  );
}
