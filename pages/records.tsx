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
        <div className="inline-block align-middle py-2 min-w-full sm:px-6 lg:px-8">
          <div className="border-b border-gray-200 shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-gray-200 divide-y">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-gray-500 text-xs font-medium tracking-wider uppercase"
                  >
                    Nombre
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-gray-500 text-xs font-medium tracking-wider uppercase"
                  >
                    Fecha
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-gray-500 text-xs font-medium tracking-wider uppercase"
                  >
                    Tempteratura
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-gray-500 text-xs font-medium tracking-wider uppercase"
                  >
                    Humedad
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-gray-200 divide-y">
                {records.map((record, idx) => (
                  <tr key={`record-${idx}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img
                            className="w-10 h-10 rounded-full"
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-gray-900 text-sm">
                            {record.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-900 text-sm">
                        {record.timestamp}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-left text-gray-900 text-sm">
                        {record.temperature || 0}°
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap text-sm">
                      {record.humidity.percentage.toFixed(0) || 0}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

Records.getInitialProps = async (ctx) => {
  const res = await getAllRecords();
  return { records: res };
};
