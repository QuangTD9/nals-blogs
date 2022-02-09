export const getAppConfig = () => {
  return {
    page: {
      titleTemplate: (page?: string) => (page ? `${page} | NALS` : "NALS"),
    },
  }
}
