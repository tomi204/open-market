import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="my-20 " style={{ paddingBottom: "3em" }}>
      <div className="flex justify-center mb-4">
        {/* Contenedor para el primer ícono */}
        <div className="mr-8">
          <a href="https://www.linkedin.com/company/smart-builders-labs/" className="mx-2">
            <img src="/linkedin.svg" alt="LinkedIn" className="h-6" style={{ filter: "invert(100%)", paddingRight: "2em" }}/>
          </a>
        </div>
        {/* Contenedor para el segundo ícono */}
        <div className="mr-8">
          <a href="https://www.upwork.com/agencies/1752423684466286592/" className="mx-2">
            <img src="/upwork.svg" alt="UpWork" className=" h-6" style={{ filter: "invert(100%)", paddingRight: "2em" }} />
          </a>
        </div>
        {/* Contenedor para el tercer ícono */}
        <div>
          <a href="https://twitter.com/SmartBuilders_" className="mx-2">
            <img src="/X_logo.svg" alt="X" className="h-6" style={{ filter: "invert(100%)", paddingRight: "2em" }} />
          </a>
        </div>
      </div>
      <p className="text-center text-sm">
        Copyright © {new Date().getFullYear()} Smart Blocks. All rights reserved.
      </p>
      <p className="text-center text-xs mt-1">
        Made by Smart Blocks
      </p>
    </footer>
  );
}

export default Footer;

