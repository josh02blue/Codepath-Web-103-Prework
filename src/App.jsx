import { Link, Navigate, useRoutes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ShowAllCreator from "./pages/ShowAllCreator";
import AddCreator from "./pages/AddCreator";
import ViewCreator from "./pages/ViewCreator";
import EditCreator from "./pages/EditCreator";
import supabase from "./client.js";

export default function App() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  const fetchCreators = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("creators")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) setError(error.message);
    else setCreators(data ?? []);
    setLoading(false);
  };

  // Initial load
  useEffect(() => {
    fetchCreators();
  }, []);

  // Refetch when navigating back to the home page
  useEffect(() => {
    if (location.pathname === "/") fetchCreators();
  }, [location.pathname]);

  const element = useRoutes([
    { path: "/", element: <ShowAllCreator creators={creators} loading={loading} error={error} /> },
    { path: "/creators/new", element: <AddCreator /> },
    { path: "/creators/:id", element: <ViewCreator /> },
    { path: "/creators/:id/edit", element: <EditCreator /> },
    { path: "*", element: <Navigate to="/" replace /> },
  ]);

  return (
    <>
      <header style={{ padding: "1rem 0" }}>
        <strong style={{display: "flex", justifyContent: "Center", margin:"20px", fontSize: "100px"}}>Creatorverse</strong>
        <nav style={{ display: "flex", gap: "1rem", fontSize: "40px", justifyContent: "space-evenly" }}>
          <Link to="/">Home</Link>
          <Link to="/creators/new">Add Creator</Link>
        </nav>
      </header>

      <main style={{ paddingTop: "1rem" }}>{element}</main>
    </>
  );
}


