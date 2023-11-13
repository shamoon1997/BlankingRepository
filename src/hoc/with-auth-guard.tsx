import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";

export const AuthenticationGuard = ({
  component,
}: {
  component: React.FC<unknown>;
}): JSX.Element => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: (): JSX.Element => (
      <div className="page-layout">
        <div>Loading....</div>
      </div>
    ),
  });

  return <Component />;
};
