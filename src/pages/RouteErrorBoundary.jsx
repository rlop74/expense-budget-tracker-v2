import { useRouteError, isRouteErrorResponse } from "react-router-dom";

function RouteErrorBoundary() {
  const error = useRouteError();

  // Handle specific HTTP error responses (e.g., 404, 401)
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>{error.status} {error.statusText}</h1>
        <p>{error.data}</p>
      </div>
    );
  }

  // Handle general JavaScript Errors
  if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <pre>{error.stack}</pre>
      </div>
    );
  }

  return <h1>Unknown Error</h1>;
}

export default RouteErrorBoundary;