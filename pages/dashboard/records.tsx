import React from "react";
import { getAllRecords } from "../../services/firebase-api";
import Table, { RecordsProps } from "../../components/RecordsTable";
import DashboardLayout from "../../components/dashboard/Layout";

function Records({ items }: RecordsProps) {
  const sortedRecords = items.sort((r1, r2) => {
    const t1 = new Date(r1.timestamp).getTime();
    const t2 = new Date(r2.timestamp).getTime();
    return t2 - t1;
  });
  return (
    <DashboardLayout>
      <Table items={sortedRecords} />
    </DashboardLayout>
  );
}

Records.getInitialProps = async (ctx: any) => {
  const records = await getAllRecords();
  return { items: Object.values(records) };
};

Records.requireAuth = true;

export default Records;
