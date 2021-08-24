export const getParams = (options: { testnet: boolean; page?: number }): URLSearchParams => {
  const paginationParams =
    options.page !== undefined
      ? {
          page: options.page.toString() ?? '1',
        }
      : undefined;
  return new URLSearchParams({
    network: options.testnet ? 'testnet' : 'mainnet',
    ...paginationParams,
  });
};
