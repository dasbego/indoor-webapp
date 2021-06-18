import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  chakra,
} from "@chakra-ui/react";
import useSWR from "swr";
import { useTable, useSortBy } from "react-table";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { getAllRecords } from "../services/firebase-api";

export type Record = {
  name: string;
  humidity?: {
    raw: number;
    percentage: number;
  };
  temperature?: number;
  timestamp: string;
};

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Records(props: any) {
  const data = props.records;
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Temperature",
        accessor: "temperature",
        isNumeric: true,
      },
      {
        Header: "Humidity Percentage",
        accessor: (row) => `${row.humidity.percentage.toFixed(2)}°`,
        isNumeric: true,
      },
    ],
    []
  );
  console.log(data);
  const iterableRecords = Object.values(data);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: iterableRecords }, useSortBy);

  if (!data) return <div>Loading...</div>;

  return (
    <Table variant="simple" {...getTableProps}>
      <TableCaption>Records from Bego's indoor house</TableCaption>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                isNumeric={column.isNumeric}
              >
                {column.render("Header")}
                <chakra.span pl="4">
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <TriangleDownIcon aria-label="sorted descending" />
                    ) : (
                      <TriangleUpIcon aria-label="sorted ascending" />
                    )
                  ) : null}
                </chakra.span>
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <Td {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
                  {cell.render("Cell")}
                </Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}

Records.getInitialProps = async (ctx) => {
  const res = await getAllRecords();
  return { records: res };
};
