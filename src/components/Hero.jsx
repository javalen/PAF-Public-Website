import { useId } from "react";
import { PafPhone } from "./PafPhone";
import { Container } from "./Container";
import { PhoneFrame } from "./PhoneFrame";
import PropManage from "../images/prop-manage.png";
import HoweOwner from "../images/homeowner.png";
import MaintMan from "../images/maintenance.png";
import Contractor from "../images/contractors.png";

function BackgroundIllustration(props) {
  let id = useId();

  return (
    <div {...props}>
      <svg
        viewBox="0 0 1026 1026"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full animate-spin-slow"
      >
        <path
          d="M1025 513c0 282.77-229.23 512-512 512S1 795.77 1 513 230.23 1 513 1s512 229.23 512 512Z"
          stroke="#D4D4D4"
          strokeOpacity="0.7"
        />
        <path
          d="M513 1025C230.23 1025 1 795.77 1 513"
          stroke={`url(#${id}-gradient-1)`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-1`}
            x1="1"
            y1="513"
            x2="1"
            y2="1025"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#06b6d4" />
            <stop offset="1" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        viewBox="0 0 1026 1026"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full animate-spin-reverse-slower"
      >
        <path
          d="M913 513c0 220.914-179.086 400-400 400S113 733.914 113 513s179.086-400 400-400 400 179.086 400 400Z"
          stroke="#D4D4D4"
          strokeOpacity="0.7"
        />
        <path
          d="M913 513c0 220.914-179.086 400-400 400"
          stroke={`url(#${id}-gradient-2)`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-2`}
            x1="913"
            y1="513"
            x2="913"
            y2="913"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#06b6d4" />
            <stop offset="1" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function PlayIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="11.5" stroke="#D4D4D4" />
      <path
        d="M9.5 14.382V9.618a.5.5 0 0 1 .724-.447l4.764 2.382a.5.5 0 0 1 0 .894l-4.764 2.382a.5.5 0 0 1-.724-.447Z"
        fill="#A3A3A3"
        stroke="#A3A3A3"
      />
    </svg>
  );
}

export function Hero() {
  return (
    <div className="overflow-hidden py-5 sm:py-5 lg:pb-32 xl:pb-36">
      <Container>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
          <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
            <h1 className="text-4xl font-medium tracking-tight text-gray-900">
              How can Predictaf help you?
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Predictaf is a comprehensive mobile application that enables users
              to monitor, manage, and analyze data from mechanical systems in
              commercial and residential buildings. The app aims to enhance
              operational efficiency, predictive maintenance, and overall system
              performance through real-time data insights and analytics.
            </p>
            <p className="mt-6 text-lg text-gray-600">
              Our platform is a proactive maintenance and compliance management
              system designed for large-scale residential and commercial
              properties, particularly those managed by HOAs with limited
              engineering oversight. It allows users to catalog mechanical
              systems — HVAC, fire sprinklers, electrical panels, etc. — and
              associate each with a custom maintenance schedule. The system then
              tracks these schedules in real-time, flagging overdue tasks and
              upcoming service requirements. Additionally, it manages
              time-sensitive documentation like warranties, permits, and
              inspections by tracking expiration dates and sending automated
              alerts. The result is improved operational visibility, reduced
              liability, and data-driven oversight — all in a centralized
              interface
            </p>
          </div>
          <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
            <BackgroundIllustration className="absolute left-1/2 top-4 h-[1026px] w-[1026px] -translate-x-1/3 stroke-gray-300/70 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:top-16 sm:-translate-x-1/2 lg:-top-16 lg:ml-12 xl:-top-14 xl:ml-0" />
            <div className="-mx-4 h-[708px] px-9 [mask-image:linear-gradient(to_bottom,white_30%,transparent)] sm:mx-0 lg:absolute lg:-inset-x-10 lg:-bottom-20 lg:-top-10 lg:px-0 lg:pt-10 xl:-bottom-32">
              <PhoneFrame className="mx-auto max-w-[366px]" priority>
                <PafPhone />
              </PhoneFrame>
            </div>
          </div>
          <div className="relative -mt-4 lg:col-span-7 lg:mt-0 xl:col-span-6">
            <p className="text-center text-sm font-semibold text-gray-900  mb-8">
              Who can benefit from Predictaf?
            </p>
          </div>
          <div className="relative -mt-4 lg:col-span-7 lg:mt-0 xl:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-6">
            {/* Property Managers */}
            <div className="flex flex-col items-center text-center px-4">
              <img
                src={PropManage}
                alt="Property Managers"
                className="w-20 mb-4"
              />
              <h3 className="text-sm font-semibold text-gray-900">
                Property Managers
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Centralized dashboard for managing maintenance tasks, vendors,
                and documentation across all systems.
              </p>
            </div>

            {/* HOA Boards / Homeowners */}
            <div className="flex flex-col items-center text-center px-4">
              <img src={HoweOwner} alt="HOA Boards" className="w-20 mb-4" />
              <h3 className="text-sm font-semibold text-gray-900">
                HOA Boards / Homeowners
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Get full visibility into system health, compliance, and costs
                without needing technical expertise.
              </p>
            </div>

            {/* Maintenance Teams */}
            <div className="flex flex-col items-center text-center px-4">
              <img
                src={MaintMan}
                alt="Maintenance Team"
                className="w-20 mb-4"
              />
              <h3 className="text-sm font-semibold text-gray-900">
                Maintenance Teams
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Simplify task tracking and service history with real-time
                schedules and maintenance logs.
              </p>
            </div>

            {/* Contractors / Vendors */}
            <div className="flex flex-col items-center text-center px-4">
              <img src={Contractor} alt="Contractors" className="w-20 mb-4" />
              <h3 className="text-sm font-semibold text-gray-900">
                Contractors / Vendors
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Streamlined coordination with building teams, upcoming tasks,
                and asset information at your fingertips.
              </p>
            </div>
          </div>

          {/* <div className="relative -mt-4 lg:col-span-7 lg:mt-0 xl:col-span-6 columns-2">
            <div className="h-32">
              <div className="grid justify-center">
                <img src={PropManage} alt="" className="w-20 align-middle" />
              </div>
              <div className="text-center text-sm font-semibold text-gray-900">
                Property Management Companies
              </div>
            </div>
            <div className="h-32 ">
              <div className="grid justify-center">
                <img src={HoweOwner} alt="" className="w-20" />
              </div>
              <div className="text-center text-sm font-semibold text-gray-900">
                Home Owners
              </div>
            </div>
            <div className="h-32">
              <div className="grid justify-center">
                <img src={MaintMan} alt="" className="w-20 align-middle" />
              </div>
              <div className="text-center text-sm font-semibold text-gray-900">
                Maintenance Resources
              </div>
            </div>
            <div className="h-32 ">
              <div className="grid justify-center">
                <img src={Contractor} alt="" className="w-20" />
              </div>
              <div className="text-center text-sm font-semibold text-gray-900">
                Contractors
              </div>
            </div>
          </div> */}
        </div>
      </Container>
    </div>
  );
}
