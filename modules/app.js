import _ from 'lodash';
import { setGlobalState } from "../state";

const syncSeen = (champions) => {
  var seen = JSON.parse(localStorage.getItem("discovered")) || [];

  champions.forEach(champion => {
    if(seen.includes(champion.passive.image.full.slice(0, -4)))
      champion.passive.seen = true;
    else champion.passive.seen = false;
    
    champion.spells.forEach(spell => {
      if(seen.includes(spell.image.full.slice(0, -4)))
        spell.seen = true;
      else spell.seen = false;
    });
  })
}

const saveProgress = (progress) => {
  localStorage.setItem("discovered", JSON.stringify(progress));
}

const saveLocale = (locale) => {
  localStorage.setItem("locale", JSON.stringify(locale));
}

const getSpells = (champions) => {
  var spells = [];

  champions.forEach(champion => {
    champion.passive.owner = champion;
    spells.push(champion.passive);

    champion.spells.forEach(spell => { 
      spell.owner = champion;
      spells.push(spell);
    });
  });

  return spells;
}

const getUnseenSpell = (champions) => {
  const spells = getSpells(champions);
  const notseen = spells.filter(spell => !spell.seen);
  var spell;

  if(notseen.length) spell = _.shuffle(notseen).pop();
  else spell = _.shuffle(spells).pop();

  setGlobalState("spell", spell);
}

const calculateProgress = (champions) => {
  const spells = getSpells(champions);
  const seen = spells.filter(spell => !spell.seen);
  setGlobalState("progress", _.ceil((100 - (seen.length/spells.length)*100),0))
}

export default {
  syncSeen,
  getSpells,
  calculateProgress,
  getUnseenSpell,
  saveProgress,
  saveLocale
}