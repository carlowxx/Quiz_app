"use client";

// Nurse GO — UI. Porta fiel das telas de Nurse GO.dc.html para React/TSX,
// consumindo o view-model de useNurseGo(). Estilos inline, como no
// protótipo, para acompanhar pixel a pixel.

import { useState } from "react";
import { Icon } from "./Icon";
import { useNurseGo } from "@/hooks/useNurseGo";

const FONT_T = "'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif";
const FONT_B = "'Public Sans', ui-sans-serif, system-ui, sans-serif";

export function NurseGo() {
  const { vm, acoes } = useNurseGo();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#071B2E",
        display: "flex",
        justifyContent: "center",
        fontFamily: FONT_B,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 430,
          minHeight: "100vh",
          background: "#F5F8F9",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {vm.tela === "boas" && <TelaBoas vm={vm} acoes={acoes} />}
        {vm.tela === "tutorial" && <TelaTutorial vm={vm} acoes={acoes} />}
        {vm.tela === "mapa" && <TelaMapa vm={vm} acoes={acoes} />}
        {vm.tela === "roleta" && <TelaRoleta vm={vm} acoes={acoes} />}
        {vm.tela === "avatar" && <TelaAvatar vm={vm} acoes={acoes} />}
        {vm.tela === "energia" && <TelaEnergia vm={vm} acoes={acoes} />}
        {vm.tela === "bau" && <TelaBau vm={vm} acoes={acoes} />}
        {vm.tela === "quiz" && <TelaQuiz vm={vm} acoes={acoes} />}
        {vm.tela === "fim" && <TelaFim vm={vm} acoes={acoes} />}
        {vm.tela === "perfil" && <TelaPerfil vm={vm} acoes={acoes} />}
        {vm.tela === "revisao" && <TelaRevisao vm={vm} acoes={acoes} />}
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type VM = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Acoes = any;
interface Props {
  vm: VM;
  acoes: Acoes;
}

function BotaoVoltar({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 32,
        height: 32,
        borderRadius: "50%",
        border: "1px solid rgba(255,255,255,.22)",
        background: "rgba(255,255,255,.08)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Icon src="icons/chevron-left.svg" size={17} />
    </button>
  );
}

// ───────────────────────── Boas-vindas ─────────────────────────
function TelaBoas({ vm, acoes }: Props) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "36px 26px",
        background: "linear-gradient(170deg,#0A2540,#124E77 65%,#05A67A 165%)",
        color: "#fff",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 12,
            background: "#05A67A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 0 4px rgba(5,166,122,.22)",
            fontFamily: FONT_T,
            fontWeight: 800,
            fontSize: 16,
          }}
        >
          N
        </div>
        <div style={{ fontFamily: FONT_T, fontWeight: 800, fontSize: 21, letterSpacing: "-.4px" }}>
          Nurse<span style={{ color: "#7BE3C0" }}>GO</span>
        </div>
      </div>
      <div
        style={{
          marginTop: 26,
          fontFamily: FONT_T,
          fontWeight: 800,
          fontSize: 33,
          lineHeight: 1.1,
          letterSpacing: "-1px",
        }}
      >
        Fisiologia e anatomia, um passo por dia.
      </div>
      <div style={{ marginTop: 12, fontSize: 15, lineHeight: 1.55, color: "rgba(255,255,255,.75)", maxWidth: 320 }}>
        Trilha de lições curtas sobre os sistemas cardiovascular e respiratório. Antes de começar, um teste rápido
        define de onde você parte.
      </div>

      <div style={{ marginTop: 28 }}>
        <div style={{ fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 700, color: "rgba(255,255,255,.55)" }}>
          Como quer ser chamado
        </div>
        <input
          value={vm.nomeInput}
          onChange={(e) => acoes.setNome(e.target.value)}
          placeholder="Seu nome"
          style={{
            marginTop: 9,
            width: "100%",
            padding: "15px 16px",
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,.22)",
            background: "rgba(255,255,255,.10)",
            color: "#fff",
            fontSize: 16,
            fontWeight: 600,
            outline: "none",
          }}
        />
      </div>

      <button
        onClick={acoes.comecarNivel}
        style={{
          marginTop: 18,
          width: "100%",
          padding: 17,
          border: "none",
          borderRadius: 18,
          background: "#fff",
          color: "#0A2540",
          fontFamily: FONT_T,
          fontWeight: 800,
          fontSize: 16.5,
          boxShadow: "0 10px 26px -12px rgba(0,0,0,.8)",
        }}
      >
        Começar
      </button>
      <button
        onClick={acoes.pularNivel}
        style={{
          marginTop: 12,
          width: "100%",
          background: "none",
          border: "none",
          color: "rgba(255,255,255,.6)",
          fontSize: 13,
          fontWeight: 600,
          textDecoration: "underline",
          textUnderlineOffset: 3,
        }}
      >
        Ir direto para a trilha, sem teste
      </button>
      <div style={{ marginTop: 24, fontSize: 12, color: "rgba(255,255,255,.45)", lineHeight: 1.5 }}>
        Tour rápido do app, depois 6 questões de nivelamento · cerca de 3 minutos
      </div>
    </div>
  );
}

// ───────────────────────── Tutorial ─────────────────────────
function TelaTutorial({ vm, acoes }: Props) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F5F8F9" }}>
      <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ display: "flex", gap: 5, flex: 1 }}>
          {vm.tutBarras.map((b: { cor: string }, i: number) => (
            <div key={i} style={{ flex: 1, height: 5, borderRadius: 99, background: b.cor, transition: "background .3s" }} />
          ))}
        </div>
        <button onClick={acoes.pularTutorial} style={{ flex: "none", border: "none", background: "none", color: "#5A7383", fontSize: 12.5, fontWeight: 700 }}>
          Pular
        </button>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "8px 24px 24px" }}>
        <div
          style={{
            width: 150,
            height: 150,
            borderRadius: 40,
            background: vm.tutBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "ngPop .35s ease both",
            boxShadow: `0 18px 34px -20px ${vm.tutCor}`,
          }}
        >
          <Icon src={vm.tutIcone} size={66} color={vm.tutCor} />
        </div>
        <div style={{ marginTop: 26, fontSize: 10.5, letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 700, color: vm.tutCorTexto }}>
          {vm.tutTag}
        </div>
        <div style={{ marginTop: 7, fontFamily: FONT_T, fontWeight: 800, fontSize: 29, lineHeight: 1.12, letterSpacing: "-.9px", color: "#0A2540" }}>
          {vm.tutTitulo}
        </div>
        <div style={{ marginTop: 12, fontSize: 15, lineHeight: 1.6, color: "#41586A" }}>{vm.tutTexto}</div>
      </div>

      <div style={{ padding: "0 20px 26px", display: "flex", gap: 10 }}>
        <button
          onClick={acoes.tutVoltar}
          disabled={vm.tutNoInicio}
          style={{
            flex: "none",
            width: 56,
            padding: "15px 0",
            borderRadius: 16,
            border: "1px solid #DCE6EA",
            background: "#fff",
            color: "#5A7383",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: vm.tutNoInicio ? 0.4 : 1,
          }}
        >
          <Icon src="icons/chevron-left.svg" size={16} />
        </button>
        <button
          onClick={acoes.tutAvancar}
          style={{
            flex: 1,
            padding: 16,
            borderRadius: 16,
            border: "none",
            background: "#0A2540",
            color: "#fff",
            fontFamily: FONT_T,
            fontWeight: 800,
            fontSize: 15.5,
            boxShadow: "0 5px 0 #061A2E",
          }}
        >
          {vm.tutBotao}
        </button>
      </div>
    </div>
  );
}

// ───────────────────────── Mapa / trilha ─────────────────────────
function TelaMapa({ vm, acoes }: Props) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 5,
          background: "#0A2540",
          color: "#fff",
          padding: "13px 18px",
          display: "flex",
          alignItems: "center",
          gap: 15,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Icon src="icons/sparkles.svg" size={16} color="#7BE3C0" />
          <span style={{ fontFamily: FONT_T, fontWeight: 700, fontSize: 15 }}>{vm.xpTxt}</span>
          <span style={{ fontSize: 11.5, color: "rgba(255,255,255,.6)" }}>XP</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Icon src="icons/flame.svg" size={16} color="#F2994A" />
          <span style={{ fontFamily: FONT_T, fontWeight: 700, fontSize: 15, color: "#F2994A" }}>{vm.streakTxt}</span>
        </div>
        <button
          onClick={acoes.verEnergia}
          style={{ display: "flex", alignItems: "center", gap: 5, border: "none", background: "none", padding: 0, color: "#fff" }}
        >
          <Icon src="icons/zap.svg" size={16} color="#F2C24A" />
          <span style={{ fontFamily: FONT_T, fontWeight: 700, fontSize: 15, color: "#F2C24A" }}>{vm.energiaTxt}</span>
        </button>
        <div
          style={{
            marginLeft: "auto",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: ".04em",
            textTransform: "uppercase",
            color: "#0A2540",
            background: "#7BE3C0",
            padding: "5px 10px",
            borderRadius: 99,
          }}
        >
          {vm.nivelTxt}
        </div>
      </div>

      {vm.mostrarBoost && (
        <div
          style={{
            background: "linear-gradient(90deg,#F2994A,#F2C24A)",
            color: "#3A1D00",
            padding: "7px 18px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          <Icon src="icons/sparkles.svg" size={14} />
          {vm.boostTxt}
        </div>
      )}

      <div style={{ padding: "16px 18px 0", display: "flex", gap: 12, alignItems: "stretch" }}>
        <div
          style={{
            flex: "none",
            width: 86,
            borderRadius: 18,
            background: "repeating-linear-gradient(135deg,#E4EDF1 0 7px,#F2F7F9 7px 14px)",
            border: "1px dashed #BFD0D8",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            padding: 8,
            textAlign: "center",
            animation: "ngFloat 5s ease-in-out infinite",
          }}
        >
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#CFDDE4" }} />
          <div style={{ fontFamily: "ui-monospace,Menlo,monospace", fontSize: 9, lineHeight: 1.25, color: "#5A7383" }}>
            mascote
            <br />
            86×110
          </div>
        </div>
        <div
          style={{
            flex: 1,
            minWidth: 0,
            background: "#fff",
            border: "1px solid #DCE6EA",
            borderRadius: 18,
            padding: "14px 16px",
            boxShadow: "0 6px 16px -12px rgba(10,37,64,.5)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontFamily: FONT_T, fontWeight: 700, fontSize: 14, color: "#0A2540" }}>
              <Icon src="icons/target.svg" size={16} color="#1B6FD1" />
              Meta da semana
            </div>
            <div style={{ fontSize: 12, color: "#5A7383", fontWeight: 600 }}>{vm.metaTxt}</div>
          </div>
          <div style={{ height: 9, borderRadius: 99, background: "#E7EEF1", marginTop: 9, overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: 99, background: "linear-gradient(90deg,#1B6FD1,#05A67A)", transition: "width .4s", width: vm.metaPct }} />
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: "#5A7383", lineHeight: 1.45 }}>{vm.metaSub}</div>
        </div>
      </div>

      <div style={{ flex: 1, padding: "0 0 100px" }}>
        {vm.trilha.map((u: VM, ui: number) => (
          <div key={ui}>
            <div
              style={{
                position: "relative",
                margin: "20px 16px 2px",
                background: `linear-gradient(135deg,${u.cor},${u.cor2})`,
                borderRadius: 20,
                padding: "16px 18px",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                gap: 12,
                boxShadow: `0 10px 22px -12px ${u.cor}`,
                overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", right: -26, top: -34, width: 110, height: 110, borderRadius: "50%", background: "rgba(255,255,255,.10)" }} />
              <div style={{ position: "absolute", right: 24, bottom: -46, width: 76, height: 76, borderRadius: "50%", background: "rgba(255,255,255,.08)" }} />
              <div
                style={{
                  position: "relative",
                  flex: "none",
                  width: 42,
                  height: 42,
                  borderRadius: 14,
                  background: "rgba(255,255,255,.2)",
                  border: "1px solid rgba(255,255,255,.28)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon src={u.icone} size={23} color="#fff" />
              </div>
              <div style={{ flex: 1, position: "relative" }}>
                <div style={{ fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 700, opacity: 0.75 }}>{u.tag}</div>
                <div style={{ fontFamily: FONT_T, fontWeight: 800, fontSize: 19, letterSpacing: "-.3px", marginTop: 2 }}>{u.nome}</div>
              </div>
              <div
                style={{
                  position: "relative",
                  flex: "none",
                  fontSize: 12.5,
                  fontWeight: 800,
                  background: "rgba(255,255,255,.22)",
                  border: "1px solid rgba(255,255,255,.3)",
                  padding: "7px 12px",
                  borderRadius: 99,
                  fontFamily: FONT_T,
                }}
              >
                {u.progresso}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "14px 0 10px", margin: "0 10px", borderRadius: 24, background: u.bgMapa }}>
              {u.nos.map((n: VM) => (
                <div key={n.key} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7, padding: "7px 0" }}>
                    {n.dots.map((d: { dx: string; cor: string }, k: number) => (
                      <div key={k} style={{ width: 7, height: 7, borderRadius: "50%", background: d.cor, transform: `translateX(${d.dx})` }} />
                    ))}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7, transform: `translateX(${n.dx})`, width: 176 }}>
                    <button
                      onClick={n.click}
                      disabled={n.locked}
                      style={{
                        position: "relative",
                        width: n.size,
                        height: n.size,
                        borderRadius: n.raio,
                        border: "none",
                        background: n.bg,
                        color: n.fg,
                        boxShadow: n.sombra,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: FONT_T,
                        fontWeight: 800,
                        animation: n.anim ? "ngRing 2s ease-in-out infinite" : "none",
                        transition: "transform .12s",
                        overflow: "hidden",
                        cursor: n.locked ? "default" : "pointer",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          top: 5,
                          left: 8,
                          right: 8,
                          height: "38%",
                          borderRadius: 99,
                          background: "linear-gradient(180deg,rgba(255,255,255,.28),rgba(255,255,255,0))",
                          pointerEvents: "none",
                        }}
                      />
                      {n.temIcone ? (
                        <Icon src={n.icone} size={n.iconPx} />
                      ) : n.temNumero ? (
                        <span style={{ position: "relative", fontSize: 22 }}>{n.numero}</span>
                      ) : null}
                    </button>
                    <div style={{ fontSize: 11.5, fontWeight: 600, color: n.labelCor, textAlign: "center", lineHeight: 1.3, maxWidth: 170 }}>
                      {n.rotulo}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: 430,
          background: "#fff",
          borderTop: "1px solid #DCE6EA",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          padding: "9px 10px 14px",
          zIndex: 6,
        }}
      >
        <button onClick={acoes.irMapa} style={{ border: "none", background: "#EAF7F2", borderRadius: 14, padding: "9px 4px", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, color: "#05A67A" }}>
          <Icon src="icons/map.svg" size={21} />
          <span style={{ fontSize: 11, fontWeight: 700, color: "#04724F" }}>Trilha</span>
        </button>
        <button onClick={acoes.irRevisao} style={{ border: "none", background: "none", padding: "9px 4px", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, color: "#5A7383" }}>
          <Icon src="icons/rotate-ccw.svg" size={21} />
          <span style={{ fontSize: 11, fontWeight: 700 }}>Revisão</span>
        </button>
        <button onClick={acoes.irPerfil} style={{ border: "none", background: "none", padding: "9px 4px", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, color: "#5A7383" }}>
          <Icon src="icons/user-round.svg" size={21} />
          <span style={{ fontSize: 11, fontWeight: 700 }}>Perfil</span>
        </button>
      </div>
    </div>
  );
}

// ───────────────────────── Roleta ─────────────────────────
function TelaRoleta({ vm, acoes }: Props) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "linear-gradient(175deg,#0A2540,#0E3A5E 70%,#0A2540)" }}>
      <div style={{ padding: "18px 20px", display: "flex", alignItems: "center", gap: 12 }}>
        <BotaoVoltar onClick={acoes.irMapa} />
        <div style={{ fontFamily: FONT_T, fontWeight: 700, fontSize: 16, color: "#fff" }}>Roleta da trilha</div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 22px 34px" }}>
        <div style={{ position: "relative", width: 266, height: 266, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div
            style={{
              position: "absolute",
              top: -8,
              left: "50%",
              marginLeft: -11,
              width: 22,
              height: 26,
              background: "#fff",
              clipPath: "polygon(50% 100%,0 0,100% 0)",
              zIndex: 3,
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,.4))",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "8px solid #0A2540",
              boxShadow: "0 0 0 4px rgba(255,255,255,.18),0 24px 50px -14px rgba(0,0,0,.7)",
              overflow: "hidden",
              background:
                "conic-gradient(#1B6FD1 0deg 60deg,#C2415A 60deg 120deg,#7BE3C0 120deg 180deg,#F2C24A 180deg 240deg,#0A2540 240deg 300deg,#F2994A 300deg 360deg)",
              transition: "transform 4.2s cubic-bezier(.16,.9,.2,1)",
              transform: `rotate(${vm.wheelDeg})`,
            }}
          >
            {vm.segmentos.map((s: { nome: string; fg: string; deg: string }, i: number) => (
              <div key={i} style={{ position: "absolute", top: "50%", left: "50%", width: 0, height: 0, transform: `rotate(${s.deg})` }}>
                <div
                  style={{
                    position: "absolute",
                    transform: "translate(-50%,-50%) translateY(-86px)",
                    width: 76,
                    textAlign: "center",
                    fontFamily: FONT_T,
                    fontWeight: 700,
                    fontSize: 12,
                    color: s.fg,
                  }}
                >
                  {s.nome}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              position: "absolute",
              width: 62,
              height: 62,
              borderRadius: "50%",
              background: "#fff",
              zIndex: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 14px rgba(0,0,0,.35)",
            }}
          >
            <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#05A67A" }} />
          </div>
        </div>
        <div style={{ marginTop: 28, textAlign: "center", minHeight: 62 }}>
          <div style={{ fontFamily: FONT_T, fontWeight: 800, fontSize: 23, color: "#fff", letterSpacing: "-.5px" }}>{vm.roletaTitulo}</div>
          <div style={{ marginTop: 6, fontSize: 13.5, color: "rgba(255,255,255,.66)", lineHeight: 1.45, maxWidth: 290, marginLeft: "auto", marginRight: "auto" }}>
            {vm.roletaSub}
          </div>
        </div>
        <button
          onClick={() => (vm.sorteado ? acoes.acaoRoleta() : acoes.girar())}
          disabled={vm.girando}
          style={{
            marginTop: 20,
            width: "100%",
            padding: 17,
            border: "none",
            borderRadius: 18,
            background: "#fff",
            color: "#0A2540",
            fontFamily: FONT_T,
            fontWeight: 800,
            fontSize: 16.5,
            opacity: vm.girando ? 0.5 : 1,
          }}
        >
          {vm.roletaBotao}
        </button>
      </div>
    </div>
  );
}

// ───────────────────────── Avatar ─────────────────────────
function TelaAvatar({ vm, acoes }: Props) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F5F8F9" }}>
      <div style={{ background: "#0A2540", padding: "18px 20px 26px", color: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <BotaoVoltar onClick={acoes.irPerfil} />
          <div style={{ fontFamily: FONT_T, fontWeight: 700, fontSize: 17 }}>Seu avatar</div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
          <div
            style={{
              position: "relative",
              width: 112,
              height: 112,
              borderRadius: 36,
              background: vm.avPreviewBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 16px 30px -16px rgba(0,0,0,.8)",
            }}
          >
            <Icon src={vm.avPreviewSrc} size={52} color="#fff" />
          </div>
        </div>
      </div>

      <div style={{ padding: "20px 20px 30px" }}>
        <div style={{ fontFamily: FONT_T, fontWeight: 700, fontSize: 14, color: "#0A2540" }}>Cor</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 9, marginTop: 10 }}>
          {vm.avCores.map((c: { id: string; bg: string; sel: boolean }) => (
            <button
              key={c.id}
              onClick={() => acoes.escolherCor(c.id)}
              style={{ aspectRatio: "1", borderRadius: 16, background: c.bg, border: `3px solid ${c.sel ? "#0A2540" : "transparent"}`, padding: 0 }}
            />
          ))}
        </div>

        <div style={{ fontFamily: FONT_T, fontWeight: 700, fontSize: 14, color: "#0A2540", marginTop: 22 }}>Símbolo</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 9, marginTop: 10 }}>
          {vm.avSimbolos.map((i: { id: string; src: string; sel: boolean }) => (
            <button
              key={i.id}
              onClick={() => acoes.escolherSimbolo(i.id)}
              style={{
                aspectRatio: "1",
                borderRadius: 16,
                background: i.sel ? "#0A2540" : "#fff",
                border: `2px solid ${i.sel ? "#0A2540" : "#DCE6EA"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
              }}
            >
              <Icon src={i.src} size={22} color={i.sel ? "#fff" : "#5A7383"} />
            </button>
          ))}
        </div>

        <div style={{ fontFamily: FONT_T, fontWeight: 700, fontSize: 14, color: "#0A2540", marginTop: 22 }}>Ou use uma foto</div>
        <label
          style={{
            marginTop: 10,
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "#fff",
            border: "1px dashed #BFD0D8",
            borderRadius: 16,
            padding: 14,
            cursor: "pointer",
            position: "relative",
          }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) acoes.setFoto(f);
            }}
            style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer" }}
          />
          <span
            style={{
              width: 38,
              height: 38,
              flex: "none",
              borderRadius: 13,
              background: "rgba(90,115,131,.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon src="icons/user-round.svg" size={19} color="#5A7383" />
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 13.5, color: "#0A2540" }}>{vm.fotoTitulo}</div>
            <div style={{ fontSize: 11.5, color: "#5A7383", marginTop: 1 }}>A foto substitui o avatar montado</div>
          </div>
        </label>
        {vm.temFoto && (
          <button
            onClick={acoes.removerFoto}
            style={{ marginTop: 10, width: "100%", padding: 13, borderRadius: 14, border: "1px solid #DCE6EA", background: "#fff", color: "#C2415A", fontWeight: 700, fontSize: 12.5 }}
          >
            Remover foto e usar o avatar
          </button>
        )}
      </div>
    </div>
  );
}

// ───────────────────────── Energia / paywall ─────────────────────────
function TelaEnergia({ vm, acoes }: Props) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "32px 24px",
        background: "linear-gradient(175deg,#0A2540,#123A5C 70%,#0A2540)",
        color: "#fff",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 18,
            background: "rgba(242,153,74,.2)",
            border: "1px solid rgba(242,153,74,.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon src="icons/zap.svg" size={26} color="#F2994A" />
        </div>
        <div>
          <div style={{ fontFamily: FONT_T, fontWeight: 800, fontSize: 24, letterSpacing: "-.6px" }}>{vm.energiaTitulo}</div>
          <div style={{ fontSize: 12.5, color: "rgba(255,255,255,.6)" }}>Próxima recarga em {vm.recargaTxt}</div>
        </div>
      </div>
      <div style={{ marginTop: 14, fontSize: 14.5, lineHeight: 1.55, color: "rgba(255,255,255,.75)" }}>
        Cada lição consome 1 energia e cada caso de emergência consome 2. Você recupera 1 a cada {vm.energiaMin} minutos,
        até {vm.energiaMax}.
      </div>

      <div
        style={{
          marginTop: 24,
          background: "linear-gradient(135deg,#05A67A,#1B6FD1)",
          borderRadius: 22,
          padding: 20,
          boxShadow: "0 14px 30px -16px #05A67A",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 700, color: "rgba(255,255,255,.8)" }}>
          <Icon src="icons/sparkles.svg" size={14} />
          Nurse GO Plus
        </div>
        <div style={{ fontFamily: FONT_T, fontWeight: 800, fontSize: 22, letterSpacing: "-.5px", marginTop: 6 }}>Energia ilimitada</div>
        <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6, fontSize: 13.5, color: "rgba(255,255,255,.88)" }}>
          <div>Estude sem pausa, sem esperar recarga</div>
          <div>Boost de XP permanente de 2x</div>
          <div>Casos de emergência liberados no seu ritmo</div>
        </div>
        <button
          onClick={acoes.assinar}
          style={{ marginTop: 16, width: "100%", padding: 15, border: "none", borderRadius: 16, background: "#fff", color: "#0A2540", fontFamily: FONT_T, fontWeight: 800, fontSize: 15.5, boxShadow: "0 5px 0 rgba(0,0,0,.2)" }}
        >
          Assinar por R$ 14,90/mês
        </button>
        <div style={{ marginTop: 9, textAlign: "center", fontSize: 11, color: "rgba(255,255,255,.7)" }}>
          Simulação: nenhum pagamento é processado nesta versão.
        </div>
      </div>

      <button
        onClick={acoes.irMapa}
        style={{ marginTop: 14, width: "100%", padding: 15, borderRadius: 16, border: "1px solid rgba(255,255,255,.25)", background: "rgba(255,255,255,.08)", color: "#fff", fontWeight: 700, fontSize: 14 }}
      >
        Esperar a recarga
      </button>
      <button
        onClick={acoes.irRevisao}
        style={{ marginTop: 10, width: "100%", background: "none", border: "none", color: "rgba(255,255,255,.6)", fontSize: 13, fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 3 }}
      >
        Revisar erros enquanto isso (não gasta energia)
      </button>
    </div>
  );
}

// ───────────────────────── Baú ─────────────────────────
function TelaBau({ vm, acoes }: Props) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 22,
        padding: "36px 26px",
        background: "linear-gradient(175deg,#0A2540,#124E77 70%,#0A2540)",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 700, color: "rgba(255,255,255,.5)" }}>{vm.bauTag}</div>
      <button
        onClick={acoes.abrirBau}
        disabled={vm.bauAberto}
        style={{
          width: 134,
          height: 134,
          borderRadius: 34,
          border: "none",
          background: vm.bauAberto ? "#7BE3C0" : "#F2C24A",
          color: "#0A2540",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 12px 0 rgba(0,0,0,.28)",
          animation: "ngPop .35s ease both",
        }}
      >
        <Icon src={vm.bauAberto ? "icons/sparkles.svg" : "icons/gift.svg"} size={62} />
      </button>
      <div style={{ fontFamily: FONT_T, fontWeight: 800, fontSize: 26, letterSpacing: "-.6px" }}>{vm.bauTitulo}</div>
      <div style={{ fontSize: 14, lineHeight: 1.55, color: "rgba(255,255,255,.72)", maxWidth: 290 }}>{vm.bauTexto}</div>
      <button onClick={acoes.irMapa} style={{ width: "100%", padding: 16, borderRadius: 18, border: "none", background: "#fff", color: "#0A2540", fontFamily: FONT_T, fontWeight: 800, fontSize: 16 }}>
        Voltar à trilha
      </button>
    </div>
  );
}

// ───────────────────────── Quiz ─────────────────────────
function TelaQuiz({ vm, acoes }: Props) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F5F8F9" }}>
      <div style={{ background: "#0A2540", padding: "14px 18px 16px", color: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={acoes.sairQuiz}
            style={{ width: 30, height: 30, flex: "none", borderRadius: "50%", border: "1px solid rgba(255,255,255,.22)", background: "rgba(255,255,255,.08)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <Icon src="icons/x.svg" size={14} />
          </button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 10.5, letterSpacing: ".09em", textTransform: "uppercase", color: "rgba(255,255,255,.55)", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {vm.tituloQuiz}
            </div>
            <div style={{ height: 6, borderRadius: 99, background: "rgba(255,255,255,.16)", marginTop: 6, overflow: "hidden" }}>
              <div style={{ height: "100%", background: "#05A67A", borderRadius: 99, transition: "width .35s", width: vm.progPct }} />
            </div>
          </div>
          <div style={{ textAlign: "right", flex: "none" }}>
            <div style={{ fontSize: 10.5, color: "rgba(255,255,255,.55)", fontWeight: 600 }}>XP</div>
            <div style={{ fontFamily: FONT_T, fontWeight: 700, fontSize: 16 }}>{vm.xpRodada}</div>
          </div>
        </div>
        {vm.temTimer && (
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginTop: 12 }}>
            <Icon src="icons/timer.svg" size={15} color={vm.corTempo} />
            <div style={{ flex: 1, height: 6, borderRadius: 99, background: "rgba(255,255,255,.14)", overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 99, transition: "width 1s linear", background: vm.corTempo, width: vm.tempoPct }} />
            </div>
            <div style={{ fontFamily: FONT_T, fontWeight: 700, fontSize: 13.5, color: vm.corTempo, minWidth: 32, textAlign: "right" }}>{vm.tempoTxt}</div>
          </div>
        )}
      </div>

      {vm.modoMilhao && (
        <div style={{ margin: "14px 16px 0", background: "linear-gradient(135deg,#0A2540,#274B6B)", borderRadius: 20, padding: "15px 16px", color: "#fff", boxShadow: "0 10px 22px -14px #0A2540" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Icon src="icons/trophy.svg" size={16} color="#F2C24A" />
            <div style={{ fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 700, color: "rgba(255,255,255,.7)" }}>Valendo agora</div>
            <div style={{ marginLeft: "auto", fontFamily: FONT_T, fontWeight: 800, fontSize: 17, color: "#F2C24A" }}>{vm.premioAtual} XP</div>
          </div>
          <div style={{ display: "flex", gap: 4, marginTop: 11 }}>
            {vm.escada.map((d: { n: number; bg: string; bd: string; fg: string }, i: number) => (
              <div key={i} style={{ flex: 1, height: 26, borderRadius: 7, background: d.bg, border: `1px solid ${d.bd}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800, color: d.fg, fontFamily: FONT_T }}>
                {d.n}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 9, fontSize: 11.5, color: "rgba(255,255,255,.65)", lineHeight: 1.4 }}>{vm.escadaNota}</div>
        </div>
      )}

      {vm.modoMilhao && (
        <div style={{ display: "flex", gap: 8, margin: "12px 16px 0" }}>
          <button
            onClick={acoes.usarCartas}
            disabled={vm.cartasTravada}
            style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 5, padding: "11px 6px", borderRadius: 15, border: "2px solid #DCE6EA", background: "#fff", color: "#1B6FD1", opacity: vm.cartasTravada ? 0.45 : 1 }}
          >
            <Icon src="icons/list-checks.svg" size={19} />
            <span style={{ fontSize: 11, fontWeight: 700 }}>Cartas</span>
          </button>
          <button
            onClick={acoes.usarPlateia}
            disabled={vm.plateiaTravada}
            style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 5, padding: "11px 6px", borderRadius: 15, border: "2px solid #DCE6EA", background: "#fff", color: "#05A67A", opacity: vm.plateiaTravada ? 0.45 : 1 }}
          >
            <Icon src="icons/user-round.svg" size={19} />
            <span style={{ fontSize: 11, fontWeight: 700 }}>Plateia</span>
          </button>
          <button
            onClick={acoes.pararMilhao}
            disabled={vm.pararTravado}
            style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 5, padding: "11px 6px", borderRadius: 15, border: "2px solid #F6DDBF", background: "#FFF6EC", color: "#B96A16", opacity: vm.pararTravado ? 0.45 : 1 }}
          >
            <Icon src="icons/gift.svg" size={19} />
            <span style={{ fontSize: 11, fontWeight: 700 }}>Parar</span>
          </button>
        </div>
      )}

      {vm.modoCaso && (
        <div style={{ margin: "14px 16px 0", background: "linear-gradient(135deg,#C2415A,#E8735C)", borderRadius: 20, padding: "16px 18px", color: "#fff", boxShadow: "0 10px 22px -14px #C2415A" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Icon src="icons/heart-pulse.svg" size={16} />
            <div style={{ fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 700, opacity: 0.85 }}>Vida do paciente</div>
            <div style={{ marginLeft: "auto", fontFamily: FONT_T, fontWeight: 800, fontSize: 14 }}>{vm.vidasTxt}</div>
          </div>
          <div style={{ height: 10, borderRadius: 99, background: "rgba(0,0,0,.22)", marginTop: 9, overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: 99, background: "#fff", transition: "width .5s", width: vm.vidasPct }} />
          </div>
          <div style={{ marginTop: 11, fontSize: 13.5, lineHeight: 1.5, color: "rgba(255,255,255,.92)" }}>{vm.vinheta}</div>
        </div>
      )}

      <div style={{ padding: "16px 16px 0" }}>
        <div style={{ position: "relative", background: "#fff", border: "1px solid #DCE6EA", borderRadius: 22, padding: "18px 18px 20px", boxShadow: "0 12px 26px -18px rgba(10,37,64,.7)", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: -30, top: -40, width: 120, height: 120, borderRadius: "50%", background: vm.chipBg, opacity: 0.7 }} />
          <div style={{ position: "relative", display: "flex", gap: 7, alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", padding: "5px 10px", borderRadius: 99, background: vm.chipBg, color: vm.chipFg }}>
              {vm.chipTxt}
            </span>
            <span style={{ fontSize: 11.5, color: "#5A7383", fontWeight: 500 }}>{vm.subChip}</span>
          </div>
          <div style={{ position: "relative", fontFamily: FONT_T, fontWeight: 700, fontSize: 21, lineHeight: 1.3, letterSpacing: "-.4px", color: "#0A2540" }}>{vm.enunciado}</div>
        </div>
      </div>

      <div style={{ padding: "14px 16px 0", display: "flex", flexDirection: "column", gap: 10 }}>
        {vm.alternativas.map((a: VM) => (
          <button
            key={a.key}
            onClick={a.click}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
              width: "100%",
              textAlign: "left",
              padding: "14px 15px",
              borderRadius: 16,
              border: `2px solid ${a.bd}`,
              background: a.bg,
              color: a.fg,
              boxShadow: `0 4px 0 ${a.sombra}`,
              transition: "all .14s",
            }}
          >
            <span style={{ flex: "none", width: 24, height: 24, borderRadius: 8, background: a.tagBg, color: a.tagFg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12, fontFamily: FONT_T }}>
              {a.letra}
            </span>
            <span style={{ flex: 1, minWidth: 0, fontSize: 14.5, lineHeight: 1.4, fontWeight: 500, paddingTop: 2 }}>{a.txt}</span>
            {a.temPct && (
              <span style={{ flex: "none", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, paddingTop: 3 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: "#05A67A", fontFamily: FONT_T }}>{a.pctTxt}</span>
                <span style={{ display: "block", width: 44, height: 5, borderRadius: 99, background: "#E7EEF1", overflow: "hidden" }}>
                  <span style={{ display: "block", height: "100%", borderRadius: 99, background: "#05A67A", width: a.pctTxt }} />
                </span>
              </span>
            )}
          </button>
        ))}
      </div>

      {vm.mostrarDica && (
        <div style={{ margin: "14px 20px 0", padding: "14px 16px", borderRadius: 16, background: "#EAF3FC", border: "1px solid #C7DEF6", animation: "ngUp .3s ease both" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10.5, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#1B6FD1" }}>
            <Icon src="icons/lightbulb.svg" size={14} />
            Dica do professor
          </div>
          <div style={{ marginTop: 6, fontSize: 13.5, lineHeight: 1.5, color: "#0A2540" }}>{vm.textoDica}</div>
        </div>
      )}

      {vm.mostrarFeedback && (
        <div style={{ margin: "16px 20px 0", padding: 16, borderRadius: 18, background: vm.fbBg, border: `1px solid ${vm.fbBd}`, animation: "ngUp .28s ease both" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 24, height: 24, borderRadius: "50%", background: vm.fbCor, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon src={vm.fbIcone} size={14} />
            </div>
            <div style={{ fontFamily: FONT_T, fontWeight: 800, fontSize: 15.5, color: vm.fbCor }}>{vm.fbTitulo}</div>
            <div style={{ marginLeft: "auto", fontWeight: 700, fontSize: 14, color: vm.fbCor, fontFamily: FONT_T }}>{vm.fbGanho}</div>
          </div>
          {vm.temExplicacao && <div style={{ marginTop: 9, fontSize: 13.5, lineHeight: 1.55, color: "#0A2540" }}>{vm.explicacao}</div>}
        </div>
      )}

      <div style={{ marginTop: "auto", padding: "18px 20px 22px", display: "flex", gap: 10 }}>
        {vm.temDica && (
          <button
            onClick={acoes.pedirDica}
            disabled={vm.dicaTravada}
            style={{
              flex: "none",
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "15px 16px",
              borderRadius: 16,
              border: "2px solid #C7DEF6",
              background: "#fff",
              color: "#1B6FD1",
              fontWeight: 700,
              fontSize: 13.5,
              opacity: vm.dicaTravada ? 0.45 : 1,
              boxShadow: "0 5px 0 #DCE9F7",
            }}
          >
            <Icon src="icons/lightbulb.svg" size={16} />
            {vm.dicasRestantes}
          </button>
        )}
        <button
          onClick={acoes.avancar}
          disabled={vm.avancarTravado}
          style={{
            flex: 1,
            padding: 15,
            borderRadius: 16,
            border: "none",
            background: vm.avancarBg,
            color: "#fff",
            fontFamily: FONT_T,
            fontWeight: 800,
            fontSize: 15.5,
            opacity: vm.respondeu ? 1 : 0.7,
            boxShadow: `0 5px 0 ${vm.avancarSombra}`,
          }}
        >
          {vm.avancarTxt}
        </button>
      </div>
    </div>
  );
}

// ───────────────────────── Fim de rodada ─────────────────────────
function TelaFim({ vm, acoes }: Props) {
  return (
    <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "34px 24px", background: vm.fimBg, color: "#fff", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {vm.confete.map((c: { left: string; cor: string; dur: string; delay: string }, i: number) => (
          <div key={i} style={{ position: "absolute", top: 0, left: c.left, width: 8, height: 12, borderRadius: 2, background: c.cor, animation: `ngConf ${c.dur} ease-in ${c.delay} both` }} />
        ))}
      </div>
      <div style={{ position: "relative", display: "flex", alignItems: "flex-end", gap: 14 }}>
        <div
          style={{
            flex: "none",
            width: 78,
            height: 96,
            borderRadius: 16,
            background: "repeating-linear-gradient(135deg,rgba(255,255,255,.13) 0 7px,rgba(255,255,255,.06) 7px 14px)",
            border: "1px dashed rgba(255,255,255,.35)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            textAlign: "center",
            animation: "ngFloat 5s ease-in-out infinite",
          }}
        >
          <div style={{ width: 26, height: 26, borderRadius: "50%", background: "rgba(255,255,255,.22)" }} />
          <div style={{ fontFamily: "ui-monospace,Menlo,monospace", fontSize: 8, lineHeight: 1.25, color: "rgba(255,255,255,.72)" }}>
            {vm.fimObito ? "mascote luto" : "mascote comemora"}
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.55)", fontWeight: 700 }}>{vm.fimTag}</div>
          <div style={{ fontFamily: FONT_T, fontWeight: 800, fontSize: 40, letterSpacing: "-1.4px", marginTop: 6, animation: "ngPop .4s ease both" }}>{vm.fimTitulo}</div>
        </div>
      </div>
      <div style={{ position: "relative", fontSize: 15, color: "rgba(255,255,255,.78)", lineHeight: 1.55, marginTop: 12, maxWidth: 320 }}>{vm.fimTexto}</div>
      <div style={{ position: "relative", height: 8, borderRadius: 99, background: "rgba(255,255,255,.16)", marginTop: 16, overflow: "hidden" }}>
        <div style={{ height: "100%", borderRadius: 99, background: "linear-gradient(90deg,#7BE3C0,#F2C24A)", animation: "ngBar .9s cubic-bezier(.2,.8,.2,1) both", width: vm.fimBarra }} />
      </div>

      <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 18 }}>
        <div style={{ background: "rgba(255,255,255,.10)", border: "1px solid rgba(255,255,255,.16)", borderRadius: 16, padding: 14 }}>
          <div style={{ fontSize: 10.5, letterSpacing: ".08em", textTransform: "uppercase", color: "rgba(255,255,255,.6)", fontWeight: 600 }}>Acertos</div>
          <div style={{ fontFamily: FONT_T, fontWeight: 700, fontSize: 22, marginTop: 3 }}>{vm.acertosTxt}</div>
        </div>
        <div style={{ background: "rgba(255,255,255,.10)", border: "1px solid rgba(255,255,255,.16)", borderRadius: 16, padding: 14 }}>
          <div style={{ fontSize: 10.5, letterSpacing: ".08em", textTransform: "uppercase", color: "rgba(255,255,255,.6)", fontWeight: 600 }}>XP ganho</div>
          <div style={{ fontFamily: FONT_T, fontWeight: 700, fontSize: 22, marginTop: 3 }}>{vm.xpRodada}</div>
        </div>
      </div>

      {vm.novasConquistas.length > 0 && (
        <div style={{ position: "relative", marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
          {vm.novasConquistas.map((c: VM, i: number) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(242,153,74,.16)", border: "1px solid rgba(242,153,74,.4)", borderRadius: 16, padding: "12px 14px", animation: "ngUp .35s ease both" }}>
              <div style={{ width: 34, height: 34, flex: "none", borderRadius: 11, background: "#F2994A", color: "#0A2540", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon src={c.icone} size={19} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 700, color: "#F2994A" }}>Conquista desbloqueada</div>
                <div style={{ fontFamily: FONT_T, fontWeight: 700, fontSize: 14.5, marginTop: 1 }}>{c.nome}</div>
              </div>
              <div style={{ fontWeight: 700, fontSize: 13, color: "#F2994A" }}>+{c.xp}</div>
            </div>
          ))}
        </div>
      )}

      <button onClick={acoes.irMapa} style={{ position: "relative", marginTop: 22, padding: 17, borderRadius: 18, border: "none", background: "#fff", color: "#0A2540", fontFamily: FONT_T, fontWeight: 800, fontSize: 16, boxShadow: "0 6px 0 rgba(0,0,0,.22)" }}>
        Voltar à trilha
      </button>
      <button onClick={acoes.irRevisao} style={{ position: "relative", marginTop: 14, padding: 14, borderRadius: 16, border: "1px solid rgba(255,255,255,.25)", background: "rgba(255,255,255,.08)", color: "#fff", fontWeight: 700, fontSize: 13.5 }}>
        Revisar os erros
      </button>
    </div>
  );
}

// ───────────────────────── Perfil ─────────────────────────
function TelaPerfil({ vm, acoes }: Props) {
  const [instituicao, setInstituicao] = useState(vm.instituicao);
  const [curso, setCurso] = useState(vm.curso);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F5F8F9" }}>
      <div style={{ background: "#0A2540", padding: "18px 20px 22px", color: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <BotaoVoltar onClick={acoes.irMapa} />
          <div style={{ fontFamily: FONT_T, fontWeight: 700, fontSize: 17 }}>Perfil</div>
          <button onClick={acoes.trocarNome} style={{ marginLeft: "auto", border: "none", background: "rgba(255,255,255,.12)", color: "#fff", fontSize: 11.5, fontWeight: 600, padding: "7px 12px", borderRadius: 99 }}>
            Trocar nome
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 16 }}>
          <button
            onClick={acoes.irAvatar}
            style={{ position: "relative", flex: "none", width: 78, height: 78, borderRadius: 26, overflow: "hidden", cursor: "pointer", background: vm.avatarBg, border: "none", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 20px -12px rgba(0,0,0,.9)" }}
          >
            {vm.semFoto && <Icon src={vm.avPreviewSrc} size={36} color="#fff" />}
            <span style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "3px 0", background: "rgba(10,37,64,.7)", fontSize: 9, fontWeight: 700, color: "#fff" }}>editar</span>
          </button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: FONT_T, fontWeight: 800, fontSize: 21, letterSpacing: "-.4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{vm.nomeJogador}</div>
            <div style={{ fontSize: 12.5, color: "rgba(255,255,255,.62)", marginTop: 3 }}>{vm.subtituloPerfil}</div>
            <div style={{ marginTop: 8, display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, padding: "5px 10px", borderRadius: 99, background: vm.planoBg, color: vm.planoFg }}>
              {vm.planoTxt}
            </div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginTop: 16 }}>
          <div style={{ background: "rgba(255,255,255,.10)", border: "1px solid rgba(255,255,255,.16)", borderRadius: 14, padding: "11px 12px" }}>
            <div style={{ fontSize: 10, letterSpacing: ".09em", textTransform: "uppercase", color: "rgba(255,255,255,.6)", fontWeight: 600 }}>XP</div>
            <div style={{ fontFamily: FONT_T, fontWeight: 700, fontSize: 18, marginTop: 3 }}>{vm.xpTxt}</div>
          </div>
          <div style={{ background: "rgba(255,255,255,.10)", border: "1px solid rgba(255,255,255,.16)", borderRadius: 14, padding: "11px 12px" }}>
            <div style={{ fontSize: 10, letterSpacing: ".09em", textTransform: "uppercase", color: "rgba(255,255,255,.6)", fontWeight: 600 }}>Ofensiva</div>
            <div style={{ fontFamily: FONT_T, fontWeight: 700, fontSize: 18, marginTop: 3 }}>{vm.streakTxt}</div>
          </div>
          <div style={{ background: "rgba(255,255,255,.10)", border: "1px solid rgba(255,255,255,.16)", borderRadius: 14, padding: "11px 12px" }}>
            <div style={{ fontSize: 10, letterSpacing: ".09em", textTransform: "uppercase", color: "rgba(255,255,255,.6)", fontWeight: 600 }}>Lições</div>
            <div style={{ fontFamily: FONT_T, fontWeight: 700, fontSize: 18, marginTop: 3 }}>{vm.licoesTxt}</div>
          </div>
        </div>
      </div>

      <div style={{ padding: "18px 20px 34px" }}>
        <div style={{ background: "#fff", border: "1px solid #DCE6EA", borderRadius: 18, padding: 16, marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: FONT_T, fontWeight: 700, fontSize: 14, color: "#0A2540" }}>
            <Icon src="icons/book-open.svg" size={16} color="#1B6FD1" />
            Formação
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 12 }}>
            {vm.situacoes.map((x: { nome: string; sel: boolean }) => (
              <button
                key={x.nome}
                onClick={() => acoes.escolherSituacao(x.nome)}
                style={{ padding: "8px 13px", borderRadius: 99, border: `1.5px solid ${x.sel ? "#1B6FD1" : "#DCE6EA"}`, background: x.sel ? "#EAF3FC" : "#fff", color: x.sel ? "#1B6FD1" : "#5A7383", fontSize: 12.5, fontWeight: 700 }}
              >
                {x.nome}
              </button>
            ))}
          </div>
          <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 9 }}>
            <div>
              <div style={{ fontSize: 10.5, letterSpacing: ".08em", textTransform: "uppercase", fontWeight: 700, color: "#5A7383" }}>Instituição</div>
              <input
                value={instituicao}
                onChange={(e) => setInstituicao(e.target.value)}
                onBlur={() => acoes.setInstituicao(instituicao)}
                placeholder="Onde você estuda ou trabalha"
                style={{ marginTop: 5, width: "100%", padding: "12px 13px", borderRadius: 13, border: "1px solid #DCE6EA", background: "#F8FBFC", color: "#0A2540", fontSize: 14, fontWeight: 600, outline: "none" }}
              />
            </div>
            <div>
              <div style={{ fontSize: 10.5, letterSpacing: ".08em", textTransform: "uppercase", fontWeight: 700, color: "#5A7383" }}>Curso e período</div>
              <input
                value={curso}
                onChange={(e) => setCurso(e.target.value)}
                onBlur={() => acoes.setCurso(curso)}
                placeholder="Ex.: Enfermagem, 4º período"
                style={{ marginTop: 5, width: "100%", padding: "12px 13px", borderRadius: 13, border: "1px solid #DCE6EA", background: "#F8FBFC", color: "#0A2540", fontSize: 14, fontWeight: 600, outline: "none" }}
              />
            </div>
          </div>
        </div>

        <div style={{ fontFamily: FONT_T, fontWeight: 700, fontSize: 15, color: "#0A2540", marginBottom: 10 }}>
          Conquistas <span style={{ color: "#5A7383", fontWeight: 600, fontSize: 13 }}>{vm.conquistasTxt}</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
          {vm.conquistas.map((c: VM, i: number) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: c.bg, border: `1px solid ${c.bd}`, borderRadius: 16, padding: "12px 13px" }}>
              <div style={{ width: 34, height: 34, flex: "none", borderRadius: 12, background: c.iconBg, color: c.iconFg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon src={c.icone} size={18} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 12.5, color: c.txtCor, lineHeight: 1.25 }}>{c.nome}</div>
                <div style={{ fontSize: 10.5, color: "#8FA3AE", marginTop: 2, lineHeight: 1.3 }}>{c.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ fontFamily: FONT_T, fontWeight: 700, fontSize: 15, color: "#0A2540", margin: "24px 0 10px" }}>Melhores rodadas</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {vm.ranking.map((r: VM, i: number) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 13, background: r.bg, border: `1px solid ${r.bd}`, borderRadius: 16, padding: "13px 15px" }}>
              <div style={{ width: 28, height: 28, flex: "none", borderRadius: 9, background: r.medBg, color: r.medFg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT_T, fontWeight: 800, fontSize: 13 }}>
                {r.pos}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#0A2540", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.nome}</div>
                <div style={{ fontSize: 11.5, color: "#5A7383", marginTop: 1 }}>{r.detalhe}</div>
              </div>
              <div style={{ fontFamily: FONT_T, fontWeight: 700, fontSize: 16, color: "#05A67A" }}>{r.pontos}</div>
            </div>
          ))}
          {vm.rankingVazio && <div style={{ textAlign: "center", padding: "32px 20px", color: "#5A7383", fontSize: 13.5, lineHeight: 1.55 }}>Nenhuma rodada concluída ainda.</div>}
        </div>

        <button onClick={acoes.verTutorial} style={{ marginTop: 22, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: 14, borderRadius: 16, border: "1px solid #DCE6EA", background: "#fff", color: "#1B6FD1", fontWeight: 700, fontSize: 13.5 }}>
          <Icon src="icons/book-open.svg" size={16} />
          Rever o tutorial
        </button>
        <button onClick={acoes.reiniciar} style={{ marginTop: 10, width: "100%", padding: 14, borderRadius: 16, border: "1px solid #DCE6EA", background: "#fff", color: "#C2415A", fontWeight: 700, fontSize: 13 }}>
          Refazer o teste de nivelamento
        </button>
      </div>
    </div>
  );
}

// ───────────────────────── Revisão ─────────────────────────
function TelaRevisao({ vm, acoes }: Props) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F5F8F9" }}>
      <div style={{ background: "#0A2540", padding: "18px 20px 22px", color: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <BotaoVoltar onClick={acoes.irMapa} />
          <div style={{ fontFamily: FONT_T, fontWeight: 700, fontSize: 17 }}>Revisão dos erros</div>
          <button onClick={acoes.limparErros} style={{ marginLeft: "auto", border: "none", background: "rgba(255,255,255,.12)", color: "#fff", fontSize: 11.5, fontWeight: 600, padding: "7px 12px", borderRadius: 99 }}>
            Limpar
          </button>
        </div>
        <div style={{ marginTop: 10, fontSize: 12.5, color: "rgba(255,255,255,.6)", lineHeight: 1.5 }}>{vm.revisaoResumo}</div>
      </div>
      <div style={{ padding: "16px 20px 30px", display: "flex", flexDirection: "column", gap: 10 }}>
        {vm.erros.map((e: VM, i: number) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #DCE6EA", borderRadius: 18, padding: "15px 16px" }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase", color: e.cor }}>{e.tema}</div>
            <div style={{ marginTop: 7, fontFamily: FONT_T, fontWeight: 700, fontSize: 15, lineHeight: 1.35, color: "#0A2540" }}>{e.q}</div>
            <div style={{ marginTop: 10, display: "flex", gap: 8, alignItems: "flex-start" }}>
              <span style={{ flex: "none", marginTop: 1, fontSize: 10.5, fontWeight: 700, color: "#C2415A" }}>SUA</span>
              <span style={{ fontSize: 13, lineHeight: 1.45, color: "#5A7383", textDecoration: "line-through" }}>{e.sua}</span>
            </div>
            <div style={{ marginTop: 5, display: "flex", gap: 8, alignItems: "flex-start" }}>
              <span style={{ flex: "none", marginTop: 1, fontSize: 10.5, fontWeight: 700, color: "#05A67A" }}>OK</span>
              <span style={{ fontSize: 13, lineHeight: 1.45, color: "#0A2540", fontWeight: 600 }}>{e.certa}</span>
            </div>
            <div style={{ marginTop: 11, paddingTop: 11, borderTop: "1px dashed #DCE6EA", fontSize: 12.5, lineHeight: 1.55, color: "#5A7383" }}>{e.exp}</div>
          </div>
        ))}
        {vm.revisaoVazia && (
          <div style={{ textAlign: "center", padding: "40px 20px", color: "#5A7383", fontSize: 13.5, lineHeight: 1.55 }}>
            Sem erros guardados.
            <br />
            Eles aparecem aqui assim que surgirem.
          </div>
        )}
      </div>
    </div>
  );
}
