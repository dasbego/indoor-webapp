import React, { useEffect, useState } from "react";
import { getAllRecords } from "../../services/firebase-api";
import Table from "../../components/Table";
import DashboardLayout from "../../components/dashboard/Layout";

export type Record = {
  name: string;
  humidity?: {
    raw: number;
    percentage: number;
  };
  temperature?: number;
  timestamp: string;
};

function Records({ records }: any) {
  const sortedRecords = records.sort((r1, r2) => {
    const t1 = new Date(r1.timestamp);
    const t2 = new Date(r2.timestamp);
    return t2 - t1;
  });
  return (
    <DashboardLayout>
      <Table items={sortedRecords} />
    </DashboardLayout>
  );
}

Records.getInitialProps = async (ctx) => {
  const records = await getAllRecords();
  return { records: Object.values(records) };
};

Records.requireAuth = true;

export default Records;
