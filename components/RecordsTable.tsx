import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridCellParams,
} from "@material-ui/data-grid";

export type RecordProps = {
  name: string;
  humidity?: {
    raw: number;
    percentage: number;
  };
  temperature?: number;
  timestamp: string;
};

export type RecordsProps = {
  items: RecordProps[];
};

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Nombre",
    width: 150,
    editable: false,
    valueGetter: (params: GridValueGetterParams) => params.value,
    renderCell: (params: GridCellParams) => {
      return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Avatar
            className="w-10 h-10 rounded-full"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
            alt=""
          />
          <div>{params.value}</div>
        </div>
      );
    },
  },
  {
    field: "timestamp",
    headerName: "Fecha",
    width: 250,
    editable: false,
  },
  {
    field: "temperature",
    headerName: "Temperatura",
    width: 150,
    editable: false,
    valueGetter: (params: GridValueGetterParams) =>
      params.value ? `${params.value}°` : "-",
  },
  {
    field: "humidity",
    headerName: "Humedad",
    width: 150,
    editable: false,
    valueGetter: (params: GridValueGetterParams) => {
      const humidity = (params.value as { percentage: number }) || {
        percentage: 0,
      };
      return `${humidity ? humidity?.percentage?.toFixed(0) : 0}%`;
    },
  },
];

export default function RecordsTable({ items }: RecordsProps) {
  const data = items.map((item: RecordProps, index: number) => ({
    id: `record-row-${index}`,
    ...item,
  }));

  return (
    <div style={{ height: 650, width: "100%" }}>
      <DataGrid columns={columns} rows={data} pageSize={10} />
    </div>
  );
}
