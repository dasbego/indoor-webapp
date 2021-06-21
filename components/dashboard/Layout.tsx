import * as React from "react";
import Header from "../../components/Header";
import Container from "../../components/Container";
import Drawer from "../../components/dashboard/Drawer";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

export interface DashboardLayoutProps {
  children: JSX.Element;
}
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    paddingLeft: "1rem",
    paddingTop: "1rem",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const DashboardLayout: React.FC<DashboardLayoutProps> = (props) => {
  const [open, setOpen] = React.useState(true);
  const classes = useStyles();
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <Header isDrawerOpen={open} handleDrawerOpen={handleDrawerOpen} />
      <Drawer open={open} handleDrawerClose={handleDrawerClose} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container>
          <div>{props.children}</div>
        </Container>
      </main>
    </div>
  );
};

export default DashboardLayout;
