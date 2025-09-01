// src/pages/ViewCreator.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import supabase from "../client.js";

export default function ViewCreator() {
  const { id } = useParams(); // from /creators/:id
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCreator = async () => {
      setLoading(true);
      setError(null);

      // Adjust table/column names if yours differ
      const { data, error } = await supabase
        .from("creators")
        .select("id, name, url, description, imageURL")
        .eq("id", id) // works for UUID or numeric id
        .single();

      if (error) setError(error.message);
      else setCreator(data);

      setLoading(false);
    };

    fetchCreator();
  }, [id]);

  return (
    <section className="mx-auto max-w-3xl px-6 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Creator Details</h2>
        <div className="flex gap-3">
          <Link to="/" className="btn btn-outline">← Back</Link>
          {creator && (
            <Link to={`/creators/${creator.id}/edit`} className="btn btn-primary">
              Edit
            </Link>
          )}
        </div>
      </div>

      {loading && <p>Loading creator…</p>}

      {!loading && error && (
        <p className="text-red-600">Couldn’t load creator: {error}</p>
      )}

      {!loading && !error && !creator && (
        <p className="text-gray-600">Creator not found.</p>
      )}

      {!loading && !error && creator && (
        <article className="card bg-base-100 shadow-sm">
          {creator.imageURL && (
            <figure className="p-6">
              <img
                src={creator.imageURL}
                alt={`${creator.name}'s preview`}
                className="rounded-xl max-h-[420px] object-cover w-full"
              />
            </figure>
          )}

          <div className="card-body">
            <h3 className="card-title text-3xl">{creator.name}</h3>

            {creator.description && (
              <p className="text-base opacity-90">{creator.description}</p>
            )}

            {creator.url && (
              <a
                href={creator.url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary w-fit"
              >
                Visit Channel
              </a>
            )}
          </div>
        </article>
      )}
    </section>
  );
}
