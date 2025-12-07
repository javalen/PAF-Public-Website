import { Button } from "./Button";
import { Container } from "./Container";
import { TextField } from "./Fields";
import { Logomark } from "./Logo";
import { NavLinks } from "./NavLinks";
import qrCode from "../images/qr-code.svg";
import Logo from "../assets/paf.png";
import PlayStoreQR from "../assets/play-store-qr.png";
import iOSStoreQR from "../assets/ios-qr.png";
import PopUpDialog from "./PopUpDailog";
import { useState } from "react";
import { pbWebClient } from "../api/pocketbase";

function QrCodeBorder(props) {
  return (
    <svg viewBox="0 0 96 96" fill="none" aria-hidden="true" {...props}>
      <path
        d="M1 17V9a8 8 0 0 1 8-8h8M95 17V9a8 8 0 0 0-8-8h-8M1 79v8a8 8 0 0 0 8 8h8M95 79v8a8 8 0 0 1-8 8h-8"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Footer() {
  const [open, setOpen] = useState(false);

  const onSubmit = async (e) => {
    console.log("Data", e.target[0].value);
    e.preventDefault(true);

    try {
      const data = {
        email: e.target[0].value,
        joined_date: new Date().toLocaleDateString(),
      };

      const record = await pbWebClient.collection("mail_list").create(data);
      console.log("Record", record);
      setOpen(true);
    } catch (error) {
      console.log(`Error subscribing ${error}`);
    }
  };

  return (
    <footer className="border-t border-gray-200">
      <Container>
        <div className="flex flex-col items-start justify-between gap-y-12 pb-6 pt-16 lg:flex-row lg:items-center lg:py-16">
          <div>
            <div className="flex items-center text-gray-900">
              <img src={Logo} className="w-24" alt="" />
              <div className="ml-4">
                <p className="text-base font-semibold">PredictiveAF</p>
                <p className="mt-1 text-sm">Empowering Your Success</p>
              </div>
            </div>
            <nav className="mt-11 flex gap-8">
              <NavLinks />
            </nav>
          </div>
          <div className="w-full flex flex-col items-center mt-8">
            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
              Download the Mobile App
            </h2>

            {/* QR blocks */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              {/* Android */}
              <div className="group flex flex-col items-center p-4 transition hover:bg-gray-100 rounded-2xl">
                <a
                  href="https://play.google.com/store/apps/details?id=com.predictiveaf.mobile&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center"
                >
                  <img
                    src={PlayStoreQR}
                    alt="Download on Google Play"
                    className="h-32 w-32 rounded-md shadow-md mb-3"
                  />
                  <span className="text-base font-semibold text-gray-900 text-center">
                    Android
                  </span>
                </a>
              </div>

              {/* iOS — update URL when ready */}
              <div className="group flex flex-col items-center p-4 transition hover:bg-gray-100 rounded-2xl">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center"
                >
                  <img
                    src={iOSStoreQR}
                    alt="Download on iOS App Store"
                    className="h-32 w-32 rounded-md shadow-md mb-3"
                  />
                  <span className="text-base font-semibold text-gray-900 text-center">
                    iOS
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center border-t border-gray-200 pb-12 pt-8 md:flex-row-reverse md:justify-between md:pt-6">
          <form
            className="flex w-full justify-center md:w-auto"
            onSubmit={onSubmit}
          >
            <TextField
              type="email"
              aria-label="Email address"
              placeholder="Email address"
              autoComplete="email"
              required
              className="w-60 min-w-0 shrink"
            />
            <Button type="submit" color="cyan" className="ml-4 flex-none">
              <span className="hidden lg:inline">Join our newsletter</span>
              <span className="lg:hidden">Join newsletter</span>
            </Button>
          </form>
          <p className="mt-6 text-sm text-gray-500 md:mt-0">
            &copy; Copyright {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </Container>
      <PopUpDialog
        open={open}
        setOpen={setOpen}
        title="Success!!"
        text="Thank you for joining"
        buttonLbl={"Close"}
      />
    </footer>
  );
}
