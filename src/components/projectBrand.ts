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
  {
    src: string;
    scale: number; // share of the small Works tile
    rest?: string;
    mono?: boolean;
    // Homepage slider: every logo fills the same square box (fit 1); a few
    // get a little extra to make up for a wide wordmark or built-in margins.
    fit?: number;
  }
> = {
  // a tall outlined frame reads larger than a solid mark, so it sits smaller
  Nimbus: {
    src: require("@/assets/images/tiles/Nimbus.webp"),
    scale: 0.5,
    fit: 0.8,
  },
  // a solid disc, like Social App, so it sits smaller
  LPAgent: { src: require("@/assets/images/tiles/LPAgent.webp"), scale: 0.42 },
  Scouty: { src: require("@/assets/images/tiles/Scouty.webp"), scale: 0.4 },
  Mermail: { src: require("@/assets/images/tiles/Mermail.webp"), scale: 0.4 },
  // the shield and the brooch have empty margins inside their files
  ThomasRider: {
    src: require("@/assets/images/tiles/ThomasRider.webp"),
    scale: 0.5,
    fit: 1.12,
  },
  // light/colourful marks are darkened at rest to match the black ones
  CoranoJewelry: {
    src: require("@/assets/images/tiles/Corano.webp"),
    scale: 0.62,
    rest: "grayscale(1) brightness(0.85) contrast(1.15)",
    fit: 1.1,
  },
  Kyyeudreamers: {
    src: require("@/assets/images/tiles/Kyyeudreamers.webp"),
    scale: 0.74,
    rest: "grayscale(1) brightness(0.55) contrast(1.4)",
    mono: true,
    fit: 1.15,
  },
  // the solid disc is the heaviest mark, so it sits smaller
  SocialApp: { src: require("@/assets/images/tiles/SocialApp.webp"), scale: 0.42 },
};

