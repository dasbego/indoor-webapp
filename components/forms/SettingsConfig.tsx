import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Card,
  Container,
  CardContent,
  CardHeader,
  Typography,
} from "@material-ui/core";

type SettingsConfigProps = {};

const useStyles = makeStyles((theme) => ({
  form: {
    margin: "1rem",
  },
  textField: {
    marginBottom: "1rem",
  },
  subheader: {
    display: "flex",
    alignItems: "center",
  },
}));

export default function SettingsConfig(props: SettingsConfigProps) {
  const classes = useStyles();
  return (
    <Card className={classes.form}>
      <CardHeader
        subheader={
          <>
            <div className={classes.subheader}>
              <img src="https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/favicon.ico" />
              <Typography variant="subtitle1">Llaves de Firebase</Typography>
            </div>
            <Typography variant="subtitle2">
              Obten esta configuración desde tu cuenta de Firebase
            </Typography>
          </>
        }
      />
      <CardContent>
        <form>
          <TextField
            id="projectid"
            name="projectid"
            type="text"
            required
            placeholder="ie. myIndoorProject"
            label="Project ID"
            variant="outlined"
            autoFocus
            fullWidth
            className={classes.textField}
          />
          <TextField
            id="auth_domain"
            name="auth_domain"
            type="text"
            required
            placeholder="Auth Domain"
            label="Auth Domain"
            variant="outlined"
            autoFocus
            fullWidth
            className={classes.textField}
          />
          <TextField
            id="api_key"
            name="api_key"
            type="text"
            required
            placeholder="API Key"
            label="API Key"
            variant="outlined"
            onChange={(e: any) => {}}
            autoFocus
            fullWidth
            className={classes.textField}
          />
          <TextField
            id="database_url"
            name="database_url"
            type="text"
            required
            placeholder="Database URL"
            label="Database URL"
            variant="outlined"
            onChange={(e: any) => {}}
            autoFocus
            fullWidth
            className={classes.textField}
          />
          <TextField
            id="Storage Bucket"
            name="Storage Bucket"
            type="text"
            required
            placeholder="Storage Bucket"
            label="Storage Bucket"
            variant="outlined"
            onChange={(e: any) => {}}
            autoFocus
            fullWidth
            className={classes.textField}
          />
          <TextField
            id="Sender ID"
            name="Sender ID"
            type="text"
            required
            placeholder="Sender ID"
            label="Sender ID"
            variant="outlined"
            onChange={(e: any) => {}}
            autoFocus
            fullWidth
            className={classes.textField}
          />
          <TextField
            id="App ID"
            name="App ID"
            type="text"
            required
            placeholder="App ID"
            label="App ID"
            variant="outlined"
            onChange={(e: any) => {}}
            autoFocus
            fullWidth
            className={classes.textField}
          />
          <TextField
            id="Measurement ID"
            name="Measurement ID"
            type="text"
            required
            placeholder="Measurement ID"
            label="Measurement ID"
            variant="outlined"
            onChange={(e: any) => {}}
            autoFocus
            fullWidth
            className={classes.textField}
          />
          <Button variant="contained" color="primary">
            Guardar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
