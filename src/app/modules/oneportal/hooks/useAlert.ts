import { ProviderContext, useSnackbar } from "notistack"

export const useAlert = (): ProviderContext["enqueueSnackbar"] => useSnackbar().enqueueSnackbar
