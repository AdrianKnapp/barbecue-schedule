const getUserIdFromHeaders = (request: Request) => {
  const headers = new Headers(request.headers);
  const userId = headers.get('user-id');

  if (!userId || userId === 'undefined' || userId.length === 0) {
    return undefined;
  }

  return userId;
};

export default getUserIdFromHeaders;
