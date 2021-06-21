/* This example requires Tailwind CSS v2.0+ */
import React from "react";
import Link from "next/link";
import { useAuth } from "../../contexts/Auth";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { drawerWidth } from "./Drawer";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
}));

type HeaderProps = {
  isDrawerOpen: boolean;
  handleDrawerOpen: () => void;
};

export default function Header({
  isDrawerOpen,
  handleDrawerOpen,
}: HeaderProps) {
  const classes = useStyles();
  const { user, logout } = useAuth();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, isDrawerOpen && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <div>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              isDrawerOpen && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
        </div>
        <div className="">
          {!user && (
            <>
              <Link href="/login">Log in</Link>
              <Link href="/signup">Sign up</Link>
            </>
          )}
          {user && (
            <>
              <span>
                Bienvenido <b>{user.email}</b>
              </span>
              <Button onClick={() => logout()}>Log out</Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
