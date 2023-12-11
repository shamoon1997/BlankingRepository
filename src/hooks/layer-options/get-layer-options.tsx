import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { z, ZodError } from "zod";

const LayerOptions = z.enum(["equipment", "heatmap"]);
export type LayerOptionsType = z.infer<typeof LayerOptions>;

export const useLayerOptions = (): LayerOptionsType | null => {
  const [gridscopeOptions, setGridscopeOptions] =
    useState<LayerOptionsType | null>(null);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const optionsParam = searchParams.get("layer");

    try {
      const parsedOptions = LayerOptions.parse(optionsParam);
      setGridscopeOptions(parsedOptions);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Invalid layer option:", error.errors);
        setGridscopeOptions(null);
      }
    }
  }, [location]);

  return gridscopeOptions;
};
