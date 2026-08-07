import { FileText, Mail } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export default async function SolicitacoesPage() {
  const [quotes, contacts] = await Promise.all([
    prisma.quoteRequest.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
    prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
  ]);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl">Solicitações</h1>
        <p className="mt-1 text-muted-foreground">
          Orçamentos e mensagens enviados pelo site.
        </p>
      </div>

      {/* Orçamentos */}
      <section>
        <h2 className="mb-4 flex items-center gap-2 font-display text-xl">
          <FileText className="size-5 text-orange-500" /> Orçamentos ({quotes.length})
        </h2>
        {quotes.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border bg-card p-8 text-center text-muted-foreground">
            Nenhum orçamento recebido ainda.
          </p>
        ) : (
          <div className="space-y-3">
            {quotes.map((q) => (
              <div key={q.id} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold">{q.name}</p>
                  <span className="text-xs text-muted-foreground">{formatDate(q.createdAt)}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {q.origin} → {q.destination} · {q.passengers} pax · {q.tripType}
                </p>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  <a href={`mailto:${q.email}`} className="text-orange-500 hover:underline">{q.email}</a>
                  <span className="text-muted-foreground">{q.phone}</span>
                  {q.competition && <span className="text-muted-foreground">Evento: {q.competition}</span>}
                </div>
                {q.message && <p className="mt-2 text-sm text-muted-foreground">{q.message}</p>}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Mensagens de contato */}
      <section>
        <h2 className="mb-4 flex items-center gap-2 font-display text-xl">
          <Mail className="size-5 text-orange-500" /> Mensagens ({contacts.length})
        </h2>
        {contacts.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border bg-card p-8 text-center text-muted-foreground">
            Nenhuma mensagem recebida ainda.
          </p>
        ) : (
          <div className="space-y-3">
            {contacts.map((m) => (
              <div key={m.id} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold">{m.name} · <span className="font-normal text-muted-foreground">{m.subject}</span></p>
                  <span className="text-xs text-muted-foreground">{formatDate(m.createdAt)}</span>
                </div>
                <a href={`mailto:${m.email}`} className="mt-1 inline-block text-sm text-orange-500 hover:underline">{m.email}</a>
                <p className="mt-2 text-sm text-muted-foreground">{m.message}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
