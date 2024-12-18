import {
  Palette as MuiPallete,
  PaletteOptions as MuiPaletteOptions,
} from "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
  interface Palette extends MuiPallete {
    altColors: { background: string };
  }

  interface PaletteOptions extends MuiPaletteOptions {
    altColors?: { background: string; secondaryBackgound: string };
  }
}
