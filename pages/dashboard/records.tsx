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
  return (
    <DashboardLayout>
      <Table items={records} />
    </DashboardLayout>
  );
}

Records.getInitialProps = async (ctx) => {
  const records = await getAllRecords();
  return { records: Object.values(records) };
};

Records.requireAuth = true;

export default Records;
