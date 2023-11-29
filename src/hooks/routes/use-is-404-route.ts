import { matchRoutes } from "react-router-dom";

type UseIs404RouteProps = {
  path: string;
  element: JSX.Element;
}[];

export const useShowSideBar = (pathData: UseIs404RouteProps) => {
  const pathsToMatch = pathData.map((data) => {
    return {
      path: data.path,
    };
  });
  const matchedRoutes = matchRoutes(pathsToMatch, window.location.pathname);
  return (
    matchedRoutes?.[0].route.path !== "*" &&
    location.pathname.startsWith("/dashboard")
  );
};
