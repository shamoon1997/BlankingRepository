import { AppRoutes } from "@/utils/routes";
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="mb-6 font-mont text-2xl font-bold">Oops!</div>

      <p className="pb-8 text-base text-gray-400">
        We could not find the page you were looking for.
      </p>

      <Link
        to={AppRoutes.dashboard}
        className="rounded border border-solid border-gray-400 p-1 pl-2 pr-2 text-base disabled:cursor-not-allowed"
      >
        Go back to dashboard
      </Link>
    </div>
  );
};
