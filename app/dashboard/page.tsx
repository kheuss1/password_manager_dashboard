"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface PasswordEntry {
  _id: string;
  userId: string;
  website: string;
  login: string;
  password: string;
}

const DashboardPage: React.FC = () => {
  const [passwords, setPasswords] = useState<PasswordEntry[]>([]);
  const [filteredPasswords, setFilteredPasswords] = useState<PasswordEntry[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Définit le nombre d'éléments par page
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = passwords.filter((entry) =>
      entry.website.toLowerCase().includes(value)
    );
    setFilteredPasswords(filtered);
    setCurrentPage(1); // Réinitialiser à la première page après une recherche
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
        setPasswords(response.data);
        setFilteredPasswords(response.data);
      } catch (error) {
        console.error("Erreur de chargement des mots de passe", error);
        alert("Erreur de chargement des mots de passe");
      }
    };

    fetchPasswords();
  }, []);

  // Calcule les données pour la pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPasswords.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredPasswords.length / itemsPerPage);

  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Tableau de Bord - Super Admin</h2>
      <button style={styles.logoutButton} onClick={handleLogout}>
        Déconnexion
      </button>

      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher par site"
        value={searchTerm}
        onChange={handleSearch}
        style={styles.searchInput}
      />

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.header}>Utilisateur</th>
            <th style={styles.header}>Site</th>
            <th style={styles.header}>Login</th>
            <th style={styles.header}>Mot de Passe</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((entry) => (
            <tr key={entry._id || Math.random().toString()}>
              <td style={styles.cell}>{entry.userId}</td>
              <td style={styles.cell}>{entry.website}</td>
              <td style={styles.cell}>{entry.login}</td>
              <td style={styles.cell}>{entry.password}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div style={styles.pagination}>
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          style={styles.pageButton}
        >
          Précédent
        </button>
        <span>
          Page {currentPage} sur {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          style={styles.pageButton}
        >
          Suivant
        </button>
      </div>
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
  searchInput: {
    marginBottom: "1rem",
    padding: "0.5rem",
    width: "100%",
    maxWidth: "300px",
    borderRadius: "5px",
    border: "1px solid #ddd",
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
  pagination: {
    marginTop: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  pageButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
  },
};
