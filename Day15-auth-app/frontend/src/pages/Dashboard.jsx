import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Dashboard() {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/api/protected");
        setMessage(res.data.message);
        setUser(res.data.user);
      } catch (e) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };
    load();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card w-full max-w-lg text-center">
        <h1 className="text-2xl font-semibold mb-2">{message || "Dashboard"}</h1>
        {user && (
          <p className="text-gray-600 mb-6">
            Signed in as <span className="font-medium">{user.email}</span>
          </p>
        )}
        <div className="flex items-center justify-center gap-3">
          <button onClick={logout} className="btn-primary">Logout</button>
        </div>
      </div>
    </div>
  );
}
