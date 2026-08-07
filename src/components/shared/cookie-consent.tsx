"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const KEY = "teamfly-cookie-consent";

/** Banner de consentimento de cookies (LGPD). */
export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(KEY)) setShow(true);
  }, []);

  const decide = (value: "accepted" | "rejected") => {
    localStorage.setItem(KEY, value);
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-2xl rounded-2xl border border-border bg-card p-5 shadow-premium sm:left-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Cookie className="size-8 shrink-0 text-orange-500" />
            <p className="flex-1 text-sm text-muted-foreground">
              Usamos cookies para melhorar sua experiência. Ao continuar, você
              concorda com nossa{" "}
              <Link
                href="/privacidade"
                className="text-orange-500 underline underline-offset-2"
              >
                Política de Privacidade
              </Link>
              .
            </p>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" onClick={() => decide("rejected")}>
                Rejeitar
              </Button>
              <Button size="sm" onClick={() => decide("accepted")}>
                Aceitar
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
