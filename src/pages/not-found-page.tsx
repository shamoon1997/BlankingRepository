import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="mb-6 font-mont text-2xl font-bold">Oops!</div>

      <p className="pb-8 text-base text-gray-400">
        We could not find the page you were looking for.
      </p>

      <button
        onClick={() => {
          // state.idx is a private api, it can break if react-routers-version is changed
          // please keep the version same, but if you need to update the version make sure idx is present
          // otherwise you will need to figure out some other way to check if we have a previous route to go back to
          if (window.history.state && window.history.state.idx > 0) {
            navigate(-1);
          } else {
            navigate("/", { replace: true });
          }
        }}
        className="rounded border border-solid border-gray-400 p-1 pl-2 pr-2 text-base disabled:cursor-not-allowed"
      >
        Go back to dashboard
      </button>
    </div>
  );
};
