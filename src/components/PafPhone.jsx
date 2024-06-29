"use client";

import { useId, useRef, useState } from "react";
import clsx from "clsx";
import { motion, useInView, useMotionValue } from "framer-motion";
import BodyImg from "../assets/login.jpg";

import { AppScreen } from "./AppScreen";

export function PafPhone() {
  return (
    <AppScreen>
      <AppScreen.Body>
        <div className="w-fit">
          <img src={BodyImg} alt="" />
        </div>
      </AppScreen.Body>
    </AppScreen>
  );
}
