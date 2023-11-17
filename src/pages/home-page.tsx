import { AppRoutes } from "@/utils/routes";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export const HomePage: React.FC = () => {
  const { loginWithRedirect, user } = useAuth0();
  const navigate = useNavigate();
  const onLoginClick = (): void => {
    if (user) {
      navigate(AppRoutes.dashboard);
      return;
    }
    void loginWithRedirect({
      appState: {
        returnTo: AppRoutes.dashboard,
      },
    });
  };
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="flex gap-2">
        <img className="h-7 w-7" alt="gridware logo" src="/favicon.ico" />
        <div className="mb-6 font-mont text-2xl font-bold">
          Gridware Sherlock
        </div>
      </div>

      <button
        className="rounded border border-solid border-gray-400 p-1 pl-2 pr-2 text-base"
        onClick={onLoginClick}
      >
        {user ? "Continue to gridware" : "Login to Gridware"}
      </button>

      <p className="mt-14 text-sm text-gray-400">
        {import.meta.env.VITE_GIT_BRANCH_NAME}-
        {import.meta.env.VITE_GIT_COMMIT_HASH}
      </p>
    </div>
  );
};
