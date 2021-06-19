import * as React from "react";
import DashboardLayout from "../../components/dashboard/Layout";

export interface DashboardProps {
  children: JSX.Element;
}

const Dashboard: React.FC<DashboardProps> = (props) => {
  return <DashboardLayout>{props.children}</DashboardLayout>;
};

export default Dashboard;
