export const errorMessage = (error?: any): string | void => {
  if (error?.data?.errors?.length) {
    return error.data?.errors[0].message.replace(/.*?:\s?/, '');
  } else if (
    error?.error?.data?.message ||
    error?.data?.message ||
    error?.error?.message ||
    error?.message
  ) {
    return (
      error?.error?.data?.message ||
      error?.data?.message ||
      error?.error?.message ||
      error?.message
    );
  }
  return 'An error occurred';
};
