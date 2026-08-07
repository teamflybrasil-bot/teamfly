"use client";

import { useActionState } from "react";
import { Field, Input } from "@/components/ui/field";
import { SubmitButton } from "./submit-button";
import { FormError } from "./form-error";
import { changePassword } from "@/server/actions";

export function PasswordForm() {
  const [state, formAction] = useActionState(changePassword, {});
  return (
    <form action={formAction} className="max-w-md space-y-5 rounded-2xl border border-border bg-card p-6">
      <FormError message={state.error} />
      <Field label="Senha atual" required htmlFor="current">
        <Input id="current" name="current" type="password" autoComplete="current-password" required />
      </Field>
      <Field label="Nova senha" required htmlFor="next">
        <Input id="next" name="next" type="password" autoComplete="new-password" required />
      </Field>
      <Field label="Confirmar nova senha" required htmlFor="confirm">
        <Input id="confirm" name="confirm" type="password" autoComplete="new-password" required />
      </Field>
      <SubmitButton label="Alterar senha" />
    </form>
  );
}
