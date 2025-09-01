import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../client.js"; // ensure client.js exports default supabase

export default function AddCreator() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    url: "",
    description: "",
    imageURL: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    // Basic validation
    if (!form.name.trim() || !form.url.trim() || !form.description.trim()) {
      setError("Name, URL, and Description are required.");
      setSubmitting(false);
      return;
    }

    // Optional imageURL -> null if empty
    const payload = {
      name: form.name.trim(),
      url: form.url.trim(),
      description: form.description.trim(),
      imageURL: form.imageURL.trim() || null,
    };

    const {data, error} = await supabase.from("creators").insert(payload).select().single();

    if (error) {
      setError(error.message);
      setSubmitting(false);
      return;
    }

    // Success! Go back to the home page (or navigate to `/creators/${data.id}`)
    navigate("/");
  };

  return (
    <section className="mx-auto max-w-2xl px-6 py-8">
      <h2 className="text-2xl font-bold mb-6">Add a Content Creator</h2>

      {error && <p className="mb-4 text-red-600">Error: {error}</p>}

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="label">
            <span className="label-text">Name *</span>
          </label>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            className="input input-bordered w-full"
            placeholder="e.g., Nexpo"
            required
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Channel URL *</span>
          </label>
          <input
            name="url"
            value={form.url}
            onChange={onChange}
            type="url"
            className="input input-bordered w-full"
            placeholder="https://www.youtube.com/@Nexpo"
            required
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Description *</span>
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            className="textarea textarea-bordered w-full"
            rows={4}
            placeholder="What kind of content do they make?"
            required
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Image URL (optional)</span>
          </label>
          <input
            name="imageURL"
            value={form.imageURL}
            onChange={onChange}
            className="input input-bordered w-full"
            placeholder="https://… or data:image/jpeg;base64,…"
          />
        </div>

        <div className="pt-2">
          <button disabled={submitting} className="btn btn-primary">
            {submitting ? "Adding…" : "Add Creator"}
          </button>
        </div>
      </form>
    </section>
  );
}
