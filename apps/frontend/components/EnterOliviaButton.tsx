"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EnterOliviaButton() {
  const [booting, setBooting] = useState(false);
  const router = useRouter();

  const handleEnter = () => {
    setBooting(true);

    setTimeout(() => {
      router.push("/inbox");
    }, 2200);
  };

  return (
    <>
      <button
        onClick={handleEnter}
        className="relative rounded-full bg-[#FF2F7D] px-14 py-7 text-xl font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,47,125,0.6)]"
      >
        Enter Olivia One {"->"}
      </button>

      {booting ? (
        <div className="animate-fadeIn fixed inset-0 z-50 flex items-center justify-center bg-black text-white">
          <div className="space-y-6 text-center">
            <div className="text-3xl font-semibold tracking-wide">
              Initializing Olivia One
            </div>

            <div className="h-1 w-64 overflow-hidden rounded-full bg-white/20">
              <div className="animate-loadingBar h-full bg-[#FF2F7D]" />
            </div>

            <div className="text-sm tracking-widest text-white/60">
              RELATIONSHIP OPERATING SYSTEM
            </div>
          </div>
        </div>
      ) : null}

      <style jsx>{`
        @keyframes loadingBar {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }

        .animate-loadingBar {
          animation: loadingBar 2s ease forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease forwards;
        }
      `}</style>
    </>
  );
}
