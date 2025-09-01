import CreatorCard from "../components/CreatorCard";

export default function ShowAllCreator({ creators = [], loading = false, error = null }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-8 ">
      <h2 className="text-6xl font-bold mb-6 text-center">All Creators</h2>

      {loading && <p>Loading creators…</p>}
      {!loading && error && (
        <p className="text-red-600">Couldn’t load creators: {error}</p>
      )}
      {!loading && !error && creators.length === 0 && (
        <p>No content creators yet. Try adding one from “Add Creator”.</p>
      )}

      {!loading && !error && creators.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {creators.map((c) => (
            <CreatorCard key={c.id} {...c} />
          ))}
        </div>
      )}
    </section>
  );
}


