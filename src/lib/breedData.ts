export interface BreedInfo {
  origin: string;
  state: string;
  use: "Milk" | "Draught" | "Dual";
  milk_yield: string;
  coat_color: string;
  horn_type: string;
  features: string;
  lat: number;
  lng: number;
}

export const BREED_DATABASE: Record<string, BreedInfo> = {
  "Amritmahal": { origin: "Karnataka", state: "Karnataka", use: "Draught", milk_yield: "2-3 liters/day", coat_color: "Grey / White", horn_type: "Long, upward curved", features: "Well-built, active, strong legs, compact body", lat: 14.5, lng: 75.7 },
  "Bachaur": { origin: "Bihar", state: "Bihar", use: "Dual", milk_yield: "3-5 liters/day", coat_color: "Grey / Silver", horn_type: "Short, curved outward", features: "Medium-sized, well-proportioned body, prominent hump", lat: 26.1, lng: 86.0 },
  "Bargur": { origin: "Tamil Nadu", state: "Tamil Nadu", use: "Draught", milk_yield: "2-4 liters/day", coat_color: "Brown / Red-brown", horn_type: "Short, curved", features: "Agile, strong, compact muscular body", lat: 11.4, lng: 77.4 },
  "Dangi": { origin: "Maharashtra", state: "Maharashtra", use: "Draught", milk_yield: "2-3 liters/day", coat_color: "White with red/black spots", horn_type: "Short, thick", features: "Hardy, adapted to hilly terrain, medium-sized", lat: 20.0, lng: 73.8 },
  "Deoni": { origin: "Maharashtra", state: "Maharashtra", use: "Dual", milk_yield: "4-6 liters/day", coat_color: "Black and white spotted", horn_type: "Short, curved", features: "Large body, prominent hump, spotted coat pattern", lat: 18.2, lng: 76.5 },
  "Gaolao": { origin: "Maharashtra", state: "Maharashtra", use: "Draught", milk_yield: "2-3 liters/day", coat_color: "White / Grey", horn_type: "Short, curved outward", features: "Strong, medium build, suited for heavy work", lat: 21.1, lng: 79.1 },
  "Gir": { origin: "Gujarat", state: "Gujarat", use: "Milk", milk_yield: "10-15 liters/day", coat_color: "Reddish-brown with white patches", horn_type: "Curved, pendulous", features: "Large body, convex forehead, prominent dewlap, loose skin", lat: 21.5, lng: 70.5 },
  "Hallikar": { origin: "Karnataka", state: "Karnataka", use: "Draught", milk_yield: "2-4 liters/day", coat_color: "Grey / Dark grey", horn_type: "Long, backward curving", features: "Compact body, prominent forehead, muscular neck", lat: 12.3, lng: 76.6 },
  "Hariana": { origin: "Haryana", state: "Haryana", use: "Dual", milk_yield: "6-8 liters/day", coat_color: "White / Grey", horn_type: "Short, blunt", features: "Tall, well-built, flat forehead, strong legs", lat: 29.1, lng: 76.4 },
  "Kangayam": { origin: "Tamil Nadu", state: "Tamil Nadu", use: "Draught", milk_yield: "3-5 liters/day", coat_color: "Grey / White", horn_type: "Medium, upward curved", features: "Compact muscular body, short upward-curving horns, strong legs", lat: 10.9, lng: 77.6 },
  "Kankrej": { origin: "Gujarat", state: "Gujarat", use: "Dual", milk_yield: "5-10 liters/day", coat_color: "Silver-grey to iron-grey", horn_type: "Lyre-shaped, large", features: "Large body, high prominent hump, active and alert", lat: 23.7, lng: 71.6 },
  "Kasaragod Dwarf": { origin: "Kerala", state: "Kerala", use: "Milk", milk_yield: "2-4 liters/day", coat_color: "Black / Brown", horn_type: "Short", features: "Very small dwarf breed, adapted to coastal climate", lat: 12.5, lng: 75.0 },
  "Kherigarh": { origin: "Uttar Pradesh", state: "Uttar Pradesh", use: "Dual", milk_yield: "3-5 liters/day", coat_color: "White / Grey", horn_type: "Short, stumpy", features: "Medium-sized, well-proportioned, hardy", lat: 28.1, lng: 80.8 },
  "Khillari": { origin: "Maharashtra", state: "Maharashtra", use: "Draught", milk_yield: "1-3 liters/day", coat_color: "Grey / White", horn_type: "Long, pointed", features: "Compact, muscular, very strong, fast for draught", lat: 17.4, lng: 75.0 },
  "Krishna Valley": { origin: "Karnataka", state: "Karnataka", use: "Dual", milk_yield: "3-5 liters/day", coat_color: "White / Grey", horn_type: "Short, curved", features: "Large frame, gentle temperament, prominent hump", lat: 16.7, lng: 75.9 },
  "Malnad Gidda": { origin: "Karnataka", state: "Karnataka", use: "Milk", milk_yield: "2-4 liters/day", coat_color: "Black / Brown / White", horn_type: "Short, small", features: "Very small breed, disease resistant, adapted to Western Ghats", lat: 13.7, lng: 75.3 },
  "Malvi": { origin: "Madhya Pradesh", state: "Madhya Pradesh", use: "Draught", milk_yield: "2-3 liters/day", coat_color: "Grey / White", horn_type: "Short, thick, curved", features: "Strong body, well-developed hump, good for heavy work", lat: 23.5, lng: 75.5 },
  "Mewati": { origin: "Rajasthan", state: "Rajasthan", use: "Dual", milk_yield: "4-6 liters/day", coat_color: "White", horn_type: "Short, curved inward", features: "Medium-sized, resembles Hariana, adapted to arid climate", lat: 27.4, lng: 76.9 },
  "Nagori": { origin: "Rajasthan", state: "Rajasthan", use: "Draught", milk_yield: "2-4 liters/day", coat_color: "White", horn_type: "Medium, curved upward", features: "Tall, powerful, fast, good for trotting", lat: 27.2, lng: 73.8 },
  "Nimari": { origin: "Madhya Pradesh", state: "Madhya Pradesh", use: "Dual", milk_yield: "3-5 liters/day", coat_color: "Red / Reddish-brown", horn_type: "Short, curved", features: "Medium-sized, hardy, adapted to Narmada valley", lat: 22.0, lng: 76.1 },
  "Ongole": { origin: "Andhra Pradesh", state: "Andhra Pradesh", use: "Dual", milk_yield: "5-8 liters/day", coat_color: "White", horn_type: "Short, stumpy", features: "Large white body, prominent hump, heavy dewlap, muscular", lat: 15.5, lng: 80.0 },
  "Ponwar": { origin: "Uttar Pradesh", state: "Uttar Pradesh", use: "Dual", milk_yield: "3-5 liters/day", coat_color: "Black and white", horn_type: "Small, curved", features: "Medium-sized, distinctive black and white pattern", lat: 29.4, lng: 79.5 },
  "Punganur": { origin: "Andhra Pradesh", state: "Andhra Pradesh", use: "Milk", milk_yield: "3-5 liters/day", coat_color: "White / Grey / Light brown", horn_type: "Short, curved", features: "One of world's smallest breeds, very small stature", lat: 13.7, lng: 78.6 },
  "Rathi": { origin: "Rajasthan", state: "Rajasthan", use: "Milk", milk_yield: "6-10 liters/day", coat_color: "Brown with white patches", horn_type: "Short, curved", features: "Good milk producer, well-built, adapted to desert", lat: 28.0, lng: 70.9 },
  "Red Kandhari": { origin: "Maharashtra", state: "Maharashtra", use: "Draught", milk_yield: "2-4 liters/day", coat_color: "Deep red / Dark red", horn_type: "Medium, curved", features: "Compact body, deep red color, strong and sturdy", lat: 18.7, lng: 76.8 },
  "Red Sindhi": { origin: "Sindh (now in Pakistan)", state: "Rajasthan", use: "Milk", milk_yield: "8-12 liters/day", coat_color: "Deep red", horn_type: "Small, curved upward", features: "Deep red color, compact body, good milk producer, heat tolerant", lat: 25.4, lng: 69.7 },
  "Sahiwal": { origin: "Punjab", state: "Punjab", use: "Milk", milk_yield: "10-16 liters/day", coat_color: "Reddish-brown / Dun", horn_type: "Short, thick", features: "Reddish-brown color, loose skin, heavy build, best Indian dairy breed", lat: 30.9, lng: 75.9 },
  "Siri": { origin: "Sikkim", state: "Sikkim", use: "Dual", milk_yield: "3-5 liters/day", coat_color: "Black / Brown with white markings", horn_type: "Medium, curved", features: "Hardy, adapted to high altitudes, sure-footed", lat: 27.3, lng: 88.6 },
  "Tharparkar": { origin: "Rajasthan", state: "Rajasthan", use: "Dual", milk_yield: "6-10 liters/day", coat_color: "White / Grey", horn_type: "Medium, curved upward", features: "Well-proportioned body, alert, good milk yield, desert adapted", lat: 25.0, lng: 70.2 },
  "Umbalachery": { origin: "Tamil Nadu", state: "Tamil Nadu", use: "Draught", milk_yield: "2-3 liters/day", coat_color: "Red / Reddish-brown", horn_type: "Short, backward curved", features: "Small, sturdy, adapted to marshy areas, strong legs", lat: 10.7, lng: 79.5 },
  "Vechur": { origin: "Kerala", state: "Kerala", use: "Milk", milk_yield: "3-4 liters/day", coat_color: "Black / Red / Grey", horn_type: "Very short", features: "Smallest cattle breed in India, high fat content milk", lat: 9.7, lng: 76.4 },
  "Belahi": { origin: "Himachal Pradesh", state: "Himachal Pradesh", use: "Dual", milk_yield: "2-4 liters/day", coat_color: "Red / Brown", horn_type: "Small, curved", features: "Small, adapted to hilly terrain, disease resistant", lat: 31.1, lng: 77.2 },
  "Binjharpuri": { origin: "Odisha", state: "Odisha", use: "Draught", milk_yield: "2-3 liters/day", coat_color: "Grey / White", horn_type: "Medium, curved", features: "Medium-sized, adapted to hot humid climate, strong", lat: 20.5, lng: 86.2 },
  "Chhattisgarhi": { origin: "Chhattisgarh", state: "Chhattisgarh", use: "Dual", milk_yield: "2-4 liters/day", coat_color: "Grey / Red", horn_type: "Medium, curved", features: "Hardy, adapted to tropical climate, good endurance", lat: 21.3, lng: 81.6 },
  "Dagri": { origin: "Gujarat", state: "Gujarat", use: "Dual", milk_yield: "3-5 liters/day", coat_color: "White / Grey", horn_type: "Medium, lyre-shaped", features: "Resembles Kankrej, adapted to hilly terrain", lat: 20.7, lng: 73.0 },
  "Gangatiri": { origin: "Uttar Pradesh", state: "Uttar Pradesh", use: "Milk", milk_yield: "5-8 liters/day", coat_color: "White", horn_type: "Small, curved", features: "Good dairy breed, white color, adapted to Gangetic plains", lat: 25.3, lng: 83.0 },
  "Himachali Pahari": { origin: "Himachal Pradesh", state: "Himachal Pradesh", use: "Dual", milk_yield: "2-3 liters/day", coat_color: "Black / Brown / Red", horn_type: "Small", features: "Small hill breed, adapted to cold mountainous terrain", lat: 32.1, lng: 77.6 },
  "Khamala": { origin: "Rajasthan", state: "Rajasthan", use: "Draught", milk_yield: "2-3 liters/day", coat_color: "Grey / White", horn_type: "Medium, curved", features: "Strong draught breed, similar to Nagori, well-built", lat: 26.3, lng: 73.0 },
  "Lakhimi": { origin: "Assam", state: "Assam", use: "Milk", milk_yield: "3-5 liters/day", coat_color: "Red / Brown", horn_type: "Small, curved", features: "Small, adapted to wet climate, good milk fat content", lat: 26.7, lng: 94.2 },
  "Ladakhi": { origin: "Ladakh", state: "Jammu & Kashmir", use: "Dual", milk_yield: "2-3 liters/day", coat_color: "Black / Brown", horn_type: "Short", features: "Very small, adapted to extreme cold and high altitude", lat: 34.2, lng: 77.6 },
  "Motu": { origin: "Odisha", state: "Odisha", use: "Draught", milk_yield: "1-2 liters/day", coat_color: "Grey / White", horn_type: "Long, curved", features: "Strong draught breed, large body, powerful build", lat: 19.8, lng: 84.0 },
  "Nari": { origin: "Rajasthan", state: "Rajasthan", use: "Dual", milk_yield: "3-5 liters/day", coat_color: "White", horn_type: "Short, curved", features: "Desert breed, good endurance, heat tolerant", lat: 25.8, lng: 71.4 },
  "Poda Thurpu": { origin: "Andhra Pradesh", state: "Andhra Pradesh", use: "Draught", milk_yield: "1-2 liters/day", coat_color: "Grey / White", horn_type: "Medium, curved", features: "Hill breed from Eastern Ghats, strong and agile", lat: 18.0, lng: 83.0 },
  "Pulikulam": { origin: "Tamil Nadu", state: "Tamil Nadu", use: "Draught", milk_yield: "1-2 liters/day", coat_color: "Grey / Dark grey", horn_type: "Long, backward curved", features: "Used for Jallikattu, agile, compact, muscular", lat: 10.1, lng: 78.1 },
  "Kosali": { origin: "Chhattisgarh", state: "Chhattisgarh", use: "Dual", milk_yield: "2-4 liters/day", coat_color: "Grey / White / Red", horn_type: "Medium", features: "Hardy indigenous breed, adapted to local conditions", lat: 22.1, lng: 82.1 },
  "Thutho": { origin: "Nagaland", state: "Nagaland", use: "Dual", milk_yield: "1-3 liters/day", coat_color: "Black / Brown", horn_type: "Short", features: "Small hill breed from Northeast, hardy and disease resistant", lat: 26.2, lng: 94.6 },
  "Badri": { origin: "Uttarakhand", state: "Uttarakhand", use: "Dual", milk_yield: "2-4 liters/day", coat_color: "Brown / Red / Black", horn_type: "Short, curved", features: "Small hill breed, adapted to Himalayan terrain, A2 milk", lat: 30.3, lng: 79.5 },
  "Konkan Kapila": { origin: "Maharashtra", state: "Maharashtra", use: "Milk", milk_yield: "3-5 liters/day", coat_color: "Red / Brown", horn_type: "Short", features: "Coastal breed, adapted to Konkan region, good milk", lat: 16.5, lng: 73.5 },
  "Purnea": { origin: "Bihar", state: "Bihar", use: "Dual", milk_yield: "3-5 liters/day", coat_color: "Black / Grey", horn_type: "Short, curved", features: "Medium-sized, adapted to flood-prone areas", lat: 25.8, lng: 87.5 },
  "Shahabadi": { origin: "Bihar", state: "Bihar", use: "Dual", milk_yield: "3-5 liters/day", coat_color: "White / Grey", horn_type: "Short", features: "Medium-sized, well-adapted to local conditions, docile", lat: 25.2, lng: 84.8 },
};

// Dataset statistics (simulated realistic values)
export const DATASET_STATS = {
  total_images: 12847,
  num_breeds: 50,
  images_per_breed: Object.keys(BREED_DATABASE).map((breed) => ({
    breed,
    count: Math.floor(150 + Math.random() * 200),
  })),
};

// Model performance metrics (simulated)
export const MODEL_METRICS = {
  architecture: "Vision Transformer + CNN Ensemble",
  training_accuracy: 94.7,
  validation_accuracy: 91.3,
  top5_accuracy: 98.2,
  num_classes: 50,
  dataset_size: 12847,
  epochs: 120,
  accuracy_history: Array.from({ length: 30 }, (_, i) => ({
    epoch: (i + 1) * 4,
    train: Math.min(20 + i * 2.8 + Math.random() * 2, 94.7),
    val: Math.min(18 + i * 2.5 + Math.random() * 3, 91.3),
  })),
  loss_history: Array.from({ length: 30 }, (_, i) => ({
    epoch: (i + 1) * 4,
    train: Math.max(3.5 - i * 0.1 - Math.random() * 0.05, 0.18),
    val: Math.max(3.8 - i * 0.09 - Math.random() * 0.06, 0.28),
  })),
};
