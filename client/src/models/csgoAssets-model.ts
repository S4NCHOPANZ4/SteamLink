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
