export default function AIPrivacyDisclosure() {
  return (
    <section id="ai-processing" aria-labelledby="ai-privacy-heading" className="my-8 space-y-4 rounded-xl border border-current/20 p-5 sm:p-6">
      <h2 id="ai-privacy-heading" className="text-xl font-bold">AI features and third-party processing</h2>
      <p>
        AI features are optional. Predictaf uses OpenAI as a third-party AI provider,
        accessed through Predictaf’s servers, to answer questions, transcribe speech,
        analyze selected evidence, identify equipment, and assist with property operations.
      </p>
      <h3 className="font-semibold">Information that may be shared</h3>
      <p>
        Depending on the feature and your request, information sent for AI processing
        may include your questions and instructions; voice recordings when you choose
        to use the microphone; photos or evidence you select for AI analysis; and
        relevant property addresses, equipment details, tickets, maintenance records,
        or inspection records needed to answer your request. Relevant records may be
        retrieved to complete the request. Account context, including your name,
        email address, user ID, and company details, may accompany a request.
      </p>
      <h3 className="font-semibold">Your choice before sharing</h3>
      <p>
        The mobile app’s AI privacy &amp; consent screen explains this sharing before
        an AI request or recording upload. Select “Allow AI Processing” to permit
        it, or “Not Now” to decline. Declining prevents that AI request from being
        sent and lets you continue using other Predictaf features. Reading this
        Policy, using the app, or granting microphone or photo access does not by
        itself authorize sharing with an AI provider.
      </p>
      <h3 className="font-semibold">Reviewing and withdrawing permission</h3>
      <p>
        In the mobile app, open Myzo → AI privacy &amp; consent and select
        “Withdraw AI Permission” to stop future AI requests. The preference is
        saved separately for each account and company server on that device.
        Withdrawing permission does not recall information already transmitted
        or automatically delete previously saved records. For questions or requests
        concerning previously shared Personal Information, contact{" "}
        <a className="underline" href="mailto:admin@predictaf.com">admin@predictaf.com</a>.
      </p>
      <p>
        OpenAI processes API data under the agreements applicable to Predictaf’s use
        of its business services. See{" "}
        <a className="underline" href="https://openai.com/enterprise-privacy/" target="_blank" rel="noopener noreferrer">OpenAI’s business data privacy information</a>
        {" "}and{" "}
        <a className="underline" href="https://openai.com/policies/privacy-policy/" target="_blank" rel="noopener noreferrer">OpenAI’s Privacy Policy</a>
        {" "}for more information about its services and the scope of those policies.
        Do not include information you do not want processed by these services.
      </p>
    </section>
  );
}
