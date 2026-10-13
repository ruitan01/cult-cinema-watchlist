import Image from "next/image";
import type { ReactNode } from "react";
import type { Artifact } from "@/data/mood-boards/types";

/* B. The Threshold ------------------------------------------------------- */

const lamps = [
  { name: "Darkness", hex: "#0B0A0C", glow: false },
  { name: "Smoke", hex: "#1A1719", glow: false },
  { name: "Lamplight", hex: "#EDE3D1", glow: true },
  { name: "Ash", hex: "#A39C90", glow: true },
  { name: "Sodium amber", hex: "#D9A441", glow: true },
  { name: "Velvet blue", hex: "#8FA2FF", glow: true },
  { name: "Curtain red", hex: "#8E1B1F", glow: true },
];

function PaletteLamps() {
  return (
    <ul className="grid grid-cols-4 gap-x-4 gap-y-10 py-6 sm:grid-cols-7">
      {lamps.map((l) => (
        <li key={l.hex} className="flex flex-col items-center gap-4 text-center">
          <span
            aria-hidden="true"
            className="block size-12 rounded-full ring-1 ring-(--sn-ash)/30 sm:size-14"
            style={{
              backgroundColor: l.hex,
              boxShadow: l.glow ? `0 0 36px 10px ${l.hex}66, 0 0 90px 30px ${l.hex}22` : undefined,
            }}
          />
          <span className="text-xs leading-tight">
            {l.name}
            <span className="block tracking-wider text-(--sn-ash)">{l.hex}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

function Curtain() {
  return (
    <div
      role="img"
      aria-label="Deep red theatre curtains, parted a little onto darkness, with a thin line of amber light in the gap"
      className="relative h-72 overflow-hidden bg-(--sn-dark) sm:h-96"
    >
      <div className="sn-curtain absolute inset-y-0 left-0 w-[47%] [clip-path:polygon(0_0,100%_0,88%_100%,0_100%)]" />
      <div className="sn-curtain absolute inset-y-0 right-0 w-[47%] [clip-path:polygon(0_0,100%_0,100%_100%,12%_100%)]" />
      <div className="absolute inset-y-[18%] left-1/2 w-px -translate-x-1/2 bg-(--sn-amber) shadow-[0_0_24px_6px_rgb(217_164_65/0.45)]" />
      <div className="absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-(--sn-dark) to-transparent" />
    </div>
  );
}

function SodiumLamp() {
  return (
    <svg role="img" aria-label="A single street lamp casting a cone of amber light through fog onto dark ground" viewBox="0 0 200 260" className="w-full">
      <defs>
        <radialGradient id="sn-halo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffd98a" stopOpacity="0.95" />
          <stop offset="0.25" stopColor="#d9a441" stopOpacity="0.45" />
          <stop offset="1" stopColor="#d9a441" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sn-cone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d9a441" stopOpacity="0.35" />
          <stop offset="1" stopColor="#d9a441" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M118 56 L60 240 L176 240 Z" fill="url(#sn-cone)" />
      <ellipse cx="118" cy="240" rx="62" ry="9" fill="#d9a441" opacity="0.18" />
      <path d="M40 250 V40 Q40 30 52 30 H112" stroke="#3a3335" strokeWidth="4" fill="none" />
      <rect x="106" y="28" width="24" height="9" rx="2" fill="#2a2427" />
      <circle cx="118" cy="44" r="60" fill="url(#sn-halo)" />
      <circle cx="118" cy="40" r="4" fill="#fff4d6" />
    </svg>
  );
}

const darks = ["#0B0A0C", "#121013", "#1A1719", "#221E21", "#2A2529", "#332D31"];

function DarknessLadder() {
  return (
    <div>
      <div className="grid grid-cols-6 ring-1 ring-(--sn-ash)/25">
        {darks.map((d) => (
          <div key={d} aria-hidden="true" className="aspect-[1/2]" style={{ backgroundColor: d }} />
        ))}
      </div>
      <p className="mt-3 flex justify-between text-xs tracking-wider text-(--sn-ash)">
        <span>{darks[0]}</span>
        <span>{darks[darks.length - 1]}</span>
      </p>
    </div>
  );
}

function BlueHour() {
  return (
    <div
      role="img"
      aria-label="A horizontal band of sky fading from deep velvet blue at the horizon to black above, with one bright point of light"
      className="sn-grain relative h-48 bg-linear-to-t from-[#2b3a7a] via-[#141a38] to-(--sn-dark) sm:h-56"
    >
      <span className="absolute top-[28%] left-[68%] size-1.5 rounded-full bg-white shadow-[0_0_12px_4px_rgb(143_162_255/0.7)]" />
      <span className="absolute inset-x-0 bottom-0 h-px bg-(--sn-velvet)/40" />
    </div>
  );
}

/* 1. Night Text ---------------------------------------------------------- */

function DisplayQuestion() {
  return (
    <p className="sn-serif text-[clamp(3rem,10vw,9rem)] leading-[0.95] tracking-tight italic">
      Who is the <span className="text-(--sn-velvet)">dreamer</span>
      <br className="hidden sm:block" /> here?
    </p>
  );
}

const whispers = [
  "Lights out after midnight",
  "Please do not wake the sleeper",
  "Keep your voice low in the corridor",
  "Exit — this way, perhaps",
];

function WhisperedLabels() {
  return (
    <ul className="space-y-5 border-l border-(--sn-ash)/30 pl-5">
      {whispers.map((w) => (
        <li key={w} className="sn-whisper text-sm text-(--sn-lamp)/90">
          {w}
        </li>
      ))}
    </ul>
  );
}

function Reflection() {
  return (
    <div className="overflow-hidden">
      <p className="sn-serif text-center text-[clamp(2.5rem,7vw,5.5rem)] leading-none tracking-[0.08em]">ELSEWHERE</p>
      <p
        aria-hidden="true"
        className="sn-serif sn-fade-down -mt-1 -scale-y-100 text-center text-[clamp(2.5rem,7vw,5.5rem)] leading-none tracking-[0.08em] blur-[1.5px]"
      >
        ELSEWHERE
      </p>
      <div aria-hidden="true" className="mx-auto mt-1 h-px w-3/4 bg-linear-to-r from-transparent via-(--sn-ash)/40 to-transparent" />
    </div>
  );
}

const forgetting = "I was standing in a hallway and the light was the colour of".split(" ");

function Forgetting() {
  return (
    <div>
      <p className="sr-only">I was standing in a hallway and the light was the colour of…</p>
      <p aria-hidden="true" className="sn-serif text-3xl leading-snug sm:text-4xl">
        {forgetting.map((w, i) => {
          const t = i / (forgetting.length - 1);
          return (
            <span
              key={i}
              className="inline-block pr-[0.28em]"
              style={{ opacity: 1 - t * 0.85, filter: `blur(${(t * t * 3.2).toFixed(2)}px)` }}
            >
              {w}
            </span>
          );
        })}
      </p>
    </div>
  );
}

function ScaleShift() {
  return (
    <div className="relative grid place-items-center overflow-hidden">
      <span aria-hidden="true" className="sn-serif text-[clamp(14rem,32vw,24rem)] leading-[0.8] text-(--sn-lamp)/90">
        O
      </span>
      <span className="absolute text-center text-xs leading-tight tracking-wider text-(--sn-ash)">
        a room
        <br />
        with no corners
      </span>
    </div>
  );
}

function DreamDiary() {
  return (
    <article className="max-w-md">
      <p className="sn-whisper text-xs text-(--sn-ash)">Night of the fourteenth</p>
      <p className="sn-serif mt-3 text-xl leading-relaxed text-(--sn-lamp)/90 italic">
        The corridor again, longer this time. Somebody had moved the lamp to the far end, and I knew
        the number of doors without counting them. One was warm to the touch.
      </p>
    </article>
  );
}

/* 2. Surfaces ------------------------------------------------------------ */

function FilmGrain() {
  return (
    <div
      role="img"
      aria-label="A dark square of moving-picture grain, lighter towards the centre"
      className="sn-grain sn-grain-strong aspect-square bg-[radial-gradient(circle_at_50%_45%,#3a3437,#0b0a0c_75%)]"
    />
  );
}

function PerspectiveFloor() {
  return (
    <div
      role="img"
      aria-label="A brown zigzag floor pattern tilted into steep perspective, fading into darkness at the far end"
      className="relative h-64 overflow-hidden [perspective:420px] sm:h-80"
    >
      <div className="sn-chevron sn-fade-up absolute -inset-x-1/2 -top-1/2 bottom-0 origin-bottom [transform:rotateX(55deg)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,transparent_30%,#0b0a0c_80%)]" />
    </div>
  );
}

function Smoke() {
  return (
    <svg role="img" aria-label="Soft grey smoke drifting across darkness" viewBox="0 0 400 240" className="w-full">
      <defs>
        <filter id="sn-smoke" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.018" numOctaves="4" seed="7" />
          <feColorMatrix values="0 0 0 0 0.93  0 0 0 0 0.89  0 0 0 0 0.82  1.1 0 0 0 -0.42" />
        </filter>
        <radialGradient id="sn-smoke-mask" cx="0.45" cy="0.55" r="0.55">
          <stop offset="0.2" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </radialGradient>
        <mask id="sn-smoke-m">
          <rect width="400" height="240" fill="url(#sn-smoke-mask)" />
        </mask>
      </defs>
      <rect width="400" height="240" fill="#0b0a0c" />
      <rect width="400" height="240" filter="url(#sn-smoke)" mask="url(#sn-smoke-m)" />
    </svg>
  );
}

function TestSignal() {
  return (
    <div className="rounded-[1.75rem] bg-[#151214] p-3 shadow-[0_0_60px_8px_rgb(143_162_255/0.12)]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem]">
        <svg aria-hidden="true" viewBox="0 0 160 120" preserveAspectRatio="none" className="absolute inset-0 size-full">
          <filter id="sn-static">
            <feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="1" seed="11" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="1" />
            </feComponentTransfer>
          </filter>
          <rect width="160" height="120" filter="url(#sn-static)" opacity="0.55" />
        </svg>
        <div className="sn-scanlines absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgb(0_0_0/0.7))]" />
        <p className="sn-whisper absolute inset-0 grid place-items-center text-sm text-white/80">No signal</p>
      </div>
    </div>
  );
}

function Velvet() {
  return (
    <svg role="img" aria-label="Close-up of dark red velvet with light raking across its soft pile" viewBox="0 0 240 240" className="w-full">
      <filter id="sn-velvet" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.012 0.05" numOctaves="3" seed="4" result="n" />
        <feDiffuseLighting in="n" surfaceScale="6" lightingColor="#b5333a" result="lit">
          <feDistantLight azimuth="235" elevation="38" />
        </feDiffuseLighting>
        <feComposite in="lit" in2="SourceGraphic" operator="arithmetic" k1="0" k2="0.85" k3="0" k4="-0.08" />
      </filter>
      <rect width="240" height="240" fill="#000" filter="url(#sn-velvet)" />
      <rect width="240" height="240" fill="url(#sn-velvet-shade)" />
      <defs>
        <linearGradient id="sn-velvet-shade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0b0a0c" stopOpacity="0" />
          <stop offset="1" stopColor="#0b0a0c" stopOpacity="0.75" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function Motif({ wrong = false }: { wrong?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 40 40" className={`block w-full ${wrong ? "rotate-180" : ""}`}>
      <path d="M20 4 L30 20 L20 36 L10 20 Z" fill="none" stroke={wrong ? "#d9a441" : "#6f6760"} strokeWidth="1.2" />
      <path d="M20 12 Q24 20 20 24 Q16 20 20 12 Z" fill={wrong ? "#d9a441" : "#6f6760"} />
      <circle cx="20" cy="30" r="1.6" fill={wrong ? "#d9a441" : "#6f6760"} />
    </svg>
  );
}

function WrongWallpaper() {
  return (
    <div
      role="img"
      aria-label="Wallpaper of thirty-six identical diamond motifs, one of which is upside down"
      className="grid grid-cols-6 gap-1 bg-[#161214] p-3"
    >
      {Array.from({ length: 36 }, (_, i) => (
        <Motif key={i} wrong={i === 22} />
      ))}
    </div>
  );
}

/* 3. Objects ------------------------------------------------------------- */

function LampRoom() {
  return (
    <svg role="img" aria-label="An empty room in perspective with a single standing lamp lit in the corner and its long shadow across the floor" viewBox="0 0 480 320" className="w-full">
      <defs>
        <radialGradient id="sn-room-glow" cx="0.62" cy="0.38" r="0.6">
          <stop offset="0" stopColor="#d9a441" stopOpacity="0.38" />
          <stop offset="1" stopColor="#d9a441" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sn-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3d08a" />
          <stop offset="1" stopColor="#c48a2c" />
        </linearGradient>
      </defs>
      <rect width="480" height="320" fill="#0b0a0c" />
      <path d="M0 230 L120 190 L480 190 L480 320 L0 320 Z" fill="#141113" />
      <path d="M120 0 V190" stroke="#2a2427" />
      <path d="M0 230 L120 190 L480 190" stroke="#2a2427" fill="none" />
      <rect width="480" height="320" fill="url(#sn-room-glow)" />
      <path d="M300 206 L60 300 L110 312 L306 210 Z" fill="#000" opacity="0.55" />
      <path d="M300 206 V120" stroke="#3a3335" strokeWidth="3" />
      <ellipse cx="300" cy="207" rx="14" ry="3" fill="#2a2427" />
      <path d="M282 92 L318 92 L328 122 L272 122 Z" fill="url(#sn-shade)" />
      <path d="M272 122 L328 122 L360 200 L240 200 Z" fill="#d9a441" opacity="0.08" />
    </svg>
  );
}

function DoorAjar() {
  return (
    <svg role="img" aria-label="A dark door standing slightly open, with warm light leaking through the gap and spilling across the floor" viewBox="0 0 220 300" className="w-full">
      <defs>
        <linearGradient id="sn-spill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d9a441" stopOpacity="0.55" />
          <stop offset="1" stopColor="#d9a441" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="220" height="300" fill="#0b0a0c" />
      <rect x="50" y="30" width="120" height="220" fill="#ffd98a" />
      <path d="M50 30 L150 44 L150 238 L50 250 Z" fill="#1d191b" />
      <path d="M150 44 L170 30 L170 250 L150 238 Z" fill="#ffe7b0" opacity="0.9" />
      <circle cx="138" cy="146" r="3" fill="#3a3335" />
      <rect x="44" y="24" width="132" height="226" fill="none" stroke="#2a2427" strokeWidth="6" />
      <path d="M150 250 L170 250 L220 300 L120 300 Z" fill="url(#sn-spill)" />
    </svg>
  );
}

function EndlessCorridor() {
  const frames = Array.from({ length: 9 }, (_, i) => i);
  return (
    <svg role="img" aria-label="A corridor in one-point perspective, with door frames receding into darkness toward a faint light" viewBox="0 0 400 260" className="w-full">
      <rect width="400" height="260" fill="#0b0a0c" />
      {[[0, 0], [400, 0], [0, 260], [400, 260]].map(([x, y]) => (
        <line key={`${x}-${y}`} x1={x} y1={y} x2="200" y2="130" stroke="#2a2427" />
      ))}
      {frames.map((i) => {
        const s = 0.9 ** (i * 2.2);
        const w = 400 * s;
        const h = 260 * s;
        return (
          <rect
            key={i}
            x={200 - w / 2}
            y={130 - h / 2}
            width={w}
            height={h}
            fill="none"
            stroke="#ede3d1"
            strokeOpacity={0.5 - i * 0.05}
            strokeWidth={1.2}
          />
        );
      })}
      <circle cx="200" cy="130" r="3" fill="#ede3d1" opacity="0.8" />
      <circle cx="200" cy="130" r="14" fill="#ede3d1" opacity="0.08" />
    </svg>
  );
}

function ElectricHum() {
  const points = Array.from({ length: 121 }, (_, i) => {
    const x = (i / 120) * 300;
    const env = Math.sin((i / 120) * Math.PI);
    const y = 50 + Math.sin(i * 0.9) * 18 * env + Math.sin(i * 2.7) * 4 * env;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  return (
    <svg role="img" aria-label="A glowing amber waveform, swelling in the middle and fading at both ends" viewBox="0 0 300 100" className="w-full">
      <filter id="sn-hum-glow" x="-10%" y="-50%" width="120%" height="200%">
        <feGaussianBlur stdDeviation="3" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <polyline points={points.join(" ")} fill="none" stroke="#d9a441" strokeWidth="1.6" filter="url(#sn-hum-glow)" />
      <text x="300" y="96" textAnchor="end" fontSize="9" fill="#a39c90" letterSpacing="2">
        60 HZ
      </text>
    </svg>
  );
}

function TelephoneOffHook() {
  return (
    <svg role="img" aria-label="Silhouette of an old telephone on a table with its receiver lying beside it, cord coiled" viewBox="0 0 320 200" className="w-full">
      <rect width="320" height="200" fill="#0b0a0c" />
      <path d="M0 160 H320" stroke="#2a2427" />
      <path d="M60 158 L78 108 Q82 98 94 98 H158 Q170 98 174 108 L192 158 Z" fill="#1d191b" stroke="#d9a441" strokeOpacity="0.5" />
      <circle cx="126" cy="128" r="17" fill="none" stroke="#3a3335" strokeWidth="2" />
      <path d="M200 150 Q206 138 222 140 L272 146 Q288 148 292 158 L290 160 L204 160 Z" fill="#1d191b" stroke="#d9a441" strokeOpacity="0.5" />
      <path
        d="M176 140 c6 -10 10 0 14 -8 c4 -8 10 2 14 -6 c4 -8 10 2 14 -4"
        fill="none"
        stroke="#6f6760"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function MothAtLamp() {
  return (
    <svg role="img" aria-label="A bare light bulb glowing in the dark with a small moth circling close to it" viewBox="0 0 240 240" className="w-full">
      <defs>
        <radialGradient id="sn-bulb" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff4d6" />
          <stop offset="0.18" stopColor="#d9a441" stopOpacity="0.6" />
          <stop offset="1" stopColor="#d9a441" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="240" height="240" fill="#0b0a0c" />
      <line x1="110" y1="0" x2="110" y2="88" stroke="#3a3335" />
      <circle cx="110" cy="110" r="90" fill="url(#sn-bulb)" />
      <circle cx="110" cy="108" r="12" fill="#fff4d6" />
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={176 - i * 9} cy={70 + i * 7} r={1.2} fill="#ede3d1" opacity={0.15 + i * 0.08} />
      ))}
      <g transform="translate(176 66) rotate(-20)" fill="#2a2427" stroke="#ede3d1" strokeOpacity="0.6" strokeWidth="0.8">
        <path d="M0 0 C-14 -12 -22 2 -10 8 Z" />
        <path d="M0 0 C14 -12 22 2 10 8 Z" />
        <ellipse cx="0" cy="4" rx="1.6" ry="6" fill="#3a3335" />
      </g>
    </svg>
  );
}

/* 4. Interface as Dream -------------------------------------------------- */

function FilmCard({ lit }: { lit: boolean }) {
  return (
    <div
      className={`p-5 transition-none ${
        lit
          ? "bg-[#221d1f] shadow-[0_0_50px_6px_rgb(217_164_65/0.25)] ring-1 ring-(--sn-amber)/60"
          : "bg-(--sn-smoke)"
      }`}
    >
      <p className={`sn-whisper text-xs ${lit ? "text-(--sn-amber)" : "text-(--sn-ash)"}`}>2001 · Lynch</p>
      <p className={`sn-serif mt-1 text-3xl italic ${lit ? "text-(--sn-lamp)" : "text-(--sn-ash)"}`}>Mulholland Drive</p>
      <p className="mt-2 text-sm text-(--sn-ash)">{lit ? "Dream · Desire · Two women and a blue key" : "Dream · Desire"}</p>
    </div>
  );
}

function LampOnCard() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div>
        <p className="sn-whisper mb-2 text-xs text-(--sn-ash)">At rest</p>
        <FilmCard lit={false} />
      </div>
      <div>
        <p className="sn-whisper mb-2 text-xs text-(--sn-amber)">Lit — on hover or focus</p>
        <FilmCard lit />
      </div>
    </div>
  );
}

const doors = [
  { mood: "Dread", light: "#8e1b1f" },
  { mood: "Desire", light: "#d9a441" },
  { mood: "Dream", light: "#8fa2ff" },
  { mood: "Decay", light: "#7f8c6e" },
];

function FourDoors() {
  return (
    <ul className="grid grid-cols-4 gap-3">
      {doors.map((d) => (
        <li key={d.mood} className="flex flex-col items-center gap-3">
          <div className="relative h-36 w-full rounded-t-full border border-(--sn-ash)/40 bg-(--sn-smoke) sm:h-44">
            <span
              aria-hidden="true"
              className="absolute inset-x-1 bottom-0 h-1"
              style={{ backgroundColor: d.light, boxShadow: `0 0 18px 4px ${d.light}` }}
            />
          </div>
          <span className="sn-whisper text-xs">{d.mood}</span>
        </li>
      ))}
    </ul>
  );
}

function LitWindow() {
  return (
    <div className="bg-[#100e10] px-8 py-10">
      <div className="mx-auto max-w-xs border-8 border-[#1d191b] bg-linear-to-b from-[#f0c46a] to-[#c98f2e] shadow-[0_0_80px_10px_rgb(217_164_65/0.3)]">
        <div className="grid grid-cols-2 gap-1.5 bg-[#1d191b]">
          <div className="col-span-2 bg-linear-to-b from-[#f0c46a] to-[#d9a441] px-4 py-5 text-(--sn-dark)">
            <p className="sn-whisper text-xs">1997 · Lynch</p>
            <p className="sn-serif text-3xl leading-none italic">Lost Highway</p>
          </div>
          <div className="h-12 bg-[#d9a441]" />
          <div className="h-12 bg-[#d9a441]" />
        </div>
      </div>
    </div>
  );
}

function EmptyRoom() {
  return (
    <div className="flex flex-col items-center gap-4 border border-dashed border-(--sn-ash)/30 px-6 py-12 text-center">
      <svg aria-hidden="true" viewBox="0 0 40 60" className="h-14 text-(--sn-ash)/60">
        <path d="M6 58 V8 Q6 2 20 2 Q34 2 34 8 V58" fill="none" stroke="currentColor" />
      </svg>
      <p className="sn-serif text-2xl italic">There is nothing in this room.</p>
      <p className="text-sm text-(--sn-ash)">No films match this mood yet. Try another door.</p>
    </div>
  );
}

/* 5. Found in the Dark --------------------------------------------------- */

function Artwork({ artifact, sizes }: { artifact: Artifact; sizes: string }) {
  const image = artifact.image;
  if (!image) return null;
  return (
    <div className="relative">
      <div aria-hidden="true" className="absolute -inset-6 bg-[radial-gradient(ellipse_at_center,rgb(237_227_209/0.08),transparent_70%)]" />
      <Image
        src={image.src}
        width={image.width}
        height={image.height}
        alt={image.alt}
        sizes={sizes}
        className="relative block h-auto w-full shadow-[0_30px_80px_-20px_rgb(0_0_0/0.9)]"
      />
    </div>
  );
}

/* Registry --------------------------------------------------------------- */

export type ExhibitSpec = {
  /** Grid placement; literal class strings so Tailwind can see them. */
  className: string;
  labelSide?: "left" | "right";
  render: (artifact: Artifact) => ReactNode;
};

export const exhibits: Record<string, ExhibitSpec> = {
  "SN-01": { className: "md:col-span-6 lg:col-span-10 lg:col-start-2", render: () => <PaletteLamps /> },
  "SN-02": { className: "md:col-span-6 lg:col-span-8", labelSide: "right", render: () => <Curtain /> },
  "SN-03": { className: "md:col-span-3 lg:col-span-3 lg:col-start-10 lg:mt-20", render: () => <SodiumLamp /> },
  "SN-04": { className: "md:col-span-3 lg:col-span-4", render: () => <DarknessLadder /> },
  "SN-05": { className: "md:col-span-6 lg:col-span-6 lg:col-start-7 lg:mt-12", render: () => <BlueHour /> },

  "SN-06": { className: "md:col-span-6 lg:col-span-11", render: () => <DisplayQuestion /> },
  "SN-07": { className: "md:col-span-3 lg:col-span-4 lg:col-start-2", render: () => <WhisperedLabels /> },
  "SN-08": { className: "md:col-span-3 lg:col-span-6 lg:col-start-7 lg:mt-12", render: () => <Reflection /> },
  "SN-09": { className: "md:col-span-6 lg:col-span-6", render: () => <Forgetting /> },
  "SN-10": { className: "md:col-span-3 lg:col-span-4 lg:col-start-9 lg:-mt-8", render: () => <ScaleShift /> },
  "SN-11": { className: "md:col-span-3 lg:col-span-5 lg:col-start-3", render: () => <DreamDiary /> },

  "SN-12": { className: "md:col-span-2 lg:col-span-3 lg:self-end", render: () => <FilmGrain /> },
  "SN-13": { className: "md:col-span-4 lg:col-span-8 lg:col-start-5", labelSide: "left", render: () => <PerspectiveFloor /> },
  "SN-14": { className: "md:col-span-6 lg:col-span-6", render: () => <Smoke /> },
  "SN-15": { className: "md:col-span-3 lg:col-span-4 lg:col-start-9 lg:mt-16", render: () => <TestSignal /> },
  "SN-16": { className: "md:col-span-3 lg:col-span-3 lg:col-start-2", render: () => <Velvet /> },
  "SN-17": { className: "md:col-span-3 lg:col-span-4 lg:col-start-7 lg:mt-12", render: () => <WrongWallpaper /> },

  "SN-18": { className: "md:col-span-6 lg:col-span-8", labelSide: "right", render: () => <LampRoom /> },
  "SN-19": { className: "md:col-span-3 lg:col-span-3 lg:col-start-10 lg:mt-16", render: () => <DoorAjar /> },
  "SN-20": { className: "md:col-span-3 lg:col-span-6 lg:col-start-3", render: () => <EndlessCorridor /> },
  "SN-21": { className: "md:col-span-3 lg:col-span-3 lg:col-start-10 lg:self-end", render: () => <ElectricHum /> },
  "SN-22": { className: "md:col-span-3 lg:col-span-4", render: () => <TelephoneOffHook /> },
  "SN-23": { className: "md:col-span-3 lg:col-span-3 lg:col-start-8 lg:mt-16", render: () => <MothAtLamp /> },

  "SN-24": { className: "md:col-span-6 lg:col-span-7", render: () => <LampOnCard /> },
  "SN-25": { className: "md:col-span-3 lg:col-span-4 lg:col-start-9 lg:mt-10", render: () => <FourDoors /> },
  "SN-26": { className: "md:col-span-3 lg:col-span-5 lg:col-start-2", render: () => <LitWindow /> },
  "SN-27": { className: "md:col-span-6 lg:col-span-4 lg:col-start-8 lg:mt-14", render: () => <EmptyRoom /> },

  "SN-28": {
    className: "md:col-span-3 lg:col-span-4",
    render: (a) => <Artwork artifact={a} sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw" />,
  },
  "SN-29": {
    className: "md:col-span-3 lg:col-span-3 lg:col-start-7 lg:mt-24",
    render: (a) => <Artwork artifact={a} sizes="(min-width: 1024px) 22vw, (min-width: 768px) 50vw, 100vw" />,
  },
  "SN-30": {
    className: "md:col-span-6 lg:col-span-9 lg:col-start-3",
    labelSide: "left",
    render: (a) => <Artwork artifact={a} sizes="(min-width: 1024px) 60vw, 100vw" />,
  },
};
