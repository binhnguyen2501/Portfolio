/* Shared per-project brand bits: hover tints and trimmed logo marks. */

// Hover tints picked per project at an even lightness (≈ L* 95–96), so no
// row's wipe is much stronger or fainter than the others.
export const WIPES: Record<string, string> = {
  Nimbus: "#eef3fe",
  LPAgent: "#f3f8d6",
  Scouty: "#f0f0f2",
  Mermail: "#e3f6f6",
  ThomasRider: "#f8ebe0",
  CoranoJewelry: "#f6f0e6",
  Kyyeudreamers: "#e8f5ea",
  SocialApp: "#fcecec",
};

// Trimmed, transparent versions of the homepage slider logos, each with a
// visual scale so marks of different shapes read at a similar weight.
export const TILE_LOGOS: Record<
  string,
  { src: string; scale: number; rest?: string; mono?: boolean }
> = {
  Nimbus: { src: require("@/assets/images/tiles/Nimbus.webp"), scale: 0.5 },
  // a solid disc, like Social App, so it sits smaller
  LPAgent: { src: require("@/assets/images/tiles/LPAgent.webp"), scale: 0.42 },
  Scouty: { src: require("@/assets/images/tiles/Scouty.webp"), scale: 0.4 },
  Mermail: { src: require("@/assets/images/tiles/Mermail.webp"), scale: 0.4 },
  ThomasRider: { src: require("@/assets/images/tiles/ThomasRider.webp"), scale: 0.5 },
  // light/colourful marks are darkened at rest to match the black ones
  CoranoJewelry: {
    src: require("@/assets/images/tiles/Corano.webp"),
    scale: 0.62,
    rest: "grayscale(1) brightness(0.85) contrast(1.15)",
  },
  Kyyeudreamers: {
    src: require("@/assets/images/tiles/Kyyeudreamers.webp"),
    scale: 0.74,
    rest: "grayscale(1) brightness(0.55) contrast(1.4)",
    mono: true,
  },
  // the solid disc is the heaviest mark, so it sits smaller
  SocialApp: { src: require("@/assets/images/tiles/SocialApp.webp"), scale: 0.42 },
};

