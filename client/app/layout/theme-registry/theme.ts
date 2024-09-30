import { createTheme } from "@mui/material";

import {
  borderRadii,
  boxShadows,
  components,
  dropShadows,
  palette,
  shadows,
  typography,
} from "../theme";

/**
 * Custom MUI theme can be defined here.
 * @see https://material-ui.com/customization/default-theme/
 * @example https://github.com/hashintel/hash/blob/main/libs/%40hashintel/design-system/src/theme.ts
 */
export const theme = createTheme({
  palette,
  typography,
  shadows,
  borderRadii,
  boxShadows,
  dropShadows,
  components,
});
