import { ReactNode } from "react";
import Image from "next/image";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <style>{globalStyles}</style>
      </head>
      <body>
        <header style={styles.header}>
          <Image src="/Senegal-1.png" alt="logo" width={120} height={40} />
          <h1 style={styles.title}>
            Gestionnaire de Mots de Passe - Super Admin
          </h1>
        </header>
        <main style={styles.main}>{children}</main>
      </body>
    </html>
  );
}

// Global styles
const globalStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
  }
  body {
    background-color: #f4f4f9;
    color: #333;
  }
`;

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    backgroundColor: "#0070f3",
    color: "#fff",
    padding: "1rem",
    textAlign: "center",
  },
  title: {
    fontSize: "1.8rem",
  },
  main: {
    padding: "2rem",
    display: "flex",
    justifyContent: "center",
  },
};
