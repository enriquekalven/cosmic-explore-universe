/**
 * marvelData.js — Trilingual (`en`, `es`, `zh`) dataset for the Guardians of the Galaxy & Thor's Nine Realms
 * Universe Mode in Cosmic Explorer 3D.
 *
 * Bridges Guardians of the Galaxy & Thor's Nine Realms lore (Infinity Stones, Celestials)
 * with real-world NASA & astrophysics equivalents (Neutron Stars, Dyson Spheres, Einstein-Rosen Wormholes,
 * Planetary Nebulae, Tidal Locking, and the Andromeda M31 Galaxy).
 */

export const MARVEL_SCALES = {
  en: [
    {
      id: 'marvel-midgard',
      index: 0,
      name: 'Midgard & Guardians Ship',
      subtitle: 'Earth-616, New Asgard & The Benatar',
      rangeLabel: '10,000 km – 1 Million km',
      zoomMin: 0,
      zoomMax: 20,
      defaultZoom: 5.2,
      description:
        'Welcome to Midgard (Earth-616)! Orbiting right above Earth is the Guardians of the Galaxy’s iconic orange-and-silver M-ship, The Benatar, while New Asgard rests on the rocky coast of Tønsberg, Norway—where Thor departed with Star-Lord, Rocket, and Groot as the "Asgardians of the Galaxy"!',
      funPrompt: 'Click "🦝 Benatar Ship", "⚡ New Asgard", or "🌍 Midgard (Earth)" to inspect!'
    },
    {
      id: 'marvel-nine-realms',
      index: 1,
      name: 'Thor’s Nine Realms',
      subtitle: 'Asgard, Nidavellir Dyson Forge & Bifrost',
      rangeLabel: 'Thor’s Nine Realms & Yggdrasil Branches',
      zoomMin: 20,
      zoomMax: 45,
      defaultZoom: 33,
      description:
        'After the Benatar rescued Thor in Avengers: Infinity War, Rocket and Groot flew him to Nidavellir’s blazing Neutron Star Dyson Forge, where Groot’s own arm became the handle of Stormbreaker! Travel the iridescent Bifrost Rainbow Bridge across Thor’s Nine Realms—from golden Asgard to icy Jotunheim and fiery Muspelheim.',
      funPrompt: 'Click "⚡ Asgard" or "🔨 Nidavellir" to see how a real Neutron Star powers a Dyson ring!'
    },
    {
      id: 'marvel-guardians-sector',
      index: 2,
      name: 'Guardians Jump Network',
      subtitle: 'Xandar, Knowhere, Morag & Sovereign',
      rangeLabel: 'Andromeda M31 & Universal Neural Jump Net',
      zoomMin: 45,
      zoomMax: 68,
      defaultZoom: 55,
      description:
        'Warp through hexagonal Universal Jump Points across the Guardians of the Galaxy’s sector! Visit Knowhere (the severed head of an ancient Celestial floating in a colorful nebula), Nova Corps capital Xandar, stormy Morag, and golden Sovereign.',
      funPrompt: 'Click "💀 Knowhere" or "🌟 Xandar" to explore the Guardians of the Galaxy’s favorite worlds!'
    },
    {
      id: 'marvel-sakaar-titan',
      index: 3,
      name: 'Sakaar, Titan & Kree Rim',
      subtitle: 'Wormholes, Vormir Eclipse & Ego',
      rangeLabel: 'Deep Cosmic Rim & Wormhole Nexus',
      zoomMin: 68,
      zoomMax: 85,
      defaultZoom: 75,
      description:
        'Venture into the outer cosmic rim! Orbit Sakaar and its giant Einstein-Rosen Wormhole, inspect Thanos’s ruined world Titan where the Guardians and Avengers united, see the eternal eclipse of Vormir (Soul Stone), and visit Ego the Living Planet.',
      funPrompt: 'Click "🌀 Sakaar", "🪐 Titan", or "🟠 Vormir" to compare Guardians lore with real astrophysics!'
    },
    {
      id: 'marvel-celestials',
      index: 4,
      name: 'Celestials & Multiverse',
      subtitle: 'Arishem & The 6 Infinity Stones Nexus',
      rangeLabel: 'Observable Universe & Multiverse Tree',
      zoomMin: 85,
      zoomMax: 100,
      defaultZoom: 92,
      description:
        'At the grandest scale of the cosmos stands Arishem the Prime Celestial—architect of the first stars and galaxies—surrounded by the 6 cosmic Infinity Stones and the golden branches of the Multiverse Yggdrasil Tree!',
      funPrompt: 'Click "🔮 Arishem & Infinity Stones" to see how the 6 Infinity Stones compare to the Big Bang!'
    }
  ],
  es: [
    {
      id: 'marvel-midgard',
      index: 0,
      name: 'Midgard y Nave Benatar',
      subtitle: 'Tierra-616, Nuevo Asgard y El Benatar',
      rangeLabel: '10,000 km – 1 Millón km',
      zoomMin: 0,
      zoomMax: 20,
      defaultZoom: 5.2,
      description:
        '¡Bienvenido a Midgard (Tierra-616)! En órbita sobre la Tierra vuela el Benatar, la nave espacial naranja y plateada de los Guardianes de la Galaxia, mientras Nuevo Asgard brilla en la costa de Noruega, ¡desde donde Thor partió con los Guardianes como los "Asgardianos de la Galaxia"!',
      funPrompt: '¡Haz clic en "🦝 Nave Benatar", "⚡ Nuevo Asgard" o "🌍 Midgard" para explorar!'
    },
    {
      id: 'marvel-nine-realms',
      index: 1,
      name: 'Los Nueve Reinos de Thor',
      subtitle: 'Asgard, Forja de Nidavellir y el Bifrost',
      rangeLabel: 'Los Nueve Reinos de Thor y Ramas de Yggdrasil',
      zoomMin: 20,
      zoomMax: 45,
      defaultZoom: 33,
      description:
        '¡Cuando el Benatar rescató a Thor en Infinity War, Rocket y Groot volaron con él hasta la estrella de neutrones de Nidavellir, donde el propio brazo de Groot se convirtió en el mango del Stormbreaker! Viaja por el Puente Arcoíris Bifrost a través de los Nueve Reinos de Thor: desde el dorado Asgard hasta el helado Jotunheim y el ardiente Muspelheim.',
      funPrompt: '¡Haz clic en "⚡ Asgard" o "🔨 Nidavellir" para ver cómo funciona una Estrella de Neutrones!'
    },
    {
      id: 'marvel-guardians-sector',
      index: 2,
      name: 'Sector de los Guardianes',
      subtitle: 'Xandar, Knowhere, Morag y Sovereign',
      rangeLabel: 'Red de Saltos Hexagonales y Andrómeda',
      zoomMin: 45,
      zoomMax: 68,
      defaultZoom: 55,
      description:
        '¡Cruza los portales hexagonales de la Red de Saltos de los Guardianes de la Galaxia! Visita Knowhere (el cráneo colosal de un Celestial antiguo), Xandar (capital de los Nova Corps), el planeta oceánico Morag y los mundos dorados de Sovereign.',
      funPrompt: '¡Haz clic en "💀 Knowhere" o "🌟 Xandar" para explorar el sector de los Guardianes!'
    },
    {
      id: 'marvel-sakaar-titan',
      index: 3,
      name: 'Sakaar, Titán y Borde Kree',
      subtitle: 'Agujeros de Gusano, Vormir y Ego',
      rangeLabel: 'Borde Cósmico y Nexo de Agujeros de Gusano',
      zoomMin: 68,
      zoomMax: 85,
      defaultZoom: 75,
      description:
        '¡Aventúrate al borde exterior! Orbita Sakaar y su gigantesco Agujero de Gusano Einstein-Rosen, inspecciona el mundo en ruinas Titán donde los Guardianes y Vengadores se unieron, el eclipse eterno de Vormir (Gema del Alma) y Ego el Planeta Viviente.',
      funPrompt: '¡Haz clic en "🌀 Sakaar", "🪐 Titán" o "🟠 Vormir" para comparar con la astrofísica real!'
    },
    {
      id: 'marvel-celestials',
      index: 4,
      name: 'Celestiales y Multiverso',
      subtitle: 'Arishem y las 6 Gemas del Infinito',
      rangeLabel: 'Universo Observable y Árbol del Multiverso',
      zoomMin: 85,
      zoomMax: 100,
      defaultZoom: 92,
      description:
        'En la escala más grandiosa del cosmos se alza Arishem el Primer Celestial, creador de las primeras estrellas y galaxias, rodeado por las 6 Gemas del Infinito y los filamentos dorados del Multiverso.',
      funPrompt: '¡Haz clic en "🔮 Arishem y Gemas" para descubrir la ciencia del Big Bang y las singularidades!'
    }
  ],
  zh: [
    {
      id: 'marvel-midgard',
      index: 0,
      name: '米德加德与护卫队飞船',
      subtitle: '地球-616、新阿斯加德与贝纳塔号',
      rangeLabel: '1万公里 – 100万公里',
      zoomMin: 0,
      zoomMax: 20,
      defaultZoom: 5.2,
      description:
        '欢迎来到米德加德（地球-616）！银河护卫队标志性的橙银双色飞船“贝纳塔号”正环绕地球轨道飞行，而挪威滕斯贝格海岸坐落着“新阿斯加德”——在《复仇者联盟4：终局之战》结尾，雷神索尔正是从这里登上贝纳塔号，与星爵、火箭浣熊和格鲁特组成“阿斯加德护卫队”踏上星际旅程！',
      funPrompt: '点击“🦝 贝纳塔号飞船”、“⚡ 新阿斯加德”或“🌍 米德加德”即可近距离观察！'
    },
    {
      id: 'marvel-nine-realms',
      index: 1,
      name: '雷神的九大国度',
      subtitle: '阿斯加德、尼达维勒中子星熔炉与彩虹桥',
      rangeLabel: '雷神的九大国度与世界树星枝',
      zoomMin: 20,
      zoomMax: 45,
      defaultZoom: 33,
      description:
        '当贝纳塔号在《无限战争》中救起漂流深空的雷神索尔后，火箭浣熊与少年格鲁特驾驶太空舱陪他飞往尼达维勒中子星戴森环熔炉，格鲁特更斩断自己的手臂化作风暴战斧的斧柄！沿着绚丽的彩虹桥探索雷神的九大国度——从黄金神域阿斯加德到冰霜巨人国度约顿海姆与火焰国度穆斯贝尔海姆。',
      funPrompt: '点击“⚡ 阿斯加德”或“🔨 尼达维勒”了解真实的中子星与戴森球科学！'
    },
    {
      id: 'marvel-guardians-sector',
      index: 2,
      name: '银河护卫队星区（跳跃网）',
      subtitle: '山达尔、虚无之地、莫拉格与索维林',
      rangeLabel: '仙女座星系 M31 与六边形空间跳跃网络',
      zoomMin: 45,
      zoomMax: 68,
      defaultZoom: 55,
      description:
        '穿越六边形“宇宙空间跳跃点”探索银河护卫队星区！造访虚无之地（漂浮在绚丽星云中的远古天神族巨大头骨总部）、新星军团首都山达尔星、海洋神庙星球莫拉格以及黄金星球索维林。',
      funPrompt: '点击“💀 虚无之地”或“🌟 山达尔星”探索银河护卫队的传奇据点！'
    },
    {
      id: 'marvel-sakaar-titan',
      index: 3,
      name: '萨卡星、泰坦与克里星域',
      subtitle: '虫洞奇观、沃米尔日食与活体星球伊戈',
      rangeLabel: '深空边缘与爱因斯坦-罗森桥虫洞枢纽',
      zoomMin: 68,
      zoomMax: 85,
      defaultZoom: 75,
      description:
        '深入宇宙外缘！环绕角斗士星球萨卡星及其巨大的空间虫洞飞行，考察银河护卫队与复仇者联盟联手对抗灭霸的泰坦星、灵魂宝石所在的永恒日食星球沃米尔，以及活体星球伊戈。',
      funPrompt: '点击“🌀 萨卡星”、“🪐 泰坦星”或“🟠 沃米尔”对比银河护卫队传说与真实天体物理！'
    },
    {
      id: 'marvel-celestials',
      index: 4,
      name: '天神族与多元宇宙',
      subtitle: '阿里瑟姆与六颗无限宝石核心',
      rangeLabel: '可观测宇宙与多元宇宙世界树',
      zoomMin: 85,
      zoomMax: 100,
      defaultZoom: 92,
      description:
        '在最宏大的宇宙尺度上，审判者阿里瑟姆（第一代恒星与星系的缔造者）巍然屹立，周围环绕着六颗闪耀的无限宝石（空间、心灵、现实、力量、时间、灵魂）与金色多元宇宙时间线！',
      funPrompt: '点击“🔮 阿里瑟姆与无限宝石”了解宇宙大爆炸奇点与六大基本法则！'
    }
  ]
};

export const MARVEL_QUICK_TARGETS = {
  en: [
    { id: 'asgard', label: '⚡ Asgard', cat: 'thor' },
    { id: 'nidavellir', label: '🔨 Nidavellir Forge', cat: 'thor' },
    { id: 'knowhere', label: '💀 Knowhere HQ', cat: 'guardians' },
    { id: 'benatar', label: '🦝 Benatar Ship', cat: 'guardians' },
    { id: 'xandar', label: '🌟 Xandar', cat: 'guardians' },
    { id: 'sakaar', label: '🌀 Sakaar Wormhole', cat: 'thor' },
    { id: 'marvelTitan', label: '🪐 Titan (Thanos)', cat: 'stones' },
    { id: 'vormir', label: '🟠 Vormir (Soul Stone)', cat: 'stones' },
    { id: 'morag', label: '🟣 Morag (Power Stone)', cat: 'stones' },
    { id: 'ego', label: '🧠 Ego Living Planet', cat: 'guardians' },
    { id: 'sovereign', label: '✨ Sovereign', cat: 'guardians' },
    { id: 'jotunheim', label: '❄️ Jotunheim', cat: 'thor' },
    { id: 'muspelheim', label: '🔥 Muspelheim', cat: 'thor' },
    { id: 'hala', label: '🛡️ Hala (Kree)', cat: 'guardians' },
    { id: 'newAsgard', label: '🏡 New Asgard', cat: 'thor' },
    { id: 'counterEarth', label: '🌍 Counter-Earth', cat: 'guardians' },
    { id: 'contraxia', label: '🌨️ Contraxia', cat: 'guardians' },
    { id: 'arishem', label: '🔮 Arishem & 6 Stones', cat: 'stones' }
  ],
  es: [
    { id: 'asgard', label: '⚡ Asgard', cat: 'thor' },
    { id: 'nidavellir', label: '🔨 Forja Nidavellir', cat: 'thor' },
    { id: 'knowhere', label: '💀 Knowhere', cat: 'guardians' },
    { id: 'benatar', label: '🦝 Nave Benatar', cat: 'guardians' },
    { id: 'xandar', label: '🌟 Xandar', cat: 'guardians' },
    { id: 'sakaar', label: '🌀 Sakaar', cat: 'thor' },
    { id: 'marvelTitan', label: '🪐 Titán (Thanos)', cat: 'stones' },
    { id: 'vormir', label: '🟠 Vormir (Alma)', cat: 'stones' },
    { id: 'morag', label: '🟣 Morag (Poder)', cat: 'stones' },
    { id: 'ego', label: '🧠 Planeta Ego', cat: 'guardians' },
    { id: 'sovereign', label: '✨ Sovereign', cat: 'guardians' },
    { id: 'jotunheim', label: '❄️ Jotunheim', cat: 'thor' },
    { id: 'muspelheim', label: '🔥 Muspelheim', cat: 'thor' },
    { id: 'hala', label: '🛡️ Hala (Kree)', cat: 'guardians' },
    { id: 'newAsgard', label: '🏡 Nuevo Asgard', cat: 'thor' },
    { id: 'counterEarth', label: '🌍 Contra-Tierra', cat: 'guardians' },
    { id: 'contraxia', label: '🌨️ Contraxia', cat: 'guardians' },
    { id: 'arishem', label: '🔮 Arishem y 6 Gemas', cat: 'stones' }
  ],
  zh: [
    { id: 'asgard', label: '⚡ 阿斯加德', cat: 'thor' },
    { id: 'nidavellir', label: '🔨 尼达维勒星环', cat: 'thor' },
    { id: 'knowhere', label: '💀 虚无之地总部', cat: 'guardians' },
    { id: 'benatar', label: '🦝 贝纳塔号飞船', cat: 'guardians' },
    { id: 'xandar', label: '🌟 山达尔星', cat: 'guardians' },
    { id: 'sakaar', label: '🌀 萨卡星虫洞', cat: 'thor' },
    { id: 'marvelTitan', label: '🪐 泰坦星 (灭霸)', cat: 'stones' },
    { id: 'vormir', label: '🟠 沃米尔 (灵魂宝石)', cat: 'stones' },
    { id: 'morag', label: '🟣 莫拉格 (力量宝石)', cat: 'stones' },
    { id: 'ego', label: '🧠 活体星球伊戈', cat: 'guardians' },
    { id: 'sovereign', label: '✨ 索维林金色星球', cat: 'guardians' },
    { id: 'jotunheim', label: '❄️ 约顿海姆', cat: 'thor' },
    { id: 'muspelheim', label: '🔥 穆斯贝尔海姆', cat: 'thor' },
    { id: 'hala', label: '🛡️ 哈拉星 (克里帝国)', cat: 'guardians' },
    { id: 'newAsgard', label: '🏡 新阿斯加德', cat: 'thor' },
    { id: 'counterEarth', label: '🌍 反地球', cat: 'guardians' },
    { id: 'contraxia', label: '🌨️ 康特拉夏星', cat: 'guardians' },
    { id: 'arishem', label: '🔮 阿里瑟姆与无限宝石', cat: 'stones' }
  ]
};

export const MARVEL_CATEGORIES = {
  en: [
    { id: 'all', label: '✨ All Worlds (18)' },
    { id: 'guardians', label: '🦝 Guardians (8)' },
    { id: 'thor', label: '⚡ Thor’s Nine Realms (6)' },
    { id: 'stones', label: '💎 Infinity Stones (4)' }
  ],
  es: [
    { id: 'all', label: '✨ Todos los Mundos (18)' },
    { id: 'guardians', label: '🦝 Guardianes (8)' },
    { id: 'thor', label: '⚡ Los Nueve Reinos de Thor (6)' },
    { id: 'stones', label: '💎 Gemas del Infinito (4)' }
  ],
  zh: [
    { id: 'all', label: '✨ 全部护卫队星域 (18)' },
    { id: 'guardians', label: '🦝 银河护卫队 (8)' },
    { id: 'thor', label: '⚡ 雷神的九大国度 (6)' },
    { id: 'stones', label: '💎 无限宝石与天神族 (4)' }
  ]
};

export const MARVEL_OBJECTS = {
  // =========================================================================
  // SCALE 0: MIDGARD & ORBIT
  // =========================================================================
  benatar: {
    id: 'benatar',
    name: 'The Benatar (Guardians M-Ship)',
    pronunciation: 'BEN-uh-tar',
    category: 'Guardians of the Galaxy Starship',
    scaleIndex: 0,
    badge: '🦝 Star-Lord, Rocket & Groot’s Ship',
    color: '#fb923c',
    kidSummary:
      'The Benatar (successor to the Milano and predecessor to the Bowie) is the sleek orange-and-gunmetal M-class starship flown by Star-Lord, Gamora, Rocket, Groot, Drax, and Mantis — and even Thor ("Asgardians of the Galaxy")! Real-Science Connection: While the Benatar leaps between galaxies using hexagonal wormhole Jump Points, real NASA deep-space craft use solar-electric Xenon ion thrusters and planetary gravity assists.',
    quickStats: [
      { label: 'Marvel Crew', value: 'Star-Lord, Rocket, Groot, Gamora, Drax, Mantis & Thor' },
      { label: 'Ship Class & Pods', value: 'M-Class Reconnaissance Vessel + Detachable Space Pod' },
      { label: 'Soundtrack System', value: 'Zune & Awesome Mix Vol. 1–3 Dual Speakers' },
      { label: 'Real Science Link', value: 'NASA NEXT-C Xenon Ion Thrusters & Hall-Effect Propulsion' }
    ],
    funFacts: [
      'Named after rock legend Pat Benatar, the ship carries a detachable aft pod that Thor, Rocket, and Groot flew all the way to the neutron star forge of Nidavellir!',
      'In Avengers: Endgame, Tony Stark and Nebula were rescued from deep space aboard the Benatar by Captain Marvel.',
      'Real Astrophysics: Ion thrusters (like those on NASA’s Dawn and Psyche probes) glow bright cyan-blue just like the Benatar’s engines by ionizing xenon gas!'
    ],
    travelTimes: {
      light: '0.02 seconds from Earth surface',
      jumpPoint: 'Instantaneous across galaxies via hexagonal Jump Points',
      bifrost: '0.5 seconds via Stormbreaker’s Bifrost beam'
    }
  },

  newAsgard: {
    id: 'newAsgard',
    name: 'New Asgard (Tønsberg, Midgard)',
    pronunciation: 'NOO AZ-gard',
    category: 'Earth-616 Asgardian Haven (Norway)',
    scaleIndex: 0,
    badge: '⚡ King Valkyrie’s Coastal Kingdom',
    color: '#38bdf8',
    kidSummary:
      'After Ragnarok destroyed old Asgard, Thor, King Valkyrie, Korg, and Miek founded New Asgard in the scenic coastal village of Tønsberg, Norway on Midgard (Earth)—the exact spot where Odin once hid the Tesseract (Space Stone) in 965 AD! Real-Science Connection: Norway sits directly beneath Earth’s polar magnetospheric cusp, where solar wind particles create dazzling green and violet auroras that inspired ancient Norse myths of the Bifrost!',
    quickStats: [
      { label: 'Location on Midgard', value: 'Tønsberg Coast, Vestfold, Norway (59.27° N, 10.41° E)' },
      { label: 'Ruler & Protectors', value: 'King Valkyrie, Thor Odinson, Korg & Miek' },
      { label: 'Infinity Stone History', value: 'Tesseract (Space Stone) hidden here by Odin for 1,000 years' },
      { label: 'Real Science Link', value: 'Aurora Borealis (Solar Wind + Magnetosphere at 100–300 km)' }
    ],
    funFacts: [
      'Odin chose Norway for New Asgard’s future home just before passing into the Odinsleep: "Asgard is not a place; never was. Asgard is where our people stand."',
      'Flying wooden Viking skiffs powered by Asgardian levitation runes carry visitors past the fjords.',
      'Real Astrophysics: The shimmering green curtains above Norway happen when electrons from the Sun strike oxygen atoms 100 km high in Earth’s upper atmosphere!'
    ],
    travelTimes: {
      light: '0.01 seconds from orbit',
      jumpPoint: '3 hours by Quinjet from Avengers Compound',
      bifrost: 'Instantaneous landing mark on the cliffside'
    }
  },

  // =========================================================================
  // SCALE 1: YGGDRASIL & THOR'S NINE REALMS
  // =========================================================================
  asgard: {
    id: 'asgard',
    name: 'Asgard & The Bifrost Rainbow Bridge',
    pronunciation: 'AZ-gard',
    category: 'Crown of the Nine Realms (Yggdrasil)',
    scaleIndex: 1,
    badge: '⚡ Home of Thor, Odin & Loki',
    color: '#fbbf24',
    kidSummary:
      'Asgard is the gleaming golden realm of Thor, Odin, Frigga, Loki, and Heimdall—a crystalline floating continent crowned by the towering Golden Palace of Valhalla and linked to the cosmos by the 7-color Bifrost Rainbow Bridge! Real-Science Connection: In Thor (2011), Jane Foster explains that the Asgardian Bifrost is actually an Einstein-Rosen Bridge—a real general-relativity spacetime wormhole predicted by Albert Einstein and Nathan Rosen in 1935!',
    quickStats: [
      { label: 'Realm & Cosmic Tree', value: 'First of the Nine Realms on Yggdrasil’s Golden Branches' },
      { label: 'Heroes & Guardians', value: 'Thor Odinson, Heimdall, Odin, Loki & Lady Sif' },
      { label: 'Vault Artifacts', value: 'Tesseract (Space Stone), Casket of Ancient Winters & Eternal Flame' },
      { label: 'Real Science Link', value: 'Einstein-Rosen Bridge (General Relativity Spacetime Wormhole)' }
    ],
    funFacts: [
      'Heimdall’s Observatory at the edge of the Rainbow Bridge channels dark energy and gravitational lensing to open the Bifrost to any of the Nine Realms.',
      'From the palace spire, waterfalls cascade directly off the crystalline rim into open cosmic space!',
      'Real Astrophysics: Dispersion splits white starlight into a rainbow spectrum, while a real Einstein-Rosen bridge would bend light around its throat like a glowing rainbow halo!'
    ],
    travelTimes: {
      light: 'Across cosmic sectors in seconds via Bifrost',
      jumpPoint: '3 Jumps via the Universal Neural Teleportation Network',
      bifrost: 'Instantaneous (Heimdall’s Hofund sword key)'
    }
  },

  nidavellir: {
    id: 'nidavellir',
    name: 'Nidavellir (Neutron Star Dyson Forge)',
    pronunciation: 'NEE-duh-vel-eer',
    category: 'Dwarven Dyson-Ring Forge (Nine Realms)',
    scaleIndex: 1,
    badge: '🔨 Forged Mjolnir & Stormbreaker!',
    color: '#38bdf8',
    kidSummary:
      'Nidavellir is the legendary Dwarven forge-realm where King Eitri used the blazing heart of a dying star to forge Thor’s hammer Mjolnir, the axe Stormbreaker (with Groot’s handle!), and the Infinity Gauntlet! Real-Science Connection: Nidavellir is a real astrophysics double-feature: a spinning Neutron Star (a collapsed stellar core only 20 km wide where 1 teaspoon weighs a billion tons!) surrounded by a mechanical Dyson Ring megastructure!',
    quickStats: [
      { label: 'Cosmic Megastructure', value: 'Multi-Ring Dyson Sphere / Forge around a Neutron Star' },
      { label: 'Master Forge Crew', value: 'King Eitri, Thor, Rocket Raccoon (in pod) & Teenage Groot' },
      { label: 'Legendary Creations', value: 'Mjolnir, Stormbreaker (Bifrost Axe) & Infinity Gauntlet' },
      { label: 'Real Science Link', value: 'Neutron Star / Pulsar (10¹⁴ g/cm³) + Freeman Dyson Ring (1960)' }
    ],
    funFacts: [
      'When Nidavellir’s gyroscope rings froze, Rocket flew his tiny space pod in circles while Thor swung a cable to pull the colossal rings back into alignment!',
      'Groot lifted the glowing Uru metal axe pieces and grew his own wooden arm to create Stormbreaker’s handle.',
      'Real Astrophysics: Physicist Freeman Dyson proposed in 1960 that an advanced civilization could surround a star with nested rings to harvest 100% of its energy—just like Nidavellir!'
    ],
    travelTimes: {
      light: 'Direct beam from the Neutron Star magnetic poles',
      jumpPoint: '18 hours in the Benatar’s detachable space pod',
      bifrost: 'Instantaneous once Stormbreaker summoned the Bifrost'
    }
  },

  jotunheim: {
    id: 'jotunheim',
    name: 'Jotunheim (Realm of the Frost Giants)',
    pronunciation: 'YOH-tuhn-hime',
    category: 'Cryogenic Ice World (Nine Realms)',
    scaleIndex: 1,
    badge: '❄️ Birthplace of Loki Laufeyson',
    color: '#60a5fa',
    kidSummary:
      'Jotunheim is the dark, fractured cryogenic ice realm of King Laufey and the Frost Giants—and the secret birthplace of Loki before Odin adopted him as a baby! Real-Science Connection: Jotunheim closely resembles real cryo-worlds in our universe, such as Jupiter’s fractured ice moon Europa, Saturn’s geyser moon Enceladus, and rogue cryo-exoplanets drifting far from warm stars.',
    quickStats: [
      { label: 'Realm & Climate', value: 'Sub-Zero Cryogenic Ice World with Fractured Glacial Rings' },
      { label: 'Notable Figures', value: 'Loki Laufeyson, King Laufey & The Frost Beast' },
      { label: 'Relic of Power', value: 'Casket of Ancient Winters (Cryogenic Elemental Matrix)' },
      { label: 'Real Science Link', value: 'Cryovolcanic Ice Worlds (Europa, Enceladus & OGLE-2005-BLG-390Lb)' }
    ],
    funFacts: [
      'Without the Casket of Ancient Winters, Jotunheim’s glaciers slowly crumble into surrounding space, forming shimmering rings of ice crystals.',
      'Thor, Loki, Lady Sif, and the Warriors Three traveled here via the Bifrost in the first Thor film.',
      'Real Astrophysics: On ultra-cold worlds like Pluto and Triton (−235 °C), water ice is literally as hard as granite bedrock, and volcanoes erupt liquid nitrogen and methane!'
    ],
    travelTimes: {
      light: 'Connected via Yggdrasil’s Northern Root branch',
      jumpPoint: 'Accessible via Dark Energy dimensional rifts',
      bifrost: '2.5 seconds from Heimdall’s Observatory'
    }
  },

  muspelheim: {
    id: 'muspelheim',
    name: 'Muspelheim (Surtur’s Fire Realm)',
    pronunciation: 'MOOS-pel-hime',
    category: 'Volcanic Magma World (Nine Realms)',
    scaleIndex: 1,
    badge: '🔥 Realm of Eternal Fire & Surtur',
    color: '#f97316',
    kidSummary:
      'Muspelheim is a scorching volcanic furnace realm of rivers of lava, obsidian spires, and eternal fire ruled by the fire demon Surtur! Real-Science Connection: Astronomers have discovered real "lava exoplanets" like 55 Cancri e and Kepler-78b that orbit so close to their stars that their entire daytime hemisphere is a bubbling ocean of 2,400 °C molten rock—plus Jupiter’s hyper-volcanic moon Io!',
    quickStats: [
      { label: 'Realm Environment', value: 'Global Silicate Magma Oceans & Tidally Heated Crust' },
      { label: 'Ruler & Champions', value: 'Surtur (Crown of Eternal Flame) vs. Thor Odinson' },
      { label: 'Comic / Movie Moment', value: 'Opening scene of Thor: Ragnarok ("I thought my father killed you...")' },
      { label: 'Real Science Link', value: 'Ultra-Hot Lava Exoplanets (55 Cancri e, K2-141b) & Jupiter’s Moon Io' }
    ],
    funFacts: [
      'Thor: Ragnarok opens with Thor chained in Surtur’s volcanic lair on Muspelheim before summoning Mjolnir to defeat the fire dragon!',
      'In Norse mythology, sparks flying out of Muspelheim into the cosmic void Ginnungagap helped ignite the first stars.',
      'Real Astrophysics: On real lava exoplanet K2-141b, rock literally evaporates into the sky, blows supersonic winds to the nightside, and rains back down as pebbles!'
    ],
    travelTimes: {
      light: 'Connected via Yggdrasil’s Southern Fire Branch',
      jumpPoint: 'High thermal-shielding required for sub-light approach',
      bifrost: 'Instantaneous extraction ("Heimdall, open the Bifrost!")'
    }
  },

  // =========================================================================
  // SCALE 2: GUARDIANS OF THE GALAXY SECTOR (ANDROMEDA / JUMP NETWORK)
  // =========================================================================
  knowhere: {
    id: 'knowhere',
    name: 'Knowhere (Guardians Celestial Head HQ)',
    pronunciation: 'NOH-wair',
    category: 'Severed Celestial Skull & Guardians HQ',
    scaleIndex: 2,
    badge: '💀 Guardians of the Galaxy Headquarters!',
    color: '#f472b6',
    kidSummary:
      'Knowhere is a bustling cosmic outpost—and now the official headquarters of the Guardians of the Galaxy (led by Rocket, Groot, Cosmo the Spacedog, Kraglin, and Adam Warlock)—built inside the giant severed head of an ancient Celestial floating in a colorful nebula! Real-Science Connection: Knowhere floats inside an emission nebula just like real planetary nebulae (such as the Helix "Eye of God" Nebula NGC 7293 or the Skull Nebula NGC 246), where dying stars seed space with gold, iron, and calcium!',
    quickStats: [
      { label: 'Structure & Scale', value: 'Colossal Ancient Celestial Skull (~16 km across) in a Nebula' },
      { label: 'Guardians Roster', value: 'Star-Lord, Rocket, Groot, Cosmo the Spacedog, Nebula & Drax' },
      { label: 'Infinity Stone Link', value: 'Aether (Reality Stone) kept here by Taneleer Tivan (The Collector)' },
      { label: 'Real Science Link', value: 'Planetary & Supernova Nebulae (Skull Nebula NGC 246 / Helix Nebula)' }
    ],
    funFacts: [
      'In the Guardians of the Galaxy Holiday Special and Vol. 3, the Guardians bought Knowhere from the Collector and turned it into a thriving home—complete with a giant telekinetic speaker system and Cosmo the Spacedog!',
      'Inside the skull’s eye sockets and brain cavity are zero-gravity mining railways and glowing yellow spherical mining pods.',
      'Real Astrophysics: Every heavy element in our bones and jewelry—calcium, iron, and gold—was forged inside real dying stars and supernovae that leave behind glowing nebulae like Knowhere’s!'
    ],
    travelTimes: {
      light: 'Located at the edge of the Rip in the Andromeda sector',
      jumpPoint: '2 Hexagonal Jumps from Xandar via the Benatar',
      bifrost: 'Direct Bifrost beam (visited by Sif and Volstagg)'
    }
  },

  xandar: {
    id: 'xandar',
    name: 'Xandar (Nova Empire Capital)',
    pronunciation: 'ZAN-dar',
    category: 'Capital World of the Nova Corps (Andromeda M31)',
    scaleIndex: 2,
    badge: '🌟 Where the Guardians First United!',
    color: '#38bdf8',
    kidSummary:
      'Xandar is the gleaming sapphire-and-emerald water world in the Andromeda Galaxy (M31)—capital of the Nova Empire and Nova Corps, and the city where Star-Lord, Gamora, Rocket, Groot ("We are Groot"), and Drax first joined hands to control the purple Power Stone! Real-Science Connection: Xandar orbits three suns in the real Andromeda Galaxy (M31), located 2.54 million light-years from Earth with over 1 trillion stars!',
    quickStats: [
      { label: 'Galaxy & Star System', value: 'Andromeda Galaxy (M31) • Trinary Star System (3 Suns)' },
      { label: 'Historic Event', value: 'Guardians of the Galaxy formed here & defeated Ronan the Accuser' },
      { label: 'Defense Grid', value: 'Interlocking Golden Nova Starfighter Shield + Power Stone Vault' },
      { label: 'Real Science Link', value: 'Andromeda Galaxy M31 (2.54M ly) & Circumbinary Planets (Kepler-16b)' }
    ],
    funFacts: [
      'During the Battle of Xandar, hundreds of golden Nova Corps starfighters locked wingtips to form a giant glowing energy net to hold back Ronan’s warship, the Dark Aster!',
      'Just outside Xandar’s atmosphere floats a glowing hexagonal Jump Point portal—part of the Universal Neural Teleportation Network.',
      'Real Astrophysics: NASA’s Kepler and TESS space telescopes have discovered real planets orbiting two or three suns at once (like Kepler-16b and LTT 1445Ab), giving them multiple sunrises and shadows!'
    ],
    travelTimes: {
      light: '2.54 million years from Earth (Andromeda M31)',
      jumpPoint: '3 Hexagonal Jumps from Midgard (~15 minutes)',
      bifrost: 'Cross-galactic Bifrost transit'
    }
  },

  morag: {
    id: 'morag',
    name: 'Morag (Ocean Temple of the Power Stone)',
    pronunciation: 'MOR-ag',
    category: 'Submerged Ocean-Temple Planet',
    scaleIndex: 2,
    badge: '🟣 Star-Lord’s Opening Dance & The Orb!',
    color: '#a855f7',
    kidSummary:
      'Morag is a stormy oceanic planet whose global seas recede only once every 300 years, uncovering the ancient temple ruins where Peter Quill (Star-Lord) danced to "Come and Get Your Love" and retrieved the Orb containing the purple Power Stone! Real-Science Connection: Morag’s 300-year extreme ocean tide is a dramatic version of real orbital resonance and spring tides—and astronomers have found real "Hycean" water worlds like K2-18b and Kepler-22b!',
    quickStats: [
      { label: 'Planetary Cycle', value: 'Global Ocean Recedes Every 300 Years to Expose Temple Vault' },
      { label: 'Visited By', value: 'Star-Lord (2014) & War Machine + Nebula (2023 Time Heist)' },
      { label: 'Infinity Stone', value: '🟣 The Power Stone (housed inside the metallic Orb)' },
      { label: 'Real Science Link', value: 'Extreme Tidal Resonance & Hycean Water Worlds (Kepler-22b / K2-18b)' }
    ],
    funFacts: [
      'In Avengers: Endgame, Nebula and War Machine traveled back to 2014 Morag and watched Star-Lord singing into a lizard-microphone without his music playing!',
      'Warm hydrothermal vents erupt from Morag’s ocean floor whenever the seas pull back.',
      'Real Astrophysics: When multiple moons line up in orbital resonance (like Jupiter’s moons Io, Europa, and Ganymede), their combined gravity creates massive planetary tides and volcanic geysers!'
    ],
    travelTimes: {
      light: 'Andromeda Sector (Kree-Xandarian border)',
      jumpPoint: '1 Jump Point from Xandar aboard the Milano / Benatar',
      bifrost: 'Accessible via Quantum Realm time-space GPS or Bifrost'
    }
  },

  sovereign: {
    id: 'sovereign',
    name: 'Sovereign (Golden Battery Worlds)',
    pronunciation: 'SOV-rin',
    category: 'Engineered Golden Planetary Cluster',
    scaleIndex: 2,
    badge: '✨ Home of Ayesha & Adam Warlock',
    color: '#facc15',
    kidSummary:
      'Sovereign is a breathtaking artificial cluster of gleaming, geometric golden worlds linked by orbital bridges—ruled by High Priestess Ayesha, where the Guardians fought the interdimensional Abilisk monster to protect priceless Anulax Batteries ("Harbulary Batteries") and where Adam Warlock was created! Real-Science Connection: Sovereign’s faceted gold worlds are an example of a Kardashev Type II engineered planetary megastructure, while gold itself is forged only when two real neutron stars collide (a kilonova)!',
    quickStats: [
      { label: 'Architecture', value: 'Faceted Metallic-Gold Engineered Worlds & Orbital Rings' },
      { label: 'Key Characters', value: 'High Priestess Ayesha, Adam Warlock, Baby Groot & Rocket' },
      { label: 'Power Source', value: 'Anulax Quantum Batteries (stolen by Rocket Raccoon!)' },
      { label: 'Real Science Link', value: 'Neutron-Star Kilonova Nucleosynthesis (Origin of Cosmic Gold) & JWST Gold Mirrors' }
    ],
    funFacts: [
      'Baby Groot danced to ELO’s "Mr. Blue Sky" while the Guardians battled a tentacled dimensional beast right on Sovereign’s golden plaza!',
      'The Sovereign pilot their golden Omnicraft fighter fleets remotely from arcade-style pods.',
      'Real Astrophysics: NASA’s James Webb Space Telescope (JWST) coats its 18 hexagonal mirrors in real gold because gold reflects 99% of infrared starlight!'
    ],
    travelTimes: {
      light: 'Golden Cluster in the Guardians Sector',
      jumpPoint: '1 Jump from Berhert (unless Rocket steals the batteries!)',
      bifrost: 'Direct golden beacon alignment'
    }
  },

  counterEarth: {
    id: 'counterEarth',
    name: 'Counter-Earth (Halfworld / Guardians Vol. 3)',
    pronunciation: 'KOWN-ter ERTH',
    category: 'Bio-Engineered Mirror Earth',
    scaleIndex: 2,
    badge: '🌍 Guardians of the Galaxy Vol. 3',
    color: '#34d399',
    kidSummary:
      'Counter-Earth is a bio-engineered mirror version of Earth created by the High Evolutionary in Guardians of the Galaxy Vol. 3, orbited by his colossal pyramidal starship, the Arête Laboratories, where young Rocket Raccoon, Lylla, Teefs, and Floor once dreamed of flying into the forever and beautiful sky! Real-Science Connection: The idea of a "Counter-Earth" dates back 2,400 years to Greek philosopher Philolaus, and today relates to real Lagrange Points (L3)—five gravitational balance spots in a planet’s orbit!',
    quickStats: [
      { label: 'Story Heart', value: 'Rocket Raccoon’s Origin ("The name’s Rocket. Rocket Raccoon.")' },
      { label: 'Orbital Landmark', value: 'Arête Laboratories Starship & Bio-Engineered Continents' },
      { label: 'Guardians Mission', value: 'Star-Lord, Groot, Nebula, Mantis & Drax rescued every animal aboard!' },
      { label: 'Real Science Link', value: 'Sun-Earth L3 Lagrange Point & Planetary Biosignatures' }
    ],
    funFacts: [
      'In Guardians of the Galaxy Vol. 3, the Guardians saved not only the children of the Arête ship, but also hundreds of raccoons, puppies, and creatures—bringing them home to Knowhere!',
      'Real Astrophysics: Every planet-star system has 5 Lagrange Points (L1–L5) where gravity cancels out; NASA’s James Webb Space Telescope orbits at Sun-Earth L2, while L3 sits on the exact opposite side of the Sun!'
    ],
    travelTimes: {
      light: 'Orbital mirror sector',
      jumpPoint: '2 Jumps from Knowhere via the Bowie',
      bifrost: 'Instantaneous cosmic bridge'
    }
  },

  contraxia: {
    id: 'contraxia',
    name: 'Contraxia (Ravager Ice World)',
    pronunciation: 'kon-TRAK-see-uh',
    category: 'Dying-Star Ice Planet & Ravager Port',
    scaleIndex: 2,
    badge: '🌨️ Yondu & Stakar’s Neon Ice Port',
    color: '#93c5fd',
    kidSummary:
      'Contraxia is a snow-covered ice world orbiting a fading, cooling star where Ravager captains like Yondu Udonta, Stakar Ogord (Starhawk), and Kraglin gather under neon lights and fireworks! Real-Science Connection: Contraxia is a real astronomical scenario—a formerly warm planet whose aging sun is running out of nuclear fuel and cooling into a white dwarf, freezing the planet’s oceans into global glaciers.',
    quickStats: [
      { label: 'Planet Type', value: 'Frozen Tundra World Orbiting a Fading, Cooling Star' },
      { label: 'Factions', value: 'Yondu Udonta, Stakar Ogord, Kraglin & The 100 Ravager Clans' },
      { label: 'Iconic Tribute', value: 'Ravager Colours Fireworks Funeral for Yondu ("He may have been your father, boy...")' },
      { label: 'Real Science Link', value: 'Stellar Evolution, White Dwarf Cooling & Snowball-Earth Glaciation' }
    ],
    funFacts: [
      'Because Contraxia’s sun is slowly dying, huge geothermal heaters keep its spaceport cities warm beneath the falling snow.',
      'Real Astrophysics: Around 700 million years ago, our own Planet Earth experienced a real "Snowball Earth" phase where ice sheets reached all the way to the equator!'
    ],
    travelTimes: {
      light: 'Ravager Sector',
      jumpPoint: '700 Jumps if you take the wrong shortcut with Rocket and Groot!',
      bifrost: 'Direct Bifrost transit'
    }
  },

  // =========================================================================
  // SCALE 3: SAKAAR, TITAN, VORMIR & OUTER COSMIC RIM
  // =========================================================================
  sakaar: {
    id: 'sakaar',
    name: 'Sakaar & The Devil’s Anus Wormhole',
    pronunciation: 'suh-KAR',
    category: 'Wormhole-Ringed Gladiator Planet',
    scaleIndex: 3,
    badge: '🌀 Thor, Hulk, Valkyrie & Korg’s Arena!',
    color: '#2dd4bf',
    kidSummary:
      'Sakaar is a vibrant red, gold, and teal planet surrounded by dozens of swirling cosmic wormholes—where Thor teamed up with the Hulk ("He’s a friend from work!"), Valkyrie, Korg, and Loki to escape aboard the Commodore through the giant magnetar wormhole nicknamed "The Devil’s Anus"! Real-Science Connection: Sakaar’s giant vortex is a visual model of a traversable Einstein-Rosen Wormhole paired with the intense magnetic fields of a Magnetar (the most magnetic stars in the universe)!',
    quickStats: [
      { label: 'Orbital Phenomenon', value: 'Surrounded by 18+ Swirling Spacetime Wormholes' },
      { label: 'Revengers Team', value: 'Thor, Hulk (Bruce Banner), Valkyrie, Loki, Korg & Miek' },
      { label: 'Largest Vortex', value: 'High-Gravity Magnetar Einstein-Rosen Bridge to Asgard' },
      { label: 'Real Science Link', value: 'Kip Thorne Traversable Wormholes & Magnetars (10¹⁵ Gauss)' }
    ],
    funFacts: [
      'Because Sakaar is surrounded by wormholes of different gravitational strengths, time flows differently near its portals—a real effect called Gravitational Time Dilation!',
      'Thor and Bruce Banner flew the colorful leisure ship Commodore straight into the swirling red-and-cyan wormhole to reach Asgard.',
      'Real Astrophysics: Nobel laureate Kip Thorne calculated how a real wormhole bends starlight into a glowing ring (the same physics equations used to render Gargantua in Interstellar)!'
    ],
    travelTimes: {
      light: 'Uncharted edge of the known universe',
      jumpPoint: '18 minutes through the giant Magnetar Wormhole to Asgard',
      bifrost: 'Reached when knocked out of the Bifrost stream!'
    }
  },

  marvelTitan: {
    id: 'marvelTitan',
    name: 'Titan (Thanos’s Ruined Gravity World)',
    pronunciation: 'TY-tun',
    category: 'Tilted, Gravity-Fractured Exoplanet',
    scaleIndex: 3,
    badge: '🪐 Guardians + Avengers Battle vs. Thanos!',
    color: '#f59e0b',
    kidSummary:
      'In the Marvel cosmos, Titan is a tilted, amber-skied world whose rotational axis shifted by 8 degrees, shattering its moon and leaving giant floating debris rings and strange gravity anomalies—where Star-Lord, Drax, Mantis, Iron Man, Spider-Man, and Doctor Strange battled Thanos! Real-Science Connection: When a moon is pulled closer than a planet’s "Roche Limit," tidal gravity rips the moon into a glowing ring of boulders—and in our own Solar System, Saturn’s real moon Titan is an orange-haze world with liquid methane lakes!',
    quickStats: [
      { label: 'Planetary Anomaly', value: '8° Axial Tilt Shift + Roche-Limit Shattered Moon Debris Ring' },
      { label: 'Historic Alliance', value: 'Star-Lord, Mantis, Drax, Nebula + Iron Man, Spider-Man & Dr. Strange' },
      { label: 'Infinity Stone Duel', value: '🟢 Time Stone (Eye of Agamotto) surrendered here for 1-in-14,000,605 win' },
      { label: 'Real Science Link', value: 'Roche Limit Tidal Disruption + Saturn’s Real Moon Titan (Cassini-Huygens)' }
    ],
    funFacts: [
      'During the battle on Titan, Thanos used the Power and Space Stones to pull chunks of Titan’s shattered moon out of orbit as flaming meteors!',
      'Doctor Strange used the green Time Stone on Titan to peer into 14,000,605 possible futures.',
      'Real Astrophysics: Édouard Roche proved in 1848 that if any moon drifts inside 2.44 planetary radii (the Roche Limit), gravity tears it apart into rings—which is how Saturn’s rings formed!'
    ],
    travelTimes: {
      light: 'Deep space beyond the Kree-Nova rim',
      jumpPoint: '4 Jumps aboard the Benatar / Q-Ship',
      bifrost: 'Instantaneous via Doctor Strange’s Eldritch Sling-Ring Portal to Earth!'
    }
  },

  vormir: {
    id: 'vormir',
    name: 'Vormir (Eclipse Sanctuary of the Soul Stone)',
    pronunciation: 'VOR-meer',
    category: 'Eternal-Eclipse Desert World (Helgentar System)',
    scaleIndex: 3,
    badge: '🟠 Center of Celestial Existence (Soul Stone)',
    color: '#fb923c',
    kidSummary:
      'Vormir is a haunting purple-and-amber desert world in the Helgentar system, crowned by twin mountain peaks beneath a sky locked in a permanent, blazing solar eclipse—the resting place of the orange Soul Stone! Real-Science Connection: A permanent eclipse in the sky happens through Tidal Locking and a 3-body Lagrange Point (L1), similar to how NASA’s DSCOVR satellite or a tidally locked exoplanet keeps a star or moon fixed at the exact same spot in the sky forever!',
    quickStats: [
      { label: 'Sky Phenomenon', value: 'Permanent Ring-of-Fire Solar Eclipse Corona Overhead' },
      { label: 'Infinity Stone', value: '🟠 The Soul Stone ("A soul for a soul" at the Altar Peak)' },
      { label: 'Cosmic Description', value: '"A dominion of death, at the very center of celestial existence"' },
      { label: 'Real Science Link', value: 'Tidal Locking, L1 Lagrange Alignment & Annular Solar Eclipses' }
    ],
    funFacts: [
      'When the Soul Stone is claimed on Vormir, a blinding pillar of orange cosmic light shoots straight into the eclipsed ring in the sky, and the traveler wakes in a shallow mirror pool.',
      'Real Astrophysics: During an annular ("ring of fire") eclipse, the Moon covers the Sun’s center while leaving a blazing golden ring of the solar corona visible around the edges!'
    ],
    travelTimes: {
      light: 'Helgentar System (Center of Celestial Existence)',
      jumpPoint: '3 Jumps from Morag aboard the Benatar (2023 Time Heist)',
      bifrost: 'Direct cosmic coordinates'
    }
  },

  ego: {
    id: 'ego',
    name: 'Ego the Living Planet',
    pronunciation: 'EE-goh',
    category: 'Bioluminescent Celestial Planet (Guardians Vol. 2)',
    scaleIndex: 3,
    badge: '🧠 A Living Celestial Brain Core!',
    color: '#ec4899',
    kidSummary:
      'Ego the Living Planet is an entire crimson-and-magenta world created over millions of years by a Celestial brain core, complete with glowing neural light caverns, iridescent forests, and a planetary face—defeated when Baby Groot planted a bomb on its core while Rocket, Yondu, Star-Lord, Gamora, Drax, and Mantis fought to save the galaxy! Real-Science Connection: While planets don’t have brains, real astrobiologists study the "Gaia Hypothesis" and use the James Webb Space Telescope to search exoplanet atmospheres for living biosignatures (oxygen, methane, and bioluminescence)!',
    quickStats: [
      { label: 'Cosmic Classification', value: 'Celestial Biological Megastructure (Self-Assembled Matter)' },
      { label: 'Guardians Vol. 2 Heroes', value: 'Baby Groot, Rocket, Yondu, Star-Lord, Gamora, Drax & Mantis' },
      { label: 'Core Weakness', value: 'Central Bioluminescent Brain Core (Destroyed by Baby Groot’s Bomb!)' },
      { label: 'Real Science Link', value: 'Exoplanet Biosignatures (JWST Spectroscopy) & Bioluminescent Oceans' }
    ],
    funFacts: [
      'Rocket handed Baby Groot the detonator at Ego’s glowing brain core and desperately tried to explain which button NOT to press ("That’s the button that will kill everyone! Try again!")!',
      'Real Astrophysics: On Earth, trillions of bioluminescent dinoflagellates and bacteria make entire ocean waves glow electric blue at night—visible even from satellites in orbit!'
    ],
    travelTimes: {
      light: 'Uncharted sector beyond Berhert',
      jumpPoint: '700 Jumps (do NOT do more than 50 at once or your faces get stretchy!)',
      bifrost: 'Direct Bifrost coordinates'
    }
  },

  hala: {
    id: 'hala',
    name: 'Hala (Capital of the Kree Empire)',
    pronunciation: 'HAH-lah',
    category: 'High-Tech Ecumenopolis Planet (Pama System)',
    scaleIndex: 3,
    badge: '🛡️ Capital of the Kree & Starforce',
    color: '#38bdf8',
    kidSummary:
      'Hala is the gleaming blue-and-silver metropolis planet of the Kree Empire—governed for centuries by the artificial intelligence Supreme Intelligence and connected across galaxies by hexagonal Jump Points! Real-Science Connection: In The Marvels (2023), when Hala’s sun dimmed into a dying star, Captain Marvel (Carol Danvers) flew straight into its core and reignited nuclear fusion—teaching us how real stars shine by fusing hydrogen nuclei into helium at 15 million degrees Celsius!',
    quickStats: [
      { label: 'Empire & Galaxy', value: 'Capital of the Kree Empire (Large Magellanic Cloud / Pama System)' },
      { label: 'Key Figures', value: 'Captain Marvel (Carol Danvers), Ronan the Accuser & Korath' },
      { label: 'Stellar Event', value: 'Hala’s Sun Reignited by Captain Marvel’s Binary Photon Energy!' },
      { label: 'Real Science Link', value: 'Proton-Proton Nuclear Fusion in Stars (15 Million K Core)' }
    ],
    funFacts: [
      'In the comics and MCU, the Kree Empire resides in the Large Magellanic Cloud (LMC)—a real satellite galaxy orbiting our Milky Way 163,000 light-years away!',
      'Real Astrophysics: Our Sun fuses 600 million tons of hydrogen into helium every single second, converting 4 million tons of matter directly into pure sunlight via Einstein’s E = mc²!'
    ],
    travelTimes: {
      light: '163,000 years (Large Magellanic Cloud)',
      jumpPoint: '2 Hexagonal Jumps via the Kree-Xandarian Jump Network',
      bifrost: 'Instantaneous intergalactic Bifrost transit'
    }
  },

  // =========================================================================
  // SCALE 4: CELESTIALS, INFINITY STONES & MULTIVERSE
  // =========================================================================
  arishem: {
    id: 'arishem',
    name: 'Arishem the Prime Celestial & The 6 Infinity Stones',
    pronunciation: 'AIR-ih-shem',
    category: 'Prime Celestial Architect & Cosmic Singularities',
    scaleIndex: 4,
    badge: '🔮 Creator of the First Sun & 6 Infinity Stones!',
    color: '#f43f5e',
    kidSummary:
      'Towering at the grandest scale of the Marvel Universe is Arishem the Judge—the Prime Celestial who ignited the very first stars, galaxies, and light in the cosmos—surrounded by the 6 glowing Infinity Stones (Space/Blue, Mind/Yellow, Reality/Red, Power/Purple, Time/Green, Soul/Orange)! Real-Science Connection: As Wong and The Collector explain, "Before creation itself, there were six singularities. Then the universe exploded into existence, and the remnants of these systems were forged into concentrated ingots: Infinity Stones." In real cosmology, this mirrors the Big Bang (13.8 billion years ago) and the first Population III stars that lit up the Cosmic Dawn!',
    quickStats: [
      { label: '6 Infinity Stones', value: '🔵 Space • 🟡 Mind • 🔴 Reality • 🟣 Power • 🟢 Time • 🟠 Soul' },
      { label: 'Prime Celestial', value: 'Arishem the Judge (6-Eyed Crimson Cosmic Architect)' },
      { label: 'Multiverse Nexus', value: 'Loki’s Golden Yggdrasil Multiverse Timeline Tree' },
      { label: 'Real Science Link', value: 'The Big Bang Singularity (13.8B yrs), 4 Fundamental Forces & Population III Stars' }
    ],
    funFacts: [
      'Each Infinity Stone governs a fundamental aspect of the cosmos—mirroring how real physicists study Spacetime (Space + Time), Matter-Energy (Power + Reality), and Information/Entropy!',
      'At the end of Loki Season 2, Loki gathered the infinite branching timelines of the Multiverse and wove them into a living, glowing Yggdrasil World-Tree at the End of Time!',
      'Real Astrophysics: About 100–200 million years after the Big Bang, the real "Cosmic Dawn" began when the first giant Population III stars ignited and ended the cosmic dark ages—a moment NASA’s James Webb Space Telescope is observing right now!'
    ],
    travelTimes: {
      light: '13.8 billion years (Across the Observable Universe)',
      jumpPoint: 'Beyond the Universal Jump Network (Requires Infinity Stones or TVA TempPad)',
      bifrost: 'Connected to the roots of the Multiverse Yggdrasil Tree'
    }
  }
};

export const MARVEL_OBJECTS_ES = {
  benatar: {
    name: 'El Benatar (Nave M de los Guardianes)',
    pronunciation: 'BEN-a-tar',
    category: 'Nave Estelar de los Guardianes de la Galaxia',
    badge: '🦝 ¡La Nave de Star-Lord, Rocket y Groot!',
    kidSummary:
      'El Benatar (sucesora del Milano) es la icónica nave espacial naranja y plateada pilotada por Star-Lord, Gamora, Rocket, Groot, Drax, Mantis ¡e incluso Thor ("Asgardianos de la Galaxia")! Conexión Científica Real: Mientras el Benatar cruza galaxias por portales hexagonales, las naves reales de la NASA usan propulsores iónicos de xenón que brillan en color azul cian igual que sus motores.',
    quickStats: [
      { label: 'Tripulación Marvel', value: 'Star-Lord, Rocket, Groot, Gamora, Drax, Mantis y Thor' },
      { label: 'Clase y Cápsula', value: 'Nave Clase-M + Cápsula Espacial Desmontable (viaje a Nidavellir)' },
      { label: 'Sistema Musical', value: 'Zune y Altavoces Awesome Mix Vol. 1–3' },
      { label: 'Ciencia Real', value: 'Propulsores Iónicos de Xenón NEXT-C de la NASA' }
    ],
    funFacts: [
      'Nombrada en honor a la cantante de rock Pat Benatar, lleva una cápsula trasera desmontable con la que Thor, Rocket y Groot viajaron a la estrella de neutrones de Nidavellir.',
      'En Avengers: Endgame, Capitana Marvel rescató a Tony Stark y Nebula del espacio profundo a bordo del Benatar.',
      'Astrofísica Real: ¡Los motores iónicos de las sondas Dawn y Psyche de la NASA brillan con una luz azul-cian real al ionizar gas xenón con electricidad solar!'
    ],
    travelTimes: {
      light: '0.02 segundos desde la superficie de la Tierra',
      jumpPoint: 'Instantáneo entre galaxias mediante Puntos de Salto hexagonales',
      bifrost: '0.5 segundos mediante el rayo Bifrost del Stormbreaker'
    }
  },

  newAsgard: {
    name: 'Nuevo Asgard (Tønsberg, Midgard)',
    pronunciation: 'NWE-vo AS-gard',
    category: 'Hogar Asgardiano en la Tierra-616 (Noruega)',
    badge: '⚡ El Reino Costero de la Rey Valquiria',
    kidSummary:
      'Tras el Ragnarok, Thor, la Rey Valquiria, Korg y Miek fundaron Nuevo Asgard en el pueblo costero de Tønsberg, Noruega (Midgard)—¡el mismo lugar donde Odín escondió el Teseracto (Gema del Espacio) en el año 965 d.C.! Conexión Científica Real: Noruega se ubica bajo la cúspide magnética polar de la Tierra, donde el viento solar crea las auroras boreales que inspiraron los mitos vikingos del Bifrost.',
    quickStats: [
      { label: 'Ubicación en Midgard', value: 'Costa de Tønsberg, Noruega (59.27° N, 10.41° E)' },
      { label: 'Gobernante y Héroes', value: 'Rey Valquiria, Thor Odinson, Korg y Miek' },
      { label: 'Gema del Infinito', value: 'El Teseracto (Gema del Espacio) estuvo oculto aquí 1,000 años' },
      { label: 'Ciencia Real', value: 'Aurora Boreal (Viento Solar + Magnetosfera a 100–300 km)' }
    ],
    funFacts: [
      'Odín eligió Noruega antes de partir: "Asgard no es un lugar; nunca lo fue. Asgard es donde está nuestro pueblo."',
      'Barcos vikingos voladores impulsados por runas asgardianas recorren los fiordos.',
      'Astrofísica Real: ¡Las cortinas verdes de la aurora boreal ocurren cuando electrones solares chocan con átomos de oxígeno a 100 km de altura!'
    ],
    travelTimes: {
      light: '0.01 segundos desde la órbita terrestre',
      jumpPoint: '3 horas en Quinjet',
      bifrost: 'Aterrizaje instantáneo del Bifrost en el acantilado'
    }
  },

  asgard: {
    name: 'Asgard y el Puente Arcoíris Bifrost',
    pronunciation: 'AS-gard',
    category: 'Corona de los Nueve Reinos (Yggdrasil)',
    badge: '⚡ Hogar de Thor, Odín y Loki',
    kidSummary:
      'Asgard es el resplandeciente reino dorado de Thor, Odín, Frigga, Loki y Heimdall: un continente cristalino flotante coronado por el Palacio Dorado del Valhalla y conectado al cosmos por el Puente Arcoíris Bifrost de 7 colores. Conexión Científica Real: En Thor (2011), la astrofísica Jane Foster explica que el Bifrost es un Puente de Einstein-Rosen: ¡un agujero de gusano real del espacio-tiempo predicho por la Relatividad General de Albert Einstein en 1935!',
    quickStats: [
      { label: 'Reino y Árbol Cósmico', value: 'Primero de los Nueve Reinos en las Ramas de Yggdrasil' },
      { label: 'Héroes y Guardianes', value: 'Thor Odinson, Heimdall, Odín, Loki y Lady Sif' },
      { label: 'Reliquias de la Bóveda', value: 'Teseracto (Espacio), Cofre de los Antiguos Inviernos y Llama Eterna' },
      { label: 'Ciencia Real', value: 'Puente de Einstein-Rosen (Agujero de Gusano de la Relatividad General)' }
    ],
    funFacts: [
      'El Observatorio de Heimdall al final del Puente Arcoíris canaliza energía oscura para abrir portales hacia cualquiera de los Nueve Reinos.',
      'Desde el borde cristalino de Asgard, las cascadas caen directamente hacia el espacio estelar.',
      'Astrofísica Real: ¡Un agujero de gusano real curvaría la luz de las estrellas a su alrededor mediante lente gravitacional, creando un anillo luminoso multicolor!'
    ],
    travelTimes: {
      light: 'Cruza sectores cósmicos en segundos por el Bifrost',
      jumpPoint: '3 Saltos por la Red Universal de Teletransporte',
      bifrost: 'Instantáneo (con la espada Hofund de Heimdall)'
    }
  },

  nidavellir: {
    name: 'Nidavellir (Forja Dyson de Estrella de Neutrones)',
    pronunciation: 'NEE-da-vel-ir',
    category: 'Forja de Anillos Dyson Enanos (Nueve Reinos)',
    badge: '🔨 ¡Donde se forjaron Mjolnir y Stormbreaker!',
    kidSummary:
      'Nidavellir es el legendario reino-forja donde el rey Eitri usó el corazón ardiente de una estrella moribunda para forjar el martillo Mjolnir de Thor, el hacha Stormbreaker (¡con el brazo de Groot como mango!) y el Guantelete del Infinito. Conexión Científica Real: ¡Nidavellir combina dos maravillas astrofísicas reales: una Estrella de Neutrones (un núcleo estelar de solo 20 km donde 1 cucharadita pesa mil millones de toneladas) rodeada por una megaestructura de Anillos de Dyson!',
    quickStats: [
      { label: 'Megaestructura Cósmica', value: 'Esfera/Anillos de Dyson alrededor de una Estrella de Neutrones' },
      { label: 'Equipo de Forja', value: 'Rey Eitri, Thor, Rocket Raccoon (en cápsula) y Groot Adolescente' },
      { label: 'Creaciones Legendarias', value: 'Mjolnir, Stormbreaker (Hacha Bifrost) y Guantelete del Infinito' },
      { label: 'Ciencia Real', value: 'Estrella de Neutrones / Púlsar (10¹⁴ g/cm³) + Anillo de Freeman Dyson (1960)' }
    ],
    funFacts: [
      'Cuando los anillos de Nidavellir se congelaron, Rocket voló su pequeña cápsula mientras Thor giraba un cable para volver a encender la estrella.',
      'Groot levantó el metal Uru incandescente y unió su propio brazo de madera para formar el mango del Stormbreaker.',
      'Astrofísica Real: El físico Freeman Dyson propuso en 1960 que una civilización avanzada podría rodear una estrella con anillos colectores para aprovechar toda su energía, ¡exactamente como Nidavellir!'
    ],
    travelTimes: {
      light: 'Rayo de plasma directo desde los polos magnéticos de la estrella',
      jumpPoint: '18 horas en la cápsula espacial del Benatar',
      bifrost: 'Instantáneo cuando el Stormbreaker invocó el Bifrost hacia Wakanda'
    }
  },

  jotunheim: {
    name: 'Jotunheim (Reino de los Gigantes de Hielo)',
    pronunciation: 'YO-tun-jaim',
    category: 'Mundo Criogénico de Hielo (Nueve Reinos)',
    badge: '❄️ Lugar de Nacimiento de Loki Laufeyson',
    kidSummary:
      'Jotunheim es el oscuro y fracturado reino de hielo del rey Laufey y los Gigantes de Hielo, ¡y el lugar donde nació Loki antes de ser adoptado por Odín! Conexión Científica Real: Jotunheim se parece a los mundos helados reales de nuestro universo, como Europa (luna de Júpiter), Encélado (luna con géiseres de Saturno) y exoplanetas helados errantes.',
    quickStats: [
      { label: 'Clima del Reino', value: 'Mundo Criogénico con Anillos Glaciares Fracturados' },
      { label: 'Personajes Clave', value: 'Loki Laufeyson, Rey Laufey y la Bestia de Hielo' },
      { label: 'Reliquia de Poder', value: 'Cofre de los Antiguos Inviernos' },
      { label: 'Ciencia Real', value: 'Mundos Criovolcánicos (Europa, Encélado y Plutón a −235 °C)' }
    ],
    funFacts: [
      'Sus glaciares flotantes se desprenden hacia el espacio formando anillos brillantes de cristales de hielo.',
      'Astrofísica Real: En mundos ultracongelados como Plutón y Tritón, ¡el hielo de agua es tan duro como la roca de granito y los criovolcanes expulsan nitrógeno líquido!'
    ],
    travelTimes: {
      light: 'Conectado por la Raíz Norte de Yggdrasil',
      jumpPoint: 'Accesible por grietas dimensionales entre reinos',
      bifrost: '2.5 segundos desde el Observatorio de Heimdall'
    }
  },

  muspelheim: {
    name: 'Muspelheim (Reino de Fuego de Surtur)',
    pronunciation: 'MUS-pel-jaim',
    category: 'Mundo Volcánico de Magma (Nueve Reinos)',
    badge: '🔥 Reino del Fuego Eterno y Surtur',
    kidSummary:
      'Muspelheim es un ardiente reino volcánico de ríos de lava, agujas de obsidiana y fuego eterno gobernado por el demonio de fuego Surtur. Conexión Científica Real: Los astrónomos han descubierto "exoplanetas de lava" reales como 55 Cancri e y K2-141b, tan cercanos a sus estrellas que su superficie es un océano de roca fundida a 2,400 °C, ¡además de Ío, la luna volcánica de Júpiter!',
    quickStats: [
      { label: 'Entorno Planetario', value: 'Océanos Globales de Magma y Corteza Volcánica' },
      { label: 'Gobernante y Duelo', value: 'Surtur (Corona de la Llama Eterna) vs. Thor Odinson' },
      { label: 'Escena de Película', value: 'Inicio de Thor: Ragnarok con "Immigrant Song"' },
      { label: 'Ciencia Real', value: 'Exoplanetas de Lava (55 Cancri e, K2-141b) y la luna Ío' }
    ],
    funFacts: [
      'Thor: Ragnarok comienza con Thor en la guarida volcánica de Surtur en Muspelheim antes de invocar a Mjolnir.',
      'Astrofísica Real: ¡En el exoplaneta de lava K2-141b la roca se evapora hacia la atmósfera y llueve piedra fundida en el lado nocturno!'
    ],
    travelTimes: {
      light: 'Conectado por la Rama de Fuego Sur de Yggdrasil',
      jumpPoint: 'Requiere escudos térmicos de alta potencia',
      bifrost: 'Extracción instantánea por el Bifrost'
    }
  },

  knowhere: {
    name: 'Knowhere (Cráneo Celestial y Base de los Guardianes)',
    pronunciation: 'NO-wuer',
    category: 'Cabeza de Celestial Antiguo y Cuartel General',
    badge: '💀 ¡Base de los Guardianes de la Galaxia!',
    kidSummary:
      'Knowhere es una estación cósmica construida dentro de la gigantesca cabeza decapitada de un antiguo Celestial que flota en una colorida nebulosa, ¡y ahora es el hogar y cuartel general oficial de los Guardianes de la Galaxia (Rocket, Groot, Cosmo el Perro Espacial, Kraglin y Adam Warlock)! Conexión Científica Real: Knowhere flota en una nebulosa real similar a la Nebulosa del Cráneo (NGC 246) o la Nebulosa de la Hélice, donde estrellas moribundas enriquecen el espacio con oro, hierro y calcio.',
    quickStats: [
      { label: 'Estructura y Escala', value: 'Cráneo de un Celestial Antiguo (~16 km) dentro de una Nebulosa' },
      { label: 'Equipo Guardianes', value: 'Star-Lord, Rocket, Groot, Cosmo, Nebula, Drax y Mantis' },
      { label: 'Gema del Infinito', value: '🔴 El Éter (Gema de la Realidad) guardado aquí por El Coleccionista' },
      { label: 'Ciencia Real', value: 'Nebulosas Planetarias y Restos de Supernova (Nebulosa del Cráneo NGC 246)' }
    ],
    funFacts: [
      'En el Especial de las Fiestas y Guardianes Vol. 3, los Guardianes compraron Knowhere al Coleccionista y lo reconstruyeron con música y luces junto a Cosmo el Perro Espacial.',
      'Astrofísica Real: ¡El calcio de nuestros huesos y el hierro de nuestra sangre se forjaron dentro de estrellas reales que al morir crearon nebulosas brillantes como la de Knowhere!'
    ],
    travelTimes: {
      light: 'Borde del sector de Andrómeda',
      jumpPoint: '2 Saltos Hexagonales desde Xandar en el Benatar',
      bifrost: 'Rayo directo del Bifrost (visitado por Lady Sif y Volstagg)'
    }
  },

  xandar: {
    name: 'Xandar (Capital del Imperio Nova)',
    pronunciation: 'ZAN-dar',
    category: 'Capital de los Nova Corps (Galaxia de Andrómeda M31)',
    badge: '🌟 ¡Donde se Unieron los Guardianes!',
    kidSummary:
      'Xandar es el resplandeciente mundo azul y esmeralda en la Galaxia de Andrómeda (M31), capital de los Nova Corps y la ciudad donde Star-Lord, Gamora, Rocket, Groot ("Nosotros somos Groot") y Drax se tomaron de las manos para controlar la Gema del Poder. Conexión Científica Real: Xandar orbita tres soles en la verdadera Galaxia de Andrómeda (M31), situada a 2.54 millones de años luz con más de 1 billón de estrellas.',
    quickStats: [
      { label: 'Galaxia y Sistema', value: 'Galaxia de Andrómeda (M31) • Sistema de 3 Soles' },
      { label: 'Evento Histórico', value: 'Nacimiento de los Guardianes de la Galaxia y derrota de Ronan' },
      { label: 'Red de Defensa', value: 'Escudo Entrelazado de Naves Nova Doradas + Bóveda del Orbe' },
      { label: 'Ciencia Real', value: 'Galaxia de Andrómeda M31 (2.54M al) y Planetas Circumbinarios (Kepler-16b)' }
    ],
    funFacts: [
      'Durante la Batalla de Xandar, cientos de cazas dorados de los Nova Corps unieron sus alas para formar una red de energía gigante y frenar la nave Dark Aster.',
      'Astrofísica Real: ¡Los telescopios Kepler y TESS de la NASA han descubierto planetas reales que orbitan dos o tres soles a la vez (como Kepler-16b y LTT 1445Ab)!'
    ],
    travelTimes: {
      light: '2.54 millones de años desde la Tierra (Andrómeda M31)',
      jumpPoint: '3 Saltos Hexagonales desde Midgard (~15 minutos)',
      bifrost: 'Tránsito intergaláctico del Bifrost'
    }
  },

  morag: {
    name: 'Morag (Templo Oceánico de la Gema del Poder)',
    pronunciation: 'MO-rag',
    category: 'Planeta Templo Sumergido',
    badge: '🟣 ¡El Baile de Star-Lord y el Orbe!',
    kidSummary:
      'Morag es un planeta oceánico tormentoso cuyos mares retroceden solo una vez cada 300 años, descubriendo el antiguo templo donde Peter Quill (Star-Lord) bailó al ritmo de "Come and Get Your Love" y encontró el Orbe con la Gema del Poder. Conexión Científica Real: La marea extrema de 300 años de Morag refleja la resonancia orbital real, y los astrónomos han descubierto "mundos oceánicos hicianos" reales como K2-18b y Kepler-22b.',
    quickStats: [
      { label: 'Ciclo Planetario', value: 'El Océano Global Retrocede Cada 300 Años' },
      { label: 'Visitado Por', value: 'Star-Lord (2014) y War Machine + Nebula (2023)' },
      { label: 'Gema del Infinito', value: '🟣 La Gema del Poder (dentro del Orbe metálico)' },
      { label: 'Ciencia Real', value: 'Resonancia de Mareas y Mundos Oceánicos (Kepler-22b / K2-18b)' }
    ],
    funFacts: [
      'En Avengers: Endgame, Nebula y War Machine viajaron al Morag de 2014 y vieron a Star-Lord bailando y cantando.',
      'Astrofísica Real: Cuando varias lunas se alinean en resonancia orbital, su gravedad combinada produce mareas gigantescas y géiseres hidrotermales.'
    ],
    travelTimes: {
      light: 'Sector de Andrómeda',
      jumpPoint: '1 Salto Hexagonal desde Xandar en el Milano / Benatar',
      bifrost: 'Accesible por GPS espacio-temporal cuántico o Bifrost'
    }
  },

  sovereign: {
    name: 'Sovereign (Mundos Batería Dorados)',
    pronunciation: 'SOV-rin',
    category: 'Cúmulo Planetario Dorado Artificial',
    badge: '✨ Hogar de Ayesha y Adam Warlock',
    kidSummary:
      'Sovereign es un deslumbrante conjunto de mundos geométricos de oro puro unidos por anillos orbitales, gobernado por la Suma Sacerdotisa Ayesha, donde los Guardianes lucharon contra el monstruo interdimensional Abilisk para proteger las Baterías Anulax y donde nació Adam Warlock. Conexión Científica Real: El oro del universo se forja únicamente cuando chocan dos estrellas de neutrones reales (una kilonova), y el telescopio espacial James Webb de la NASA recubre sus 18 espejos hexagonales con oro real.',
    quickStats: [
      { label: 'Arquitectura', value: 'Mundos Facetados de Oro Metálico y Anillos Orbitales' },
      { label: 'Personajes', value: 'Suma Sacerdotisa Ayesha, Adam Warlock, Baby Groot y Rocket' },
      { label: 'Fuente de Energía', value: 'Baterías Cuánticas Anulax' },
      { label: 'Ciencia Real', value: 'Kilonovas de Estrellas de Neutrones (Origen del Oro) y Espejos del JWST' }
    ],
    funFacts: [
      '¡Baby Groot bailó "Mr. Blue Sky" mientras los Guardianes se enfrentaban a la bestia dimensional en la plaza dorada de Sovereign!',
      'Astrofísica Real: El telescopio James Webb usa espejos recubiertos de oro porque el oro refleja el 99% de la luz infrarroja de las primeras galaxias.'
    ],
    travelTimes: {
      light: 'Cúmulo Dorado en el Sector de los Guardianes',
      jumpPoint: '1 Salto hasta el planeta boscoso Berhert',
      bifrost: 'Alineación directa con el faro dorado'
    }
  },

  counterEarth: {
    name: 'Contra-Tierra (Halfworld / Guardianes Vol. 3)',
    pronunciation: 'KON-tra TIE-rra',
    category: 'Tierra Espejo Bio-Ingenierizada',
    badge: '🌍 Guardianes de la Galaxia Vol. 3',
    kidSummary:
      'La Contra-Tierra es un mundo espejo creado por el Alto Evolucionador en Guardianes de la Galaxia Vol. 3, orbitado por la nave piramidal Arête, donde el pequeño Rocket Raccoon, Lylla, Teefs y Floor soñaban con volar juntos hacia el cielo eterno y hermoso. Conexión Científica Real: El concepto de "Contra-Tierra" se relaciona con el Punto de Lagrange L3: uno de los 5 puntos de equilibrio gravitacional en la órbita de un planeta.',
    quickStats: [
      { label: 'Corazón de la Historia', value: 'El Origen de Rocket ("Me llamo Rocket. Rocket Raccoon.")' },
      { label: 'Hito Orbital', value: 'Nave Piramidal Arête y Continentes Espejo' },
      { label: 'Misión de Rescate', value: '¡Los Guardianes rescataron a todos los niños y animales hacia Knowhere!' },
      { label: 'Ciencia Real', value: 'Puntos de Lagrange Sol-Tierra (L3) y Biofirmas Planetarias' }
    ],
    funFacts: [
      'En Guardianes Vol. 3, Rocket y los Guardianes salvaron a cientos de mapaches, cachorros y animales espaciales, llevándolos a vivir a salvo en Knowhere.',
      'Astrofísica Real: Cada sistema estrella-planeta tiene 5 Puntos de Lagrange (L1–L5) donde la gravedad se equilibra; el telescopio James Webb orbita en el punto L2.'
    ],
    travelTimes: {
      light: 'Sector espejo orbital',
      jumpPoint: '2 Saltos desde Knowhere a bordo de la nave Bowie',
      bifrost: 'Puente cósmico instantáneo'
    }
  },

  contraxia: {
    name: 'Contraxia (Puerto Helado de los Devastadores)',
    pronunciation: 'kon-TRAK-sia',
    category: 'Planeta Helado de Estrella Moribunda',
    badge: '🌨️ Puerto de Neón de Yondu y Stakar',
    kidSummary:
      'Contraxia es un mundo cubierto de nieve y hielo que orbita un sol agonizante, donde se reúnen los clanes de Devastadores (Ravagers) como Yondu Udonta, Stakar Ogord y Kraglin bajo luces de neón y fuegos artificiales. Conexión Científica Real: Contraxia muestra lo que ocurre cuando una estrella envejece y se enfría hacia una enana blanca, congelando los océanos de sus planetas.',
    quickStats: [
      { label: 'Tipo de Planeta', value: 'Tundra Helada alrededor de una Estrella en Enfriamiento' },
      { label: 'Facciones', value: 'Yondu Udonta, Stakar Ogord, Kraglin y los 100 Clanes Ravager' },
      { label: 'Homenaje', value: 'Funeral de Fuegos Artificiales de los Devastadores para Yondu' },
      { label: 'Ciencia Real', value: 'Enfriamiento de Enanas Blancas y Glaciación "Tierra Bola de Nieve"' }
    ],
    funFacts: [
      'Como el sol de Contraxia se está apagando, enormes calentadores geotérmicos mantienen cálidas sus ciudades espaciales.',
      'Astrofísica Real: ¡Hace 700 millones de años nuestra propia Tierra vivió una etapa de "Tierra Bola de Nieve" donde el hielo cubrió casi todo el planeta!'
    ],
    travelTimes: {
      light: 'Sector de los Devastadores',
      jumpPoint: '¡700 Saltos si tomas el atajo de Rocket y Groot!',
      bifrost: 'Tránsito directo del Bifrost'
    }
  },

  sakaar: {
    name: 'Sakaar y su Gran Agujero de Gusano',
    pronunciation: 'sa-KAR',
    category: 'Planeta de Gladiadores Rodeado de Agujeros de Gusano',
    badge: '🌀 ¡La Arena de Thor, Hulk, Valquiria y Korg!',
    kidSummary:
      'Sakaar es un vibrante planeta rojo, dorado y turquesa rodeado de vórtices espaciales, donde Thor se unió a Hulk ("¡Es un amigo del trabajo!"), Valquiria, Korg y Loki para escapar por el gigantesco agujero de gusano de alta gravedad rumbo a Asgard. Conexión Científica Real: El gran vórtice de Sakaar representa un Agujero de Gusano de Einstein-Rosen combinado con los campos magnéticos extremos de un Magnetar.',
    quickStats: [
      { label: 'Fenómeno Orbital', value: 'Rodeado por más de 18 Agujeros de Gusano Espaciales' },
      { label: 'Equipo Revengers', value: 'Thor, Hulk (Bruce Banner), Valquiria, Loki, Korg y Miek' },
      { label: 'Gran Vórtice', value: 'Puente Einstein-Rosen de Estrella de Neutrones hacia Asgard' },
      { label: 'Ciencia Real', value: 'Agujeros de Gusano de Kip Thorne y Dilatación Temporal Gravitatoria' }
    ],
    funFacts: [
      'Debido a los intensos campos gravitatorios de sus agujeros de gusano, el tiempo pasa a distinto ritmo en Sakaar: ¡un fenómeno real llamado Dilatación Temporal Gravitatoria!',
      'Astrofísica Real: El premio Nobel Kip Thorne calculó las ecuaciones reales de cómo un agujero de gusano curva la luz formando un anillo resplandeciente.'
    ],
    travelTimes: {
      light: 'Borde inexplorado del universo',
      jumpPoint: '18 minutos cruzando el gran Agujero de Gusano hacia Asgard',
      bifrost: 'Alcanzado al caer fuera del rayo del Bifrost'
    }
  },

  marvelTitan: {
    name: 'Titán (Mundo en Ruinas de Thanos)',
    pronunciation: 'ti-TAN',
    category: 'Exoplaneta Inclinado con Anillos de Escombros',
    badge: '🪐 ¡Batalla de Guardianes y Vengadores vs. Thanos!',
    kidSummary:
      'En el cosmos de Marvel, Titán es un mundo de cielo ámbar cuyo eje de rotación se desvió 8 grados, fragmentando su luna en anillos flotantes y anomalías gravitatorias, donde Star-Lord, Drax, Mantis, Iron Man, Spider-Man y Doctor Strange lucharon juntos. Conexión Científica Real: Cuando una luna cruza el "Límite de Roche" de un planeta, la fuerza de marea la rompe en un anillo de rocas; ¡y en nuestro Sistema Solar la luna real Titán de Saturno tiene lagos de metano líquido!',
    quickStats: [
      { label: 'Anomalía Planetaria', value: 'Desviación Axial de 8° + Anillo de Luna Fragmentada (Límite de Roche)' },
      { label: 'Alianza Histórica', value: 'Star-Lord, Mantis, Drax, Nebula + Iron Man, Spider-Man y Dr. Strange' },
      { label: 'Gema del Infinito', value: '🟢 Gema del Tiempo (1 futuro ganador entre 14,000,605)' },
      { label: 'Ciencia Real', value: 'Límite de Roche (1848) + Titán, la Luna Real de Saturno (Misión Huygens)' }
    ],
    funFacts: [
      'Doctor Strange usó la Gema del Tiempo en Titán para explorar 14,000,605 futuros posibles.',
      'Astrofísica Real: Édouard Roche demostró en 1848 que si una luna se acerca demasiado a su planeta (el Límite de Roche), la gravedad la desmenuza formando anillos como los de Saturno.'
    ],
    travelTimes: {
      light: 'Espacio profundo más allá del borde Kree-Nova',
      jumpPoint: '4 Saltos a bordo del Benatar',
      bifrost: '¡Instantáneo con el portal dorado de Doctor Strange hacia la Tierra!'
    }
  },

  vormir: {
    name: 'Vormir (Santuario del Eclipse de la Gema del Alma)',
    pronunciation: 'VOR-mir',
    category: 'Mundo Desértico de Eclipse Eterno (Sistema Helgentar)',
    badge: '🟠 Centro de la Existencia Celestial (Gema del Alma)',
    kidSummary:
      'Vormir es un misterioso mundo de dunas violetas y ámbar en el sistema Helgentar, coronado por dos picos montañosos bajo un cielo en eclipse solar permanente, donde reposa la Gema del Alma naranja. Conexión Científica Real: Un eclipse permanente ocurre mediante Acoplamiento de Marea y el Punto de Lagrange L1, igual que los satélites solares reales que mantienen la Luna o la Tierra fija frente al Sol.',
    quickStats: [
      { label: 'Fenómeno Celeste', value: 'Eclipse Solar de "Anillo de Fuego" Permanente en el Cielo' },
      { label: 'Gema del Infinito', value: '🟠 La Gema del Alma (en el Altar de los Dos Picos)' },
      { label: 'Descripción Cósmica', value: '"En el centro mismo de la existencia celestial"' },
      { label: 'Ciencia Real', value: 'Acoplamiento de Marea, Punto de Lagrange L1 y Eclipses Anulares' }
    ],
    funFacts: [
      'Al obtener la Gema del Alma en Vormir, un rayo de luz naranja asciende directamente hacia la corona del eclipse en el cielo.',
      'Astrofísica Real: ¡En un eclipse solar anular ("anillo de fuego"), la Luna cubre el centro del Sol dejando visible un brillante anillo dorado de la corona solar!'
    ],
    travelTimes: {
      light: 'Sistema Helgentar',
      jumpPoint: '3 Saltos desde Morag a bordo del Benatar',
      bifrost: 'Coordenadas cósmicas directas'
    }
  },

  ego: {
    name: 'Ego el Planeta Viviente',
    pronunciation: 'E-go',
    category: 'Planeta Celestial Bioluminiscente (Guardianes Vol. 2)',
    badge: '🧠 ¡Un Núcleo Cerebral Celestial del Tamaño de un Planeta!',
    kidSummary:
      'Ego el Planeta Viviente es un mundo carmesí y magenta formado durante millones de años alrededor del cerebro cósmico de un Celestial, con cavernas de luz neuronal y bosques iridiscentes, derrotado cuando Baby Groot colocó una bomba en su núcleo mientras Rocket, Yondu, Star-Lord, Gamora, Drax y Mantis salvaban la galaxia. Conexión Científica Real: Los astrobiólogos usan el telescopio James Webb para buscar biofirmas reales (oxígeno, metano y bioluminiscencia) en exoplanetas lejanos.',
    quickStats: [
      { label: 'Clasificación', value: 'Megaestructura Biológica Celestial con Cavernas Neuronales' },
      { label: 'Héroes Guardianes Vol. 2', value: 'Baby Groot, Rocket, Yondu, Star-Lord, Gamora, Drax y Mantis' },
      { label: 'Punto Débil', value: 'Núcleo Cerebral Bioluminiscente (¡detonado por Baby Groot!)' },
      { label: 'Ciencia Real', value: 'Biofirmas de Exoplanetas (JWST) y Océanos Bioluminiscentes' }
    ],
    funFacts: [
      '¡Rocket le dio la bomba a Baby Groot en el núcleo de Ego e intentó explicarle qué botón NO debía presionar!',
      'Astrofísica Real: En la Tierra existen bahías bioluminiscentes cuyos microorganismos hacen brillar las olas de color azul eléctrico, ¡visibles incluso desde satélites en el espacio!'
    ],
    travelTimes: {
      light: 'Sector inexplorado más allá de Berhert',
      jumpPoint: '700 Saltos por la Red de Teletransporte',
      bifrost: 'Coordenadas directas del Bifrost'
    }
  },

  hala: {
    name: 'Hala (Capital del Imperio Kree)',
    pronunciation: 'JA-la',
    category: 'Planeta Metrópolis de Alta Tecnología (Sistema Pama)',
    badge: '🛡️ Capital del Imperio Kree',
    kidSummary:
      'Hala es el reluciente planeta azul y plateado del Imperio Kree, conectado entre galaxias por portales de salto hexagonales. Conexión Científica Real: En The Marvels (2023), cuando el sol de Hala se estaba apagando, Capitana Marvel (Carol Danvers) voló a su núcleo y volvió a encender su fusión nuclear, mostrando cómo las estrellas reales brillan al fusionar hidrógeno en helio a 15 millones de grados Celsius.',
    quickStats: [
      { label: 'Imperio y Galaxia', value: 'Capital del Imperio Kree (Gran Nube de Magallanes)' },
      { label: 'Personajes', value: 'Capitana Marvel (Carol Danvers), Ronan y Korath' },
      { label: 'Evento Estelar', value: '¡El Sol de Hala fue reencendido con energía fotónica por Capitana Marvel!' },
      { label: 'Ciencia Real', value: 'Fusión Nuclear Protón-Protón en Estrellas (Núcleo a 15 Millones K)' }
    ],
    funFacts: [
      'El Imperio Kree se sitúa en la Gran Nube de Magallanes, una galaxia satélite real que orbita nuestra Vía Láctea a 163,000 años luz.',
      'Astrofísica Real: ¡Nuestro Sol fusiona 600 millones de toneladas de hidrógeno cada segundo mediante la famosa ecuación de Einstein E = mc²!'
    ],
    travelTimes: {
      light: '163,000 años (Gran Nube de Magallanes)',
      jumpPoint: '2 Saltos Hexagonales por la Red de Saltos Kree-Xandariana',
      bifrost: 'Tránsito intergaláctico del Bifrost'
    }
  },

  arishem: {
    name: 'Arishem el Primer Celestial y las 6 Gemas del Infinito',
    pronunciation: 'A-ri-shem',
    category: 'Arquitecto Celestial Primordial y Singularidades Cósmicas',
    badge: '🔮 ¡Creador del Primer Sol y las 6 Gemas del Infinito!',
    kidSummary:
      'En la escala más grandiosa del Universo Marvel se alza Arishem el Juez —el Primer Celestial que encendió las primeras estrellas y galaxias del cosmos— rodeado por las 6 Gemas del Infinito (Espacio/Azul, Mente/Amarilla, Realidad/Roja, Poder/Púrpura, Tiempo/Verde, Alma/Naranja). Conexión Científica Real: Como explican Wong y El Coleccionista, antes de la creación existían seis singularidades que tras el Big Bang se condensaron en las Gemas del Infinito. En la cosmología real, esto refleja el Big Bang (hace 13,800 millones de años) y las primeras estrellas de Población III del Amanecer Cósmico.',
    quickStats: [
      { label: 'Las 6 Gemas del Infinito', value: '🔵 Espacio • 🟡 Mente • 🔴 Realidad • 🟣 Poder • 🟢 Tiempo • 🟠 Alma' },
      { label: 'Celestial Primordial', value: 'Arishem el Juez (Arquitecto Cósmico de 6 Ojos)' },
      { label: 'Nexo del Multiverso', value: 'El Árbol del Multiverso Yggdrasil tejido por Loki' },
      { label: 'Ciencia Real', value: 'El Big Bang (13,800M años), las 4 Fuerzas Fundamentales y el Amanecer Cósmico' }
    ],
    funFacts: [
      'Cada Gema del Infinito representa una propiedad fundamental del universo, igual que la física estudia el Espacio-Tiempo, la Materia-Energía y la Entropía.',
      'Al final de la temporada 2 de Loki, Loki reunió las ramas del Multiverso formando un brillante árbol Yggdrasil viviente.',
      'Astrofísica Real: ¡Unos 100 millones de años después del Big Bang se encendieron las primeras estrellas gigantes del universo ("Amanecer Cósmico"), que hoy observa el telescopio James Webb!'
    ],
    travelTimes: {
      light: '13,800 millones de años (A través del Universo Observable)',
      jumpPoint: 'Más allá de la Red de Saltos (Requiere Gemas del Infinito o TempPad de la AVT)',
      bifrost: 'Conectado a las raíces del Árbol del Multiverso Yggdrasil'
    }
  }
};

export const MARVEL_OBJECTS_ZH = {
  benatar: {
    name: '贝纳塔号飞船 (银河护卫队 M 级星舰)',
    pronunciation: 'Bèi-nà-tǎ Hào',
    category: '银河护卫队主力飞船',
    badge: '🦝 星爵、火箭浣熊与格鲁特的座驾',
    kidSummary:
      '贝纳塔号（米兰诺号的继任舰、鲍伊号的前身）是星爵、卡魔拉、火箭浣熊、格鲁特、德拉克斯、螳螂女以及雷神索尔（“阿斯加德护卫队”）驾驶的标志性橙银双色 M 级星际飞船！真实科学连接：虽然贝纳塔号通过六边形虫洞跳跃点跨越星系，但 NASA 真实的深空探测器使用太阳能氙离子推进器，同样会喷射出璀璨的蓝青色电离尾焰！',
    quickStats: [
      { label: '护卫队船员', value: '星爵、火箭浣熊、格鲁特、卡魔拉、德拉克斯、螳螂女与雷神' },
      { label: '舰船结构', value: 'M 级侦察星舰 + 可分离式太空舱（曾飞往尼达维勒）' },
      { label: '车载音响', value: 'Zune 播放器与《劲歌金曲 Vol. 1–3》环绕立体声' },
      { label: '真实科学对应', value: 'NASA NEXT-C 氙离子推进器与霍尔效应电推进技术' }
    ],
    funFacts: [
      '飞船以摇滚传奇女歌手 Pat Benatar 命名，尾部配有一艘可分离太空舱——雷神、火箭浣熊和格鲁特正是乘它飞往尼达维勒中子星熔炉！',
      '在《复仇者联盟4：终局之战》开头，惊奇队长将困在深空的托尼·斯塔克和星云连同整艘贝纳塔号一起救回地球。',
      '真实天体物理：NASA“黎明号”和“灵神星号”探测器的氙离子发动机在太空中工作时，真的会发出与贝纳塔号一模一样的炫酷蓝光！'
    ],
    travelTimes: {
      light: '距地球表面仅 0.02 光秒',
      jumpPoint: '通过六边形空间跳跃点可跨星系瞬间抵达',
      bifrost: '通过暴风战斧召唤彩虹桥仅需 0.5 秒'
    }
  },

  newAsgard: {
    name: '新阿斯加德 (米德加德·挪威滕斯贝格)',
    pronunciation: 'Xīn Ā-sī-jiā-dé',
    category: '地球-616 阿斯加德人新家园 (挪威)',
    badge: '⚡ 女武神瓦尔基里的海岸王国',
    kidSummary:
      '诸神黄昏摧毁旧神域后，雷神索尔、女武神瓦尔基里、科 org 与米克在地球（米德加德）挪威风景如画的滕斯贝格海岸建立了“新阿斯加德”——这里正是公元 965 年奥丁隐藏宇宙魔方（空间宝石）的地方！真实科学连接：挪威位于地球北极磁层顶正下方，太阳风粒子在这里激发出绚丽的北极光，正是北欧神话中“彩虹桥”的灵感来源！',
    quickStats: [
      { label: '地球坐标', value: '挪威韦斯特福尔郡滕斯贝格海岸 (59.27° N, 10.41° E)' },
      { label: '国王与守护者', value: '女武神瓦尔基里国王、雷神索尔、石头人科尔格与米克' },
      { label: '无限宝石历史', value: '宇宙魔方（空间宝石）曾被奥丁在此珍藏千年' },
      { label: '真实科学对应', value: '北极光 (太阳风高能带电粒子撞击 100–300 公里高层大气)' }
    ],
    funFacts: [
      '奥丁在化作星光前曾在这里对索尔和洛基说：“阿斯加德不是一个地方，从来都不是。阿斯加德人民所在之处，就是阿斯加德。”',
      '真实天体物理：挪威夜空舞动的绿色极光，是太阳风电子撞击地面以上 100 公里处的氧原子所发出的特征光谱！'
    ],
    travelTimes: {
      light: '从近地轨道出发仅需 0.01 秒',
      jumpPoint: '乘昆式喷气机约 3 小时',
      bifrost: '彩虹桥光束可直接降落在海边悬崖符文阵上'
    }
  },

  asgard: {
    name: '阿斯加德与比弗罗斯特彩虹桥',
    pronunciation: 'Ā-sī-jiā-dé',
    category: '九大国度之冠 (世界树尤克特拉希尔)',
    badge: '⚡ 雷神索尔、奥丁与洛基的黄金神域',
    kidSummary:
      '阿斯加德是雷神索尔、奥丁、弗丽嘉、洛基与海姆达尔居住的璀璨黄金神域——一座悬浮在星海中的宏伟水晶大陆，中央耸立着英灵殿黄金管风琴宫殿，并由七彩斑斓的“比弗罗斯特彩虹桥”连接海姆达尔天球仪观测台！真实科学连接：在电影《雷神》中，天体物理学家简·福斯特指出，阿斯加德的彩虹桥在物理学上其实就是“爱因斯坦-罗森桥”——阿尔伯特·爱因斯坦于 1935 年用广义相对论预言的真实时空虫洞！',
    quickStats: [
      { label: '所属星域', value: '世界树（尤克特拉希尔）九大国度之首' },
      { label: '核心英雄', value: '雷神索尔、海姆达尔、奥丁、洛基与希芙女神' },
      { label: '奥丁宝库神器', value: '宇宙魔方（空间宝石）、远古冬棺与永恒之火' },
      { label: '真实科学对应', value: '爱因斯坦-罗森桥（广义相对论时空虫洞）与光谱色散' }
    ],
    funFacts: [
      '海姆达尔站在彩虹桥尽头的金色球形天文台中，用守护之剑开启虫洞，可将阿斯加德勇士瞬间传送至九大国度任意一处。',
      '阿斯加德大陆边缘的浩瀚海洋直接化作星际瀑布倾泻进太空深渊！',
      '真实天体物理：当星光穿过强引力虫洞咽喉时，引力透镜效应会使背景星光弯曲成绚丽的彩色光环，宛如真正的宇宙彩虹桥！'
    ],
    travelTimes: {
      light: '通过彩虹桥虫洞可在数秒内跨越星系',
      jumpPoint: '通过宇宙空间跳跃网需 3 次六边形跃迁',
      bifrost: '海姆达尔或暴风战斧可瞬间开启通道'
    }
  },

  nidavellir: {
    name: '尼达维勒 (中子星戴森环神兵熔炉)',
    pronunciation: 'Ní-dá-wéi-lè',
    category: '矮人族戴森环恒星熔炉 (九大国度)',
    badge: '🔨 雷神之锤与暴风战斧的锻造地！',
    kidSummary:
      '尼达维勒是九大国度中传奇的矮人族锻造圣地——矮人王艾崔利用一颗垂死恒星的狂暴核心能量，在这里锻造出了雷神之锤姆乔尔尼尔、暴风战斧（格鲁特用自己的手臂化作斧柄！）以及无限手套！真实科学连接：尼达维勒完美结合了两大真实天体物理学奇观：中心是一颗直径仅 20 公里、一茶匙物质就重达 10 亿吨的“中子星/脉冲星”，外围则是物理学家弗里曼·戴森提出的“戴森环”巨型结构！',
    quickStats: [
      { label: '天体工程奇观', value: '环绕高速自转中子星的三重机械戴森环 (Dyson Ring)' },
      { label: '传奇锻造小队', value: '矮人王艾崔、雷神索尔、火箭浣熊（驾驶太空舱）与少年格鲁特' },
      { label: '不朽神兵', value: '雷神之锤 (Mjolnir)、暴风战斧 (Stormbreaker) 与无限手套' },
      { label: '真实科学对应', value: '中子星/脉冲星 (密度 10¹⁴ g/cm³) + 弗里曼·戴森环 (1960)' }
    ],
    funFacts: [
      '在《复仇者联盟3》中，当尼达维勒的巨型星环结冰卡死时，火箭浣熊驾驶小太空舱配合索尔甩动缆绳，硬生生拉动了行星级星环并重新点燃恒星喷流！',
      '少年格鲁特放下游戏机，举起滚烫的乌鲁神钢斧刃，用自己的树枝手臂生长连接成暴风战斧的握柄，拯救了索尔的生命。',
      '真实天体物理：大质量恒星超新星爆发后坍缩成中子星，磁场比地球强上万亿倍，两极会喷射出高能电磁束——就像尼达维勒熔炉导引的恒星光束一样！'
    ],
    travelTimes: {
      light: '中子星磁极等离子体光束直达熔炉核心',
      jumpPoint: '乘贝纳塔号可分离太空舱约 18 小时',
      bifrost: '暴风战斧铸成后瞬间召唤彩虹桥飞抵地球瓦坎达！'
    }
  },

  jotunheim: {
    name: '约顿海姆 (冰霜巨人国度)',
    pronunciation: 'Yuē-dùn-hǎi-mǔ',
    category: '极寒冰封星球 (九大国度)',
    badge: '❄️ 洛基的出生地与冰霜之国',
    kidSummary:
      '约顿海姆是冰霜巨人之王劳菲统治的幽暗极寒冰封国度，也是洛基在婴儿时期被奥丁收养前的秘密出生地！真实科学连接：约顿海姆与宇宙中真实的冰冻星球极为相似，例如木星的冰封卫星“木卫二（欧罗巴）”、土星喷发冰泉的“土卫二（恩克拉多斯）”以及表面温度低至 −220 °C 的冰封系外行星。',
    quickStats: [
      { label: '国度环境', value: '极寒冰川大陆与碎裂的环行星冰晶带' },
      { label: '代表人物', value: '洛基·劳菲森、冰霜巨人王劳菲与冰霜巨兽' },
      { label: '核心神器', value: '远古冬棺（可释放极寒冰封能量）' },
      { label: '真实科学对应', value: '冰火山星球（木卫二欧罗巴、土卫二与冥王星）' }
    ],
    funFacts: [
      '失去远古冬棺后，约顿海姆边缘的巨大冰川不断崩解漂浮进太空，形成闪烁的蓝白色冰晶光环。',
      '真实天体物理：在零下 230 摄氏度的冥王星和海卫一上，水冰坚硬得如同花岗岩，而“冰火山”喷发出的岩浆其实是液态氮和甲烷！'
    ],
    travelTimes: {
      light: '连接世界树北方冰封根脉',
      jumpPoint: '可通过九大国度空间裂隙秘道潜入',
      bifrost: '从海姆达尔观测台发射彩虹桥仅需 2.5 秒'
    }
  },

  muspelheim: {
    name: '穆斯贝尔海姆 (苏尔特尔火焰国度)',
    pronunciation: 'Mù-sī-bèi-ěr-hǎi-mǔ',
    category: '熔岩与永恒之火国度 (九大国度)',
    badge: '🔥 火焰巨人苏尔特尔的熔岩世界',
    kidSummary:
      '穆斯贝尔海姆是一颗遍布翻滚熔岩海、黑曜石尖塔与日冕烈焰的炽热国度，由火焰巨人苏尔特尔统治！真实科学连接：天文学家已经发现了真实的“熔岩系外行星”（如巨蟹座 55e 和 K2-141b），它们距离宿主恒星极近，向阳面完全是一片 2,400 °C 的液态岩石海洋——还有木星布满 400 多座活火山的卫星“木卫一（伊奥）”！',
    quickStats: [
      { label: '星球环境', value: '全球硅酸盐岩浆海与潮汐加热火山地壳' },
      { label: '代表角色', value: '火焰巨人苏尔特尔 vs. 雷神索尔' },
      { label: '经典名场面', value: '《雷神3：诸神黄昏》开场索尔伴随《移民之歌》大战火焰巨龙' },
      { label: '真实科学对应', value: '超高温熔岩系外行星 (55 Cancri e, K2-141b) 与木卫一' }
    ],
    funFacts: [
      '在北欧神话中，来自穆斯贝尔海姆的火星飞入宇宙鸿沟，点亮了夜空中的点点繁星。',
      '真实天体物理：在真实的熔岩系外行星 K2-141b 上，岩石会被高温直接蒸发成“岩石云”，随超音速狂风吹到夜半球后下起“石头雨”！'
    ],
    travelTimes: {
      light: '连接世界树南方烈焰星枝',
      jumpPoint: '近轨飞行需开启最高级别隔热护盾',
      bifrost: '彩虹桥紧急传送（“海姆达尔，快开彩虹桥！”）'
    }
  },

  knowhere: {
    name: '虚无知地 Knowhere (天神组头骨与护卫队总部)',
    pronunciation: 'Xū-wú Zhī Dì (NOH-wair)',
    category: '远古天神组巨大头骨空间站 & 银河护卫队总部',
    badge: '💀 银河护卫队的大本营！',
    kidSummary:
      '虚无知地（Knowhere）是一座建造在远古天神组巨大断头颅骨内部的繁华太空前哨站，漂浮在五彩斑斓的星云之中——如今它已成为银河护卫队（火箭浣熊队长、巨型格鲁特、太空狗科斯莫、克拉格林与亚当术士）温馨的官方总部！真实科学连接：虚无知地所在的绚丽星云对应真实宇宙中的“行星状星云”与“超新星遗迹”（如著名的骷髅星云 NGC 246 和上帝之眼螺旋星云 NGC 7293），恒星在那里将钙、铁、金等元素播撒到宇宙中！',
    quickStats: [
      { label: '结构与规模', value: '漂浮在绚丽星云中的远古天神组头骨（跨度约 16 公里）' },
      { label: '常驻护卫队员', value: '火箭浣熊、格鲁特、太空狗科斯莫、星爵、星云与德拉克斯' },
      { label: '无限宝石渊源', value: '🔴 以太粒子（现实宝石）曾由收藏家蒂万在此保管' },
      { label: '真实科学对应', value: '行星状星云与超新星遗迹（骷髅星云 NGC 246 / 螺旋星云）' }
    ],
    funFacts: [
      '在《银河护卫队：圣诞特别篇》和《银河护卫队3》中，护卫队从收藏家手中买下了虚无知地，并在太空狗科斯莫的念力帮助下将它改造成了充满音乐与欢笑的家园！',
      '天神组头骨的眼眶港湾与颅腔内部纵横交错着失重采矿铁轨和黄色球形工程舱。',
      '真实天体物理：正如卡尔·萨根所说“我们皆为星尘”——我们骨骼里的钙和血液里的铁，全都诞生于像虚无知地星云那样真实的恒星熔炉！'
    ],
    travelTimes: {
      light: '位于仙女座星系边缘裂隙带',
      jumpPoint: '乘贝纳塔号从山达尔星经过 2 次六边形跳跃即可抵达',
      bifrost: '可通过彩虹桥直达（希芙与沃斯塔格曾造访此处）'
    }
  },

  xandar: {
    name: '山达尔星 Xandar (新星帝国首都)',
    pronunciation: 'Shān-dá-ěr Xīng (ZAN-dar)',
    category: '新星军团首都星球 (仙女座星系 M31)',
    badge: '🌟 银河护卫队首次集结之地！',
    kidSummary:
      '山达尔星是位于仙女座星系（M31）中的一颗璀璨蓝绿海洋与花园星球，也是新星帝国（Nova Empire）与新星军团的首都。在这里，星爵、卡魔拉、火箭浣熊、格鲁特（“我们是格鲁特”）与德拉克斯首次手拉手分担紫色力量宝石的能量，正式组建了银河护卫队！真实科学连接：山达尔星环绕三颗太阳运行，所在的仙女座星系（M31）是距离地球 254 万光年的真实巨型旋涡星系，拥有超过 1 万亿颗恒星！',
    quickStats: [
      { label: '所属星系与恒星', value: '仙女座星系 (M31) • 三合星系统（拥有三颗太阳）' },
      { label: '传奇历史时刻', value: '银河护卫队在此诞生并携手击败指控者罗南' },
      { label: '行星防御网', value: '新星军团黄金战机连锁光网 + 力量宝石金库' },
      { label: '真实科学对应', value: '仙女座星系 M31 (254万光年) 与多恒星系外行星 (Kepler-16b)' }
    ],
    funFacts: [
      '在山达尔保卫战中，数百架金色新星军团战机首尾相连，在天空中拼成一面巨大的金色六边形能量护盾，抵挡罗南的暗星号巨舰！',
      '山达尔星轨道外悬浮着一座巨大的蓝色六边形“宇宙空间跳跃门”。',
      '真实天体物理：NASA 的开普勒和凌日系外行星巡天卫星（TESS）已经发现了多颗同时围绕两颗或三颗太阳运行的真实行星（如 Kepler-16b 和 LTT 1445Ab）！'
    ],
    travelTimes: {
      light: '距地球 254 万光年（仙女座星系 M31）',
      jumpPoint: '通过六边形空间跳跃网仅需 3 次跃迁（约 15 分钟）',
      bifrost: '跨星系彩虹桥直达通道'
    }
  },

  morag: {
    name: '莫拉格星 Morag (力量宝石海洋神庙星球)',
    pronunciation: 'Mò-lā-gé Xīng (MOR-ag)',
    category: '周期性退潮的深海神庙星球',
    badge: '🟣 星爵开场热舞与宇宙灵球所在地！',
    kidSummary:
      '莫拉格是一颗风暴肆虐的海洋星球，全球海洋每隔 300 年才会退潮一次，露出海底古老的神庙遗迹——星爵（彼得·奎尔）正是在这里伴随《Come and Get Your Love》翩翩起舞，拿到了装有紫色力量宝石的“宇宙灵球”！真实科学连接：莫拉格 300 年一次的极端大退潮源于多体天体轨道共振潮汐力，而天文学家也已在真实宇宙中发现了“氢海型（Hycean）海洋系外行星”如 K2-18b 和开普勒-22b！',
    quickStats: [
      { label: '行星海洋周期', value: '全球大洋每 300 年退潮一次，显露远古神庙金库' },
      { label: '造访英雄', value: '星爵 (2014) 以及战争机器与星云 (2023 时空劫持)' },
      { label: '无限宝石', value: '🟣 力量宝石（封印于金属宇宙灵球 The Orb 之中）' },
      { label: '真实科学对应', value: '极端轨道共振潮汐与海洋系外行星 (K2-18b / Kepler-22b)' }
    ],
    funFacts: [
      '在《复仇者联盟4》中，星云和战争机器穿越回 2014 年的莫拉格星，亲眼看到没有背景音乐的星爵拿着蜥蜴麦克风边唱边跳！',
      '真实天体物理：当多颗卫星处于轨道共振状态（如木卫一、木卫二和木卫三的 4:2:1 拉普拉斯共振）时，叠加的引力会掀起巨大的行星潮汐与热泉喷发！'
    ],
    travelTimes: {
      light: '位于仙女座星区',
      jumpPoint: '从山达尔星乘米兰诺号/贝纳塔号仅需 1 次空间跳跃',
      bifrost: '可通过量子领域时空 GPS 或彩虹桥抵达'
    }
  },

  sovereign: {
    name: '索维林星 Sovereign (黄金电池星球群)',
    pronunciation: 'Suǒ-wéi-lín Xīng (SOV-rin)',
    category: '人工雕琢的几何黄金行星群',
    badge: '✨ 大祭司阿耶莎与亚当术士的故乡',
    kidSummary:
      '索维林是由多颗闪烁着纯金金属光泽的几何切面星球与金色星环组成的壮丽天体工程奇观，由大祭司阿耶莎统治。银河护卫队曾在这里大战跨维度怪兽守护珍贵的“阿努拉克斯电池”，亚当术士也诞生于此！真实科学连接：宇宙中所有的黄金都诞生于两颗真实中子星相撞引发的“千新星（Kilonova）”爆发；而 NASA 的詹姆斯·韦伯太空望远镜（JWST）也用纯金镀膜打造了 18 块六边形主镜！',
    quickStats: [
      { label: '行星工程形态', value: '多面体纯金金属星球与互锁金色轨道环' },
      { label: '代表角色', value: '大祭司阿耶莎、亚当术士、格鲁特宝宝与火箭浣熊' },
      { label: '核心能源', value: '阿努拉克斯量子电池（被火箭浣熊顺手牵羊！）' },
      { label: '真实科学对应', value: '中子星并合千新星（宇宙黄金的起源）与韦伯望远镜金镜' }
    ],
    funFacts: [
      '在《银河护卫队2》开场，格鲁特宝宝在索维林星的黄金广场上伴随《Mr. Blue Sky》欢快跳舞，而身后护卫队正在与跨维度怪兽激战！',
      '真实天体物理：黄金无法在普通恒星内部合成，只有当两颗中子星剧烈碰撞或超新星爆发时才能锻造出黄金并洒向太空！'
    ],
    travelTimes: {
      light: '位于银河护卫队星区的黄金星团',
      jumpPoint: '1 次六边形空间跳跃即可抵达伯赫特森林星球',
      bifrost: '金色星标直接定位'
    }
  },

  counterEarth: {
    name: '反地球 Counter-Earth (银河护卫队3)',
    pronunciation: 'Fǎn Dì-qiú',
    category: '生物工程镜像地球',
    badge: '🌍 《银河护卫队3》感人篇章',
    kidSummary:
      '反地球是至高进化在《银河护卫队3》中打造的地球镜像星球，轨道上停泊着巨型金字塔飞船“阿瑞忒实验室”——年幼的火箭浣熊（89P13）、水獭莱拉、海象蒂夫斯和兔子弗洛尔曾在这里仰望星空，梦想一起飞向“永恒而美丽的蓝天”！真实科学连接：“反地球”概念最早可追溯至古希腊天文学，而在现代天体力学中对应太阳-地球系统的“第三拉格朗日点（L3）”——五个引力平衡点之一！',
    quickStats: [
      { label: '故事核心', value: '火箭浣熊的身世起源（“我叫火箭，火箭浣熊。”）' },
      { label: '轨道地标', value: '金字塔形阿瑞忒星舰与镜像海陆分布' },
      { label: '护卫队壮举', value: '全员联手救出所有孩子与整船小动物，带回虚无知地！' },
      { label: '真实科学对应', value: '日地拉格朗日点 (L1–L5) 与系外行星生物特征识别' }
    ],
    funFacts: [
      '在《银河护卫队3》高潮，护卫队不仅救出了飞船上的所有孩童，还把数百只小浣熊、小狗和太空动物全部安全接回了虚无知地！',
      '真实天体物理：任何行星与恒星之间都存在 5 个引力平衡的“拉格朗日点”（L1–L5），NASA 的詹姆斯·韦伯太空望远镜就运行在日地 L2 点上！'
    ],
    travelTimes: {
      light: '位于镜像轨道扇区',
      jumpPoint: '乘护卫队新旗舰“鲍伊号”经过 2 次跳跃抵达',
      bifrost: '彩虹桥跨星区直达'
    }
  },

  contraxia: {
    name: '康特拉夏星 Contraxia (掠夺者冰雪港湾)',
    pronunciation: 'Kāng-tè-lā-xià Xīng',
    category: '环绕垂死恒星的冰雪星球',
    badge: '🌨️ 勇度与掠夺者舰队的霓虹冰雪港',
    kidSummary:
      '康特拉夏是一颗环绕垂死冷却恒星运行的冰雪星球，勇度·乌东塔、斯塔卡·奥戈德与克拉格林等百大掠夺者（Ravagers）氏族常在漫天飞雪与霓虹灯火下聚会，并用绚丽的太空烟花为勇度送行！真实科学连接：康特拉夏展示了真实的恒星演化末期——当一颗类太阳恒星耗尽核燃料冷却为白矮星时，原本温暖的行星就会冻结成冰雪世界。',
    quickStats: [
      { label: '行星地貌', value: '环绕暗淡冷却恒星的极寒暴雪冻原' },
      { label: '活跃阵营', value: '勇度、斯塔卡、克拉格林与掠夺者百大氏族' },
      { label: '感人致敬', value: '掠夺者全舰队为勇度绽放的宇宙璀璨烟花葬礼' },
      { label: '真实科学对应', value: '白矮星冷却演化与“雪球地球”全球冰川期' }
    ],
    funFacts: [
      '由于康特拉夏的太阳正在慢慢熄灭，星球表面依靠巨大的地热反应堆维持太空港城市的温暖。',
      '真实天体物理：大约 7 亿年前，我们自己的地球也曾经历过真实的“雪球地球（Snowball Earth）”时期，当时冰川一直延伸到了赤道！'
    ],
    travelTimes: {
      light: '位于掠夺者星区',
      jumpPoint: '如果让火箭和格鲁特抄近道，得连续跳 700 个跳跃点！',
      bifrost: '彩虹桥直接传送'
    }
  },

  sakaar: {
    name: '萨卡星 Sakaar 与巨型空间虫洞',
    pronunciation: 'Sà-kǎ Xīng (suh-KAR)',
    category: '虫洞环绕的角斗士星球',
    badge: '🌀 雷神、浩克、女武神与科尔格的竞技场！',
    kidSummary:
      '萨卡星是一颗色彩明艳的红金青三色星球，周围环绕着数十个不断旋转的宇宙空间虫洞——雷神索尔在这里偶遇了绿巨人浩克（“他是工作上的朋友！”），并与女武神瓦尔基里、石头人科尔格和洛基组成“报仇者联盟”，驾驶飞船冲进最强引力的大虫洞重返阿斯加德！真实科学连接：萨卡星的巨型漩涡是广义相对论“可穿越爱因斯坦-罗森桥（虫洞）”与强磁星（Magnetar）的可视化模型！',
    quickStats: [
      { label: '轨道天体奇观', value: '全天候被 18 个以上旋转时空虫洞环绕' },
      { label: '报仇者小队', value: '雷神索尔、绿巨人浩克、女武神瓦尔基里、洛基与科尔格' },
      { label: '最大虫洞通道', value: '通往阿斯加德的高重力强磁星爱因斯坦-罗森桥' },
      { label: '真实科学对应', value: '基普·索恩可穿越虫洞模型与引力时间膨胀效应' }
    ],
    funFacts: [
      '由于萨卡星被不同引力强度的虫洞包围，星球上的时间流速与外界不同——这在物理学上对应真实的“引力时间膨胀（Gravitational Time Dilation）”！',
      '真实天体物理：诺贝尔物理学奖得主基普·索恩推导出了真实虫洞如何将背景星光弯曲成发光圆环的数学方程！'
    ],
    travelTimes: {
      light: '位于已知宇宙边缘的虫洞交汇带',
      jumpPoint: '穿过最大的高重力虫洞仅需 18 分钟即可抵达阿斯加德',
      bifrost: '从彩虹桥超光速流中跌落时即会掉入萨卡星虫洞'
    }
  },

  marvelTitan: {
    name: '泰坦星 Titan (灭霸失衡的故乡)',
    pronunciation: 'Tài-tǎn Xīng (TY-tun)',
    category: '自转轴倾斜与卫星碎裂的行星',
    badge: '🪐 银河护卫队 + 复仇者联盟激战之地！',
    kidSummary:
      '在漫威宇宙中，泰坦星是一颗笼罩在琥珀色沙尘中的残破世界，其自转轴偏移了 8 度，巨大的潮汐力撕碎了它的卫星，在天空中留下壮观的碎石环与反重力异常——星爵、德拉克斯、螳螂女、星云在这里与钢铁侠、蜘蛛侠和奇异博士联手激战！真实科学连接：当一颗卫星过于靠近行星并越过“洛希极限（Roche Limit）”时，行星潮汐力就会将卫星撕碎成壮观的光环；而在我们真实的太阳系中，土星最大的卫星也叫“泰坦（土卫六）”，拥有橙色大气层和液态甲烷湖泊！',
    quickStats: [
      { label: '天体物理异常', value: '自转轴偏移 8° + 越过洛希极限碎裂的卫星残骸环' },
      { label: '跨星系联军', value: '星爵、螳螂女、德拉克斯、星云 + 钢铁侠、蜘蛛侠与奇异博士' },
      { label: '无限宝石对决', value: '🟢 时间宝石（阿戈摩托之眼，推演出 14,000,605 分之一的胜利）' },
      { label: '真实科学对应', value: '洛希极限潮汐瓦解 (1848) + 真实土卫六泰坦 (卡西尼-惠更斯号)' }
    ],
    funFacts: [
      '奇异博士在泰坦星使用绿色时间宝石洞察了 14,000,605 种可能的未来，找到了唯一获胜的方案。',
      '真实天体物理：法国天文学家爱德华·洛希于 1848 年证明，当卫星进入行星半径约 2.44 倍的“洛希极限”以内时，潮汐引力会将其撕碎成行星环——土星璀璨的光环正是这样形成的！'
    ],
    travelTimes: {
      light: '位于克里-新星边疆之外的深空',
      jumpPoint: '乘贝纳塔号或 Q 飞船经过 4 次空间跃迁',
      bifrost: '奇异博士开启金色秘法传送门即可瞬间一步跨回地球！'
    }
  },

  vormir: {
    name: '沃米尔星 Vormir (灵魂宝石永恒日食圣所)',
    pronunciation: 'Wò-mǐ-ěr Xīng (VOR-meer)',
    category: '永恒日冕环绕的沙漠圣山星球 (赫尔根塔系统)',
    badge: '🟠 天体存在的中心 (灵魂宝石所在地)',
    kidSummary:
      '沃米尔是赫尔根塔恒星系统中的一颗神秘紫金色荒漠星球，高耸的双峰圣山上方高悬着一轮永不落幕的“日环食”金色日冕光环——橙色灵魂宝石便静静安放在此！真实科学连接：天空中永恒不动的日食奇观可以通过“潮汐锁定（Tidal Locking）”与三体引力平衡点“第一拉格朗日点（L1）”实现，就像 NASA 的深空气候观测卫星（DSCOVR）永远停留在太阳与地球连线上一样！',
    quickStats: [
      { label: '天象奇观', value: '高悬于双峰圣山上空的永恒“金环日食”日冕光环' },
      { label: '无限宝石', value: '🟠 灵魂宝石（“天体存在的核心枢纽”）' },
      { label: '地貌特征', value: '紫黑色沙丘、双子祭坛峰与浅水镜像湖' },
      { label: '真实科学对应', value: '潮汐锁定、L1 拉格朗日点对齐与日环食太阳日冕' }
    ],
    funFacts: [
      '当灵魂宝石显现时，一道耀眼的橙色宇宙光柱会从双峰直冲天际的日食金环，随后旅行者会在清澈的浅水池中苏醒。',
      '真实天体物理：在真实的日环食与日全食期间，月球遮挡住刺眼的太阳圆面，使平时看不见的百万度高温“太阳日冕（Corona）”化作灿烂的银金色光环展现出来！'
    ],
    travelTimes: {
      light: '赫尔根塔恒星系统',
      jumpPoint: '从莫拉格星乘贝纳塔号经过 3 次空间跳跃抵达',
      bifrost: '宇宙深空坐标直达'
    }
  },

  ego: {
    name: '活体星球伊戈 Ego (银河护卫队2)',
    pronunciation: 'Yī-gē Huó-tǐ Xīng-qiú',
    category: '生物发光天神组活体行星',
    badge: '🧠 拥有行星级发光神经网络的天神核心！',
    kidSummary:
      '伊戈是一颗由远古天神组大脑核心历经数百万年凝聚物质形成的活体星球，内部遍布瑰丽的生物发光神经脉络洞穴与彩虹森林——最终格鲁特宝宝抱着炸弹深入行星核心，与火箭浣熊、勇度、星爵、卡魔拉、德拉克斯和螳螂女一起拯救了整个银河系！真实科学连接：在真实科学中，天体生物学家正利用詹姆斯·韦伯太空望远镜分析系外行星大气光谱中的“生物特征（Biosignatures，如氧气、甲烷与生物荧光）”来寻找外星生命！',
    quickStats: [
      { label: '天体分类', value: '天神组生物发光行星级巨型结构' },
      { label: '《银护2》英雄', value: '格鲁特宝宝、火箭浣熊、勇度、星爵、卡魔拉、德拉克斯与螳螂女' },
      { label: '核心弱点', value: '地心深处的生物发光大脑核心（被格鲁特宝宝安放定时炸弹！）' },
      { label: '真实科学对应', value: '系外行星大气生物特征光谱 (JWST) 与海洋生物发光现象' }
    ],
    funFacts: [
      '在地心决战时，火箭浣熊把炸弹交给格鲁特宝宝，满头大汗地教它千万别按那个会立即引爆的红色按钮（“那个按钮会害死所有人！再猜一次！”）！',
      '真实天体物理：在地球的荧光海湾中，数以万亿计的夜光藻在海浪拍打下会发出梦幻的电蓝色生物荧光，甚至能被轨道上的 NASA 卫星清晰拍到！'
    ],
    travelTimes: {
      light: '位于伯赫特星区之外的未知星域',
      jumpPoint: '700 次连续空间跳跃（切记不可一次连跳超过 50 个，否则脸会被时空拉伸变形！）',
      bifrost: '彩虹桥深空定位'
    }
  },

  hala: {
    name: '哈拉星 Hala (克里帝国首都)',
    pronunciation: 'Hā-lā Xīng (HAH-lah)',
    category: '高科技环球都市行星 (大麦哲伦星云·帕玛系统)',
    badge: '🛡️ 克里帝国与星际战队的科技首都',
    kidSummary:
      '哈拉星是克里帝国（Kree Empire）闪耀着蓝银光泽的高科技首都星球，通过六边形空间跳跃门网络与各大星系相连。真实科学连接：在电影《惊奇队长2（The Marvels）》结尾，当哈拉星的太阳濒临熄灭时，惊奇队长（卡罗尔·丹佛斯）化身双星形态直接飞入恒星核心，重新点燃了恒星的核聚变——生动展示了真实恒星如何通过 1,500 万摄氏度高温下的氢-氦核聚变照亮行星！',
    quickStats: [
      { label: '所属星系', value: '大麦哲伦星云 (LMC) • 帕玛恒星系统' },
      { label: '相关人物', value: '惊奇队长（卡罗尔·丹佛斯）、指控者罗南与科拉斯' },
      { label: '恒星壮举', value: '惊奇队长用光子能量重新点燃了哈拉星濒死恒星的核聚变！' },
      { label: '真实科学对应', value: '恒星核心质子-质子链核聚变 (1,500 万开尔文高温)' }
    ],
    funFacts: [
      '在漫威设定中，克里帝国位于大麦哲伦星云（LMC）——这是真实环绕我们银河系运行的最大伴星系，距离地球约 16.3 万光年！',
      '真实天体物理：我们的太阳每秒钟在核心将 6 亿吨氢聚变成氦，并根据爱因斯坦质能方程 E = mc² 将 400 万吨质量直接转化为灿烂的阳光！'
    ],
    travelTimes: {
      light: '16.3 万年（大麦哲伦星云距离）',
      jumpPoint: '通过克里-山达尔空间跳跃网仅需 2 次跃迁',
      bifrost: '跨星系彩虹桥直达'
    }
  },

  arishem: {
    name: '审判者阿里瑟姆与六颗无限宝石核心',
    pronunciation: 'Ā-lǐ-sè-mǔ (AIR-ih-shem)',
    category: '第一代恒星缔造者 & 创世六大奇点',
    badge: '🔮 第一颗太阳的创造者与六颗无限宝石！',
    kidSummary:
      '在漫威宇宙最宏大的尺度上，矗立着浑身赤红、拥有六只发光星眸的“审判者阿里瑟姆（Arishem the Prime Celestial）”——正是他在宇宙之初创造并点燃了第一批恒星与星系；他身边环绕着六颗璀璨的无限宝石（空间/蓝、心灵/黄、现实/红、力量/紫、时间/绿、灵魂/橙）以及洛基编织的金色多元宇宙世界树！真实科学连接：正如王和收藏家所说：“在宇宙创生之前存在着六个奇点；大爆炸将宇宙带入现实，这些奇点的残余凝聚成了无限宝石。”在真实宇宙学中，这对应 138 亿年前的“宇宙大爆炸（Big Bang）”与点燃“宇宙黎明”的第一代恒星（第三星族星）！',
    quickStats: [
      { label: '六颗无限宝石', value: '🔵 空间 • 🟡 心灵 • 🔴 现实 • 🟣 力量 • 🟢 时间 • 🟠 灵魂' },
      { label: '首席天神组', value: '审判者阿里瑟姆（宇宙第一批恒星与星系的缔造者）' },
      { label: '多元宇宙枢纽', value: '洛基在时间尽头编织的金色多元宇宙世界树 (Yggdrasil)' },
      { label: '真实科学对应', value: '宇宙大爆炸奇点 (138亿年前)、四大基本相互作用力与第一代恒星' }
    ],
    funFacts: [
      '六颗无限宝石分别掌管空间、时间、能量、现实、心灵与灵魂——正如现代物理学家通过相对论和量子力学研究时空（空间+时间）、质能（力量+现实）与信息熵！',
      '在《洛基》第二季结局中，洛基双手汇聚无穷无尽的时间线分支，在时间尽头化作了生机勃勃的金色多元宇宙世界树！',
      '真实天体物理：宇宙大爆炸后约 1 亿至 2 亿年，第一批完全由氢和氦构成的巨型“第三星族恒星（Population III Stars）”轰然点燃，结束了宇宙黑暗时代——NASA 的詹姆斯·韦伯太空望远镜正在观测这一真实的“宇宙黎明”！'
    ],
    travelTimes: {
      light: '138 亿年（横跨整个可观测宇宙）',
      jumpPoint: '超越常规空间跳跃网（需借助无限宝石或时间变异管理局 TVA 控制器）',
      bifrost: '与多元宇宙世界树尤克特拉希尔的金色根脉相连'
    }
  }
};

export const MARVEL_GUIDED_TOUR_STOPS = {
  en: [
    {
      index: 0,
      objectId: 'benatar',
      title: 'Stop 1: The Benatar — Guardians of the Galaxy Ship',
      narration:
        'Welcome to the Marvel Cosmic Tour! We begin in Earth orbit aboard the Benatar—the sleek orange-and-silver starship of Star-Lord, Rocket Raccoon, Groot, Gamora, Drax, and Mantis. Notice its glowing cyan engines, which work just like real NASA xenon ion thrusters!',
      zoomValue: 4.5,
      yaw: -0.6,
      pitch: 0.25
    },
    {
      index: 1,
      objectId: 'newAsgard',
      title: 'Stop 2: New Asgard on Midgard (Norway)',
      narration:
        'Looking down at northern Europe on Midgard (Earth-616), we visit New Asgard in Tønsberg, Norway—founded by Thor and ruled by King Valkyrie. Norway sits right under Earth’s polar magnetic cusp, where solar wind creates the real Aurora Borealis!',
      zoomValue: 3.8,
      yaw: 0.4,
      pitch: 0.65
    },
    {
      index: 2,
      objectId: 'asgard',
      title: 'Stop 3: Asgard & The Bifrost Rainbow Bridge',
      narration:
        'Now we ride the golden branches of Yggdrasil to Asgard! Behold the Golden Palace of Valhalla, Heimdall’s Observatory, and the 7-color Bifrost Rainbow Bridge—which Jane Foster identified as a real Einstein-Rosen spacetime wormhole!',
      zoomValue: 30,
      yaw: -0.5,
      pitch: 0.35
    },
    {
      index: 3,
      objectId: 'nidavellir',
      title: 'Stop 4: Nidavellir — Neutron Star Dyson Forge',
      narration:
        'Next stop: Nidavellir! Here Thor, Rocket, and Teenage Groot restarted three giant Dyson Rings around a blazing white-blue Neutron Star to forge Stormbreaker. In real astrophysics, a neutron star packs the mass of our Sun into a sphere just 20 kilometers wide!',
      zoomValue: 31,
      yaw: 0.55,
      pitch: 0.38
    },
    {
      index: 4,
      objectId: 'knowhere',
      title: 'Stop 5: Knowhere — Guardians Celestial Head HQ',
      narration:
        'Firing up the hexagonal Jump Network, we arrive at Knowhere—the giant severed head of an ancient Celestial floating inside a glowing nebula, now the official home of the Guardians of the Galaxy and Cosmo the Spacedog!',
      zoomValue: 53,
      yaw: -0.35,
      pitch: 0.28
    },
    {
      index: 5,
      objectId: 'xandar',
      title: 'Stop 6: Xandar & The Hexagonal Jump Portal',
      narration:
        'Welcome to Xandar in the Andromeda Galaxy—capital of the Nova Corps! Here Star-Lord, Gamora, Rocket, Groot, and Drax held hands to share the purple Power Stone and became the Guardians of the Galaxy!',
      zoomValue: 54,
      yaw: 0.45,
      pitch: 0.32
    },
    {
      index: 6,
      objectId: 'sovereign',
      title: 'Stop 7: Sovereign — Golden Battery Worlds',
      narration:
        'Behold the gleaming golden worlds of the Sovereign, where Baby Groot danced while the Guardians battled an interdimensional monster! In our real universe, all gold is forged when two neutron stars collide in a kilonova!',
      zoomValue: 56,
      yaw: -0.5,
      pitch: 0.34
    },
    {
      index: 7,
      objectId: 'sakaar',
      title: 'Stop 8: Sakaar & The Giant Magnetar Wormhole',
      narration:
        'Venturing into the outer cosmic rim, we orbit Sakaar and its giant swirling Einstein-Rosen Wormhole! Thor, Hulk, Valkyrie, and Loki flew straight through this vortex to race back to Asgard.',
      zoomValue: 73,
      yaw: 0.35,
      pitch: 0.42
    },
    {
      index: 8,
      objectId: 'vormir',
      title: 'Stop 9: Vormir & Titan — Realm of the Infinity Stones',
      narration:
        'Here in deep space lies Vormir, where a permanent solar eclipse crowns the sanctuary of the orange Soul Stone, near Thanos’s gravity-fractured moon Titan where the Guardians and Avengers united!',
      zoomValue: 75,
      yaw: -0.4,
      pitch: 0.35
    },
    {
      index: 9,
      objectId: 'arishem',
      title: 'Stop 10: Arishem & The 6 Infinity Stones Nexus',
      narration:
        'At the grandest scale of the universe stands Arishem the Prime Celestial—creator of the first stars—surrounded by all 6 glowing Infinity Stones and the golden Multiverse Yggdrasil Tree. Thank you for flying the Marvel Cosmic Tour!',
      zoomValue: 91,
      yaw: 0.25,
      pitch: 0.3
    }
  ],
  es: [
    {
      index: 0,
      objectId: 'benatar',
      title: 'Parada 1: El Benatar — La Nave de los Guardianes',
      narration:
        '¡Bienvenido al Tour Cósmico de Marvel! Comenzamos en la órbita de la Tierra a bordo del Benatar, la nave espacial naranja y plateada de Star-Lord, Rocket, Groot, Gamora, Drax y Mantis. ¡Sus motores brillan en color azul cian igual que los propulsores iónicos reales de la NASA!',
      zoomValue: 4.5,
      yaw: -0.6,
      pitch: 0.25
    },
    {
      index: 1,
      objectId: 'newAsgard',
      title: 'Parada 2: Nuevo Asgard en Midgard (Noruega)',
      narration:
        'Mirando hacia el norte de Europa en Midgard (Tierra-616), visitamos Nuevo Asgard en Tønsberg, Noruega, gobernado por la Rey Valquiria. ¡Noruega se ubica justo debajo del óvalo polar donde el viento solar crea las auroras boreales reales!',
      zoomValue: 3.8,
      yaw: 0.4,
      pitch: 0.65
    },
    {
      index: 2,
      objectId: 'asgard',
      title: 'Parada 3: Asgard y el Puente Arcoíris Bifrost',
      narration:
        '¡Viajamos por las ramas doradas de Yggdrasil hasta Asgard! Contempla el Palacio Dorado del Valhalla y el Puente Arcoíris Bifrost de 7 colores, que la astrofísica Jane Foster identificó como un verdadero agujero de gusano de Einstein-Rosen.',
      zoomValue: 30,
      yaw: -0.5,
      pitch: 0.35
    },
    {
      index: 3,
      objectId: 'nidavellir',
      title: 'Parada 4: Nidavellir — Forja de Estrella de Neutrones',
      narration:
        '¡Siguiente parada: Nidavellir! Aquí Thor, Rocket y Groot reactivaron tres enormes Anillos de Dyson alrededor de una Estrella de Neutrones blanco-azulada para forjar el hacha Stormbreaker. ¡En la ciencia real, una cucharadita de estrella de neutrones pesa mil millones de toneladas!',
      zoomValue: 31,
      yaw: 0.55,
      pitch: 0.38
    },
    {
      index: 4,
      objectId: 'knowhere',
      title: 'Parada 5: Knowhere — Base de los Guardianes',
      narration:
        'Cruzando la Red de Saltos hexagonales llegamos a Knowhere: el gigantesco cráneo de un antiguo Celestial flotando en una colorida nebulosa, ¡ahora el cuartel general de los Guardianes de la Galaxia y Cosmo el Perro Espacial!',
      zoomValue: 53,
      yaw: -0.35,
      pitch: 0.28
    },
    {
      index: 5,
      objectId: 'xandar',
      title: 'Parada 6: Xandar y el Portal de Salto Hexagonal',
      narration:
        '¡Bienvenido a Xandar en la Galaxia de Andrómeda, capital de los Nova Corps! Aquí Star-Lord, Gamora, Rocket, Groot y Drax unieron sus manos para controlar la Gema del Poder y formar los Guardianes de la Galaxia.',
      zoomValue: 54,
      yaw: 0.45,
      pitch: 0.32
    },
    {
      index: 6,
      objectId: 'sovereign',
      title: 'Parada 7: Sovereign — Mundos Dorados',
      narration:
        'Contempla los mundos dorados de Sovereign, donde Baby Groot bailó mientras los Guardianes luchaban contra un monstruo dimensional. ¡En el universo real, todo el oro se forja cuando chocan dos estrellas de neutrones!',
      zoomValue: 56,
      yaw: -0.5,
      pitch: 0.34
    },
    {
      index: 7,
      objectId: 'sakaar',
      title: 'Parada 8: Sakaar y el Gran Agujero de Gusano',
      narration:
        'En el borde cósmico exterior orbitamos Sakaar y su gigantesco Agujero de Gusano giratorio. ¡Thor, Hulk, Valquiria y Loki atravesaron este vórtice para regresar a toda velocidad hacia Asgard!',
      zoomValue: 73,
      yaw: 0.35,
      pitch: 0.42
    },
    {
      index: 8,
      objectId: 'vormir',
      title: 'Parada 9: Vormir y Titán — El Reino de las Gemas',
      narration:
        'En el espacio profundo brilla Vormir, donde un eclipse solar eterno corona el santuario de la Gema del Alma naranja, muy cerca de la luna Titán donde los Guardianes y los Vengadores unieron fuerzas.',
      zoomValue: 75,
      yaw: -0.4,
      pitch: 0.35
    },
    {
      index: 9,
      objectId: 'arishem',
      title: 'Parada 10: Arishem y las 6 Gemas del Infinito',
      narration:
        'En la escala más grandiosa del universo se alza Arishem el Primer Celestial, creador de los primeros soles, rodeado por las 6 Gemas del Infinito y el Árbol del Multiverso Yggdrasil. ¡Gracias por viajar en el Tour Cósmico de Marvel!',
      zoomValue: 91,
      yaw: 0.25,
      pitch: 0.3
    }
  ],
  zh: [
    {
      index: 0,
      objectId: 'benatar',
      title: '第 1 站：贝纳塔号 — 银河护卫队主力星舰',
      narration:
        '欢迎踏上漫威宇宙巡游之旅！我们从地球轨道上的“贝纳塔号”飞船出发——这是星爵、火箭浣熊、格鲁特、卡魔拉、德拉克斯与螳螂女的标志性橙银星舰。看它尾部的蓝青色离子光焰，与 NASA 真实的氙离子推进器一模一样！',
      zoomValue: 4.5,
      yaw: -0.6,
      pitch: 0.25
    },
    {
      index: 1,
      objectId: 'newAsgard',
      title: '第 2 站：米德加德·新阿斯加德 (挪威海岸)',
      narration:
        '俯瞰米德加德（地球-616）北欧海岸，这里是雷神索尔与女武神瓦尔基里建立的“新阿斯加德”。挪威恰好位于地球极区磁层顶下方，太阳风在这里激发出绚丽的真实北极光！',
      zoomValue: 3.8,
      yaw: 0.4,
      pitch: 0.65
    },
    {
      index: 2,
      objectId: 'asgard',
      title: '第 3 站：阿斯加德与比弗罗斯特彩虹桥',
      narration:
        '现在我们沿着世界树尤克特拉希尔的金色星枝飞抵阿斯加德！看那金碧辉煌的英灵殿、海姆达尔观测台与七彩斑斓的彩虹桥——在真实天体物理学中，它对应广义相对论预言的“爱因斯坦-罗森桥”时空虫洞！',
      zoomValue: 30,
      yaw: -0.5,
      pitch: 0.35
    },
    {
      index: 3,
      objectId: 'nidavellir',
      title: '第 4 站：尼达维勒 — 中子星戴森环神兵熔炉',
      narration:
        '下一站：尼达维勒！雷神索尔、火箭浣熊和少年格鲁特在这里重新拉动了环绕炽热蓝白中子星的三重戴森环，铸造出暴风战斧。在真实宇宙中，中子星上仅一茶匙物质就重达 10 亿吨！',
      zoomValue: 31,
      yaw: 0.55,
      pitch: 0.38
    },
    {
      index: 4,
      objectId: 'knowhere',
      title: '第 5 站：虚无知地 Knowhere — 护卫队天神头骨总部',
      narration:
        '穿过六边形宇宙空间跳跃门，我们抵达了漂浮在绚丽星云中的远古天神组巨大头骨——“虚无知地”，这里如今是银河护卫队与太空狗科斯莫的温馨大本营！',
      zoomValue: 53,
      yaw: -0.35,
      pitch: 0.28
    },
    {
      index: 5,
      objectId: 'xandar',
      title: '第 6 站：山达尔星与六边形空间跳跃门',
      narration:
        '欢迎来到位于仙女座星系（M31）的新星帝国首都——山达尔星！星爵、卡魔拉、火箭浣熊、格鲁特和德拉克斯曾在这里手拉手共同承受紫色力量宝石的能量，正式创立了银河护卫队！',
      zoomValue: 54,
      yaw: 0.45,
      pitch: 0.32
    },
    {
      index: 6,
      objectId: 'sovereign',
      title: '第 7 站：索维林星 — 纯金几何电池星球',
      narration:
        '看这片闪耀着纯金光泽的索维林星球群，格鲁特宝宝曾在这里欢快跳舞！在真实宇宙中，所有的黄金都是在两颗中子星剧烈相撞的“千新星”爆发中锻造出来的！',
      zoomValue: 56,
      yaw: -0.5,
      pitch: 0.34
    },
    {
      index: 7,
      objectId: 'sakaar',
      title: '第 8 站：萨卡星与巨型强磁星虫洞',
      narration:
        '飞向深空边缘，我们正在环绕角斗士星球萨卡星及其巨大的旋转虫洞飞行！雷神索尔、绿巨人浩克、女武神与洛基正是驾驶飞船冲进这座巨型虫洞重返阿斯加德！',
      zoomValue: 73,
      yaw: 0.35,
      pitch: 0.42
    },
    {
      index: 8,
      objectId: 'vormir',
      title: '第 9 站：沃米尔与泰坦星 — 无限宝石圣域',
      narration:
        '深空之中闪耀着沃米尔星，永恒不落的日环食金环高悬在橙色灵魂宝石圣山之上；不远处则是银河护卫队与复仇者联盟联手作战的泰坦星！',
      zoomValue: 75,
      yaw: -0.4,
      pitch: 0.35
    },
    {
      index: 9,
      objectId: 'arishem',
      title: '第 10 站：审判者阿里瑟姆与六颗无限宝石核心',
      narration:
        '在最宏大的宇宙尺度上，第一代恒星的缔造者“审判者阿里瑟姆”巍然屹立，周围环绕着六颗闪耀的无限宝石与洛基编织的金色多元宇宙世界树。感谢您搭乘漫威宇宙 3D 巡游之旅！',
      zoomValue: 91,
      yaw: 0.25,
      pitch: 0.3
    }
  ]
};

export const MARVEL_QUIZ_QUESTIONS = {
  en: [
    {
      question:
        '1. At Nidavellir, Thor, Rocket Raccoon, and Groot forged Stormbreaker using the blazing core of what real ultra-dense astronomical object?',
      options: [
        'A Red Dwarf Star',
        'A Neutron Star surrounded by a Dyson Ring megastructure',
        'A Brown Dwarf gas giant',
        'An icy comet nucleus'
      ],
      correctIndex: 1,
      explanation:
        'Correct! Nidavellir is a real astrophysics combo: a spinning Neutron Star (where 1 teaspoon weighs a billion tons!) surrounded by nested Dyson Rings that channel its plasma beam!'
    },
    {
      question:
        '2. In Thor (2011), astrophysicist Jane Foster explains that Asgard’s 7-color Bifrost Rainbow Bridge is actually what real general-relativity phenomenon?',
      options: [
        'An Einstein-Rosen Bridge (a spacetime wormhole)',
        'A solar flare',
        'A Kuiper Belt asteroid',
        'A geostationary satellite'
      ],
      correctIndex: 0,
      explanation:
        'Spot on! Albert Einstein and Nathan Rosen mathematically predicted spacetime bridges ("Einstein-Rosen Bridges" or wormholes) in 1935!'
    },
    {
      question:
        '3. Where did the Guardians of the Galaxy (Star-Lord, Gamora, Rocket, Groot & Drax) set up their permanent headquarters inside the giant skull of an ancient Celestial?',
      options: ['Morag', 'Knowhere', 'Jotunheim', 'Muspelheim'],
      correctIndex: 1,
      explanation:
        'Yes! Knowhere is built inside the severed head of an ancient Celestial floating inside a colorful nebula—and is now home to Rocket, Groot, and Cosmo the Spacedog!'
    },
    {
      question:
        '4. Xandar—capital of the Nova Corps where the Guardians first united to hold the purple Power Stone—is located in which real neighboring galaxy 2.54 million light-years from Earth?',
      options: [
        'The Andromeda Galaxy (M31)',
        'The Sombrero Galaxy (M104)',
        'The Whirlpool Galaxy (M51)',
        'The Cigar Galaxy (M82)'
      ],
      correctIndex: 0,
      explanation:
        'Awesome! Xandar is located in the real Andromeda Galaxy (M31), our giant spiral neighbor 2.54 million light-years away with over 1 trillion stars!'
    },
    {
      question:
        '5. According to Marvel lore and real astrophysics, how were the 6 Infinity Stones (and the first elements of our real cosmos) born?',
      options: [
        'From six primordial singularities forged in the Big Bang when the universe exploded into existence',
        'Built inside a factory on Mars',
        'Frozen inside Halley’s Comet',
        'Dropped by Voyager 1 in 1977'
      ],
      correctIndex: 0,
      explanation:
        'Cosmic Genius! The 6 Infinity Stones (Space, Mind, Reality, Power, Time, Soul) were forged from primordial singularities during the Big Bang 13.8 billion years ago!'
    }
  ],
  es: [
    {
      question:
        '1. En Nidavellir, Thor, Rocket y Groot forjaron el hacha Stormbreaker usando el corazón ardiente de ¿qué objeto astronómico real ultradenso?',
      options: [
        'Una estrella enana roja',
        'Una Estrella de Neutrones rodeada por Anillos de Dyson',
        'Un gigante gaseoso',
        'Un cometa de hielo'
      ],
      correctIndex: 1,
      explanation:
        '¡Correcto! Nidavellir es una Estrella de Neutrones real (¡donde una cucharadita pesa mil millones de toneladas!) rodeada por una megaestructura de Anillos de Dyson.'
    },
    {
      question:
        '2. En Thor (2011), la astrofísica Jane Foster explica que el Puente Arcoíris Bifrost de Asgard es en realidad ¿qué fenómeno de la Relatividad General?',
      options: [
        'Un Puente de Einstein-Rosen (un agujero de gusano del espacio-tiempo)',
        'Una tormenta de arena',
        'Un cinturón de asteroides',
        'Un satélite artificial'
      ],
      correctIndex: 0,
      explanation:
        '¡Exacto! Albert Einstein y Nathan Rosen predijeron matemáticamente los Puentes de Einstein-Rosen (agujeros de gusano) en 1935.'
    },
    {
      question:
        '3. ¿En qué estación espacial —construida dentro del gigantesco cráneo de un antiguo Celestial— establecieron su cuartel general los Guardianes de la Galaxia?',
      options: ['Morag', 'Knowhere', 'Jotunheim', 'Muspelheim'],
      correctIndex: 1,
      explanation:
        '¡Sí! Knowhere está construido dentro de la cabeza de un Celestial antiguo flotando en una nebulosa, ¡y ahora es el hogar de Rocket, Groot y Cosmo el Perro Espacial!'
    },
    {
      question:
        '4. Xandar —capital de los Nova Corps donde se unieron los Guardianes de la Galaxia— se encuentra en ¿qué galaxia real vecina a 2.54 millones de años luz?',
      options: [
        'La Galaxia de Andrómeda (M31)',
        'La Galaxia del Sombrero (M104)',
        'La Galaxia del Remolino (M51)',
        'La Galaxia del Cigarro (M82)'
      ],
      correctIndex: 0,
      explanation:
        '¡Brillante! Xandar se ubica en la verdadera Galaxia de Andrómeda (M31), nuestra vecina espiral gigante con más de 1 billón de estrellas.'
    },
    {
      question:
        '5. Según la historia de Marvel y la cosmología real, ¿cómo nacieron las 6 Gemas del Infinito al comienzo del universo?',
      options: [
        'De seis singularidades primordiales forjadas en el Big Bang cuando el universo nació',
        'En una fábrica en Marte',
        'Dentro del Cometa Halley',
        'Lanzadas por el Voyager 1 en 1977'
      ],
      correctIndex: 0,
      explanation:
        '¡Genio Cósmico! Las 6 Gemas del Infinito (Espacio, Mente, Realidad, Poder, Tiempo y Alma) provienen de seis singularidades primordiales del Big Bang hace 13,800 millones de años.'
    }
  ],
  zh: [
    {
      question:
        '1. 在尼达维勒，雷神索尔、火箭浣熊与少年格鲁特利用哪种真实超致密天体的核心能量铸造了“暴风战斧”？',
      options: [
        '普通红矮星',
        '被“戴森环”巨型结构环绕的高速自转中子星',
        '气态巨行星',
        '冰封彗星核'
      ],
      correctIndex: 1,
      explanation:
        '回答正确！尼达维勒中心是一颗真实的中子星（上面一茶匙物质就重达 10 亿吨！），外围则是收集恒星能量的三重机械戴森环！'
    },
    {
      question:
        '2. 在电影《雷神》中，天体物理学家简·福斯特指出阿斯加德的七彩“比弗罗斯特彩虹桥”在物理学上对应什么真实理论现象？',
      options: [
        '爱因斯坦-罗森桥（广义相对论时空虫洞）',
        '太阳黑子风暴',
        '柯伊伯带小行星',
        '地球同步卫星'
      ],
      correctIndex: 0,
      explanation:
        '太棒了！阿尔伯特·爱因斯坦与纳森·罗森于 1935 年利用广义相对论预言了连接两个时空区域的“爱因斯坦-罗森桥”（虫洞）！'
    },
    {
      question:
        '3. 银河护卫队（火箭浣熊、格鲁特、星爵与太空狗科斯莫）将他们的大本营总部设在了哪座由远古天神组巨大头骨改建的太空前哨站？',
      options: ['莫拉格星 (Morag)', '虚无知地 (Knowhere)', '约顿海姆 (Jotunheim)', '穆斯贝尔海姆 (Muspelheim)'],
      correctIndex: 1,
      explanation:
        '完全正确！虚无知地（Knowhere）建造在漂浮于绚丽星云中的远古天神组头骨内部，如今是银河护卫队与太空狗科斯莫温暖的家园！'
    },
    {
      question:
        '4. 银河护卫队首次手拉手掌控紫色力量宝石的新星帝国首都“山达尔星（Xandar）”，位于距离地球 254 万光年的哪个真实邻近星系中？',
      options: [
        '仙女座星系 (M31)',
        '草帽星系 (M104)',
        '涡状星系 (M51)',
        '雪茄星系 (M82)'
      ],
      correctIndex: 0,
      explanation:
        '太厉害了！山达尔星位于真实的仙女座大星系（M31）中——它是距离银河系最近的大型旋涡星系，拥有超过 1 万亿颗恒星！'
    },
    {
      question:
        '5. 根据漫威宇宙设定与真实宇宙学，六颗无限宝石（空间、心灵、现实、力量、时间、灵魂）是如何诞生的？',
      options: [
        '源自宇宙创生之前存在的六个奇点，在 138 亿年前的宇宙大爆炸中凝聚而成',
        '在火星工厂里制造的',
        '冻结在哈雷彗星内部',
        '1977 年由旅行者 1 号发射升空'
      ],
      correctIndex: 0,
      explanation:
        '满分宇宙守护者！六颗无限宝石源于宇宙大爆炸（Big Bang）前的六大奇点，对应真实物理学中的时空与基本相互作用力！'
    }
  ]
};

export const MARVEL_LABEL_NAMES = {
  en: {
    benatar: '🦝 The Benatar (Guardians Ship)',
    newAsgard: '⚡ New Asgard (Tønsberg, Norway)',
    asgard: '⚡ Asgard & The Bifrost Bridge',
    nidavellir: '🔨 Nidavellir (Neutron Star Dyson Forge)',
    jotunheim: '❄️ Jotunheim (Frost Giant Realm)',
    muspelheim: '🔥 Muspelheim (Surtur’s Fire Realm)',
    knowhere: '💀 Knowhere (Guardians Celestial Head HQ)',
    xandar: '🌟 Xandar (Nova Corps Capital)',
    morag: '🟣 Morag (Power Stone Ocean Temple)',
    sovereign: '✨ Sovereign (Golden Battery Worlds)',
    counterEarth: '🌍 Counter-Earth (Halfworld)',
    contraxia: '🌨️ Contraxia (Ravager Ice Port)',
    sakaar: '🌀 Sakaar & Giant Wormhole',
    marvelTitan: '🪐 Titan (Thanos’s Gravity-Tilted World)',
    vormir: '🟠 Vormir (Soul Stone Eclipse World)',
    ego: '🧠 Ego the Living Planet',
    hala: '🛡️ Hala (Kree Empire Capital)',
    arishem: '🔮 Arishem & The 6 Infinity Stones'
  },
  es: {
    benatar: '🦝 El Benatar (Nave Guardianes)',
    newAsgard: '⚡ Nuevo Asgard (Tønsberg, Noruega)',
    asgard: '⚡ Asgard y el Puente Bifrost',
    nidavellir: '🔨 Nidavellir (Forja Estrella de Neutrones)',
    jotunheim: '❄️ Jotunheim (Reino de los Gigantes de Hielo)',
    muspelheim: '🔥 Muspelheim (Reino de Fuego de Surtur)',
    knowhere: '💀 Knowhere (Cráneo Celestial y Base Guardianes)',
    xandar: '🌟 Xandar (Capital de los Nova Corps)',
    morag: '🟣 Morag (Templo de la Gema del Poder)',
    sovereign: '✨ Sovereign (Mundos Batería Dorados)',
    counterEarth: '🌍 Contra-Tierra (Guardianes Vol. 3)',
    contraxia: '🌨️ Contraxia (Puerto Helado Devastador)',
    sakaar: '🌀 Sakaar y Gran Agujero de Gusano',
    marvelTitan: '🪐 Titán (Mundo de Thanos)',
    vormir: '🟠 Vormir (Eclipse de la Gema del Alma)',
    ego: '🧠 Ego el Planeta Viviente',
    hala: '🛡️ Hala (Capital del Imperio Kree)',
    arishem: '🔮 Arishem y las 6 Gemas del Infinito'
  },
  zh: {
    benatar: '🦝 贝纳塔号 (银河护卫队飞船)',
    newAsgard: '⚡ 新阿斯加德 (挪威滕斯贝格)',
    asgard: '⚡ 阿斯加德与彩虹桥',
    nidavellir: '🔨 尼达维勒 (中子星戴森环熔炉)',
    jotunheim: '❄️ 约顿海姆 (冰霜巨人国度)',
    muspelheim: '🔥 穆斯贝尔海姆 (苏尔特尔火焰国度)',
    knowhere: '💀 虚无知地 (天神组头骨与护卫队总部)',
    xandar: '🌟 山达尔星 (新星军团首都)',
    morag: '🟣 莫拉格星 (力量宝石神庙星球)',
    sovereign: '✨ 索维林星 (纯金电池星球群)',
    counterEarth: '🌍 反地球 (银河护卫队3)',
    contraxia: '🌨️ 康特拉夏星 (掠夺者冰雪港)',
    sakaar: '🌀 萨卡星与巨型空间虫洞',
    marvelTitan: '🪐 泰坦星 (灭霸失衡的故乡)',
    vormir: '🟠 沃米尔星 (灵魂宝石永恒日食圣所)',
    ego: '🧠 活体星球伊戈 (Ego)',
    hala: '🛡️ 哈拉星 (克里帝国首都)',
    arishem: '🔮 审判者阿里瑟姆与六颗无限宝石'
  },
  ja: {
    benatar: '🦝 ベネター号 (ガーディアンズ宇宙船)',
    newAsgard: '⚡ ニュー・アスガルド (ノルウェー)',
    asgard: '⚡ アスガルド & ビフレスト天文台',
    nidavellir: '🔨 ニダヴェリア (中性子星ダイソン鍛冶場)',
    jotunheim: '❄️ ヨトゥンヘイム (氷の巨人の国)',
    muspelheim: '🔥 ムスペルヘイム (永遠の炎の国)',
    knowhere: '💀 ノーウェア (セレスティアル頭部基地)',
    xandar: '🌟 ザンダー (ノヴァ帝国首都)',
    morag: '🟣 モラグ (パワー・ストーンの神殿)',
    sovereign: '✨ ソヴリン (黄金の人工惑星群)',
    counterEarth: '🌍 カウンター・アース (反地球)',
    contraxia: '🌨️ コントラクシア (ラヴェジャーズ氷惑星)',
    sakaar: '🌀 サカール & 悪魔のアナル・ワームホール',
    marvelTitan: '🪐 タイタン (サノスの故郷)',
    vormir: '🟠 ヴォーミア (ソウル・ストーンの日食惑星)',
    ego: '🧠 生ける惑星エゴ',
    hala: '🛡️ ハラ (クリー帝国首都)',
    arishem: '🔮 審判者アリシェム & 6つのインフィニティ・ストーン'
  },
  ko: {
    benatar: '🦝 베나타 호 (가디언즈 우주선)',
    newAsgard: '⚡ 뉴 아스가르드 (노르웨이)',
    asgard: '⚡ 아스가르드 & 비프로스트 천문대',
    nidavellir: '🔨 니다벨리르 (중성자별 다이슨 대장간)',
    jotunheim: '❄️ 요툰헤임 (서리 거인의 왕국)',
    muspelheim: '🔥 무스펠헤임 (영원한 불의 왕국)',
    knowhere: '💀 노웨어 (셀레스티얼 두개골 본부)',
    xandar: '🌟 잔다르 (노바 제국 수도)',
    morag: '🟣 모라그 (파워 스톤의 사원)',
    sovereign: '✨ 소버린 (황금 인공 행성군)',
    counterEarth: '🌍 카운터 어스 (반지구)',
    contraxia: '🌨️ 콘트락시아 (라바저스 얼음 행성)',
    sakaar: '🌀 사카르 & 악마의 항문 웜홀',
    marvelTitan: '🪐 타이탄 (타노스의 고향)',
    vormir: '🟠 보르미르 (소울 스톤의 일식 행성)',
    ego: '🧠 살아있는 행성 에고',
    hala: '🛡️ 할라 (크리 제국 수도)',
    arishem: '🔮 심판자 아리솀 & 6대 인피니티 스톤'
  },
  pt: {
    benatar: '🦝 A Benatar (Nave dos Guardiões)',
    newAsgard: '⚡ Nova Asgard (Tønsberg, Noruega)',
    asgard: '⚡ Asgard e Observatório da Bifrost',
    nidavellir: '🔨 Nidavellir (Forja Dyson de Estrela de Nêutrons)',
    jotunheim: '❄️ Jotunheim (Reino dos Gigantes de Gelo)',
    muspelheim: '🔥 Muspelheim (Reino do Fogo Eterno)',
    knowhere: '💀 Luganenhum (Crânio Celestial & QG)',
    xandar: '🌟 Xandar (Capital do Império Nova)',
    morag: '🟣 Morag (Cofre da Joia do Poder)',
    sovereign: '✨ O Soberano (Mundos Dourados)',
    counterEarth: '🌍 Contra-Terra (Alto Evolucionário)',
    contraxia: '🌨️ Contraxia (Mundo Gelado dos Saqueadores)',
    sakaar: '🌀 Sakaar e Buraco de Minhoca',
    marvelTitan: '🪐 Titã (Mundo Inclinado de Thanos)',
    vormir: '🟠 Vormir (Mundo de Eclipse da Joia da Alma)',
    ego: '🧠 Ego, o Planeta Vivo',
    hala: '🛡️ Hala (Capital do Império Kree)',
    arishem: '🔮 Arishem e as Seis Joias do Infinito'
  },
  fr: {
    benatar: '🦝 Le Benatar (Vaisseau des Gardiens)',
    newAsgard: '⚡ Nouvelle-Asgard (Tønsberg, Norvège)',
    asgard: '⚡ Asgard et Observatoire du Bifrost',
    nidavellir: '🔨 Nidavellir (Forge Dyson à Étoile à Neutrons)',
    jotunheim: '❄️ Jotunheim (Royaume des Géants des Glaces)',
    muspelheim: '🔥 Muspelheim (Royaume du Feu Éternel)',
    knowhere: '💀 Knowhere (Crâne Céleste & QG)',
    xandar: '🌟 Xandar (Capitale de l’Empire Nova)',
    morag: '🟣 Morag (Sanctuaire de la Pierre du Pouvoir)',
    sovereign: '✨ Le Souverain (Mondes Dorés)',
    counterEarth: '🌍 Contre-Terre (Maître de l’Évolution)',
    contraxia: '🌨️ Contraxia (Monde Glacé des Ravageurs)',
    sakaar: '🌀 Sakaar et Trou de Ver Géant',
    marvelTitan: '🪐 Titan (Monde Incliné de Thanos)',
    vormir: '🟠 Vormir (Monde d’Éclipse de la Pierre de l’Âme)',
    ego: '🧠 Ego, la Planète Vivante',
    hala: '🛡️ Hala (Capitale de l’Empire Kree)',
    arishem: '🔮 Arishem et les Six Pierres d’Infinité'
  },
  it: {
    benatar: '🦝 La Benatar (Astronave dei Guardiani)',
    newAsgard: '⚡ Nuova Asgard (Tønsberg, Norvegia)',
    asgard: '⚡ Asgard e Osservatorio del Bifrost',
    nidavellir: '🔨 Nidavellir (Forgia Dyson a Stella di Neutroni)',
    jotunheim: '❄️ Jotunheim (Regno dei Giganti di Ghiaccio)',
    muspelheim: '🔥 Muspelheim (Regno del Fuoco Eterno)',
    knowhere: '💀 Knowhere / Ovunque (Cranio Celestiale & QG)',
    xandar: '🌟 Xandar (Capitale dell’Impero Nova)',
    morag: '🟣 Morag (Tempio della Gemma del Potere)',
    sovereign: '✨ I Sovereign (Mondi Dorati)',
    counterEarth: '🌍 Contro-Terra (Alto Evoluzionario)',
    contraxia: '🌨️ Contraxia (Mondo Ghiacciato dei Ravagers)',
    sakaar: '🌀 Sakaar e Wormhole Gigante',
    marvelTitan: '🪐 Titano (Mondo Inclinato di Thanos)',
    vormir: '🟠 Vormir (Mondo d’Eclissi della Gemma dell’Anima)',
    ego: '🧠 Ego, il Pianeta Vivente',
    hala: '🛡️ Hala (Capitale dell’Impero Kree)',
    arishem: '🔮 Arishem e le Sei Gemme dell’Infinito'
  }
};

