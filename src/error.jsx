import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <div id="error">
        <h1>Oops!</h1>
        <p className="error-text">Sorry, an unexpected error has occurred.</p>
        <p>
          <i className="error-message">{error.statusText || error.message}</i>
        </p>
        <p className="back-link">
          <Link to="/" style={{ textDecoration: "none" }}>
            Geaux Back Home
          </Link>
        </p>
      </div>
    </div>
  );
}
