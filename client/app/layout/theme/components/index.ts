import { ThemeOptions } from "@mui/material";

import { MuiIconButtonThemeOptions } from "./data-display/mui-icon-button-theme-options";
import { MuiListItemButtonThemeOptions } from "./data-display/mui-list-item-button-theme-options";
import { MuiListItemIconThemeOptions } from "./data-display/mui-list-item-icon-theme-options";
import { MuiListItemSecondaryActionThemeOptions } from "./data-display/mui-list-item-secondary-action-theme-options";
import { MuiListItemTextThemeOptions } from "./data-display/mui-list-item-text-theme-options";
import { MuiTypographyThemeOptions } from "./data-display/mui-typography-theme-options";
import { MuiSkeletonThemeOptions } from "./feedback/mui-skeleton-theme-options";
import { MuiButtonThemeOptions } from "./inputs/mui-button-theme-options";
import { MuiCheckboxThemeOptions } from "./inputs/mui-checkbox-theme-options";
import { MuiInputBaseThemeOptions } from "./inputs/mui-input-base-theme-options";
import { MuiInputLabelThemeOptions } from "./inputs/mui-input-label-theme-options";
import { MuiOutlinedInputThemeOptions } from "./inputs/mui-outlined-input-theme-options";
import { MuiContainerThemeOptions } from "./layout/mui-container-theme-options";
import { MuiLinkThemeOptions } from "./navigation/mui-link-theme-options";
import { MuiCssBaselineThemeOptions } from "./utils/mui-css-baseline-theme-options";

export const components: ThemeOptions["components"] = {
  // TODO: Add more custom components here.
  /** ===== LAYOUT ===== */
  MuiContainer: MuiContainerThemeOptions,

  /** ===== NAVIGATION ===== */
  MuiLink: MuiLinkThemeOptions,

  /** ===== UTILS ===== */
  MuiCssBaseline: MuiCssBaselineThemeOptions,

  /** ===== INPUTS ==== */
  MuiButton: MuiButtonThemeOptions,
  MuiCheckbox: MuiCheckboxThemeOptions,
  MuiOutlinedInput: MuiOutlinedInputThemeOptions,
  MuiInputLabel: MuiInputLabelThemeOptions,
  MuiInputBase: MuiInputBaseThemeOptions,

  /** ===== DATA DISPLAY ===== */
  MuiIconButton: MuiIconButtonThemeOptions,
  MuiListItemButton: MuiListItemButtonThemeOptions,
  MuiListItemText: MuiListItemTextThemeOptions,
  MuiListItemIcon: MuiListItemIconThemeOptions,
  MuiListItemSecondaryAction: MuiListItemSecondaryActionThemeOptions,
  MuiTypography: MuiTypographyThemeOptions,

  /** ===== FEEDBACK ===== */
  MuiSkeleton: MuiSkeletonThemeOptions,
};
