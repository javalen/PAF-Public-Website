import React from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

const QuickStart = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Quick Start Quide
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            <Disclosure key="mobileApp" as="div" className="pt-6">
              <dt>
                <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
                  <span className="text-base/7 font-semibold">
                    Download the PredectiveAF Moblie app
                  </span>
                  <span className="ml-6 flex h-7 items-center">
                    <PlusSmallIcon
                      aria-hidden="true"
                      className="h-6 w-6 group-data-[open]:hidden"
                    />
                    <MinusSmallIcon
                      aria-hidden="true"
                      className="h-6 w-6 [.group:not([data-open])_&]:hidden"
                    />
                  </span>
                </DisclosureButton>
              </dt>
              <DisclosurePanel as="dd" className="mt-2 pr-12">
                The android Predictaf Mobile app can be downloaded from the
                Google Play Store or the App Store for IOS
              </DisclosurePanel>
            </Disclosure>
            <Disclosure key="register" as="div" className="pt-6">
              <dt>
                <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
                  <span className="text-base/7 font-semibold">
                    Register as a new client
                  </span>
                  <span className="ml-6 flex h-7 items-center">
                    <PlusSmallIcon
                      aria-hidden="true"
                      className="h-6 w-6 group-data-[open]:hidden"
                    />
                    <MinusSmallIcon
                      aria-hidden="true"
                      className="h-6 w-6 [.group:not([data-open])_&]:hidden"
                    />
                  </span>
                </DisclosureButton>
              </dt>
              <DisclosurePanel as="dd" className="mt-2 pr-12">
                <p>
                  A client serves as an unberalla that all facilities will be
                  grouped under. There are two ways to register.
                </p>
                <p className="m-3">
                  <span className="font-semibold">
                    Register via the mobile app:
                  </span>{" "}
                  open the Predictaf Mobile app, click the register button and
                  complete the form.
                </p>
                <p className="m-3">
                  <span className="font-semibold">
                    Register via Predictaf website:
                  </span>{" "}
                  Go to{" "}
                  <a href="/register" className="text-blue-700">
                    Register
                  </a>{" "}
                  and complete the form.
                </p>

                <p className="mt-3">
                  Once the form is submitted you will receive an email from
                  support@predictiveaf.com requesting account verification.
                  Simply click the button and your account has been created.
                </p>
                <p className="mt-3">
                  The mobile app has a web based application that allows the
                  Client manager (the individual who created the client) special
                  access. Using the Predictaf AppManger website you can:
                  <ul className="m-3 text-sm leading-6">
                    <li>&bull; View facility reports</li>
                    <li>&bull; Manage facilities</li>
                    <li>&bull; Manage users</li>
                    <li>&bull; Manage systems</li>
                    <li>&bull; Manage roles</li>
                    <li>&bull; Manage systems</li>
                    <li>&bull; Purchase addition modules</li>
                    <li>&bull; Select Plan</li>
                    <li>&bull; View Invoices</li>
                  </ul>
                </p>

                <p className="m-3">
                  After account verification an additional email will be sent
                  containing a link to your Predictaf dashboard. Be sure to
                  bookmark it for easy access in the future.
                </p>
              </DisclosurePanel>
            </Disclosure>
            <Disclosure key="facility" as="div" className="pt-6">
              <dt>
                <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
                  <span className="text-base/7 font-semibold">
                    Create a facility
                  </span>
                  <span className="ml-6 flex h-7 items-center">
                    <PlusSmallIcon
                      aria-hidden="true"
                      className="h-6 w-6 group-data-[open]:hidden"
                    />
                    <MinusSmallIcon
                      aria-hidden="true"
                      className="h-6 w-6 [.group:not([data-open])_&]:hidden"
                    />
                  </span>
                </DisclosureButton>
              </dt>
              <DisclosurePanel as="dd" className="mt-2 pr-12">
                A facility is a physical property associated with an address,
                name, pictures ...
              </DisclosurePanel>
            </Disclosure>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default QuickStart;
