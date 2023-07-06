import { createColumnHelper } from '@tanstack/react-table';
import { ITableType } from '../types';

export const calculateDistance = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
};

const columnHelper = createColumnHelper<ITableType>();

export const columns: any = [
  columnHelper.accessor((row) => row.id, {
    id: 'id',
    cell: (info) => <p className="text-white">{info.getValue()}</p>,
    header: () => <span className="text-[#f7f7f7]">Input ID</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.value, {
    id: 'value',
    cell: (info) => <p className="text-white">{info.getValue()}</p>,
    header: () => <span className="text-[#f7f7f7]">Input Value</span>,
    footer: (info) => info.column.id,
  }),
];
