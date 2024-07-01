import { createContext } from "react";
import { SizeType } from ".";

export interface ConfigContextType {
  space?: {
    size?: SizeType;
  };
}

export const ConfigContext = createContext<ConfigContextType>({});
