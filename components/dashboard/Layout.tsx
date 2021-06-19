import * as React from "react";
import Header from "../../components/Header";
import Container from "../../components/Container";

export interface DashboardLayoutProps {
  children: JSX.Element;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = (props) => {
  return (
    <div>
      <Header />
      <Container>{props.children}</Container>
    </div>
  );
};

export default DashboardLayout;
