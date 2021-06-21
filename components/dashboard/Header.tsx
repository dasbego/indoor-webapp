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
        <div className="flex justify-start lg:flex-1 lg:w-0">
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
        <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
          {!user && (
            <>
              <Link href="/login">
                <a className="text-gray-500 hover:text-gray-900 whitespace-nowrap text-base font-medium">
                  Log in
                </a>
              </Link>
              <Link href="/signup">
                <a className="inline-flex items-center justify-center ml-8 px-4 py-2 text-white whitespace-nowrap text-base font-medium bg-indigo-500 hover:bg-indigo-700 border border-transparent rounded-md shadow-sm">
                  Sign up
                </a>
              </Link>
            </>
          )}
          {user && (
            <>
              <span className="text-gray-500 hover:text-gray-900 whitespace-nowrap text-base font-medium">
                Bienvenido <b>{user.email}</b>
              </span>
              <Button
                onClick={() => logout()}
                className="inline-flex items-center justify-center ml-8 px-4 py-2 text-white whitespace-nowrap text-base font-medium bg-indigo-500 hover:bg-indigo-700 border border-transparent rounded-md shadow-sm"
              >
                Log out
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
