import React, { FC } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { clientAPI } from "../../../services/ClientService";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "../../../hooks/useSnackbar";

interface IFormInputs {
  email: string;
  client_first_name: string;
  client_phone: string;
  description: string;
}

const Content: FC = () => {
  const { t } = useTranslation();

  const [createClient, { isLoading }] =
    clientAPI.useCreateClientMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInputs>();

  const { showSnackbar, SnackbarComponent } = useSnackbar();

  const onSubmit: SubmitHandler<IFormInputs> = async (args) => {
    showSnackbar("", false, false);

    try {
      await createClient(args).unwrap();

      showSnackbar(t("clients.client_added"), false);
    } catch (err: any) {
      const dataFromError = err?.data || "An error occurred";
      showSnackbar(dataFromError, true);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6" gutterBottom margin={4}>
        {t("clients.add_client_title")}
      </Typography>

      <Stack spacing={3}>
        <Controller
          control={control}
          name="email"
          render={({ field }) => {
            return (
              <TextField
                label={`${t("clients.email")}`}
                {...field}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            );
          }}
        />

        <Controller
          control={control}
          name="client_first_name"
          rules={{
            required: "Name is required",
          }}
          render={({ field }) => {
            return (
              <TextField
                label={`${t("worker.name")} *`}
                {...field}
                error={!!errors.client_first_name}
                helperText={errors.client_first_name?.message}
              />
            );
          }}
        />

        <Controller
          control={control}
          name="client_phone"
          rules={{
            required: "Phone is required",
            minLength: {
              value: 9,
              message: "Phone must have at least 9 digits",
            },
          }}
          render={({ field }) => {
            return (
              <TextField
                label={`${t("worker.phone")} *`}
                sx={{ mb: 5 }}
                {...field}
                type="number"
                error={!!errors.client_phone}
                helperText={errors.client_phone?.message}
              />
            );
          }}
        />

        <Controller
          control={control}
          name="description"
          render={({ field }) => {
            return (
              <TextField
                label={t("worker.description")}
                multiline
                variant="outlined"
                size="small"
                rows={4}
                {...field}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            );
          }}
        />

        <SnackbarComponent />

        <LoadingButton
          disabled={isLoading}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          {t("clients.add_client_btn")}
        </LoadingButton>
      </Stack>
    </form>
  );
};

export default Content;
