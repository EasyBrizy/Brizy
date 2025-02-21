"use client";

import { Edit, Eye, Trash } from "lucide-react";
import Link from "next/link";
import { useCallback, useMemo } from "react";
import { useMutation } from "react-query";
import { useQueryResponse } from "@/components/modules/collections/core/QueryResponseProvider";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CollectionTypes } from "@/types";
import { deleteItem } from "../core/_requests";
import { AlertRemoveItem } from "./alert-remove";

interface Props {
  id: string;
  slug: {
    item: string;
    collection: string;
  };
}

export function DataTableRowActions({ id, slug }: Props) {
  const { refetch } = useQueryResponse();

  const handleDelete = useMutation(() => deleteItem(id), {
    onSuccess: () => {
      refetch();
    },
  });

  const handleDeleteItem = useCallback(() => handleDelete.mutateAsync(), [handleDelete]);

  const { item, collection } = slug;
  const url = collection === CollectionTypes.PAGE ? `${item}` : `${collection}/${item}`;

  const actions = useMemo(
    () => [
      {
        label: "Edit",
        url: `/admin/${url}`,
        Icon: Edit,
        target: "_self",
      },
      {
        label: "Preview",
        url: `/${url}`,
        Icon: Eye,
        target: "_blank",
      },
      {
        label: "Delete",
        onClick: handleDeleteItem,
        Icon: Trash,
      },
    ],
    [url, handleDeleteItem],
  );

  const itemClassNames =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 w-9";

  return (
    <div className="flex items-center justify-center">
      {actions.map(({ label, url, onClick, Icon, target }) => (
        <Tooltip key={label}>
          <TooltipTrigger asChild>
            <span className={itemClassNames}>
              {url ? (
                <Link href={url} target={target}>
                  <Icon />
                </Link>
              ) : (
                <AlertRemoveItem onConfirm={onClick}>
                  <Icon />
                </AlertRemoveItem>
              )}
            </span>
          </TooltipTrigger>
          <TooltipContent>{label}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
