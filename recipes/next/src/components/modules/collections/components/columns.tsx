"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { Collection } from "../core/_models";
import { DataTableRowActions } from "./data-table-row-actions";
import { CheckCircleIcon, Circle } from "lucide-react";
import { CollectionTypes } from "@/types";
import Link from "next/link";

export const columns: ColumnDef<Collection>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
    cell: ({ row }) => {
      const { slug, title } = row.original;
      const { collection, item } = slug;
      const link = collection === CollectionTypes.PAGE ? `/${item}` : `/${collection}/${item}`;

      return (
        <div className="flex space-x-2">
          <Link href={link} target="_blank" className="max-w-[500px] truncate capitalize hover:underline">
            {title}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const { status, Icon } =
        row.original.status === "publish"
          ? {
              status: "publish",
              Icon: CheckCircleIcon,
            }
          : {
              status: "draft",
              Icon: Circle,
            };

      return (
        <div className="flex w-[100px] items-center capitalize">
          <Icon className="mr-2 h-4 w-4 text-muted-foreground" />
          <span>{status}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
  },
  {
    accessorKey: "author",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Author" />,
    cell: () => {
      return (
        <div className="flex w-[100px] items-center">
          <span>Admin</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created at" />,
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;

      return (
        <div className="flex w-[100px] items-center">
          <span>{createdAt}</span>
        </div>
      );
    },
    sortingFn: (rowA, rowB) => {
      const { createdAt: createdAtA = "" } = rowA.original;
      const { createdAt: createdAtB = "" } = rowB.original;

      return createdAtA.localeCompare(createdAtB);
    },
  },
  {
    id: "actions",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Actions" className="text-center" />,
    cell: ({ row }) => {
      const { id, slug } = row.original;

      return <DataTableRowActions id={id} slug={slug} />;
    },
  },
];
