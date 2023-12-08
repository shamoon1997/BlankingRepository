import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useLayerOptions = (): string | null => {
  const [gridscopeOptions, setGridscopeOptions] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const optionsParam = searchParams.get("layer");
    setGridscopeOptions(optionsParam);
  }, [location]);

  return gridscopeOptions;
};
