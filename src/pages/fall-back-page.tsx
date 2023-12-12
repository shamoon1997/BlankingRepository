import React from "react";

interface FallBackPageProps {
  error?: string;
}

export const FallBackPage: React.FC<FallBackPageProps> = ({ error }) => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="mb-6 font-mont text-2xl font-bold">Oops!</div>

      <div className="pb-8 text-base text-gray-400">
        something went wrong in application {error?.toString()}
      </div>
    </div>
  );
};
