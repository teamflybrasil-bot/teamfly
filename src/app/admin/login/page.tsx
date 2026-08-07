"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LoaderCircle, Lock } from "lucide-react";
import { BrandMark } from "@/components/shared/brand-mark";
import { Field, Input } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Falha no login");
      router.replace(params.get("next") || "/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao entrar");
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-sm rounded-3xl border border-border bg-card p-8 shadow-premium"
    >
      <div className="flex flex-col items-center text-center">
        <BrandMark className="size-14" />
        <h1 className="mt-4 font-display text-2xl">Painel TeamFly</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Acesse com suas credenciais de administrador.
        </p>
      </div>

      <div className="mt-8 space-y-4">
        <Field label="E-mail" htmlFor="email">
          <Input
            id="email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="voce@teamflybrasil.com.br"
            required
          />
        </Field>
        <Field label="Senha" htmlFor="password">
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </Field>
      </div>

      {error && (
        <p className="mt-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-500">
          {error}
        </p>
      )}

      <Button type="submit" size="lg" disabled={loading} className="mt-6 w-full">
        {loading ? (
          <>
            <LoaderCircle className="size-5 animate-spin" /> Entrando...
          </>
        ) : (
          <>
            <Lock className="size-5" /> Entrar
          </>
        )}
      </Button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="grid min-h-screen place-items-center bg-navy-950 p-6">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
