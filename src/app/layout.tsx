import "./globals.css";
import {Metadata} from "next";

export const metadata: Metadata = {
  description: 'Maksym Akulov portfolio',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  const style = "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap";
  return (
    <html lang="en">
    <head>
      <title>Maksym Akulov</title>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com"/>
      <link
        href={style}
        rel="stylesheet"
      />
    </head>
    <body
      className={`flex flex-col justify-center items-center default`}>{children}</body>
    </html>
  );
}
