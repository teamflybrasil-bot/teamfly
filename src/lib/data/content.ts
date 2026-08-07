import type { Testimonial, StatItem } from "@/types";

/** Números institucionais exibidos na home e no "Quem Somos". */
export const stats: StatItem[] = [
  { label: "Atletas transportados", value: 12000, suffix: "+" },
  { label: "Equipes atendidas", value: 480, suffix: "+" },
  { label: "Eventos operados", value: 350, suffix: "+" },
  { label: "Destinos no Brasil e exterior", value: 90, suffix: "+" },
];

/** Depoimentos de clientes. */
export const testimonials: Testimonial[] = [
  {
    id: "d1",
    name: "Carlos Eduardo",
    role: "Diretor — Rio Runners Elite",
    quote:
      "A TeamFly assumiu toda a logística da nossa delegação para a maratona internacional. Chegamos descansados e focados. Simplesmente impecável.",
  },
  {
    id: "d2",
    name: "Fernanda Lima",
    role: "Gestora — Curitiba Vôlei",
    quote:
      "Passagens, hospedagem e transporte de equipamentos resolvidos em um único contato. Economizamos tempo e dinheiro em todas as viagens.",
  },
  {
    id: "d3",
    name: "Professor Anderson",
    role: "Head coach — Gracie Fortaleza",
    quote:
      "Levar 30 atletas para um campeonato nacional era um pesadelo. Com a TeamFly virou rotina tranquila. Recomendo de olhos fechados.",
  },
];

/** Diferenciais exibidos na home. */
export const differentials = [
  {
    icon: "PlaneTakeoff",
    title: "Tarifas negociadas",
    description:
      "Acordos com companhias aéreas garantem os melhores preços para grupos e delegações.",
  },
  {
    icon: "Users",
    title: "Especialistas em grupos",
    description:
      "Emissão de passagens em bloco, remarcações e gestão de nomes sem dor de cabeça.",
  },
  {
    icon: "Luggage",
    title: "Logística de equipamentos",
    description:
      "Transporte de bikes, materiais e bagagens especiais com todo o cuidado.",
  },
  {
    icon: "Clock",
    title: "Atendimento 24/7",
    description:
      "Suporte em viagem em tempo real, do embarque à volta para casa.",
  },
  {
    icon: "ShieldCheck",
    title: "Segurança e conformidade",
    description:
      "Processos claros, contratos e total transparência em cada etapa.",
  },
  {
    icon: "Trophy",
    title: "Foco na performance",
    description:
      "Cuidamos da logística para o atleta chegar inteiro e render no pódio.",
  },
];

/** Etapas do "Como funciona". */
export const howItWorks = [
  {
    step: "01",
    title: "Solicite seu orçamento",
    description:
      "Conte o destino, as datas e o tamanho da delegação. Respondemos rápido.",
  },
  {
    step: "02",
    title: "Receba um plano sob medida",
    description:
      "Montamos a melhor combinação de voos, hospedagem e transporte para sua equipe.",
  },
  {
    step: "03",
    title: "Embarque tranquilo",
    description:
      "Cuidamos de emissões, check-ins e imprevistos enquanto você foca no jogo.",
  },
  {
    step: "04",
    title: "Chegue ao pódio",
    description:
      "Sua equipe chega descansada, no horário e pronta para competir.",
  },
];

/** Marca-passo institucional (linha do tempo). */
export const timeline = [
  { year: "2016", title: "O início", text: "Nasce a TeamFly Brasil com foco em delegações de futebol de base." },
  { year: "2019", title: "Expansão de modalidades", text: "Passamos a atender vôlei, basquete, lutas e esportes individuais." },
  { year: "2022", title: "Operação nacional", text: "Estrutura para atender equipes nas cinco regiões do país." },
  { year: "2025", title: "Voo internacional", text: "Delegações brasileiras em competições fora do país com logística completa." },
  { year: "2026", title: "Do embarque ao pódio", text: "Nova fase institucional unindo futebol e corrida de rua em grandes eventos." },
];

/** Valores institucionais. */
export const values = [
  { icon: "Target", title: "Compromisso", text: "Assumimos a logística como se o pódio fosse nosso." },
  { icon: "Handshake", title: "Parceria", text: "Relações de longo prazo com clubes, atletas e organizadores." },
  { icon: "Zap", title: "Agilidade", text: "Respostas rápidas e soluções para imprevistos em tempo real." },
  { icon: "Gem", title: "Excelência", text: "Padrão premium em cada detalhe da viagem." },
];
