// @todo use more descriptive names instead of --step-1, --step-2
// wouldn't need this when this is in

import { Components } from "@mui/material";

import { customColors } from "../../palette";
import { fluidFontClassName, fluidTypographyStyles } from "./fluid-fonts";

const typographyVariableSelector = `:root, .${fluidFontClassName}`;

export const MuiCssBaselineThemeOptions: Components["MuiCssBaseline"] = {
  styleOverrides: `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }


          html {
            scroll-behavior: smooth;
          }

          body {
            background: ${customColors.gray[100]};
            overflow-x: hidden !important;
          }          

          body, p {
            font-size: var(--step-0);
            font-weight: 400;
            line-height: 1.7;
            color: ${customColors.white};
          }

          a {
            text-decoration: none;
          }

          ${fluidTypographyStyles(typographyVariableSelector)}
        `,
};
