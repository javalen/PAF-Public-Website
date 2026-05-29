import { Navigate, useParams, useSearchParams } from "react-router-dom";

function sanitizeUtmValue(value) {
  if (!value) {
    return "";
  }

  return value.toString().trim().toLowerCase().replace(/[^a-z0-9_-]/g, "");
}

function SocialRedirect() {
  const { source: sourceParam } = useParams();
  const [searchParams] = useSearchParams();

  // Supports /social/linkedin and /social?src=linkedin patterns.
  const rawSource =
    sourceParam ||
    searchParams.get("src") ||
    searchParams.get("source") ||
    searchParams.get("utm_source");

  const source = sanitizeUtmValue(rawSource) || "social";
  const medium = sanitizeUtmValue(searchParams.get("medium")) || "social";
  const campaign =
    sanitizeUtmValue(searchParams.get("campaign")) || "profile";

  const targetParams = new URLSearchParams({
    utm_source: source,
    utm_medium: medium,
    utm_campaign: campaign,
  });

  const content = sanitizeUtmValue(searchParams.get("content"));
  if (content) {
    targetParams.set("utm_content", content);
  }

  const term = sanitizeUtmValue(searchParams.get("term"));
  if (term) {
    targetParams.set("utm_term", term);
  }

  return <Navigate replace to={`/?${targetParams.toString()}`} />;
}

export default SocialRedirect;