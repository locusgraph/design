"use client";

import {
  Archive as ArchiveIcon,
  OverflowMenuHorizontal as EllipsisIcon,
  Edit as PencilIcon,
} from "@carbon/icons-react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@locusgraph/components";

type ThreadItemMenuProps = {
  title: string;
  onRename?: () => void;
  onArchive?: () => void;
};

export function ThreadItemMenu({ title, onRename, onArchive }: ThreadItemMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label={`Options for ${title}`}
          className="shrink-0 text-muted-foreground sm:opacity-0 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100 sm:data-[state=open]:opacity-100"
        >
          <EllipsisIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {onRename && (
          <DropdownMenuItem onSelect={onRename}>
            <PencilIcon />
            Rename
          </DropdownMenuItem>
        )}
        {onArchive && (
          <DropdownMenuItem onSelect={onArchive}>
            <ArchiveIcon />
            Archive
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
