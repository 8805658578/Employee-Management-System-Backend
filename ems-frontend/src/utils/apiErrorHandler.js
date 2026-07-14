export const getApiErrorMessage = (error) => {
  if (!error) {
    return "An unexpected error occurred.";
  }

  if (error.code === "ECONNABORTED") {
    return "Request timed out. Please try again.";
  }

  if (!error.response) {
    return "Unable to connect to the server. Please check your internet connection.";
  }

  switch (error.response.status) {
    case 400:
      return (
        error.response.data?.message ||
        "Invalid request."
      );

    case 401:
      return "Your session has expired. Please login again.";

    case 403:
      return "You are not authorized to perform this action.";

    case 404:
      return (
        error.response.data?.message ||
        "Requested resource not found."
      );

    case 409:
      return (
        error.response.data?.message ||
        "Resource already exists."
      );

    case 422:
      return (
        error.response.data?.message ||
        "Validation failed."
      );

    case 500:
      return "Internal server error.";

    default:
      return (
        error.response.data?.message ||
        "Something went wrong."
      );
  }
};