/**
 * describe.js — generates kid-friendly inspector content for catalog objects that don't have
 * hand-written entries in cosmicData.js (stars, exoplanets, moons, galaxies, structures…)
 * in English (en), Spanish (es), and Simplified Chinese (zh).
 */
import { STAR_BY_ID, STARS } from './starCatalog.js';
import { GALAXY_BY_ID } from './galaxyCatalog.js';
import { PLANETS, DWARF_PLANETS } from './solarSystemData.js';
import { EXOPLANET_SYSTEMS, EXOPLANET_TYPES, EXOPLANET_METHODS } from './exoplanetArchive.js';
import { LY_IN_AU, formatNumber } from '../engine/astro.js';
import { getLabelName, normalizeLang } from '../i18n.js';

const VOYAGER1_KM_S = 16.999;
const JET_KM_H = 900;
const LY_KM = 9.4607e12;

const ARCHIVE_BY_SLUG = new Map();
for (const row of EXOPLANET_SYSTEMS) {
  const [host, ra, dec, dist, sp, teff, radius, mass, lum, rawPlanets] = row;
  ARCHIVE_BY_SLUG.set(`exo:${slug(host)}`, { host, ra, dec, dist, sp, teff, radius, mass, lum, rawPlanets });
}

const EXO_TYPE_LABELS = {
  en: { rocky: 'rocky', ocean: 'ocean', lava: 'lava', ice: 'ice', gas: 'gas' },
  es: { rocky: 'rocoso', ocean: 'oceánico', lava: 'lava', ice: 'helado', gas: 'gaseoso' },
  zh: { rocky: '岩石', ocean: '海洋', lava: '熔岩', ice: '冰雪', gas: '气态' },
  ja: { rocky: '岩石', ocean: '海洋', lava: '溶岩', ice: '氷', gas: 'ガス巨星' },
  ko: { rocky: '암석', ocean: '바다', lava: '용암', ice: '얼음', gas: '가스 거성' },
  pt: { rocky: 'rochoso', ocean: 'oceânico', lava: 'lava', ice: 'gelado', gas: 'gasoso' },
  fr: { rocky: 'rocheux', ocean: 'océanique', lava: 'lave', ice: 'glacé', gas: 'gazeux' },
  it: { rocky: 'roccioso', ocean: 'oceanico', lava: 'lava', ice: 'ghiacciato', gas: 'gassoso' }
};

const EXO_METHOD_LABELS = {
  en: {
    Transit: 'Transit',
    'Radial Velocity': 'Radial Velocity',
    Imaging: 'Imaging',
    Microlensing: 'Microlensing',
    Timing: 'Timing'
  },
  es: {
    Transit: 'Tránsito',
    'Radial Velocity': 'Velocidad Radial',
    Imaging: 'Imagen Directa',
    Microlensing: 'Microlente',
    Timing: 'Temporización'
  },
  zh: {
    Transit: '凌星法',
    'Radial Velocity': '径向速度法',
    Imaging: '直接成像法',
    Microlensing: '微引力透镜法',
    Timing: '脉冲星计时法'
  },
  ja: {
    Transit: 'トランジット法',
    'Radial Velocity': '視線速度法',
    Imaging: '直接撮像法',
    Microlensing: '重力マイクロレンズ法',
    Timing: 'タイミング法'
  },
  ko: {
    Transit: '통과법(트랜짓)',
    'Radial Velocity': '시선속도법',
    Imaging: '직접 촬영법',
    Microlensing: '미시중력렌즈법',
    Timing: '타이밍법'
  },
  pt: {
    Transit: 'Trânsito',
    'Radial Velocity': 'Velocidade Radial',
    Imaging: 'Imagem Direta',
    Microlensing: 'Microlente',
    Timing: 'Temporização'
  },
  fr: {
    Transit: 'Transit',
    'Radial Velocity': 'Vitesse radiale',
    Imaging: 'Imagerie directe',
    Microlensing: 'Microlentille',
    Timing: 'Chronométrage'
  },
  it: {
    Transit: 'Transito',
    'Radial Velocity': 'Velocità radiale',
    Imaging: 'Immagine diretta',
    Microlensing: 'Microlente',
    Timing: 'Temporizzazione'
  }
};

function travelTimesForLy(ly, lang = 'en') {
  const l = normalizeLang(lang);
  const km = ly * LY_KM;
  const voyagerYears = km / VOYAGER1_KM_S / 3600 / 24 / 365.25;
  const jetYears = km / JET_KM_H / 24 / 365.25;
  if (l === 'es') {
    return {
      light: ly < 1 ? `${(ly * 365.25).toFixed(1)} días` : `${formatNumber(ly, ly < 100 ? 1 : 0)} años a la velocidad de la luz`,
      voyager1: `${bigYears(voyagerYears, 'es')} a la velocidad de Voyager 1`,
      jetPlane: `${bigYears(jetYears, 'es')} en avión comercial`
    };
  }
  if (l === 'zh') {
    return {
      light: ly < 1 ? `光速约 ${(ly * 365.25).toFixed(1)} 天` : `以光速飞行需 ${formatNumber(ly, ly < 100 ? 1 : 0)} 年`,
      voyager1: `以旅行者1号速度需 ${bigYears(voyagerYears, 'zh')}`,
      jetPlane: `乘民航客机需 ${bigYears(jetYears, 'zh')}`
    };
  }
  if (l === 'ja') {
    return {
      light: ly < 1 ? `光速で約 ${(ly * 365.25).toFixed(1)} 日` : `光速で ${formatNumber(ly, ly < 100 ? 1 : 0)} 年`,
      voyager1: `ボイジャー1号の速度で ${bigYears(voyagerYears, 'ja')}`,
      jetPlane: `旅客機で ${bigYears(jetYears, 'ja')}`
    };
  }
  if (l === 'ko') {
    return {
      light: ly < 1 ? `빛의 속도로 약 ${(ly * 365.25).toFixed(1)}일` : `빛의 속도로 ${formatNumber(ly, ly < 100 ? 1 : 0)}년`,
      voyager1: `보이저 1호 속도로 ${bigYears(voyagerYears, 'ko')}`,
      jetPlane: `여객기로 ${bigYears(jetYears, 'ko')}`
    };
  }
  if (l === 'pt') {
    return {
      light: ly < 1 ? `${(ly * 365.25).toFixed(1)} dias` : `${formatNumber(ly, ly < 100 ? 1 : 0)} anos à velocidade da luz`,
      voyager1: `${bigYears(voyagerYears, 'pt')} na velocidade da Voyager 1`,
      jetPlane: `${bigYears(jetYears, 'pt')} em avião comercial`
    };
  }
  if (l === 'fr') {
    return {
      light: ly < 1 ? `${(ly * 365.25).toFixed(1)} jours` : `${formatNumber(ly, ly < 100 ? 1 : 0)} ans à la vitesse de la lumière`,
      voyager1: `${bigYears(voyagerYears, 'fr')} à la vitesse de Voyager 1`,
      jetPlane: `${bigYears(jetYears, 'fr')} en avion de ligne`
    };
  }
  if (l === 'it') {
    return {
      light: ly < 1 ? `${(ly * 365.25).toFixed(1)} giorni` : `${formatNumber(ly, ly < 100 ? 1 : 0)} anni alla velocità della luce`,
      voyager1: `${bigYears(voyagerYears, 'it')} alla velocità di Voyager 1`,
      jetPlane: `${bigYears(jetYears, 'it')} in aereo di linea`
    };
  }
  return {
    light: ly < 1 ? `${(ly * 365.25).toFixed(1)} days` : `${formatNumber(ly, ly < 100 ? 1 : 0)} years at the speed of light`,
    voyager1: `${bigYears(voyagerYears, 'en')} at Voyager 1’s speed`,
    jetPlane: `${bigYears(jetYears, 'en')} in a passenger jet`
  };
}

function bigYears(y, lang = 'en') {
  const l = normalizeLang(lang);
  if (l === 'es') {
    if (y < 1e3) return `${formatNumber(y, 0)} años`;
    if (y < 1e6) return `${formatNumber(y / 1e3, 1)} mil años`;
    if (y < 1e9) return `${formatNumber(y / 1e6, 1)} millones de años`;
    return `${formatNumber(y / 1e9, 1)} mil millones de años`;
  }
  if (l === 'zh') {
    if (y < 1e4) return `${formatNumber(y, 0)} 年`;
    if (y < 1e8) return `${formatNumber(y / 1e4, 1)} 万年`;
    return `${formatNumber(y / 1e8, 1)} 亿年`;
  }
  if (l === 'ja') {
    if (y < 1e4) return `${formatNumber(y, 0)} 年`;
    if (y < 1e8) return `${formatNumber(y / 1e4, 1)} 万年`;
    return `${formatNumber(y / 1e8, 1)} 億年`;
  }
  if (l === 'ko') {
    if (y < 1e4) return `${formatNumber(y, 0)}년`;
    if (y < 1e8) return `${formatNumber(y / 1e4, 1)}만 년`;
    return `${formatNumber(y / 1e8, 1)}억 년`;
  }
  if (l === 'pt') {
    if (y < 1e3) return `${formatNumber(y, 0)} anos`;
    if (y < 1e6) return `${formatNumber(y / 1e3, 1)} mil anos`;
    if (y < 1e9) return `${formatNumber(y / 1e6, 1)} milhões de anos`;
    return `${formatNumber(y / 1e9, 1)} bilhões de anos`;
  }
  if (l === 'fr') {
    if (y < 1e3) return `${formatNumber(y, 0)} ans`;
    if (y < 1e6) return `${formatNumber(y / 1e3, 1)} mille ans`;
    if (y < 1e9) return `${formatNumber(y / 1e6, 1)} millions d’années`;
    return `${formatNumber(y / 1e9, 1)} milliards d’années`;
  }
  if (l === 'it') {
    if (y < 1e3) return `${formatNumber(y, 0)} anni`;
    if (y < 1e6) return `${formatNumber(y / 1e3, 1)} mila anni`;
    if (y < 1e9) return `${formatNumber(y / 1e6, 1)} milioni di anni`;
    return `${formatNumber(y / 1e9, 1)} miliardi di anni`;
  }
  if (y < 1e3) return `${formatNumber(y, 0)} years`;
  if (y < 1e6) return `${formatNumber(y / 1e3, 1)} thousand years`;
  if (y < 1e9) return `${formatNumber(y / 1e6, 1)} million years`;
  return `${formatNumber(y / 1e9, 1)} billion years`;
}

function spectralWords(sp, lang = 'en') {
  const l = normalizeLang(lang);
  const letter = (sp || '').replace(/^sd/, '')[0];
  const maps = {
    es: {
      O: 'una ardiente estrella gigante azul',
      B: 'una estrella caliente blanco-azulada',
      A: 'una brillante estrella blanca',
      F: 'una estrella blanco-amarilla un poco más caliente que el Sol',
      G: 'una estrella amarilla muy parecida a nuestro Sol',
      K: 'una estrella naranja más fría que nuestro Sol',
      M: 'una pequeña y fría estrella enana roja',
      L: 'una enana marrón — una estrella fallida',
      T: 'una enana marrón fría',
      D: 'una enana blanca — el núcleo denso de una estrella extinta',
      def: 'una estrella'
    },
    zh: {
      O: '一颗炽热的蓝巨星',
      B: '一颗高温蓝白恒星',
      A: '一颗明亮的白色恒星',
      F: '一颗比太阳略热的黄白恒星',
      G: '一颗与太阳非常相似的黄矮星',
      K: '一颗比太阳温度稍低的橙矮星',
      M: '一颗小巧低温的红矮星',
      L: '一颗褐矮星（未能点燃氢聚变的“失败恒星”）',
      T: '一颗低温褐矮星',
      D: '一颗白矮星（恒星演化末期留下的致密核心）',
      def: '一颗恒星'
    },
    ja: {
      O: '灼熱の青色巨星',
      B: '高温の青白い恒星',
      A: '明るく輝く白い恒星',
      F: '太陽より少し高温の黄白色の恒星',
      G: '太陽によく似た黄色い恒星',
      K: '太陽より少し低温のオレンジ色の恒星',
      M: '小さく低温の赤色矮星',
      L: '褐色矮星',
      T: '低温の褐色矮星',
      D: '白色矮星（恒星の高密度な核の残骸）',
      def: '恒星'
    },
    ko: {
      O: '뜨겁게 타오르는 청색 거성',
      B: '고온의 청백색 항성',
      A: '밝게 빛나는 백색 항성',
      F: '태양보다 조금 더 뜨거운 황백색 항성',
      G: '태양과 매우 비슷한 황색 왜성',
      K: '태양보다 온도가 낮은 주황색 왜성',
      M: '작고 차가운 적색 왜성',
      L: '갈색 왜성',
      T: '차가운 갈색 왜성',
      D: '백색 왜성 (별이 진화 끝에 남긴 고밀도 핵)',
      def: '항성'
    },
    pt: {
      O: 'uma estrela gigante azul escaldante',
      B: 'uma estrela azul-branca quente',
      A: 'uma estrela branca brilhante',
      F: 'uma estrela amarelo-branca um pouco mais quente que o Sol',
      G: 'uma estrela amarela muito parecida com o nosso Sol',
      K: 'uma estrela laranja mais fria que o nosso Sol',
      M: 'uma pequena e fria estrela anã vermelha',
      L: 'uma anã marrom',
      T: 'uma anã marrom fria',
      D: 'uma anã branca — o núcleo denso de uma estrela extinta',
      def: 'uma estrela'
    },
    fr: {
      O: 'une étoile géante bleue brûlante',
      B: 'une étoile bleu-blanc chaude',
      A: 'une brillante étoile blanche',
      F: 'une étoile jaune-blanc un peu plus chaude que le Soleil',
      G: 'une étoile jaune très semblable à notre Soleil',
      K: 'une étoile orange plus froide que notre Soleil',
      M: 'une petite étoile naine rouge froide',
      L: 'une naine brune',
      T: 'une naine brune froide',
      D: 'une naine blanche — le cœur dense d’une étoile éteinte',
      def: 'une étoile'
    },
    it: {
      O: 'un’ardente stella gigante blu',
      B: 'una calda stella bianco-azzurra',
      A: 'una brillante stella bianca',
      F: 'una stella giallo-bianca un po’ più calda del Sole',
      G: 'una stella gialla molto simile al nostro Sole',
      K: 'una stella arancione più fredda del nostro Sole',
      M: 'una piccola e fredda stella nana rossa',
      L: 'una nana bruna',
      T: 'una nana bruna fredda',
      D: 'una nana bianca — il nucleo denso di una stella estinta',
      def: 'una stella'
    }
  };
  if (maps[l]) return maps[l][letter] || maps[l].def;
  return (
    {
      O: 'a blazing blue giant star',
      B: 'a hot blue-white star',
      A: 'a bright white star',
      F: 'a yellow-white star a bit hotter than our Sun',
      G: 'a yellow star much like our Sun',
      K: 'an orange star cooler than our Sun',
      M: 'a small, cool red dwarf star',
      L: 'a brown dwarf — a failed star',
      T: 'a cold brown dwarf',
      D: 'a white dwarf — the dense leftover core of a dead star'
    }[letter] || 'a star'
  );
}

export function describeArchiveSystem(id, lang = 'en') {
  const l = normalizeLang(lang);
  const rec = ARCHIVE_BY_SLUG.get(id);
  if (!rec) return null;
  const typeMap = EXO_TYPE_LABELS[l] || EXO_TYPE_LABELS.en;
  const methodMap = EXO_METHOD_LABELS[l] || EXO_METHOD_LABELS.en;
  const planets = rec.rawPlanets.map((p) => {
    const [suffix, a, period, radius, mass, eqt, typeIdx, hzFlag, discYear, methodIdx] = p;
    const pName = suffix.length <= 2 ? `${rec.host} ${suffix}` : suffix;
    const rawType = EXOPLANET_TYPES[typeIdx] || 'rocky';
    const rawMethod = EXOPLANET_METHODS[methodIdx] || 'Transit';
    return {
      name: pName,
      id: `${id}:${slug(pName)}`,
      a,
      period,
      radius,
      mass,
      eqt,
      type: typeMap[rawType] || rawType,
      hz: hzFlag === 1,
      discYear,
      method: methodMap[rawMethod] || rawMethod
    };
  });
  const hzCount = planets.filter((p) => p.hz).length;
  const distStr = rec.dist < 100 ? rec.dist.toFixed(1) : formatNumber(rec.dist);

  if (l === 'es') {
    const summary = `${rec.host} es ${spectralWords(rec.sp, 'es')} (${rec.teff} K) situada a ${distStr} años luz de la Tierra en el Archivo de Exoplanetas de la NASA, con ${planets.length} exoplaneta${planets.length > 1 ? 's' : ''} confirmado${planets.length > 1 ? 's' : ''}${hzCount ? ` — ¡incluyendo ${hzCount} en la zona habitable!` : '.'}`;
    const stats = [
      { label: 'Distancia a la Tierra', value: `${rec.dist < 100 ? rec.dist.toFixed(2) : formatNumber(rec.dist)} años luz` },
      { label: 'Tipo estelar y temp.', value: `${rec.sp} (${rec.teff} K)` },
      { label: 'Tamaño y masa vs Sol', value: `${formatNumber(rec.radius, 2)} R☉ • ${formatNumber(rec.mass, 2)} M☉` },
      { label: 'Exoplanetas confirmados', value: `${planets.length}${hzCount ? ` (${hzCount} en zona habitable)` : ''}` }
    ];
    const facts = [
      `Catalogado en el Archivo Oficial de Exoplanetas de la NASA con ${planets.length} mundo${planets.length > 1 ? 's' : ''} confirmado${planets.length > 1 ? 's' : ''}.`,
      `La luz que sale de ${rec.host} tarda ${distStr} años en llegar a la Tierra.`
    ];
    if (planets.length) {
      const p0 = planets.find((x) => x.hz) || planets[0];
      facts.push(`${p0.name} fue descubierto en ${p0.discYear} mediante ${p0.method} (${formatNumber(p0.radius, 2)}× radio terrestre, ${formatNumber(p0.mass, 1)}× masa terrestre).`);
    }
    return {
      name: rec.host,
      pronunciation: '',
      category: `Sistema del Archivo NASA (${rec.sp})`,
      badge: hzCount ? '🌱 ¡Sistema con Zona Habitable!' : planets.length >= 3 ? `🪐 Sistema de ${planets.length} Planetas` : '🪐 Anfitrión de Exoplanetas',
      kidSummary: summary,
      quickStats: stats,
      funFacts: facts,
      travelTimes: travelTimesForLy(rec.dist, 'es'),
      exoplanets: planets.map((p) => ({
        id: p.id,
        name: p.name,
        type: `Mundo ${p.type} • ${formatNumber(p.radius, 2)} R⊕ (${formatNumber(p.mass, 1)} M⊕)`,
        orbit: `${p.period < 1000 ? p.period.toFixed(2) + ' días' : (p.period / 365.25).toFixed(1) + ' años'} • ${p.a} UA`,
        temp: `${p.hz ? '🌱 Zona Habitable • ' : ''}~${p.eqt} K (${Math.round(p.eqt - 273.15)} °C) • ${p.method} (${p.discYear})`
      })),
      hasExoplanets: true
    };
  }

  if (l === 'zh') {
    const summary = `${rec.host} 是${spectralWords(rec.sp, 'zh')}（表面温度 ${rec.teff} K），在 NASA 系外行星档案库中距离地球 ${distStr} 光年，拥有 ${planets.length} 颗已确认的系外行星${hzCount ? `——其中 ${hzCount} 颗位于宜居带内！` : '。'}`;
    const stats = [
      { label: '距地球距离', value: `${rec.dist < 100 ? rec.dist.toFixed(2) : formatNumber(rec.dist)} 光年` },
      { label: '恒星光谱与温度', value: `${rec.sp} (${rec.teff} K)` },
      { label: '半径与质量 (相对太阳)', value: `${formatNumber(rec.radius, 2)} R☉ • ${formatNumber(rec.mass, 2)} M☉` },
      { label: '已确认系外行星', value: `${planets.length} 颗${hzCount ? `（${hzCount} 颗位于宜居带）` : ''}` }
    ];
    const facts = [
      `收录于 NASA 官方系外行星档案库，目前已确认拥有 ${planets.length} 颗系外行星。`,
      `从 ${rec.host} 发出的星光需要飞行 ${distStr} 年才能到达地球。`
    ];
    if (planets.length) {
      const p0 = planets.find((x) => x.hz) || planets[0];
      facts.push(`${p0.name} 于 ${p0.discYear} 年通过${p0.method}发现（半径为地球的 ${formatNumber(p0.radius, 2)} 倍，质量约为地球的 ${formatNumber(p0.mass, 1)} 倍）。`);
    }
    return {
      name: rec.host,
      pronunciation: '',
      category: `NASA 系外行星档案系统 (${rec.sp})`,
      badge: hzCount ? '🌱 拥有宜居带行星！' : planets.length >= 3 ? `🪐 ${planets.length} 行星系统` : '🪐 已确认系外行星宿主星',
      kidSummary: summary,
      quickStats: stats,
      funFacts: facts,
      travelTimes: travelTimesForLy(rec.dist, 'zh'),
      exoplanets: planets.map((p) => ({
        id: p.id,
        name: p.name,
        type: `${p.type}世界 • ${formatNumber(p.radius, 2)} R⊕ (${formatNumber(p.mass, 1)} M⊕)`,
        orbit: `${p.period < 1000 ? p.period.toFixed(2) + ' 天' : (p.period / 365.25).toFixed(1) + ' 年'} • ${p.a} AU`,
        temp: `${p.hz ? '🌱 宜居带 • ' : ''}~${p.eqt} K (${Math.round(p.eqt - 273.15)} °C) • ${p.method} (${p.discYear})`
      })),
      hasExoplanets: true
    };
  }

  const archiveI18n = {
    ja: {
      cat: `NASA系外惑星アーカイブ星系 (${rec.sp})`,
      badgeHz: '🌱 ハビタブルゾーン惑星あり！',
      badgeMulti: `🪐 ${planets.length}惑星システム`,
      badgeHost: '🪐 確認済み系外惑星ホスト星',
      summary: `${rec.host} は地球から ${distStr} 光年離れた${spectralWords(rec.sp, 'ja')} (${rec.teff} K) で、NASA系外惑星アーカイブに ${planets.length} 個の確認済み系外惑星が登録されています${hzCount ? `（うち ${hzCount} 個がハビタブルゾーン内！）。` : '。'}`,
      distLabel: '地球からの距離',
      distVal: `${rec.dist < 100 ? rec.dist.toFixed(2) : formatNumber(rec.dist)} 光年`,
      spLabel: 'スペクトル型・温度',
      sizeLabel: '太陽との半径・質量比',
      exoLabel: '確認済み系外惑星',
      exoVal: `${planets.length}個${hzCount ? ` (${hzCount}個がハビタブルゾーン)` : ''}`,
      fact1: `NASA公式系外惑星アーカイブに ${planets.length} 個の確認済み惑星が登録されています。`,
      fact2: `${rec.host} を出発した光は ${distStr} 年かけて地球に届きます。`,
      worldWord: '惑星',
      dayWord: '日',
      yrWord: '年',
      hzWord: '🌱 ハビタブルゾーン • '
    },
    ko: {
      cat: `NASA 외계행성 아카이브 항성계 (${rec.sp})`,
      badgeHz: '🌱 생명체 거주가능영역 행성 보유!',
      badgeMulti: `🪐 ${planets.length}개 행성계`,
      badgeHost: '🪐 확인된 외계행성 모항성',
      summary: `${rec.host}은(는) 지구에서 ${distStr}광년 떨어진 ${spectralWords(rec.sp, 'ko')} (${rec.teff} K)으로, NASA 외계행성 아카이브에 ${planets.length}개의 확인된 외계행성이 등록되어 있습니다${hzCount ? ` (그중 ${hzCount}개가 생명체 거주가능영역에 위치!).` : '.'}`,
      distLabel: '지구와의 거리',
      distVal: `${rec.dist < 100 ? rec.dist.toFixed(2) : formatNumber(rec.dist)} 광년`,
      spLabel: '분광형 및 온도',
      sizeLabel: '태양 대비 반지름·질량',
      exoLabel: '확인된 외계행성',
      exoVal: `${planets.length}개${hzCount ? ` (거주가능영역 ${hzCount}개)` : ''}`,
      fact1: `NASA 공식 외계행성 아카이브에 ${planets.length}개의 행성이 등재되어 있습니다.`,
      fact2: `${rec.host}에서 출발한 빛은 지구까지 ${distStr}년이 걸립니다.`,
      worldWord: '행성',
      dayWord: '일',
      yrWord: '년',
      hzWord: '🌱 거주가능영역 • '
    },
    pt: {
      cat: `Sistema do Arquivo NASA (${rec.sp})`,
      badgeHz: '🌱 Sistema com Zona Habitável!',
      badgeMulti: `🪐 Sistema de ${planets.length} Planetas`,
      badgeHost: '🪐 Estrela com Exoplanetas',
      summary: `${rec.host} é ${spectralWords(rec.sp, 'pt')} (${rec.teff} K) localizada a ${distStr} anos-luz da Terra no Arquivo de Exoplanetas da NASA, abrigando ${planets.length} exoplaneta${planets.length > 1 ? 's' : ''} confirmado${planets.length > 1 ? 's' : ''}${hzCount ? ` — incluindo ${hzCount} na zona habitável!` : '.'}`,
      distLabel: 'Distância da Terra',
      distVal: `${rec.dist < 100 ? rec.dist.toFixed(2) : formatNumber(rec.dist)} anos-luz`,
      spLabel: 'Tipo estelar e temp.',
      sizeLabel: 'Tamanho e massa vs Sol',
      exoLabel: 'Exoplanetas confirmados',
      exoVal: `${planets.length}${hzCount ? ` (${hzCount} na zona habitável)` : ''}`,
      fact1: `Catalogado no Arquivo Oficial de Exoplanetas da NASA com ${planets.length} mundo${planets.length > 1 ? 's' : ''}.`,
      fact2: `A luz que sai de ${rec.host} leva ${distStr} anos para chegar à Terra.`,
      worldWord: 'Mundo',
      dayWord: 'dias',
      yrWord: 'anos',
      hzWord: '🌱 Zona Habitável • '
    },
    fr: {
      cat: `Système de l’Archive NASA (${rec.sp})`,
      badgeHz: '🌱 Système avec Zone Habitable !',
      badgeMulti: `🪐 Système à ${planets.length} Planètes`,
      badgeHost: '🪐 Étoile Hôte d’Exoplanètes',
      summary: `${rec.host} est ${spectralWords(rec.sp, 'fr')} (${rec.teff} K) située à ${distStr} années-lumière de la Terre dans l’Archive des Exoplanètes de la NASA, abritant ${planets.length} exoplanète${planets.length > 1 ? 's' : ''} confirmée${planets.length > 1 ? 's' : ''}${hzCount ? ` — dont ${hzCount} dans la zone habitable !` : '.'}`,
      distLabel: 'Distance de la Terre',
      distVal: `${rec.dist < 100 ? rec.dist.toFixed(2) : formatNumber(rec.dist)} années-lumière`,
      spLabel: 'Type spectral et temp.',
      sizeLabel: 'Taille et masse vs Soleil',
      exoLabel: 'Exoplanètes confirmées',
      exoVal: `${planets.length}${hzCount ? ` (${hzCount} en zone habitable)` : ''}`,
      fact1: `Répertorié dans l’Archive Officielle des Exoplanètes de la NASA (${planets.length} planète${planets.length > 1 ? 's' : ''}).`,
      fact2: `La lumière quittant ${rec.host} met ${distStr} ans pour atteindre la Terre.`,
      worldWord: 'Monde',
      dayWord: 'jours',
      yrWord: 'ans',
      hzWord: '🌱 Zone Habitable • '
    },
    it: {
      cat: `Sistema dell’Archivio NASA (${rec.sp})`,
      badgeHz: '🌱 Sistema con Zona Abitabile!',
      badgeMulti: `🪐 Sistema a ${planets.length} Pianeti`,
      badgeHost: '🪐 Stella Ospite di Esopianeti',
      summary: `${rec.host} è ${spectralWords(rec.sp, 'it')} (${rec.teff} K) situata a ${distStr} anni luce dalla Terra nell’Archivio Esopianeti della NASA, con ${planets.length} esopianet${planets.length > 1 ? 'i confermati' : 'a confermato'}${hzCount ? ` — di cui ${hzCount} nella zona abitabile!` : '.'}`,
      distLabel: 'Distanza dalla Terra',
      distVal: `${rec.dist < 100 ? rec.dist.toFixed(2) : formatNumber(rec.dist)} anni luce`,
      spLabel: 'Tipo stellare e temp.',
      sizeLabel: 'Dimensioni e massa vs Sole',
      exoLabel: 'Esopianeti confermati',
      exoVal: `${planets.length}${hzCount ? ` (${hzCount} in zona abitabile)` : ''}`,
      fact1: `Catalogato nell’Archivio Ufficiale degli Esopianeti della NASA (${planets.length} mond${planets.length > 1 ? 'i' : 'o'}).`,
      fact2: `La luce che parte da ${rec.host} impiega ${distStr} anni per raggiungere la Terra.`,
      worldWord: 'Mondo',
      dayWord: 'giorni',
      yrWord: 'anni',
      hzWord: '🌱 Zona Abitabile • '
    }
  }[l];

  if (archiveI18n) {
    return {
      name: rec.host,
      pronunciation: '',
      category: archiveI18n.cat,
      badge: hzCount ? archiveI18n.badgeHz : planets.length >= 3 ? archiveI18n.badgeMulti : archiveI18n.badgeHost,
      kidSummary: archiveI18n.summary,
      quickStats: [
        { label: archiveI18n.distLabel, value: archiveI18n.distVal },
        { label: archiveI18n.spLabel, value: `${rec.sp} (${rec.teff} K)` },
        { label: archiveI18n.sizeLabel, value: `${formatNumber(rec.radius, 2)} R☉ • ${formatNumber(rec.mass, 2)} M☉` },
        { label: archiveI18n.exoLabel, value: archiveI18n.exoVal }
      ],
      funFacts: [archiveI18n.fact1, archiveI18n.fact2],
      travelTimes: travelTimesForLy(rec.dist, l),
      exoplanets: planets.map((p) => ({
        id: p.id,
        name: p.name,
        type: `${archiveI18n.worldWord} (${p.type}) • ${formatNumber(p.radius, 2)} R⊕ (${formatNumber(p.mass, 1)} M⊕)`,
        orbit: `${p.period < 1000 ? p.period.toFixed(2) + ' ' + archiveI18n.dayWord : (p.period / 365.25).toFixed(1) + ' ' + archiveI18n.yrWord} • ${p.a} AU`,
        temp: `${p.hz ? archiveI18n.hzWord : ''}~${p.eqt} K (${Math.round(p.eqt - 273.15)} °C) • ${p.method} (${p.discYear})`
      })),
      hasExoplanets: true
    };
  }

  const summary = `${rec.host} is ${spectralWords(rec.sp, 'en')} (${rec.teff} K) located ${distStr} light-years from Earth in the NASA Exoplanet Archive, hosting ${planets.length} confirmed exoplanet${planets.length > 1 ? 's' : ''}${hzCount ? ` — including ${hzCount} in the habitable zone!` : '.'}`;
  const stats = [
    { label: 'Distance from Earth', value: `${rec.dist < 100 ? rec.dist.toFixed(2) : formatNumber(rec.dist)} light-years` },
    { label: 'Star type & Temp', value: `${rec.sp} (${rec.teff} K)` },
    { label: 'Size & Mass vs Sun', value: `${formatNumber(rec.radius, 2)} R☉ • ${formatNumber(rec.mass, 2)} M☉` },
    { label: 'Confirmed Exoplanets', value: `${planets.length}${hzCount ? ` (${hzCount} in Habitable Zone)` : ''}` }
  ];
  const facts = [
    `Cataloged in the official NASA Exoplanet Archive with ${planets.length} confirmed world${planets.length > 1 ? 's' : ''}.`,
    `Light leaving ${rec.host} takes ${distStr} years to reach Earth.`
  ];
  if (planets.length) {
    const p0 = planets.find((x) => x.hz) || planets[0];
    facts.push(`${p0.name} was discovered in ${p0.discYear} via ${p0.method} (${formatNumber(p0.radius, 2)}× Earth radius, ${formatNumber(p0.mass, 1)}× Earth mass).`);
  }
  return {
    name: rec.host,
    pronunciation: '',
    category: `NASA Exoplanet Archive System (${rec.sp})`,
    badge: hzCount ? '🌱 Habitable-Zone System!' : planets.length >= 3 ? `🪐 ${planets.length}-Planet System` : '🪐 Confirmed Exoplanet Host',
    kidSummary: summary,
    quickStats: stats,
    funFacts: facts,
    travelTimes: travelTimesForLy(rec.dist, 'en'),
    exoplanets: planets.map((p) => ({
      id: p.id,
      name: p.name,
      type: `${p.type[0].toUpperCase()}${p.type.slice(1)} world • ${formatNumber(p.radius, 2)} R⊕ (${formatNumber(p.mass, 1)} M⊕)`,
      orbit: `${p.period < 1000 ? p.period.toFixed(2) + ' days' : (p.period / 365.25).toFixed(1) + ' years'} • ${p.a} AU`,
      temp: `${p.hz ? '🌱 Habitable Zone • ' : ''}~${p.eqt} K (${Math.round(p.eqt - 273.15)} °C) • ${p.method} (${p.discYear})`
    })),
    hasExoplanets: true
  };
}

const STAR_BLURBS_I18N = {
  es: {
    proximaCentauri: 'La estrella más cercana a nuestro Sol: una pequeña y fría enana roja. Su planeta Próxima b orbita dentro de la zona habitable.',
    alphaCentauri: 'Un par de estrellas parecidas al Sol que giran una alrededor de la otra cada 80 años: la parte más brillante del sistema estelar más cercano.',
    luhman16: 'Dos "estrellas fallidas" demasiado pequeñas para brillar como el Sol, con un tenue resplandor rojo-marrón.',
    sirius: 'La estrella más brillante de nuestro cielo nocturno, con una diminuta compañera enana blanca tan pesada como el Sol pero del tamaño de la Tierra.',
    ross248: 'Dentro de unos 36,000 años, Voyager 2 pasará a 1.7 años luz de esta pequeña estrella roja.',
    '61cygni': 'La primera estrella cuya distancia fue medida en la historia (por Friedrich Bessel en 1838).',
    kapteynsStar: 'Una antigua estrella del halo galáctico, probablemente capturada de una galaxia enana que la Vía Láctea absorbió hace mucho tiempo.',
    vanMaanensStar: 'La enana blanca solitaria más cercana: el núcleo brillante que quedó de una estrella extinta.',
    altair: '¡Gira tan rápido (una vez cada 9 horas) que está achatada con forma de huevo!',
    etaCassiopeiae: 'Una estrella casi gemela de nuestro Sol acompañada por una estrella naranja.',
    vega: 'La brillante estrella blanco-azulada del Triángulo de Verano, rodeada por un disco de polvo donde pueden estar formándose planetas.',
    fomalhaut: 'Famosa por su gigantesco anillo de polvo apodado el "Ojo de Sauron", de 140 UA de ancho.',
    arcturus: 'Una gigante naranja 25 veces más ancha que el Sol: la estrella más brillante del hemisferio norte celeste.',
    trappist1: 'Siete planetas rocosos del tamaño de la Tierra se agrupan alrededor de una estrella apenas mayor que Júpiter; tres están en la zona habitable.',
    pegasi51: 'Una estrella parecida al Sol cuyo "Júpiter caliente" inició la revolución de los exoplanetas en 1995, ganando el Premio Nobel.',
    castor: '¡Seis estrellas en una! Tres pares de estrellas binarias girando juntas.',
    aldebaran: 'El "ojo rojo del toro" en Tauro: una estrella gigante 44 veces más ancha que el Sol.',
    canopus: 'La segunda estrella más brillante del cielo nocturno; las naves espaciales la usan como faro de navegación.',
    polaris: 'Situada casi exactamente sobre el Polo Norte de la Tierra, por lo que todo el cielo parece girar a su alrededor.',
    pleiades: 'Una guardería brillante de jóvenes estrellas azules de solo 100 millones de años, envueltas en polvo resplandeciente.',
    betelgeuse: 'Una supergigante roja tan enorme que tragaría a Marte y Júpiter si estuviera en el lugar del Sol. ¡Algún día explotará como supernova!',
    antares: 'El brillante corazón rojo de Escorpio: una supergigante moribunda 680 veces más ancha que el Sol.',
    rigel: 'Una supergigante azul que brilla 120,000 veces más que el Sol: el pie brillante de Orión.',
    orionNebula: 'Una gigantesca nube de gas resplandeciente donde están naciendo miles de estrellas bebés ahora mismo.',
    deneb: 'Una de las estrellas más luminosas visibles: su luz salió hace 2,600 años, en tiempos de la antigua Roma.',
    crabNebula: 'Los restos de una estrella que explotó en el año 1054; un púlsar gira 30 veces por segundo en su corazón.',
    eagleNebula: 'Hogar de los famosos Pilares de la Creación: enormes columnas de gas de años luz de altura.',
    carinaNebula: 'Una colosal fábrica de estrellas que alberga a Eta Carinae, una de las estrellas más masivas de la galaxia.',
    omegaCentauri: 'Una esfera de 10 millones de estrellas antiguas, posiblemente el núcleo restante de una galaxia enana.',
    m13: 'En 1974 la humanidad envió un mensaje de radio hacia este cúmulo. Llegará en unos 25,000 años.'
  },
  zh: {
    proximaCentauri: '距离太阳最近的恒星——一颗小巧低温的红矮星。它的行星“比邻星b”就运行在宜居带内！',
    alphaCentauri: '一对像太阳一样的恒星，每80年相互绕转一圈——它是距离我们最近的恒星系统中最明亮的部分。',
    luhman16: '两颗“失败的恒星”（褐矮星）——质量太小无法像太阳那样点燃核聚变，只能发出暗淡的红褐色微光。',
    sirius: '夜空中最耀眼的恒星，身边有一颗与太阳一样重、却只有地球大小的致密白矮星伴星。',
    ross248: '大约36,000年后，旅行者2号将从距离这颗小红矮星1.7光年的地方飞掠而过。',
    '61cygni': '人类历史上第一颗成功测量出距离的恒星（由贝塞尔于1838年测定）。',
    kapteynsStar: '一颗古老的银晕恒星，很可能来自远古时期被银河系吞并的一个矮星系。',
    vanMaanensStar: '距离我们最近的孤立白矮星——一颗死去恒星留下的炽热致密核心。',
    altair: '牛郎星自转极快（每9小时转一圈！），离心力把它甩成了一个略扁的鸡蛋形状。',
    etaCassiopeiae: '一颗与太阳极为相似的恒星，伴随有一颗橙色伴星。',
    vega: '夏季大三角中璀璨的蓝白恒星，周围环绕着可能正在孕育新行星的尘埃盘。',
    fomalhaut: '以宽达140天文单位、酷似“索伦之眼”的巨大尘埃环而闻名。',
    arcturus: '一颗直径为太阳25倍的橙巨星——北天夜空中最明亮的恒星。',
    trappist1: '七颗地球大小的岩石行星紧密环绕着一颗仅比木星稍大的红矮星——其中三颗位于宜居带内！',
    pegasi51: '1995年天文学家在这颗类太阳恒星周围发现了第一颗“热木星”，开启了系外行星发现时代并荣获诺贝尔奖。',
    castor: '六星同辉！由三对双星相互绕转组成的奇妙六合星系统。',
    aldebaran: '金牛座中闪耀的“公牛红眼”——一颗直径达太阳44倍的红巨星。',
    canopus: '全天第二亮星——许多深空探测器都用老人星作为太空导航信标。',
    polaris: '几乎正对着地球北极上方，因此整片北天星空看起来都在围绕它旋转。',
    pleiades: '由年轻炽热的蓝色恒星组成的璀璨星团，年龄仅约1亿年，笼罩在梦幻的反射星云尘埃中。',
    betelgeuse: '一颗极其庞大的红超巨星，如果放在太阳的位置，它会吞没火星甚至木星轨道！未来某天它将爆发为壮丽的超新星。',
    antares: '天蝎座炽热的红色心脏——一颗直径为太阳680倍的垂死红超巨星。',
    rigel: '猎户座明亮的左脚——一颗光度高达太阳12万倍的蓝超巨星。',
    orionNebula: '一团正在发光的巨大气体尘埃云，成千上万颗恒星宝宝正在其中诞生！',
    deneb: '肉眼可见光度最高的恒星之一——你看到的星光早在2,600年前（中国春秋时期）就已经出发了。',
    crabNebula: '公元1054年（北宋至和元年“天关客星”）超新星爆发留下的残骸，中心有一颗每秒高速旋转30圈的脉冲星。',
    eagleNebula: '著名的“创生之柱”所在地——数光年高的星际气体柱中正在孕育新恒星。',
    carinaNebula: '一座巨大的恒星诞生工厂，内部包含银河系质量最大的恒星之一“海山二”。',
    omegaCentauri: '由1000万颗古老恒星组成的巨大球状星团——可能是被银河系吞噬的矮星系核心残骸。',
    m13: '1974年人类曾使用阿雷西博射电望远镜向这片球状星团发送了著名的无线电问候信息，它将在约25,000年后抵达。'
  }
};

export function describeStar(id, lang = 'en') {
  const l = normalizeLang(lang);
  if (id.startsWith('exo:')) return describeArchiveSystem(id, l);
  const s = STAR_BY_ID[id];
  if (!s) return null;
  const localName = getLabelName(id, s.name, l);
  const isNeb = s.kind === 'nebula' || s.kind === 'cluster' || s.kind === 'globular';
  const planets = s.planets || [];
  const hzCount = planets.filter((p) => p.hz).length;
  const distStr = s.dist < 100 ? s.dist.toFixed(1) : formatNumber(s.dist);
  const localizedBlurb = (STAR_BLURBS_I18N[l] && STAR_BLURBS_I18N[l][id]) || (l === 'en' ? s.blurb : '');
  const typeMap = EXO_TYPE_LABELS[l] || EXO_TYPE_LABELS.en;

  if (l === 'es') {
    const summary =
      localizedBlurb ||
      (isNeb
        ? `${localName} es ${s.kind === 'nebula' ? 'una nube brillante de gas y polvo' : 'un cúmulo de estrellas'} a unos ${formatNumber(s.dist)} años luz.`
        : `${localName} es ${spectralWords(s.sp, 'es')}, a ${distStr} años luz de la Tierra${
            planets.length ? `, con ${planets.length} planeta${planets.length > 1 ? 's' : ''} conocido${planets.length > 1 ? 's' : ''}${hzCount ? ` — ¡${hzCount} en la zona habitable!` : '.'}` : '.'
          }`);
    const stats = [
      { label: 'Distancia a la Tierra', value: `${s.dist < 100 ? s.dist.toFixed(2) : formatNumber(s.dist)} años luz (${formatNumber((s.dist * LY_IN_AU) / 1e3, 0)} mil UA)` }
    ];
    if (!isNeb) {
      stats.push({ label: 'Tipo estelar', value: s.sp });
      stats.push({ label: 'Brillo vs Sol', value: s.lum >= 1 ? `${formatNumber(s.lum, s.lum < 10 ? 2 : 0)}× más brillante` : `${formatNumber(s.lum * 100, s.lum > 0.01 ? 1 : 3)}% del brillo solar` });
      stats.push({ label: 'Tamaño vs Sol', value: s.radius >= 1 ? `${formatNumber(s.radius, 1)}× más ancha` : `${formatNumber(s.radius * 100, 0)}% del ancho solar` });
    } else {
      stats.push({ label: 'Tamaño', value: `${formatNumber(s.sizeLy)} años luz de diámetro` });
    }
    if (planets.length) stats.push({ label: 'Planetas conocidos', value: `${planets.length}${hzCount ? ` (${hzCount} en zona habitable)` : ''}` });
    const facts = [];
    if (localizedBlurb) facts.push(localizedBlurb);
    if (!isNeb) facts.push(`La luz que sale de ${localName} hoy llegará a la Tierra en ${distStr} años: la vemos tal como era hace ${s.dist < 100 ? s.dist.toFixed(0) : formatNumber(s.dist)} años.`);
    if (planets.length) {
      const p = planets[0];
      facts.push(`${p.name}: un mundo ${typeMap[p.type] || p.type} que orbita su estrella cada ${p.period < 1000 ? p.period.toFixed(1) + ' días' : (p.period / 365.25).toFixed(1) + ' años'}.`);
    }
    return {
      name: localName,
      pronunciation: '',
      category: isNeb ? (s.kind === 'nebula' ? 'Nebulosa (guardería estelar)' : 'Cúmulo estelar') : `Estrella ${s.sp}${planets.length ? ' con exoplanetas' : ''}`,
      badge: hzCount ? '🌱 ¡Planetas en zona habitable!' : planets.length ? '🪐 Tiene exoplanetas' : isNeb ? '✨ Maravilla del cielo profundo' : '⭐ Estrella real',
      kidSummary: summary,
      quickStats: stats,
      funFacts: facts,
      travelTimes: travelTimesForLy(s.dist, 'es'),
      exoplanets: planets.map((p) => ({
        id: `${id}:${slug(p.name)}`,
        name: p.name,
        type: `Mundo ${typeMap[p.type] || p.type} • ${formatNumber(p.radius, 2)}× el ancho de la Tierra`,
        orbit: `${p.period < 1000 ? p.period.toFixed(2) + ' días' : (p.period / 365.25).toFixed(1) + ' años'} • a ${p.a} UA de su estrella`,
        temp: p.hz ? 'En la zona habitable — posible agua líquida' : p.a < 0.1 ? 'Muy cerca de su estrella — extremadamente caliente' : 'Fuera de la zona habitable'
      })),
      hasExoplanets: planets.length > 0
    };
  }

  if (l === 'zh') {
    const summary =
      localizedBlurb ||
      (isNeb
        ? `${localName} 是距离地球约 ${formatNumber(s.dist)} 光年的${s.kind === 'nebula' ? '发光星际气体尘埃云' : '璀璨星团'}。`
        : `${localName} 是${spectralWords(s.sp, 'zh')}，距离地球 ${distStr} 光年${
            planets.length ? `，拥有 ${planets.length} 颗已知行星${hzCount ? `——其中 ${hzCount} 颗位于宜居带！` : '。'}` : '。'
          }`);
    const stats = [
      { label: '距地球距离', value: `${s.dist < 100 ? s.dist.toFixed(2) : formatNumber(s.dist)} 光年（${formatNumber((s.dist * LY_IN_AU) / 1e3, 0)} 千天文单位）` }
    ];
    if (!isNeb) {
      stats.push({ label: '恒星光谱型', value: s.sp });
      stats.push({ label: '相对太阳光度', value: s.lum >= 1 ? `太阳的 ${formatNumber(s.lum, s.lum < 10 ? 2 : 0)} 倍亮` : `太阳亮度的 ${formatNumber(s.lum * 100, s.lum > 0.01 ? 1 : 3)}%` });
      stats.push({ label: '相对太阳直径', value: s.radius >= 1 ? `太阳的 ${formatNumber(s.radius, 1)} 倍宽` : `太阳直径的 ${formatNumber(s.radius * 100, 0)}%` });
    } else {
      stats.push({ label: '空间跨度', value: `横跨 ${formatNumber(s.sizeLy)} 光年` });
    }
    if (planets.length) stats.push({ label: '已知行星数量', value: `${planets.length} 颗${hzCount ? `（${hzCount} 颗位于宜居带）` : ''}` });
    const facts = [];
    if (localizedBlurb) facts.push(localizedBlurb);
    if (!isNeb) facts.push(`今天从 ${localName} 发出的光芒需要 ${distStr} 年才能抵达地球——你此刻看到的是它 ${s.dist < 100 ? s.dist.toFixed(0) : formatNumber(s.dist)} 年前的模样。`);
    if (planets.length) {
      const p = planets[0];
      facts.push(`${p.name}：一颗${typeMap[p.type] || p.type}行星，每 ${p.period < 1000 ? p.period.toFixed(1) + ' 天' : (p.period / 365.25).toFixed(1) + ' 年'}绕母恒星公转一圈。`);
    }
    return {
      name: localName,
      pronunciation: '',
      category: isNeb ? (s.kind === 'nebula' ? '星云（恒星摇篮）' : '星团') : `${s.sp} 恒星${planets.length ? '（拥有系外行星）' : ''}`,
      badge: hzCount ? '🌱 拥有宜居带行星！' : planets.length ? '🪐 拥有系外行星' : isNeb ? '✨ 深空天体奇观' : '⭐ 真实恒星',
      kidSummary: summary,
      quickStats: stats,
      funFacts: facts,
      travelTimes: travelTimesForLy(s.dist, 'zh'),
      exoplanets: planets.map((p) => ({
        id: `${id}:${slug(p.name)}`,
        name: p.name,
        type: `${typeMap[p.type] || p.type}世界 • 地球直径的 ${formatNumber(p.radius, 2)} 倍`,
        orbit: `${p.period < 1000 ? p.period.toFixed(2) + ' 天' : (p.period / 365.25).toFixed(1) + ' 年'} • 距恒星 ${p.a} AU`,
        temp: p.hz ? '位于宜居带内 — 可能存在液态水' : p.a < 0.1 ? '紧贴宿主恒星 — 表面极其炽热' : '位于宜居带外'
      })),
      hasExoplanets: planets.length > 0
    };
  }

  const starExtra = {
    ja: {
      nebCat: s.kind === 'nebula' ? '星雲（星のゆりかご）' : '星団',
      starCat: `${s.sp}型恒星${planets.length ? '（系外惑星あり）' : ''}`,
      badgeHz: '🌱 ハビタブルゾーン惑星あり！',
      badgeExo: '🪐 系外惑星あり',
      badgeNeb: '✨ 深宇宙の絶景',
      badgeStar: '⭐ 実在の恒星',
      summary: isNeb
        ? `${localName} は地球から約 ${formatNumber(s.dist)} 光年離れた${s.kind === 'nebula' ? '輝くガスと塵の星雲' : '美しい星団'}です。`
        : `${localName} は地球から ${distStr} 光年離れた${spectralWords(s.sp, 'ja')}です${planets.length ? `（既知の惑星 ${planets.length} 個）。` : '。'}`,
      distLabel: '地球からの距離',
      distVal: `${s.dist < 100 ? s.dist.toFixed(2) : formatNumber(s.dist)} 光年`,
      spLabel: 'スペクトル型',
      lumLabel: '太陽との明るさ比',
      radLabel: '太陽との直径比',
      factLight: `${localName} を今日出発した光は ${distStr} 年かけて地球に届きます。`
    },
    ko: {
      nebCat: s.kind === 'nebula' ? '성운 (별의 요람)' : '성단',
      starCat: `${s.sp}형 항성${planets.length ? ' (외계행성 보유)' : ''}`,
      badgeHz: '🌱 거주가능영역 행성 보유!',
      badgeExo: '🪐 외계행성 보유',
      badgeNeb: '✨ 심우주 경이',
      badgeStar: '⭐ 실제 항성',
      summary: isNeb
        ? `${localName}은(는) 지구에서 약 ${formatNumber(s.dist)}광년 떨어진 ${s.kind === 'nebula' ? '빛나는 가스와 먼지 성운' : '아름다운 성단'}입니다.`
        : `${localName}은(는) 지구에서 ${distStr}광년 떨어진 ${spectralWords(s.sp, 'ko')}입니다${planets.length ? ` (알려진 행성 ${planets.length}개).` : '.'}`,
      distLabel: '지구와의 거리',
      distVal: `${s.dist < 100 ? s.dist.toFixed(2) : formatNumber(s.dist)} 광년`,
      spLabel: '분광형',
      lumLabel: '태양 대비 밝기',
      radLabel: '태양 대비 크기',
      factLight: `오늘 ${localName}에서 출발한 빛은 ${distStr}년 뒤에 지구에 도착합니다.`
    },
    pt: {
      nebCat: s.kind === 'nebula' ? 'Nebulosa (berçário estelar)' : 'Aglomerado estelar',
      starCat: `Estrela ${s.sp}${planets.length ? ' com exoplanetas' : ''}`,
      badgeHz: '🌱 Planetas na zona habitável!',
      badgeExo: '🪐 Tem exoplanetas',
      badgeNeb: '✨ Maravilha do céu profundo',
      badgeStar: '⭐ Estrela real',
      summary: isNeb
        ? `${localName} é ${s.kind === 'nebula' ? 'uma nuvem brilhante de gás e poeira' : 'um aglomerado de estrelas'} a cerca de ${formatNumber(s.dist)} anos-luz.`
        : `${localName} é ${spectralWords(s.sp, 'pt')}, a ${distStr} anos-luz da Terra${planets.length ? `, com ${planets.length} planeta${planets.length > 1 ? 's' : ''}.` : '.'}`,
      distLabel: 'Distância da Terra',
      distVal: `${s.dist < 100 ? s.dist.toFixed(2) : formatNumber(s.dist)} anos-luz`,
      spLabel: 'Tipo estelar',
      lumLabel: 'Brilho vs Sol',
      radLabel: 'Tamanho vs Sol',
      factLight: `A luz que sai de ${localName} hoje chegará à Terra em ${distStr} anos.`
    },
    fr: {
      nebCat: s.kind === 'nebula' ? 'Nébuleuse (pouponnière d’étoiles)' : 'Amas stellaire',
      starCat: `Étoile ${s.sp}${planets.length ? ' avec exoplanètes' : ''}`,
      badgeHz: '🌱 Planètes en zone habitable !',
      badgeExo: '🪐 Possède des exoplanètes',
      badgeNeb: '✨ Merveille du ciel profond',
      badgeStar: '⭐ Étoile réelle',
      summary: isNeb
        ? `${localName} est ${s.kind === 'nebula' ? 'un nuage lumineux de gaz et de poussière' : 'un amas d’étoiles'} à environ ${formatNumber(s.dist)} années-lumière.`
        : `${localName} est ${spectralWords(s.sp, 'fr')}, à ${distStr} années-lumière de la Terre${planets.length ? `, avec ${planets.length} planète${planets.length > 1 ? 's' : ''}.` : '.'}`,
      distLabel: 'Distance de la Terre',
      distVal: `${s.dist < 100 ? s.dist.toFixed(2) : formatNumber(s.dist)} années-lumière`,
      spLabel: 'Type spectral',
      lumLabel: 'Luminosité vs Soleil',
      radLabel: 'Taille vs Soleil',
      factLight: `La lumière quittant ${localName} aujourd’hui atteindra la Terre dans ${distStr} ans.`
    },
    it: {
      nebCat: s.kind === 'nebula' ? 'Nebulosa (culla stellare)' : 'Ammasso stellare',
      starCat: `Stella ${s.sp}${planets.length ? ' con esopianeti' : ''}`,
      badgeHz: '🌱 Pianeti in zona abitabile!',
      badgeExo: '🪐 Ha esopianeti',
      badgeNeb: '✨ Meraviglia del cielo profondo',
      badgeStar: '⭐ Stella reale',
      summary: isNeb
        ? `${localName} è ${s.kind === 'nebula' ? 'una nube luminosa di gas e polvere' : 'un ammasso di stelle'} a circa ${formatNumber(s.dist)} anni luce.`
        : `${localName} è ${spectralWords(s.sp, 'it')}, a ${distStr} anni luce dalla Terra${planets.length ? `, con ${planets.length} pianet${planets.length > 1 ? 'i' : 'a'}.` : '.'}`,
      distLabel: 'Distanza dalla Terra',
      distVal: `${s.dist < 100 ? s.dist.toFixed(2) : formatNumber(s.dist)} anni luce`,
      spLabel: 'Tipo stellare',
      lumLabel: 'Luminosità vs Sole',
      radLabel: 'Dimensioni vs Sole',
      factLight: `La luce che parte da ${localName} oggi raggiungerà la Terra tra ${distStr} anni.`
    }
  }[l];

  if (starExtra) {
    return {
      name: localName,
      pronunciation: '',
      category: isNeb ? starExtra.nebCat : starExtra.starCat,
      badge: hzCount ? starExtra.badgeHz : planets.length ? starExtra.badgeExo : isNeb ? starExtra.badgeNeb : starExtra.badgeStar,
      kidSummary: starExtra.summary,
      quickStats: [
        { label: starExtra.distLabel, value: starExtra.distVal },
        ...(!isNeb
          ? [
              { label: starExtra.spLabel, value: s.sp },
              { label: starExtra.lumLabel, value: `${formatNumber(s.lum, s.lum < 10 ? 2 : 0)} L☉` },
              { label: starExtra.radLabel, value: `${formatNumber(s.radius, 2)} R☉` }
            ]
          : [])
      ],
      funFacts: [starExtra.factLight],
      travelTimes: travelTimesForLy(s.dist, l),
      exoplanets: planets.map((p) => ({
        id: `${id}:${slug(p.name)}`,
        name: p.name,
        type: `${typeMap[p.type] || p.type} • ${formatNumber(p.radius, 2)} R⊕`,
        orbit: `${p.period < 1000 ? p.period.toFixed(2) + ' d' : (p.period / 365.25).toFixed(1) + ' yr'} • ${p.a} AU`,
        temp: p.hz ? '🌱' : ''
      })),
      hasExoplanets: planets.length > 0
    };
  }

  const summary =
    s.blurb ||
    (isNeb
      ? `${s.name} is ${s.kind === 'nebula' ? 'a glowing cloud of gas and dust' : 'a cluster of stars'} about ${formatNumber(s.dist)} light-years away.`
      : `${s.name} is ${spectralWords(s.sp, 'en')}, ${distStr} light-years from Earth${
          planets.length ? `, with ${planets.length} known planet${planets.length > 1 ? 's' : ''}${hzCount ? ` — ${hzCount} in the habitable zone!` : '.'}` : '.'
        }`);
  const stats = [
    { label: 'Distance from Earth', value: `${s.dist < 100 ? s.dist.toFixed(2) : formatNumber(s.dist)} light-years (${formatNumber((s.dist * LY_IN_AU) / 1e3, 0)} thousand AU)` }
  ];
  if (!isNeb) {
    stats.push({ label: 'Star type', value: s.sp });
    stats.push({ label: 'Brightness vs Sun', value: s.lum >= 1 ? `${formatNumber(s.lum, s.lum < 10 ? 2 : 0)}× brighter` : `${formatNumber(s.lum * 100, s.lum > 0.01 ? 1 : 3)}% as bright` });
    stats.push({ label: 'Size vs Sun', value: s.radius >= 1 ? `${formatNumber(s.radius, 1)}× wider` : `${formatNumber(s.radius * 100, 0)}% as wide` });
  } else {
    stats.push({ label: 'Size', value: `${formatNumber(s.sizeLy)} light-years across` });
  }
  if (planets.length) stats.push({ label: 'Known planets', value: `${planets.length}${hzCount ? ` (${hzCount} in the habitable zone)` : ''}` });
  const facts = [];
  if (s.blurb) facts.push(s.blurb);
  if (!isNeb) facts.push(`Light leaving ${s.name} today will reach Earth in ${distStr} years — you are seeing it as it was ${s.dist < 100 ? s.dist.toFixed(0) : formatNumber(s.dist)} years ago.`);
  if (planets.length) {
    const p = planets.find((x) => x.note) || planets[0];
    facts.push(`${p.name}: ${p.note || `a ${p.type} world circling its star every ${p.period < 1000 ? p.period.toFixed(1) + ' days' : (p.period / 365.25).toFixed(1) + ' years'}.`}`);
  }
  if (s.companion) facts.push(`${s.companion.name} orbits ${s.name.split(' ')[0]} ${s.name.split(' ')[1] || ''} about ${formatNumber(s.companion.separationAU, 1)} AU away.`);
  return {
    name: s.name,
    pronunciation: '',
    category: isNeb ? (s.kind === 'nebula' ? 'Nebula (star nursery)' : 'Star cluster') : `${s.sp} star${planets.length ? ' with exoplanets' : ''}`,
    badge: hzCount ? '🌱 Habitable-zone planets!' : planets.length ? '🪐 Has exoplanets' : isNeb ? '✨ Deep-sky wonder' : '⭐ Real star',
    kidSummary: summary,
    quickStats: stats,
    funFacts: facts,
    travelTimes: travelTimesForLy(s.dist, 'en'),
    exoplanets: planets.map((p) => ({
      id: `${id}:${slug(p.name)}`,
      name: p.name,
      type: `${p.type[0].toUpperCase()}${p.type.slice(1)} world • ${formatNumber(p.radius, 2)}× Earth’s width`,
      orbit: `${p.period < 1000 ? p.period.toFixed(2) + ' days' : (p.period / 365.25).toFixed(1) + ' years'} • ${p.a} AU from its star`,
      temp: p.hz ? 'In the habitable zone — liquid water possible' : p.note || (p.a < 0.1 ? 'Very close to its star — scorching hot' : 'Outside the habitable zone')
    })),
    hasExoplanets: planets.length > 0
  };
}

export function describeExoplanet(id, lang = 'en') {
  const l = normalizeLang(lang);
  const typeMap = EXO_TYPE_LABELS[l] || EXO_TYPE_LABELS.en;
  const methodMap = EXO_METHOD_LABELS[l] || EXO_METHOD_LABELS.en;

  if (id.startsWith('exo:')) {
    const parts = id.split(':');
    if (parts.length === 2) return describeArchiveSystem(id, l);
    const sysId = `${parts[0]}:${parts[1]}`;
    const slugName = parts.slice(2).join(':');
    const rec = ARCHIVE_BY_SLUG.get(sysId);
    if (!rec) return null;
    for (const raw of rec.rawPlanets) {
      const [suffix, a, period, radius, mass, eqt, typeIdx, hzFlag, discYear, methodIdx] = raw;
      const pName = suffix.length <= 2 ? `${rec.host} ${suffix}` : suffix;
      if (slug(pName) === slugName) {
        const rawType = EXOPLANET_TYPES[typeIdx] || 'rocky';
        const rawMethod = EXOPLANET_METHODS[methodIdx] || 'Transit';
        const typeStr = typeMap[rawType] || rawType;
        const methodStr = methodMap[rawMethod] || rawMethod;
        const hz = hzFlag === 1;
        const distStr = rec.dist < 100 ? rec.dist.toFixed(1) : formatNumber(rec.dist);
        if (l === 'es') {
          return {
            name: pName,
            pronunciation: '',
            category: `Exoplaneta de ${rec.host} (${discYear})`,
            badge: hz ? '🌱 Exoplaneta en Zona Habitable' : '🪐 Exoplaneta Confirmado',
            kidSummary: `${pName} es un exoplaneta ${typeStr} confirmado (${formatNumber(radius, 2)}× el ancho de la Tierra, ~${formatNumber(mass, 1)}× la masa terrestre) que orbita ${rec.host} cada ${period < 1000 ? period.toFixed(1) + ' días' : (period / 365.25).toFixed(1) + ' años'}. ¡Descubierto en ${discYear} mediante ${methodStr}!`,
            quickStats: [
              { label: 'Estrella anfitriona', value: `${rec.host} (${rec.sp})` },
              { label: 'Distancia a la Tierra', value: `${distStr} años luz` },
              { label: 'Radio y Masa', value: `${formatNumber(radius, 2)} R⊕ • ${formatNumber(mass, 1)} M⊕` },
              { label: 'Órbita y Temp.', value: `${a} UA (${period < 1000 ? period.toFixed(1) + ' d' : (period / 365.25).toFixed(1) + ' a'}) • ~${eqt} K` }
            ],
            funFacts: [
              hz ? '¡Orbita dentro de la Zona Habitable de agua líquida de su estrella!' : `Descubierto en ${discYear} mediante ${methodStr}.`,
              `Su temperatura de equilibrio se estima en ~${eqt} K (${Math.round(eqt - 273.15)} °C).`
            ],
            travelTimes: travelTimesForLy(rec.dist, 'es'),
            hasExoplanets: false
          };
        }
        if (l === 'zh') {
          return {
            name: pName,
            pronunciation: '',
            category: `${rec.host} 的系外行星 (${discYear})`,
            badge: hz ? '🌱 宜居带系外行星' : '🪐 已确认系外行星',
            kidSummary: `${pName} 是一颗已确认的${typeStr}系外行星（直径为地球的 ${formatNumber(radius, 2)} 倍，质量约为地球的 ${formatNumber(mass, 1)} 倍），每 ${period < 1000 ? period.toFixed(1) + ' 天' : (period / 365.25).toFixed(1) + ' 年'}围绕 ${rec.host} 公转一圈。于 ${discYear} 年通过${methodStr}发现！`,
            quickStats: [
              { label: '宿主恒星', value: `${rec.host} (${rec.sp})` },
              { label: '距地球距离', value: `${distStr} 光年` },
              { label: '半径与质量', value: `${formatNumber(radius, 2)} R⊕ • ${formatNumber(mass, 1)} M⊕` },
              { label: '轨道与平衡温度', value: `${a} AU (${period < 1000 ? period.toFixed(1) + ' 天' : (period / 365.25).toFixed(1) + ' 年'}) • ~${eqt} K` }
            ],
            funFacts: [
              hz ? '运行在宿主恒星可存在液态水的宜居带内！' : `于 ${discYear} 年通过${methodStr}发现。`,
              `估算表面平衡温度约为 ${eqt} K（约 ${Math.round(eqt - 273.15)} °C）。`
            ],
            travelTimes: travelTimesForLy(rec.dist, 'zh'),
            hasExoplanets: false
          };
        }
        return {
          name: pName,
          pronunciation: '',
          category: `Exoplanet of ${rec.host} (${discYear})`,
          badge: hz ? '🌱 Habitable Zone Exoplanet' : '🪐 Confirmed Exoplanet',
          kidSummary: `${pName} is a confirmed ${typeStr} exoplanet (${formatNumber(radius, 2)}× Earth’s width, ~${formatNumber(mass, 1)}× Earth’s mass) orbiting ${rec.host} every ${period < 1000 ? period.toFixed(1) + ' days' : (period / 365.25).toFixed(1) + ' years'}. Discovered in ${discYear} using the ${methodStr} method!`,
          quickStats: [
            { label: 'Host Star', value: `${rec.host} (${rec.sp})` },
            { label: 'Distance from Earth', value: `${distStr} light-years` },
            { label: 'Radius & Mass', value: `${formatNumber(radius, 2)} R⊕ • ${formatNumber(mass, 1)} M⊕` },
            { label: 'Orbit & Temp', value: `${a} AU (${period < 1000 ? period.toFixed(1) + ' d' : (period / 365.25).toFixed(1) + ' yr'}) • ~${eqt} K` }
          ],
          funFacts: [
            hz ? 'Orbits inside its star’s liquid-water Habitable Zone!' : `Discovered in ${discYear} via ${methodStr}.`,
            `Equilibrium temperature is estimated around ${eqt} K (${Math.round(eqt - 273.15)} °C).`
          ],
          travelTimes: travelTimesForLy(rec.dist, l),
          hasExoplanets: false
        };
      }
    }
    return describeArchiveSystem(sysId, l);
  }
  const [starId, slugName] = id.split(':');
  const s = STAR_BY_ID[starId];
  if (!s || !s.planets) return null;
  const p = s.planets.find((x) => slug(x.name) === slugName);
  if (!p) return null;
  const starName = getLabelName(starId, s.name, l);
  const typeStr = typeMap[p.type] || p.type;
  const distStr = s.dist < 100 ? s.dist.toFixed(1) : formatNumber(s.dist);
  if (l === 'es') {
    return {
      name: p.name,
      pronunciation: '',
      category: `Exoplaneta de ${starName}`,
      badge: p.hz ? '🌱 Zona habitable' : '🪐 Exoplaneta',
      kidSummary: `${p.name} es un planeta ${typeStr} unas ${formatNumber(p.radius, 2)} veces más ancho que la Tierra. Orbita ${starName} cada ${p.period < 1000 ? p.period.toFixed(1) + ' días' : (p.period / 365.25).toFixed(1) + ' años'}.`,
      quickStats: [
        { label: 'Estrella anfitriona', value: starName },
        { label: 'Distancia a la Tierra', value: `${distStr} años luz` },
        { label: 'Duración del año', value: p.period < 1000 ? `${p.period.toFixed(2)} días terrestres` : `${(p.period / 365.25).toFixed(1)} años terrestres` },
        { label: 'Distancia a su estrella', value: `${p.a} UA` }
      ],
      funFacts: [
        p.hz ? 'Se encuentra en la "zona Ricitos de Oro" — ni muy caliente ni muy fría — donde podría existir agua líquida.' : 'Los astrónomos lo encontraron observando el leve bamboleo o parpadeo de su estrella.',
        'La superficie mostrada aquí es una recreación artística: ¡ningún telescopio puede fotografiar aún superficies de exoplanetas!'
      ],
      travelTimes: travelTimesForLy(s.dist, 'es'),
      hasExoplanets: false
    };
  }
  if (l === 'zh') {
    return {
      name: p.name,
      pronunciation: '',
      category: `${starName} 的系外行星`,
      badge: p.hz ? '🌱 宜居带行星' : '🪐 系外行星',
      kidSummary: `${p.name} 是一颗${typeStr}行星，直径约为地球的 ${formatNumber(p.radius, 2)} 倍，每 ${p.period < 1000 ? p.period.toFixed(1) + ' 天' : (p.period / 365.25).toFixed(1) + ' 年'}围绕 ${starName} 公转一圈。`,
      quickStats: [
        { label: '宿主恒星', value: starName },
        { label: '距地球距离', value: `${distStr} 光年` },
        { label: '公转周期', value: p.period < 1000 ? `${p.period.toFixed(2)} 个地球日` : `${(p.period / 365.25).toFixed(1)} 个地球年` },
        { label: '距恒星距离', value: `${p.a} AU` }
      ],
      funFacts: [
        p.hz ? '它位于冷热适中的“宜居黄金地带”，表面可能存在液态水海洋。' : '天文学家通过观测宿主恒星微小的摆动或凌星变暗发现了它。',
        '这里展示的表面纹理是科学艺术还原图——目前的望远镜还无法直接拍清系外行星的表面细节！'
      ],
      travelTimes: travelTimesForLy(s.dist, 'zh'),
      hasExoplanets: false
    };
  }
  return {
    name: p.name,
    pronunciation: '',
    category: `Exoplanet of ${starName}`,
    badge: p.hz ? '🌱 Habitable zone' : '🪐 Exoplanet',
    kidSummary: `${p.name} is a ${typeStr} planet about ${formatNumber(p.radius, 2)} times as wide as Earth. It orbits ${starName} every ${p.period < 1000 ? p.period.toFixed(1) + ' days' : (p.period / 365.25).toFixed(1) + ' years'}. ${p.note || ''}`,
    quickStats: [
      { label: 'Host star', value: starName },
      { label: 'Distance from Earth', value: `${distStr} light-years` },
      { label: 'Year length', value: p.period < 1000 ? `${p.period.toFixed(2)} Earth days` : `${(p.period / 365.25).toFixed(1)} Earth years` },
      { label: 'Distance from star', value: `${p.a} AU` }
    ],
    funFacts: [
      p.hz ? 'It sits in the “Goldilocks zone” — not too hot, not too cold — where liquid water could exist.' : 'Astronomers found it by watching its star wobble or dim ever so slightly.',
      'The surface shown here is an artist’s impression — no telescope can photograph exoplanet surfaces yet!'
    ],
    travelTimes: travelTimesForLy(s.dist, l),
    hasExoplanets: false
  };
}

export function describeGalaxy(id, lang = 'en') {
  const l = normalizeLang(lang);
  const g = GALAXY_BY_ID[id];
  if (!g) return null;
  const ly = g.distMly * 1e6;
  const localName = getLabelName(id, g.name, l);

  if (l === 'es') {
    const typeWords = {
      spiral: 'galaxia espiral',
      elliptical: 'galaxia elíptica',
      irregular: 'galaxia irregular',
      dwarf: 'galaxia enana',
      cluster: 'cúmulo de galaxias',
      supercluster: 'supercúmulo de galaxias',
      void: 'vacío cósmico',
      wall: 'gran muralla de galaxias (filamento)'
    };
    const tWord = typeWords[g.type] || 'galaxia';
    const distVal = g.distMly < 1 ? `${formatNumber(ly / 1e3)} mil años luz` : g.distMly < 1000 ? `${formatNumber(g.distMly, 2)} millones de años luz` : `${formatNumber(g.distMly / 1e3, 1)} mil millones de años luz`;
    return {
      name: localName,
      pronunciation: '',
      category: tWord,
      badge: g.type === 'cluster' || g.type === 'supercluster' ? '🕸️ Estructura cósmica' : '🌌 Galaxia',
      kidSummary: `${localName} es una ${tWord} situada a unos ${distVal} de nosotros.`,
      quickStats: [
        { label: 'Distancia', value: distVal },
        { label: 'Tamaño', value: g.diameterKly >= 1000 ? `${formatNumber(g.diameterKly / 1e3, 0)} millones de años luz de ancho` : `${formatNumber(g.diameterKly)} mil años luz de ancho` },
        { label: 'Tipo', value: tWord }
      ],
      funFacts: [
        `La luz de ${localName} salió hace ${distVal.replace(' años luz', ' años')}.`,
        'Cada punto de luz a esta escala es una galaxia entera con miles de millones de estrellas.'
      ],
      travelTimes: travelTimesForLy(ly, 'es'),
      hasExoplanets: false
    };
  }

  if (l === 'zh') {
    const typeWords = {
      spiral: '漩涡星系',
      elliptical: '椭圆星系',
      irregular: '不规则星系',
      dwarf: '矮星系',
      cluster: '星系团',
      supercluster: '超星系团',
      void: '宇宙空洞',
      wall: '星系长城（宇宙网纤维）'
    };
    const tWord = typeWords[g.type] || '星系';
    const distVal = g.distMly < 1 ? `${formatNumber(ly / 1e4, 1)} 万光年` : g.distMly < 100 ? `${formatNumber(g.distMly * 100, 0)} 万光年` : `${formatNumber(g.distMly / 100, 2)} 亿光年`;
    return {
      name: localName,
      pronunciation: '',
      category: tWord,
      badge: g.type === 'cluster' || g.type === 'supercluster' ? '🕸️ 宇宙大尺度结构' : '🌌 星系',
      kidSummary: `${localName} 是一个距离我们约 ${distVal} 的${tWord}。`,
      quickStats: [
        { label: '距离', value: distVal },
        { label: '直径跨度', value: g.diameterKly >= 1000 ? `横跨 ${formatNumber(g.diameterKly / 1e3, 0)} 百万光年` : `横跨 ${formatNumber(g.diameterKly)} 千光年` },
        { label: '天体类型', value: tWord }
      ],
      funFacts: [
        `来自 ${localName} 的星光在宇宙中跋涉了 ${distVal.replace('光年', '年')} 才到达地球。`,
        '在这个尺度上，你看到的每一个光点其实都是包含数十亿颗恒星的完整星系！'
      ],
      travelTimes: travelTimesForLy(ly, 'zh'),
      hasExoplanets: false
    };
  }

  const typeWords = { spiral: 'spiral galaxy', elliptical: 'elliptical galaxy', irregular: 'irregular galaxy', dwarf: 'dwarf galaxy', cluster: 'galaxy cluster', supercluster: 'supercluster of galaxies', void: 'cosmic void', wall: 'galaxy wall (filament)' };
  return {
    name: localName,
    pronunciation: '',
    category: typeWords[g.type] || 'galaxy',
    badge: g.type === 'cluster' || g.type === 'supercluster' ? '🕸️ Cosmic structure' : '🌌 Galaxy',
    kidSummary: g.blurb || `${localName} is a ${typeWords[g.type]} about ${g.distMly < 1 ? formatNumber(ly / 1e3) + ' thousand' : formatNumber(g.distMly, 1) + ' million'} light-years away.`,
    quickStats: [
      { label: 'Distance', value: g.distMly < 1 ? `${formatNumber(ly / 1e3)} thousand light-years` : g.distMly < 1000 ? `${formatNumber(g.distMly, 2)} million light-years` : `${formatNumber(g.distMly / 1e3, 1)} billion light-years` },
      { label: 'Size', value: g.diameterKly >= 1000 ? `${formatNumber(g.diameterKly / 1e3, 0)} million light-years across` : `${formatNumber(g.diameterKly)} thousand light-years across` },
      { label: 'Type', value: typeWords[g.type] || g.type }
    ],
    funFacts: [
      g.blurb || `Light from ${localName} left it ${g.distMly < 1 ? formatNumber(ly / 1e3) + ' thousand' : formatNumber(g.distMly, 1) + ' million'} years ago.`,
      'Every dot of light you see at this scale is a whole galaxy with billions of stars.'
    ],
    travelTimes: travelTimesForLy(ly, l),
    hasExoplanets: false
  };
}

export function describeSolarBody(id, lang = 'en') {
  const l = normalizeLang(lang);
  const all = [...PLANETS.flatMap((p) => [p, ...(p.moons || []).map((m) => ({ ...m, parentId: p.id, parentName: p.name }))]), ...DWARF_PLANETS];
  const b = all.find((x) => x.id === id);
  if (!b) return null;
  const localName = getLabelName(id, b.name, l);
  const localParent = b.parentId ? getLabelName(b.parentId, b.parentName, l) : '';
  const diamKm = formatNumber(b.radius * 12742, 0);
  const pctEarth = formatNumber(b.radius * 100, 0);

  const factsByLang = {
    en: {
      io: 'Io is the most volcanic place in the Solar System — hundreds of volcanoes spew sulfur 400 km high!',
      europa: 'Beneath Europa’s cracked ice lies a salty ocean with twice as much water as all of Earth’s oceans.',
      ganymede: 'Ganymede is the largest moon in the Solar System — bigger than the planet Mercury!',
      callisto: 'Callisto’s face is the most heavily cratered surface we know of.',
      titan: 'Titan has rivers, lakes and rain — but of liquid methane, at −180 °C.',
      enceladus: 'Enceladus shoots geysers of water ice into space from a hidden ocean — NASA’s Cassini flew right through them.',
      pluto: 'Pluto has a giant heart-shaped glacier of nitrogen ice named Tombaugh Regio.',
      ceres: 'Ceres is the largest object in the asteroid belt and has bright salty spots in its craters.',
      eris: 'Eris is slightly smaller than Pluto but more massive — its discovery in 2005 led to the “dwarf planet” category.'
    },
    es: {
      io: '¡Ío es el lugar con más volcanes del Sistema Solar: cientos de volcanes lanzan azufre a 400 km de altura!',
      europa: 'Bajo el hielo agrietado de Europa se esconde un océano salado con el doble de agua que todos los océanos de la Tierra.',
      ganymede: '¡Ganimedes es la luna más grande del Sistema Solar, incluso más grande que el planeta Mercurio!',
      callisto: 'La superficie de Calisto es una de las más llenas de cráteres de todo el Sistema Solar.',
      titan: 'Titán tiene ríos, lagos y lluvia, ¡pero de metano líquido a −180 °C!',
      enceladus: 'Encélado lanza géiseres de hielo de agua al espacio desde un océano oculto; la sonda Cassini de la NASA voló a través de ellos.',
      pluto: 'Plutón tiene un glaciar gigante de hielo de nitrógeno con forma de corazón llamado Tombaugh Regio.',
      ceres: 'Ceres es el objeto más grande del cinturón de asteroides y tiene manchas brillantes de sal en sus cráteres.',
      eris: 'Eris es un poco más pequeño que Plutón pero más masivo: su hallazgo en 2005 llevó a crear la categoría de "planeta enano".'
    },
    zh: {
      io: '木卫一（伊奥）是太阳系火山活动最剧烈的星球——数百座活火山将硫磺喷发到 400 公里高空！',
      europa: '木卫二（欧罗巴）布满裂纹的冰壳下隐藏着一片咸水海洋，液态水储量是地球所有海洋总和的两倍。',
      ganymede: '木卫三（盖尼米德）是太阳系最大的天然卫星——体积比水星还要大！',
      callisto: '木卫四（卡里斯托）拥有太阳系已知最古老、陨石坑最密集的表面。',
      titan: '土卫六（泰坦）拥有河流、湖泊和降雨——但那是在 −180 °C 严寒下流淌的液态甲烷！',
      enceladus: '土卫二（恩克拉多斯）从地下海洋向太空喷射出高耸的水冰间歇泉——NASA 卡西尼号飞船曾直接穿过这些羽流采样。',
      pluto: '冥王星表面有一片巨大的心形氮冰冰川，名为“汤博区”（冥王星之心）。',
      ceres: '谷神星是主小行星带中最大的天体，也是唯一位于内太阳系的矮行星，陨石坑内有明亮的盐斑。',
      eris: '阋神星体积略小于冥王星但质量更大——2005年它的发现促使天文学家正式定义了“矮行星”分类。'
    }
  };

  if (l === 'es') {
    return {
      name: localName,
      pronunciation: '',
      category: b.parentName ? `Luna de ${localParent}` : 'Planeta enano',
      badge: b.parentName ? '🌙 Luna' : '🪨 Planeta enano',
      kidSummary: b.parentName
        ? `${localName} es una luna de ${localParent}, de unos ${diamKm} km de diámetro, que orbita su planeta cada ${b.periodDays.toFixed(1)} días.`
        : `${localName} es un planeta enano de unos ${diamKm} km de diámetro.`,
      quickStats: [
        { label: 'Diámetro', value: `${diamKm} km (${pctEarth}% de la Tierra)` },
        ...(b.periodDays ? [{ label: 'Período orbital', value: `${b.periodDays.toFixed(2)} días` }] : [])
      ],
      funFacts: [factsByLang.es[id] || 'Un fascinante mundo pequeño de nuestro Sistema Solar.'],
      travelTimes: {},
      hasExoplanets: false
    };
  }

  if (l === 'zh') {
    return {
      name: localName,
      pronunciation: '',
      category: b.parentName ? `${localParent}的天然卫星` : '矮行星',
      badge: b.parentName ? '🌙 天然卫星' : '🪨 矮行星',
      kidSummary: b.parentName
        ? `${localName} 是围绕${localParent}运转的卫星，直径约 ${diamKm} 公里，每 ${b.periodDays.toFixed(1)} 天公转一圈。`
        : `${localName} 是一颗直径约 ${diamKm} 公里的矮行星。`,
      quickStats: [
        { label: '直径', value: `${diamKm} 公里（地球的 ${pctEarth}%）` },
        ...(b.periodDays ? [{ label: '公转周期', value: `${b.periodDays.toFixed(2)} 天` }] : [])
      ],
      funFacts: [factsByLang.zh[id] || '太阳系中一颗奇妙的小型星球。'],
      travelTimes: {},
      hasExoplanets: false
    };
  }

  return {
    name: localName,
    pronunciation: '',
    category: b.parentName ? `Moon of ${localParent || b.parentName}` : 'Dwarf planet',
    badge: b.parentName ? '🌙 Moon' : '🪨 Dwarf planet',
    kidSummary: b.parentName
      ? `${localName} is a moon of ${localParent || b.parentName}, about ${diamKm} km across, circling its planet every ${b.periodDays.toFixed(1)} days.`
      : `${localName} is a dwarf planet about ${diamKm} km across.`,
    quickStats: [
      { label: 'Diameter', value: `${diamKm} km (${pctEarth}% of Earth)` },
      ...(b.periodDays ? [{ label: 'Orbit period', value: `${b.periodDays.toFixed(2)} days` }] : [])
    ],
    funFacts: [factsByLang.en[id] || 'A fascinating small world.'],
    travelTimes: {},
    hasExoplanets: false
  };
}

export function describeAny(id, lang = 'en') {
  const l = normalizeLang(lang);
  if (id.includes(':')) return describeExoplanet(id, l);
  return describeStar(id, l) || describeGalaxy(id, l) || describeSolarBody(id, l) || describeMisc(id, l);
}

function describeMisc(id, lang = 'en') {
  const l = normalizeLang(lang);
  if (l === 'es') {
    const miscEs = {
      halley: {
        name: 'Cometa Halley',
        category: 'Cometa periódico',
        badge: '☄️ Regresa en 2061',
        kidSummary: 'Una bola de nieve sucia de 15 km que pasa cerca del Sol cada 75–76 años, desplegando una cola brillante de millones de kilómetros. Pasó en 1986 y volverá en 2061.',
        quickStats: [{ label: 'Período orbital', value: '75.3 años' }, { label: 'Más lejos del Sol', value: '35 UA (más allá de Neptuno)' }, { label: 'Más cerca del Sol', value: '0.59 UA' }],
        funFacts: ['El Cometa Halley orbita el Sol en sentido contrario a los planetas.', '¡Cada octubre la lluvia de meteoros Oriónidas está hecha de polvo dejado por Halley!']
      },
      asteroidBelt: {
        name: 'Cinturón de Asteroides',
        category: 'Cinturón de rocas primordiales',
        badge: '🪨 Millones de rocas',
        kidSummary: 'Entre Marte y Júpiter orbitan millones de restos rocosos del nacimiento del Sistema Solar. A pesar de las películas, están tan separados que rara vez verías uno de cerca.',
        quickStats: [{ label: 'Ubicación', value: '2.1 – 3.3 UA del Sol' }, { label: 'Miembro más grande', value: 'Ceres (940 km)' }],
        funFacts: ['Todos los asteroides juntos pesan menos del 4% de nuestra Luna.']
      },
      kuiperBelt: {
        name: 'Cinturón de Kuiper',
        category: 'Anillo helado más allá de Neptuno',
        badge: '🧊 Hogar de Plutón',
        kidSummary: 'Una inmensa rosquilla de cuerpos helados más allá de Neptuno, de 30 a 50 UA del Sol. Aquí viven Plutón, Eris y muchos cometas.',
        quickStats: [{ label: 'Ubicación', value: '30 – 50 UA del Sol' }, { label: 'Visitado por', value: 'New Horizons de la NASA (Plutón 2015, Arrokoth 2019)' }],
        funFacts: ['El Cinturón de Kuiper es 20 veces más ancho y hasta 200 veces más masivo que el cinturón de asteroides.']
      },
      galacticBar: {
        name: 'Barra Galáctica',
        category: 'Barra de estrellas antiguas en el corazón galáctico',
        badge: '🌟 Miles de millones de estrellas',
        kidSummary: 'La Vía Láctea es una espiral barrada: una barra recta de estrellas amarillas antiguas de 27,000 años luz cruza su centro.',
        quickStats: [{ label: 'Longitud', value: '~27,000 años luz' }],
        funFacts: ['Desde la Tierra la barra está inclinada unos 27° respecto a nuestra línea de visión.']
      },
      localGroup: {
        name: 'El Grupo Local',
        category: 'Nuestro vecindario de galaxias',
        badge: '🌌 ~80 galaxias',
        kidSummary: 'El Grupo Local es la familia de unas 80 galaxias en 10 millones de años luz que incluye la Vía Láctea, Andrómeda, el Triángulo y docenas de galaxias enanas.',
        quickStats: [{ label: 'Tamaño', value: '~10 millones de años luz' }, { label: 'Miembros mayores', value: 'Andrómeda, Vía Láctea, Triángulo' }],
        funFacts: ['Todo el Grupo Local se mueve hacia el Cúmulo de Virgo.']
      },
      cmb: {
        name: 'Fondo Cósmico de Microondas',
        category: 'La luz más antigua del universo',
        badge: '🔥 13,800 millones de años',
        kidSummary: 'El fondo cósmico de microondas es el tenue resplandor del Big Bang, liberado cuando el universo tenía solo 380,000 años. Marca el borde del universo observable.',
        quickStats: [{ label: 'Edad de la luz', value: '13,800 millones de años' }, { label: 'Distancia actual', value: '46 mil millones de años luz' }, { label: 'Temperatura hoy', value: '2.725 K (−270 °C)' }],
        funFacts: ['Aproximadamente el 1% de la estática de un televisor analógico antiguo provenía de esta luz ancestral.']
      },
      orionArmLabel: {
        name: 'Brazo de Orión',
        category: 'Nuestro brazo local de la Vía Láctea',
        badge: '📍 Brazo hogar',
        kidSummary: 'El Sol vive en el Brazo de Orión, entre los brazos de Sagitario y Perseo. Todas las estrellas visibles a simple vista están en este vecindario.',
        quickStats: [{ label: 'Longitud', value: '~10,000 años luz' }],
        funFacts: ['La Nebulosa de Orión, Betelgeuse y Rigel viven en este brazo.']
      }
    };
    const armEs = id.startsWith('arm-')
      ? {
          name: getLabelName(id, id.replace('arm-', '').replace(/-/g, ' '), 'es'),
          category: 'Brazo espiral de la Vía Láctea',
          badge: '🌀 Brazo espiral',
          kidSummary: 'Un brazo espiral es un largo carril donde el gas se comprime y nacen brillantes estrellas nuevas.',
          quickStats: [{ label: 'Ángulo de paso', value: 'unos 12°' }],
          funFacts: ['Las estrellas entran y salen de los brazos mientras orbitan la galaxia; los brazos son ondas de densidad.']
        }
      : null;
    const m = miscEs[id] || armEs;
    if (!m) return null;
    return { pronunciation: '', travelTimes: {}, hasExoplanets: false, ...m };
  }

  if (l === 'zh') {
    const miscZh = {
      halley: {
        name: '哈雷彗星',
        category: '周期彗星',
        badge: '☄️ 将于 2061 年回归',
        kidSummary: '一颗长约 15 公里的“脏雪球”，每 75–76 年掠过太阳一次，拖出长达数百万公里的璀璨彗尾。它上次回归是 1986 年，将于 2061 年再次回到地球夜空！',
        quickStats: [{ label: '公转周期', value: '75.3 年' }, { label: '远日点', value: '35 AU（海王星轨道外）' }, { label: '近日点', value: '0.59 AU' }],
        funFacts: ['哈雷彗星绕太阳公转的方向与八大行星相反（逆行轨道）。', '每年十月的猎户座流星雨，其实就是哈雷彗星散落在轨道上的尘埃颗粒！']
      },
      asteroidBelt: {
        name: '主小行星带',
        category: '太阳系早期留下的岩石碎屑带',
        badge: '🪨 数百万颗小行星',
        kidSummary: '在火星和木星轨道之间运行着数百万颗太阳系诞生时留下的岩石碎块。与科幻电影不同，小行星之间相隔极其遥远，飞船穿行其中几乎不会撞上任何岩石。',
        quickStats: [{ label: '分布区域', value: '距太阳 2.1 – 3.3 AU' }, { label: '最大天体', value: '谷神星（直径 940 公里）' }],
        funFacts: ['整个小行星带所有小行星的质量加起来，还不到月球质量的 4%！']
      },
      kuiperBelt: {
        name: '柯伊伯带',
        category: '海王星外的冰雪圆环带',
        badge: '🧊 冥王星的家园',
        kidSummary: '海王星轨道外侧（距太阳 30 至 50 天文单位）由冰封天体组成的巨大环带。冥王星、阋神星以及众多短周期彗星都住在这里。',
        quickStats: [{ label: '分布区域', value: '距太阳 30 – 50 AU' }, { label: '探测器造访', value: 'NASA 新视野号（2015 冥王星，2019 天空号）' }],
        funFacts: ['柯伊伯带的宽度是主小行星带的 20 倍，总质量更是高达小行星带的 20 至 200 倍！']
      },
      galacticBar: {
        name: '银河棒状核心',
        category: '银河系中心由古老恒星组成的棒状结构',
        badge: '🌟 数百亿颗古老恒星',
        kidSummary: '银河系是一个棒旋星系：一条长约 27,000 光年、由古老黄色恒星构成的棒状结构横跨银心，各大旋臂从棒的两端延伸而出。',
        quickStats: [{ label: '长度', value: '~27,000 光年' }],
        funFacts: ['从地球方向望去，银河棒状核心与我们的视线呈约 27° 夹角。']
      },
      localGroup: {
        name: '本星系群',
        category: '我们所在的星系大家庭',
        badge: '🌌 约 80 个星系',
        kidSummary: '本星系群是直径 1,000 万光年范围内的约 80 个星系组成的星系群，包含银河系、仙女座星系、三角座星系以及数十个矮星系。',
        quickStats: [{ label: '空间跨度', value: '~1,000 万光年' }, { label: '最大成员', value: '仙女座星系、银河系、三角座星系' }],
        funFacts: ['整个本星系群正受引力牵引，朝着室女座星系团方向运动。']
      },
      cmb: {
        name: '宇宙微波背景辐射 (CMB)',
        category: '宇宙中最古老的创世之光',
        badge: '🔥 138 亿年前的余晖',
        kidSummary: '宇宙微波背景辐射是宇宙大爆炸留下的微弱余晖，在宇宙诞生仅 38 万年时释放出来，标志着人类可观测宇宙的最远边界。',
        quickStats: [{ label: '光子年龄', value: '138 亿年' }, { label: '当前共动距离', value: '460 亿光年' }, { label: '今日背景温度', value: '2.725 K (−270.4 °C)' }],
        funFacts: ['老式模拟电视机雪花屏噪点中，大约有 1% 就来自这束诞生于宇宙大爆炸的古老光子！']
      },
      orionArmLabel: {
        name: '猎户座旋臂',
        category: '太阳系所在的银河系本地旋臂',
        badge: '📍 家园旋臂',
        kidSummary: '太阳位于猎户座旋臂支流中，介于宏伟的人马臂与英仙臂之间。夜晚肉眼可见的群星几乎都位于这片本地旋臂内。',
        quickStats: [{ label: '长度', value: '~10,000 光年' }],
        funFacts: ['猎户座大星云、参宿四和参宿七都坐落在这条旋臂上。']
      }
    };
    const armZh = id.startsWith('arm-')
      ? {
          name: getLabelName(id, id.replace('arm-', '').replace(/-/g, ' '), 'zh'),
          category: '银河系主旋臂',
          badge: '🌀 银河旋臂',
          kidSummary: '旋臂是星系盘中气体被压缩、成批孕育明亮年轻蓝星的弯曲星道——就像恒星围绕银心旋转时的“引力交通拥堵带”。',
          quickStats: [{ label: '旋臂倾角', value: '约 12°' }],
          funFacts: ['恒星在绕银心公转时会不断穿过旋臂；旋臂本身其实是持久传播的密度波。']
        }
      : null;
    const m = miscZh[id] || armZh;
    if (!m) return null;
    return { pronunciation: '', travelTimes: {}, hasExoplanets: false, ...m };
  }

  const misc = {
    halley: {
      name: "Halley's Comet",
      category: 'Periodic comet',
      badge: '☄️ Returns in 2061',
      kidSummary: 'A dirty snowball 15 km long that swings past the Sun every 75–76 years, growing a glowing tail millions of km long. It was last here in 1986 and will return in 2061.',
      quickStats: [{ label: 'Orbit period', value: '75.3 years' }, { label: 'Farthest from Sun', value: '35 AU (beyond Neptune)' }, { label: 'Closest to Sun', value: '0.59 AU' }],
      funFacts: ['Halley’s Comet orbits the Sun backwards (clockwise) compared to the planets.', 'Every October the Orionid meteor shower is made of dust left behind by Halley!']
    },
    asteroidBelt: {
      name: 'Asteroid Belt',
      category: 'Belt of rocky leftovers',
      badge: '🪨 Millions of rocks',
      kidSummary: 'Between Mars and Jupiter orbit millions of rocky leftovers from the birth of the Solar System. Despite the movies, they are so far apart you would rarely see one.',
      quickStats: [{ label: 'Location', value: '2.1 – 3.3 AU from the Sun' }, { label: 'Largest member', value: 'Ceres (940 km)' }],
      funFacts: ['All the asteroids together weigh less than 4% of our Moon.']
    },
    kuiperBelt: {
      name: 'Kuiper Belt',
      category: 'Icy ring beyond Neptune',
      badge: '🧊 Home of Pluto',
      kidSummary: 'A vast doughnut of icy bodies beyond Neptune, 30 to 50 AU from the Sun. Pluto, Eris and many comets live here.',
      quickStats: [{ label: 'Location', value: '30 – 50 AU from the Sun' }, { label: 'Visited by', value: 'NASA’s New Horizons (Pluto 2015, Arrokoth 2019)' }],
      funFacts: ['The Kuiper Belt is 20 times wider and up to 200 times more massive than the asteroid belt.']
    },
    galacticBar: { name: 'Galactic Bar', category: 'Bar of old stars at the galaxy’s heart', badge: '🌟 Billions of ancient stars', kidSummary: 'The Milky Way is a barred spiral: a straight bar of old yellow stars about 27,000 light-years long crosses its center, and the spiral arms start at its ends.', quickStats: [{ label: 'Length', value: '~27,000 light-years' }], funFacts: ['From Earth the bar is tilted about 27° to our line of sight.'] },
    localGroup: { name: 'The Local Group', category: 'Our neighbourhood of galaxies', badge: '🌌 ~80 galaxies', kidSummary: 'The Local Group is the family of about 80 galaxies within 10 million light-years that includes the Milky Way, Andromeda and Triangulum plus dozens of small dwarf galaxies.', quickStats: [{ label: 'Size', value: '~10 million light-years' }, { label: 'Biggest members', value: 'Andromeda, Milky Way, Triangulum' }], funFacts: ['The whole Local Group is falling toward the Virgo Cluster.'] },
    cmb: { name: 'Cosmic Microwave Background', category: 'The oldest light in the universe', badge: '🔥 13.8 billion years old', kidSummary: 'The cosmic microwave background is the faint afterglow of the Big Bang, released when the universe was only 380,000 years old. It marks the edge of everything we can possibly see.', quickStats: [{ label: 'Age of the light', value: '13.8 billion years' }, { label: 'Current distance', value: '46 billion light-years' }, { label: 'Temperature today', value: '2.725 K (−270 °C)' }], funFacts: ['About 1% of the static on an old analog TV was this ancient light.'] },
    orionArmLabel: { name: 'Orion Spur', category: 'Our local arm of the Milky Way', badge: '📍 Home arm', kidSummary: 'The Sun lives in the Orion Spur, a small arm between the big Sagittarius and Perseus arms. Every star you can see with your eyes at night is in this little neighbourhood.', quickStats: [{ label: 'Length', value: '~10,000 light-years' }], funFacts: ['The Orion Nebula, Betelgeuse and Rigel all live in this arm.'] }
  };
  const arm = id.startsWith('arm-') ? { name: id.replace('arm-', '').replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()), category: 'Spiral arm of the Milky Way', badge: '🌀 Spiral arm', kidSummary: 'A spiral arm is a long, winding lane where gas is squeezed and bright new stars are born — like a traffic jam of stars circling the galaxy.', quickStats: [{ label: 'Pitch angle', value: 'about 12°' }], funFacts: ['Stars drift in and out of the arms as they orbit the galaxy; the arms themselves are density waves.'] } : null;
  const m = misc[id] || arm;
  if (!m) return null;
  return { pronunciation: '', travelTimes: {}, hasExoplanets: false, ...m };
}

function slug(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export { STARS };
