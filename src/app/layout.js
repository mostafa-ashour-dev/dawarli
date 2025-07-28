import StylesWrapper from "@/components/providers/StylesWrapper";
import "./globals.scss";


export const metadata = {
  title: {
    default: "Edu-Findr",
    template: "%s | Edu-Findr",
  },
  description: "Search for schools and teachers in your area.",
};

import TopNavbar from "@/components/navbars/TopNavbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@200..1000&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Noto+Kufi+Arabic:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <StylesWrapper >
          <TopNavbar />
          {children}

        </StylesWrapper>
      </body>
    </html>
  );
}
