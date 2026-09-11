// Motor de estado do Nurse GO. Porta a classe `Component` do protótipo
// (Nurse GO.dc.html) para um hook React Native. A UI consome `vm`
// (view-model), equivalente ao antigo renderVals(). Ícones aqui são nomes
// Lucide (ver components/Icon.tsx), não caminhos de arquivo.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BANCO, type Questao } from "@/data/banco";
import { CASOS } from "@/data/casos";
import {
  AV_CORES,
  AV_SIMBOLOS,
  CONQUISTAS,
  CUSTO,
  ENERGIA_MAX,
  ENERGIA_MIN,
  META_SEMANAL,
  NIVEIS,
  PREMIOS,
  SEGS,
  SEGUROS,
  SITUACOES,
  TEMPO_QUESTAO,
  TUTORIAL,
  UNIDADES,
  type Segmento,
} from "@/data/constants";
import {
  boostAtivo as calcBoost,
  embaralhar,
  energiaAgora as calcEnergia,
  hojeISO,
  nos as montarNos,
  novoPerfil,
  premiar,
  proximaRecarga as calcRecarga,
  segunda,
} from "@/lib/engine";
import { carregarPerfil, limparPerfil, salvarPerfil } from "@/lib/storage";
import { enviarPerfil, nuvemAtiva } from "@/lib/cloud";
import type { Estado, No, Perfil } from "@/lib/types";

const ESTADO_INICIAL: Estado = {
  tela: "boas",
  perfil: null,
  nomeInput: "",
  modo: "licao",
  fila: [],
  idx: 0,
  escolha: null,
  dica: false,
  dicas: 2,
  bonus: false,
  xpRodada: 0,
  acertos: 0,
  tempo: TEMPO_QUESTAO,
  errosRodada: [],
  noAtual: null,
  ultimoGanho: 0,
  girando: false,
  wheelDeg: 0,
  sorteado: null,
  fimTag: "",
  fimTitulo: "",
  fimTexto: "",
  novas: [],
  fimObito: false,
  caso: null,
  vidas: 3,
  obito: false,
  tutIdx: 0,
  cartas: 1,
  plateia: 1,
  eliminadas: [],
  pesquisa: null,
  parou: false,
  bauAberto: false,
  bauValor: 0,
};

const pct = (n: number, d: number) =>
  Math.max(0, Math.min(100, Math.round((100 * n) / (d || 1)))) + "%";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;

export function useNurseGo() {
  const [st, setSt] = useState<Estado>(ESTADO_INICIAL);
  const stRef = useRef<Estado>(st);
  stRef.current = st;
  const [pronto, setPronto] = useState(false);

  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const relogioRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [, forceRelogio] = useState(0);

  /** setState no estilo do protótipo: objeto ou updater, callback opcional */
  const set = useCallback(
    (
      patch: Partial<Estado> | ((s: Estado) => Partial<Estado> | null),
      cb?: () => void
    ) => {
      const p = typeof patch === "function" ? patch(stRef.current) : patch;
      if (p) {
        stRef.current = { ...stRef.current, ...p };
        setSt(stRef.current);
      }
      if (cb) cb();
    },
    []
  );

  const salvar = useCallback((p: Perfil) => {
    stRef.current = { ...stRef.current, perfil: p };
    setSt(stRef.current);
    void salvarPerfil(p);
    if (nuvemAtiva) void enviarPerfil(p).catch(() => {});
  }, []);

  // ── montagem: carrega perfil local + relógio de energia ──────────
  useEffect(() => {
    (async () => {
      const p = await carregarPerfil();
      if (p) set({ perfil: p, tela: "mapa", nomeInput: p.nome });
      setPronto(true);
    })();
    relogioRef.current = setInterval(() => {
      if (stRef.current.perfil) forceRelogio((n) => n + 1);
    }, 15000);
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
      if (relogioRef.current) clearInterval(relogioRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── helpers de energia ──────────────────────────────────────────
  const boostAtivo = useMemo(() => calcBoost(st.perfil), [st.perfil]);

  const gastarEnergia = useCallback(
    (n: number) => {
      const p = { ...(stRef.current.perfil as Perfil) };
      if (p.premium) return true;
      const atual = calcEnergia(p);
      if (atual < n) return false;
      p.energia = atual - n;
      p.energiaTs = Date.now();
      salvar(p);
      return true;
    },
    [salvar]
  );

  const pool = useCallback((k: "cardio" | "resp" | "misto"): Questao[] => {
    return k === "misto" ? BANCO : BANCO.filter((x) => x.t === k);
  }, []);

  // ── responder ───────────────────────────────────────────────────
  const responder = useCallback(
    (i: number) => {
      const s = stRef.current;
      if (s.escolha !== null) return;
      if (tickRef.current) clearInterval(tickRef.current);
      const q = s.fila[s.idx] as Any;
      const certo = i === q.c;
      const mult = (s.bonus ? 2 : 1) * (calcBoost(s.perfil) ? 2 : 1);
      const peso = s.modo === "caso" ? 3 : q.n || 1;

      if (s.modo === "milhao") {
        set((x) => ({
          escolha: i,
          ultimoGanho: certo ? PREMIOS[x.idx] : 0,
          xpRodada: certo ? PREMIOS[x.idx] : 0,
          acertos: x.acertos + (certo ? 1 : 0),
          errosRodada: certo
            ? x.errosRodada
            : x.errosRodada.concat([{ q, sua: i >= 0 ? q.o[i] : "Tempo esgotado" }]),
        }));
        return;
      }

      const ganho =
        s.modo === "nivel" ? 0 : certo ? Math.round((20 * peso + s.tempo * 2) * mult) : 0;
      const dano = !certo && s.modo === "caso" ? q.dano || 1 : 0;
      const vidas = Math.max(0, (s.vidas || 0) - dano);
      set((x) => ({
        escolha: i,
        ultimoGanho: ganho,
        xpRodada: x.xpRodada + ganho,
        acertos: x.acertos + (certo ? 1 : 0),
        vidas: x.modo === "caso" ? vidas : x.vidas,
        obito: x.modo === "caso" && vidas <= 0,
        errosRodada: certo
          ? x.errosRodada
          : x.errosRodada.concat([{ q, sua: i >= 0 ? q.o[i] : "Tempo esgotado" }]),
      }));
    },
    [set]
  );

  // ── timer da questão ────────────────────────────────────────────
  const iniciarTimer = useCallback(() => {
    if (tickRef.current) clearInterval(tickRef.current);
    set({ tempo: TEMPO_QUESTAO });
    tickRef.current = setInterval(() => {
      const s = stRef.current;
      if (s.escolha !== null) return;
      if (s.tempo <= 1) {
        if (tickRef.current) clearInterval(tickRef.current);
        set({ tempo: 0 }, () => {
          if (stRef.current.tempo === 0 && stRef.current.escolha === null) responder(-1);
        });
        return;
      }
      set({ tempo: s.tempo - 1 });
    }, 1000);
  }, [set, responder]);

  // ── nivelamento ─────────────────────────────────────────────────
  const comecarNivel = useCallback(() => {
    const pega = (t: "cardio" | "resp", n: number) =>
      embaralhar(BANCO.filter((x) => x.t === t && x.n === n)).slice(0, 1);
    const fila = [
      ...pega("cardio", 1),
      ...pega("cardio", 2),
      ...pega("cardio", 3),
      ...pega("resp", 1),
      ...pega("resp", 2),
      ...pega("resp", 3),
    ];
    set({
      tela: "quiz",
      modo: "nivel",
      fila,
      idx: 0,
      escolha: null,
      dica: false,
      xpRodada: 0,
      acertos: 0,
      errosRodada: [],
    });
  }, [set]);

  // ── abrir uma casa da trilha ────────────────────────────────────
  const abrirNo = useCallback(
    (no: No) => {
      const emb = (fila: Any[], modo: Estado["modo"], dicas: number) =>
        set(
          {
            tela: "quiz",
            modo,
            noAtual: no,
            fila,
            idx: 0,
            escolha: null,
            dica: false,
            dicas,
            xpRodada: 0,
            acertos: 0,
            errosRodada: [],
            bonus: false,
          },
          () => iniciarTimer()
        );

      if (no.tipo === "bau") {
        set({ tela: "bau", noAtual: no, bauAberto: false, bauValor: 0 });
        return;
      }
      const custo = CUSTO[no.tipo] || 1;
      if (calcEnergia(stRef.current.perfil) < custo) {
        set({ tela: "energia", noAtual: no });
        return;
      }
      if (no.tipo === "roleta") {
        set({ tela: "roleta", sorteado: null, noAtual: no });
        return;
      }
      if (no.tipo === "caso") {
        if (!gastarEnergia(custo)) return;
        const caso = CASOS[no.ci ?? 0];
        set(
          {
            tela: "quiz",
            modo: "caso",
            noAtual: no,
            caso,
            fila: caso.passos,
            idx: 0,
            escolha: null,
            dica: false,
            dicas: 1,
            xpRodada: 0,
            acertos: 0,
            errosRodada: [],
            bonus: false,
            vidas: caso.vidas,
            obito: false,
          },
          () => iniciarTimer()
        );
        return;
      }
      if (!gastarEnergia(custo)) return;
      const p = pool(no.k);
      if (no.tipo === "licao") {
        emb(p.slice((no.li ?? 0) * 4, (no.li ?? 0) * 4 + 4), "licao", 2);
        return;
      }
      if (no.tipo === "check") {
        emb(embaralhar(p.slice(0, (no.ate ?? 0) * 4)).slice(0, 6), "check", 1);
        return;
      }
      if (no.tipo === "geral") {
        const sortear = (n: number, q: number) =>
          embaralhar(BANCO.filter((x) => x.n === n)).slice(0, q);
        const fila = [...sortear(1, 3), ...sortear(2, 4), ...sortear(3, 3)];
        set(
          {
            tela: "quiz",
            modo: "milhao",
            noAtual: no,
            fila,
            idx: 0,
            escolha: null,
            dica: false,
            dicas: 1,
            xpRodada: 0,
            acertos: 0,
            errosRodada: [],
            bonus: false,
            cartas: 1,
            plateia: 1,
            eliminadas: [],
            pesquisa: null,
            parou: false,
          },
          () => iniciarTimer()
        );
      }
    },
    [set, iniciarTimer, gastarEnergia, pool]
  );

  // ── roleta ──────────────────────────────────────────────────────
  const girar = useCallback(() => {
    if (stRef.current.girando) return;
    const alvo = Math.floor(Math.random() * 6);
    set((s) => ({
      girando: true,
      sorteado: null,
      wheelDeg: s.wheelDeg + 360 * 5 + (360 - (alvo * 60 + 30)),
    }));
    setTimeout(() => set({ girando: false, sorteado: SEGS[alvo] }), 4300);
  }, [set]);

  // ── finalizar rodada ────────────────────────────────────────────
  const finalizar = useCallback(
    (obito: boolean) => {
      const s = stRef.current;
      if (tickRef.current) clearInterval(tickRef.current);
      const hoje = hojeISO();
      const p: Perfil = { ...(s.perfil as Perfil) };
      const total = s.fila.length;
      const corte = s.modo === "licao" ? 0.6 : 0.7;
      const no = s.noAtual;

      let milhaoXp = 0;
      let milhaoTag = "";
      let milhaoTexto = "";
      if (s.modo === "milhao") {
        const q = s.fila[s.idx] as Any;
        const errou = !s.parou && s.escolha !== q.c;
        const acertados = s.parou ? s.idx : errou ? s.idx : s.idx + 1;
        if (s.parou) {
          milhaoXp = acertados > 0 ? PREMIOS[acertados - 1] : 0;
          milhaoTag = "Você parou";
          milhaoTexto =
            "Parou no degrau " + acertados + " e levou o acumulado. Decisão de quem sabe a hora de sair.";
        } else if (errou) {
          const seguro = SEGUROS.filter((x) => x <= acertados).pop();
          milhaoXp = seguro ? PREMIOS[seguro - 1] : 0;
          milhaoTag = "Resposta errada";
          milhaoTexto = seguro
            ? "Você errou no degrau " +
              (acertados + 1) +
              " e caiu para o último ponto garantido, o degrau " +
              seguro +
              "."
            : "Você errou antes do primeiro ponto garantido, no degrau " +
              SEGUROS[0] +
              ", e saiu sem prêmio. Os degraus " +
              SEGUROS.join(" e ") +
              " protegem o acumulado.";
        } else {
          milhaoXp = PREMIOS[PREMIOS.length - 1];
          milhaoTag = "Show do Milhão da Saúde";
          milhaoTexto = "Dez degraus, dez acertos. Você levou o prêmio máximo e fechou a trilha.";
        }
      }

      const passou =
        s.modo === "caso"
          ? !obito
          : s.modo === "milhao"
          ? s.parou || s.acertos >= s.fila.length
          : s.acertos >= Math.ceil(total * corte);

      const xpFinal = obito ? 0 : s.modo === "milhao" ? milhaoXp : s.xpRodada;
      p.xp = (p.xp || 0) + xpFinal;
      p.licoes = (p.licoes || 0) + 1;
      if (p.ultimo !== hoje) {
        p.streak = (p.streak || 0) + 1;
        p.ultimo = hoje;
      }
      if (!p.semana || p.semana.ini !== segunda()) p.semana = { ini: segunda(), n: 0 };
      p.semana = { ...p.semana, n: p.semana.n + 1 };
      if (passou && no && no.i === p.prog) p.prog = no.i + 1;
      if (s.modo === "caso" && passou) p.salvos = (p.salvos || 0) + 1;

      p.ranking = (p.ranking || [])
        .concat([
          {
            nome: p.nome,
            pontos: xpFinal,
            rot: (no && no.rotulo) || "Rodada",
            acertos: s.acertos,
            total,
            data: hoje,
          },
        ])
        .sort((a, b) => b.pontos - a.pontos)
        .slice(0, 10);

      p.erros = s.errosRodada
        .map((e) => {
          const q = e.q as Any;
          return { q: q.q, sua: e.sua, certa: q.o[q.c], exp: q.e, t: q.t };
        })
        .concat((p.erros || []).filter((e) => !s.errosRodada.some((n) => (n.q as Any).q === e.q)))
        .slice(0, 30);

      const lista = montarNos();
      const fimU1 = lista.find((n) => n.tipo === "bau" && n.ui === 0);
      const fimU2 = lista.find((n) => n.tipo === "bau" && n.ui === 1);
      const novas = premiar(p, [
        "inicio",
        s.acertos === total ? "perfeita" : null,
        s.modo === "check" && passou ? "check" : null,
        s.modo === "relampago" && passou ? "relampago" : null,
        (s.modo === "geral" || s.modo === "milhao") && passou ? "geral" : null,
        s.modo === "caso" && passou ? "salvador" : null,
        p.streak >= 3 ? "ofensiva" : null,
        fimU1 && p.prog > fimU1.i ? "cardio" : null,
        fimU2 && p.prog > fimU2.i ? "resp" : null,
      ]);

      salvar(p);

      const tags: Record<string, string> = {
        licao: "Lição concluída",
        check: "O que vimos até aqui",
        geral: "Teste geral",
        relampago: "Rodada relâmpago",
        caso: "Plantão de emergência",
        milhao: "Show do Milhão da Saúde",
      };
      set({
        tela: "fim",
        novas,
        fimObito: !!obito,
        fimTag:
          s.modo === "milhao"
            ? milhaoTag
            : obito
            ? "Paciente perdido"
            : passou
            ? tags[s.modo] || "Rodada concluída"
            : "Quase lá",
        fimTitulo: obito ? "Óbito" : "+" + xpFinal + " XP",
        fimTexto:
          s.modo === "milhao"
            ? milhaoTexto
            : obito
            ? "As condutas erradas somaram dano suficiente para o paciente evoluir a óbito. Leia as explicações na revisão e refaça o caso — na emergência a sequência importa tanto quanto o conteúdo."
            : passou
            ? s.modo === "caso"
              ? "Paciente estabilizado. Você conduziu o caso até o fim sem perder o controle da situação."
              : s.modo === "check"
              ? "Você reteve o conteúdo das lições anteriores. Próximo passo liberado."
              : s.modo === "geral"
              ? "Você domina os dois sistemas. A trilha completa está concluída."
              : "Próximo passo da trilha liberado. Os erros foram para a revisão."
            : "São necessários " +
              Math.round(corte * 100) +
              "% de acertos para avançar. Revise os erros e tente de novo.",
      });
    },
    [set, salvar]
  );

  // ── avançar ─────────────────────────────────────────────────────
  const avancar = useCallback(() => {
    const s = stRef.current;
    if (s.obito) {
      finalizar(true);
      return;
    }
    if (s.modo === "milhao") {
      const q = s.fila[s.idx] as Any;
      const errou = s.escolha !== q.c;
      if (errou) {
        finalizar(false);
        return;
      }
      if (s.idx + 1 < s.fila.length) {
        set(
          (x) => ({ idx: x.idx + 1, escolha: null, dica: false, eliminadas: [], pesquisa: null }),
          () => iniciarTimer()
        );
      } else finalizar(false);
      return;
    }
    if (s.idx + 1 < s.fila.length) {
      set(
        (x) => ({ idx: x.idx + 1, escolha: null, dica: false }),
        () => {
          if (s.modo !== "nivel") iniciarTimer();
        }
      );
      return;
    }
    if (tickRef.current) clearInterval(tickRef.current);

    if (s.modo === "nivel") {
      const nivel = s.acertos >= 5 ? 3 : s.acertos >= 3 ? 2 : 1;
      const prog = nivel === 3 ? 4 : nivel === 2 ? 2 : 0;
      salvar(novoPerfil(s.nomeInput, nivel, prog));
      set({
        tela: "fim",
        novas: [],
        fimTag: "Teste de nivelamento",
        fimTitulo: NIVEIS[nivel],
        fimObito: false,
        fimTexto:
          nivel === 1
            ? "Você começa pela primeira lição. A trilha sobe de dificuldade a cada passo."
            : nivel === 2
            ? "Boa base. As duas primeiras lições já vêm liberadas."
            : "Domínio alto. Quatro lições liberadas — você parte direto para o conteúdo avançado.",
      });
      return;
    }

    finalizar(false);
  }, [set, iniciarTimer, finalizar, salvar]);

  // ── VIEW-MODEL (equivalente ao renderVals do protótipo) ─────────
  const vm = useMemo(() => {
    const s = st;
    const p = (s.perfil || {}) as Partial<Perfil>;
    const q = s.fila[s.idx] as Any;
    const respondeu = s.escolha !== null;
    const certo = q && s.escolha === q.c;
    const ultimo = s.idx + 1 >= s.fila.length;
    const prog = p.prog || 0;

    const lista = montarNos();
    const DX = [0, 32, 52, 32, 0, -32, -52, -32];
    const ICONES: Record<string, string> = {
      check: "ListChecks",
      roleta: "LifeBuoy",
      bau: "Gift",
      geral: "Trophy",
      caso: "HeartPulse",
    };
    const trilha = UNIDADES.map((u, ui) => {
      const nosU = lista.filter((n) => n.ui === ui);
      const feitos = nosU.filter((n) => n.i < prog).length;
      return {
        tag: u.tag,
        nome: u.nome,
        cor: u.cor,
        cor2: ["#3FA0E8", "#2FC79A", "#E8735C"][ui],
        icone: ["HeartPulse", "Wind", "Zap"][ui],
        bgMapa: ["#EAF3FC", "#E9F7F1", "#FCEDF0"][ui],
        progresso: feitos + "/" + nosU.length,
        nos: nosU.map((n, ni) => {
          const feito = n.i < prog;
          const atual = n.i === prog;
          const locked = n.i > prog;
          const dx = DX[n.i % 8];
          const dxAnt = ni === 0 ? dx : DX[nosU[ni - 1].i % 8];
          const dots =
            ni === 0
              ? []
              : [1, 2, 3].map((k) => ({
                  dx: Math.round(dxAnt + (dx - dxAnt) * (k / 4)),
                  cor: n.i <= prog ? "#B9CBD4" : "#DDE6EA",
                }));
          return {
            key: n.i,
            dots,
            dx,
            size: n.tipo === "licao" ? 68 : n.tipo === "geral" ? 72 : 60,
            raio: n.tipo === "bau" || n.tipo === "geral" ? 20 : 999,
            bg: n.i > prog ? "#DAE4E9" : feito ? "#05A67A" : n.cor,
            fg: n.i > prog ? "#52697A" : n.tipo === "bau" && !feito ? "#0A2540" : "#fff",
            sombra: n.i > prog ? "#CDD9DF" : feito ? "#04835F" : "rgba(0,0,0,.24)",
            atual,
            icone: feito ? "Check" : ICONES[n.tipo] || "",
            temIcone: feito || !!ICONES[n.tipo],
            temNumero: !feito && !ICONES[n.tipo],
            numero: String((n.li || 0) + 1),
            iconPx: n.tipo === "licao" ? 26 : n.tipo === "geral" ? 30 : 24,
            rotulo: n.rotulo,
            labelCor: n.i > prog ? "#5A7383" : "#0A2540",
            locked,
            click: () => abrirNo(n),
          };
        }),
      };
    });

    const alternativas = q
      ? (q.o as string[]).map((txt, i) => {
          let bg = "#fff",
            bd = "#DCE6EA",
            fg = "#0A2540",
            tagBg = "#EEF3F5",
            tagFg = "#5A7383",
            sombra = "#DCE6EA";
          if (respondeu) {
            const ok = i === q.c;
            if (ok && s.modo !== "nivel") {
              bg = "#EAF7F2";
              bd = "#05A67A";
              fg = "#04543B";
              tagBg = "#05A67A";
              tagFg = "#fff";
              sombra = "#9FD8C4";
            } else if (i === s.escolha) {
              bg = ok ? "#EAF7F2" : "#FDEDF0";
              bd = ok ? "#05A67A" : "#C2415A";
              fg = ok ? "#04543B" : "#7A1F31";
              tagBg = ok ? "#05A67A" : "#C2415A";
              tagFg = "#fff";
              sombra = ok ? "#9FD8C4" : "#EDB6C1";
            } else {
              bd = "#E7EEF1";
              fg = "#8FA3AE";
              sombra = "#EBF1F3";
            }
          }
          const eliminada = (s.eliminadas || []).includes(i);
          if (eliminada && !respondeu) {
            bg = "#F1F5F6";
            bd = "#E7EEF1";
            fg = "#B4C4CC";
            tagBg = "#E7EEF1";
            tagFg = "#B4C4CC";
            sombra = "#EBF1F3";
          }
          const pes = s.pesquisa;
          return {
            key: i,
            letra: "ABCD"[i],
            txt: eliminada && !respondeu ? "—" : txt,
            bg,
            bd,
            fg,
            tagBg,
            tagFg,
            sombra,
            temPct: !!pes && !respondeu,
            pct: pes ? pes[i] : 0,
            click: () => (eliminada && !respondeu ? null : responder(i)),
          };
        })
      : [];

    const seg = s.sorteado as Segmento | null;
    const erros = (p.erros || []).map((e) => ({
      q: e.q,
      sua: e.sua,
      certa: e.certa,
      exp: e.exp,
      tema: e.t === "cardio" ? "Cardiovascular" : "Respiratório",
      cor: e.t === "cardio" ? "#1B6FD1" : "#05A67A",
    }));
    const ranking = (p.ranking || []).map((r, i) => ({
      pos: i + 1,
      nome: r.nome,
      pontos: r.pontos,
      detalhe:
        r.rot + " · " + r.acertos + "/" + r.total + " · " + r.data.split("-").reverse().slice(0, 2).join("/"),
      bg: i === 0 ? "#EAF7F2" : "#fff",
      bd: i === 0 ? "#C9E9DD" : "#DCE6EA",
      medBg: i === 0 ? "#05A67A" : i === 1 ? "#1B6FD1" : "#EEF3F5",
      medFg: i < 2 ? "#fff" : "#5A7383",
    }));
    const temC = (id: string) => (p.conquistas || []).includes(id);
    const conquistas = CONQUISTAS.map((c) => ({
      icone: c.icone,
      nome: c.nome,
      desc: temC(c.id) ? "+" + c.xp + " XP" : c.desc,
      bg: temC(c.id) ? "#FFF6EC" : "#fff",
      bd: temC(c.id) ? "#F6DDBF" : "#DCE6EA",
      iconBg: temC(c.id) ? "#F2994A" : "#EEF3F5",
      iconFg: temC(c.id) ? "#fff" : "#A9BAC3",
      txtCor: temC(c.id) ? "#0A2540" : "#8FA3AE",
    }));
    const feitasSemana = p.semana && p.semana.ini === segunda() ? p.semana.n : 0;

    const modoTitulo: Record<string, string> = {
      nivel: "Nivelamento",
      check: "O que vimos até aqui",
      geral: "Teste geral de conhecimento",
      relampago: "Rodada relâmpago",
      milhao: "Show do Milhão da Saúde",
    };

    const tut = TUTORIAL[s.tutIdx || 0] || TUTORIAL[0];
    const eBoost = calcBoost(s.perfil);
    const avCorAtual = AV_CORES.find((c) => c.id === (p.avCor || "azul")) || AV_CORES[0];
    const avSimboloAtual =
      AV_SIMBOLOS.find((x) => x.id === (p.avSimbolo || "coracao")) || AV_SIMBOLOS[0];

    return {
      pronto,
      tela: s.tela,
      xpTxt: (p.xp || 0).toLocaleString("pt-BR"),
      streakTxt: (p.streak || 0) + "d",
      nivelTxt: NIVEIS[p.nivel || 1],
      licoesTxt: String(p.licoes || 0),
      nomeJogador: p.nome || "Estudante",
      energiaTxt: p.premium ? "∞" : calcEnergia(s.perfil) + "/" + ENERGIA_MAX,
      energiaMin: ENERGIA_MIN,
      energiaMax: ENERGIA_MAX,
      energiaTitulo: p.premium
        ? "Energia ilimitada"
        : calcEnergia(s.perfil) <= 0
        ? "Sem energia"
        : "Energia " + calcEnergia(s.perfil) + "/" + ENERGIA_MAX,
      recargaTxt: (() => {
        const ms = calcRecarga(s.perfil);
        if (!ms) return "agora";
        const m = Math.floor(ms / 60000);
        const sg = Math.floor((ms % 60000) / 1000);
        return m + " min " + String(sg).padStart(2, "0") + "s";
      })(),
      mostrarBoost: eBoost || !!p.premium,
      boostTxt: p.premium
        ? "Nurse GO Plus ativo · XP em dobro"
        : "Boost de XP 2x por mais " +
          Math.max(1, Math.round(((p.boostAte || 0) - Date.now()) / 60000)) +
          " min",

      trilha,
      metaTxt: feitasSemana + "/" + META_SEMANAL,
      metaPct: pct(feitasSemana, META_SEMANAL),
      metaPctNum: Math.max(0, Math.min(100, Math.round((100 * feitasSemana) / META_SEMANAL))),
      metaSub:
        feitasSemana >= META_SEMANAL
          ? "Meta batida. A ofensiva continua enquanto você jogar todo dia."
          : "Faltam " + (META_SEMANAL - feitasSemana) + " lições para fechar a semana.",

      nomeInput: s.nomeInput,

      tutBarras: TUTORIAL.map((_, i) => i <= (s.tutIdx || 0)),
      tutIcone: tut.icone,
      tutCor: tut.cor,
      tutBg:
        ({ "#1B6FD1": "#EAF3FC", "#F2994A": "#FFF3E7", "#C2415A": "#FDEDF0", "#05A67A": "#EAF7F2" } as Record<string, string>)[
          tut.cor
        ] || "#EAF3FC",
      tutCorTexto:
        ({ "#F2994A": "#B96A16", "#05A67A": "#04724F" } as Record<string, string>)[tut.cor] || tut.cor,
      tutTag: tut.tag,
      tutTitulo: tut.titulo,
      tutTexto: tut.texto,
      tutNoInicio: (s.tutIdx || 0) === 0,
      tutBotao:
        (s.tutIdx || 0) >= TUTORIAL.length - 1
          ? s.perfil
            ? "Voltar à trilha"
            : "Fazer o nivelamento"
          : "Continuar",

      segmentos: SEGS.map((x, i) => ({ nome: x.nome, fg: x.fg, deg: i * 60 + 30 })),
      wheelDeg: s.wheelDeg,
      girando: s.girando,
      sorteado: seg,
      roletaTitulo: seg ? seg.nome : s.girando ? "Girando…" : "Toque para girar",
      roletaSub: seg
        ? seg.tipo === "emergencia"
          ? "Um caso real de plantão. Cada conduta errada tira vida do paciente."
          : seg.tipo === "bau"
          ? "Sorte sua: recompensa direta, sem responder nada."
          : seg.tipo === "bonus"
          ? "Seis questões mistas com XP dobrado."
          : "Seis questões sorteadas de " +
            (seg.k === "misto" ? "todo o banco" : seg.k === "cardio" ? "cardiovascular" : "respiratório") +
            "."
        : "A roleta sorteia o que vem nesta casa: rodada, bônus, baú ou uma emergência.",
      roletaBotao: seg
        ? seg.tipo === "emergencia"
          ? "Assumir o caso"
          : seg.tipo === "bau"
          ? "Abrir o baú"
          : "Começar rodada"
        : s.girando
        ? "…"
        : "Girar",

      bauAberto: s.bauAberto,
      bauValor: s.bauValor,
      bauTag: s.noAtual && s.noAtual.tipo === "bau" ? "Recompensa da unidade" : "Prêmio da roleta",
      bauTitulo: s.bauAberto ? "+" + s.bauValor + " XP" : "Baú fechado",
      bauTexto: s.bauAberto
        ? "XP creditado, mais 2 de energia e boost de XP 2x por 30 minutos."
        : s.noAtual && s.noAtual.tipo === "bau"
        ? "Você chegou ao fim da unidade. Toque no baú para receber a recompensa."
        : "A roleta parou no baú. Toque para receber a recompensa.",

      modo: s.modo,
      modoMilhao: s.modo === "milhao",
      modoCaso: s.modo === "caso",
      tituloQuiz:
        s.modo === "caso"
          ? (s.caso && s.caso.titulo) || "Emergência"
          : modoTitulo[s.modo] || (s.noAtual && s.noAtual.rotulo) || "Lição",
      progPct: pct(s.idx + (respondeu ? 1 : 0), s.fila.length),
      progPctNum: Math.max(0, Math.min(100, Math.round((100 * (s.idx + (respondeu ? 1 : 0))) / (s.fila.length || 1)))),
      xpRodada: s.xpRodada,
      temTimer: s.modo !== "nivel",
      tempoPctNum: Math.max(0, Math.min(100, Math.round((100 * s.tempo) / TEMPO_QUESTAO))),
      tempoTxt: s.tempo + "s",
      corTempo: s.tempo <= 8 ? "#F2994A" : "#05A67A",
      chipTxt:
        s.modo === "milhao"
          ? "Degrau " + (s.idx + 1) + " de " + s.fila.length
          : s.modo === "caso"
          ? "Passo " + (s.idx + 1)
          : q
          ? NIVEIS[q.n]
          : "Base",
      chipBg:
        s.modo === "caso"
          ? "#FDEDF0"
          : q && q.n === 3
          ? "#FDEDF0"
          : q && q.n === 2
          ? "#EAF3FC"
          : "#EAF7F2",
      chipFg:
        s.modo === "caso"
          ? "#C2415A"
          : q && q.n === 3
          ? "#C2415A"
          : q && q.n === 2
          ? "#1B6FD1"
          : "#05A67A",
      subChip:
        s.modo === "nivel"
          ? "questão " + (s.idx + 1) + " de " + s.fila.length
          : s.modo === "milhao"
          ? "vale " + (PREMIOS[s.idx] || 0).toLocaleString("pt-BR") + " XP"
          : s.modo === "caso"
          ? "erro custa " + ((q && q.dano) || 1) + " de vida"
          : q
          ? "vale " + 20 * (q.n || 1) * (s.bonus ? 2 : 1) * (eBoost ? 2 : 1) + " XP + tempo"
          : "",
      enunciado: q ? q.q : "",
      alternativas,

      premioAtual: (PREMIOS[s.idx] || 0).toLocaleString("pt-BR"),
      escada: PREMIOS.map((_, i) => {
        const passado = i < s.idx;
        const atual = i === s.idx;
        const seguro = SEGUROS.includes(i + 1);
        return {
          n: i + 1,
          bg: atual ? "#F2C24A" : passado ? "rgba(123,227,192,.28)" : "rgba(255,255,255,.08)",
          bd: seguro ? "rgba(242,194,74,.75)" : "rgba(255,255,255,.14)",
          fg: atual ? "#3A2A00" : passado ? "#7BE3C0" : "rgba(255,255,255,.55)",
        };
      }),
      escadaNota:
        "Degraus " +
        SEGUROS.join(" e ") +
        " garantem o acumulado. Errar fora deles derruba você para o último ponto seguro.",
      cartas: s.cartas,
      plateia: s.plateia,
      cartasTravada: s.cartas <= 0 || respondeu || (s.eliminadas || []).length > 0,
      plateiaTravada: s.plateia <= 0 || respondeu || !!s.pesquisa,
      pararTravado: respondeu || s.idx === 0,

      vinheta: (s.caso && s.caso.vinheta) || "",
      vidasTxt: (s.vidas || 0) + "/" + ((s.caso && s.caso.vidas) || 3),
      vidasPctNum: Math.max(0, Math.min(100, Math.round((100 * (s.vidas || 0)) / ((s.caso && s.caso.vidas) || 3)))),

      temDica: s.modo !== "nivel",
      mostrarDica: s.dica && !respondeu,
      textoDica: q ? q.d : "",
      dicasRestantes: s.dicas,
      dicaTravada: s.dicas <= 0 || respondeu || s.dica,

      respondeu,
      certo,
      ultimo,
      mostrarFeedback: respondeu,
      temExplicacao: respondeu && s.modo !== "nivel",
      fbBg: s.modo === "nivel" ? "#EEF3F5" : certo ? "#EAF7F2" : "#FDEDF0",
      fbBd: s.modo === "nivel" ? "#DCE6EA" : certo ? "#C9E9DD" : "#F6D2DA",
      fbCor: s.modo === "nivel" ? "#5A7383" : certo ? "#05A67A" : "#C2415A",
      fbIcone: s.modo === "nivel" ? "Check" : certo ? "Check" : "X",
      fbTitulo:
        s.modo === "nivel"
          ? "Resposta registrada"
          : certo
          ? "Correto"
          : s.escolha === -1
          ? "Tempo esgotado"
          : "Não é essa",
      fbGanho: s.modo === "nivel" ? "" : certo ? "+" + s.ultimoGanho + " XP" : "+0",
      explicacao: q ? q.e : "",

      avancarTravado: !respondeu,
      avancarTxt: s.obito
        ? "Ver desfecho"
        : s.modo === "milhao" && respondeu && !certo
        ? "Ver quanto levou"
        : s.modo === "milhao" && !ultimo
        ? "Subir um degrau"
        : ultimo
        ? s.modo === "nivel"
          ? "Ver meu nível"
          : "Ver resultado"
        : "Próxima",
      avancarBg: respondeu ? (certo || s.modo === "nivel" ? "#05A67A" : "#0A2540") : "#9FB3BF",
      avancarSombra: respondeu ? (certo || s.modo === "nivel" ? "#04835F" : "#061A2E") : "#7E939F",

      fimTag: s.fimTag,
      fimTitulo: s.fimTitulo,
      fimTexto: s.fimTexto,
      fimObito: s.fimObito,
      fimBarraPct: Math.max(0, Math.min(100, Math.round((100 * s.acertos) / (s.fila.length || 1)))),
      acertosTxt: s.acertos + "/" + (s.fila.length || 1),
      novasConquistas: s.novas,

      conquistas,
      conquistasTxt: (p.conquistas || []).length + "/" + CONQUISTAS.length,
      ranking,
      rankingVazio: !(p.ranking || []).length,
      erros,
      revisaoVazia: !(p.erros || []).length,
      revisaoResumo: (p.erros || []).length
        ? (p.erros as unknown[]).length + " questões guardadas"
        : "Nenhum erro guardado",
      subtituloPerfil:
        [p.curso, p.instituicao].filter(Boolean).join(" · ") ||
        (p.salvos || 0) + " pacientes salvos · " + (p.licoes || 0) + " atividades",
      situacoes: SITUACOES.map((n) => ({ nome: n, sel: (p.situacao || "Estudando") === n })),
      instituicao: p.instituicao || "",
      curso: p.curso || "",
      planoTxt: p.premium ? "Nurse GO Plus" : "Plano gratuito",
      planoBg: p.premium ? "#7BE3C0" : "rgba(255,255,255,.14)",
      planoFg: p.premium ? "#04352A" : "#fff",

      temFoto: !!p.foto,
      semFoto: !p.foto,
      foto: p.foto || null,
      avPreviewCores: avCorAtual.bg,
      avPreviewIcone: avSimboloAtual.icone,
      avCores: AV_CORES.map((c) => ({ id: c.id, cores: c.bg, sel: (p.avCor || "azul") === c.id })),
      avSimbolos: AV_SIMBOLOS.map((x) => ({ id: x.id, icone: x.icone, sel: (p.avSimbolo || "coracao") === x.id })),
      fotoTitulo: p.foto ? "Trocar a foto" : "Escolher uma foto",
      avatarCores: avCorAtual.bg,
    };
  }, [st, abrirNo, responder, pronto]);

  // ── AÇÕES expostas ──────────────────────────────────────────────
  const acoes = useMemo(
    () => ({
      setNome: (v: string) => set({ nomeInput: v.slice(0, 20) }),
      comecarNivel: () => set({ tela: "tutorial", tutIdx: 0 }),
      pularNivel: () => {
        salvar(novoPerfil(stRef.current.nomeInput, 1, 0));
        set({ tela: "mapa" });
      },
      tutVoltar: () => set((x) => ({ tutIdx: Math.max(0, (x.tutIdx || 0) - 1) })),
      tutAvancar: () => {
        const i = stRef.current.tutIdx || 0;
        if (i < TUTORIAL.length - 1) set({ tutIdx: i + 1 });
        else if (stRef.current.perfil) set({ tela: "mapa" });
        else comecarNivel();
      },
      pularTutorial: () => {
        if (stRef.current.perfil) set({ tela: "mapa" });
        else comecarNivel();
      },
      verTutorial: () => set({ tela: "tutorial", tutIdx: 0 }),
      verEnergia: () => set({ tela: "energia" }),
      assinar: () => {
        const p = stRef.current.perfil as Perfil;
        salvar({ ...p, premium: true, energia: ENERGIA_MAX, energiaTs: Date.now() });
        set({ tela: "mapa" });
      },
      girar,
      acaoRoleta: () => {
        const seg = stRef.current.sorteado;
        if (!seg) {
          girar();
          return;
        }
        if (seg.tipo === "bau") {
          set({ tela: "bau", bauAberto: false, bauValor: 0 });
          return;
        }
        if (seg.tipo === "emergencia") {
          if (!CASOS.length) return;
          const caso = CASOS[Math.floor(Math.random() * CASOS.length)];
          set(
            {
              tela: "quiz",
              modo: "caso",
              caso,
              fila: caso.passos,
              idx: 0,
              escolha: null,
              dica: false,
              dicas: 1,
              xpRodada: 0,
              acertos: 0,
              errosRodada: [],
              bonus: false,
              vidas: caso.vidas,
              obito: false,
            },
            () => iniciarTimer()
          );
          return;
        }
        const fila = embaralhar(pool(seg.k === "emerg" ? "misto" : (seg.k as Any))).slice(0, 6);
        set(
          {
            tela: "quiz",
            modo: "relampago",
            bonus: seg.tipo === "bonus",
            fila,
            idx: 0,
            escolha: null,
            dica: false,
            dicas: 1,
            xpRodada: 0,
            acertos: 0,
            errosRodada: [],
          },
          () => iniciarTimer()
        );
      },
      abrirBau: () => {
        if (stRef.current.bauAberto) return;
        const v = 50 + Math.floor(Math.random() * 11) * 10;
        const np: Perfil = { ...(stRef.current.perfil as Perfil) };
        np.xp = (np.xp || 0) + v;
        np.boostAte = Date.now() + 30 * 60000;
        np.energia = Math.min(ENERGIA_MAX, calcEnergia(np) + 2);
        np.energiaTs = Date.now();
        const no = stRef.current.noAtual;
        if (no && no.i === np.prog) np.prog = no.i + 1;
        salvar(np);
        set({ bauAberto: true, bauValor: v });
      },
      responder,
      pedirDica: () => {
        if (stRef.current.dicas > 0)
          set((x) => ({ dica: true, dicas: x.dicas - 1, xpRodada: Math.max(0, x.xpRodada - 15) }));
      },
      avancar,
      sairQuiz: () => {
        if (tickRef.current) clearInterval(tickRef.current);
        set({ tela: stRef.current.perfil ? "mapa" : "boas" });
      },
      usarCartas: () => {
        const st2 = stRef.current;
        const qq = st2.fila[st2.idx] as Any;
        if (!qq || st2.cartas <= 0) return;
        const erradas = embaralhar([0, 1, 2, 3].filter((i) => i !== qq.c)).slice(0, 2);
        set({ eliminadas: erradas, cartas: st2.cartas - 1 });
      },
      usarPlateia: () => {
        const st2 = stRef.current;
        const qq = st2.fila[st2.idx] as Any;
        if (!qq || st2.plateia <= 0) return;
        const elim = st2.eliminadas || [];
        const validas = [0, 1, 2, 3].filter((i) => !elim.includes(i));
        const acerto =
          validas.length <= 2 ? 62 + Math.floor(Math.random() * 17) : 46 + Math.floor(Math.random() * 26);
        const restante = 100 - acerto;
        const outras = validas.filter((i) => i !== qq.c);
        const res = [0, 0, 0, 0];
        res[qq.c] = acerto;
        let sobra = restante;
        const teto = acerto - 1;
        outras.forEach((idx, k) => {
          const restantes = outras.length - 1 - k;
          const max = Math.min(teto, sobra - restantes);
          const v =
            k === outras.length - 1
              ? Math.min(sobra, teto)
              : Math.max(0, Math.floor(Math.random() * (max + 1)));
          res[idx] = v;
          sobra -= v;
        });
        if (sobra > 0) res[qq.c] += sobra;
        set({ pesquisa: res, plateia: st2.plateia - 1 });
      },
      pararMilhao: () => {
        if (tickRef.current) clearInterval(tickRef.current);
        set({ parou: true }, () => finalizar(false));
      },
      irMapa: () => set({ tela: stRef.current.perfil ? "mapa" : "boas", sorteado: null }),
      irRevisao: () => set({ tela: "revisao" }),
      irPerfil: () => set({ tela: "perfil" }),
      irAvatar: () => set({ tela: "avatar" }),
      escolherCor: (id: string) => salvar({ ...(stRef.current.perfil as Perfil), avCor: id }),
      escolherSimbolo: (id: string) => salvar({ ...(stRef.current.perfil as Perfil), avSimbolo: id }),
      escolherSituacao: (n: string) => salvar({ ...(stRef.current.perfil as Perfil), situacao: n }),
      setInstituicao: (v: string) =>
        salvar({ ...(stRef.current.perfil as Perfil), instituicao: v.slice(0, 48) }),
      setCurso: (v: string) => salvar({ ...(stRef.current.perfil as Perfil), curso: v.slice(0, 48) }),
      /** recebe um data URI (base64) já lido pela UI — ver expo-image-picker */
      setFoto: (dataUri: string) => salvar({ ...(stRef.current.perfil as Perfil), foto: dataUri }),
      removerFoto: () => salvar({ ...(stRef.current.perfil as Perfil), foto: null }),
      limparErros: () => salvar({ ...(stRef.current.perfil as Perfil), erros: [] }),
      /** UI faz a confirmação (Alert) antes de chamar */
      definirNome: (novo: string) => {
        const p = stRef.current.perfil as Perfil;
        if (novo && novo.trim()) salvar({ ...p, nome: novo.trim().slice(0, 20) });
      },
      reiniciar: () => {
        void limparPerfil();
        set({ perfil: null, tela: "boas", nomeInput: "" });
      },
    }),
    [set, salvar, girar, responder, avancar, finalizar, iniciarTimer, comecarNivel, pool]
  );

  return { vm, acoes };
}
