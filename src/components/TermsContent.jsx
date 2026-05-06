// Standalone Terms & Conditions content — rendered inside a modal
export default function TermsContent() {
  return (
    <div className="space-y-4 font-['Roboto'] text-base leading-normal tracking-normal text-textPrimary dark:text-textPrimary-dark">
      <p>
        These terms and conditions apply to the Predictaf app (hereby referred to as "Application") for
        mobile devices that was created by Predictaf LLC (hereby referred to as "Service Provider") as a
        Free service.
      </p>

      <p>
        Upon downloading or utilizing the Application, you are automatically agreeing to the following
        terms. It is strongly advised that you thoroughly read and understand these terms prior to using
        the Application. Unauthorized copying, modification of the Application, any part of the
        Application, or our trademarks is strictly prohibited.
      </p>

      <p>
        The Service Provider is dedicated to ensuring that the Application is as beneficial and efficient
        as possible. As such, they reserve the right to modify the Application or charge for their
        services at any time and for any reason.
      </p>

      <p>
        The Application stores and processes personal data that you have provided. The Service Provider
        strongly advises against jailbreaking or rooting your phone, as it could compromise your
        device's security features and cause the Application to malfunction.
      </p>

      <div>
        <p className="mb-2">
          The Application utilizes third-party services that have their own Terms and Conditions:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brandSecondary dark:text-brandSecondary-dark hover:underline"
            >
              Google Play Services
            </a>
          </li>
        </ul>
      </div>

      <p>
        Please be aware that the Service Provider does not assume responsibility for certain aspects of
        your use of the Application, including charges from your mobile network provider for data usage
        or third-party information relied upon by the Application.
      </p>

      <p>
        The Service Provider may wish to update the Application at some point. You agree to always accept
        updates to the Application when offered.
      </p>

      <h2 className="font-['Funnel_Display'] text-xl font-semibold mt-6 text-textPrimary dark:text-textPrimary-dark">
        Changes to These Terms and Conditions
      </h2>
      <p>
        The Service Provider may periodically update their Terms and Conditions. You are advised to
        review this page regularly for any changes. Changes are effective immediately upon posting.
      </p>

      <p>
        These terms and conditions are effective as of <strong>2024-06-19</strong>.
      </p>

      <h2 className="font-['Funnel_Display'] text-xl font-semibold mt-6 text-textPrimary dark:text-textPrimary-dark">
        Contact Us
      </h2>
      <p>
        If you have any questions or suggestions about the Terms and Conditions, please contact us at{" "}
        <a
          href="mailto:admin@predictiveaf.com"
          className="text-brandSecondary dark:text-brandSecondary-dark hover:underline"
        >
          admin@predictiveaf.com
        </a>
        .
      </p>
    </div>
  );
}
