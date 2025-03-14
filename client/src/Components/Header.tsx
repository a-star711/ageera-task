import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { isAuthenticated } = useAuth();
  const username = "User";

  return (
    <header
      style={{
        background: "#172b4d",
        padding: "15px",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <img
        src="src/assets/logo.png"
        style={{ width: "143px", height: "45px" }}
        alt="Logo"
      />
      {isAuthenticated && (
        <div style={{ fontSize: "16px", fontWeight: 600 }}>
          Welcome, {username}
        </div>
      )}
    </header>
  );
}
