/**
 * Multilingual translations for Japanese (`ja`), Korean (`ko`), Portuguese (`pt`),
 * French (`fr`), and Italian (`it`) covering:
 *  - COSMIC_SCALES_EXTRA
 *  - COSMIC_OBJECTS_EXTRA (all 28 core objects)
 *  - GUIDED_TOUR_STOPS_EXTRA (11 stops)
 *  - SPACE_QUIZ_QUESTIONS_EXTRA (5 questions)
 */

export const COSMIC_SCALES_EXTRA = {
  ja: [
    {
      id: 'earth-moon',
      index: 0,
      name: '地球と月',
      subtitle: '私たちの故郷と惑星の庭',
      rangeLabel: '1万 km – 100万 km',
      description: '故郷へようこそ！地球は薄い青い大気に守られた水の惑星で、相棒の月と国際宇宙ステーション (ISS) が周囲を回っています。',
      funPrompt: '地球、月、または国際宇宙ステーションをクリックして飛んでみよう！'
    },
    {
      id: 'solar-system',
      index: 1,
      name: '太陽系と探査機',
      subtitle: '8つの惑星・テスラロードスター・ボイジャー1/2号',
      rangeLabel: '1 AU – 200 AU（300億 km）',
      description: '数百万キロ離れた視点へ！中心の太陽の周りを8つの個性豊かな惑星、火星軌道と交差するスターマンのテスラ・ロードスター、そして星間空间を飛ぶボイジャー1号・2号が進んでいます。',
      funPrompt: '「🚗 ロードスター」「📡 ボイジャー1号」「🛸 ボイジャー2号」をクリックしてリアルタイム追跡しよう！'
    },
    {
      id: 'nearby-stars',
      index: 2,
      name: '近隣の恒星と6,451個の系外惑星',
      subtitle: '確認された全ての太陽系外惑星と隣の恒星たち',
      rangeLabel: '4光年 – 5,000+光年',
      description: 'NASA系外惑星アーカイブの4,847恒星系・6,451個の確認済み系外惑星を探検しよう！4.24光年先のプロキシマ・ケンタウリbや、地球サイズの惑星が7つ並ぶTRAPPIST-1へ飛べます。',
      funPrompt: '系外惑星エクスプローラーを使うか、任意の恒星をクリックして惑星系を調べよう！'
    },
    {
      id: 'milky-way',
      index: 3,
      name: '天の川銀河（銀河系）',
      subtitle: '2,000億個以上の星が集まる私たちの島宇宙',
      rangeLabel: '直径 10万光年',
      description: '私たちの天の川銀河！2,000億〜4,000億個の恒星が渦巻く巨大な棒渦巻銀河です。太陽系は中心の超大質量ブラックホール「いて座A*」から約2万6,000光年離れたオリオン腕にあります。',
      funPrompt: '「現在地（オリオン腕）」のマーカーを探して太陽系の場所を確認しよう！'
    },
    {
      id: 'universe',
      index: 4,
      name: '観測可能な宇宙',
      subtitle: '局部銀河群・宇宙の大規模構造（コズミック・ウェブ）',
      rangeLabel: '250万光年 – 930億光年',
      description: '最大のスケールでは、天の川銀河やアンドロメダ銀河さえも「宇宙の網（コズミック・ウェブ）」に織り込まれた光の点にすぎません。930億光年にわたり数兆個の銀河が広がっています！',
      funPrompt: '隣の大銀河アンドロメダや、輝く宇宙の大規模構造フィラメントを探検しよう！'
    }
  ],
  ko: [
    {
      id: 'earth-moon',
      index: 0,
      name: '지구와 달',
      subtitle: '우리의 고향 행성과 우주 앞마당',
      rangeLabel: '1만 km – 100만 km',
      description: '집에 오신 것을 환영합니다! 지구는 얇고 푸른 대기권이 보호하는 바다 행성이며, 든든한 동반자 달과 국제우주정거장(ISS)이 주위를 돌고 있습니다.',
      funPrompt: '지구, 달 또는 국제우주정거장을 클릭해 날아가 보세요!'
    },
    {
      id: 'solar-system',
      index: 1,
      name: '태양계와 탐사선',
      subtitle: '8개 행성, 테슬라 로드스터 & 보이저 1/2호',
      rangeLabel: '1 AU – 200 AU (300억 km)',
      description: '수백만 킬로미터 밖으로 줌아웃하세요! 태양을 중심으로 8개의 행성, 화성 궤도를 가로지르는 스타맨의 테슬라 로드스터, 성간 우주를 비행하는 보이저 1호와 2호가 움직입니다.',
      funPrompt: '"🚗 테슬라 로드스터", "📡 보이저 1호", "🛸 보이저 2호"를 클릭해 실시간 궤적을 확인하세요!'
    },
    {
      id: 'nearby-stars',
      index: 2,
      name: '이웃 항성과 6,451개 외계행성',
      subtitle: '확인된 모든 외계 세계와 이웃 별들',
      rangeLabel: '4광년 – 5,000+광년',
      description: 'NASA 외계행성 아카이브의 4,847개 항성계에 속한 6,451개 외계행성을 모두 탐험하세요! 프록시마 센타우리 b(4.24광년)와 지구 크기 행성 7개가 모인 TRAPPIST-1로 날아갈 수 있습니다.',
      funPrompt: '외계행성 탐색기를 열거나 별을 클릭해 외계 행성계를 관찰하세요!'
    },
    {
      id: 'milky-way',
      index: 3,
      name: '우리은하 (은하수)',
      subtitle: '2,000억 개 이상의 별이 모인 거대한 섬',
      rangeLabel: '지름 10만 광년',
      description: '우리은하를 감상하세요! 2,000억~4,000억 개의 별이 소용돌이치는 거대한 막대나선은하입니다. 태양계는 중심 초대질량 블랙홀 궁수자리 A*에서 약 26,000광년 떨어진 오리온 팔에 위치합니다.',
      funPrompt: '"현재 위치(오리온 팔)" 표지를 찾아 태양계가 어디에 있는지 확인해 보세요!'
    },
    {
      id: 'universe',
      index: 4,
      name: '관측 가능한 우주',
      subtitle: '국부은하군, 우주 거대구조와 심우주',
      rangeLabel: '250만 광년 – 930억 광년',
      description: '가장 거대한 스케일에서는 우리은하와 안드로메다 은하조차 우주 거대구조(코스믹 웹)를 이루는 작은 빛의 점입니다. 930억 광년에 걸쳐 수조 개의 은하가 펼쳐져 있습니다!',
      funPrompt: '이웃 거대 은하 안드로메다와 빛나는 우주 거대구조 필라멘트를 탐험하세요!'
    }
  ],
  pt: [
    {
      id: 'earth-moon',
      index: 0,
      name: 'Terra e Lua',
      subtitle: 'Nosso lar e quintal planetário',
      rangeLabel: '10.000 km – 1 milhão km',
      description: 'Bem-vindo a casa! A Terra é um mundo oceânico rochoso protegido por uma fina atmosfera azul, acompanhado pela nossa fiel Lua e pela Estação Espacial Internacional em órbita.',
      funPrompt: 'Clique na Terra, na Lua ou na Estação Espacial Internacional!'
    },
    {
      id: 'solar-system',
      index: 1,
      name: 'Sistema Solar e Sondas',
      subtitle: '8 planetas, Tesla Roadster e Voyager 1/2',
      rangeLabel: '1 UA – 200 UA (30 bilhões km)',
      description: 'Afaste-se milhões de quilômetros! Nosso Sol reúne 8 planetas diversos, o Tesla Roadster do Starman cruzando a órbita de Marte e as sondas mais distantes da humanidade: Voyager 1 e Voyager 2 no espaço interestelar.',
      funPrompt: 'Clique em "🚗 Tesla Roadster", "📡 Voyager 1" ou "🛸 Voyager 2" para rastreá-los ao vivo!'
    },
    {
      id: 'nearby-stars',
      index: 2,
      name: 'Estrelas Próximas e 6.451 Exoplanetas',
      subtitle: 'Todos os mundos alienígenas confirmados',
      rangeLabel: '4 anos-luz – 5.000+ anos-luz',
      description: 'Explore todos os 6.451 exoplanetas confirmados em 4.847 sistemas estelares do Arquivo de Exoplanetas da NASA! Visite Proxima Centauri b (4,24 anos-luz) ou os 7 mundos rochosos de TRAPPIST-1.',
      funPrompt: 'Use o Explorador de Exoplanetas ou clique em qualquer estrela para ver seus planetas!'
    },
    {
      id: 'milky-way',
      index: 3,
      name: 'Galáxia Via Láctea',
      subtitle: 'Nossa ilha com mais de 200 bilhões de estrelas',
      rangeLabel: '100.000 anos-luz de diâmetro',
      description: 'Contemple nossa Via Láctea! Uma gigantesca galáxia espiral barrada com 200 a 400 bilhões de estrelas. Nosso Sistema Solar vive no Braço de Órion, a 26.000 anos-luz do buraco negro supermassivo Sagitário A*.',
      funPrompt: 'Procure o marcador "Você está aqui (Braço de Órion)" para ver onde o Sol mora!'
    },
    {
      id: 'universe',
      index: 4,
      name: 'O Universo',
      subtitle: 'Grupo Local, Teia Cósmica e Espaço Profundo',
      rangeLabel: '2,5 milhões – 93 bilhões de anos-luz',
      description: 'Na maior escala de todas, galáxias inteiras como a Via Láctea e Andrômeda são pontos brilhantes tecidos na Teia Cósmica — trilhões de galáxias ao longo de 93 bilhões de anos-luz!',
      funPrompt: 'Explore Andrômeda e os filamentos brilhantes da Teia Cósmica!'
    }
  ],
  fr: [
    {
      id: 'earth-moon',
      index: 0,
      name: 'Terre et Lune',
      subtitle: 'Notre foyer et jardin planétaire',
      rangeLabel: '10 000 km – 1 million km',
      description: 'Bienvenue chez nous ! La Terre est un monde océanique rocheux protégé par une fine atmosphère bleue, accompagné par notre fidèle Lune et la Station spatiale internationale (ISS).',
      funPrompt: 'Cliquez sur la Terre, la Lune ou la Station spatiale internationale !'
    },
    {
      id: 'solar-system',
      index: 1,
      name: 'Système Solaire et Sondes',
      subtitle: '8 planètes, Tesla Roadster et Voyager 1/2',
      rangeLabel: '1 UA – 200 UA (30 milliards km)',
      description: 'Reculez de plusieurs millions de kilomètres ! Notre Soleil rassemble 8 planètes variées, le Tesla Roadster de Starman croisant l’orbite de Mars et les sondes Voyager 1 et Voyager 2 filant dans l’espace interstellaire.',
      funPrompt: 'Cliquez sur « 🚗 Tesla Roadster », « 📡 Voyager 1 » ou « 🛸 Voyager 2 » pour les suivre en direct !'
    },
    {
      id: 'nearby-stars',
      index: 2,
      name: 'Étoiles Proches et 6 451 Exoplanètes',
      subtitle: 'Tous les mondes extrasolaires confirmés',
      rangeLabel: '4 années-lumière – 5 000+ années-lumière',
      description: 'Explorez les 6 451 exoplanètes confirmées dans 4 847 systèmes stellaires de l’Archive de la NASA ! Visitez Proxima Centauri b (4,24 al) ou les 7 mondes de la taille de la Terre autour de TRAPPIST-1.',
      funPrompt: 'Ouvrez l’Explorateur d’exoplanètes ou cliquez sur une étoile pour inspecter ses mondes !'
    },
    {
      id: 'milky-way',
      index: 3,
      name: 'Galaxie de la Voie Lactée',
      subtitle: 'Notre île de plus de 200 milliards d’étoiles',
      rangeLabel: '100 000 années-lumière de diamètre',
      description: 'Contemplez notre Voie Lactée ! Une immense galaxie spirale barrée comptant 200 à 400 milliards d’étoiles. Notre Système solaire réside dans le Bras d’Orion, à 26 000 années-lumière du trou noir supermassif Sagittaire A*.',
      funPrompt: 'Cherchez le repère « Vous êtes ici (Bras d’Orion) » pour voir où vit notre Soleil !'
    },
    {
      id: 'universe',
      index: 4,
      name: 'L’Univers Observable',
      subtitle: 'Groupe Local, Toile Cosmique et Espace Profond',
      rangeLabel: '2,5 millions – 93 milliards d’années-lumière',
      description: 'À la plus grande échelle, des galaxies entières comme la Voie Lactée et Andromède ne sont que des points lumineux tissés dans la Toile Cosmique sur 93 milliards d’années-lumière !',
      funPrompt: 'Explorez la galaxie d’Andromède et les filaments lumineux de la Toile Cosmique !'
    }
  ],
  it: [
    {
      id: 'earth-moon',
      index: 0,
      name: 'Terra e Luna',
      subtitle: 'La nostra casa e il cortile planetario',
      rangeLabel: '10.000 km – 1 milione km',
      description: 'Benvenuti a casa! La Terra è un mondo oceanico roccioso protetto da una sottile atmosfera blu, accompagnato dalla fedele Luna e dalla Stazione Spaziale Internazionale (ISS).',
      funPrompt: 'Fai clic sulla Terra, sulla Luna o sulla Stazione Spaziale Internazionale!'
    },
    {
      id: 'solar-system',
      index: 1,
      name: 'Sistema Solare e Sonde',
      subtitle: '8 pianeti, Tesla Roadster e Voyager 1/2',
      rangeLabel: '1 UA – 200 UA (30 miliardi km)',
      description: 'Allontanati di milioni di chilometri! Il nostro Sole riunisce 8 pianeti diversi, la Tesla Roadster di Starman che incrocia l’orbita di Marte e le sonde Voyager 1 e Voyager 2 nello spazio interstellare.',
      funPrompt: 'Fai clic su "🚗 Tesla Roadster", "📡 Voyager 1" o "🛸 Voyager 2" per seguirle dal vivo!'
    },
    {
      id: 'nearby-stars',
      index: 2,
      name: 'Stelle Vicine e 6.451 Esopianeti',
      subtitle: 'Tutti i mondi alieni confermati',
      rangeLabel: '4 anni luce – 5.000+ anni luce',
      description: 'Esplora tutti i 6.451 esopianeti confermati in 4.847 sistemi stellari dell’Archivio NASA! Visita Proxima Centauri b (4,24 anni luce) o i 7 mondi rocciosi di TRAPPIST-1.',
      funPrompt: 'Usa l’Esploratore di Esopianeti o fai clic su una stella per scoprire i suoi pianeti!'
    },
    {
      id: 'milky-way',
      index: 3,
      name: 'Galassia Via Lattea',
      subtitle: 'La nostra isola di oltre 200 miliardi di stelle',
      rangeLabel: '100.000 anni luce di diametro',
      description: 'Ammira la nostra Via Lattea! Una gigantesca galassia a spirale barrata con 200–400 miliardi di stelle. Il nostro Sistema Solare si trova nel Braccio di Orione, a 26.000 anni luce dal buco nero supermassiccio Sagittario A*.',
      funPrompt: 'Cerca il segnalino "Sei qui (Braccio di Orione)" per vedere dove vive il nostro Sole!'
    },
    {
      id: 'universe',
      index: 4,
      name: 'L’Universo Osservabile',
      subtitle: 'Gruppo Locale, Rete Cosmica e Spazio Profondo',
      rangeLabel: '2,5 milioni – 93 miliardi di anni luce',
      description: 'Alla scala più grande, intere galassie come la Via Lattea e Andromeda sono solo punti luminosi intessuti nella Rete Cosmica attraverso 93 miliardi di anni luce!',
      funPrompt: 'Esplora Andromeda e i filamenti luminosi della Rete Cosmica!'
    }
  ]
};

function makeObjectsForLang(L) {
  return L;
}

export const COSMIC_OBJECTS_EXTRA = {
  ja: makeObjectsForLang({
    earth: {
      name: '惑星 地球 (Earth)',
      pronunciation: 'チキュウ',
      category: '私たちの母なる惑星',
      badge: '🌍 私たちが暮らす星！',
      quickStats: [
        { label: '直径', value: '12,742 km' },
        { label: '太陽からの距離', value: '1億4,960万 km (1 AU)' },
        { label: '公転周期（1年）', value: '365.25 日' },
        { label: '表面の海', value: '71% が海洋' }
      ],
      kidSummary: '地球は太陽から3番目の惑星であり、宇宙で生命の存在が確認されている唯一の場所です！液体の海、磁気シールド、酸素に満ちた大気が私たちを守っています。',
      funFacts: [
        '地球は完全な球体ではなく、自転の遠心力で赤道部分が少し膨らんでいます！',
        '私たちは今この瞬間も「宇宙船地球号」に乗って時速10万7,000 kmで太陽の周りを飛んでいます！',
        '美しいオーロラは、地球の磁場が太陽風をブロックするときに輝きます。'
      ],
      travelTimes: { light: '0秒（現在地！）', voyager1: '1977年にケープカナベラルから出発！', jetPlane: '赤道一周に約42時間' }
    },
    moon: {
      name: '月 (Luna)',
      pronunciation: 'ツキ',
      category: '地球の天然衛星',
      badge: '🌕 12人の宇宙飛行士が歩いた星',
      quickStats: [
        { label: '地球からの距離', value: '384,400 km' },
        { label: '直径', value: '3,475 km（地球の約1/4）' },
        { label: '公転周期', value: '27.3 日' },
        { label: '表面重力', value: '地球の1/6（6倍高くジャンプ！）' }
      ],
      kidSummary: '月は地球の頼もしいパートナーです！地球と月の間のスペースには、太陽系の残り7つの惑星すべてを並べて収めることができます！',
      funFacts: [
        '月には風も雨もないため、1969年にアポロ宇宙飛行士が残した足跡は何百万年も消えません！',
        '月の引力が地球の海を引っ張ることで、潮の満ち引きが生まれます。',
        '月が自転する周期と地球を1周する周期が同じため、地球からは常に同じ面が見えます。'
      ],
      travelTimes: { light: '1.28秒', voyager1: '最高速度で約6.3時間', apolloRocket: '約3日（1969年アポロ11号）' }
    },
    iss: {
      name: '国際宇宙ステーション (ISS)',
      pronunciation: 'アイ・エス・エス',
      category: '有人宇宙実験室',
      badge: '🛰️ 毎日16回の日の出',
      quickStats: [
        { label: '高度', value: '地上約 408 km' },
        { label: '軌道速度', value: '時速 27,600 km' },
        { label: '大きさ', value: '109 m（サッカー場サイズ）' },
        { label: '地球1周', value: '約 90 分' }
      ],
      kidSummary: '国際宇宙ステーションは地球低軌道に浮かぶ巨大な科学研究所で、宇宙飛行士が暮らし、宇宙レタスを育て、微小重力実験を行っています！',
      funFacts: [
        'ISSの宇宙飛行士は1日に地球を16周し、45分ごとに日の出や日の入りを見ます！',
        '無重力ではふわふわ漂ってしまうため、壁に固定した寝袋に入って眠ります。'
      ],
      travelTimes: { light: '0.0014秒', spacecraft: '打ち上げから4〜8時間' }
    },
    sun: {
      name: '太陽 (Sol)',
      pronunciation: 'タイヨウ',
      category: 'G型主系列星（黄色矮星）',
      badge: '☀️ 太陽系の質量の99.86%',
      quickStats: [
        { label: '直径', value: '139万 km（地球の109倍）' },
        { label: '中心温度', value: '約 1,500万 °C' },
        { label: '年齢', value: '約 46億年' },
        { label: '地球までの光の時間', value: '8分20秒' }
      ],
      kidSummary: '太陽は太陽系の中心で輝く巨大な水素とヘリウムのプラズマ球です。太陽の光と熱がなければ、地球は凍りついた氷の玉になってしまいます！',
      funFacts: [
        '太陽の中には地球が130万個以上も入ります！',
        '太陽は毎秒6億トンの水素をヘリウムに核融合し、莫大な光とエネルギーを生み出しています。'
      ],
      travelTimes: { light: '8分20秒', voyager1: '秒速17 kmで約102日', jetPlane: 'ノンストップで約19年' }
    },
    mercury: {
      name: '水星 (Mercury)',
      pronunciation: 'スイセイ',
      category: '地球型惑星',
      badge: '☄️ 太陽系最速の惑星',
      quickStats: [
        { label: '太陽からの距離', value: '0.39 AU（5,800万 km）' },
        { label: '公転周期', value: '88 日' },
        { label: '衛星', value: '0 個' },
        { label: '表面温度差', value: '-180°C 〜 +430°C' }
      ],
      kidSummary: '水星は太陽系で最も小さく、太陽に最も近い惑星です。どの惑星よりも速く太陽の周りを駆け抜けます！',
      funFacts: ['太陽に一番近いのに、熱を閉じ込める大気がほとんどないため、実は金星の方が高温です！'],
      travelTimes: { light: '地球から平均約5分', voyager1: '約62日' }
    },
    venus: {
      name: '金星 (Venus)',
      pronunciation: 'キンセイ',
      category: '地球型惑星',
      badge: '🌋 最も熱い星・逆回転の自転',
      quickStats: [
        { label: '太陽からの距離', value: '0.72 AU（1億800万 km）' },
        { label: '表面温度', value: '約 465°C（鉛も溶ける！）' },
        { label: '公転周期', value: '225 日' }
      ],
      kidSummary: '金星は地球とほぼ同じ大きさですが、分厚い二酸化炭素の雲が超温室効果を起こし、灼熱の世界になっています！',
      funFacts: ['金星は地球と逆向きに自転しているため、太陽が西から昇って東へ沈みます！'],
      travelTimes: { light: '最接近時に約2.3分', voyager1: '約28日' }
    },
    mars: {
      name: '火星 (Mars)',
      pronunciation: 'カセイ',
      category: '赤い惑星',
      badge: '🤖 探査ローバーが活躍する星',
      quickStats: [
        { label: '太陽からの距離', value: '1.52 AU（2億2,800万 km）' },
        { label: '公転周期', value: '687 日' },
        { label: '最高峰の火山', value: 'オリンポス山（エベレストの3倍！）' }
      ],
      kidSummary: '火星は寒く乾いた赤い砂漠の惑星で、キュリオシティやパーサヴィアランスなどのNASAローバーが太古の水や生命の痕跡を探しています！',
      funFacts: ['火星が赤く見えるのは、地表が酸化鉄（サビ）で覆われているからです！'],
      travelTimes: { light: '約3〜22分', voyager1: '最接近時に約52日', spacecraft: 'ロケットで約7ヶ月' }
    },
    jupiter: {
      name: '木星 (Jupiter)',
      pronunciation: 'モクセイ',
      category: '巨大ガス惑星',
      badge: '🌪️ 太陽系最大の惑星',
      quickStats: [
        { label: '太陽からの距離', value: '5.2 AU（7億7,800万 km）' },
        { label: '直径', value: '139,820 km（地球の11倍）' },
        { label: '衛星数', value: '95 個（エウロパ・イオなど）' }
      ],
      kidSummary: '木星は太陽系最大の巨大ガス惑星です！有名な「大赤斑」は地球よりも大きな嵐で、何百年も吹き荒れています。',
      funFacts: ['木星の中には地球が1,300個も入ります！', '衛星エウロパの氷の下には地球の海の2倍もの液体の海が隠れています。'],
      travelTimes: { light: '約35〜52分', voyager1: '約1年2ヶ月' }
    },
    saturn: {
      name: '土星 (Saturn)',
      pronunciation: 'ドセイ',
      category: '環を持つ巨大ガス惑星',
      badge: '🪐 氷のリングの宝石',
      quickStats: [
        { label: '太陽からの距離', value: '9.5 AU（14億 km）' },
        { label: '環の直径', value: '282,000 km' },
        { label: '衛星数', value: '146 個（タイタン・エンケラドゥスなど）' }
      ],
      kidSummary: '土星は数十億個の輝く氷と岩の粒でできた壮大なリングに囲まれています！',
      funFacts: ['土星は水よりも密度が低いため、巨大なプールがあれば水に浮かびます！'],
      travelTimes: { light: '約1時間20分', voyager1: '約2年3ヶ月' }
    },
    uranus: {
      name: '天王星 (Uranus)',
      pronunciation: 'テンノウセイ',
      category: '巨大氷惑星',
      badge: '🧊 横倒しで自転する氷の巨人',
      quickStats: [
        { label: '太陽からの距離', value: '19.2 AU（29億 km）' },
        { label: '公転周期', value: '84 年' },
        { label: '自転軸の傾き', value: '97.8°（横倒し！）' }
      ],
      kidSummary: '天王星は大気中のメタンによって青緑色に輝く氷の巨大惑星で、自転軸が98度も傾いて転がるように公転しています！',
      funFacts: ['これまで天王星を訪れた探査機は1986年のボイジャー2号だけです！'],
      travelTimes: { light: '約2時間40分', voyager2: '打ち上げから8年半（1986年）' }
    },
    neptune: {
      name: '海王星 (Neptune)',
      pronunciation: 'カイオウセイ',
      category: '巨大氷惑星',
      badge: '💨 太陽系最速の暴風',
      quickStats: [
        { label: '太陽からの距離', value: '30.1 AU（45億 km）' },
        { label: '公転周期', value: '165 年' },
        { label: '最大風速', value: '時速 2,100 km（超音速！）' }
      ],
      kidSummary: '海王星は太陽から最も遠い第8惑星で、音速を超える猛烈な嵐が吹き荒れる深いコバルトブルーの世界です！',
      funFacts: ['海王星は望遠鏡で見つかる前に、数学の計算によって存在が予言された最初の惑星です！'],
      travelTimes: { light: '約4時間10分', voyager2: '打ち上げから12年（1989年）' }
    },
    voyager1: {
      name: 'ボイジャー1号 (Voyager 1)',
      pronunciation: 'ボイジャー・イチゴウ',
      category: 'NASA 星間空間探査機',
      badge: '📡 人類史上もっとも遠くにある人工物',
      quickStats: [
        { label: '打ち上げ日', value: '1977年9月5日' },
        { label: '現在地', value: '星間空間（約 167 AU / 250億 km）' },
        { label: '飛行速度', value: '秒速 17.0 km（時速 61,200 km）' }
      ],
      kidSummary: '1977年に打ち上げられたボイジャー1号は、太陽の磁気圏（ヘリオポーズ）を突破し、人類が作った物体として史上最も遠い星間空間を飛び続けています！',
      funFacts: ['地球の音や音楽、55言語の挨拶を収めた金色の「ゴールデンレコード」を搭載しています！'],
      travelTimes: { light: '電波で片道約23時間' }
    },
    voyager2: {
      name: 'ボイジャー2号 (Voyager 2)',
      pronunciation: 'ボイジャー・ニゴウ',
      category: 'NASA 星間空間探査機',
      badge: '🛸 4大巨大惑星すべてを訪れた唯一の探査機',
      quickStats: [
        { label: '打ち上げ日', value: '1977年8月20日' },
        { label: '現在地', value: '星間空間（約 139 AU / 208億 km）' },
        { label: '飛行速度', value: '秒速 15.4 km' }
      ],
      kidSummary: 'ボイジャー2号は木星・土星・天王星・海王星の4つの巨大惑星すべてをフライバイ観測した史上唯一の探査機で、現在は星間空間を航行中です！',
      funFacts: ['176年に一度の惑星直列を利用して「グランドツアー」を成し遂げました！'],
      travelTimes: { light: '電波で片道約19時間' }
    },
    roadster: {
      name: 'スターマンのテスラ・ロードスター',
      pronunciation: 'テスラ・ロードスター',
      category: '太陽周回人工天体 (2018-017A)',
      badge: '🚗 「Don’t Panic!」宇宙を走る赤いオープンカー',
      quickStats: [
        { label: '打ち上げ日', value: '2018年2月6日（ファルコンヘビー初飛行）' },
        { label: '軌道', value: '地球〜火星横断太陽周回軌道' },
        { label: '公転周期', value: '557 日（1.52年）' }
      ],
      kidSummary: '宇宙服を着たマネキン「スターマン」が乗った本物の赤い電気スポーツカーが、今も約557日周期で太陽の周りを回っています！',
      funFacts: ['ダッシュボードには『銀河ヒッチハイク・ガイド』へのオマージュで「DON’T PANIC!（パニックになるな！）」と書かれています！'],
      travelTimes: { light: '地球との位置により数分〜十数分' }
    },
    heliopause: {
      name: 'ヘリオポーズ（太陽圏境界）',
      pronunciation: 'ヘリオポーズ',
      category: '太陽風の磁気バブルの果て',
      badge: '🛡️ 星間空間への入り口',
      quickStats: [{ label: '太陽からの距離', value: '約 120 AU（180億 km）' }],
      kidSummary: '太陽から吹き出す太陽風が銀河の星間ガスとぶつかって止まる境界線です。ここから外が真の「星間空間」です！',
      funFacts: ['これまでヘリオポーズを越えたのはボイジャー1号（2012年）と2号（2018年）だけです。'],
      travelTimes: { light: '約16.6時間', voyager1: '35年（1977〜2012年）' }
    },
    alphaCentauri: {
      name: 'アルファ・ケンタウリ星系とプロキシマb',
      pronunciation: 'アルファ・ケンタウリ',
      category: '最も近い恒星系とハビタブル系外惑星',
      badge: '⭐ 太陽に一番近い隣の星（4.24光年）',
      quickStats: [
        { label: '地球からの距離', value: '4.24〜4.37 光年' },
        { label: '構成', value: '3重連星（A・B・プロキシマ）' },
        { label: '系外惑星', value: 'プロキシマb（ハビタブルゾーン！）' }
      ],
      kidSummary: '太陽系に最も近い恒星系です！赤色矮星プロキシマ・ケンタウリのハビタブルゾーンには、地球サイズの岩石惑星「プロキシマb」が回っています。',
      funFacts: ['ボイジャー1号のスピードでも、プロキシマ・ケンタウリに着くには約7万3,000年かかります！'],
      travelTimes: { light: '4.24年', voyager1: '約7万3,000年' }
    },
    barnardsStar: {
      name: 'バーナード星 (Barnard’s Star)',
      pronunciation: 'バーナード・セイ',
      category: '赤色矮星 (M4V)',
      badge: '🏃 夜空で最も速く動く恒星',
      quickStats: [{ label: '距離', value: '5.96 光年' }],
      kidSummary: '太陽系から2番目に近い恒星系で、地球の夜空で最も見かけの移動速度（固有運動）が速い赤色矮星です。',
      funFacts: ['秒速約142 kmで太陽系に近づいており、約9,800年後には3.75光年まで接近します！'],
      travelTimes: { light: '5.96年', voyager1: '約10万5,000年' }
    },
    sirius: {
      name: 'シリウス A & B（おおいぬ座α星）',
      pronunciation: 'シリウス',
      category: 'A型主系列星 + 白色矮星連星',
      badge: '💎 地球の夜空で最も明るい恒星',
      quickStats: [{ label: '距離', value: '8.6 光年' }, { label: '明るさ', value: '太陽の 25.4 倍' }],
      kidSummary: '夜空で最も明るく輝く青白い恒星シリウスAと、太陽と同じ重さなのに地球サイズしかない超高密度の白色矮星シリウスBのペアです！',
      funFacts: ['シリウスBの物質はティースプーン1杯で約5トンもの重さがあります！'],
      travelTimes: { light: '8.6年', voyager1: '約15万2,000年' }
    },
    epsilonEridani: {
      name: 'エリダヌス座イプシロン星',
      pronunciation: 'エリダヌス・イプシロン',
      category: '若いK型主系列星',
      badge: '🪐 若い太陽系の姿',
      quickStats: [{ label: '距離', value: '10.5 光年' }],
      kidSummary: '誕生から約8億年の若い恒星で、塵のリングと木星のような巨大惑星を持っており、若き日の太陽系にそっくりです。',
      funFacts: ['1960年のオズマ計画で人類が初めて宇宙人からの電波を探した星の1つです。'],
      travelTimes: { light: '10.5年', voyager1: '約18万5,000年' }
    },
    tauCeti: {
      name: 'くじら座タウ星 (Tau Ceti)',
      pronunciation: 'タウ・セティ',
      category: '太陽に似たG型恒星',
      badge: '☀️ 複数の惑星を持つ太陽似の星',
      quickStats: [{ label: '距離', value: '11.9 光年' }],
      kidSummary: 'わずか11.9光年先にある太陽によく似た安定した黄色い恒星で、少なくとも4つのスーパーアース候補が回っています。',
      funFacts: ['多くのSF作品で人類が最初に訪れる星系として描かれています。'],
      travelTimes: { light: '11.9年', voyager1: '約21万年' }
    },
    trappist1: {
      name: 'TRAPPIST-1（7つの地球型惑星系）',
      pronunciation: 'トラピスト・ワン',
      category: '超低温赤色矮星 + 7つの地球サイズ惑星',
      badge: '🌱 ハビタブルゾーンに3つの地球型惑星！',
      quickStats: [
        { label: '距離', value: '40.7 光年' },
        { label: '確認された惑星', value: '7個の岩石惑星 (b, c, d, e, f, g, h)' },
        { label: 'ハビタブルゾーン', value: '3個 (e, f, g)' }
      ],
      kidSummary: '木星より少し大きいだけの小さな赤色矮星の周りに、なんと地球サイズの岩石惑星が7つもひしめき合って回っています！そのうち3つは液体の海が存在できるハビタブルゾーンにあります。',
      funFacts: ['7つの惑星すべての軌道が、太陽から水星までの距離よりも内側に収まっています！'],
      travelTimes: { light: '40.7年', voyager1: '約71万8,000年' }
    },
    pegasi51: {
      name: 'ペガスス座51番星とディミディウム (51 Pegasi b)',
      pronunciation: 'ペガスス・51',
      category: 'ノーベル賞をもたらした初の系外惑星系',
      badge: '🏆 太陽のような星で見つかった初の系外惑星（1995年）',
      quickStats: [{ label: '距離', value: '50.4 光年' }],
      kidSummary: '1995年、太陽のような恒星の周りをわずか4.2日で回る灼熱の巨大ガス惑星（ホット・ジュピター）が初めて発見され、2019年ノーベル物理学賞を受賞しました！',
      funFacts: ['この発見をきっかけに、人類はこれまでに6,451個以上の系外惑星を発見しました。'],
      travelTimes: { light: '50.4年', voyager1: '約89万年' }
    },
    orionSpur: {
      name: 'オリオン腕（太陽系の現在地）',
      pronunciation: 'オリオン・ワン',
      category: '天の川銀河のローカル渦状腕',
      badge: '📍 私たちの銀河の住所',
      quickStats: [{ label: '銀河中心からの距離', value: '約 26,000 光年' }, { label: '銀河公転周期', value: '2億3,000万年（1銀河年）' }],
      kidSummary: '天の川銀河の巨大な渦の中で、私たちの太陽系が暮らしている静かな渦状腕です。',
      funFacts: ['太陽系が前回この位置にいたとき、地球ではちょうど最初の恐竜が歩き始めていました！'],
      travelTimes: { light: '0年（私たちはこの腕の中にいます！）' }
    },
    sagittariusA: {
      name: 'いて座A* (Sagittarius A*)',
      pronunciation: 'イテザ・エースター',
      category: '超大質量ブラックホール',
      badge: '🕳️ 太陽の430万倍の質量！',
      quickStats: [{ label: '地球からの距離', value: '26,670 光年' }, { label: '質量', value: '太陽の 430万倍' }],
      kidSummary: '天の川銀河のど真ん中に鎮座する超大質量ブラックホールです。2022年にイベント・ホライズン・テレスコープがその輝くリングの撮影に成功しました！',
      funFacts: ['重力が強すぎて光さえ脱出できませんが、その重力のおかげで天の川銀河の星々がまとまっています。'],
      travelTimes: { light: '2万6,670年', voyager1: '約4億7,000万年' }
    },
    milkyWayDisk: {
      name: '天の川銀河（銀河系）',
      pronunciation: 'アマノガワ・ギンガ',
      category: '棒渦巻銀河',
      badge: '🌌 2,000億〜4,000億個の恒星',
      quickStats: [{ label: '直径', value: '約 105,700 光年' }, { label: '恒星の数', value: '2,000億〜4,000億個' }],
      kidSummary: '私たちが暮らす巨大な棒渦巻銀河です。端から端まで光の速さで飛んでも10万年以上かかります！',
      funFacts: ['天の川銀河のほぼすべての星が少なくとも1つの惑星を持っているため、銀河系には何千億もの惑星があります！'],
      travelTimes: { light: '端から端まで10万5,700年' }
    },
    andromeda: {
      name: 'アンドロメダ銀河 (M31)',
      pronunciation: 'アンドロメダ・ギンガ',
      category: '巨大渦巻銀河',
      badge: '🌀 1兆個の恒星を持つ隣の巨銀河',
      quickStats: [{ label: '距離', value: '253万7,000 光年' }, { label: '直径', value: '約 152,000 光年' }],
      kidSummary: '天の川銀河のお隣にある最も大きな渦巻銀河で、約1兆個の恒星が輝いています。暗い夜空なら肉眼でも見える最も遠い天体です！',
      funFacts: ['秒速110 kmで天の川銀河に向かって近づいており、約45億年後に合体して1つの巨大な銀河になります！'],
      travelTimes: { light: '253万7,000年' }
    },
    triangulum: {
      name: 'さんかく座銀河 (M33)',
      pronunciation: 'サンカクザ・ギンガ',
      category: '局部銀河群第3の渦巻銀河',
      badge: '✨ 400億個の恒星',
      quickStats: [{ label: '距離', value: '273万 光年' }, { label: '直径', value: '61,000 光年' }],
      kidSummary: 'アンドロメダ銀河、天の川銀河とともに私たちの「局部銀河群」を形作る美しい渦巻銀河です。',
      funFacts: ['猛烈な勢いで新しい青い恒星を生み出している星形成銀河です！'],
      travelTimes: { light: '273万年' }
    },
    laniakea: {
      name: 'ラニアケア超銀河団と宇宙の大規模構造',
      pronunciation: 'ラニアケア',
      category: '10万個の銀河が集まる超銀河団',
      badge: '🕸️ ハワイ語で「果てしない天国」',
      quickStats: [{ label: '広がり', value: '5億2,000万 光年' }, { label: '観測可能な宇宙', value: '直径 930億 光年（2兆個の銀河！）' }],
      kidSummary: '最大のスケールへズームアウト！私たちの天の川銀河も、10万個の銀河が集まるラニアケア超銀河団の小さな光の粒であり、宇宙全体に広がる「コズミック・ウェブ（宇宙の網）」の一部です。',
      funFacts: ['私たちの骨のカルシウムや血液の鉄はすべて、何十億年も前の恒星の内部で作られました。私たちは文字通り「星くず」からできているのです！'],
      travelTimes: { light: '観測可能な宇宙の端から端まで930億光年！' }
    }
  }),

  ko: makeObjectsForLang({
    earth: {
      name: '지구 (Planet Earth)',
      pronunciation: '지-구',
      category: '우리의 고향 행성',
      badge: '🌍 우리가 사는 곳!',
      quickStats: [
        { label: '지름', value: '12,742 km' },
        { label: '태양과의 거리', value: '1억 4,960만 km (1 AU)' },
        { label: '공전 주기(1년)', value: '365.25일' },
        { label: '표면의 물', value: '71% 바다' }
      ],
      kidSummary: '지구는 태양에서 세 번째 행성이자 우주에서 생명체가 사는 것으로 알려진 유일한 곳입니다! 액체 상태의 바다, 자기장 방패, 산소가 풍부한 대기가 우리를 안전하게 지켜줍니다.',
      funFacts: [
        '지구는 완벽한 구형이 아니라 자전 때문에 적도 부분이 살짝 부풀어 있습니다!',
        '여러분은 지금 시속 107,000 km로 태양 주위를 달리는 "우주선 지구호"를 타고 있습니다!'
      ],
      travelTimes: { light: '0초 (현재 위치!)', voyager1: '1977년 케이프커내버럴에서 출발!', jetPlane: '적도 일주 약 42시간' }
    },
    moon: {
      name: '달 (The Moon)',
      pronunciation: '달',
      category: '자연 위성',
      badge: '🌕 12명의 우주인이 걸은 곳',
      quickStats: [
        { label: '지구와의 거리', value: '384,400 km' },
        { label: '지름', value: '3,475 km (지구의 약 1/4)' },
        { label: '공전 주기', value: '27.3일' },
        { label: '표면 중력', value: '지구의 1/6 (6배 높이 점프!)' }
      ],
      kidSummary: '달은 지구의 변함없는 암석 동반자입니다! 지구와 달 사이의 공간에는 태양계의 나머지 7개 행성을 일렬로 모두 넣을 수 있습니다!',
      funFacts: [
        '달에는 바람이나 비가 없어서 1969년 아폴로 우주비행사들이 남긴 발자국이 수백만 년 동안 그대로 남습니다!',
        '달의 중력이 지구의 바다를 당겨 밀물과 썰물을 만듭니다.'
      ],
      travelTimes: { light: '1.28초', voyager1: '최고 속도로 6.3시간', apolloRocket: '약 3일 (1969년 아폴로 11호)' }
    },
    iss: {
      name: '국제우주정거장 (ISS)',
      pronunciation: '아이-에스-에스',
      category: '인류의 우주 실험실',
      badge: '🛰️ 매일 16번의 일출',
      quickStats: [
        { label: '고도', value: '지구 상공 408 km' },
        { label: '궤도 속도', value: '시속 27,600 km' },
        { label: '크기', value: '109 m (축구장 크기)' }
      ],
      kidSummary: '국제우주정거장은 지구 저궤도를 도는 거대한 과학 실험실로, 우주비행사들이 생활하며 무중력 실험을 수행합니다!',
      funFacts: ['ISS의 우주비행사들은 하루에 지구를 16바퀴 돌며 45분마다 일출이나 일몰을 봅니다!'],
      travelTimes: { light: '0.0014초', spacecraft: '발사 후 4~8시간' }
    },
    sun: {
      name: '태양 (The Sun)',
      pronunciation: '태-양',
      category: '황색 왜성 (G2V)',
      badge: '☀️ 태양계 질량의 99.86%',
      quickStats: [
        { label: '지름', value: '139만 km (지구의 109배)' },
        { label: '중심 온도', value: '1,500만 °C' },
        { label: '빛 도달 시간', value: '8분 20초' }
      ],
      kidSummary: '태양은 태양계 중심에서 빛나는 거대한 수소·헬륨 플라스마 구체입니다. 태양의 빛과 열이 없다면 지구는 얼음덩어리가 될 것입니다!',
      funFacts: ['태양 안에는 지구가 130만 개 이상 들어갑니다!'],
      travelTimes: { light: '8분 20초', voyager1: '약 102일', jetPlane: '약 19년' }
    },
    mercury: {
      name: '수성 (Mercury)',
      pronunciation: '수-성',
      category: '암석 행성',
      badge: '☄️ 가장 빠른 행성',
      quickStats: [{ label: '태양과의 거리', value: '0.39 AU (5,800만 km)' }, { label: '공전 주기', value: '88일' }],
      kidSummary: '수성은 태양계에서 가장 작고 태양에 가장 가까운 행성으로, 가장 빠른 속도로 태양을 공전합니다!',
      funFacts: ['열을 가둘 대기가 거의 없어서 태양에 가장 가까운데도 금성보다 덜 뜨겁습니다!'],
      travelTimes: { light: '약 5분', voyager1: '약 62일' }
    },
    venus: {
      name: '금성 (Venus)',
      pronunciation: '금-성',
      category: '암석 행성',
      badge: '🌋 가장 뜨거운 행성 & 역자전',
      quickStats: [{ label: '태양과의 거리', value: '0.72 AU' }, { label: '표면 온도', value: '465°C (납도 녹는 온도!)' }],
      kidSummary: '금성은 지구와 크기가 거의 같지만 두꺼운 구름이 열을 가두는 초강력 온실효과로 가장 뜨거운 행성입니다!',
      funFacts: ['금성은 지구와 반대로 자전해서 태양이 서쪽에서 떠서 동쪽으로 집니다!'],
      travelTimes: { light: '약 2.3분', voyager1: '약 28일' }
    },
    mars: {
      name: '화성 (Mars)',
      pronunciation: '화-성',
      category: '붉은 행성',
      badge: '🤖 로봇 로버들의 고향',
      quickStats: [{ label: '태양과의 거리', value: '1.52 AU' }, { label: '최고봉 화산', value: '올림푸스 산 (에베레스트의 3배!)' }],
      kidSummary: '화성은 차갑고 붉은 사막 행성으로, 큐리오시티와 퍼서비어런스 같은 NASA 로버들이 고대 물과 생명체의 흔적을 찾고 있습니다!',
      funFacts: ['화성이 붉게 보이는 이유는 토양이 산화철(녹)로 덮여 있기 때문입니다!'],
      travelTimes: { light: '3~22분', voyager1: '약 52일', spacecraft: '약 7개월' }
    },
    jupiter: {
      name: '목성 (Jupiter)',
      pronunciation: '목-성',
      category: '거대 가스 행성',
      badge: '🌪️ 태양계 최대 행성',
      quickStats: [{ label: '태양과의 거리', value: '5.2 AU' }, { label: '지름', value: '139,820 km (지구의 11배)' }],
      kidSummary: '목성은 태양계에서 가장 큰 가스 행성입니다! 유명한 대적점은 지구보다 큰 폭풍으로 수백 년째 몰아치고 있습니다.',
      funFacts: ['위성 유로파의 얼음 지각 아래에는 지구 전체 바다의 2배에 달하는 바다가 숨어 있습니다!'],
      travelTimes: { light: '35~52분', voyager1: '1년 2개월' }
    },
    saturn: {
      name: '토성 (Saturn)',
      pronunciation: '토-성',
      category: '고리를 가진 거대 가스 행성',
      badge: '🪐 얼음 고리의 보석',
      quickStats: [{ label: '태양과의 거리', value: '9.5 AU' }, { label: '고리 지름', value: '282,000 km' }],
      kidSummary: '토성은 수십억 개의 반짝이는 얼음과 암석 조각으로 이루어진 장엄한 고리로 둘러싸여 있습니다!',
      funFacts: ['토성은 물보다 밀도가 낮아서 거대한 욕조가 있다면 물에 뜹니다!'],
      travelTimes: { light: '1시간 20분', voyager1: '2년 3개월' }
    },
    uranus: {
      name: '천왕성 (Uranus)',
      pronunciation: '천-왕-성',
      category: '거대 얼음 행성',
      badge: '🧊 옆으로 누워 자전하는 행성',
      quickStats: [{ label: '태양과의 거리', value: '19.2 AU' }, { label: '자전축 기울기', value: '97.8°' }],
      kidSummary: '천왕성은 메탄 대기로 인해 청록색으로 빛나는 거대 얼음 행성이며, 옆으로 누운 채 공전합니다!',
      funFacts: ['1986년 보이저 2호가 스쳐 지나간 유일한 탐사선입니다!'],
      travelTimes: { light: '2시간 40분', voyager2: '8.5년 (1986년)' }
    },
    neptune: {
      name: '해왕성 (Neptune)',
      pronunciation: '해-왕-성',
      category: '거대 얼음 행성',
      badge: '💨 태양계에서 가장 빠른 폭풍',
      quickStats: [{ label: '태양과의 거리', value: '30.1 AU' }, { label: '최대 풍속', value: '시속 2,100 km (초음속!)' }],
      kidSummary: '해왕성은 태양에서 가장 먼 8번째 행성으로, 초음속 폭풍이 몰아치는 푸른 얼음 거인입니다!',
      funFacts: ['망원경으로 관측되기 전에 수학 계산으로 먼저 예측된 최초의 행성입니다!'],
      travelTimes: { light: '4시간 10분', voyager2: '12년 (1989년)' }
    },
    voyager1: {
      name: '보이저 1호 (Voyager 1)',
      pronunciation: '보이저 일호',
      category: 'NASA 성간 우주 탐사선',
      badge: '📡 인류가 만든 가장 멀리 간 물체',
      quickStats: [{ label: '발사일', value: '1977년 9월 5일' }, { label: '현재 위치', value: '성간 우주 (~167 AU / 250억 km)' }],
      kidSummary: '1977년 발사된 보이저 1호는 태양권계면(헬리오포즈)을 넘어 성간 우주를 비행하는 인류 역사상 가장 멀리 간 탐사선입니다!',
      funFacts: ['지구의 소리와 음악, 55개 언어 인사를 담은 골든 레코드를 싣고 있습니다!'],
      travelTimes: { light: '전파 편도 약 23시간' }
    },
    voyager2: {
      name: '보이저 2호 (Voyager 2)',
      pronunciation: '보이저 이호',
      category: 'NASA 성간 우주 탐사선',
      badge: '🛸 4대 거대 행성을 모두 방문한 유일한 탐사선',
      quickStats: [{ label: '발사일', value: '1977년 8월 20일' }, { label: '현재 위치', value: '성간 우주 (~139 AU / 208억 km)' }],
      kidSummary: '보이저 2호는 목성, 토성, 천왕성, 해왕성을 모두 근접 탐사한 유일한 우주선이며 현재 성간 우주를 여행 중입니다!',
      funFacts: ['176년 만의 행성 정렬을 이용해 그랜드 투어를 달성했습니다!'],
      travelTimes: { light: '전파 편도 약 19시간' }
    },
    roadster: {
      name: '스타맨의 테슬라 로드스터',
      pronunciation: '테슬라 로드스터',
      category: '태양 공전 인공 천체 (2018-017A)',
      badge: '🚗 "Don’t Panic!" 우주를 달리는 스포츠카',
      quickStats: [{ label: '발사일', value: '2018년 2월 6일' }, { label: '공전 주기', value: '557일' }],
      kidSummary: '우주복 마네킹 "스타맨"을 태운 실제 전기 스포츠카가 557일 주기로 지구와 화성 궤도를 가로지르며 태양을 돌고 있습니다!',
      funFacts: ['계기판에는 《은하수를 여행하는 히치하이커를 위한 안내서》의 문구 "DON’T PANIC!"이 적혀 있습니다!'],
      travelTimes: { light: '수 분~십수 분' }
    },
    heliopause: {
      name: '헬리오포즈 (태양권계면)',
      pronunciation: '헬리오포즈',
      category: '태양풍 자기 거품의 경계',
      badge: '🛡️ 성간 우주의 관문',
      quickStats: [{ label: '거리', value: '약 120 AU (180억 km)' }],
      kidSummary: '태양풍이 성간 매질과 부딪혀 멈추는 경계선으로, 이곳 너머가 진정한 성간 우주입니다!',
      funFacts: ['보이저 1호와 2호만이 이 경계를 통과했습니다.'],
      travelTimes: { light: '16.6시간', voyager1: '35년' }
    },
    alphaCentauri: {
      name: '알파 센타우리 항성계 & 프록시마 b',
      pronunciation: '알파 센타우리',
      category: '가장 가까운 항성계 & 거주가능 외계행성',
      badge: '⭐ 태양에서 가장 가까운 이웃 별 (4.24광년)',
      quickStats: [{ label: '거리', value: '4.24~4.37 광년' }, { label: '외계행성', value: '프록시마 b (골디락스 존!)' }],
      kidSummary: '태양계에서 가장 가까운 항성계입니다! 적색왜성 프록시마 센타우리의 거주가능 영역에는 지구 크기의 암석 행성 프록시마 b가 돌고 있습니다.',
      funFacts: ['보이저 1호의 속도로 가도 약 73,000년이 걸립니다!'],
      travelTimes: { light: '4.24년', voyager1: '약 73,000년' }
    },
    barnardsStar: {
      name: '바너드 별 (Barnard’s Star)',
      pronunciation: '바너드 별',
      category: '적색왜성 (M4V)',
      badge: '🏃 밤하늘에서 가장 빠르게 움직이는 별',
      quickStats: [{ label: '거리', value: '5.96 광년' }],
      kidSummary: '태양에서 두 번째로 가까운 항성계로, 밤하늘에서 고유운동이 가장 빠른 적색왜성입니다.',
      funFacts: ['초속 142 km로 태양계를 향해 다가오고 있습니다!'],
      travelTimes: { light: '5.96년', voyager1: '약 105,000년' }
    },
    sirius: {
      name: '시리우스 A & B',
      pronunciation: '시리우스',
      category: '청백색 주계열성 + 백색왜성 쌍성',
      badge: '💎 밤하늘에서 가장 밝은 별',
      quickStats: [{ label: '거리', value: '8.6 광년' }, { label: '밝기', value: '태양의 25.4배' }],
      kidSummary: '밤하늘에서 가장 밝은 시리우스 A와 태양 질량이 지구 크기에 압축된 백색왜성 시리우스 B의 쌍성계입니다!',
      funFacts: ['시리우스 B의 물질 한 티스푼은 코끼리 한 마리만큼 무겁습니다!'],
      travelTimes: { light: '8.6년', voyager1: '약 152,000년' }
    },
    epsilonEridani: {
      name: '에리다누스자리 엡실론',
      pronunciation: '엡실론 에리다니',
      category: '젊은 K형 항성',
      badge: '🪐 젊은 태양계의 모습',
      quickStats: [{ label: '거리', value: '10.5 광년' }],
      kidSummary: '약 8억 년 된 젊은 별로, 먼지 원반과 목성형 행성을 거느리고 있어 초기 태양계와 닮았습니다.',
      funFacts: ['1960년 오즈마 프로젝트에서 외계 전파를 탐색한 첫 표적 중 하나였습니다.'],
      travelTimes: { light: '10.5년', voyager1: '약 185,000년' }
    },
    tauCeti: {
      name: '고래자리 타우 (Tau Ceti)',
      pronunciation: '타우 세티',
      category: '태양을 닮은 G형 항성',
      badge: '☀️ 다수의 행성을 가진 태양형 별',
      quickStats: [{ label: '거리', value: '11.9 광년' }],
      kidSummary: '11.9광년 거리에 있는 태양과 비슷한 안정적인 별로, 여러 개의 슈퍼지구 후보가 공전하고 있습니다.',
      funFacts: ['수많은 SF 작품에서 인류의 첫 성간 탐사지로 등장합니다.'],
      travelTimes: { light: '11.9년', voyager1: '약 210,000년' }
    },
    trappist1: {
      name: 'TRAPPIST-1 (7개 지구형 행성계)',
      pronunciation: '트라피스트 원',
      category: '초저온 적색왜성 + 7개 암석 행성',
      badge: '🌱 골디락스 존에 지구 크기 행성 3개!',
      quickStats: [{ label: '거리', value: '40.7 광년' }, { label: '확인된 행성', value: '7개 암석 행성 (b~h)' }],
      kidSummary: '목성보다 조금 큰 적색왜성 주위에 지구 크기의 암석 행성 7개가 모여 돌고 있으며, 그중 3개는 액체 물이 가능한 거주가능 영역에 있습니다!',
      funFacts: ['7개 행성 모두가 태양~수성 거리보다 훨씬 안쪽에서 공전합니다!'],
      travelTimes: { light: '40.7년', voyager1: '약 718,000년' }
    },
    pegasi51: {
      name: '페가수스자리 51 & 디미디움',
      pronunciation: '페가수스 51',
      category: '노벨상을 안긴 최초의 외계행성계',
      badge: '🏆 태양형 별 주위 최초 외계행성 (1995년)',
      quickStats: [{ label: '거리', value: '50.4 광년' }],
      kidSummary: '1995년 태양 같은 별 주위에서 발견된 최초의 외계행성(뜨거운 목성)으로, 2019년 노벨 물리학상을 받았습니다!',
      funFacts: ['이 발견 이후 인류는 6,451개가 넘는 외계행성을 찾아냈습니다.'],
      travelTimes: { light: '50.4년', voyager1: '약 890,000년' }
    },
    orionSpur: {
      name: '오리온 팔 (태양계의 현재 위치)',
      pronunciation: '오리온 팔',
      category: '우리은하의 국부 나선팔',
      badge: '📍 우리의 은하 주소',
      quickStats: [{ label: '은하 중심까지 거리', value: '약 26,000 광년' }],
      kidSummary: '우리은하의 거대한 나선팔 사이에서 태양계가 자리 잡은 평화로운 이웃 구역입니다.',
      funFacts: ['태양계가 은하를 한 바퀴 도는 데는 약 2억 3천만 년이 걸립니다!'],
      travelTimes: { light: '0년 (현재 위치!)' }
    },
    sagittariusA: {
      name: '궁수자리 A* (Sagittarius A*)',
      pronunciation: '궁수자리 에이 스타',
      category: '초대질량 블랙홀',
      badge: '🕳️ 태양 질량의 430만 배!',
      quickStats: [{ label: '거리', value: '26,670 광년' }, { label: '질량', value: '태양의 430만 배' }],
      kidSummary: '우리은하 한가운데 자리한 초대질량 블랙홀입니다. 2022년 사건지평선망원경(EHT)이 빛나는 고리를 촬영했습니다!',
      funFacts: ['강력한 중력으로 수천억 개의 별이 은하를 이루며 돌게 합니다.'],
      travelTimes: { light: '26,670년', voyager1: '약 4억 7천만 년' }
    },
    milkyWayDisk: {
      name: '우리은하 (Milky Way Galaxy)',
      pronunciation: '우리은하',
      category: '막대나선은하',
      badge: '🌌 2,000억~4,000억 개의 별',
      quickStats: [{ label: '지름', value: '105,700 광년' }],
      kidSummary: '우리가 사는 거대한 막대나선은하로, 빛의 속도로 가로질러도 10만 년 이상 걸립니다!',
      funFacts: ['우리은하에는 수천억 개의 행성이 존재할 것으로 추정됩니다!'],
      travelTimes: { light: '가로지르는 데 105,700년' }
    },
    andromeda: {
      name: '안드로메다 은하 (M31)',
      pronunciation: '안드로메다 은하',
      category: '거대 나선은하',
      badge: '🌀 1조 개의 별을 품은 이웃 은하',
      quickStats: [{ label: '거리', value: '253만 7,000 광년' }, { label: '지름', value: '152,000 광년' }],
      kidSummary: '약 1조 개의 별을 가진 가장 가까운 대형 나선은하로, 맨눈으로 볼 수 있는 가장 먼 천체입니다!',
      funFacts: ['약 45억 년 뒤 우리은하와 합쳐져 거대한 타원은하를 이룰 예정입니다!'],
      travelTimes: { light: '253만 7,000년' }
    },
    triangulum: {
      name: '삼각형자리 은하 (M33)',
      pronunciation: '삼각형자리 은하',
      category: '국부은하군 3위 나선은하',
      badge: '✨ 400억 개의 별',
      quickStats: [{ label: '거리', value: '273만 광년' }],
      kidSummary: '안드로메다, 우리은하와 함께 국부은하군을 이루는 아름다운 나선은하입니다.',
      funFacts: ['젊고 푸른 아기 별들을 매우 활발하게 탄생시키고 있습니다!'],
      travelTimes: { light: '273만 년' }
    },
    laniakea: {
      name: '라니아케아 초은하단 & 우주 거대구조',
      pronunciation: '라니아케아',
      category: '10만 개 은하의 초은하단',
      badge: '🕸️ 하와이어로 "헤아릴 수 없는 하늘"',
      quickStats: [{ label: '크기', value: '5억 2,000만 광년' }, { label: '관측 가능한 우주', value: '930억 광년 (2조 개 은하!)' }],
      kidSummary: '우리은하는 10만 개 은하가 모인 라니아케아 초은하단의 작은 점이며, 930억 광년에 걸친 우주 거대구조(코스믹 웹)의 일부입니다!',
      funFacts: ['우리 몸을 이루는 원자들은 모두 수십억 년 전 별의 중심에서 만들어졌습니다. 우리는 모두 별의 먼지입니다!'],
      travelTimes: { light: '관측 가능한 우주 끝까지 930억 광년!' }
    }
  }),

  pt: makeObjectsForLang({
    earth: {
      name: 'Planeta Terra',
      pronunciation: 'TÉ-rra',
      category: 'Planeta Natal',
      badge: '🌍 Onde nós vivemos!',
      quickStats: [
        { label: 'Diâmetro', value: '12.742 km' },
        { label: 'Distância ao Sol', value: '149,6 milhões km (1 UA)' },
        { label: 'Duração do ano', value: '365,25 dias' },
        { label: 'Água na superfície', value: '71% oceanos' }
      ],
      kidSummary: 'A Terra é o terceiro planeta a partir do Sol e o único lugar conhecido no universo que abriga vida! Seus oceanos líquidos, escudo magnético e atmosfera rica em oxigênio nos mantêm seguros.',
      funFacts: [
        'A Terra não é uma esfera perfeita: a rotação faz o equador ficar levemente abaulado!',
        'Você está viajando na Espaçonave Terra ao redor do Sol a 107.000 km/h!'
      ],
      travelTimes: { light: '0 segundos (Você está aqui!)', voyager1: 'Lançada do Cabo Canaveral em 1977!', jetPlane: '42 horas ao redor do equador' }
    },
    moon: {
      name: 'A Lua (Luna)',
      pronunciation: 'LU-a',
      category: 'Satélite Natural',
      badge: '🌕 12 humanos caminharam aqui',
      quickStats: [
        { label: 'Distância da Terra', value: '384.400 km' },
        { label: 'Diâmetro', value: '3.475 km (1/4 da Terra)' },
        { label: 'Gravidade', value: '1/6 da Terra (Pule 6x mais alto!)' }
      ],
      kidSummary: 'A Lua é a fiel companheira rochosa da Terra! Caberiam todos os outros 7 planetas do Sistema Solar alinhados entre a Terra e a Lua!',
      funFacts: ['Como não há vento nem chuva na Lua, as pegadas dos astronautas da Apollo durarão milhões de anos!'],
      travelTimes: { light: '1,28 segundos', voyager1: '6,3 horas', apolloRocket: '3 dias (Apollo 11 em 1969)' }
    },
    iss: {
      name: 'Estação Espacial Internacional (ISS)',
      pronunciation: 'I-S-S',
      category: 'Laboratório Espacial Humano',
      badge: '🛰️ 16 nasceres do sol por dia',
      quickStats: [{ label: 'Altitude', value: '408 km acima da Terra' }, { label: 'Velocidade', value: '27.600 km/h' }],
      kidSummary: 'Um laboratório científico gigante em órbita baixa onde astronautas vivem e fazem experimentos em microgravidade!',
      funFacts: ['Os astronautas dão 16 voltas na Terra por dia, vendo um nascer do sol a cada 45 minutos!'],
      travelTimes: { light: '0,0014 segundos', spacecraft: '4 a 8 horas após o lançamento' }
    },
    sun: {
      name: 'O Sol (Sol)',
      pronunciation: 'SOL',
      category: 'Estrela Anã Amarela (G2V)',
      badge: '☀️ 99,86% da massa do Sistema Solar',
      quickStats: [{ label: 'Diâmetro', value: '1,39 milhão km (109x a Terra)' }, { label: 'Temp. do núcleo', value: '15 milhões °C' }],
      kidSummary: 'O Sol é uma esfera gigantesca de plasma de hidrogênio e hélio no centro do Sistema Solar!',
      funFacts: ['Mais de 1,3 milhão de Terras caberiam dentro do Sol!'],
      travelTimes: { light: '8 minutos e 20 segundos', voyager1: '102 dias', jetPlane: '19 anos' }
    },
    mercury: {
      name: 'Mercúrio',
      pronunciation: 'mer-CÚ-ri-o',
      category: 'Planeta Rochoso',
      badge: '☄️ Planeta mais rápido',
      quickStats: [{ label: 'Distância ao Sol', value: '0,39 UA' }, { label: 'Duração do ano', value: '88 dias' }],
      kidSummary: 'Mercúrio é o menor planeta do Sistema Solar e o mais próximo do Sol!',
      funFacts: ['Mesmo sendo o mais próximo do Sol, Vênus é mais quente porque Mercúrio quase não tem atmosfera!'],
      travelTimes: { light: '5 minutos', voyager1: '62 dias' }
    },
    venus: {
      name: 'Vênus',
      pronunciation: 'VÊ-nus',
      category: 'Planeta Rochoso',
      badge: '🌋 Planeta mais quente e gira ao contrário',
      quickStats: [{ label: 'Distância ao Sol', value: '0,72 UA' }, { label: 'Temperatura', value: '465 °C' }],
      kidSummary: 'Vênus tem quase o tamanho da Terra, mas suas densas nuvens criam um efeito estufa extremo!',
      funFacts: ['Em Vênus o Sol nasce no oeste e se põe no leste!'],
      travelTimes: { light: '2,3 minutos', voyager1: '28 dias' }
    },
    mars: {
      name: 'Marte',
      pronunciation: 'MAR-te',
      category: 'O Planeta Vermelho',
      badge: '🤖 Lar dos rovers robóticos',
      quickStats: [{ label: 'Distância ao Sol', value: '1,52 UA' }, { label: 'Maior vulcão', value: 'Monte Olimpo (3x o Everest!)' }],
      kidSummary: 'Marte é um planeta desértico frio e avermelhado onde os rovers Curiosity e Perseverance buscam sinais de água antiga!',
      funFacts: ['Marte é vermelho por causa do óxido de ferro (ferrugem) em seu solo!'],
      travelTimes: { light: '3 a 22 minutos', voyager1: '52 dias', spacecraft: '7 meses' }
    },
    jupiter: {
      name: 'Júpiter',
      pronunciation: 'JÚ-pi-ter',
      category: 'Gigante Gasoso',
      badge: '🌪️ Maior planeta do Sistema Solar',
      quickStats: [{ label: 'Distância ao Sol', value: '5,2 UA' }, { label: 'Diâmetro', value: '139.820 km (11x a Terra)' }],
      kidSummary: 'Júpiter é o rei dos planetas! Sua Grande Mancha Vermelha é uma tempestade maior que a Terra.',
      funFacts: ['A lua Europa esconde um oceano líquido sob o gelo com o dobro da água da Terra!'],
      travelTimes: { light: '35 a 52 minutos', voyager1: '1 ano e 2 meses' }
    },
    saturn: {
      name: 'Saturno',
      pronunciation: 'sa-TUR-no',
      category: 'Gigante Gasoso com Anéis',
      badge: '🪐 A joia dos anéis de gelo',
      quickStats: [{ label: 'Distância ao Sol', value: '9,5 UA' }, { label: 'Diâmetro dos anéis', value: '282.000 km' }],
      kidSummary: 'Saturno é cercado por anéis deslumbrantes feitos de bilhões de pedaços de gelo brilhante!',
      funFacts: ['Saturno é menos denso que a água — flutuaria em uma banheira gigante!'],
      travelTimes: { light: '1 hora e 20 minutos', voyager1: '2 anos e 3 meses' }
    },
    uranus: {
      name: 'Urano',
      pronunciation: 'u-RA-no',
      category: 'Gigante de Gelo',
      badge: '🧊 O planeta que gira de lado',
      quickStats: [{ label: 'Distância ao Sol', value: '19,2 UA' }, { label: 'Inclinação', value: '97,8°' }],
      kidSummary: 'Urano é um gigante de gelo azul-esverdeado que gira deitado de lado ao redor do Sol!',
      funFacts: ['A Voyager 2 em 1986 foi a única nave a visitar Urano!'],
      travelTimes: { light: '2 horas e 40 minutos', voyager2: '8,5 anos' }
    },
    neptune: {
      name: 'Netuno',
      pronunciation: 'ne-TU-no',
      category: 'Gigante de Gelo',
      badge: '💨 Ventos mais rápidos do Sistema Solar',
      quickStats: [{ label: 'Distância ao Sol', value: '30,1 UA' }, { label: 'Ventos', value: '2.100 km/h' }],
      kidSummary: 'Netuno é o oitavo e mais distante planeta do Sol, varrido por tempestades supersônicas!',
      funFacts: ['Netuno foi o primeiro planeta previsto pela matemática antes de ser visto no telescópio!'],
      travelTimes: { light: '4 horas e 10 minutos', voyager2: '12 anos' }
    },
    voyager1: {
      name: 'Voyager 1',
      pronunciation: 'VÓI-a-ger 1',
      category: 'Sonda Interestelar da NASA',
      badge: '📡 Objeto humano mais distante',
      quickStats: [{ label: 'Lançamento', value: '5 de setembro de 1977' }, { label: 'Localização', value: 'Espaço Interestelar (~167 UA)' }],
      kidSummary: 'Lançada em 1977, a Voyager 1 cruzou a Heliopausa e viaja pelo espaço interestelar levando o Disco de Ouro!',
      funFacts: ['Carrega saudações em 55 idiomas, incluindo português!'],
      travelTimes: { light: '~23 horas de sinal de rádio' }
    },
    voyager2: {
      name: 'Voyager 2',
      pronunciation: 'VÓI-a-ger 2',
      category: 'Sonda Interestelar da NASA',
      badge: '🛸 Única sonda a visitar os 4 gigantes',
      quickStats: [{ label: 'Lançamento', value: '20 de agosto de 1977' }, { label: 'Localização', value: 'Espaço Interestelar (~139 UA)' }],
      kidSummary: 'A única espaçonave que visitou Júpiter, Saturno, Urano e Netuno, hoje no espaço interestelar!',
      funFacts: ['Aproveitou um alinhamento planetário que ocorre a cada 176 anos!'],
      travelTimes: { light: '~19 horas de sinal de rádio' }
    },
    roadster: {
      name: 'Tesla Roadster do Starman',
      pronunciation: 'TES-la RÔUD-ster',
      category: 'Objeto Artificial Heliocêntrico',
      badge: '🚗 "Don’t Panic!" carro esportivo no espaço',
      quickStats: [{ label: 'Lançamento', value: '6 de fevereiro de 2018' }, { label: 'Período orbital', value: '557 dias' }],
      kidSummary: 'Um carro esportivo elétrico real com o manequim Starman que orbita o Sol cruzando a órbita de Marte!',
      funFacts: ['No painel está escrito "DON’T PANIC!" em homenagem ao Guia do Mochileiro das Galáxias!'],
      travelTimes: { light: 'Alguns minutos de luz' }
    },
    heliopause: {
      name: 'Heliopausa',
      pronunciation: 'he-li-o-PAU-sa',
      category: 'Fronteira da bolha solar',
      badge: '🛡️ Porta para o espaço interestelar',
      quickStats: [{ label: 'Distância', value: '~120 UA (18 bilhões km)' }],
      kidSummary: 'A fronteira onde o vento solar encontra o meio interestelar da galáxia!',
      funFacts: ['Apenas a Voyager 1 e a Voyager 2 cruzaram esta fronteira.'],
      travelTimes: { light: '16,6 horas', voyager1: '35 anos' }
    },
    alphaCentauri: {
      name: 'Sistema Alfa Centauri e Proxima b',
      pronunciation: 'AL-fa sen-TAU-ri',
      category: 'Sistema estelar mais próximo',
      badge: '⭐ Vizinho estelar mais próximo (4,24 anos-luz)',
      quickStats: [{ label: 'Distância', value: '4,24 anos-luz' }, { label: 'Exoplaneta', value: 'Proxima b (Zona Habitável!)' }],
      kidSummary: 'O sistema estelar mais próximo do Sol! Proxima Centauri abriga o planeta rochoso Proxima b na zona habitável.',
      funFacts: ['Na velocidade da Voyager 1, levaria 73.000 anos para chegar lá!'],
      travelTimes: { light: '4,24 anos', voyager1: '73.000 anos' }
    },
    barnardsStar: {
      name: 'Estrela de Barnard',
      pronunciation: 'BAR-nard',
      category: 'Anã Vermelha (M4V)',
      badge: '🏃 Estrela mais rápida no céu',
      quickStats: [{ label: 'Distância', value: '5,96 anos-luz' }],
      kidSummary: 'A estrela isolada mais próxima do Sol, com o movimento próprio mais rápido do céu noturno.',
      funFacts: ['Está se aproximando do Sol a 142 km/s!'],
      travelTimes: { light: '5,96 anos', voyager1: '105.000 anos' }
    },
    sirius: {
      name: 'Sírius A e B',
      pronunciation: 'SÍ-ri-us',
      category: 'Estrela Binária + Anã Branca',
      badge: '💎 Estrela mais brilhante do céu noturno',
      quickStats: [{ label: 'Distância', value: '8,6 anos-luz' }],
      kidSummary: 'A estrela mais brilhante do nosso céu noturno, acompanhada pela densa anã branca Sírius B!',
      funFacts: ['Uma colher de chá de Sírius B pesa tanto quanto um elefante!'],
      travelTimes: { light: '8,6 anos', voyager1: '152.000 anos' }
    },
    epsilonEridani: {
      name: 'Épsilon Eridani',
      pronunciation: 'ÉP-si-lon e-ri-DA-ni',
      category: 'Estrela jovem tipo K',
      badge: '🪐 Um jovem Sistema Solar',
      quickStats: [{ label: 'Distância', value: '10,5 anos-luz' }],
      kidSummary: 'Uma estrela jovem com anéis de poeira e um planeta gigante, parecida com o nosso Sistema Solar primitivo.',
      funFacts: ['Um dos primeiros alvos do projeto SETI em 1960.'],
      travelTimes: { light: '10,5 anos', voyager1: '185.000 anos' }
    },
    tauCeti: {
      name: 'Tau Ceti',
      pronunciation: 'TAU SÉ-ti',
      category: 'Estrela tipo solar G8V',
      badge: '☀️ Estrela parecida com o Sol',
      quickStats: [{ label: 'Distância', value: '11,9 anos-luz' }],
      kidSummary: 'Uma estrela amarela estável a apenas 11,9 anos-luz, cercada por candidatos a super-Terras.',
      funFacts: ['Muito famosa na ficção científica como primeiro destino interestelar humano.'],
      travelTimes: { light: '11,9 anos', voyager1: '210.000 anos' }
    },
    trappist1: {
      name: 'TRAPPIST-1 (Sistema de 7 Planetas)',
      pronunciation: 'TRA-pist 1',
      category: 'Anã ultrafria com 7 planetas rochosos',
      badge: '🌱 3 mundos na Zona Habitável!',
      quickStats: [{ label: 'Distância', value: '40,7 anos-luz' }, { label: 'Planetas', value: '7 mundos rochosos (b–h)' }],
      kidSummary: 'Sete planetas rochosos do tamanho da Terra orbitam uma estrela pouco maior que Júpiter; três estão na zona habitável!',
      funFacts: ['Todos os 7 planetas caberiam mais perto de sua estrela do que Mercúrio está do Sol!'],
      travelTimes: { light: '40,7 anos', voyager1: '718.000 anos' }
    },
    pegasi51: {
      name: '51 Pegasi e Dimidium',
      pronunciation: '51 PÉ-ga-si',
      category: 'Descoberta de Exoplaneta Prêmio Nobel',
      badge: '🏆 Primeiro exoplaneta em estrela tipo Sol (1995)',
      quickStats: [{ label: 'Distância', value: '50,4 anos-luz' }],
      kidSummary: 'Em 1995, 51 Pegasi b iniciou a revolução dos exoplanetas e rendeu o Prêmio Nobel de Física de 2019!',
      funFacts: ['É um "Júpiter Quente" que completa um ano em apenas 4,2 dias!'],
      travelTimes: { light: '50,4 anos', voyager1: '890.000 anos' }
    },
    orionSpur: {
      name: 'Braço de Órion (Você está aqui!)',
      pronunciation: 'Ó-ri-on',
      category: 'Braço espiral local da Via Láctea',
      badge: '📍 Nosso endereço galáctico',
      quickStats: [{ label: 'Distância ao centro', value: '26.000 anos-luz' }],
      kidSummary: 'O bairro tranquilo da Via Láctea onde o nosso Sol e todas as estrelas visíveis a olho nu vivem!',
      funFacts: ['O Sol leva 230 milhões de anos para dar uma volta completa na Via Láctea!'],
      travelTimes: { light: '0 anos (Estamos aqui!)' }
    },
    sagittariusA: {
      name: 'Sagitário A* (Sagittarius A*)',
      pronunciation: 'sa-gi-TÁ-ri-o A',
      category: 'Buraco Negro Supermassivo',
      badge: '🕳️ 4,3 milhões de massas solares!',
      quickStats: [{ label: 'Distância', value: '26.670 anos-luz' }],
      kidSummary: 'O buraco negro supermassivo no coração da nossa Via Láctea, fotografado pelo Event Horizon Telescope em 2022!',
      funFacts: ['Sua gravidade ajuda a ancorar o centro da nossa galáxia.'],
      travelTimes: { light: '26.670 anos', voyager1: '470 milhões de anos' }
    },
    milkyWayDisk: {
      name: 'Galáxia Via Láctea',
      pronunciation: 'VI-a LÁC-te-a',
      category: 'Galáxia Espiral Barrada',
      badge: '🌌 200 a 400 bilhões de estrelas',
      quickStats: [{ label: 'Diâmetro', value: '105.700 anos-luz' }],
      kidSummary: 'Nossa gigantesca galáxia espiral barrada com centenas de bilhões de estrelas e planetas!',
      funFacts: ['Mesmo na velocidade da luz, leva mais de 100.000 anos para atravessá-la!'],
      travelTimes: { light: '105.700 anos de ponta a ponta' }
    },
    andromeda: {
      name: 'Galáxia de Andrômeda (M31)',
      pronunciation: 'an-DRÔ-me-da',
      category: 'Galáxia Espiral Gigante',
      badge: '🌀 1 trilhão de estrelas',
      quickStats: [{ label: 'Distância', value: '2,537 milhões de anos-luz' }],
      kidSummary: 'Nossa vizinha espiral gigante com cerca de 1 trilhão de estrelas — o objeto mais distante visível a olho nu!',
      funFacts: ['Vai se fundir com a Via Láctea daqui a cerca de 4,5 bilhões de anos!'],
      travelTimes: { light: '2.537.000 anos' }
    },
    triangulum: {
      name: 'Galáxia do Triângulo (M33)',
      pronunciation: 'tri-ÂN-gu-lo',
      category: 'Terceira maior galáxia do Grupo Local',
      badge: '✨ 40 bilhões de estrelas',
      quickStats: [{ label: 'Distância', value: '2,73 milhões de anos-luz' }],
      kidSummary: 'Junto com Andrômeda e a Via Láctea, forma o nosso Grupo Local de galáxias!',
      funFacts: ['É uma verdadeira fábrica de estrelas jovens azuis!'],
      travelTimes: { light: '2.730.000 anos' }
    },
    laniakea: {
      name: 'Superaglomerado Laniakea e a Teia Cósmica',
      pronunciation: 'la-ni-a-KÊ-a',
      category: 'Superaglomerado de 100.000 galáxias',
      badge: '🕸️ "Céu imensurável" em havaiano',
      quickStats: [{ label: 'Largura', value: '520 milhões de anos-luz' }, { label: 'Universo observável', value: '93 bilhões de anos-luz' }],
      kidSummary: 'Nossa Via Láctea é apenas um pontinho luminoso no Superaglomerado Laniakea, parte da grandiosa Teia Cósmica!',
      funFacts: ['Somos todos feitos de poeira de estrelas forjada bilhões de anos atrás!'],
      travelTimes: { light: '93 bilhões de anos-luz pelo Universo Observável!' }
    }
  }),

  fr: makeObjectsForLang({
    earth: {
      name: 'Planète Terre',
      pronunciation: 'TÈR',
      category: 'Planète Natale',
      badge: '🌍 Là où nous vivons !',
      quickStats: [
        { label: 'Diamètre', value: '12 742 km' },
        { label: 'Distance au Soleil', value: '149,6 millions km (1 UA)' },
        { label: 'Durée de l’année', value: '365,25 jours' },
        { label: 'Eau en surface', value: '71 % d’océans' }
      ],
      kidSummary: 'La Terre est la troisième planète à partir du Soleil et le seul endroit connu de l’univers abritant la vie ! Ses océans liquides, son bouclier magnétique et son atmosphère nous protègent.',
      funFacts: [
        'La Terre n’est pas une sphère parfaite : sa rotation la fait légèrement gonfler à l’équateur !',
        'Vous filez en ce moment sur le Vaisseau Terre autour du Soleil à 107 000 km/h !'
      ],
      travelTimes: { light: '0 seconde (Vous êtes ici !)', voyager1: 'Lancée de Cap Canaveral en 1977 !', jetPlane: '42 heures autour de l’équateur' }
    },
    moon: {
      name: 'La Lune (Luna)',
      pronunciation: 'LUN',
      category: 'Satellite Naturel',
      badge: '🌕 12 humains ont marché ici',
      quickStats: [
        { label: 'Distance de la Terre', value: '384 400 km' },
        { label: 'Diamètre', value: '3 475 km (1/4 de la Terre)' },
        { label: 'Gravité', value: '1/6 de la Terre (Sautez 6x plus haut !)' }
      ],
      kidSummary: 'La Lune est la fidèle compagne rocheuse de la Terre ! On pourrait aligner les 7 autres planètes du Système solaire entre la Terre et la Lune !',
      funFacts: ['Sans vent ni pluie sur la Lune, les empreintes des astronautes d’Apollo resteront des millions d’années !'],
      travelTimes: { light: '1,28 seconde', voyager1: '6,3 heures', apolloRocket: '3 jours (Apollo 11 en 1969)' }
    },
    iss: {
      name: 'Station spatiale internationale (ISS)',
      pronunciation: 'I-S-S',
      category: 'Laboratoire Spatial Humain',
      badge: '🛰️ 16 levers de soleil par jour',
      quickStats: [{ label: 'Altitude', value: '408 km au-dessus de la Terre' }, { label: 'Vitesse', value: '27 600 km/h' }],
      kidSummary: 'Un grand laboratoire scientifique flottant en orbite basse où les astronautes vivent et font des expériences en apesanteur !',
      funFacts: ['Les astronautes font 16 fois le tour de la Terre par jour !'],
      travelTimes: { light: '0,0014 seconde', spacecraft: '4 à 8 heures après le décollage' }
    },
    sun: {
      name: 'Le Soleil (Sol)',
      pronunciation: 'so-LÈY',
      category: 'Naine Jaune (G2V)',
      badge: '☀️ 99,86 % de la masse du Système solaire',
      quickStats: [{ label: 'Diamètre', value: '1,39 million km (109x la Terre)' }, { label: 'Temp. du cœur', value: '15 millions °C' }],
      kidSummary: 'Le Soleil est une gigantesque sphère de plasma d’hydrogène et d’hélium au cœur de notre Système solaire !',
      funFacts: ['Plus de 1,3 million de Terres pourraient tenir à l’intérieur du Soleil !'],
      travelTimes: { light: '8 minutes 20 secondes', voyager1: '102 jours', jetPlane: '19 ans' }
    },
    mercury: {
      name: 'Mercure',
      pronunciation: 'mèr-KUR',
      category: 'Planète Tellurique',
      badge: '☄️ Planète la plus rapide',
      quickStats: [{ label: 'Distance au Soleil', value: '0,39 UA' }, { label: 'Année', value: '88 jours' }],
      kidSummary: 'Mercure est la plus petite planète du Système solaire et la plus proche du Soleil !',
      funFacts: ['Bien que plus proche du Soleil, Mercure est moins chaude que Vénus car elle n’a presque pas d’atmosphère !'],
      travelTimes: { light: '5 minutes', voyager1: '62 jours' }
    },
    venus: {
      name: 'Vénus',
      pronunciation: 'vé-NUS',
      category: 'Planète Tellurique',
      badge: '🌋 Planète la plus chaude & rotation rétrograde',
      quickStats: [{ label: 'Distance au Soleil', value: '0,72 UA' }, { label: 'Température', value: '465 °C' }],
      kidSummary: 'Vénus fait presque la taille de la Terre, mais ses épais nuages créent un effet de serre extrême !',
      funFacts: ['Sur Vénus, le Soleil se lève à l’ouest et se couche à l’est !'],
      travelTimes: { light: '2,3 minutes', voyager1: '28 jours' }
    },
    mars: {
      name: 'Mars',
      pronunciation: 'MARS',
      category: 'La Planète Rouge',
      badge: '🤖 Foyer des rovers robotiques',
      quickStats: [{ label: 'Distance au Soleil', value: '1,52 UA' }, { label: 'Plus haut volcan', value: 'Olympus Mons (3x l’Everest !)' }],
      kidSummary: 'Mars est une planète désertique froide où les rovers Curiosity et Perseverance cherchent des traces d’eau ancienne !',
      funFacts: ['Mars est rouge à cause de l’oxyde de fer (rouille) qui recouvre son sol !'],
      travelTimes: { light: '3 à 22 minutes', voyager1: '52 jours', spacecraft: '7 mois' }
    },
    jupiter: {
      name: 'Jupiter',
      pronunciation: 'ju-pi-TÈR',
      category: 'Géante Gazeuse',
      badge: '🌪️ Plus grande planète du Système solaire',
      quickStats: [{ label: 'Distance au Soleil', value: '5,2 UA' }, { label: 'Diamètre', value: '139 820 km (11x la Terre)' }],
      kidSummary: 'Jupiter est la reine des planètes ! Sa Grande Tache Rouge est une tempête plus grande que la Terre.',
      funFacts: ['Sous la glace de sa lune Europe se cache un océan contenant deux fois plus d’eau que la Terre !'],
      travelTimes: { light: '35 à 52 minutes', voyager1: '1 an et 2 mois' }
    },
    saturn: {
      name: 'Saturne',
      pronunciation: 'sa-TURN',
      category: 'Géante Gazeuse à Anneaux',
      badge: '🪐 Le joyau aux anneaux de glace',
      quickStats: [{ label: 'Distance au Soleil', value: '9,5 UA' }, { label: 'Diamètre des anneaux', value: '282 000 km' }],
      kidSummary: 'Saturne est entourée d’anneaux spectaculaires composés de milliards de blocs de glace scintillante !',
      funFacts: ['Saturne est moins dense que l’eau : elle flotterait dans une baignoire géante !'],
      travelTimes: { light: '1 heure 20 minutes', voyager1: '2 ans et 3 mois' }
    },
    uranus: {
      name: 'Uranus',
      pronunciation: 'u-ra-NUS',
      category: 'Géante de Glace',
      badge: '🧊 La planète couchée sur le côté',
      quickStats: [{ label: 'Distance au Soleil', value: '19,2 UA' }, { label: 'Inclinaison', value: '97,8°' }],
      kidSummary: 'Uranus est une géante de glace bleu-vert qui roule sur le côté autour du Soleil !',
      funFacts: ['Voyager 2 en 1986 est la seule sonde à avoir visité Uranus !'],
      travelTimes: { light: '2 heures 40 minutes', voyager2: '8,5 ans' }
    },
    neptune: {
      name: 'Neptune',
      pronunciation: 'nèp-TUN',
      category: 'Géante de Glace',
      badge: '💨 Vents les plus rapides du Système solaire',
      quickStats: [{ label: 'Distance au Soleil', value: '30,1 UA' }, { label: 'Vents', value: '2 100 km/h' }],
      kidSummary: 'Neptune est la huitième planète, balayée par des tempêtes supersoniques dans un froid glacial !',
      funFacts: ['Neptune fut la première planète découverte par le calcul mathématique avant d’être observée !'],
      travelTimes: { light: '4 heures 10 minutes', voyager2: '12 ans' }
    },
    voyager1: {
      name: 'Voyager 1',
      pronunciation: 'vwa-ya-JÈR 1',
      category: 'Sonde Interstellaire de la NASA',
      badge: '📡 Objet humain le plus lointain',
      quickStats: [{ label: 'Lancement', value: '5 septembre 1977' }, { label: 'Position', value: 'Espace interstellaire (~167 UA)' }],
      kidSummary: 'Lancée en 1977, Voyager 1 a franchi l’héliopause et file dans l’espace interstellaire avec le Disque d’or !',
      funFacts: ['Emporte des salutations en 55 langues, dont le français !'],
      travelTimes: { light: '~23 heures par signal radio' }
    },
    voyager2: {
      name: 'Voyager 2',
      pronunciation: 'vwa-ya-JÈR 2',
      category: 'Sonde Interstellaire de la NASA',
      badge: '🛸 Seule sonde ayant visité les 4 géantes',
      quickStats: [{ label: 'Lancement', value: '20 août 1977' }, { label: 'Position', value: 'Espace interstellaire (~139 UA)' }],
      kidSummary: 'La seule sonde à avoir survolé Jupiter, Saturne, Uranus et Neptune, aujourd’hui dans l’espace interstellaire !',
      funFacts: ['A profité d’un alignement planétaire qui ne se produit que tous les 176 ans !'],
      travelTimes: { light: '~19 heures par signal radio' }
    },
    roadster: {
      name: 'Tesla Roadster de Starman',
      pronunciation: 'TÈS-la ROD-stèr',
      category: 'Objet Artificiel Héliocentrique',
      badge: '🚗 « Don’t Panic! » voiture de sport dans l’espace',
      quickStats: [{ label: 'Lancement', value: '6 février 2018' }, { label: 'Période orbitale', value: '557 jours' }],
      kidSummary: 'Une vraie voiture électrique avec le mannequin Starman en orbite autour du Soleil jusqu’au-delà de Mars !',
      funFacts: ['Le tableau de bord affiche « DON’T PANIC! » en hommage au Guide du voyageur galactique !'],
      travelTimes: { light: 'Quelques minutes-lumière' }
    },
    heliopause: {
      name: 'Héliopause',
      pronunciation: 'é-lyo-POZ',
      category: 'Frontière de la bulle solaire',
      badge: '🛡️ Porte de l’espace interstellaire',
      quickStats: [{ label: 'Distance', value: '~120 UA (18 milliards km)' }],
      kidSummary: 'La frontière où le vent solaire s’arrête contre le milieu interstellaire de la galaxie !',
      funFacts: ['Seules Voyager 1 et Voyager 2 ont franchi cette limite.'],
      travelTimes: { light: '16,6 heures', voyager1: '35 ans' }
    },
    alphaCentauri: {
      name: 'Système Alpha du Centaure & Proxima b',
      pronunciation: 'al-FA du san-TOR',
      category: 'Système stellaire le plus proche',
      badge: '⭐ Étoile voisine la plus proche (4,24 al)',
      quickStats: [{ label: 'Distance', value: '4,24 années-lumière' }, { label: 'Exoplanète', value: 'Proxima b (Zone Habitable !)' }],
      kidSummary: 'Le système stellaire le plus proche du Soleil ! Proxima du Centaure abrite l’exoplanète rocheuse Proxima b dans sa zone habitable.',
      funFacts: ['À la vitesse de Voyager 1, il faudrait 73 000 ans pour l’atteindre !'],
      travelTimes: { light: '4,24 ans', voyager1: '73 000 ans' }
    },
    barnardsStar: {
      name: 'Étoile de Barnard',
      pronunciation: 'bar-NAR',
      category: 'Naine Rouge (M4V)',
      badge: '🏃 Étoile la plus rapide du ciel',
      quickStats: [{ label: 'Distance', value: '5,96 années-lumière' }],
      kidSummary: 'La deuxième étoile la plus proche, qui possède le mouvement propre le plus rapide du ciel nocturne.',
      funFacts: ['Elle se rapproche du Système solaire à 142 km/s !'],
      travelTimes: { light: '5,96 ans', voyager1: '105 000 ans' }
    },
    sirius: {
      name: 'Sirius A et B',
      pronunciation: 'si-RYUS',
      category: 'Étoile Binaire + Naine Blanche',
      badge: '💎 Étoile la plus brillante du ciel nocturne',
      quickStats: [{ label: 'Distance', value: '8,6 années-lumière' }],
      kidSummary: 'L’étoile la plus brillante de nos nuits, accompagnée d’une minuscule naine blanche ultra-dense, Sirius B !',
      funFacts: ['Une cuillère à café de Sirius B pèse autant qu’un éléphant !'],
      travelTimes: { light: '8,6 ans', voyager1: '152 000 ans' }
    },
    epsilonEridani: {
      name: 'Epsilon Eridani',
      pronunciation: 'èp-si-LON é-ri-da-NI',
      category: 'Jeune étoile de type K',
      badge: '🪐 Un jeune Système solaire',
      quickStats: [{ label: 'Distance', value: '10,5 années-lumière' }],
      kidSummary: 'Une jeune étoile entourée d’anneaux de poussière et d’une planète géante, semblable au jeune Système solaire.',
      funFacts: ['L’une des premières cibles du programme SETI en 1960.'],
      travelTimes: { light: '10,5 ans', voyager1: '185 000 ans' }
    },
    tauCeti: {
      name: 'Tau Ceti',
      pronunciation: 'TO sé-TI',
      category: 'Étoile de type solaire G8V',
      badge: '☀️ Étoile semblable au Soleil',
      quickStats: [{ label: 'Distance', value: '11,9 années-lumière' }],
      kidSummary: 'Une étoile jaune stable située à seulement 11,9 années-lumière, entourée de candidates super-Terres.',
      funFacts: ['Très célèbre dans la science-fiction comme première étape interstellaire.'],
      travelTimes: { light: '11,9 ans', voyager1: '210 000 ans' }
    },
    trappist1: {
      name: 'TRAPPIST-1 (Système à 7 Planètes)',
      pronunciation: 'tra-PIST 1',
      category: 'Naine ultra-froide avec 7 planètes rocheuses',
      badge: '🌱 3 mondes dans la Zone Habitable !',
      quickStats: [{ label: 'Distance', value: '40,7 années-lumière' }, { label: 'Planètes', value: '7 mondes rocheux (b–h)' }],
      kidSummary: 'Sept planètes rocheuses de la taille de la Terre gravitent autour d’une étoile à peine plus grande que Jupiter ; trois sont dans la zone habitable !',
      funFacts: ['Les 7 planètes tiennent toutes à une distance inférieure à celle de Mercure au Soleil !'],
      travelTimes: { light: '40,7 ans', voyager1: '718 000 ans' }
    },
    pegasi51: {
      name: '51 Pegasi et Dimidium',
      pronunciation: '51 pé-ga-ZI',
      category: 'Première exoplanète Prix Nobel',
      badge: '🏆 Première exoplanète autour d’une étoile solaire (1995)',
      quickStats: [{ label: 'Distance', value: '50,4 années-lumière' }],
      kidSummary: 'En 1995, 51 Pegasi b a lancé la révolution des exoplanètes et valu le Prix Nobel de Physique 2019 !',
      funFacts: ['C’est un « Jupiter chaud » qui boucle son orbite en seulement 4,2 jours !'],
      travelTimes: { light: '50,4 ans', voyager1: '890 000 ans' }
    },
    orionSpur: {
      name: 'Bras d’Orion (Vous êtes ici !)',
      pronunciation: 'o-RYON',
      category: 'Bras spiral local de la Voie Lactée',
      badge: '📍 Notre adresse galactique',
      quickStats: [{ label: 'Distance au centre', value: '26 000 années-lumière' }],
      kidSummary: 'Le quartier paisible de la Voie Lactée où vivent notre Soleil et nos étoiles voisines !',
      funFacts: ['Le Soleil met 230 millions d’années pour faire le tour de la galaxie !'],
      travelTimes: { light: '0 an (Nous y sommes !)' }
    },
    sagittariusA: {
      name: 'Sagittaire A* (Sagittarius A*)',
      pronunciation: 'sa-ji-TÈR A',
      category: 'Trou Noir Supermassif',
      badge: '🕳️ 4,3 millions de masses solaires !',
      quickStats: [{ label: 'Distance', value: '26 670 années-lumière' }],
      kidSummary: 'Le trou noir supermassif au cœur de notre Voie Lactée, photographié par l’Event Horizon Telescope en 2022 !',
      funFacts: ['Sa gravité maintient le cœur de notre galaxie.'],
      travelTimes: { light: '26 670 ans', voyager1: '470 millions d’années' }
    },
    milkyWayDisk: {
      name: 'Galaxie de la Voie Lactée',
      pronunciation: 'vwa lak-TÉ',
      category: 'Galaxie Spirale Barrée',
      badge: '🌌 200 à 400 milliards d’étoiles',
      quickStats: [{ label: 'Diamètre', value: '105 700 années-lumière' }],
      kidSummary: 'Notre immense galaxie spirale barrée comptant des centaines de milliards d’étoiles et de planètes !',
      funFacts: ['Même à la vitesse de la lumière, il faut plus de 100 000 ans pour la traverser !'],
      travelTimes: { light: '105 700 ans d’un bout à l’autre' }
    },
    andromeda: {
      name: 'Galaxie d’Andromède (M31)',
      pronunciation: 'an-dro-MÈD',
      category: 'Galaxie Spirale Géante',
      badge: '🌀 1 000 milliards d’étoiles',
      quickStats: [{ label: 'Distance', value: '2,537 millions d’années-lumière' }],
      kidSummary: 'Notre grande galaxie spirale voisine avec mille milliards d’étoiles — l’objet le plus lointain visible à l’œil nu !',
      funFacts: ['Elle fusionnera avec la Voie Lactée dans environ 4,5 milliards d’années !'],
      travelTimes: { light: '2 537 000 ans' }
    },
    triangulum: {
      name: 'Galaxie du Triangle (M33)',
      pronunciation: 'tri-ANGL',
      category: 'Troisième galaxie du Groupe Local',
      badge: '✨ 40 milliards d’étoiles',
      quickStats: [{ label: 'Distance', value: '2,73 millions d’années-lumière' }],
      kidSummary: 'Avec Andromède et la Voie Lactée, elle forme notre Groupe Local de galaxies !',
      funFacts: ['Une véritable pouponnière d’étoiles bleues !'],
      travelTimes: { light: '2 730 000 ans' }
    },
    laniakea: {
      name: 'Superamas Laniakea et la Toile Cosmique',
      pronunciation: 'la-nya-KÉ-a',
      category: 'Superamas de 100 000 galaxies',
      badge: '🕸️ « Ciel incommensurable » en hawaïen',
      quickStats: [{ label: 'Largeur', value: '520 millions d’années-lumière' }, { label: 'Univers observable', value: '93 milliards d’années-lumière' }],
      kidSummary: 'Notre Voie Lactée n’est qu’un point lumineux dans le superamas Laniakea, au sein de la gigantesque Toile Cosmique !',
      funFacts: ['Nous sommes tous faits de poussière d’étoiles forgée il y a des milliards d’années !'],
      travelTimes: { light: '93 milliards d’années-lumière à travers l’Univers observable !' }
    }
  }),

  it: makeObjectsForLang({
    earth: {
      name: 'Pianeta Terra',
      pronunciation: 'TÈR-ra',
      category: 'Pianeta Natale',
      badge: '🌍 Dove viviamo!',
      quickStats: [
        { label: 'Diametro', value: '12.742 km' },
        { label: 'Distanza dal Sole', value: '149,6 milioni km (1 UA)' },
        { label: 'Durata dell’anno', value: '365,25 giorni' },
        { label: 'Acqua superficiale', value: '71% oceani' }
      ],
      kidSummary: 'La Terra è il terzo pianeta dal Sole e l’unico luogo conosciuto nell’universo ad ospitare la vita! I suoi oceani liquidi, lo scudo magnetico e l’atmosfera ci proteggono.',
      funFacts: [
        'La Terra non è una sfera perfetta: la rotazione la fa rigonfiare leggermente all’equatore!',
        'Stai viaggiando sull’Astronave Terra intorno al Sole a 107.000 km/h!'
      ],
      travelTimes: { light: '0 secondi (Sei qui!)', voyager1: 'Lanciata da Cape Canaveral nel 1977!', jetPlane: '42 ore intorno all’equatore' }
    },
    moon: {
      name: 'La Luna (Luna)',
      pronunciation: 'LU-na',
      category: 'Satellite Naturale',
      badge: '🌕 12 umani hanno camminato qui',
      quickStats: [
        { label: 'Distanza dalla Terra', value: '384.400 km' },
        { label: 'Diametro', value: '3.475 km (1/4 della Terra)' },
        { label: 'Gravità', value: '1/6 della Terra (Salta 6 volte più in alto!)' }
      ],
      kidSummary: 'La Luna è la fedele compagna rocciosa della Terra! Tra la Terra e la Luna entrerebbero tutti gli altri 7 pianeti del Sistema Solare in fila!',
      funFacts: ['Senza vento né pioggia sulla Luna, le impronte degli astronauti Apollo dureranno milioni di anni!'],
      travelTimes: { light: '1,28 secondi', voyager1: '6,3 ore', apolloRocket: '3 giorni (Apollo 11 nel 1969)' }
    },
    iss: {
      name: 'Stazione Spaziale Internazionale (ISS)',
      pronunciation: 'I-S-S',
      category: 'Laboratorio Spaziale Umano',
      badge: '🛰️ 16 albe ogni giorno',
      quickStats: [{ label: 'Altitudine', value: '408 km sopra la Terra' }, { label: 'Velocità', value: '27.600 km/h' }],
      kidSummary: 'Un grande laboratorio scientifico in orbita bassa dove gli astronauti vivono e fanno esperimenti in microgravità!',
      funFacts: ['Gli astronauti orbitano la Terra 16 volte al giorno!'],
      travelTimes: { light: '0,0014 secondi', spacecraft: '4–8 ore dal lancio' }
    },
    sun: {
      name: 'Il Sole (Sol)',
      pronunciation: 'SO-le',
      category: 'Nana Gialla (G2V)',
      badge: '☀️ 99,86% della massa del Sistema Solare',
      quickStats: [{ label: 'Diametro', value: '1,39 milioni km (109x la Terra)' }, { label: 'Temp. del nucleo', value: '15 milioni °C' }],
      kidSummary: 'Il Sole è una gigantesca sfera di plasma di idrogeno ed elio al centro del Sistema Solare!',
      funFacts: ['Oltre 1,3 milioni di Terre entrerebbero dentro il Sole!'],
      travelTimes: { light: '8 minuti e 20 secondi', voyager1: '102 giorni', jetPlane: '19 anni' }
    },
    mercury: {
      name: 'Mercurio',
      pronunciation: 'mer-CU-rio',
      category: 'Pianeta Roccioso',
      badge: '☄️ Pianeta più veloce',
      quickStats: [{ label: 'Distanza dal Sole', value: '0,39 UA' }, { label: 'Anno', value: '88 giorni' }],
      kidSummary: 'Mercurio è il pianeta più piccolo del Sistema Solare e il più vicino al Sole!',
      funFacts: ['Anche se è il più vicino al Sole, Venere è più caldo perché Mercurio non ha quasi atmosfera!'],
      travelTimes: { light: '5 minuti', voyager1: '62 giorni' }
    },
    venus: {
      name: 'Venere',
      pronunciation: 'VÈ-ne-re',
      category: 'Pianeta Roccioso',
      badge: '🌋 Pianeta più caldo e ruota al contrario',
      quickStats: [{ label: 'Distanza dal Sole', value: '0,72 UA' }, { label: 'Temperatura', value: '465 °C' }],
      kidSummary: 'Venere ha quasi le dimensioni della Terra, ma le sue dense nubi creano un effetto serra estremo!',
      funFacts: ['Su Venere il Sole sorge a ovest e tramonta a est!'],
      travelTimes: { light: '2,3 minuti', voyager1: '28 giorni' }
    },
    mars: {
      name: 'Marte',
      pronunciation: 'MAR-te',
      category: 'Il Pianeta Rosso',
      badge: '🤖 Casa dei rover robotici',
      quickStats: [{ label: 'Distanza dal Sole', value: '1,52 UA' }, { label: 'Vulcano più alto', value: 'Olympus Mons (3x l’Everest!)' }],
      kidSummary: 'Marte è un pianeta desertico freddo dove i rover Curiosity e Perseverance cercano tracce di acqua antica!',
      funFacts: ['Marte appare rosso per l’ossido di ferro (ruggine) nel suo suolo!'],
      travelTimes: { light: '3–22 minuti', voyager1: '52 giorni', spacecraft: '7 mesi' }
    },
    jupiter: {
      name: 'Giove',
      pronunciation: 'GIÒ-ve',
      category: 'Gigante Gassoso',
      badge: '🌪️ Pianeta più grande del Sistema Solare',
      quickStats: [{ label: 'Distanza dal Sole', value: '5,2 UA' }, { label: 'Diametro', value: '139.820 km (11x la Terra)' }],
      kidSummary: 'Giove è il re dei pianeti! La sua Grande Macchia Rossa è una tempesta più grande della Terra.',
      funFacts: ['Sotto il ghiaccio della luna Europa si nasconde un oceano con il doppio dell’acqua terrestre!'],
      travelTimes: { light: '35–52 minuti', voyager1: '1 anno e 2 mesi' }
    },
    saturn: {
      name: 'Saturno',
      pronunciation: 'sa-TUR-no',
      category: 'Gigante Gassoso con Anelli',
      badge: '🪐 Il gioiello dagli anelli di ghiaccio',
      quickStats: [{ label: 'Distanza dal Sole', value: '9,5 UA' }, { label: 'Diametro anelli', value: '282.000 km' }],
      kidSummary: 'Saturno è circondato da spettacolari anelli fatti di miliardi di frammenti di ghiaccio scintillante!',
      funFacts: ['Saturno è meno denso dell’acqua: galleggerebbe in una vasca gigante!'],
      travelTimes: { light: '1 ora e 20 minuti', voyager1: '2 anni e 3 mesi' }
    },
    uranus: {
      name: 'Urano',
      pronunciation: 'u-RA-no',
      category: 'Gigante di Ghiaccio',
      badge: '🧊 Il pianeta che ruota su un fianco',
      quickStats: [{ label: 'Distanza dal Sole', value: '19,2 UA' }, { label: 'Inclinazione', value: '97,8°' }],
      kidSummary: 'Urano è un gigante di ghiaccio verde-azzurro che rotola su un fianco attorno al Sole!',
      funFacts: ['Voyager 2 nel 1986 è stata l’unica sonda a visitare Urano!'],
      travelTimes: { light: '2 ore e 40 minuti', voyager2: '8,5 anni' }
    },
    neptune: {
      name: 'Nettuno',
      pronunciation: 'net-TU-no',
      category: 'Gigante di Ghiaccio',
      badge: '💨 Venti più veloci del Sistema Solare',
      quickStats: [{ label: 'Distanza dal Sole', value: '30,1 UA' }, { label: 'Venti', value: '2.100 km/h' }],
      kidSummary: 'Nettuno è l’ottavo pianeta dal Sole, spazzato da tempeste supersoniche!',
      funFacts: ['Nettuno fu il primo pianeta previsto dalla matematica prima di essere osservato al telescopio!'],
      travelTimes: { light: '4 ore e 10 minuti', voyager2: '12 anni' }
    },
    voyager1: {
      name: 'Voyager 1',
      pronunciation: 'VÒI-a-ger 1',
      category: 'Sonda Interstellare NASA',
      badge: '📡 Oggetto umano più lontano',
      quickStats: [{ label: 'Lancio', value: '5 settembre 1977' }, { label: 'Posizione', value: 'Spazio Interstellare (~167 UA)' }],
      kidSummary: 'Lanciata nel 1977, Voyager 1 ha superato l’Eliopausa e viaggia nello spazio interstellare con il Golden Record!',
      funFacts: ['Porta a bordo saluti in 55 lingue, incluso l’italiano!'],
      travelTimes: { light: '~23 ore via segnale radio' }
    },
    voyager2: {
      name: 'Voyager 2',
      pronunciation: 'VÒI-a-ger 2',
      category: 'Sonda Interstellare NASA',
      badge: '🛸 Unica sonda ad aver visitato i 4 giganti',
      quickStats: [{ label: 'Lancio', value: '20 agosto 1977' }, { label: 'Posizione', value: 'Spazio Interstellare (~139 UA)' }],
      kidSummary: 'L’unica sonda ad aver visitato Giove, Saturno, Urano e Nettuno, oggi nello spazio interstellare!',
      funFacts: ['Ha sfruttato un allineamento planetario che avviene ogni 176 anni!'],
      travelTimes: { light: '~19 ore via segnale radio' }
    },
    roadster: {
      name: 'Tesla Roadster di Starman',
      pronunciation: 'TÈS-la RÒUD-ster',
      category: 'Oggetto Artificiale Eliocentrico',
      badge: '🚗 "Don’t Panic!" auto sportiva nello spazio',
      quickStats: [{ label: 'Lancio', value: '6 febbraio 2018' }, { label: 'Periodo orbitale', value: '557 giorni' }],
      kidSummary: 'Una vera auto elettrica con il manichino Starman in orbita attorno al Sole fino a oltre Marte!',
      funFacts: ['Sul cruscotto c’è scritto "DON’T PANIC!" in omaggio alla Guida Galattica per gli Autostoppisti!'],
      travelTimes: { light: 'Pochi minuti luce' }
    },
    heliopause: {
      name: 'Eliopausa',
      pronunciation: 'e-lio-PAU-sa',
      category: 'Confine della bolla solare',
      badge: '🛡️ Porta dello spazio interstellare',
      quickStats: [{ label: 'Distanza', value: '~120 UA (18 miliardi km)' }],
      kidSummary: 'Il confine dove il vento solare incontra il mezzo interstellare della galassia!',
      funFacts: ['Solo Voyager 1 e Voyager 2 hanno superato questo confine.'],
      travelTimes: { light: '16,6 ore', voyager1: '35 anni' }
    },
    alphaCentauri: {
      name: 'Sistema Alfa Centauri e Proxima b',
      pronunciation: 'AL-fa cen-TAU-ri',
      category: 'Sistema stellare più vicino',
      badge: '⭐ Stella vicina più prossima (4,24 anni luce)',
      quickStats: [{ label: 'Distanza', value: '4,24 anni luce' }, { label: 'Esopianeta', value: 'Proxima b (Zona Abitabile!)' }],
      kidSummary: 'Il sistema stellare più vicino al Sole! Proxima Centauri ospita il pianeta roccioso Proxima b nella zona abitabile.',
      funFacts: ['Alla velocità di Voyager 1 ci vorrebbero 73.000 anni per arrivarci!'],
      travelTimes: { light: '4,24 anni', voyager1: '73.000 anni' }
    },
    barnardsStar: {
      name: 'Stella di Barnard',
      pronunciation: 'BAR-nard',
      category: 'Nana Rossa (M4V)',
      badge: '🏃 Stella più veloce nel cielo',
      quickStats: [{ label: 'Distanza', value: '5,96 anni luce' }],
      kidSummary: 'La seconda stella più vicina al Sole, con il moto proprio più rapido del cielo notturno.',
      funFacts: ['Si sta avvicinando al Sistema Solare a 142 km/s!'],
      travelTimes: { light: '5,96 anni', voyager1: '105.000 anni' }
    },
    sirius: {
      name: 'Sirio A e B',
      pronunciation: 'SI-rio',
      category: 'Stella Binaria + Nana Bianca',
      badge: '💎 Stella più brillante del cielo notturno',
      quickStats: [{ label: 'Distanza', value: '8,6 anni luce' }],
      kidSummary: 'La stella più luminosa del nostro cielo notturno, accompagnata dalla densissima nana bianca Sirio B!',
      funFacts: ['Un cucchiaino di Sirio B pesa quanto un elefante!'],
      travelTimes: { light: '8,6 anni', voyager1: '152.000 anni' }
    },
    epsilonEridani: {
      name: 'Epsilon Eridani',
      pronunciation: 'ÈP-si-lon e-ri-DA-ni',
      category: 'Giovane stella di tipo K',
      badge: '🪐 Un giovane Sistema Solare',
      quickStats: [{ label: 'Distanza', value: '10,5 anni luce' }],
      kidSummary: 'Una stella giovane con anelli di polvere e un pianeta gigante, simile al nostro Sistema Solare primordiale.',
      funFacts: ['Uno dei primi bersagli del progetto SETI nel 1960.'],
      travelTimes: { light: '10,5 anni', voyager1: '185.000 anni' }
    },
    tauCeti: {
      name: 'Tau Ceti',
      pronunciation: 'TAU CÈ-ti',
      category: 'Stella di tipo solare G8V',
      badge: '☀️ Stella simile al Sole',
      quickStats: [{ label: 'Distanza', value: '11,9 anni luce' }],
      kidSummary: 'Una stella gialla stabile a soli 11,9 anni luce, circondata da candidati super-Terre.',
      funFacts: ['Celebre nella fantascienza come prima meta interstellare umana.'],
      travelTimes: { light: '11,9 anni', voyager1: '210.000 anni' }
    },
    trappist1: {
      name: 'TRAPPIST-1 (Sistema a 7 Pianeti)',
      pronunciation: 'TRA-pist 1',
      category: 'Nana ultrafredda con 7 pianeti rocciosi',
      badge: '🌱 3 mondi nella Zona Abitabile!',
      quickStats: [{ label: 'Distanza', value: '40,7 anni luce' }, { label: 'Pianeti', value: '7 mondi rocciosi (b–h)' }],
      kidSummary: 'Sette pianeti rocciosi grandi come la Terra orbitano attorno a una stella poco più grande di Giove; tre sono nella zona abitabile!',
      funFacts: ['Tutti e 7 i pianeti orbitano più vicino alla loro stella di quanto Mercurio disti dal Sole!'],
      travelTimes: { light: '40,7 anni', voyager1: '718.000 anni' }
    },
    pegasi51: {
      name: '51 Pegasi e Dimidium',
      pronunciation: '51 PÈ-ga-si',
      category: 'Primo esopianeta Premio Nobel',
      badge: '🏆 Primo esopianeta attorno a una stella solare (1995)',
      quickStats: [{ label: 'Distanza', value: '50,4 anni luce' }],
      kidSummary: 'Nel 1995, 51 Pegasi b ha dato inizio alla rivoluzione degli esopianeti, vincendo il Premio Nobel per la Fisica 2019!',
      funFacts: ['È un "Giove caldo" che completa un’orbita in soli 4,2 giorni!'],
      travelTimes: { light: '50,4 anni', voyager1: '890.000 anni' }
    },
    orionSpur: {
      name: 'Braccio di Orione (Sei qui!)',
      pronunciation: 'o-RIÓ-ne',
      category: 'Braccio a spirale locale della Via Lattea',
      badge: '📍 Il nostro indirizzo galattico',
      quickStats: [{ label: 'Distanza dal centro', value: '26.000 anni luce' }],
      kidSummary: 'Il tranquillo quartiere della Via Lattea dove vivono il nostro Sole e le stelle vicine!',
      funFacts: ['Il Sole impiega 230 milioni di anni per fare un giro completo della Via Lattea!'],
      travelTimes: { light: '0 anni (Siamo qui!)' }
    },
    sagittariusA: {
      name: 'Sagittario A* (Sagittarius A*)',
      pronunciation: 'sa-git-TA-rio A',
      category: 'Buco Nero Supermassiccio',
      badge: '🕳️ 4,3 milioni di masse solari!',
      quickStats: [{ label: 'Distanza', value: '26.670 anni luce' }],
      kidSummary: 'Il buco nero supermassiccio nel cuore della Via Lattea, fotografato dall’Event Horizon Telescope nel 2022!',
      funFacts: ['La sua gravità ancora il centro della nostra galassia.'],
      travelTimes: { light: '26.670 anni', voyager1: '470 milioni di anni' }
    },
    milkyWayDisk: {
      name: 'Galassia Via Lattea',
      pronunciation: 'VI-a LAT-tea',
      category: 'Galassia a Spirale Barrata',
      badge: '🌌 200–400 miliardi di stelle',
      quickStats: [{ label: 'Diametro', value: '105.700 anni luce' }],
      kidSummary: 'La nostra gigantesca galassia a spirale barrata con centinaia di miliardi di stelle e pianeti!',
      funFacts: ['Anche alla velocità della luce ci vogliono più di 100.000 anni per attraversarla!'],
      travelTimes: { light: '105.700 anni da un capo all’altro' }
    },
    andromeda: {
      name: 'Galassia di Andromeda (M31)',
      pronunciation: 'an-DRÒ-me-da',
      category: 'Galassia a Spirale Gigante',
      badge: '🌀 1.000 miliardi di stelle',
      quickStats: [{ label: 'Distanza', value: '2,537 milioni di anni luce' }],
      kidSummary: 'La nostra grande galassia a spirale vicina con mille miliardi di stelle — l’oggetto più lontano visibile a occhio nudo!',
      funFacts: ['Si fonderà con la Via Lattea tra circa 4,5 miliardi di anni!'],
      travelTimes: { light: '2.537.000 anni' }
    },
    triangulum: {
      name: 'Galassia del Triangolo (M33)',
      pronunciation: 'tri-ÀN-go-lo',
      category: 'Terza galassia del Gruppo Locale',
      badge: '✨ 40 miliardi di stelle',
      quickStats: [{ label: 'Distanza', value: '2,73 milioni di anni luce' }],
      kidSummary: 'Insieme ad Andromeda e alla Via Lattea forma il nostro Gruppo Locale di galassie!',
      funFacts: ['Una vera fucina di giovani stelle blu!'],
      travelTimes: { light: '2.730.000 anni' }
    },
    laniakea: {
      name: 'Superammasso Laniakea e la Rete Cosmica',
      pronunciation: 'la-nia-KÈ-a',
      category: 'Superammasso di 100.000 galassie',
      badge: '🕸️ "Cielo incommensurabile" in hawaiano',
      quickStats: [{ label: 'Larghezza', value: '520 milioni di anni luce' }, { label: 'Universo osservabile', value: '93 miliardi di anni luce' }],
      kidSummary: 'La nostra Via Lattea è solo un puntino luminoso nel Superammasso Laniakea, parte della gigantesca Rete Cosmica!',
      funFacts: ['Siamo tutti fatti di polvere di stelle forgiata miliardi di anni fa!'],
      travelTimes: { light: '93 miliardi di anni luce attraverso l’Universo Osservabile!' }
    }
  })
};

export const GUIDED_TOUR_STOPS_EXTRA = {
  ja: [
    { objectId: 'earth', scaleIndex: 0, zoomValue: 4.5, yaw: -0.9, pitch: 0.2, title: '第1停留所：宇宙船 地球号', narration: 'コズミック・エクスプローラーへようこそ！私たちの旅は故郷の地球から始まります。NASAの衛星画像による青い海と大陸、現在の昼と夜、そして高度408 kmを飛ぶ国際宇宙ステーションが見えています。' },
    { objectId: 'moon', scaleIndex: 0, zoomValue: 2.6, yaw: -0.4, pitch: 0.35, title: '第2停留所：相棒の月', narration: '38万4,400 km離れた月へズームアウトしましょう。アポロ計画で12人の宇宙飛行士が歩いたクレーターの大地です。光でも地球から1.3秒かかります。' },
    { objectId: 'saturn', scaleIndex: 1, zoomValue: null, yaw: 0.7, pitch: 0.3, title: '第3停留所：土星と氷のリング', narration: '土星へ飛んでみましょう！リングは何十億もの輝く氷の粒でできており、周囲にはタイタンやエンケラドゥスが回っています。' },
    { objectId: 'sun', scaleIndex: 1, zoomValue: 37, yaw: -0.6, pitch: 0.62, title: '第4停留所：太陽系全体', narration: '数十億キロメートル彼方へズームアウト！中心で輝く太陽の周りを、水星・金星・地球・火星、小惑星帯、そして木星・土星・天王星・海王星が今日現在の実際の位置で回っています。' },
    { objectId: 'voyager1', scaleIndex: 1, zoomValue: 43, yaw: -0.2, pitch: 0.5, title: '第5停留所：星間空間のボイジャー1号・2号', narration: 'すべての惑星と青いヘリオポーズの外側を見てください！1977年に打ち上げられたNASAのボイジャー1号と2号が、ゴールデンレコードを載せて210億〜250億 km先の星間空間を飛んでいます。' },
    { objectId: 'proximaCentauri', scaleIndex: 2, zoomValue: null, yaw: 0.3, pitch: 0.45, title: '第6停留所：プロキシマ・ケンタウリb（最も近い系外惑星）', narration: '一気に4.2光年先へジャンプ！太陽に最も近い赤色矮星プロキシマ・ケンタウリの緑色のハビタブルゾーンを、地球型惑星プロキシマbが回っています。' },
    { objectId: 'trappist1', scaleIndex: 2, zoomValue: null, yaw: -0.5, pitch: 0.55, title: '第7停留所：TRAPPIST-1の7つの地球型惑星', narration: '40.7光年先にあるTRAPPIST-1では、木星より少し大きいだけの恒星の周りに7つの岩石惑星が集まり、3つがハビタブルゾーンに入っています！' },
    { objectId: 'sun', scaleIndex: 2, zoomValue: 60, yaw: 0.9, pitch: 0.3, title: '第8停留所：太陽系の近隣恒星たち', narration: 'さらに引いて見ると、私たちの太陽もシリウス、ベガ、アルタイルなど近隣の恒星たちの1つになります。' },
    { objectId: 'sagittariusA', scaleIndex: 3, zoomValue: 84, faceOnGalaxy: true, title: '第9停留所：天の川銀河', narration: '直径10万光年へズームアウト！2,000億個以上の星が渦巻く天の川銀河の中心には、超大質量ブラックホール「いて座A*」があります。' },
    { objectId: 'andromeda', scaleIndex: 4, zoomValue: 90.5, yaw: 0.6, pitch: 0.5, title: '第10停留所：アンドロメダ銀河と局部銀河群', narration: '250万光年先に浮かぶアンドロメダ銀河は1兆個の星を持つ隣の大銀河です。天の川銀河やさんかく座銀河とともに局部銀河群を作っています。' },
    { objectId: 'laniakea', scaleIndex: 4, zoomValue: 96.5, yaw: 1.0, pitch: 0.4, title: '第11停留所：宇宙の大規模構造（コズミック・ウェブ）', narration: 'ついに数十億光年のスケールへ！ラニアケア超銀河団をはじめ無数の銀河がフィラメント状に連なる「宇宙の網」です。これで観測可能な宇宙全体の旅が完了しました！' }
  ],
  ko: [
    { objectId: 'earth', scaleIndex: 0, zoomValue: 4.5, yaw: -0.9, pitch: 0.2, title: '정거장 1: 우주선 지구호', narration: '코스믹 익스플로러에 오신 것을 환영합니다! 우리의 여행은 고향 행성 지구에서 시작합니다. 실제 NASA 위성 지도와 408km 상공을 도는 국제우주정거장을 확인하세요.' },
    { objectId: 'moon', scaleIndex: 0, zoomValue: 2.6, yaw: -0.4, pitch: 0.35, title: '정거장 2: 우리의 동반자, 달', narration: '384,400km 밖으로 나가 실제 거리에 있는 달을 만나보세요. 아폴로 우주인 12명이 걸었던 곳이며 빛으로도 1.3초가 걸립니다.' },
    { objectId: 'saturn', scaleIndex: 1, zoomValue: null, yaw: 0.7, pitch: 0.3, title: '정거장 3: 토성과 얼음 고리', narration: '토성으로 날아가 봅시다! 수십억 개의 반짝이는 얼음 조각으로 이루어진 고리와 타이탄, 엔셀라두스가 함께 돌고 있습니다.' },
    { objectId: 'sun', scaleIndex: 1, zoomValue: 37, yaw: -0.6, pitch: 0.62, title: '정거장 4: 태양계 전체', narration: '수십억 킬로미터 밖으로 줌아웃합니다! 중심의 태양과 8개 행성이 오늘 날짜의 실제 궤도 위치에 놓여 있습니다.' },
    { objectId: 'voyager1', scaleIndex: 1, zoomValue: 43, yaw: -0.2, pitch: 0.5, title: '정거장 5: 성간 우주의 보이저 1호 & 2호', narration: '모든 행성과 푸른 헬리오포즈 너머를 보세요! 1977년 발사된 보이저 1호와 2호가 골든 레코드를 싣고 성간 우주를 향해 날아가고 있습니다.' },
    { objectId: 'proximaCentauri', scaleIndex: 2, zoomValue: null, yaw: 0.3, pitch: 0.45, title: '정거장 6: 프록시마 센타우리 b — 가장 가까운 외계행성', narration: '4.2광년 밖으로 도약합니다! 가장 가까운 적색왜성 프록시마 센타우리의 녹색 거주가능 영역 안에 암석 행성 프록시마 b가 공전합니다.' },
    { objectId: 'trappist1', scaleIndex: 2, zoomValue: null, yaw: -0.5, pitch: 0.55, title: '정거장 7: TRAPPIST-1의 일곱 세계', narration: '40.7광년 거리의 TRAPPIST-1에는 지구 크기의 암석 행성 7개가 모여 있으며, 그중 3개가 액체 물이 가능한 골디락스 존에 있습니다!' },
    { objectId: 'sun', scaleIndex: 2, zoomValue: 60, yaw: 0.9, pitch: 0.3, title: '정거장 8: 우리의 이웃 항성들', narration: '줌아웃하면 태양도 시리우스, 베가, 알타이르 같은 이웃 별들 중 하나가 됩니다.' },
    { objectId: 'sagittariusA', scaleIndex: 3, zoomValue: 84, faceOnGalaxy: true, title: '정거장 9: 우리은하 (은하수)', narration: '10만 광년 스케일로 줌아웃! 2,000억 개 이상의 별이 소용돌이치는 우리은하 중심에는 초대질량 블랙홀 궁수자리 A*가 있습니다.' },
    { objectId: 'andromeda', scaleIndex: 4, zoomValue: 90.5, yaw: 0.6, pitch: 0.5, title: '정거장 10: 안드로메다 은하와 국부은하군', narration: '250만 광년 거리의 안드로메다 은하는 1조 개의 별을 품은 이웃 거대 은하로, 우리은하 및 삼각형자리 은하와 함께 국부은하군을 이룹니다.' },
    { objectId: 'laniakea', scaleIndex: 4, zoomValue: 96.5, yaw: 1.0, pitch: 0.4, title: '정거장 11: 우주 거대구조 (코스믹 웹)', narration: '마침내 수십억 광년의 스케일입니다! 라니아케아 초은하단과 수조 개의 은하가 거미줄 같은 필라멘트를 이루는 관측 가능한 우주 전체를 여행하셨습니다!' }
  ],
  pt: [
    { objectId: 'earth', scaleIndex: 0, zoomValue: 4.5, yaw: -0.9, pitch: 0.2, title: 'Parada 1: A Espaçonave Terra', narration: 'Bem-vindo a bordo do Explorador Cósmico! Começamos em casa, no Planeta Terra, com imagens reais da NASA e a Estação Espacial Internacional a 408 km de altitude.' },
    { objectId: 'moon', scaleIndex: 0, zoomValue: 2.6, yaw: -0.4, pitch: 0.35, title: 'Parada 2: Nossa companheira, a Lua', narration: 'Afastando-nos 384.400 km, aqui está a nossa Lua em sua distância real. Doze astronautas da Apollo caminharam em suas crateras, e a luz leva 1,3 segundo da Terra até aqui.' },
    { objectId: 'saturn', scaleIndex: 1, zoomValue: null, yaw: 0.7, pitch: 0.3, title: 'Parada 3: Saturno e seus Anéis', narration: 'Vamos voar até Saturno! Seus anéis são feitos de bilhões de fragmentos de gelo brilhante, com Titã e Encélado orbitando por perto.' },
    { objectId: 'sun', scaleIndex: 1, zoomValue: 37, yaw: -0.6, pitch: 0.62, title: 'Parada 4: Todo o Sistema Solar', narration: 'Agora recuamos bilhões de quilômetros! No centro brilha o nosso Sol, cercado pelos 8 planetas em suas posições reais de hoje.' },
    { objectId: 'voyager1', scaleIndex: 1, zoomValue: 43, yaw: -0.2, pitch: 0.5, title: 'Parada 5: Voyager 1 e 2 no espaço interestelar!', narration: 'Olhe além de todos os planetas e da bolha azul da heliopausa! As sondas Voyager 1 e 2 da NASA viajam a mais de 21 a 25 bilhões de km levando o Disco de Ouro.' },
    { objectId: 'proximaCentauri', scaleIndex: 2, zoomValue: null, yaw: 0.3, pitch: 0.45, title: 'Parada 6: Proxima Centauri b — o exoplaneta mais próximo', narration: 'Saltamos para 4,2 anos-luz! Esta anã vermelha é Proxima Centauri, cujo planeta Proxima b orbita dentro da zona habitável verde.' },
    { objectId: 'trappist1', scaleIndex: 2, zoomValue: null, yaw: -0.5, pitch: 0.55, title: 'Parada 7: Os sete mundos de TRAPPIST-1', narration: 'A 40,7 anos-luz fica TRAPPIST-1, cercada por sete planetas rochosos do tamanho da Terra, três deles na zona habitável!' },
    { objectId: 'sun', scaleIndex: 2, zoomValue: 60, yaw: 0.9, pitch: 0.3, title: 'Parada 8: Nossa vizinhança estelar', narration: 'Ao nos afastarmos, o Sol se torna mais uma estrela entre Sírius, Vega, Altair e dezenas de vizinhas reais.' },
    { objectId: 'sagittariusA', scaleIndex: 3, zoomValue: 84, faceOnGalaxy: true, title: 'Parada 9: A Galáxia Via Láctea', narration: 'Recuamos para 100.000 anos-luz! Nossa Via Láctea é uma espiral barrada com mais de 200 bilhões de estrelas e o buraco negro Sagitário A* no centro.' },
    { objectId: 'andromeda', scaleIndex: 4, zoomValue: 90.5, yaw: 0.6, pitch: 0.5, title: 'Parada 10: Andrômeda e o Grupo Local', narration: 'A 2,5 milhões de anos-luz flutua a Galáxia de Andrômeda, nossa vizinha gigante com 1 trilhão de estrelas no Grupo Local.' },
    { objectId: 'laniakea', scaleIndex: 4, zoomValue: 96.5, yaw: 1.0, pitch: 0.4, title: 'Parada 11: A Teia Cósmica', narration: 'Finalmente, bilhões de anos-luz! Superaglomerados como Laniakea formam os filamentos brilhantes da Teia Cósmica por todo o universo observável!' }
  ],
  fr: [
    { objectId: 'earth', scaleIndex: 0, zoomValue: 4.5, yaw: -0.9, pitch: 0.2, title: 'Étape 1 : Le Vaisseau Terre', narration: 'Bienvenue à bord de Cosmic Explorer ! Nous partons de la Planète Terre, avec les vraies images de la NASA et la Station spatiale internationale en orbite à 408 km.' },
    { objectId: 'moon', scaleIndex: 0, zoomValue: 2.6, yaw: -0.4, pitch: 0.35, title: 'Étape 2 : Notre compagne, la Lune', narration: 'À 384 400 km se trouve notre Lune à sa distance réelle. Douze astronautes d’Apollo ont foulé ses cratères, et la lumière met 1,3 seconde pour y parvenir.' },
    { objectId: 'saturn', scaleIndex: 1, zoomValue: null, yaw: 0.7, pitch: 0.3, title: 'Étape 3 : Saturne et ses Anneaux', narration: 'Volons vers Saturne ! Ses anneaux sont composés de milliards de blocs de glace scintillante, accompagnés de Titan et Encelade.' },
    { objectId: 'sun', scaleIndex: 1, zoomValue: 37, yaw: -0.6, pitch: 0.62, title: 'Étape 4 : Tout le Système Solaire', narration: 'Reculons de plusieurs milliards de kilomètres ! Au centre brille notre Soleil entouré des 8 planètes à leurs positions réelles d’aujourd’hui.' },
    { objectId: 'voyager1', scaleIndex: 1, zoomValue: 43, yaw: -0.2, pitch: 0.5, title: 'Étape 5 : Voyager 1 et 2 dans l’espace interstellaire !', narration: 'Regardez au-delà des planètes et de la bulle bleue de l’héliopause ! Voyager 1 et 2 voguent à plus de 21 à 25 milliards de km avec le Disque d’or.' },
    { objectId: 'proximaCentauri', scaleIndex: 2, zoomValue: null, yaw: 0.3, pitch: 0.45, title: 'Étape 6 : Proxima Centauri b — l’exoplanète la plus proche', narration: 'Un bond jusqu’à 4,2 années-lumière ! Autour de la naine rouge Proxima du Centaure gravite Proxima b dans la zone habitable verte.' },
    { objectId: 'trappist1', scaleIndex: 2, zoomValue: null, yaw: -0.5, pitch: 0.55, title: 'Étape 7 : Les sept mondes de TRAPPIST-1', narration: 'À 40,7 années-lumière, sept planètes rocheuses de la taille de la Terre entourent TRAPPIST-1, dont trois dans la zone habitable !' },
    { objectId: 'sun', scaleIndex: 2, zoomValue: 60, yaw: 0.9, pitch: 0.3, title: 'Étape 8 : Notre voisinage stellaire', narration: 'En reculant, le Soleil devient une étoile parmi Sirius, Véga, Altaïr et des dizaines de voisines.' },
    { objectId: 'sagittariusA', scaleIndex: 3, zoomValue: 84, faceOnGalaxy: true, title: 'Étape 9 : La Galaxie de la Voie Lactée', narration: 'Zoom arrière à 100 000 années-lumière ! Notre Voie Lactée est une spirale barrée de plus de 200 milliards d’étoiles autour du trou noir Sagittaire A*.' },
    { objectId: 'andromeda', scaleIndex: 4, zoomValue: 90.5, yaw: 0.6, pitch: 0.5, title: 'Étape 10 : Andromède et le Groupe Local', narration: 'À 2,5 millions d’années-lumière flotte la Galaxie d’Andromède, notre voisine géante aux mille milliards d’étoiles.' },
    { objectId: 'laniakea', scaleIndex: 4, zoomValue: 96.5, yaw: 1.0, pitch: 0.4, title: 'Étape 11 : La Toile Cosmique', narration: 'Enfin, des milliards d’années-lumière ! Les superamas comme Laniakea dessinent les filaments lumineux de la Toile Cosmique à travers tout l’univers observable !' }
  ],
  it: [
    { objectId: 'earth', scaleIndex: 0, zoomValue: 4.5, yaw: -0.9, pitch: 0.2, title: 'Tappa 1: L’Astronave Terra', narration: 'Benvenuti a bordo di Cosmic Explorer! Partiamo dal Pianeta Terra, con le immagini reali della NASA e la Stazione Spaziale Internazionale a 408 km di quota.' },
    { objectId: 'moon', scaleIndex: 0, zoomValue: 2.6, yaw: -0.4, pitch: 0.35, title: 'Tappa 2: La nostra compagna, la Luna', narration: 'A 384.400 km ecco la nostra Luna alla sua distanza reale. Dodici astronauti dell’Apollo hanno camminato sui suoi crateri e la luce impiega 1,3 secondi.' },
    { objectId: 'saturn', scaleIndex: 1, zoomValue: null, yaw: 0.7, pitch: 0.3, title: 'Tappa 3: Saturno e i suoi Anelli', narration: 'Voliamo verso Saturno! I suoi anelli sono formati da miliardi di frammenti di ghiaccio scintillante, con Titano ed Encelado in orbita.' },
    { objectId: 'sun', scaleIndex: 1, zoomValue: 37, yaw: -0.6, pitch: 0.62, title: 'Tappa 4: Tutto il Sistema Solare', narration: 'Ora ci allontaniamo di miliardi di chilometri! Al centro brilla il nostro Sole circondato dagli 8 pianeti nelle loro posizioni reali di oggi.' },
    { objectId: 'voyager1', scaleIndex: 1, zoomValue: 43, yaw: -0.2, pitch: 0.5, title: 'Tappa 5: Voyager 1 e 2 nello spazio interstellare!', narration: 'Guarda oltre tutti i pianeti e la bolla blu dell’eliopausa! Le sonde Voyager 1 e 2 della NASA viaggiano a oltre 21–25 miliardi di km con il Golden Record.' },
    { objectId: 'proximaCentauri', scaleIndex: 2, zoomValue: null, yaw: 0.3, pitch: 0.45, title: 'Tappa 6: Proxima Centauri b — l’esopianeta più vicino', narration: 'Saltiamo a 4,2 anni luce! Attorno alla nana rossa Proxima Centauri orbita Proxima b nella zona abitabile verde.' },
    { objectId: 'trappist1', scaleIndex: 2, zoomValue: null, yaw: -0.5, pitch: 0.55, title: 'Tappa 7: I sette mondi di TRAPPIST-1', narration: 'A 40,7 anni luce c’è TRAPPIST-1, circondata da sette pianeti rocciosi grandi come la Terra, tre dei quali nella zona abitabile!' },
    { objectId: 'sun', scaleIndex: 2, zoomValue: 60, yaw: 0.9, pitch: 0.3, title: 'Tappa 8: Il nostro vicinato stellare', narration: 'Allontanandoci, il Sole diventa una stella tra Sirio, Vega, Altair e decine di vicine.' },
    { objectId: 'sagittariusA', scaleIndex: 3, zoomValue: 84, faceOnGalaxy: true, title: 'Tappa 9: La Galassia Via Lattea', narration: 'Zoom indietro fino a 100.000 anni luce! La nostra Via Lattea è una spirale barrata di oltre 200 miliardi di stelle con il buco nero Sagittario A* al centro.' },
    { objectId: 'andromeda', scaleIndex: 4, zoomValue: 90.5, yaw: 0.6, pitch: 0.5, title: 'Tappa 10: Andromeda e il Gruppo Locale', narration: 'A 2,5 milioni di anni luce fluttua la Galassia di Andromeda, la nostra vicina gigante da mille miliardi di stelle.' },
    { objectId: 'laniakea', scaleIndex: 4, zoomValue: 96.5, yaw: 1.0, pitch: 0.4, title: 'Tappa 11: La Rete Cosmica', narration: 'Infine, miliardi di anni luce! I superammassi come Laniakea formano i filamenti luminosi della Rete Cosmica in tutto l’universo osservabile!' }
  ]
};

export const SPACE_QUIZ_QUESTIONS_EXTRA = {
  ja: [
    {
      question: '現在、地球から最も遠い場所を飛んでいる人類の宇宙探査機はどれ？',
      options: ['国際宇宙ステーション (ISS)', 'ボイジャー1号 (Voyager 1)', 'アポロ11号', 'ハッブル宇宙望遠鏡'],
      correctIndex: 1,
      explanation: '大正解！1977年に打ち上げられたボイジャー1号は現在、約250億 km（約167 AU）離れた星間空間を飛んでいます。'
    },
    {
      question: '太陽に最も近い恒星系はどれ？（系外惑星もありますか？）',
      options: ['シリウス（惑星なし）', 'アルファ・ケンタウリ / プロキシマ・ケンタウリ（プロキシマbがある！）', 'ベテルギウス（10個の惑星）', '北極星ポラリス'],
      correctIndex: 1,
      explanation: 'その通り！4.24光年先のプロキシマ・ケンタウリには、ハビタブルゾーンを回る岩石惑星プロキシマbがあります。'
    },
    {
      question: '宇宙人に出会ったときのためにボイジャー1号・2号が積んでいる宝物は？',
      options: ['海賊の宝の地図', '地球の音や音楽、55言語の挨拶を収めた「ゴールデンレコード」', 'チョコチップクッキーの箱', 'NASAのトロフィー'],
      correctIndex: 1,
      explanation: '正解！カール・セーガン博士らが制作した金メッキ銅板の「ゴールデンレコード」を搭載しています。'
    },
    {
      question: 'TRAPPIST-1の周りを回っている地球サイズの岩石惑星はいくつ？',
      options: ['1個だけ', '3個', '7個の地球サイズの岩石惑星！', '100個'],
      correctIndex: 2,
      explanation: '素晴らしい！TRAPPIST-1には7個の地球サイズの岩石惑星 (b〜h) があり、3個がハビタブルゾーンにあります。'
    },
    {
      question: '天の川銀河の隣にある（250万光年先の）巨大な渦巻銀河の名前は？',
      options: ['アンドロメダ銀河 (M31)', 'ソンブレロ銀河', '子持ち銀河', 'アルファ・ケンタウリ'],
      correctIndex: 0,
      explanation: '大正解！アンドロメダ銀河は約1兆個の恒星を持ち、暗い夜空で肉眼で見える最も遠い天体です。'
    }
  ],
  ko: [
    {
      question: '현재 지구에서 가장 멀리 떨어져 비행 중인 인류의 우주 탐사선은 무엇일까요?',
      options: ['국제우주정거장 (ISS)', '보이저 1호 (Voyager 1)', '아폴로 11호', '허블 우주망원경'],
      correctIndex: 1,
      explanation: '정답입니다! 1977년 발사된 보이저 1호는 현재 약 250억 km(~167 AU) 떨어진 성간 우주를 비행하고 있습니다.'
    },
    {
      question: '우리 태양에서 가장 가까운 항성계는 어디이며, 외계행성이 있을까요?',
      options: ['시리우스 (행성 없음)', '알파 센타우리 / 프록시마 센타우리 (네, 프록시마 b!)', '베텔게우스 (행성 10개)', '북극성 폴라리스'],
      correctIndex: 1,
      explanation: '맞습니다! 4.24광년 거리의 프록시마 센타우리에는 거주가능 영역을 도는 암석 행성 프록시마 b가 있습니다.'
    },
    {
      question: '외계 문명이 발견할 경우를 대비해 보이저 1호와 2호가 싣고 가는 특별한 보물은?',
      options: ['해적 보물 지도', '지구의 소리, 음악, 55개 언어 인사가 담긴 골든 레코드', '초코칩 쿠키 상자', 'NASA 트로피'],
      correctIndex: 1,
      explanation: '네! 칼 세이건이 기획한 금도금 구리 음반 골든 레코드를 싣고 있습니다.'
    },
    {
      question: '이웃 별 TRAPPIST-1 주위를 공전하는 지구 크기의 암석 외계행성은 몇 개일까요?',
      options: ['단 1개', '3개', '지구 크기 암석 행성 7개!', '100개'],
      correctIndex: 2,
      explanation: '대단해요! TRAPPIST-1에는 7개의 지구 크기 암석 행성(b~h)이 있으며, 3개가 거주가능 영역 안에 있습니다.'
    },
    {
      question: '우리은하에서 250만 광년 떨어진 이웃 거대 나선은하의 이름은 무엇일까요?',
      options: ['안드로메다 은하 (M31)', '솜브레로 은하', '소용돌이 은하', '알파 센타우리'],
      correctIndex: 0,
      explanation: '정답! 안드로메다 은하는 약 1조 개의 별을 가지고 있으며 맨눈으로 볼 수 있는 가장 먼 천체입니다.'
    }
  ],
  pt: [
    {
      question: 'Qual espaçonave construída por humanos está mais longe da Terra neste momento?',
      options: ['Estação Espacial Internacional', 'Voyager 1', 'Apollo 11', 'Telescópio Espacial Hubble'],
      correctIndex: 1,
      explanation: 'Correto! A Voyager 1 foi lançada em 1977 e está a mais de 25 bilhões de km (~167 UA) no espaço interestelar.'
    },
    {
      question: 'Qual é o sistema estelar mais próximo do nosso Sol e ele possui algum exoplaneta?',
      options: ['Sírius (Sem planetas)', 'Alfa Centauri / Proxima Centauri (Sim, Proxima b!)', 'Betelgeuse (10 planetas)', 'Polaris, a Estrela Polar'],
      correctIndex: 1,
      explanation: 'Exato! Proxima Centauri fica a 4,24 anos-luz e abriga o exoplaneta rochoso Proxima b na zona habitável.'
    },
    {
      question: 'Que tesouro especial as sondas Voyager 1 e 2 carregam caso uma civilização alienígena as encontre?',
      options: ['Um mapa de tesouro pirata', 'O Disco de Ouro com sons da Terra, músicas e saudações em 55 idiomas', 'Uma caixa de biscoitos', 'Um troféu da NASA'],
      correctIndex: 1,
      explanation: 'Sim! Ambas carregam o Disco de Ouro idealizado por Carl Sagan.'
    },
    {
      question: 'Quantos exoplanetas rochosos do tamanho da Terra orbitam a estrela próxima TRAPPIST-1?',
      options: ['Apenas 1 planeta', '3 planetas', '7 planetas rochosos do tamanho da Terra!', '100 planetas'],
      correctIndex: 2,
      explanation: 'Incrível! TRAPPIST-1 tem 7 mundos rochosos do tamanho da Terra (b–h), com 3 na zona habitável.'
    },
    {
      question: 'Qual é o nome da galáxia espiral gigante vizinha da nossa Via Láctea (a 2,5 milhões de anos-luz)?',
      options: ['A Galáxia de Andrômeda (M31)', 'A Galáxia do Sombrero', 'A Galáxia do Redemoinho', 'Alfa Centauri'],
      correctIndex: 0,
      explanation: 'Acertou! A Galáxia de Andrômeda tem cerca de 1 trilhão de estrelas e é o objeto mais distante visível a olho nu.'
    }
  ],
  fr: [
    {
      question: 'Quel vaisseau spatial construit par l’homme est actuellement le plus éloigné de la Terre ?',
      options: ['La Station spatiale internationale', 'Voyager 1', 'Apollo 11', 'Le télescope spatial Hubble'],
      correctIndex: 1,
      explanation: 'Exact ! Lancée en 1977, Voyager 1 se trouve à plus de 25 milliards de kilomètres (~167 UA) dans l’espace interstellaire.'
    },
    {
      question: 'Quel est le système stellaire le plus proche du Soleil, et possède-t-il une exoplanète ?',
      options: ['Sirius (Aucune planète)', 'Alpha du Centaure / Proxima du Centaure (Oui, Proxima b !)', 'Bételgeuse (10 planètes)', 'Polaris, l’Étoile Polaire'],
      correctIndex: 1,
      explanation: 'Bravo ! Proxima du Centaure est à 4,24 années-lumière et abrite l’exoplanète rocheuse Proxima b dans sa zone habitable.'
    },
    {
      question: 'Quel trésor spécial Voyager 1 et 2 emportent-elles au cas où une civilisation extraterrestre les trouverait ?',
      options: ['Une carte au trésor pirate', 'Le Disque d’or avec les sons de la Terre, de la musique et des salutations en 55 langues', 'Une boîte de biscuits', 'Un trophée de la NASA'],
      correctIndex: 1,
      explanation: 'Oui ! Les deux sondes Voyager portent le Disque d’or conçu par l’équipe de Carl Sagan.'
    },
    {
      question: 'Combien d’exoplanètes rocheuses de la taille de la Terre gravitent autour de l’étoile TRAPPIST-1 ?',
      options: ['Seulement 1 planète', '3 planètes', '7 planètes rocheuses de la taille de la Terre !', '100 planètes'],
      correctIndex: 2,
      explanation: 'Incroyable ! TRAPPIST-1 possède 7 mondes rocheux de la taille de la Terre (b–h), dont 3 dans la zone habitable.'
    },
    {
      question: 'Comment s’appelle la galaxie spirale géante voisine de notre Voie Lactée (à 2,5 millions d’années-lumière) ?',
      options: ['La Galaxie d’Andromède (M31)', 'La Galaxie du Sombrero', 'La Galaxie du Tourbillon', 'Alpha du Centaure'],
      correctIndex: 0,
      explanation: 'Gagné ! La Galaxie d’Andromède compte environ mille milliards d’étoiles et est l’objet le plus lointain visible à l’œil nu.'
    }
  ],
  it: [
    {
      question: 'Quale sonda spaziale costruita dall’uomo è la più lontana dalla Terra in questo momento?',
      options: ['Stazione Spaziale Internazionale', 'Voyager 1', 'Apollo 11', 'Telescopio Spaziale Hubble'],
      correctIndex: 1,
      explanation: 'Esatto! Lanciata nel 1977, Voyager 1 si trova a oltre 25 miliardi di chilometri (~167 UA) nello spazio interstellare.'
    },
    {
      question: 'Qual è il sistema stellare più vicino al nostro Sole e ospita qualche esopianeta?',
      options: ['Sirio (Nessun pianeta)', 'Alfa Centauri / Proxima Centauri (Sì, Proxima b!)', 'Betelgeuse (10 pianeti)', 'Polaris, la Stella Polare'],
      correctIndex: 1,
      explanation: 'Proprio così! Proxima Centauri dista 4,24 anni luce e ospita l’esopianeta roccioso Proxima b nella zona abitabile.'
    },
    {
      question: 'Quale tesoro speciale portano Voyager 1 e 2 nel caso in cui una civiltà aliena le trovasse?',
      options: ['Una mappa del tesoro dei pirati', 'Il Golden Record con suoni della Terra, musica e saluti in 55 lingue', 'Una scatola di biscotti', 'Un trofeo della NASA'],
      correctIndex: 1,
      explanation: 'Sì! Entrambe le sonde Voyager portano il disco d’oro ideato da Carl Sagan.'
    },
    {
      question: 'Quanti esopianeti rocciosi grandi come la Terra orbitano attorno alla stella TRAPPIST-1?',
      options: ['Solo 1 pianeta', '3 pianeti', '7 pianeti rocciosi grandi come la Terra!', '100 pianeti'],
      correctIndex: 2,
      explanation: 'Fantastico! TRAPPIST-1 ha 7 mondi rocciosi grandi come la Terra (b–h), con 3 nella zona abitabile.'
    },
    {
      question: 'Come si chiama la galassia a spirale gigante vicina alla nostra Via Lattea (a 2,5 milioni di anni luce)?',
      options: ['La Galassia di Andromeda (M31)', 'La Galassia Sombrero', 'La Galassia Vortice', 'Alfa Centauri'],
      correctIndex: 0,
      explanation: 'Indovinato! La Galassia di Andromeda conta circa mille miliardi di stelle ed è l’oggetto più lontano visibile a occhio nudo.'
    }
  ]
};
