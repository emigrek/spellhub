import { useGlobalState } from '../state'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { average } from 'color.js'
import chroma from "chroma-js"
import SpellMini from './SpellMini';
import ChampionLoader from './ChampionLoader';

function Champion({champion}) {
    const [version] = useGlobalState("version");
    const [accent, setAccent] = useState("#171717");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        average(`https://ddragon.leagueoflegends.com/cdn/${version}/img/${champion.image.group}/${champion.image.full}`, { format: 'hex' }).then(color => {
            var color = chroma(color).alpha(0.8);

            setAccent(color)
            setLoading(false)
        });
    }, [])

    return (
        <div className='relative'>
            { loading && <ChampionLoader/> }
            <div style={{ backgroundColor: accent }} className='p-5 shadow-lg rounded-lg flex flex-col select-none space-y-4'>
                <div className='flex items-center justify-between px-5'>
                    <div className='text-lg font-medium'>
                        {champion.name}
                    </div>
                    <div className="relative w-14 h-14 rounded-md shadow-lg">
                        <Image priority layout="fill" className='rounded-md' src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/${champion.image.group}/${champion.image.full}`}/>
                    </div>
                </div>
                <div className='flex flex-row items-center justify-center space-x-3 rounded-xl px-2 py-6 bg-black bg-opacity-50'>
                    <SpellMini key={champion.passive.id} spell={champion.passive}/>
                    {
                        champion.spells.map((spell) => ( <SpellMini key={spell.id} spell={spell}/> ))
                    }
                </div>
            </div>
        </div>
        
    )
}

export default Champion