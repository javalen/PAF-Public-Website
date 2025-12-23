import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

/**
 * Public Quote Page
 * GET → /api/pricing/quote/public/:token
 */

function money(n) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(n || 0));
}

export default function PublicQuotePage() {
  const { token } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/pricing/quote/public/${token}`);
        const json = await res.json();
        if (!res.ok || !json?.ok) throw new Error(json?.error);
        setData(json);
      } catch (e) {
        setError(e.message || "Unable to load quote");
      }
    })();
  }, [token]);

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{error}</p>
            <Button className="mt-4" href="/pricing">
              New Quote
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data) {
    return <div className="p-6 text-sm">Loading…</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Quote {data.quote_number}</CardTitle>
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
                    className="w-full mt-2"
                    onClick={() => (window.location.href = "/contact")}
                  >
                    Book Demo
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {data.ai_summary && (
            <Card className="rounded-xl">
              <CardHeader>
                <CardTitle>{data.ai_summary.headline}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  {data.ai_summary.bullets?.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
