import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";

function Table({ data, columns }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md bg-white overflow-hidden">
      <div className="flex justify-between border-b-2 border-gray-100 p-3">
        <h1 className="p-3 text-lg font-bold">Invoices Owed to You</h1>
      </div>
      <div className="p-4">
        <table className="w-full table-auto border-collapse">
          <thead className="text-left">
            {table.getHeaderGroups().map((headerGroup, index) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, columnIndex) => (
                  <th
                    key={header.id}
                    className={`p-2 text-gray-500 ${index === 0 && columnIndex === 0 ? 'w-80' : 'w-20'}`}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="text-left">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="text-lg">
                {row.getVisibleCells().map((cell, columnIndex) => (
                  <td
                    key={cell.id}
                    className={`p-2 ${columnIndex === 0 ? 'w-80' : 'w-20'}`}
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
