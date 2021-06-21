import React, { useState } from "react";
import firebaseClient from "../firebase/client";
import firebase from "firebase/app";
import "firebase/auth";
import Alert from "../components/Alert";
import { useAuth } from "../contexts/Auth";
import { useRouter } from "next/router";
import {
  TextField,
  Button,
  Card,
  Container,
  CardContent,
} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "5rem",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textField: {
    marginBottom: "1rem",
  },
}));

type LoginProps = {};

const Login = (props: LoginProps) => {
  firebaseClient();
  const classes = useStyles();
  const { user, initializing } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [pwd, setPwd] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (initializing) return null;

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginUser(event);
  };

  const loginUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await firebase
      .auth()
      .signInWithEmailAndPassword(email || "", pwd || "")
      .then((response) => {
        router.push("/dashboard/records");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const registerUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email && pwd) {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email || "", pwd || "")
        .then((e) => {
          window.location.href = "/";
        })
        .catch((error) => {
          const message = error.message;
          console.log(message);
        });
    }
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <Card>
        <CardContent className={classes.cardContent}>
          <img
            className="mx-auto w-auto h-12"
            src="https://image.freepik.com/vector-gratis/cannabis-vintage-weed-logo_228886-336.jpg"
            alt="Workflow"
            width="250px"
          />
          <h2 className="mt-6 text-center text-gray-900 text-3xl font-extrabold">
            Bienvenido a Indoor v1
          </h2>
          <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Usuario"
                  variant="outlined"
                  onChange={(e: any) => setEmail(e.currentTarget.value)}
                  autoComplete="email"
                  autoFocus
                  fullWidth
                  className={classes.textField}
                />
              </div>
              <div>
                <TextField
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Contraseña"
                  variant="outlined"
                  onChange={(e: any) => setPwd(e.currentTarget.value)}
                  fullWidth
                  className={classes.textField}
                />
              </div>
            </div>

            {error && <Alert variant="error" items={[error]} />}
            <div className="flex items-center justify-between">
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recuérdame"
              />

              {/*<div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Olvidaste tu contraseña
              </a>
              </div>*/}
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
            >
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
