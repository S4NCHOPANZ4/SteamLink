
//===========================CASES==================================
export interface CSgoWeaponSkin {
    id: string;
    name: string;
    rarity: string;
    paint_index: string;
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
