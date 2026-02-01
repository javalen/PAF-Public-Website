// NewsletterViewer.jsx (DROP-IN)
// ✅ Merges archive index.html + single viewer into one React component
// ✅ Uses import.meta.env for API base
// ✅ Archive mode: /news-letter  (no slug)
// ✅ Viewer mode:  /news-letter/view/:slug

import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

const API_BASE = (
  import.meta.env.VITE_CLIENTS_SVR_URL ||
  import.meta.env.VITE_CLIENTS_SERVER_URL ||
  ""
).replace(/\/$/, "");

function fmtDate(d) {
  try {
    const dt = new Date(d);
    if (Number.isNaN(dt.getTime())) return "";
    return dt.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

function statusLabel(s) {
  const v = String(s || "").toLowerCase();
  return v || "draft";
}

// If your stored HTML includes full <html><body>...</body></html>, this keeps only body content.
// If it's already a fragment, it returns as-is.
function extractBodyHtml(raw = "") {
  const html = String(raw || "");
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch?.[1]) return bodyMatch[1];
  return html;
}

export default function NewsletterViewer() {
  const { slug } = useParams();

  // mode: archive (no slug) or viewer (has slug)
  const mode = slug ? "viewer" : "archive";

  // archive state
  const [items, setItems] = useState([]);
  const [archiveLoading, setArchiveLoading] = useState(true);
  const [archiveError, setArchiveError] = useState("");

  // viewer state
  const [html, setHtml] = useState("");
  const [title, setTitle] = useState("Predictaf Insider");
  const [viewLoading, setViewLoading] = useState(true);
  const [viewError, setViewError] = useState("");

  // shared layout styles (ported from index.html)
  const styles = useMemo(
    () => ({
      page: {
        margin: 0,
        background: "#f6f7fb",
        fontFamily: "Arial, Helvetica, sans-serif",
        color: "#111827",
        minHeight: "100vh",
      },
      wrap: { maxWidth: 920, margin: "0 auto", padding: "42px 18px" },
      card: {
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 16,
        overflow: "hidden",
      },
      head: {
        textAlign: "center",
        padding: "26px 18px 18px",
        borderBottom: "1px solid #e5e7eb",
      },
      headImg: {
        width: 200,
        maxWidth: "80%",
        height: "auto",
        borderRadius: 14,
        display: "block",
        margin: "0 auto 12px",
      },
      h1: { margin: 0, fontSize: 26 },
      sub: { marginTop: 8, fontSize: 13, color: "#6b7280" },
      list: { padding: 6 },
      row: {
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        justifyContent: "space-between",
        padding: "14px 14px",
        borderRadius: 12,
        textDecoration: "none",
        color: "inherit",
      },
      title: { fontWeight: 700, fontSize: 15, margin: 0 },
      meta: {
        fontSize: 12,
        color: "#6b7280",
        marginTop: 6,
        lineHeight: 1.4,
        wordBreak: "break-word",
      },
      right: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 6,
        minWidth: 120,
      },
      pill: {
        fontSize: 12,
        fontWeight: 700,
        padding: "4px 10px",
        borderRadius: 999,
        border: "1px solid #e5e7eb",
        color: "#374151",
        background: "#fff",
      },
      date: { fontSize: 12, color: "#6b7280" },
      empty: {
        padding: 18,
        color: "#6b7280",
        fontSize: 14,
        textAlign: "center",
      },
      footer: {
        textAlign: "center",
        marginTop: 18,
        fontSize: 12,
        color: "#6b7280",
      },

      // viewer chrome
      viewerTop: {
        padding: "14px 18px",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      },
      viewerBody: {
        padding: 0,
        overflowX: "auto",
      },
      backLink: { fontSize: 13, textDecoration: "none", color: "#2563eb" },
    }),
    [],
  );

  // Archive loader (ported from index.html, but env-based API)
  useEffect(() => {
    if (mode !== "archive") return;

    let mounted = true;
    setArchiveLoading(true);
    setArchiveError("");

    async function loadArchive() {
      try {
        if (!API_BASE) throw new Error("Missing VITE_CLIENTS_SVR_URL");

        const res = await fetch(`${API_BASE}/api/newsletters`, {
          headers: { Accept: "application/json" },
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data?.ok) {
          throw new Error(data?.error || "Failed to load");
        }

        const list = Array.isArray(data.newsletters) ? data.newsletters : [];
        if (mounted) setItems(list);
      } catch (e) {
        if (mounted) {
          setArchiveError("Couldn’t load the archive. (API unavailable)");
          setItems([]);
        }
      } finally {
        if (mounted) setArchiveLoading(false);
      }
    }

    loadArchive();
    return () => {
      mounted = false;
    };
  }, [mode]);

  // Viewer loader
  useEffect(() => {
    if (mode !== "viewer") return;

    let mounted = true;
    setViewLoading(true);
    setViewError("");

    async function loadIssue() {
      try {
        if (!API_BASE) throw new Error("Missing VITE_CLIENTS_SVR_URL");

        const res = await fetch(
          `${API_BASE}/api/newsletter/${encodeURIComponent(slug)}`,
          {
            headers: { Accept: "application/json" },
          },
        );

        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data?.ok) throw new Error(data?.error || "Not found");

        const issue = data.newsletter || {};
        const subject = issue.subject || "Predictaf Insider";
        const rawHtml = issue.html || issue.text || ""; // supports either field name

        if (!mounted) return;

        setTitle(subject);
        setHtml(extractBodyHtml(rawHtml));
        document.title = `${subject} | Predictaf Insider`;
      } catch (e) {
        if (mounted) setViewError("Newsletter not found.");
      } finally {
        if (mounted) setViewLoading(false);
      }
    }

    loadIssue();
    return () => {
      mounted = false;
    };
  }, [mode, slug]);

  // -------------------- RENDER --------------------

  if (mode === "archive") {
    return (
      <div style={styles.page}>
        <div style={styles.wrap}>
          <div style={styles.card}>
            <div style={styles.head}>
              {/* Top row: Home link aligned right */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: 8,
                }}
              >
                <Link to="/" style={styles.backLink}>
                  ← Home
                </Link>
              </div>

              {/* Logo */}
              <img
                src="/predictafP.png"
                alt="Predictaf"
                style={styles.headImg}
              />

              {/* Title */}
              <h1 style={styles.h1}>Predictaf Insider</h1>

              {/* Subtitle */}
              <div style={styles.sub}>Newsletter Archive</div>
            </div>

            <div style={styles.list}>
              {archiveLoading ? (
                <div style={styles.empty}>Loading newsletters…</div>
              ) : archiveError ? (
                <div style={styles.empty}>{archiveError}</div>
              ) : items.length === 0 ? (
                <div style={styles.empty}>No newsletters found yet.</div>
              ) : (
                items.map((n) => {
                  const when = n.sent_at || n.send_at || "";
                  const whenLabel = when ? fmtDate(when) : "";
                  const href = `/news-letter/view/${encodeURIComponent(n.slug)}`;

                  return (
                    <Link
                      key={n.id || n.slug}
                      to={href}
                      style={styles.row}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#f9fafb")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={styles.title}>{n.subject || ""}</div>
                        {n.preheader ? (
                          <div style={styles.meta}>{String(n.preheader)}</div>
                        ) : null}
                        <div style={styles.meta}>{n.slug}</div>
                      </div>

                      <div style={styles.right}>
                        <span style={styles.pill}>{statusLabel(n.status)}</span>
                        <div style={styles.date}>{whenLabel || "\u00A0"}</div>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          </div>

          <footer style={styles.footer}>
            Powered by <strong>Predictaf</strong> • Intelligent Maintenance.
            Predictable Operations.
          </footer>
        </div>
      </div>
    );
  }

  // viewer mode
  if (viewLoading) {
    return <div style={{ padding: 40 }}>Loading newsletter…</div>;
  }

  if (viewError) {
    return <div style={{ padding: 40 }}>{viewError}</div>;
  }

  return (
    <div style={styles.page}>
      <div style={{ ...styles.wrap, paddingTop: 24 }}>
        <div style={styles.card}>
          <div style={styles.viewerTop}>
            <strong>{title || "Predictaf Insider"}</strong>
            <Link to="/news-letter" style={styles.backLink}>
              ← Archive
            </Link>
          </div>

          {/* HTML injection (email HTML) */}
          <div
            style={styles.viewerBody}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </div>
  );
}
