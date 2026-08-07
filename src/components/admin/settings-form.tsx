"use client";

import { useActionState } from "react";
import { Field, Input, Textarea } from "@/components/ui/field";
import { ImageUpload } from "./image-upload";
import { SubmitButton } from "./submit-button";
import { FormError } from "./form-error";
import { saveSettings } from "@/server/actions";
import { settingFields } from "@/lib/settings";

/**
 * Formulário de textos/imagens. Se `groups` for informado, mostra só esses
 * grupos (para embutir em cada menu do painel). `returnTo` volta pro hub.
 */
export function SettingsForm({
  values,
  groups,
  returnTo,
}: {
  values: Record<string, string>;
  groups?: string[];
  returnTo?: string;
}) {
  const [state, formAction] = useActionState(saveSettings, {});
  const allGroups = [...new Set(settingFields.map((f) => f.group))];
  const shownGroups = groups
    ? allGroups.filter((g) => groups.includes(g))
    : allGroups;

  return (
    <form action={formAction} className="space-y-6">
      {returnTo && <input type="hidden" name="returnTo" value={returnTo} />}
      <FormError message={state.error} />
      {shownGroups.map((group) => (
        <section key={group} className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-display text-lg">{group}</h3>
          <div className="mt-4 space-y-5">
            {settingFields
              .filter((f) => f.group === group)
              .map((f) => {
                if (f.type === "image") {
                  return (
                    <ImageUpload
                      key={f.key}
                      name={f.key}
                      label={f.label}
                      defaultValue={values[f.key] ?? ""}
                      hint={f.help}
                    />
                  );
                }
                return (
                  <Field key={f.key} label={f.label} htmlFor={f.key}>
                    {f.type === "textarea" ? (
                      <Textarea id={f.key} name={f.key} defaultValue={values[f.key] ?? ""} rows={4} />
                    ) : (
                      <Input id={f.key} name={f.key} defaultValue={values[f.key] ?? ""} />
                    )}
                    {f.help && (
                      <span className="text-xs text-muted-foreground">{f.help}</span>
                    )}
                  </Field>
                );
              })}
          </div>
        </section>
      ))}

      <div className="flex items-center gap-3">
        <SubmitButton />
        <span className="text-sm text-muted-foreground">
          As mudanças aparecem no site após salvar.
        </span>
      </div>
    </form>
  );
}
