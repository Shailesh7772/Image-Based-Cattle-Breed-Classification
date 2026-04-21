export const BREED_DESCRIPTIONS: Record<string, { description: string; importance: string[] }> = {
  "Kangayam": {
    description: "Kangayam is a native breed from Tamil Nadu known for its exceptional strength and draught capacity. It has a grey or white coat with medium curved horns and a compact muscular body. This breed is highly valued in agricultural work due to its power and endurance. Kangayam cattle are well-adapted to the semi-arid climate of Tamil Nadu and can thrive on minimal feed resources. They are considered one of the finest draught breeds in South India.",
    importance: ["Excellent for ploughing and heavy farm work", "Strong endurance in hot climates", "Cultural significance in Tamil Nadu's agrarian heritage", "Conservation priority breed"],
  },
  "Gir": {
    description: "Gir cattle originate from the Gir forests and hills of Gujarat. They are one of the most important zebu breeds globally, known for their high milk production among Indian cattle breeds. The breed has a distinctive convex forehead, long pendulous ears, and curved horns. Gir cows produce milk with high fat content and are extensively exported to Brazil, where they form the basis of many dairy herds.",
    importance: ["One of the best dairy breeds in India", "Exported worldwide for crossbreeding programs", "High disease resistance", "Rich A2 milk production"],
  },
  "Sahiwal": {
    description: "Sahiwal is considered the best dairy breed among Indian cattle. Originally from the Punjab region, these reddish-brown cattle have a heavy build with loose skin, which helps in thermoregulation. Sahiwal cows can produce 10-16 liters of milk daily, making them highly valued in dairy farming. The breed is known for its docile temperament and resistance to tropical diseases including tick-borne diseases.",
    importance: ["Highest milk yield among Indian breeds", "Excellent heat tolerance", "Tick and disease resistance", "Used in crossbreeding programs globally"],
  },
  "Ongole": {
    description: "Ongole cattle are one of the most majestic Indian breeds, originating from Andhra Pradesh. They are characterized by their large white body, muscular build, prominent hump, and heavy dewlap. The breed has been exported to many countries including Brazil, where they are known as 'Nellore' and form the backbone of the beef industry. In India, they serve dual purposes of milk production and draught work.",
    importance: ["Foundation of Brazil's Nellore breed", "Excellent draught capability", "Good milk production for a dual-purpose breed", "Strong heat and disease resistance"],
  },
  "Tharparkar": {
    description: "Tharparkar cattle originate from the Thar Desert region of Rajasthan. They are a medium to large-sized breed with white or grey coloring and medium curved upward horns. Despite their desert origin, they are surprisingly good milk producers, yielding 6-10 liters per day. The breed is well-adapted to extreme heat and scarce water conditions, making them invaluable to desert communities.",
    importance: ["Thrives in extreme desert conditions", "Good dairy production despite harsh environment", "Low maintenance requirements", "Important genetic resource for climate adaptation"],
  },
  "Kankrej": {
    description: "Kankrej is one of the heaviest Indian cattle breeds, originating from the Kankrej region of Gujarat. Known for their silver-grey coat and magnificent lyre-shaped horns, these cattle are both powerful draught animals and reasonable milk producers. They are fast trotters and were traditionally used for pulling heavy loads over long distances. The breed is also known as Wadad or Wadhiar.",
    importance: ["One of the largest Indian breeds", "Excellent for heavy draught work", "Dual-purpose: milk and draught", "Adapted to arid and semi-arid conditions"],
  },
  "Red Sindhi": {
    description: "Red Sindhi cattle are known for their distinctive deep red color and compact body. Originally from the Sindh province, this breed has spread throughout India due to its excellent dairy potential. Red Sindhi cows can produce 8-12 liters of milk daily and are known for their heat tolerance and disease resistance. They have been exported to over 30 countries for dairy improvement programs.",
    importance: ["Excellent dairy breed with high milk yield", "Exported to 30+ countries", "Superior heat tolerance", "Strong resistance to tropical diseases"],
  },
  "Hallikar": {
    description: "Hallikar is one of the most important draught breeds of Karnataka. These cattle are characterized by their grey coat, long backward-curving horns, and compact muscular body. They are known for their speed and endurance, making them excellent for both farm work and traditional cattle races. The breed has been integral to Karnataka's agricultural economy for centuries.",
    importance: ["Premier draught breed of Karnataka", "Excellent speed and endurance", "Adapted to dry tropical climate", "Cultural importance in traditional cattle events"],
  },
  "Hariana": {
    description: "Hariana cattle originate from Haryana state and are one of the most popular dual-purpose breeds in North India. They are tall, well-built animals with white or grey coloring and a flat forehead. Hariana cattle provide both reasonable milk yields and good draught power. They are widely distributed across North India and have been used in many crossbreeding programs.",
    importance: ["Popular dual-purpose breed", "Good adaptation to North Indian conditions", "Used in crossbreeding programs", "Important for small-scale farming"],
  },
  "Vechur": {
    description: "Vechur cattle from Kerala hold the Guinness record as the smallest cattle breed in the world. Despite their tiny stature (less than 90 cm tall), they produce milk with high fat content and are extremely efficient converters of feed to milk. The breed was on the verge of extinction but has been rescued through conservation efforts. Their milk is believed to have medicinal properties.",
    importance: ["Guinness record: smallest cattle breed", "High-fat, potentially medicinal milk", "Extremely feed-efficient", "Conservation success story"],
  },
  "Punganur": {
    description: "Punganur cattle from Andhra Pradesh are one of the world's smallest cattle breeds, standing only about 70-90 cm tall. Despite their diminutive size, they are excellent milk producers relative to their body size. The breed is critically endangered with only a few hundred remaining. Conservation efforts are underway to protect this unique genetic resource.",
    importance: ["Critically endangered heritage breed", "Efficient milk production for size", "Unique genetic resource", "Cultural significance in Andhra Pradesh"],
  },
  "Khillari": {
    description: "Khillari cattle from Maharashtra are powerful draught animals known for their speed and stamina. They have a compact muscular body, grey-white coat, and long pointed horns. These cattle are prized for their ability to work long hours under harsh conditions and are particularly popular for ploughing operations in the Deccan Plateau region.",
    importance: ["One of the fastest draught breeds", "Excellent stamina for field work", "Adapted to Deccan Plateau conditions", "Important for traditional farming"],
  },
};

export function getBreedDescription(breedName: string): { description: string; importance: string[] } {
  return BREED_DESCRIPTIONS[breedName] || {
    description: `${breedName} is a native Indian cattle breed known for its adaptation to local climatic conditions and agricultural practices. This breed plays an important role in India's livestock diversity and contributes to the livelihoods of farmers in its region of origin. Conservation and proper breeding practices are essential for maintaining the breed's genetic purity and unique characteristics.`,
    importance: [
      "Adapted to local climate and conditions",
      "Important for regional farming economy",
      "Part of India's rich livestock biodiversity",
      "Contributes to sustainable agriculture",
    ],
  };
}
