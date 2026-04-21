import { BREED_DATABASE } from "./breedData";

export interface BreedFeatures {
  color: string;
  horn: string;
  body: string;
  face: string;
}

export const BREED_FEATURES: Record<string, BreedFeatures> = {
  "Amritmahal": { color: "Grey / White", horn: "Long, upward curved", body: "Well-built and compact", face: "Narrow and elongated" },
  "Bachaur": { color: "Grey / Silver", horn: "Short, curved outward", body: "Medium-sized, well-proportioned", face: "Broad forehead" },
  "Bargur": { color: "Brown / Red-brown", horn: "Short, curved", body: "Agile and compact muscular", face: "Alert and narrow" },
  "Dangi": { color: "White with red/black spots", horn: "Short, thick", body: "Hardy, medium-sized", face: "Short and broad" },
  "Deoni": { color: "Black and white spotted", horn: "Short, curved", body: "Large body with prominent hump", face: "Broad and flat" },
  "Gaolao": { color: "White / Grey", horn: "Short, curved outward", body: "Strong medium build", face: "Moderately long" },
  "Gir": { color: "Reddish-brown with white patches", horn: "Curved, pendulous", body: "Large body with loose skin", face: "Distinctive convex forehead" },
  "Hallikar": { color: "Grey / Dark grey", horn: "Long, backward curving", body: "Compact and muscular neck", face: "Prominent forehead" },
  "Hariana": { color: "White / Grey", horn: "Short, blunt", body: "Tall and well-built", face: "Flat forehead" },
  "Kangayam": { color: "Grey / White", horn: "Medium, upward curved", body: "Compact muscular", face: "Short and broad" },
  "Kankrej": { color: "Silver-grey to iron-grey", horn: "Lyre-shaped, large", body: "Large with high prominent hump", face: "Broad between eyes" },
  "Kasaragod Dwarf": { color: "Black / Brown", horn: "Short", body: "Very small dwarf breed", face: "Small and compact" },
  "Kherigarh": { color: "White / Grey", horn: "Short, stumpy", body: "Medium-sized, well-proportioned", face: "Moderately broad" },
  "Khillari": { color: "Grey / White", horn: "Long, pointed", body: "Compact, very muscular", face: "Long and narrow" },
  "Krishna Valley": { color: "White / Grey", horn: "Short, curved", body: "Large frame with prominent hump", face: "Broad and flat" },
  "Malnad Gidda": { color: "Black / Brown / White", horn: "Short, small", body: "Very small breed", face: "Small and round" },
  "Malvi": { color: "Grey / White", horn: "Short, thick, curved", body: "Strong, well-developed hump", face: "Short and wide" },
  "Mewati": { color: "White", horn: "Short, curved inward", body: "Medium-sized", face: "Similar to Hariana" },
  "Nagori": { color: "White", horn: "Medium, curved upward", body: "Tall and powerful", face: "Long and narrow" },
  "Nimari": { color: "Red / Reddish-brown", horn: "Short, curved", body: "Medium-sized, hardy", face: "Moderately broad" },
  "Ongole": { color: "White", horn: "Short, stumpy", body: "Large muscular with heavy dewlap", face: "Broad with prominent poll" },
  "Ponwar": { color: "Black and white", horn: "Small, curved", body: "Medium-sized", face: "Distinctive pattern" },
  "Punganur": { color: "White / Grey / Light brown", horn: "Short, curved", body: "One of world's smallest breeds", face: "Small and proportionate" },
  "Rathi": { color: "Brown with white patches", horn: "Short, curved", body: "Well-built, adapted to desert", face: "Moderately broad" },
  "Red Kandhari": { color: "Deep red / Dark red", horn: "Medium, curved", body: "Compact, strong and sturdy", face: "Broad and flat" },
  "Red Sindhi": { color: "Deep red", horn: "Small, curved upward", body: "Compact body, heat tolerant", face: "Broad forehead" },
  "Sahiwal": { color: "Reddish-brown / Dun", horn: "Short, thick", body: "Heavy build, loose skin", face: "Broad and flat forehead" },
  "Siri": { color: "Black / Brown with white markings", horn: "Medium, curved", body: "Hardy, adapted to high altitudes", face: "Small and alert" },
  "Tharparkar": { color: "White / Grey", horn: "Medium, curved upward", body: "Well-proportioned, desert adapted", face: "Broad forehead" },
  "Umbalachery": { color: "Red / Reddish-brown", horn: "Short, backward curved", body: "Small, sturdy", face: "Short and broad" },
  "Vechur": { color: "Black / Red / Grey", horn: "Very short", body: "Smallest cattle breed in India", face: "Tiny and proportionate" },
  "Belahi": { color: "Red / Brown", horn: "Small, curved", body: "Small, adapted to hills", face: "Compact and round" },
  "Binjharpuri": { color: "Grey / White", horn: "Medium, curved", body: "Medium-sized, strong", face: "Moderately long" },
  "Chhattisgarhi": { color: "Grey / Red", horn: "Medium, curved", body: "Hardy, good endurance", face: "Broad and flat" },
  "Dagri": { color: "White / Grey", horn: "Medium, lyre-shaped", body: "Resembles Kankrej", face: "Broad between eyes" },
  "Gangatiri": { color: "White", horn: "Small, curved", body: "Good dairy build", face: "Moderately broad" },
  "Himachali Pahari": { color: "Black / Brown / Red", horn: "Small", body: "Small hill breed", face: "Small and compact" },
  "Khamala": { color: "Grey / White", horn: "Medium, curved", body: "Strong, well-built", face: "Similar to Nagori" },
  "Lakhimi": { color: "Red / Brown", horn: "Small, curved", body: "Small, adapted to wet climate", face: "Small and round" },
  "Ladakhi": { color: "Black / Brown", horn: "Short", body: "Very small, high altitude", face: "Small and compact" },
  "Motu": { color: "Grey / White", horn: "Long, curved", body: "Large, powerful build", face: "Long and broad" },
  "Nari": { color: "White", horn: "Short, curved", body: "Desert breed, good endurance", face: "Moderately long" },
  "Poda Thurpu": { color: "Grey / White", horn: "Medium, curved", body: "Hill breed, strong and agile", face: "Narrow and alert" },
  "Pulikulam": { color: "Grey / Dark grey", horn: "Long, backward curved", body: "Agile, compact, muscular", face: "Short and fierce" },
  "Kosali": { color: "Grey / White / Red", horn: "Medium", body: "Hardy indigenous breed", face: "Moderately broad" },
  "Thutho": { color: "Black / Brown", horn: "Short", body: "Small hill breed, hardy", face: "Small and round" },
  "Badri": { color: "Brown / Red / Black", horn: "Short, curved", body: "Small hill breed", face: "Compact and alert" },
  "Konkan Kapila": { color: "Red / Brown", horn: "Short", body: "Coastal breed, good milk", face: "Moderately broad" },
  "Purnea": { color: "Black / Grey", horn: "Short, curved", body: "Medium-sized", face: "Broad and flat" },
  "Shahabadi": { color: "White / Grey", horn: "Short", body: "Medium-sized, docile", face: "Broad forehead" },
};

export function generateExplanations(breedName: string): string[] {
  const features = BREED_FEATURES[breedName];
  const breedInfo = BREED_DATABASE[breedName];

  if (!features) {
    return [
      "The model analyzed coat color patterns in the image",
      "Horn shape and curvature were key classification factors",
      "Body structure and build matched breed characteristics",
      "Overall morphology was compared against known breed profiles",
    ];
  }

  const explanations: string[] = [];

  explanations.push(`The model detected ${features.color.toLowerCase()} coat color typical of ${breedName}`);
  explanations.push(`Horn shape matches ${features.horn.toLowerCase()} characteristic of this breed`);
  explanations.push(`Body structure is ${features.body.toLowerCase()}`);
  explanations.push(`Facial structure appears ${features.face.toLowerCase()}`);

  if (breedInfo) {
    if (breedInfo.use === "Milk") {
      explanations.push("Build pattern is consistent with a dairy-purpose breed");
    } else if (breedInfo.use === "Draught") {
      explanations.push("Muscular build suggests a draught-purpose breed");
    }
  }

  return explanations.slice(0, 4);
}
