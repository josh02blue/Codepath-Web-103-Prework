// pages/EditCreator.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../client"; // default export

export default function EditCreator() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    url: "",
    description: "",
    imageURL: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  // Load one creator
  useEffect(() => {
    const fetchOne = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .eq("id", id)
        .single();

      if (error) setError(error.message);
      else
        setForm({
          name: data?.name ?? "",
          url: data?.url ?? "",
          description: data?.description ?? "",
          imageURL: data?.imageURL ?? "",
        });

      setLoading(false);
    };

    fetchOne();
  }, [id]);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  // Update
  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const { error } = await supabase
      .from("creators")
      .update(form)
      .eq("id", id);

    setSaving(false);
    if (error) return setError(error.message);

    navigate(`/creators/${id}`); // back to the view page
  };

  // DELETE
  const onDelete = async () => {
    if (!confirm("Delete this creator? This cannot be undone.")) return;
    setDeleting(true);
    setError(null);

    const { error } = await supabase.from("creators").delete().eq("id", id);

    setDeleting(false);
    if (error) return setError(error.message);

    navigate("/"); // go back to list
  };

  if (loading) return <p className="px-6 py-8">Loading…</p>;

  return (
    <section className="mx-auto max-w-2xl px-6 py-8">
      <h2 className="text-2xl font-bold mb-6">Edit Creator</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={onSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="Name"
          className="input input-bordered w-full"
          required
        />
        <input
          name="url"
          value={form.url}
          onChange={onChange}
          placeholder="Channel URL"
          className="input input-bordered w-full"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          rows={4}
        />
        <input
          name="imageURL"
          value={form.imageURL}
          onChange={onChange}
          placeholder="Image URL (optional)"
          className="input input-bordered w-full"
        />

        <div className="flex gap-3">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Saving…" : "Save changes"}
          </button>
          <button type="button" className="btn btn-outline" onClick={() => navigate(-1)}>
            Cancel
          </button>

          <div className="flex-1" />

          <button
            type="button"
            className="btn btn-error"
            onClick={onDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting…" : "Delete"}
          </button>
        </div>
      </form>
    </section>
  );
}

