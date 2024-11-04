import localFont from "next/font/local";

export const universFont = localFont({
  src: [
    {
      path: "./UniversBold.ttf",
      style: "normal",
      weight: "700",
    },
    {
      path: "./UniversRegular.ttf",
      style: "normal",
      weight: "400",
    },
    {
      path: "./UniversLight.ttf",
      style: "normal",
      weight: "300",
    },
  ],
  variable: "--font-univers",
});