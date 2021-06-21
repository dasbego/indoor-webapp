import React from "react";
import DashboardLayout from "../../components/dashboard/Layout";
import SettingsConfigForm from "../../components/forms/SettingsConfig";
import { Typography } from "@material-ui/core";

type SettingsProps = {};

export default function Settings(props: SettingsProps) {
  return (
    <DashboardLayout>
      <div>
        <Typography variant="h2">Configuración de cuenta</Typography>
        <SettingsConfigForm />
      </div>
    </DashboardLayout>
  );
}
