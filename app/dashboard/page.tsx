"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface PasswordEntry {
  _id?: string; // Définit _id comme optionnel
  userId: string;
  website: string;
  password: string;
}

const DashboardPage: React.FC = () => {
  const [passwords, setPasswords] = useState<PasswordEntry[]>([]);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  useEffect(() => {
    const fetchPasswords = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Accès non autorisé");
        router.push("/login");
        return;
      }

      try {
        const response = await axios.get<PasswordEntry[]>(
          "http://localhost:3001/get-passwords",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Affiche les données reçues pour vérifier la présence de _id
        console.log("Données reçues :", response.data);

        setPasswords(response.data);
      } catch (error) {
        console.error("Erreur de chargement des mots de passe", error);
        alert("Erreur de chargement des mots de passe");
      }
    };

    fetchPasswords();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Tableau de Bord - Super Admin</h2>
      <button style={styles.logoutButton} onClick={handleLogout}>
        Déconnexion
      </button>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.header}>Utilisateur</th>
            <th style={styles.header}>Site</th>
            <th style={styles.header}>Mot de Passe</th>
          </tr>
        </thead>
        <tbody>
          {passwords.map((entry, index) => (
            <tr key={entry._id ? entry._id.toString() : `temp-${index}`}>
              <td style={styles.cell}>{entry.userId}</td>
              <td style={styles.cell}>{entry.website}</td>
              <td style={styles.cell}>{entry.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardPage;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#f4f4f9",
    minHeight: "100vh",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1rem",
    color: "#333",
  },
  logoutButton: {
    marginBottom: "1.5rem",
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#d9534f",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    maxWidth: "800px",
    borderCollapse: "collapse",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#0070f3",
    color: "#fff",
    fontWeight: "bold",
    padding: "1rem",
    textAlign: "left",
    borderBottom: "2px solid #eaeaea",
  },
  cell: {
    padding: "1rem",
    borderBottom: "1px solid #eaeaea",
    color: "#333",
    textAlign: "left",
  },
};
