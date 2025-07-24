export type UnitOfMeasure =
  | "H87"  // Piece
  | "KGM"  // Kilogram
  | "MTR"  // Meter
  | "LTR"  // Litre
  | "MTK"  // Square metre
  | "MTQ"  // Cubic metre
  | "KTM"  // Kilometre
  | "TNE"  // Tonne (metric ton)
  | "KWH"  // Kilowatt hour
  | "DAY"  // Day
  | "HUR"  // Hour
  | "MIN"  // Minute
  // Recommendation No. 21 (prefixed with X)
  | "XBG"  // Bag
  | "XBX"  // Box
  | "XCT"  // Carton
  | "XCY"  // Cylinder
  | "XBA"  // Barrel
  | "XPK"  // Package
  | "XPX"  // Pallet
  | "XRL"  // Reel
  | "XSA"  // Sack
  | "XST"  // Sheet
  | "OTHER"; // For cases where the standard list doesn't apply

export const UnitOfMeasure: UnitOfMeasure[] = [
  "H87",
  "KGM",
  "MTR",
  "LTR",
  "MTK",
  "MTQ",
  "KTM",
  "TNE",
  "KWH",
  "DAY",
  "HUR",
  "MIN",
  "XBG",
  "XBX",
  "XCT",
  "XCY",
  "XBA",
  "XPK",
  "XPX",
  "XRL",
  "XSA",
  "XST",
  "OTHER",
];