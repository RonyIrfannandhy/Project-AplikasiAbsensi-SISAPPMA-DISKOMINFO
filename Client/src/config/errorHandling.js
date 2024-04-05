export function isUnauthorizedError(error) {
    return error.response && (error.response.status === 401 || error.response.status === 403);
  }
  