import { useState } from "react";

// ── Piecewise scale ──────────────────────────────────────────────────────────
const BREAK   = -30;
const S_EARLY = 1.6;  // px / yr  before BREAK  (compressed – covers Alta Repubblica)
const S_MAIN  = 12;   // px / yr  after  BREAK   (expanded  – covers main saga)
const YMIN    = -392; // left edge: includes High Republic Phase II ~382 BBY
const YMAX    = 38;

const px = y =>
  y <= BREAK
    ? (y - YMIN) * S_EARLY
    : (BREAK - YMIN) * S_EARLY + (y - BREAK) * S_MAIN;

const CW = Math.ceil(px(YMAX));
// ≈ (362 × 1.6) + (68 × 12) = 579 + 816 = 1395

// ── Eras ─────────────────────────────────────────────────────────────────────
const ERAS = [
  { name: "ALTA REPUBBLICA",   s: -392, e:  -33, bg: "#0b0b28" },
  { name: "CADUTA DEI JEDI",   s:  -33, e:  -19, bg: "#180b26" },
  { name: "ERA IMPERIALE",     s:  -19, e:    0, bg: "#240808" },
  { name: "RIBELLIONE",        s:    0, e:    5, bg: "#141200" },
  { name: "NUOVA REPUBBLICA",  s:    5, e:   34, bg: "#081108" },
  { name: "PRIMO ORDINE",      s:   34, e:   38, bg: "#08081e" },
];

// ── Canonical media data ─────────────────────────────────────────────────────
// seg = [[startYear, endYear], …]   negative = BBY, positive = ABY
const DATA = [

  // ─ FILM ─────────────────────────────────────────────────────────────────────
  { n: "The Phantom Menace",       t: "f", seg: [[-32, -31]] },
  { n: "Attack of the Clones",     t: "f", seg: [[-22, -21]] },
  { n: "Revenge of the Sith",      t: "f", seg: [[-19, -18.5]] },
  { n: "Solo: A Star Wars Story",  t: "f", seg: [[-13, -10]] },
  { n: "Rogue One",                t: "f", seg: [[-0.5, 0]] },
  { n: "A New Hope (Ep. IV)",      t: "f", seg: [[0, 0.5]] },
  { n: "The Empire Strikes Back",  t: "f", seg: [[3, 3.5]] },
  { n: "Return of the Jedi",       t: "f", seg: [[4, 4.5]] },
  { n: "The Force Awakens",        t: "f", seg: [[34, 34.5]] },
  { n: "The Last Jedi",            t: "f", seg: [[34.5, 35]] },
  { n: "The Rise of Skywalker",    t: "f", seg: [[35, 35.5]] },

  // ─ SERIE ANIMATE ────────────────────────────────────────────────────────────
  { n: "Young Jedi Adventures",    t: "a", seg: [[-132, -131]], lbl: ["132 BBY"] },
  {
    n: "Tales of the Underworld",  t: "a",
    seg:  [[-52, -49], [-43, -40], [-33, -30], [-19, -16]],
    lbl:  ["Bane I", "Bane II", "Bane III", "Ventress"],
    note: "Cad Bane (3 fasi: ~52–33 BBY) + Asajj Ventress (19–16 BBY)",
  },
  {
    n: "Tales of the Jedi",        t: "a",
    seg:  [[-48, -47], [-32, -31], [-22, -21], [-19, -18.5]],
    lbl:  ["Dooku", "Qui-Gon", "Ahsoka CW", "Ord.66"],
    note: "Antologia: archi di Dooku e Ahsoka su più epoche",
  },
  { n: "The Clone Wars (film)",    t: "a", seg: [[-22, -21]] },
  { n: "The Clone Wars",           t: "a", seg: [[-22, -19]] },
  { n: "The Bad Batch",            t: "a", seg: [[-19, -17]] },
  {
    n: "Tales of the Empire",      t: "a",
    seg:  [[-19, -10], [9, 9.5]],
    lbl:  ["Era Imp.", "NR"],
    note: "Morgan Elsbeth (Era Imperiale) + Barriss Offee → NR",
  },
  { n: "Maul: Shadow Lord",        t: "a", seg: [[-18, -17]] },
  {
    n: "Star Wars Rebels",         t: "a",
    seg:  [[-5, -4], [-4, -3], [-2, -1.5], [-1, 0], [4, 4.5]],
    lbl:  ["S1", "S2", "S3", "S4", "Ep."],
    note: "Salto S2→S3 (1 anno); epilogo 4 ABY",
  },
  { n: "Star Wars Resistance",     t: "a", seg: [[33.5, 35]] },

  // ─ SERIE LIVE-ACTION ────────────────────────────────────────────────────────
  { n: "The Acolyte",              t: "l", seg: [[-132, -131]], lbl: ["132 BBY"] },
  { n: "Obi-Wan Kenobi",           t: "l", seg: [[-9, -8]] },
  {
    n: "Andor",                    t: "l",
    seg:  [[-5, -4.1], [-4, -3.1], [-3, -2.1], [-2, -1.1], [-1, -0.1]],
    lbl:  ["S1", "S2·I", "S2·II", "S2·III", "S2·IV"],
    note: "S2: 4 capitoli con salto di +1 anno ciascuno",
  },
  { n: "The Mandalorian",          t: "l", seg: [[9, 11]] },
  {
    n: "Book of Boba Fett",        t: "l",
    seg:  [[4, 4.5], [9, 10]],
    lbl:  ["flashback", "presente"],
    note: "Flashback 4 ABY; storia principale 9 ABY",
  },
  { n: "Ahsoka",                   t: "l", seg: [[9, 11]] },
  { n: "Skeleton Crew",            t: "l", seg: [[9, 10]] },

  // ─ FUMETTI — principali serie Marvel canoniche ──────────────────────────────
  {
    n: "High Republic (fumetti)",  t: "c",
    seg:  [[-382, -350], [-232, -200], [-132, -100]],
    lbl:  ["Fase II", "Fase I", "Fase III"],
    note: "Fase II=~382 BBY, Fase I=~232 BBY, Fase III=~132 BBY",
  },
  { n: "Shadow of Maul",           t: "c", seg: [[-19, -18]], note: "Miniserie prequel a Maul: Shadow Lord (2026)" },
  { n: "Darth Vader: Dark Lord",   t: "c", seg: [[-19, -14]], note: "Vader nei primi anni dell'Impero (Soule 2017)" },
  { n: "Star Wars (Marvel 2015)",  t: "c", seg: [[0, 3]],     note: "Tra A New Hope e Return of the Jedi" },
  { n: "Doctor Aphra",             t: "c", seg: [[0, 4]],     note: "Archeologa canaglia nell'era della Ribellione" },
  { n: "War BH / Crimson Reign",   t: "c", seg: [[3, 4]],     note: "Crossover eventi tra ESB e ROTJ (3 ABY)" },

  // ─ ROMANZI — principali titoli canonici ─────────────────────────────────────
  {
    n: "High Republic (romanzi)",  t: "v",
    seg:  [[-382, -350], [-232, -200], [-132, -100]],
    lbl:  ["Fase II", "Fase I", "Fase III"],
    note: "Stesse tre fasi cronologiche dei fumetti HR",
  },
  { n: "Ahsoka (C. Gray 2016)",    t: "v", seg: [[-18, -17]], note: "Ahsoka dopo Order 66, costruisce la sua identità" },
  { n: "Thrawn (Z. Zahn)",         t: "v", seg: [[-11, -2]],  note: "Origini di Thrawn; si collega a Rebels" },
  { n: "Lost Stars (C. Gray)",     t: "v", seg: [[-11, 5]],   note: "Dalla giovinezza dei protagonisti a Jakku" },
  { n: "Aftermath (C. Wendig)",    t: "v", seg: [[4, 6]],     note: "Trilogia del collasso dell'Impero dopo ROTJ" },
  { n: "Alphabet Squadron",        t: "v", seg: [[4, 8]],     note: "Trilogia squadriglia X-wing post-ROTJ" },

  // ─ VIDEOGIOCHI — giochi con campagna single-player canonica ─────────────────
  { n: "Jedi: Fallen Order",       t: "g", seg: [[-14, -13]], note: "Cal Kestis, 5 anni dopo Ordine 66 (14 BBY)" },
  { n: "Jedi: Survivor",           t: "g", seg: [[-9, -8]],   note: "5 anni dopo Fallen Order, stesso anno di Obi-Wan" },
  { n: "Star Wars Outlaws",        t: "g", seg: [[3, 3.5]],   note: "Kay Vess, tra ESB e ROTJ (3 ABY)" },
  { n: "Battlefront II (storia)",  t: "g", seg: [[4, 5]],     note: "Iden Versio, subito dopo ROTJ (4–5 ABY)" },
];

// ── Groups & colors ──────────────────────────────────────────────────────────
const GROUPS = [
  { t: "f", label: "FILM",                         color: "#f5c030" },
  { t: "a", label: "SERIE ANIMATE",                color: "#38b4f0" },
  { t: "l", label: "SERIE LIVE-ACTION",            color: "#f07248" },
  { t: "c", label: "FUMETTI  (selezione)",         color: "#6dc87a" },
  { t: "v", label: "ROMANZI  (selezione)",         color: "#c077d4" },
  { t: "g", label: "VIDEOGIOCHI  (selezione)",     color: "#e09830" },
];
const TC = {
  f: { bar: "#f5c030", dim: "#7a5f1a" },
  a: { bar: "#38b4f0", dim: "#1c5870" },
  l: { bar: "#f07248", dim: "#783828" },
  c: { bar: "#6dc87a", dim: "#2e5832" },
  v: { bar: "#c077d4", dim: "#5a3065" },
  g: { bar: "#e09830", dim: "#6a4514" },
};

const ROWS = GROUPS.flatMap(g => [
  { kind: "H", t: g.t, label: g.label, C: g.color },
  ...DATA.filter(d => d.t === g.t).map(d => ({ kind: "E", ...d })),
]);

// ── Layout ───────────────────────────────────────────────────────────────────
const LW = 222;
const RH = 27;
const AH = 54;
const CH = AH + ROWS.length * RH;

// Ticks: lo=true → stagger label down to avoid overlap with neighbour
const TICKS = [
  { y: -382, lo: false }, { y: -232, lo: true  },
  { y: -132, lo: false }, { y:  -32, lo: true  },
  { y:  -22, lo: false }, { y:  -19, lo: true  },
  { y:   -9, lo: false }, { y:   -5, lo: true  },
  { y:    0, lo: false },
  { y:    4, lo: false }, { y:    9, lo: true  },
  { y:   34, lo: false }, { y:   35, lo: true  },
];
const yl  = y => y < 0 ? `${-y} BBY` : y === 0 ? "0 (Yavin)" : `${y} ABY`;
const sfmt = ([a, b]) => {
  const f = v => v < 0 ? `${Math.abs(v)} BBY` : `${v} ABY`;
  return `${f(a)} → ${f(b)}`;
};

// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [hov, setHov] = useState(null);
  const hd = hov ? DATA.find(d => d.n === hov) : null;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#090910",
      fontFamily: "'DM Mono','Fira Mono','Courier New',monospace",
      color: "#a8a0a0",
      userSelect: "none",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&display=swap');
        ::-webkit-scrollbar { height: 6px; background: #111; }
        ::-webkit-scrollbar-thumb { background: #2a2a3a; border-radius: 3px; }
      `}</style>

      {/* Header */}
      <div style={{ padding: "20px 24px 10px" }}>
        <div style={{ fontSize: 8, letterSpacing: ".3em", color: "#f5c030", marginBottom: 6, fontWeight: 500 }}>
          A LONG TIME AGO IN A GALAXY FAR, FAR AWAY…
        </div>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 300, letterSpacing: ".07em", color: "#ede5dc" }}>
          Star Wars — Timeline Canonica Completa
        </h1>
        <p style={{ margin: "5px 0 0", fontSize: 10, color: "#484848", lineHeight: 1.6 }}>
          Film · Serie animate (incl. Maul: Shadow Lord 2026) · Live-action ·
          Fumetti · Romanzi · Videogiochi &nbsp;·&nbsp;
          scala compressa prima di 30 BBY &nbsp;·&nbsp;
          barre spezzate = salto temporale nella stessa serie
        </p>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 14, padding: "0 24px 12px", flexWrap: "wrap", alignItems: "center" }}>
        {GROUPS.map(g => (
          <span key={g.t} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10, color: "#787070" }}>
            <span style={{ width: 14, height: 5, background: g.color, display: "inline-block", borderRadius: 2 }} />
            {g.label.split("(")[0].trim()}
          </span>
        ))}
        <span style={{ fontSize: 9.5, color: "#2a2a48", marginLeft: "auto" }}>
          ╌╌ salto temporale &nbsp;│&nbsp; ⚡ scala ×{(S_MAIN / S_EARLY).toFixed(0)}× dopo 30 BBY
        </span>
      </div>

      {/* Scrollable chart */}
      <div style={{ display: "flex", overflowX: "auto" }}>

        {/* Sticky label column */}
        <div style={{
          width: LW, flexShrink: 0,
          position: "sticky", left: 0, zIndex: 10,
          background: "#090910",
          borderRight: "1px solid #181828",
        }}>
          <div style={{
            height: AH, background: "#0c0c17",
            borderBottom: "1px solid #181828",
            display: "flex", alignItems: "flex-end",
            paddingBottom: 7, paddingLeft: 10,
          }}>
            <span style={{ fontSize: 7, color: "#252535", letterSpacing: ".18em" }}>TITOLO</span>
          </div>

          {ROWS.map((row, i) => (
            <div key={i} style={{
              height: RH,
              display: "flex", alignItems: "center",
              paddingLeft: row.kind === "H" ? 8 : 14,
              paddingRight: 6,
              background:
                row.kind === "H" ? "#0e0e1e"
                : hov === row.n  ? "#121222"
                : "transparent",
              borderBottom: "1px solid #0f0f1a",
              color:
                row.kind === "H" ? row.C
                : hov === row.n  ? "#fff"
                : "#909090",
              fontSize: row.kind === "H" ? 7.5 : 10.5,
              fontWeight: row.kind === "H" ? 500 : 300,
              letterSpacing: row.kind === "H" ? ".16em" : ".02em",
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
              transition: "color .1s, background .1s",
            }}>
              {row.kind === "H" ? row.label : row.n}
            </div>
          ))}
        </div>

        {/* Timeline SVG */}
        <svg width={CW} height={CH} style={{ display: "block", flexShrink: 0 }}>

          {/* Era backgrounds */}
          {ERAS.map((e, i) => (
            <rect key={i} x={px(e.s)} y={0} width={px(e.e) - px(e.s)} height={CH} fill={e.bg} />
          ))}

          {/* Era boundary lines */}
          {ERAS.slice(1).map((e, i) => (
            <line key={i} x1={px(e.s)} y1={0} x2={px(e.s)} y2={CH}
              stroke="#1c1c30" strokeWidth={1} />
          ))}

          {/* Scale-break zigzag */}
          {(() => {
            const bx = px(BREAK);
            const pts = [];
            for (let y = 0; y < CH; y += 5)
              pts.push(`${bx + (y % 10 < 5 ? 2.5 : -2.5)},${y}`);
            return <polyline points={pts.join(" ")} stroke="#1e1e38" strokeWidth={2} fill="none" />;
          })()}

          {/* Era labels (top) */}
          {ERAS.map((e, i) => {
            const cx = (px(e.s) + px(e.e)) / 2;
            return (
              <text key={i} x={cx} y={12} textAnchor="middle"
                fill="#222242" fontSize={7}
                fontFamily="DM Mono,monospace" letterSpacing=".14em"
              >
                {e.name}
              </text>
            );
          })}

          {/* Scale-break label */}
          <text
            x={px(BREAK) - 4} y={AH / 2 + 4}
            textAnchor="end" fill="#1c1c38" fontSize={6}
            fontFamily="DM Mono,monospace"
            transform={`rotate(-90,${px(BREAK) - 4},${AH / 2 + 4})`}
          >SCALA COMPRESSA ⚡</text>

          {/* Axis line */}
          <line x1={0} y1={AH - 1} x2={CW} y2={AH - 1} stroke="#1c1c2e" />

          {/* Ticks + labels + vertical grid */}
          {TICKS.map(({ y, lo }) => {
            const x  = px(y);
            const ty = lo ? AH - 10 : AH - 22;
            return (
              <g key={y}>
                <line x1={x} y1={AH - 8} x2={x} y2={AH} stroke="#282838" />
                <text x={x} y={ty} textAnchor="middle"
                  fill={y === 0 ? "#a09020" : "#3e3e58"}
                  fontSize={7.5} fontFamily="DM Mono,monospace"
                >{yl(y)}</text>
                <line x1={x} y1={AH} x2={x} y2={CH}
                  stroke={y === 0 ? "#383820" : "#141424"} strokeWidth={1} />
              </g>
            );
          })}

          {/* Yavin dashed gold line */}
          <line x1={px(0)} y1={AH} x2={px(0)} y2={CH}
            stroke="#f5c03028" strokeWidth={1.5} strokeDasharray="2,7" />

          {/* Rows */}
          {ROWS.map((row, i) => {
            const ry = AH + i * RH;
            if (row.kind === "H")
              return <rect key={i} x={0} y={ry} width={CW} height={RH} fill="#0d0d1c" />;

            const c   = TC[row.t];
            const isH = hov === row.n;

            return (
              <g key={i}
                onMouseEnter={() => setHov(row.n)}
                onMouseLeave={() => setHov(null)}
                style={{ cursor: "default" }}
              >
                {/* Row bg */}
                <rect x={0} y={ry} width={CW} height={RH}
                  fill={isH ? "#111126" : (i % 2 === 0 ? "#0c0c15" : "#090910")} />

                {/* Dashed connectors between segments */}
                {row.seg.slice(1).map((s, si) => {
                  const x1 = px(row.seg[si][1]);
                  const x2 = px(s[0]);
                  const cy = ry + RH / 2;
                  return (
                    <line key={si}
                      x1={x1} y1={cy} x2={x2} y2={cy}
                      stroke={c.dim} strokeWidth={1} strokeDasharray="3,3" />
                  );
                })}

                {/* Bars */}
                {row.seg.map((s, si) => {
                  const bx  = px(s[0]);
                  const bw  = Math.max(5, px(s[1]) - px(s[0]));
                  const bh  = RH - 9;
                  const by  = ry + 4;
                  const lbl = row.lbl?.[si];
                  return (
                    <g key={si}>
                      <rect x={bx + 1} y={by + 2} width={bw} height={bh} rx={3}
                        fill="#000" opacity={.22} />
                      <rect x={bx} y={by} width={bw} height={bh} rx={3}
                        fill={c.bar} opacity={isH ? 0.92 : 0.65} />
                      <rect x={bx} y={by} width={bw} height={Math.min(4, bh * .28)} rx={3}
                        fill="rgba(255,255,255,.16)" style={{ pointerEvents: "none" }} />
                      {lbl && bw > 22 && (
                        <text x={bx + bw / 2} y={by + bh / 2 + 3.5}
                          textAnchor="middle"
                          fill="rgba(0,0,0,.65)" fontSize={6.5}
                          fontFamily="DM Mono,monospace" fontWeight="500"
                          style={{ pointerEvents: "none" }}
                        >{lbl}</text>
                      )}
                    </g>
                  );
                })}
              </g>
            );
          })}

          <line x1={0} y1={CH - 1} x2={CW} y2={CH - 1} stroke="#181828" />
        </svg>
      </div>

      {/* Hover info bar */}
      <div style={{
        minHeight: 38,
        background: "#0c0c1c",
        borderTop: "1px solid #181828",
        padding: "7px 24px",
        display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap",
        fontSize: 10, color: "#444",
        opacity: hd ? 1 : 0.5,
        transition: "opacity .15s",
      }}>
        {hd ? (
          <>
            <span style={{ color: GROUPS.find(g => g.t === hd.t)?.color, fontSize: 11, fontWeight: 500 }}>
              {hd.n}
            </span>
            <span style={{ color: "#1e1e2e" }}>│</span>
            <span style={{ color: "#424258" }}>
              {hd.seg.map((s, i) => (
                <span key={i}>
                  {i > 0 && <span style={{ margin: "0 6px", color: "#242434" }}>╌╌</span>}
                  {sfmt(s)}
                  {hd.lbl?.[i] && <span style={{ color: "#2e2e48", marginLeft: 5 }}>({hd.lbl[i]})</span>}
                </span>
              ))}
            </span>
            {hd.note && (
              <>
                <span style={{ color: "#1e1e2e" }}>│</span>
                <span style={{ color: "#2e2e50", fontStyle: "italic" }}>{hd.note}</span>
              </>
            )}
          </>
        ) : (
          <span>Passa il cursore su una riga per i dettagli della timeline</span>
        )}
      </div>

      {/* Footnote */}
      <div style={{ padding: "8px 24px 20px", fontSize: 9, color: "#222232", lineHeight: 1.7 }}>
        Alta Repubblica: 3 fasi — Fase II (~382 BBY), Fase I (~232 BBY), Fase III (~132 BBY, collega a <i>The Acolyte</i>).&nbsp;
        Fumetti: selezione serie Marvel canoniche principali. Romanzi: titoli più noti del canone.&nbsp;
        Videogiochi: solo titoli con campagna single-player ufficialmente canonica.&nbsp;
        <i>Maul: Shadow Lord</i> (2026) è confermato tra <i>The Bad Batch</i> e <i>Solo</i> (~18 BBY).
      </div>
    </div>
  );
}
