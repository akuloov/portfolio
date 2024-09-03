import "./globals.css";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: 'Maksym Akulov',
  description: 'Maksym Akulov portfolio',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com"/>
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap"
        rel="stylesheet"
      />
    </head>
    <body
      className={`flex flex-col justify-center items-center default`}>{children}</body>
    </html>
  );
}
