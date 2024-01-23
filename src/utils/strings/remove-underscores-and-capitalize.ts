import * as _ from "lodash";

export const removeUnderscoreAndCapitalize = (str: string): string => {
  return _.capitalize(_.replace(str, "_", " "));
};
