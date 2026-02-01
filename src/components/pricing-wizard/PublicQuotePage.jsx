import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Logo from "../../assets/predictafP.png";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const pWHost = import.meta.env.VITE_PAF_PRICING_WIZARD;

function money(n) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(n || 0));
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function getOciMeta(score) {
  const s = clamp(Number(score || 0), 0, 100);

  // Keep your original band labels, but flip colors to red->green progression.
  if (s <= 30)
    return { band: "light", label: "Light operations", color: "bg-red-500" };
  if (s <= 60)
    return {
      band: "standard",
      label: "Standard property",
      color: "bg-orange-500",
    };
  if (s <= 85)
    return {
      band: "professional",
      label: "Professional facilities",
      color: "bg-amber-500",
    };
  return {
    band: "enterprise",
    label: "Enterprise engineering",
    color: "bg-emerald-500",
  };
}

function OCIGauge({ score }) {
  const target = clamp(Number(score || 0), 0, 100);

  // animated value that eases from 0 -> target
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const from = 0;
    const to = target;

    // duration in ms (tweak if you want)
    const duration = 900;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const tick = (now) => {
      const elapsed = now - start;
      const p = clamp(elapsed / duration, 0, 1);
      const eased = easeOutCubic(p);
      const val = Math.round(from + (to - from) * eased);

      setDisplay(val);

      if (p < 1) raf = requestAnimationFrame(tick);
    };

    // reset then animate
    setDisplay(0);
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [target]);

  const meta = getOciMeta(display);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-semibold text-slate-700">
          Operational Complexity Index (OCI)
        </div>
        <div className="text-xs font-semibold text-slate-500">
          {meta.label} • {display}/100
        </div>
      </div>

      <div className="relative h-4 rounded-full overflow-hidden bg-slate-200">
        <div
          className={`h-full ${meta.color} transition-[width] duration-150 ease-out`}
          style={{ width: `${display}%` }}
        />
      </div>

      <div className="flex justify-between text-xs mt-2 text-slate-400">
        <span>Light</span>
        <span>Standard</span>
        <span>Professional</span>
        <span>Enterprise</span>
      </div>
    </div>
  );
}

function FairnessExplainer() {
  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-5">
      <div className="font-semibold text-slate-900 mb-2">
        Why this price is fair
      </div>
      <p className="text-sm text-slate-600 leading-relaxed">
        PAF does <span className="font-semibold">not</span> charge per system,
        per asset, or per user. Pricing scales by your{" "}
        <span className="font-semibold">
          Operational Complexity Index (OCI)
        </span>{" "}
        — a measure of real workload: inspections, compliance, documents,
        vendors, reporting, and automation.
      </p>

      <div className="grid grid-cols-2 gap-2 text-sm mt-4 text-slate-700">
        <div>✔ Unlimited systems</div>
        <div>✔ Unlimited documents</div>
        <div>✔ Unlimited users</div>
        <div>✔ AI monitoring included</div>
        <div>✔ Compliance automation</div>
        <div>✔ Scales with workload</div>
      </div>
    </div>
  );
}

export default function PublicQuotePage() {
  const { id } = useParams(); // token is actually quote id in your current setup
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        if (!pWHost) throw new Error("Missing VITE_PAF_PRICING_WIZARD env var");

        const url = `${pWHost.replace(/\/+$/, "")}/api/pricing/quote/${id}`;
        const res = await fetch(url, {
          headers: { Accept: "application/json" },
        });

        const text = await res.text();
        let json;
        try {
          json = JSON.parse(text);
        } catch {
          throw new Error(
            `Expected JSON but got HTML/text. Check routing/proxy. URL: ${url}`,
          );
        }

        if (!res.ok || !json?.ok)
          throw new Error(json?.error || "Quote not found");
        setData(json);
      } catch (e) {
        setError(e.message || "Unable to load quote");
      }
    })();
  }, [id]);

  const ociValue = useMemo(() => {
    if (!data) return null;
    return (
      data.oci ?? data.score ?? data?.totals?.oci ?? data?.totals?.score ?? null
    );
  }, [data]);

  const recommendedTier = useMemo(() => {
    if (!data) return null;
    return data.recommended_tier || data.recommendedTier || null;
  }, [data]);

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm">{error}</p>
            <Button
              className="rounded-xl"
              onClick={() => (window.location.href = "/pricing")}
            >
              New Quote
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data) return <div className="p-6 text-sm">Loading…</div>;

  return (
    <div>
      <div className="flex justify-center items-center">
        <img src={Logo} className="h-24 w-auto" />
      </div>
      <div className="max-w-4xl mx-auto p-4">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">
              Quote {data.quote_number}
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              Recommended:{" "}
              <span className="font-medium">{recommendedTier}</span>
              {ociValue !== null && (
                <>
                  {" "}
                  • OCI{" "}
                  <span className="font-medium">{Number(ociValue)}/100</span>
                </>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* OCI Funnel */}
            {ociValue !== null && (
              <Card className="rounded-2xl">
                <CardContent className="pt-6 space-y-4">
                  <OCIGauge score={ociValue} />
                  <FairnessExplainer />
                </CardContent>
              </Card>
            )}

            <div className="grid md:grid-cols-3 gap-4">
              {data.options.map((o) => {
                const isRecommended =
                  String(o.tier || "").toLowerCase() ===
                  String(recommendedTier || "").toLowerCase();

                return (
                  <Card
                    key={o.label}
                    className={[
                      "rounded-xl relative overflow-hidden",
                      isRecommended ? "border-slate-900 shadow-lg" : "",
                    ].join(" ")}
                  >
                    {isRecommended && (
                      <div className="absolute -inset-6 bg-gradient-to-r from-slate-900/15 via-slate-900/5 to-slate-900/15 blur-2xl pointer-events-none" />
                    )}

                    <CardHeader className="relative">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle>{o.label}</CardTitle>
                        {isRecommended && (
                          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-slate-900 text-white animate-pulse">
                            Recommended
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {o.tier}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2 relative">
                      <div className="text-2xl font-semibold">
                        {money(o.monthly)}/mo
                      </div>
                      <Separator />
                      <div className="text-sm">Base: {money(o.base)}</div>
                      <div className="text-sm">
                        Systems: {money(o.systemsAdder)}
                      </div>
                      <div className="text-sm">
                        Add-ons: {money(o.addOnsMonthly)}
                      </div>

                      <Button
                        className={[
                          "w-full mt-2 rounded-xl bg-[#7690b5] hover:bg-[#4c6486] text-white",
                          isRecommended ? "ring-2 ring-slate-900/30" : "",
                        ].join(" ")}
                        onClick={() =>
                          window.open(
                            "https://calendar.app.google/p3Bi6LnTTzgfpo8M7",
                            "_blank",
                            "noopener,noreferrer",
                          )
                        }
                      >
                        Book Demo
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {data.ai_summary?.headline && (
              <Card className="rounded-xl">
                <CardHeader>
                  <CardTitle>{data.ai_summary.headline}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    {(data.ai_summary.bullets || []).map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
