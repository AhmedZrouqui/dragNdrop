import Layout from './components/Layout';
import Dropzone from './components/Dropzone';
import classNames from 'classnames';
import { useAppContext } from './context/appContext';
import Button from './components/Button';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { columns } from './utils/index';
import { useState } from 'react';
import { ITableType } from './types';

function App() {
  const ctx = useAppContext();
  const [tableData, setTableData] = useState<Array<ITableType>>([]);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const onButtonClick = () => {
    if (ctx) {
      const data = ctx.getRightSideData();
      setTableData(data);
    }
  };

  return (
    <Layout>
      <div
        className={classNames(
          'flex gap-[80px] pt-[180px] m-auto items-center justify-center mb-8',
          {
            'flex-col pt-[40px]': ctx?.isMobile,
          }
        )}
      >
        <Dropzone ref={ctx && ctx.leftRef} id="left_dropzone"></Dropzone>
        <Dropzone ref={ctx && ctx.rightRef} id="right_dropzone"></Dropzone>
      </div>

      <div className="flex items-center justify-center">
        <Button handler={onButtonClick} />
      </div>

      {tableData.length > 0 && (
        <div className="w-full mt-8">
          <table className="w-full bg-darkGray rounded-md py-4">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="py-4 bg-paper">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-b border-paper">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="text-center py-2">
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
      )}
    </Layout>
  );
}

export default App;
