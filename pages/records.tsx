import React from "react";
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

export default function Records(props: any) {
  const records = Object.values(props.records);
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tempteratura
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Humedad
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            { records.map((record, idx) => (<tr>
              <td key={`record-${idx}`} className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm text-gray-900">
                      {record.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{record.timestamp}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 text-left">
                  {record.temperature || 0}°
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {record.humidity.percentage.toFixed(0) || 0}%
              </td>
            </tr>))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
  )
}

Records.getInitialProps = async (ctx) => {
  const res = await getAllRecords();
  return { records: res };
};
