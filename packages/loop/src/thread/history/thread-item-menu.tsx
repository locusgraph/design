import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@locusgraph/components";
import {
  Archive as ArchiveIcon,
  DotsThree as EllipsisIcon,
  PencilSimple as PencilIcon,
} from "@phosphor-icons/react/ssr";

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
          <EllipsisIcon weight="bold" aria-hidden />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {onRename && (
          <DropdownMenuItem onSelect={onRename}>
            <PencilIcon weight="bold" aria-hidden />
            Rename
          </DropdownMenuItem>
        )}
        {onArchive && (
          <DropdownMenuItem onSelect={onArchive}>
            <ArchiveIcon weight="bold" aria-hidden />
            Archive
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
