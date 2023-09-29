
//===========================CASES==================================
export interface CSgoWeaponSkin {
    id: string;
    name: string;
    rarity: string;
    paint_index?: string;
    image: string;
}

export interface CSgoWeaponCase {
    contains: CSgoWeaponSkin[];
    contains_rare: CSgoWeaponSkin[];
    description: string | null;
    first_sale_date: string;
    id: string;
    image: string;
    name: string;
    type: string;
}
//===========================CAPSULES==================================
export interface CSGOCapsules {
    id: string;
    name: string;
    rarity: string;
    image: string;
  }
  
export interface CSGOCapsulesPack {
    id: string;
    name: string;
    description: string;
    type: string;
    first_sale_date: string;
    contains: CSGOCapsulesPack[];
    contains_rare: CSGOCapsulesPack[];
    image: string;
  }
  //===========================MUSIC==========================
export  interface CSGOMusicKit {
    id: string;
    name: string;
    rarity: string;
  }
  
export  interface CSGOMusicKitBox {
    id: string;
    name: string;
    description: string;
    type: string;
    first_sale_date: string;
    contains: CSGOMusicKit[];
    contains_rare: CSGOMusicKit[];
    image: string;
  }
//=================GRAFITTI============
export interface Graffiti {
  id: string;
  name: string;
  rarity: string;
  image: string;
}

export interface GraffitiBox {
  id: string;
  name: string;
  description: string;
  type: string;
  first_sale_date: string;
  contains: Graffiti[];
  contains_rare: Graffiti[];
  image: string;
}
//===========================Agents=============================
export interface Agent {
  id: string;
  name: string;
  description: string;
  rarity: {
    id: string;
    name: string;
  };
  collections: {
    id: string;
    name: string;
    image: string;
  }[];
  image: string;
}

export interface AgentFixed {
  id: string; 
  name: string;
  rarity: string; 
  paint_index: string; 
  image: string;
}
//===========================Agent => Weapon ==============================

const rarityCheck = (item: string) => {
  switch (item) {
    case "Consumer Grade":
      return "Consumer Grade"
    case "rarity_rare_character":
      return "Mil-Spec Grade"
    case "rarity_ancient_character":
      return "Restricted"
    case "rarity_mythical_character":
      return "Classified"
    case "rarity_legendary_character":
      return "Covert"
    default:
      return "Mil-Spec Grade"
  }
}

export function convertAgentsToWeaponSkins(agents: Agent[]): AgentFixed[] {
  const weaponSkins: AgentFixed[] = agents.map((agent) => {
    // Assuming that agent.rarity.id is a string or number, and agent.rarity.name is a string
    const weaponSkin: AgentFixed = {
      id: agent.id,
      name: agent.name,
      rarity: rarityCheck(agent.rarity.id.toString()), // Convert to string if necessary
      paint_index: 'undefined-string', // You can adjust this value based on your requirements
      image: agent.image,
    };
    return weaponSkin;
  });

  return weaponSkins;
}