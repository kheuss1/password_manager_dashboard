import Link from "next/link";

const HomePage: React.FC = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>
        Bienvenue sur le Gestionnaire de Mots de Passe
      </h2>
      <p style={styles.description}>
        Connectez-vous pour accéder au tableau de bord et gérer vos mots de
        passe.
      </p>
      <Link href="/login">
        <button style={styles.loginButton}>Connexion</button>
      </Link>
    </div>
  );
};

export default HomePage;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
    color: "#333",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  description: {
    fontSize: "1.2rem",
    marginBottom: "2rem",
  },
  loginButton: {
    padding: "0.8rem 2rem",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#0070f3",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
