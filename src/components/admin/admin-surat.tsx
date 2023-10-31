import React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import { RouterOutputs, api } from "@/utils/api";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface TableProps<TData> {
  data: TData[];
}

const columns: ColumnDef<any, RouterOutputs["surat"]["semuaSurat"]>[] = [
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
    accessorKey: "surat.tipe_surat",
    header: "Tipe Surat",
  },
  {
    accessorKey: "nama",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "nomorTelp",
    header: "No. Hp",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const { id, status } = row.original;
      const { toast } = useToast();
      const utils = api.useUtils();

      // setujui surat mutation
      const setujui = api.surat.setujuiSurat.useMutation({
        onSuccess: (data) => {
          toast({
            title: "Data Berhasil Diubah",
            description: (
              <pre>
                <code>{JSON.stringify(data, null, 2)}</code>
              </pre>
            ),
          });
          utils.surat.semuaSurat.invalidate();
        },
      });

      // hapus surat mutation
      const hapus = api.surat.hapusSuratById.useMutation({
        onSuccess: (data) => {
          toast({
            title: "Data Berhasil Dihapus",
            description: (
              <pre>
                <code>{JSON.stringify(data, null, 2)}</code>
              </pre>
            ),
          });
          utils.surat.semuaSurat.invalidate();
        },
      });

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
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setujui.mutate({ id: id, status: !status });
              }}
            >
              {!status ? "Setujui" : "Tolak"} Surat
            </DropdownMenuItem>
            <DropdownMenuItem>Edit Surat</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                hapus.mutate({ id: id });
              }}
            >
              Hapus Surat
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function AdminSurat<TData>({ data }: TableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold">Daftar Surat</h1>
      <div className="flex items-center py-4">
        <Input
          placeholder="Cari berdasarkan nama ..."
          value={(table.getColumn("nama")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("nama")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Kolom <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length
            ? `Saat ini terdapat ${
                table.getFilteredRowModel().rows.length
              } surat.`
            : "Anda tidak mempunyai surat"}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
