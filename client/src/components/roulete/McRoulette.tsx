import React, { useRef, useState, useEffect } from 'react';
import cl from "./styles/rouletteItem.module.scss"
import RouletteItem from "./RoulettItem";
import { Roulette, Weapon, weaponAttributes } from "./models/RoulleteModel";
import { CSgoWeaponSkin } from '../../models/csgoAssets-model';

interface RouletteElementParams {
    weapons: weaponAttributes[] | CSgoWeaponSkin[],
    weaponsCount: number,
    transitionDuration: number
}

const McRoulette = ({
    weapons,
    weaponsCount,
    transitionDuration
}: RouletteElementParams) => {
    const [rouletteWeapons, setRouletteWeapons] = useState<weaponAttributes[] | Weapon[]>(weapons)

    const [isReplay, setIsReplay] = useState<boolean>(false);
    const [isSpin, setIsSpin] = useState<boolean>(false);
    const [isSpinEnd, setIsSpinEnd] = useState<boolean>(false);
    const [winHistory, setWinHistory] = useState<weaponAttributes[]>([]);

    const rouletteContainerRef = useRef<HTMLDivElement>(null);
    const weaponsRef = useRef<HTMLDivElement>(null);

    let roulette: Roulette | null = null;

    function transitionEndHandler() {
        setIsSpin(false);
        setIsSpinEnd(true);
        
    }

    function prepare() {
        if (weaponsRef.current) {
            weaponsRef.current.style.transition = "none";
            weaponsRef.current.style.left = "0px";
        }
    }

    function load() {
        let winner = weapons[Math.floor(Math.random() * weapons.length)];
        console.log(winner);

        roulette = new Roulette({
            winner,
            weapons,
            rouletteContainerRef,
            weaponsRef,
            weaponsCount: weaponsCount,
            transitionDuration: transitionDuration
        });

        roulette.set_weapons();
        setRouletteWeapons(roulette.weapons)

        return roulette;
    }

    function play() {
        if (isReplay) {
            prepare();
        }
        setIsSpin(true);

        roulette = load();

        setTimeout(() => {
            setIsSpin(true);
            roulette!.spin();
            setIsReplay(true);
        }, 1000);
    }

    useEffect(() => {
        // Cargar la instancia de Roulette cuando se monta el componente
        roulette = load();
    }, []);

    return (
        <div>
            <div className={cl.rouletteWrapper}>
                <div ref={rouletteContainerRef}>
                    <div className={cl.evRoulette}>
                        <div className={cl.evTarget}></div>
                        <div
                            ref={weaponsRef}
                            className={cl.evWeapons}
                            onTransitionEnd={transitionEndHandler}
                        >
                            {rouletteWeapons.map((w, i) => {
                                return  <RouletteItem
                                key={i}
                                id={i}
                                // isLoser={(i !== roulette!.weaponPrizeId) && !isSpin && isSpinEnd}
                                weapon_name={w.name}
                                skin_name={w.name}
                                rarity={w.rarity}
                                steam_image={w.image}
                            />
                            })}

                        </div>
                    </div>
                </div>
                <button className={cl.button} disabled={isSpin} onClick={play}>
                    Roll
                </button>
            </div>
        </div>
    );
};

export default McRoulette;
