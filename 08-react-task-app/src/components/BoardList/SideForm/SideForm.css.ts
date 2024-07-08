import { style } from "@vanilla-extract/css";
import { vars } from "../../../App.css";

export const sideForm = style({
  display: "flex",
  alignItems: "center",
  marginLeft: "auto",
});

export const input = style({
  padding: vars.spacing.small,
  fontSize: vars.fongSizing.T4,
  minHeight: 30
});

export const icon = style({
    cursor: "pointer",
    color: vars.color.brightText,
    fontSize: vars.fongSizing.T2,
    marginLeft: vars.spacing.medium,
    ":hover": {
        opacity: 0.8,
    },
});