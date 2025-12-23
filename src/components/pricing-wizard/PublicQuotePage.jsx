import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Logo from "../../assets/paf.png";
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

        // If the API returns HTML, this makes it obvious instead of crashing JSON.parse
        const text = await res.text();
        let json;
        try {
          json = JSON.parse(text);
        } catch {
          throw new Error(
            `Expected JSON but got HTML/text. Check routing/proxy. URL: ${url}`
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
              Recommended: {data.recommended_tier}
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              {data.options.map((o) => (
                <Card key={o.label} className="rounded-xl">
                  <CardHeader>
                    <CardTitle>{o.label}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
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
                      className="w-full mt-2 rounded-xl bg-[#7690b5] hover:bg-[#4c6486] text-white"
                      onClick={() =>
                        window.open(
                          "https://calendar.app.google/p3Bi6LnTTzgfpo8M7",
                          "_blank",
                          "noopener,noreferrer"
                        )
                      }
                    >
                      Book Demo
                    </Button>
                  </CardContent>
                </Card>
              ))}
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
