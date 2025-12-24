import React, { useMemo, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Logo from "../../assets/paf.png";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

/**
 * PricingWizard.jsx (FULL multi-step)
 * Public wizard page for predictiveaf.com
 * - Uses shadcn/ui + tailwind
 * - Calls POST /api/pricing/quote to generate quote + share link
 */

const pWHost = import.meta.env.VITE_PAF_PRICING_WIZARD;

const SystemsList = [
  { key: "hvac", label: "HVAC" },
  { key: "electrical", label: "Electrical" },
  { key: "plumbing", label: "Plumbing" },
  { key: "fire_life_safety", label: "Fire / Life Safety" },
  { key: "elevators", label: "Elevators" },
  { key: "pool_spa", label: "Pool / Spa" },
  { key: "gates_access", label: "Gates / Access" },
  { key: "roofs_envelope", label: "Roofs / Envelope" },
  { key: "generators", label: "Generators" },
  { key: "boilers", label: "Boilers" },
];

const Schema = z.object({
  client_type: z.enum(["property_manager", "hoa_board", "owner", "other"]),
  buildings: z.coerce.number().min(1).max(999),
  units: z.coerce.number().min(1).max(50000),
  property_type: z.enum(["condo", "apartments", "mixed_use", "commercial"]),
  year_built: z.preprocess(
    (v) => (v === "" || v === null || typeof v === "undefined" ? undefined : v),
    z.coerce.number().min(1800).max(2100).optional()
  ),

  systems: z.record(
    z.string(),
    z.object({
      enabled: z.boolean(),
      count_bucket: z.enum(["1-2", "3-5", "6+"]).optional(),
    })
  ),

  compliance: z.object({
    track_vendor_w9: z.boolean(),
    track_vendor_coi: z.boolean(),
    track_inspections: z.boolean(),
    track_permits: z.boolean(),
  }),

  current_method: z.enum(["spreadsheets", "email", "software", "not_tracked"]),
  hands_off_level: z.enum(["manual", "assisted", "fully_automated"]),

  add_ons: z.object({
    ai_system_intelligence: z.boolean(),
    living_reserve_study: z.boolean(),
    vendor_performance: z.boolean(),
    board_reporting_pack: z.boolean(),
    multi_property_rollup: z.boolean(),
    iot_monitoring: z.boolean(),
  }),

  iot: z.object({
    sensor_count: z.coerce.number().min(0).max(5000),
  }),

  billing: z.object({
    annual: z.boolean(),
  }),

  lead: z.object({
    name: z.string().max(80).optional(),
    email: z.string().email().optional(),
    company: z.string().max(120).optional(),
    phone: z.string().max(40).optional(),
  }),
});

function money(n) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(n || 0));
}

async function createQuote(payload) {
  const resp = await fetch(`${pWHost}/api/pricing/quote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = await resp.json();
  if (!resp.ok || !json?.ok)
    throw new Error(json?.error || "Failed to create quote");
  return json;
}

export default function PricingWizard() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const defaultSystems = useMemo(() => {
    const obj = {};
    for (const s of SystemsList)
      obj[s.key] = { enabled: false, count_bucket: "1-2" };
    return obj;
  }, []);

  const form = useForm({
    resolver: zodResolver(Schema),
    defaultValues: {
      client_type: "property_manager",
      buildings: 1,
      units: 20,
      property_type: "condo",
      year_built: undefined,

      systems: defaultSystems,

      compliance: {
        track_vendor_w9: true,
        track_vendor_coi: true,
        track_inspections: true,
        track_permits: false,
      },

      current_method: "spreadsheets",
      hands_off_level: "assisted",

      add_ons: {
        ai_system_intelligence: true,
        living_reserve_study: true,
        vendor_performance: true,
        board_reporting_pack: true,
        multi_property_rollup: false,
        iot_monitoring: false,
      },

      iot: { sensor_count: 0 },
      billing: { annual: false },
      lead: { name: "", email: "", company: "", phone: "" },
    },
    mode: "onChange",
  });

  const values = form.watch();

  const back = () => setStep((s) => Math.max(1, s - 1));
  const next = () => setStep((s) => Math.min(7, s + 1));

  const generate = async () => {
    setSubmitting(true);
    try {
      const payload = Schema.parse(form.getValues());
      const created = await createQuote(payload);
      setResult(created);
      setStep(7);
    } catch (e) {
      const msg =
        e?.issues?.[0]?.message || e?.message || "Something went wrong";
      alert(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const copyShareLink = async () => {
    if (!result?.share_url) return;
    try {
      await navigator.clipboard.writeText(result.share_url);
      alert("Share link copied!");
    } catch {
      // ignore
    }
  };

  function titleCase(s) {
    return String(s || "")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (m) => m.toUpperCase());
  }

  function summarizeSelectedSystems(systems) {
    const list = [];
    if (!systems) return list;
    for (const [k, v] of Object.entries(systems)) {
      if (!v?.enabled) continue;
      const bucket = v.count_bucket ? ` (${v.count_bucket})` : "";
      list.push(`${titleCase(k)}${bucket}`);
    }
    return list;
  }

  function summarizeAddOns(add_ons) {
    const map = {
      ai_system_intelligence: "AI System Intelligence",
      living_reserve_study: "Living Reserve Study",
      vendor_performance: "Vendor Performance Tracking",
      board_reporting_pack: "Board Reporting Pack",
      multi_property_rollup: "Multi-property Rollup",
      iot_monitoring: "IoT Monitoring (sensors)",
    };
    const list = [];
    for (const [k, label] of Object.entries(map)) {
      if (add_ons?.[k]) list.push(label);
    }
    return list;
  }

  function summarizeCompliance(compliance) {
    const map = {
      track_vendor_w9: "Vendor W-9 tracking",
      track_vendor_coi: "COI tracking",
      track_inspections: "Inspection tracking",
      track_permits: "Permit tracking",
    };
    const list = [];
    for (const [k, label] of Object.entries(map)) {
      if (compliance?.[k]) list.push(label);
    }
    return list;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-center items-center">
        <img src={Logo} className="h-24 w-auto" />
      </div>
      <Card className="rounded-2xl">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">PAF Pricing Wizard</CardTitle>
          <div className="text-sm text-muted-foreground">Step {step} of 7</div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-lg font-semibold">Who are you?</div>
              <Label>Role</Label>
              <Select
                value={values.client_type}
                onValueChange={(v) => form.setValue("client_type", v)}
              >
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="property_manager">
                    Property Manager
                  </SelectItem>
                  <SelectItem value="hoa_board">
                    HOA Board / Self-Managed
                  </SelectItem>
                  <SelectItem value="owner">Owner</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="text-lg font-semibold">Property profile</div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <Label>Independant Facilities</Label>
                  <Input
                    className="rounded-xl"
                    type="number"
                    {...form.register("buildings")}
                  />
                </div>
                <div>
                  <Label>Units</Label>
                  <Input
                    className="rounded-xl"
                    type="number"
                    {...form.register("units")}
                  />
                </div>
                <div>
                  <Label>Year built (optional)</Label>
                  <Input
                    className="rounded-xl"
                    type="number"
                    {...form.register("year_built")}
                  />
                </div>
              </div>

              <div>
                <Label>Property type</Label>
                <Select
                  value={values.property_type}
                  onValueChange={(v) => form.setValue("property_type", v)}
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="apartments">Apartments</SelectItem>
                    <SelectItem value="mixed_use">Mixed-use</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="text-lg font-semibold">Systems complexity</div>

              <div className="space-y-3">
                {SystemsList.map((s) => {
                  const enabled = values.systems?.[s.key]?.enabled;
                  const bucket = values.systems?.[s.key]?.count_bucket || "1-2";

                  return (
                    <div
                      key={s.key}
                      className="flex items-center justify-between gap-3 border rounded-xl p-3"
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={Boolean(enabled)}
                          onCheckedChange={(c) =>
                            form.setValue(
                              `systems.${s.key}.enabled`,
                              Boolean(c)
                            )
                          }
                        />
                        <div className="font-medium">{s.label}</div>
                      </div>

                      <div className="w-28">
                        <Select
                          value={bucket}
                          onValueChange={(v) =>
                            form.setValue(`systems.${s.key}.count_bucket`, v)
                          }
                          disabled={!enabled}
                        >
                          <SelectTrigger className="rounded-xl">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            <SelectItem value="1-2">1–2</SelectItem>
                            <SelectItem value="3-5">3–5</SelectItem>
                            <SelectItem value="6+">6+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="text-lg font-semibold">
                Compliance & documents
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  ["track_vendor_w9", "Track Vendor W-9s"],
                  [
                    "track_vendor_coi",
                    "Track COIs (Certificates of Insurance)",
                  ],
                  ["track_inspections", "Track inspection reports"],
                  ["track_permits", "Track permits"],
                ].map(([k, label]) => (
                  <div
                    key={k}
                    className="flex items-center gap-3 border rounded-xl p-3"
                  >
                    <Checkbox
                      checked={Boolean(values.compliance?.[k])}
                      onCheckedChange={(c) =>
                        form.setValue(`compliance.${k}`, Boolean(c))
                      }
                    />
                    <div>{label}</div>
                  </div>
                ))}
              </div>

              <div>
                <Label>How do you track this today?</Label>
                <Select
                  value={values.current_method}
                  onValueChange={(v) => form.setValue("current_method", v)}
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="spreadsheets">Spreadsheets</SelectItem>
                    <SelectItem value="email">Email threads</SelectItem>
                    <SelectItem value="software">Other software</SelectItem>
                    <SelectItem value="not_tracked">
                      Not tracked reliably
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* STEP 5 */}
          {step === 5 && (
            <div className="space-y-4">
              <div className="text-lg font-semibold">
                How hands-off do you want this?
              </div>

              <div className="space-y-2">
                {[
                  ["manual", "Mostly manual (tracking + reminders)"],
                  ["assisted", "Assisted (automation + alerts + reports)"],
                  [
                    "fully_automated",
                    "Fully automated (AI schedules + insights + risk flags)",
                  ],
                ].map(([k, label]) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => form.setValue("hands_off_level", k)}
                    className={`w-full text-left border rounded-xl p-3 transition ${
                      values.hands_off_level === k
                        ? "border-primary"
                        : "border-slate-200"
                    }`}
                  >
                    <div className="font-medium">{label}</div>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 border rounded-xl p-3">
                <Checkbox
                  checked={Boolean(values.billing?.annual)}
                  onCheckedChange={(c) =>
                    form.setValue("billing.annual", Boolean(c))
                  }
                />
                <div>
                  <div className="font-medium">Pay annually</div>
                  <div className="text-sm text-muted-foreground">
                    Save with annual billing
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6 */}
          {step === 6 && (
            <div className="space-y-4">
              <div className="text-lg font-semibold">Add-ons</div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  ["ai_system_intelligence", "AI System Intelligence"],
                  ["living_reserve_study", "Living Reserve Study"],
                  ["vendor_performance", "Vendor Performance Tracking"],
                  ["board_reporting_pack", "Board Reporting Pack"],
                  ["multi_property_rollup", "Multi-property Rollup"],
                  ["iot_monitoring", "IoT Monitoring (sensors)"],
                ].map(([k, label]) => (
                  <div
                    key={k}
                    className="flex items-center gap-3 border rounded-xl p-3"
                  >
                    <Checkbox
                      checked={Boolean(values.add_ons?.[k])}
                      onCheckedChange={(c) =>
                        form.setValue(`add_ons.${k}`, Boolean(c))
                      }
                    />
                    <div>{label}</div>
                  </div>
                ))}
              </div>

              {values.add_ons?.iot_monitoring && (
                <div className="border rounded-xl p-3">
                  <Label>Estimated sensor count</Label>
                  <Input
                    className="rounded-xl mt-2"
                    type="number"
                    {...form.register("iot.sensor_count")}
                  />
                </div>
              )}

              <Separator />

              <div className="text-lg font-semibold">
                Where should we send the quote? (optional)
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label>Name</Label>
                  <Input
                    className="rounded-xl"
                    {...form.register("lead.name")}
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    className="rounded-xl"
                    {...form.register("lead.email")}
                  />
                </div>
                <div>
                  <Label>Company</Label>
                  <Input
                    className="rounded-xl"
                    {...form.register("lead.company")}
                  />
                </div>
                <div>
                  <Label>Phone (optional)</Label>
                  <Input
                    className="rounded-xl"
                    {...form.register("lead.phone")}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 7 */}
          {step === 7 && (
            <div className="space-y-4">
              {!result ? (
                <div className="space-y-4">
                  <div className="text-center space-y-2">
                    <div className="text-lg font-semibold">
                      Review your selections
                    </div>
                    <div className="text-sm text-muted-foreground">
                      We’ll generate three options and a shareable link based on
                      what you selected.
                    </div>
                  </div>

                  {/* Summary grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Card className="rounded-2xl">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Property</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Units</span>
                          <span className="font-medium">{values.units}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Buildings
                          </span>
                          <span className="font-medium">
                            {values.buildings}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Type</span>
                          <span className="font-medium">
                            {titleCase(values.property_type)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Year Built
                          </span>
                          <span className="font-medium">
                            {values.year_built ? values.year_built : "—"}
                          </span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="rounded-2xl">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">
                          Recommended fit
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Hands-off level
                          </span>
                          <span className="font-medium">
                            {titleCase(values.hands_off_level)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Current method
                          </span>
                          <span className="font-medium">
                            {titleCase(values.current_method)}
                          </span>
                        </div>
                        <div className="mt-2 rounded-xl border p-3 bg-muted/20">
                          <div className="text-xs text-muted-foreground">
                            You’re generating a quote for a{" "}
                            <span className="font-medium">
                              {values.buildings}-building, {values.units}-unit{" "}
                              {titleCase(values.property_type)}
                            </span>
                            .
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="rounded-2xl">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Billing</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Billing</span>
                          <span className="font-medium">
                            {values.billing?.annual
                              ? "Annual (discounted)"
                              : "Monthly"}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          You’ll see three options (Good / Better / Best) with a
                          setup fee and optional annual discount.
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Details */}
                  <Card className="rounded-2xl">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">
                        What you selected
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="font-medium">Systems</div>
                        {summarizeSelectedSystems(values.systems).length ? (
                          <ul className="list-disc pl-5 space-y-1">
                            {summarizeSelectedSystems(values.systems).map(
                              (s) => (
                                <li key={s}>{s}</li>
                              )
                            )}
                          </ul>
                        ) : (
                          <div className="text-muted-foreground">
                            None selected
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="font-medium">Compliance</div>
                        {summarizeCompliance(values.compliance).length ? (
                          <ul className="list-disc pl-5 space-y-1">
                            {summarizeCompliance(values.compliance).map((s) => (
                              <li key={s}>{s}</li>
                            ))}
                          </ul>
                        ) : (
                          <div className="text-muted-foreground">
                            None selected
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="font-medium">Add-ons</div>
                        {summarizeAddOns(values.add_ons).length ? (
                          <ul className="list-disc pl-5 space-y-1">
                            {summarizeAddOns(values.add_ons).map((s) => (
                              <li key={s}>{s}</li>
                            ))}
                          </ul>
                        ) : (
                          <div className="text-muted-foreground">
                            None selected
                          </div>
                        )}

                        {values.add_ons?.iot_monitoring && (
                          <div className="mt-2 text-xs text-muted-foreground">
                            Sensor count:{" "}
                            <span className="font-medium">
                              {values.iot?.sensor_count || 0}
                            </span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Lead (optional) */}
                  <Card className="rounded-2xl">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">
                        Delivery (optional)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="flex items-center justify-between rounded-xl border p-3">
                          <span className="text-muted-foreground">Name</span>
                          <span className="font-medium">
                            {values.lead?.name || "—"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between rounded-xl border p-3">
                          <span className="text-muted-foreground">Email</span>
                          <span className="font-medium">
                            {values.lead?.email || "—"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between rounded-xl border p-3">
                          <span className="text-muted-foreground">Company</span>
                          <span className="font-medium">
                            {values.lead?.company || "—"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between rounded-xl border p-3">
                          <span className="text-muted-foreground">Phone</span>
                          <span className="font-medium">
                            {values.lead?.phone || "—"}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-center pt-2">
                    <Button
                      className="rounded-xl px-6"
                      onClick={generate}
                      disabled={submitting}
                    >
                      {submitting
                        ? "Generating..."
                        : "Generate My Custom Proposal"}
                    </Button>
                  </div>
                </div>
              ) : (
                // keep your existing "result" UI exactly as-is
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <div className="text-xl font-semibold">
                        Quote {result.quote_number}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Recommended tier:{" "}
                        <span className="font-medium">
                          {result.recommended_tier}
                        </span>{" "}
                        • Score {result.score}/100
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {result.share_url && (
                        <Button
                          className="rounded-xl"
                          variant="outline"
                          onClick={copyShareLink}
                        >
                          Copy Share Link
                        </Button>
                      )}
                      {result.share_url && (
                        <Button
                          className="rounded-xl"
                          onClick={() =>
                            window.open(
                              result.share_url,
                              "_blank",
                              "noopener,noreferrer"
                            )
                          }
                        >
                          Open Quote
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {(result.options || []).map((o) => (
                      <Card key={o.label} className="rounded-2xl">
                        <CardHeader className="space-y-1">
                          <CardTitle className="text-lg">{o.label}</CardTitle>
                          <div className="text-sm text-muted-foreground">
                            {o.tier}
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-3">
                          <div className="text-2xl font-semibold">
                            {money(o.monthly)}/mo
                          </div>

                          <Separator />

                          <div className="text-sm space-y-1">
                            <div>Base: {money(o.base)}</div>
                            <div>Systems: {money(o.systemsAdder)}</div>
                            <div>Add-ons: {money(o.addOnsMonthly)}</div>
                            {o.componentMultipliers && (
                              <div className="text-muted-foreground">
                                Multipliers: base ×{o.componentMultipliers.base}
                                , systems ×{o.componentMultipliers.systems},
                                add-ons ×{o.componentMultipliers.addons}
                              </div>
                            )}
                          </div>

                          <div className="text-sm">
                            Setup:{" "}
                            <span className="font-medium">
                              {money(o.setupFee)}
                            </span>
                          </div>

                          <Button
                            className="w-full rounded-xl"
                            onClick={() =>
                              window.open(
                                "https://calendar.app.google/p3Bi6LnTTzgfpo8M7",
                                "_blank",
                                "noopener,noreferrer"
                              )
                            }
                          >
                            Request Demo
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {result.ai_summary && (
                    <Card className="rounded-2xl">
                      <CardHeader>
                        <CardTitle>
                          {result.ai_summary.headline || "Why this fits you"}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          {(result.ai_summary.bullets || []).map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                        {result.ai_summary.shortParagraph && (
                          <p className="text-sm text-muted-foreground">
                            {result.ai_summary.shortParagraph}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </div>
          )}

          {/* NAV */}
          <div className="flex items-center justify-between pt-2">
            <Button
              type="button"
              variant="outline"
              className="rounded-xl"
              onClick={back}
              disabled={step === 1 || submitting}
            >
              Back
            </Button>

            {step < 6 && (
              <Button
                type="button"
                className="rounded-xl"
                onClick={next}
                disabled={submitting}
              >
                Next
              </Button>
            )}

            {step === 6 && (
              <Button
                type="button"
                className="rounded-xl"
                onClick={() => setStep(7)}
                disabled={submitting}
              >
                Review
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
