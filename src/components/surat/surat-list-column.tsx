import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RouterOutputs } from "@/utils/api";
import moment from "moment";

// moment
var idLocale = require("moment/locale/id");
moment.updateLocale("id", idLocale);

export const columns: ColumnDef<RouterOutputs["surat"]["suratByUser"]>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div
        className={`${
          row.getValue("status") == false
            ? "text-destructive"
            : "text-green-500"
        }`}
      >
        {row.getValue("status") == false ? (
          <Badge variant="destructive">Belum Disetujui</Badge>
        ) : (
          <Badge variant="default">Sudah Disetujui</Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: "nama",
    header: "Nama Peminta",
  },
  {
    accessorKey: "surat.tipe_surat",
    header: "Tipe Surat",
  },
  {
    accessorKey: "tanggal",
    header: "Dibuat Pada",
    cell: ({ row }) => (
      <div>{moment(row.getValue("tanggal")).format("dddd, DD MMMM YYYY")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      // @ts-ignore
      const { id } = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(id)}>
              Salin ID Surat
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Hapus Surat
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
