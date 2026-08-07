"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export type FormState = { error?: string; ok?: boolean };

async function requireSession() {
  const s = await getSession();
  if (!s) throw new Error("Sua sessão expirou. Faça login novamente.");
  return s;
}

/** Converte um erro desconhecido numa mensagem amigável. */
function friendly(e: unknown): string {
  if (e instanceof Error) {
    if (e.message.includes("Unique constraint")) {
      return "Já existe um registro com esse nome/identificador.";
    }
    return e.message;
  }
  return "Ocorreu um erro inesperado. Tente novamente.";
}

function str(fd: FormData, key: string): string {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim() : "";
}
function optStr(fd: FormData, key: string): string | null {
  const v = str(fd, key);
  return v === "" ? null : v;
}
function num(fd: FormData, key: string): number | null {
  const v = str(fd, key);
  if (v === "") return null;
  const n = Number(v.replace(",", "."));
  return Number.isFinite(n) ? n : null;
}
function intNum(fd: FormData, key: string): number | null {
  const n = num(fd, key);
  return n == null ? null : Math.trunc(n);
}
function date(fd: FormData, key: string): Date | null {
  const v = str(fd, key);
  if (!v) return null;
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d;
}
function bool(fd: FormData, key: string): boolean {
  return fd.get(key) === "on" || fd.get(key) === "true";
}
function linesToJson(fd: FormData, key: string): string {
  const raw = str(fd, key);
  const arr = raw
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  return JSON.stringify(arr);
}

async function uniqueSlug(
  model: "championship" | "team" | "athlete",
  name: string,
  currentId?: string,
): Promise<string> {
  const base = slugify(name) || "item";
  let slug = base;
  let i = 1;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const table = prisma[model] as any;
  while (true) {
    const found = await table.findUnique({ where: { slug } });
    if (!found || found.id === currentId) return slug;
    slug = `${base}-${i++}`;
  }
}

/* ------------------------------ Eventos ----------------------------- */

export async function saveChampionship(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    await requireSession();
    const id = str(formData, "id");
    const name = str(formData, "name");
    if (!name) return { error: "Informe o nome do evento." };
    if (!str(formData, "city")) return { error: "Informe a cidade do evento." };

    const data = {
      name,
      modalitySlug: str(formData, "modalitySlug") || "outros",
      city: str(formData, "city"),
      state: str(formData, "state"),
      venue: optStr(formData, "venue"),
      date: date(formData, "date") ?? new Date(),
      time: optStr(formData, "time"),
      registrationDeadline: date(formData, "registrationDeadline"),
      registrationFee: num(formData, "registrationFee"),
      prize: optStr(formData, "prize"),
      description: optStr(formData, "description"),
      organizer: optStr(formData, "organizer"),
      image: optStr(formData, "image"),
      video: optStr(formData, "video"),
      regulationPdf: optStr(formData, "regulationPdf"),
      phone: optStr(formData, "phone"),
      whatsapp: optStr(formData, "whatsapp"),
      site: optStr(formData, "site"),
      instagram: optStr(formData, "instagram"),
      facebook: optStr(formData, "facebook"),
      status: str(formData, "status") || "ATIVO",
      featured: bool(formData, "featured"),
    };

    if (id) {
      await prisma.championship.update({ where: { id }, data });
    } else {
      const slug = await uniqueSlug("championship", name);
      await prisma.championship.create({ data: { ...data, slug } });
    }
  } catch (e) {
    return { error: friendly(e) };
  }
  revalidatePath("/eventos");
  revalidatePath("/");
  revalidatePath("/admin/eventos");
  redirect("/admin/eventos");
}

export async function deleteChampionship(formData: FormData) {
  await requireSession();
  const id = str(formData, "id");
  if (id) await prisma.championship.delete({ where: { id } });
  revalidatePath("/eventos");
  revalidatePath("/admin/eventos");
}

export async function toggleChampionshipStatus(formData: FormData) {
  await requireSession();
  const id = str(formData, "id");
  const current = await prisma.championship.findUnique({ where: { id } });
  if (current) {
    const status = current.status === "ATIVO" ? "FINALIZADO" : "ATIVO";
    await prisma.championship.update({ where: { id }, data: { status } });
  }
  revalidatePath("/eventos");
  revalidatePath("/");
  revalidatePath("/admin/eventos");
}

/* ----------------------------- Parceiros ---------------------------- */

export async function saveTeam(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    await requireSession();
    const id = str(formData, "id");
    const name = str(formData, "name");
    if (!name) return { error: "Informe o nome do parceiro." };

    const data = {
      name,
      modalitySlug: str(formData, "modalitySlug") || "outros",
      city: str(formData, "city"),
      state: str(formData, "state"),
      logo: optStr(formData, "logo"),
      cover: optStr(formData, "cover"),
      description: optStr(formData, "description"),
      instagram: optStr(formData, "instagram"),
      site: optStr(formData, "site"),
      gallery: linesToJson(formData, "gallery"),
      active: bool(formData, "active"),
      order: intNum(formData, "order") ?? 0,
    };

    if (id) {
      await prisma.team.update({ where: { id }, data });
    } else {
      const slug = await uniqueSlug("team", name);
      await prisma.team.create({ data: { ...data, slug } });
    }
  } catch (e) {
    return { error: friendly(e) };
  }
  revalidatePath("/equipes");
  revalidatePath("/admin/parceiros");
  redirect("/admin/parceiros");
}

export async function deleteTeam(formData: FormData) {
  await requireSession();
  const id = str(formData, "id");
  if (id) await prisma.team.delete({ where: { id } });
  revalidatePath("/equipes");
  revalidatePath("/admin/parceiros");
}

export async function toggleTeamActive(formData: FormData) {
  await requireSession();
  const id = str(formData, "id");
  const current = await prisma.team.findUnique({ where: { id } });
  if (current) {
    await prisma.team.update({ where: { id }, data: { active: !current.active } });
  }
  revalidatePath("/equipes");
  revalidatePath("/admin/parceiros");
}

/* ------------------------------ Atletas ----------------------------- */

export async function saveAthlete(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    await requireSession();
    const id = str(formData, "id");
    const name = str(formData, "name");
    if (!name) return { error: "Informe o nome do atleta." };

    const data = {
      name,
      modalitySlug: str(formData, "modalitySlug") || "outros",
      city: str(formData, "city"),
      state: str(formData, "state"),
      team: optStr(formData, "team"),
      photo: optStr(formData, "photo"),
      bio: optStr(formData, "bio"),
      achievements: linesToJson(formData, "achievements"),
      sponsors: linesToJson(formData, "sponsors"),
      instagram: optStr(formData, "instagram"),
      video: optStr(formData, "video"),
      gallery: linesToJson(formData, "gallery"),
      featured: bool(formData, "featured"),
      active: bool(formData, "active"),
    };

    if (id) {
      await prisma.athlete.update({ where: { id }, data });
    } else {
      const slug = await uniqueSlug("athlete", name);
      await prisma.athlete.create({ data: { ...data, slug } });
    }
  } catch (e) {
    return { error: friendly(e) };
  }
  revalidatePath("/atletas");
  revalidatePath("/");
  revalidatePath("/admin/home");
  redirect("/admin/home");
}

export async function deleteAthlete(formData: FormData) {
  await requireSession();
  const id = str(formData, "id");
  if (id) await prisma.athlete.delete({ where: { id } });
  revalidatePath("/atletas");
  revalidatePath("/admin/home");
}

export async function toggleAthleteActive(formData: FormData) {
  await requireSession();
  const id = str(formData, "id");
  const current = await prisma.athlete.findUnique({ where: { id } });
  if (current) {
    await prisma.athlete.update({ where: { id }, data: { active: !current.active } });
  }
  revalidatePath("/atletas");
  revalidatePath("/admin/home");
}

/* ------------------------------ Galeria ----------------------------- */

export async function saveMedia(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    await requireSession();
    const id = str(formData, "id");
    const url = str(formData, "url");
    if (!url) return { error: "Envie ou informe o endereço da imagem/vídeo." };

    const data = {
      type: str(formData, "type") || "PHOTO",
      title: optStr(formData, "title"),
      url,
      thumbnail: optStr(formData, "thumbnail") || url,
      year: intNum(formData, "year"),
      city: optStr(formData, "city"),
      modalitySlug: optStr(formData, "modalitySlug"),
      championship: optStr(formData, "championship"),
    };

    if (id) {
      await prisma.media.update({ where: { id }, data });
    } else {
      await prisma.media.create({ data });
    }
  } catch (e) {
    return { error: friendly(e) };
  }
  revalidatePath("/galeria");
  revalidatePath("/");
  revalidatePath("/admin/galeria");
  redirect("/admin/galeria");
}

export async function deleteMedia(formData: FormData) {
  await requireSession();
  const id = str(formData, "id");
  if (id) await prisma.media.delete({ where: { id } });
  revalidatePath("/galeria");
  revalidatePath("/admin/galeria");
}

/* ---------------------------- Depoimentos --------------------------- */

export async function saveTestimonial(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    await requireSession();
    const id = str(formData, "id");
    const name = str(formData, "name");
    const quote = str(formData, "quote");
    if (!name) return { error: "Informe o nome de quem deu o depoimento." };
    if (!quote) return { error: "Escreva o texto do depoimento." };

    const data = {
      name,
      role: str(formData, "role"),
      quote,
      avatar: optStr(formData, "avatar"),
      order: intNum(formData, "order") ?? 0,
      active: bool(formData, "active"),
    };

    if (id) {
      await prisma.testimonial.update({ where: { id }, data });
    } else {
      await prisma.testimonial.create({ data });
    }
  } catch (e) {
    return { error: friendly(e) };
  }
  revalidatePath("/");
  revalidatePath("/admin/depoimentos");
  redirect("/admin/depoimentos");
}

export async function deleteTestimonial(formData: FormData) {
  await requireSession();
  const id = str(formData, "id");
  if (id) await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/depoimentos");
}

export async function toggleTestimonialActive(formData: FormData) {
  await requireSession();
  const id = str(formData, "id");
  const current = await prisma.testimonial.findUnique({ where: { id } });
  if (current) {
    await prisma.testimonial.update({
      where: { id },
      data: { active: !current.active },
    });
  }
  revalidatePath("/");
  revalidatePath("/admin/depoimentos");
}

/* ------------------------------ Banners ----------------------------- */

export async function saveBanner(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    await requireSession();
    const id = str(formData, "id");
    const image = str(formData, "image");
    if (!image) return { error: "Envie a imagem do banner." };

    const data = {
      image,
      badge: optStr(formData, "badge"),
      title: optStr(formData, "title"),
      subtitle: optStr(formData, "subtitle"),
      tagline: optStr(formData, "tagline"),
      ctaLabel: optStr(formData, "ctaLabel"),
      ctaHref: optStr(formData, "ctaHref"),
      order: intNum(formData, "order") ?? 0,
      active: bool(formData, "active"),
    };

    if (id) {
      await prisma.banner.update({ where: { id }, data });
    } else {
      await prisma.banner.create({ data });
    }
  } catch (e) {
    return { error: friendly(e) };
  }
  revalidatePath("/");
  revalidatePath("/admin/home");
  redirect("/admin/home");
}

export async function deleteBanner(formData: FormData) {
  await requireSession();
  const id = str(formData, "id");
  if (id) await prisma.banner.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/home");
}

export async function toggleBannerActive(formData: FormData) {
  await requireSession();
  const id = str(formData, "id");
  const current = await prisma.banner.findUnique({ where: { id } });
  if (current) {
    await prisma.banner.update({ where: { id }, data: { active: !current.active } });
  }
  revalidatePath("/");
  revalidatePath("/admin/home");
}

/* -------------------------------- Planos ---------------------------- */

export async function savePlan(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    await requireSession();
    const id = str(formData, "id");
    const name = str(formData, "name");
    if (!name) return { error: "Informe o nome do plano." };

    const features = JSON.stringify(
      str(formData, "features")
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    );

    const data = {
      name,
      audience: optStr(formData, "audience"),
      price: optStr(formData, "price") || "Sob consulta",
      features,
      highlight: bool(formData, "highlight"),
      order: intNum(formData, "order") ?? 0,
      active: bool(formData, "active"),
    };

    if (id) {
      await prisma.plan.update({ where: { id }, data });
    } else {
      await prisma.plan.create({ data });
    }
  } catch (e) {
    return { error: friendly(e) };
  }
  revalidatePath("/servicos");
  redirect(str(formData, "returnTo") || "/admin/servicos");
}

export async function deletePlan(formData: FormData) {
  await requireSession();
  const id = str(formData, "id");
  if (id) await prisma.plan.delete({ where: { id } });
  revalidatePath("/servicos");
  revalidatePath("/admin/servicos");
}

export async function togglePlanActive(formData: FormData) {
  await requireSession();
  const id = str(formData, "id");
  const current = await prisma.plan.findUnique({ where: { id } });
  if (current) {
    await prisma.plan.update({ where: { id }, data: { active: !current.active } });
  }
  revalidatePath("/servicos");
  revalidatePath("/admin/servicos");
}

/* ------------------------ Blocos de conteúdo ------------------------ */

export async function saveContentBlock(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    await requireSession();
    const id = str(formData, "id");
    const section = str(formData, "section") || "differentials";
    const title = str(formData, "title");
    if (!title) return { error: "Informe o título do bloco." };

    const data = {
      section,
      icon: optStr(formData, "icon"),
      title,
      text: str(formData, "text"),
      order: intNum(formData, "order") ?? 0,
      active: bool(formData, "active"),
    };

    if (id) {
      await prisma.contentBlock.update({ where: { id }, data });
    } else {
      await prisma.contentBlock.create({ data });
    }
  } catch (e) {
    return { error: friendly(e) };
  }
  revalidatePath("/");
  revalidatePath("/servicos");
  revalidatePath("/quem-somos");
  redirect(str(formData, "returnTo") || "/admin");
}

export async function deleteContentBlock(formData: FormData) {
  await requireSession();
  const id = str(formData, "id");
  if (id) await prisma.contentBlock.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/servicos");
  revalidatePath("/admin");
}

export async function toggleContentBlockActive(formData: FormData) {
  await requireSession();
  const id = str(formData, "id");
  const current = await prisma.contentBlock.findUnique({ where: { id } });
  if (current) {
    await prisma.contentBlock.update({ where: { id }, data: { active: !current.active } });
  }
  revalidatePath("/");
  revalidatePath("/servicos");
  revalidatePath("/admin");
}

/* --------------------------- Trocar senha --------------------------- */

export async function changePassword(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const session = await requireSession();
    const current = str(formData, "current");
    const next = str(formData, "next");
    const confirm = str(formData, "confirm");
    if (!current || !next) return { error: "Preencha todos os campos." };
    if (next.length < 6) return { error: "A nova senha deve ter ao menos 6 caracteres." };
    if (next !== confirm) return { error: "A confirmação não confere com a nova senha." };

    const user = await prisma.user.findUnique({ where: { id: session.sub } });
    if (!user) return { error: "Usuário não encontrado." };
    const ok = await bcrypt.compare(current, user.password);
    if (!ok) return { error: "Senha atual incorreta." };

    const hash = await bcrypt.hash(next, 10);
    await prisma.user.update({ where: { id: user.id }, data: { password: hash } });
  } catch (e) {
    return { error: friendly(e) };
  }
  redirect("/admin/conta?ok=1");
}

/* --------------------------- Configurações -------------------------- */

export async function saveSettings(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  let back = "/admin";
  try {
    await requireSession();
    const entries = [...formData.entries()].filter(
      ([k]) => !k.startsWith("$") && k !== "returnTo",
    );
    for (const [key, value] of entries) {
      if (typeof value !== "string") continue;
      await prisma.setting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
    }
    back = str(formData, "returnTo") || back;
  } catch (e) {
    return { error: friendly(e) };
  }
  revalidatePath("/", "layout");
  redirect(`${back}${back.includes("?") ? "&" : "?"}ok=1`);
}
