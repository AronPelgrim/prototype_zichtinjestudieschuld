export const metadata = {
  title: "ZichtInJeStudieschuld",
};

import "../styles/Global.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://use.typekit.net/blx5jvp.css"
        ></link>
      </head>
      <body>{children}</body>
    </html>
  );
}
