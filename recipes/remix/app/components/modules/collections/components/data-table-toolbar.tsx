import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { useCallback, useMemo } from "react";
import { useMutation } from "react-query";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useQueryResponse } from "../core/QueryResponseProvider";
import { createCollection, deleteSelectedItems } from "../core/_requests";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { isObject, statuses } from "./utils";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

const ActionsToolbar = ({ selectedItems, unSelectRows }: { selectedItems: string[]; unSelectRows: VoidFunction }) => {
  const { collection, refetch } = useQueryResponse();

  const handleDeleteItems = useMutation(() => deleteSelectedItems(selectedItems), {
    onError() {
      alert("Fail to delete items");
    },
    onSuccess: () => {
      unSelectRows();
      refetch();
    },
  });

  const handleDelete = useCallback(async () => {
    await handleDeleteItems.mutateAsync();
  }, [handleDeleteItems]);

  const handleAdd = useMutation(() => createCollection(collection), {
    onSuccess: () => {
      refetch();
    },
  });

  const handleAddItem = useCallback(async () => {
    await handleAdd.mutateAsync();
  }, [handleAdd]);

  const item = collection === "blog" ? "post" : collection;

  return selectedItems.length > 0 ? (
    <Button onClick={handleDelete}>Delete selected {selectedItems.length} items</Button>
  ) : (
    <Button onClick={handleAddItem}>Add new {item}</Button>
  );
};

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const state = table.getState();
  const isFiltered = state.columnFilters.length > 0;
  const selectedRows = table.getSelectedRowModel();

  const selectedRowIds = useMemo(
    () =>
      selectedRows.flatRows
        .map((row) => (isObject(row.original) ? (typeof row.original.id === "string" ? row.original.id : "") : ""))
        .filter(Boolean),
    [selectedRows],
  );

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter items..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("title")?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter column={table.getColumn("status")} title="Status" options={statuses} />
        )}
        {isFiltered && (
          <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
            Reset
            <X />
          </Button>
        )}
      </div>
      <div>
        <ActionsToolbar selectedItems={selectedRowIds} unSelectRows={table.resetRowSelection} />
      </div>
    </div>
  );
}
