import React from "react";
import { Link } from "react-router-dom";

function CreatorCard({ id, name, url, description, imageURL }) {
  return (
    <div className="card bg-base-100 w-96 shadow-xl mx-auto">
      {imageURL && (
        <figure className="px-10 pt-10">
          <img
            src={imageURL}
            alt={`${name}'s preview`}
            className="rounded-xl"
          />
        </figure>
      )}
      <div className="card-body items-center text-center">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <div className="card-actions flex justify-center gap-2">
          <Link to={`/creators/${id}`} className="btn btn-outline btn-primary">
            More Details
          </Link>

          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            Visit Channel
          </a>

          <Link
            to={`/creators/${id}/edit`}
            className="btn btn-outline btn-secondary"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CreatorCard;

