import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <h1 className="code">404</h1>
      <p className="message">Oops! Page not found</p>
      <p className="description">
        The page you are looking for might have been removed or is temporarily unavailable.
      </p>
      <button className="back-button" onClick={() => navigate("/")}>
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
