import React, { useEffect, useState } from "react";
import { getAllRecords } from "../services/firebase-api";
import Table from "../components/Table";
import Header from "../components/Header";

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
    <div className="">
      <Header />
      <Table items={records} />
    </div>
  );
}

Records.getInitialProps = async (ctx) => {
  const records = await getAllRecords();
  return { records: Object.values(records) };
};

Records.requireAuth = true;

export default Records;
