import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";
import { execSync } from "child_process";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/

export default () => {
  const branchName = execSync("git rev-parse --abbrev-ref HEAD")
    .toString()
    .trimEnd();
  const commitHash = execSync("git rev-parse --short HEAD")
    .toString()
    .trimEnd();
  process.env.VITE_GIT_BRANCH_NAME = branchName;
  process.env.VITE_GIT_COMMIT_HASH = commitHash;
  return {
    plugins: [svgr({ include: "**/*.svg" }), react(), tailwindcss()],
    resolve: { alias: { "@": path.resolve(__dirname, "./src/") } },
  };
};
