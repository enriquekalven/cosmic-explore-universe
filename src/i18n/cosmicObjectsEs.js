/**
 * Spanish (es) translations for COSMIC_SCALES, COSMIC_OBJECTS, GUIDED_TOUR_STOPS, and SPACE_QUIZ_QUESTIONS.
 */

export const COSMIC_SCALES_ES = [
  {
    id: 'earth-moon',
    index: 0,
    name: 'Tierra y Luna',
    subtitle: 'Nuestro hogar y vecindario planetario',
    rangeLabel: '10,000 km – 1 millón km',
    description:
      '¡Bienvenido a casa! La Tierra es un mundo oceánico rocoso protegido por una delgada atmósfera azul, acompañado por nuestra fiel Luna y la Estación Espacial Internacional orbitando sobre nosotros.',
    funPrompt: '¡Haz clic en la Tierra, la Luna o la Estación Espacial Internacional!'
  },
  {
    id: 'solar-system',
    index: 1,
    name: 'Sistema Solar y Sondas',
    subtitle: '8 planetas, Tesla Roadster y Voyager 1/2',
    rangeLabel: '1 UA – 200 UA (30 mil millones km)',
    description:
      '¡Aléjate millones de kilómetros! Nuestro Sol reúne a 8 planetas diversos, el Tesla Roadster de Starman cruzando la órbita de Marte y las sondas más lejanas de la humanidad: Voyager 1 y Voyager 2 viajando por el espacio interestelar.',
    funPrompt: '¡Haz clic en "🚗 Tesla Roadster", "📡 Voyager 1" o "🛸 Voyager 2" para rastrearlos en vivo!'
  },
  {
    id: 'nearby-stars',
    index: 2,
    name: 'Estrellas cercanas y 6,451 exoplanetas',
    subtitle: 'Todos los mundos alienígenas confirmados',
    rangeLabel: '4 años luz – 5,000+ años luz',
    description:
      '¡Explora los 6,451 exoplanetas confirmados en 4,847 sistemas estelares del Archivo de Exoplanetas de la NASA! Visita Próxima Centauri b (4.24 años luz), los 7 mundos del tamaño de la Tierra en TRAPPIST-1 o busca cualquier sistema.',
    funPrompt: '¡Usa el Explorador de Exoplanetas o haz clic en cualquier estrella para ver sus mundos!'
  },
  {
    id: 'milky-way',
    index: 3,
    name: 'Galaxia Vía Láctea',
    subtitle: 'Nuestra isla de más de 200 mil millones de estrellas',
    rangeLabel: '100,000 años luz de diámetro',
    description:
      '¡Contempla nuestra Vía Láctea! Una gigantesca galaxia espiral barrada con entre 200 y 400 mil millones de estrellas. Todo nuestro Sistema Solar vive en el Brazo de Orión, a unos 26,000 años luz del agujero negro supermasivo Sagitario A*.',
    funPrompt: '¡Busca el marcador "Estás aquí (Brazo de Orión)" para ver dónde vive nuestro Sol!'
  },
  {
    id: 'universe',
    index: 4,
    name: 'El Universo',
    subtitle: 'Grupo Local, Red Cósmica y Espacio Profundo',
    rangeLabel: '2.5 millones – 93 mil millones de años luz',
    description:
      '¡En la escala más grandiosa, galaxias enteras como la Vía Láctea y Andrómeda son puntos brillantes tejidos en la Red Cósmica: billones de galaxias a lo largo de 93 mil millones de años luz!',
    funPrompt: '¡Explora Andrómeda (nuestra galaxia gigante vecina) y los filamentos de la Red Cósmica!'
  }
];

export const COSMIC_OBJECTS_ES = {
  earth: {
    name: 'Planeta Tierra',
    pronunciation: 'TIE-rra',
    category: 'Planeta hogar',
    badge: '🌍 ¡Donde vivimos!',
    quickStats: [
      { label: 'Diámetro', value: '12,742 km (7,918 millas)' },
      { label: 'Distancia al Sol', value: '149.6 millones km (1 UA)' },
      { label: 'Duración del año', value: '365.25 días' },
      { label: 'Agua superficial', value: '71% océanos' }
    ],
    kidSummary:
      '¡La Tierra es el tercer planeta desde el Sol y el único lugar del universo donde sabemos que existe vida! Sus océanos líquidos, su escudo magnético protector y su atmósfera rica en oxígeno nos mantienen seguros.',
    funFacts: [
      '¡La Tierra no es una esfera perfecta: al girar se abulta un poquito en el ecuador como un balón ligeramente aplastado!',
      '¡Ahora mismo viajas en la Nave Tierra alrededor del Sol a 107,000 km/h (67,000 mph)!',
      'Las auroras boreales y australes ocurren cuando nuestro escudo magnético desvía el viento solar.'
    ],
    travelTimes: {
      light: '0 segundos (¡Estás aquí!)',
      voyager1: '¡Lanzada desde Cabo Cañaveral en 1977!',
      jetPlane: '42 horas para dar la vuelta completa al ecuador'
    }
  },
  moon: {
    name: 'La Luna',
    pronunciation: 'LU-na',
    category: 'Satélite natural',
    badge: '🌕 12 humanos caminaron aquí',
    quickStats: [
      { label: 'Distancia a la Tierra', value: '384,400 km (238,855 millas)' },
      { label: 'Diámetro', value: '3,475 km (aprox. 1/4 de la Tierra)' },
      { label: 'Período orbital', value: '27.3 días' },
      { label: 'Gravedad superficial', value: '1/6 de la Tierra (¡Salta 6 veces más alto!)' }
    ],
    kidSummary:
      '¡La Luna es la fiel compañera rocosa de la Tierra! ¡En el espacio entre la Tierra y la Luna en su punto más lejano cabrían los otros 7 planetas del Sistema Solar puestos en fila!',
    funFacts: [
      'Como no hay viento ni lluvia en la Luna, ¡las huellas que dejaron los astronautas del Apolo en 1969 durarán millones de años!',
      'La gravedad de la Luna atrae los océanos de la Tierra, creando las mareas altas y bajas en las playas.',
      '¡Siempre vemos la misma cara de la Luna desde la Tierra porque tarda lo mismo en girar sobre sí misma que en rodearnos!'
    ],
    travelTimes: {
      light: '1.28 segundos',
      voyager1: '6.3 horas a velocidad máxima',
      apolloRocket: '3 días (Apolo 11 en 1969)'
    }
  },
  iss: {
    name: 'Estación Espacial Internacional (EEI)',
    pronunciation: 'E-E-I',
    category: 'Laboratorio espacial humano',
    badge: '🛰️ 16 amaneceres cada día',
    quickStats: [
      { label: 'Altitud', value: '408 km sobre la Tierra' },
      { label: 'Velocidad orbital', value: '27,600 km/h (17,150 mph)' },
      { label: 'Tamaño', value: '109 metros (como un campo de fútbol)' },
      { label: 'Tiempo por órbita', value: '90 minutos por vuelta' }
    ],
    kidSummary:
      '¡La Estación Espacial Internacional es un gran laboratorio científico que flota en órbita baja terrestre donde los astronautas viven, cultivan lechuga espacial y hacen experimentos en microgravedad!',
    funFacts: [
      '¡Los astronautas en la EEI dan 16 vueltas a la Tierra cada día, viendo un amanecer o atardecer cada 45 minutos!',
      'En microgravedad, los astronautas duermen dentro de sacos sujetos a la pared para no salir flotando.',
      '¡Puedes ver la EEI desde tu patio de noche: parece una estrella brillante y rápida que no titila!'
    ],
    travelTimes: {
      light: '0.0014 segundos',
      spacecraft: '4 a 8 horas tras el despegue'
    }
  },
  sun: {
    name: 'El Sol',
    pronunciation: 'SOL',
    category: 'Estrella enana amarilla (G2V)',
    badge: '☀️ 99.86% de la masa del Sistema Solar',
    quickStats: [
      { label: 'Diámetro', value: '1.39 millones km (109× la Tierra)' },
      { label: 'Temperatura del núcleo', value: '15 millones °C' },
      { label: 'Edad', value: '4,600 millones de años' },
      { label: 'Luz hasta la Tierra', value: '8 minutos 20 segundos' }
    ],
    kidSummary:
      'El Sol es una gigantesca esfera brillante de plasma de hidrógeno y helio en el centro del Sistema Solar. ¡Sin su calor y su luz, la Tierra sería una bola de hielo!',
    funFacts: [
      '¡Más de 1.3 millones de planetas Tierra cabrían dentro del Sol!',
      'Cada segundo, el Sol fusiona 600 millones de toneladas de hidrógeno en helio, produciendo la luz solar que sientes.',
      '¡El Sol infla una burbuja de viento solar alrededor de los planetas llamada Heliosfera, de la cual solo Voyager 1 y 2 han salido!'
    ],
    travelTimes: {
      light: '8 minutos 20 segundos',
      voyager1: '102 días a 17 km/s',
      jetPlane: '19 años sin parar'
    }
  },
  mercury: {
    name: 'Mercurio',
    pronunciation: 'mer-CU-rio',
    category: 'Planeta terrestre',
    badge: '☄️ El planeta más veloz',
    quickStats: [
      { label: 'Distancia al Sol', value: '0.39 UA (58 millones km)' },
      { label: 'Duración del año', value: '88 días terrestres' },
      { label: 'Lunas', value: '0 lunas' },
      { label: 'Cambio térmico', value: '-180 °C a +430 °C' }
    ],
    kidSummary:
      'Mercurio es el planeta más pequeño de nuestro Sistema Solar y el más cercano al Sol. ¡Corre alrededor del Sol más rápido que cualquier otro planeta!',
    funFacts: [
      '¡Aunque Mercurio está más cerca del Sol, Venus es más caliente porque Mercurio casi no tiene atmósfera para retener el calor!',
      '¡Un día solar en Mercurio (de amanecer a amanecer) dura 176 días terrestres, el doble que su año de 88 días!'
    ],
    travelTimes: {
      light: '5 minutos desde la Tierra (promedio)',
      voyager1: '62 días'
    }
  },
  venus: {
    name: 'Venus',
    pronunciation: 'VE-nus',
    category: 'Planeta terrestre',
    badge: '🌋 El más caliente y gira al revés',
    quickStats: [
      { label: 'Distancia al Sol', value: '0.72 UA (108 millones km)' },
      { label: 'Temp. superficial', value: '465 °C — ¡Derrite el plomo!' },
      { label: 'Duración del año', value: '225 días terrestres' },
      { label: 'Lunas', value: '0 lunas' }
    ],
    kidSummary:
      '¡Venus tiene casi el mismo tamaño que la Tierra, pero está envuelto en espesas nubes doradas que atrapan el calor como un superinvernadero!',
    funFacts: [
      '¡Venus gira al revés que la Tierra: en Venus el Sol sale por el oeste y se oculta por el este!',
      '¡Venus gira tan despacio que un solo día en Venus dura más que todo su año!'
    ],
    travelTimes: {
      light: '2.3 minutos en su máximo acercamiento',
      voyager1: '28 días en su máximo acercamiento'
    }
  },
  mars: {
    name: 'Marte',
    pronunciation: 'MAR-te',
    category: 'El Planeta Rojo',
    badge: '🤖 Hogar de los rovers robóticos',
    quickStats: [
      { label: 'Distancia al Sol', value: '1.52 UA (228 millones km)' },
      { label: 'Duración del año', value: '687 días terrestres' },
      { label: 'Lunas', value: '2 (Fobos y Deimos)' },
      { label: 'Volcán más alto', value: 'Monte Olimpo (¡3× el Everest!)' }
    ],
    kidSummary:
      '¡Marte es un planeta desértico frío y rojizo donde rovers de la NASA como Curiosity y Perseverance exploran en busca de rastros de agua antigua y vida microbiana!',
    funFacts: [
      '¡Marte se ve rojo porque su suelo está cubierto de óxido de hierro, igual que el óxido de una bicicleta vieja!',
      'El Monte Olimpo en Marte es un volcán tan gigantesco que su base cubriría todo un país como España o el estado de Arizona.',
      '¡Los atardeceres en Marte brillan de color azul en lugar de naranja debido al polvo fino en su cielo!'
    ],
    travelTimes: {
      light: '3 a 22 minutos desde la Tierra',
      spacecraft: '7 meses en cohete de la NASA'
    }
  },
  jupiter: {
    name: 'Júpiter',
    pronunciation: 'JU-pi-ter',
    category: 'Rey gigante gaseoso',
    badge: '🌪️ Gran Mancha Roja y 95 lunas',
    quickStats: [
      { label: 'Distancia al Sol', value: '5.2 UA (778 millones km)' },
      { label: 'Diámetro', value: '139,820 km (11× más ancho que la Tierra)' },
      { label: 'Duración del día', value: '9 horas 55 minutos (¡El giro más rápido!)' },
      { label: 'Lunas conocidas', value: '95 lunas (incluyendo Europa e Ío)' }
    ],
    kidSummary:
      '¡Júpiter es el planeta más grande del Sistema Solar! Tanto Voyager 1 como Voyager 2 pasaron junto a Júpiter en 1979, usando su enorme gravedad como una resortera para impulsarse hacia los planetas exteriores.',
    funFacts: [
      '¡La Gran Mancha Roja de Júpiter es una tormenta más grande que toda la Tierra que lleva girando más de 300 años!',
      'La luna helada Europa esconde bajo su corteza un océano de agua líquida con el doble de agua que todos los océanos de la Tierra juntos.',
      '¡Voyager 1 descubrió que Júpiter tiene anillos tenues y volcanes activos en su luna Ío!'
    ],
    travelTimes: {
      light: '35 a 52 minutos desde la Tierra',
      voyager1: '1.5 años (llegó en marzo de 1979)'
    }
  },
  saturn: {
    name: 'Saturno',
    pronunciation: 'sa-TUR-no',
    category: 'Gigante gaseoso anillado',
    badge: '🪐 La joya del Sistema Solar',
    quickStats: [
      { label: 'Distancia al Sol', value: '9.5 UA (1,400 millones km)' },
      { label: 'Ancho de anillos', value: '282,000 km (¡solo ~10 m de grosor!)' },
      { label: 'Lunas conocidas', value: '146 lunas (Titán y Encélado)' },
      { label: 'Densidad', value: '¡Menor que el agua: flotaría!' }
    ],
    kidSummary:
      '¡Saturno es famoso por sus deslumbrantes anillos formados por miles de millones de fragmentos de hielo brillante y roca, desde granitos de polvo hasta bloques del tamaño de una casa!',
    funFacts: [
      'Cuando Voyager 1 sobrevoló Saturno en noviembre de 1980, estudió su luna gigante Titán y desvió su trayectoria hacia el norte del plano planetario.',
      'La luna Encélado de Saturno lanza enormes géiseres de hielo de agua al espacio desde un océano subterráneo.',
      '¡Saturno es tan ligero que si existiera una bañera lo bastante grande, todo el planeta flotaría en el agua!'
    ],
    travelTimes: {
      light: '1 hora 20 minutos desde la Tierra',
      voyager1: '3 años y 2 meses (llegó en nov. 1980)'
    }
  },
  uranus: {
    name: 'Urano',
    pronunciation: 'u-RA-no',
    category: 'Gigante de hielo',
    badge: '🧊 Rueda de lado (inclinación de 98°)',
    quickStats: [
      { label: 'Distancia al Sol', value: '19.2 UA (2,900 millones km)' },
      { label: 'Duración del año', value: '84 años terrestres' },
      { label: 'Lunas conocidas', value: '28 lunas (¡con nombres de Shakespeare!)' },
      { label: 'Sobrevuelo Voyager 2', value: '24 de enero de 1986' }
    ],
    kidSummary:
      '¡Urano es un gigante helado azul verdoso inclinado completamente de lado, rodando alrededor del Sol como una bola de boliche! Voyager 2 es la ÚNICA nave en la historia que ha visitado Urano.',
    funFacts: [
      'El gas metano en la atmósfera superior de Urano absorbe la luz roja, dándole su hermoso color azul cian.',
      '¡Los científicos creen que literalmente llueven diamantes reales en las profundidades de Urano y Neptuno!'
    ],
    travelTimes: {
      light: '2 horas 40 minutos desde la Tierra',
      voyager2: '8.5 años (llegó en enero de 1986)'
    }
  },
  neptune: {
    name: 'Neptuno',
    pronunciation: 'nep-TU-no',
    category: 'Gigante de hielo supersónico',
    badge: '💨 Vientos más rápidos (2,100 km/h)',
    quickStats: [
      { label: 'Distancia al Sol', value: '30.1 UA (4,500 millones km)' },
      { label: 'Duración del año', value: '165 años terrestres' },
      { label: 'Luna más grande', value: 'Tritón (¡tiene géiseres de nitrógeno!)' },
      { label: 'Sobrevuelo Voyager 2', value: '25 de agosto de 1989' }
    ],
    kidSummary:
      '¡Neptuno es el planeta principal más lejano del Sol, 30 veces más lejos que la Tierra! Voyager 2 pasó junto a Neptuno en 1989 antes de sumergirse hacia el espacio interestelar.',
    funFacts: [
      '¡Neptuno fue el primer planeta descubierto usando matemáticas puras antes de que nadie lo viera por un telescopio!',
      'Desde que fue descubierto en 1846, ¡Neptuno solo ha completado UNA órbita de 165 años alrededor del Sol (en 2011)!'
    ],
    travelTimes: {
      light: '4 horas 10 minutos desde la Tierra',
      voyager2: '12 años (llegó en agosto de 1989)'
    }
  },
  voyager1: {
    name: 'Sonda Espacial Voyager 1',
    pronunciation: 'VO-ya-yer U-no',
    category: 'Sonda robótica interestelar',
    badge: '📡 ¡El objeto humano más lejano!',
    quickStats: [
      { label: 'Distancia al Sol', value: '~169.8 UA (25,400 millones km)' },
      { label: 'Velocidad', value: '17.0 km/s (61,200 km/h)' },
      { label: 'Tiempo de señal de radio', value: '~23 horas 34 minutos (¡solo ida!)' },
      { label: 'Ubicación actual', value: 'Espacio interestelar (hacia Ofiuco)' }
    ],
    kidSummary:
      'Lanzada en 1977, Voyager 1 sobrevoló Júpiter y Saturno, tomó la famosa foto del "Punto Azul Pálido" de la Tierra a 6 mil millones de km y en 2012 se convirtió en el primer objeto humano en entrar al espacio interestelar.',
    funFacts: [
      '¡Voyager 1 lleva un Disco de Oro con saludos en 55 idiomas, cantos de ballenas, truenos, Mozart y Chuck Berry por si alguna civilización extraterrestre lo encuentra!',
      'Tras pasar bajo Titán en 1980, Voyager 1 salió disparada 35° hacia el norte del plano de los planetas.',
      '¡Incluso viajando a 61,200 km/h, Voyager 1 tardará unos 40,000 años en pasar a 1.6 años luz de otra estrella (Gliese 445)!'
    ],
    travelTimes: {
      light: '23.5 horas para que llegue un comando de radio de la NASA',
      voyager1: '¡Casi 50 años de vuelo continuo desde el 5 de sept. de 1977!'
    }
  },
  voyager2: {
    name: 'Sonda Espacial Voyager 2',
    pronunciation: 'VO-ya-yer DOS',
    category: 'Sonda interestelar del Gran Tour',
    badge: '🛸 ¡Visitó los 4 planetas gigantes!',
    quickStats: [
      { label: 'Distancia al Sol', value: '~142.2 UA (21,300 millones km)' },
      { label: 'Velocidad', value: '15.37 km/s (55,350 km/h)' },
      { label: 'Tiempo de señal de radio', value: '~19 horas 42 minutos (¡solo ida!)' },
      { label: 'Ubicación actual', value: 'Espacio interestelar (constelación del Pavo)' }
    ],
    kidSummary:
      '¡Voyager 2 despegó 16 días ANTES que Voyager 1! Es la única nave en la historia que completó el "Gran Tour" de los cuatro planetas gigantes exteriores: Júpiter, Saturno, Urano y Neptuno.',
    funFacts: [
      'Tras sobrevolar la luna helada Tritón de Neptuno en 1989, Voyager 2 se inclinó 48° hacia el sur del plano orbital del Sistema Solar.',
      'En noviembre de 2018, Voyager 2 cruzó la Heliopausa, donde termina el viento solar y comienza el espacio interestelar.',
      'Al igual que su gemela, Voyager 2 lleva un Disco de Oro con instrucciones para reproducirlo y un mapa hacia nuestro Sol usando púlsares.'
    ],
    travelTimes: {
      light: '19.7 horas para las señales de radio desde la Red del Espacio Profundo en Australia',
      voyager1: 'Lanzada el 20 de agosto de 1977'
    }
  },
  roadster: {
    name: 'Tesla Roadster de Starman',
    pronunciation: 'TES-la ROD-ster de STAR-man',
    category: 'Nave artificial heliocéntrica (2018-017A)',
    badge: '🚗 ¡El auto más rápido del universo!',
    quickStats: [
      { label: 'Órbita solar', value: '0.986 – 1.664 UA (período de 557.2 días)' },
      { label: 'Fecha de lanzamiento', value: '6 de febrero de 2018 (vuelo inaugural Falcon Heavy)' },
      { label: 'Conductor', value: 'Starman (maniquí con traje espacial)' },
      { label: 'ID JPL Horizons', value: '-143205 (COSPAR 2018-017A)' }
    ],
    kidSummary:
      'El 6 de febrero de 2018, el Tesla Roadster color cereza con un maniquí llamado "Starman" al volante fue lanzado a una órbita alrededor del Sol que cruza la de Marte durante el primer vuelo del cohete Falcon Heavy.',
    funFacts: [
      '¡En la pantalla del tablero dice en letras grandes "DON’T PANIC!" ("¡Que no cunda el pánico!"), un homenaje a la Guía del autoestopista galáctico!',
      'Dentro del auto viaja un disco de cristal de cuarzo Arch 5D con toda la trilogía Fundación de Isaac Asimov, diseñado para durar miles de millones de años.',
      'Una placa lleva grabados los nombres de más de 6,000 empleados de SpaceX junto con el mensaje "Hecho en la Tierra por humanos".',
      '¡El Roadster de Starman completa una vuelta elíptica alrededor del Sol cada 557 días, viajando desde la órbita de la Tierra (0.99 UA) hasta más allá de Marte (1.66 UA)!'
    ],
    travelTimes: {
      light: 'De ~3 a 22 minutos luz desde la Tierra según su posición orbital',
      spacecraft: 'Orbita el Sol cada 1.52 años terrestres (557 días)'
    }
  },
  heliopause: {
    name: 'La Heliopausa (Borde del viento solar)',
    pronunciation: 'he-lio-PAU-sa',
    category: 'Frontera de la burbuja del Sistema Solar',
    badge: '🛡️ Donde empieza el espacio interestelar',
    quickStats: [
      { label: 'Distancia al Sol', value: '~120 UA (18,000 millones km)' },
      { label: 'Cruzada por Voyager 1', value: '25 de agosto de 2012 (a 121.6 UA)' },
      { label: 'Cruzada por Voyager 2', value: '5 de noviembre de 2018 (a 119.7 UA)' },
      { label: 'Lo que bloquea', value: '70% de los rayos cósmicos galácticos' }
    ],
    kidSummary:
      'El Sol infla una gigantesca burbuja magnética protectora alrededor de todos los planetas llamada Heliosfera. Su borde exterior —la Heliopausa— es donde el viento solar choca con el gas entre las estrellas. ¡Voyager 1 y 2 ya atravesaron esta frontera!',
    funFacts: [
      '¡Sin la burbuja de la Heliosfera protegiéndonos, la radiación cósmica de supernovas lejanas bombardearía la Tierra!',
      'Más allá de la Heliopausa se extiende la Nube de Oort, una enorme esfera de cometas helados que llega hasta 1.5 años luz.'
    ],
    travelTimes: {
      light: '16.6 horas desde el Sol',
      voyager1: '35 años de vuelo (1977–2012)'
    }
  },
  alphaCentauri: {
    name: 'Alfa Centauri y Próxima Centauri b',
    pronunciation: 'AL-fa sen-TAU-ri',
    category: 'Sistema estelar más cercano y exoplaneta en zona habitable',
    badge: '🪐 ¡Exoplaneta más cercano (4.24 años luz)!',
    exoplanets: [
      {
        name: 'Próxima Centauri b',
        type: 'Supertierra rocosa (1.07× masa terrestre)',
        orbit: '11.2 días terrestres (¡En la zona habitable!)',
        temp: '¡Podría tener agua líquida si posee atmósfera!'
      },
      {
        name: 'Próxima Centauri d',
        type: 'Mundo rocoso subterrestre (0.26× masa terrestre)',
        orbit: '5.1 días terrestres (Muy cerca de Próxima Centauri)',
        temp: 'Mundo rocoso cálido descubierto en 2022'
      }
    ],
    quickStats: [
      { label: 'Distancia a la Tierra', value: '4.24 a 4.37 años luz (¡40 billones km!)' },
      { label: 'Estrellas en el sistema', value: '3 estrellas (Rigil Kentaurus A, Toliman B, Próxima C)' },
      { label: 'Exoplanetas confirmados', value: '2+ alrededor de Próxima Centauri' },
      { label: 'Tiempo en Voyager 1', value: '¡~75,000 años a 17 km/s!' }
    ],
    kidSummary:
      '¡Alfa Centauri es el vecino estelar más cercano a nuestro Sol! Es un baile de tres estrellas: dos brillantes estrellas parecidas al Sol (Alfa Centauri A y B) más una pequeña enana roja, Próxima Centauri, donde orbita Próxima b, ¡el exoplaneta más cercano a la Tierra dentro de la zona habitable!',
    funFacts: [
      '¡Si estuvieras en el exoplaneta Próxima Centauri b, tu "año" (y tu cumpleaños) ocurriría cada 11 días!',
      'Mirando hacia atrás desde Alfa Centauri, nuestro Sol se vería como una estrella amarilla brillante dentro de la constelación de Casiopea.',
      '¡Los científicos diseñan diminutas "nanonaves" impulsadas por láser con velas de luz (Breakthrough Starshot) que podrían viajar a Alfa Centauri al 20% de la velocidad de la luz en solo 20 años!'
    ],
    travelTimes: {
      light: '4 años y 3 meses a la velocidad de la luz',
      voyager1: '75,000 años a la velocidad de Voyager 1',
      jetPlane: '¡4.8 millones de años sin parar!'
    }
  },
  barnardsStar: {
    name: 'Estrella de Barnard y Barnard b',
    pronunciation: 'es-TRE-lla de BAR-nard',
    category: 'Enana roja con exoplaneta subterrestre',
    badge: '🏃 La estrella más rápida en nuestro cielo',
    exoplanets: [
      {
        name: 'Barnard b',
        type: 'Subtierra rocosa (0.37× masa terrestre — la mitad de Venus)',
        orbit: '3.15 días terrestres',
        temp: '¡Confirmado en 2024 con el Very Large Telescope de ESO!'
      }
    ],
    quickStats: [
      { label: 'Distancia a la Tierra', value: '5.96 años luz' },
      { label: 'Tipo de estrella', value: 'Enana roja antigua (10 mil millones de años)' },
      { label: 'Exoplaneta confirmado', value: 'Barnard b (¡más 3 mundos candidatos!)' }
    ],
    kidSummary:
      'La Estrella de Barnard es el segundo sistema estelar más cercano a nuestro Sol después de Alfa Centauri. ¡En 2024 los astrónomos confirmaron un pequeño exoplaneta rocoso (Barnard b) que la rodea cada 3 días!',
    funFacts: [
      '¡La Estrella de Barnard se acerca a nuestro Sistema Solar a 110 km/s: hacia el año 11,800 d. C. pasará a 3.75 años luz y será temporalmente nuestra estrella más cercana!'
    ],
    travelTimes: {
      light: '5.96 años',
      voyager1: '105,000 años'
    }
  },
  sirius: {
    name: 'Sirio A y B (La Estrella Perro)',
    pronunciation: 'SI-rio',
    category: 'Estrella más brillante del cielo nocturno',
    badge: '💎 25× más brillante que el Sol',
    quickStats: [
      { label: 'Distancia a la Tierra', value: '8.6 años luz' },
      { label: 'Estrellas en el sistema', value: 'Sirio A (blanco-azulada) + Sirio B (enana blanca)' },
      { label: 'Constelación', value: 'Can Mayor (El Gran Perro)' }
    ],
    kidSummary:
      '¡Sirio es la estrella más brillante que puedes ver en el cielo nocturno! Tiene una diminuta compañera superdensa llamada Sirio B ("El Cachorro") que concentra toda la masa del Sol en una esfera del tamaño de la Tierra.',
    funFacts: [
      '¡Una sola cucharadita de material de la enana blanca Sirio B pesaría tanto como un elefante africano adulto (5 toneladas)!'
    ],
    travelTimes: {
      light: '8.6 años',
      voyager1: '151,000 años'
    }
  },
  epsilonEridani: {
    name: 'Épsilon Erídani (Ran)',
    pronunciation: 'EP-si-lon e-RI-da-ni',
    category: 'Estrella joven tipo solar con planeta gigante y cinturones de asteroides',
    badge: '🪐 Sistema planetario más cercano en estrella tipo solar',
    exoplanets: [
      {
        name: 'Épsilon Erídani b (AEgir)',
        type: 'Gigante gaseoso tipo Júpiter (0.78× masa de Júpiter)',
        orbit: '7.3 años terrestres (~3.5 UA de su estrella)',
        temp: '¡Orbita junto a cinturones de escombros helados y cometas!'
      }
    ],
    quickStats: [
      { label: 'Distancia a la Tierra', value: '10.5 años luz' },
      { label: 'Edad de la estrella', value: 'Solo ~600 millones de años (¡un Sistema Solar bebé!)' },
      { label: 'Anillos de escombros', value: '2 cinturones de asteroides + anillo exterior de cometas' }
    ],
    kidSummary:
      '¡Épsilon Erídani es como una máquina del tiempo que muestra cómo se veía nuestro Sistema Solar hace 4 mil millones de años, con cinturones de asteroides y un planeta gigante del tamaño de Júpiter (AEgir)!',
    funFacts: [
      '¡En 1960, Épsilon Erídani fue la primera estrella que los astrónomos escucharon con radiotelescopios (Proyecto Ozma) buscando señales extraterrestres!'
    ],
    travelTimes: {
      light: '10.5 años',
      voyager1: '185,000 años'
    }
  },
  tauCeti: {
    name: 'Tau Ceti',
    pronunciation: 'TAU CE-ti',
    category: 'Estrella individual tipo solar más cercana con sistema multiplanetario',
    badge: '🌍 4 supertierras candidatas',
    exoplanets: [
      {
        name: 'Tau Ceti e',
        type: 'Supertierra (3.9× masa terrestre)',
        orbit: '163 días (¡Borde interior de la zona habitable!)',
        temp: 'Mundo oceánico cálido o invernadero'
      },
      {
        name: 'Tau Ceti f',
        type: 'Supertierra (3.9× masa terrestre)',
        orbit: '636 días (¡Borde exterior de la zona habitable!)',
        temp: 'Mundo rocoso/helado frío dentro de un denso cinturón de escombros'
      }
    ],
    quickStats: [
      { label: 'Distancia a la Tierra', value: '11.9 años luz' },
      { label: 'Tipo de estrella', value: 'Enana amarilla G8V (¡Muy parecida al Sol!)' },
      { label: 'Mundos conocidos', value: '4 supertierras (g, h, e, f)' }
    ],
    kidSummary:
      '¡Tau Ceti es la estrella solitaria más cercana que es casi gemela de nuestro Sol amarillo! Alberga al menos cuatro planetas supertierra, dos de ellos cerca de su zona habitable.',
    funFacts: [
      '¡Tau Ceti tiene 10 veces más cometas y asteroides girando a su alrededor que nuestro Sistema Solar!'
    ],
    travelTimes: {
      light: '11.9 años',
      voyager1: '210,000 años'
    }
  },
  trappist1: {
    name: 'Sistema TRAPPIST-1 (¡7 mundos del tamaño de la Tierra!)',
    pronunciation: 'TRA-pist U-no',
    category: 'Enana ultrafría con 7 exoplanetas rocosos',
    badge: '🏆 ¡3 planetas en la zona habitable!',
    exoplanets: [
      {
        name: 'TRAPPIST-1e',
        type: 'Mundo rocoso del tamaño de la Tierra (0.92× radio terrestre)',
        orbit: '6.1 días (¡Zona habitable principal!)',
        temp: '¡El mejor candidato para tener océanos de agua líquida!'
      },
      {
        name: 'TRAPPIST-1f y 1g',
        type: 'Mundos rocosos del tamaño de la Tierra (1.04× y 1.13× radio terrestre)',
        orbit: '9.2 días y 12.3 días (Zona habitable)',
        temp: 'Mundos ricos en agua estudiados por el Telescopio Espacial James Webb'
      },
      {
        name: 'TRAPPIST-1b, c, d, h',
        type: '4 planetas rocosos adicionales',
        orbit: '1.5 a 18.7 días',
        temp: '¡Los 7 planetas orbitan más cerca de su estrella que Mercurio del Sol!'
      }
    ],
    quickStats: [
      { label: 'Distancia a la Tierra', value: '40.7 años luz' },
      { label: 'Planetas rocosos', value: '7 del tamaño de la Tierra (b, c, d, e, f, g, h)' },
      { label: 'En zona habitable', value: '3 mundos (e, f, g)' },
      { label: 'Tamaño de la estrella', value: '¡Apenas más grande que Júpiter!' }
    ],
    kidSummary:
      '¡TRAPPIST-1 es uno de los descubrimientos más emocionantes de la astronomía! Siete planetas rocosos del tamaño de la Tierra orbitan una diminuta estrella roja tan de cerca que, desde la superficie de uno, ¡los planetas vecinos en el cielo se verían más grandes que nuestra Luna llena!',
    funFacts: [
      '¡El Telescopio Espacial James Webb observa activamente los planetas de TRAPPIST-1 para analizar si sus atmósferas contienen vapor de agua y dióxido de carbono!',
      'Los planetas orbitan en una "resonancia orbital" musical: ¡sus períodos encajan en proporciones matemáticas rítmicas!'
    ],
    travelTimes: {
      light: '40.7 años',
      voyager1: '718,000 años'
    }
  },
  pegasi51: {
    name: '51 Pegasi y Dimidium (51 Pegasi b)',
    pronunciation: 'cin-cuen-ta y u-no PE-ga-si',
    category: 'Primer exoplaneta descubierto alrededor de una estrella tipo solar',
    badge: '🏅 Descubrimiento Premio Nobel (1995)',
    exoplanets: [
      {
        name: '51 Pegasi b (Dimidium)',
        type: 'Gigante gaseoso "Júpiter caliente" (La mitad de la masa de Júpiter)',
        orbit: '¡Solo 4.23 días (20× más cerca de su estrella que la Tierra del Sol)!',
        temp: '¡Atmósfera incandescente a 1,000 °C!'
      }
    ],
    quickStats: [
      { label: 'Distancia a la Tierra', value: '50.6 años luz' },
      { label: 'Año de descubrimiento', value: '1995 (Ganó el Premio Nobel de Física 2019)' },
      { label: 'Tipo de planeta', value: 'Prototipo de "Júpiter caliente"' }
    ],
    kidSummary:
      'En 1995, 51 Pegasi b se convirtió en el primer exoplaneta descubierto alrededor de una estrella normal parecida al Sol, demostrando que otras estrellas también tienen planetas. ¡Hoy ya conocemos 6,451 exoplanetas!',
    funFacts: [
      '¡Antes de descubrir 51 Pegasi b, nadie imaginaba que un planeta gigante como Júpiter pudiera orbitar tan cerca de su estrella que todo su año durara solo 4 días!'
    ],
    travelTimes: {
      light: '50.6 años',
      voyager1: '890,000 años'
    }
  },
  orionSpur: {
    name: 'Brazo de Orión ("¡Estás aquí!")',
    pronunciation: 'BRA-zo de o-RION',
    category: 'El vecindario galáctico de nuestro Sistema Solar',
    badge: '📍 ¡Estás aquí en la Vía Láctea!',
    quickStats: [
      { label: 'Distancia al centro galáctico', value: '26,670 años luz' },
      { label: 'Velocidad galáctica', value: '828,000 km/h (514,000 mph)' },
      { label: 'Año galáctico', value: '¡230 millones de años por vuelta!' },
      { label: 'Estructura local', value: 'Burbuja Local (cavidad de 300 años luz)' }
    ],
    kidSummary:
      '¡Cada estrella que ves a simple vista de noche vive dentro de un pequeño círculo alrededor de este punto en el Brazo de Orión! Todo nuestro Sistema Solar da una vuelta al centro de la Vía Láctea cada 230 millones de años.',
    funFacts: [
      '¡La última vez que el Sistema Solar estuvo en este mismo punto de su órbita galáctica, los primeros dinosaurios empezaban a caminar sobre la Tierra!',
      'Nuestro Sol y las estrellas cercanas están dentro de la "Burbuja Local", una cavidad de 1,000 años luz excavada por antiguas supernovas.'
    ],
    travelTimes: {
      light: '26,670 años para llegar al centro de la Vía Láctea',
      voyager1: '470 millones de años hasta el Centro Galáctico'
    }
  },
  sagittariusA: {
    name: 'Sagitario A* (Agujero negro del centro galáctico)',
    pronunciation: 'sa-gi-TA-rio A es-TRE-lla',
    category: 'Agujero negro supermasivo',
    badge: '🕳️ 4.3 millones de soles de masa',
    quickStats: [
      { label: 'Masa', value: '4.3 millones de veces nuestro Sol' },
      { label: 'Distancia a la Tierra', value: '26,670 años luz' },
      { label: 'Ancho del horizonte de sucesos', value: '24 millones km (cabe en la órbita de Mercurio)' },
      { label: 'Primera fotografía', value: 'Mayo de 2022 (Telescopio del Horizonte de Sucesos)' }
    ],
    kidSummary:
      '¡En el corazón exacto de nuestra Vía Láctea se encuentra Sagitario A*, un agujero negro supermasivo cuya gravedad es tan intensa que las estrellas cercanas giran a su alrededor a 24 millones de km/h!',
    funFacts: [
      '¡No te preocupes! Sagitario A* está a 26,670 años luz y NO está aspirando nuestra galaxia: las estrellas lo orbitan de forma segura igual que los planetas orbitan al Sol.',
      '¡En 2022, los astrónomos unieron radiotelescopios de toda la Tierra para tomar la primera foto real del anillo brillante alrededor de Sagitario A*!'
    ],
    travelTimes: {
      light: '26,670 años'
    }
  },
  milkyWayDisk: {
    name: 'La Galaxia Vía Láctea',
    pronunciation: 'VI-a LAC-te-a',
    category: 'Galaxia espiral barrada (SBbc)',
    badge: '🌌 200–400 mil millones de estrellas',
    quickStats: [
      { label: 'Diámetro', value: '105,700 años luz de ancho' },
      { label: 'Total de estrellas', value: '200 a 400 mil millones de estrellas' },
      { label: 'Planetas estimados', value: '¡Más de 100 mil millones de exoplanetas!' },
      { label: 'Edad', value: '13,600 millones de años' }
    ],
    kidSummary:
      'La Vía Láctea es nuestra isla cósmica: un colosal remolino de estrellas, nebulosas brillantes donde nacen estrellas bebés y brazos espirales (Perseo, Escudo-Centauro, Sagitario y Orión).',
    funFacts: [
      '¡Si todo nuestro Sistema Solar (hasta Neptuno) se encogiera al tamaño de una moneda, la Vía Láctea seguiría siendo tan ancha como todo el continente norteamericano!',
      'Casi cada estrella de la Vía Láctea tiene al menos un planeta en promedio: ¡hay cientos de miles de millones de mundos solo en nuestra galaxia!'
    ],
    travelTimes: {
      light: '¡105,700 años para cruzar de un extremo a otro de la Vía Láctea!'
    }
  },
  andromeda: {
    name: 'Galaxia de Andrómeda (M31)',
    pronunciation: 'an-DRO-me-da',
    category: 'Galaxia espiral gigante más cercana',
    badge: '🌀 1 billón de estrellas (visible a simple vista)',
    quickStats: [
      { label: 'Distancia a la Vía Láctea', value: '2.537 millones de años luz' },
      { label: 'Diámetro', value: '152,000 años luz de ancho' },
      { label: 'Total de estrellas', value: '~1 billón de estrellas (¡Más del doble que la Vía Láctea!)' },
      { label: 'Velocidad de acercamiento', value: '110 km/s (400,000 km/h) hacia nosotros' }
    ],
    kidSummary:
      '¡Andrómeda es nuestra vecina gigante en el Grupo Local de galaxias! En una noche oscura puedes verla a simple vista como un tenue óvalo difuso: ¡la luz que llega a tus ojos salió de Andrómeda hace 2.5 millones de años!',
    funFacts: [
      '¡Andrómeda y la Vía Láctea se atraen suavemente y se fusionarán dentro de unos 4,500 millones de años para formar una galaxia gigante apodada "Lactómeda"!',
      'Como el espacio entre las estrellas es tan enorme, cuando las dos galaxias se unan, ¡casi ninguna estrella chocará entre sí!'
    ],
    travelTimes: {
      light: '¡2,537,000 años a la velocidad de la luz!'
    }
  },
  triangulum: {
    name: 'Galaxia del Triángulo (M33)',
    pronunciation: 'tri-AN-gu-lo',
    category: 'Tercera galaxia más grande del Grupo Local',
    badge: '✨ 40 mil millones de estrellas',
    quickStats: [
      { label: 'Distancia', value: '2.73 millones de años luz' },
      { label: 'Diámetro', value: '61,000 años luz' },
      { label: 'Total de estrellas', value: '~40 mil millones de estrellas' }
    ],
    kidSummary:
      '¡Junto con Andrómeda, la Vía Láctea y docenas de galaxias enanas más pequeñas (como las Nubes de Magallanes), la Galaxia del Triángulo forma nuestro "Grupo Local" de galaxias!',
    funFacts: [
      '¡La Galaxia del Triángulo es una fábrica de estrellas que crea estrellas bebés azules mucho más rápido para su tamaño que nuestra Vía Láctea!'
    ],
    travelTimes: {
      light: '2,730,000 años'
    }
  },
  laniakea: {
    name: 'Supercúmulo Laniakea y la Red Cósmica',
    pronunciation: 'la-nia-KE-a',
    category: 'Supercúmulo de 100,000 galaxias',
    badge: '🕸️ "Cielo inconmensurable" en hawaiano',
    quickStats: [
      { label: 'Ancho', value: '520 millones de años luz' },
      { label: 'Total de galaxias', value: '~100,000 galaxias' },
      { label: 'Universo observable', value: '93 mil millones de años luz (¡2 billones de galaxias!)' },
      { label: 'Edad del universo', value: '13,800 millones de años' }
    ],
    kidSummary:
      '¡Aléjate hasta la escala más grande de todas! Nuestra Vía Láctea es solo un puntito luminoso en las afueras del Supercúmulo Laniakea, parte de la gigantesca Red Cósmica donde miles de millones de galaxias forman filamentos brillantes separados por enormes vacíos cósmicos.',
    funFacts: [
      '¡Hay más estrellas en el universo observable que granos de arena en todas las playas y desiertos del planeta Tierra juntos!',
      'Cada átomo de calcio en tus huesos, hierro en tu sangre y oro en la Tierra se forjó dentro de estrellas antiguas hace miles de millones de años: ¡como dijo Carl Sagan, estamos hechos de polvo de estrellas!'
    ],
    travelTimes: {
      light: '¡93 mil millones de años luz a través del Universo Observable en expansión!'
    }
  }
};

export const GUIDED_TOUR_STOPS_ES = [
  {
    objectId: 'earth',
    scaleIndex: 0,
    zoomValue: 4.5,
    yaw: -0.9,
    pitch: 0.2,
    title: 'Parada 1: La Nave Tierra',
    narration:
      '¡Bienvenido a bordo del Explorador Cósmico! Comenzamos en casa, en el Planeta Tierra: un mapa real de la NASA de nuestro mundo oceánico azul, con el día y la noche exactamente donde están ahora mismo, y la Estación Espacial Internacional orbitando a solo 408 kilómetros sobre nosotros.'
  },
  {
    objectId: 'moon',
    scaleIndex: 0,
    zoomValue: 2.6,
    yaw: -0.4,
    pitch: 0.35,
    title: 'Parada 2: Nuestra compañera, la Luna',
    narration:
      'Alejándonos 384,400 kilómetros, aquí está nuestra Luna a su distancia real, mostrando la fase lunar de esta noche. Doce astronautas del programa Apolo caminaron sobre sus cráteres polvorientos, y la luz tarda solo 1.3 segundos en viajar de la Tierra a la Luna.'
  },
  {
    objectId: 'saturn',
    scaleIndex: 1,
    zoomValue: null,
    yaw: 0.7,
    pitch: 0.3,
    title: 'Parada 3: Saturno y sus Anillos',
    narration:
      '¡Volemos hacia Saturno! Sus anillos están hechos de miles de millones de fragmentos de hielo brillante, y puedes ver la sombra del planeta proyectada sobre ellos. Titán y Encélado orbitan muy cerca.'
  },
  {
    objectId: 'sun',
    scaleIndex: 1,
    zoomValue: 37,
    yaw: -0.6,
    pitch: 0.62,
    title: 'Parada 4: Todo el Sistema Solar',
    narration:
      '¡Ahora nos alejamos miles de millones de kilómetros! En el centro brilla nuestro Sol, rodeado por los mundos rocosos Mercurio, Venus, Tierra y Marte, el cinturón de asteroides y los gigantes Júpiter, Saturno, Urano y Neptuno, todos en sus posiciones reales de hoy.'
  },
  {
    objectId: 'voyager1',
    scaleIndex: 1,
    zoomValue: 43,
    yaw: -0.2,
    pitch: 0.5,
    title: 'Parada 5: ¡Voyager 1 y 2 en el espacio interestelar!',
    narration:
      '¡Mira más allá de todos los planetas y de la burbuja azul de la heliopausa! Esas trayectorias cian y púrpura son las rutas reales de Voyager 1 y Voyager 2 de la NASA: lanzadas en 1977 y ahora a más de 21 a 25 mil millones de kilómetros, llevando el Disco de Oro hacia las estrellas.'
  },
  {
    objectId: 'proximaCentauri',
    scaleIndex: 2,
    zoomValue: null,
    yaw: 0.3,
    pitch: 0.45,
    title: 'Parada 6: Próxima Centauri b — el exoplaneta más cercano',
    narration:
      '¡Saltamos miles de veces más lejos, hasta 4.2 años luz! Esta pequeña estrella roja es Próxima Centauri, parte del sistema Alfa Centauri. Su planeta Próxima b orbita dentro de la zona habitable verde, donde podría existir agua líquida.'
  },
  {
    objectId: 'trappist1',
    scaleIndex: 2,
    zoomValue: null,
    yaw: -0.5,
    pitch: 0.55,
    title: 'Parada 7: Los siete mundos de TRAPPIST-1',
    narration:
      'A 40.7 años luz se encuentra TRAPPIST-1, una estrella apenas más grande que Júpiter, rodeada por siete planetas rocosos del tamaño de la Tierra; tres de ellos están en la zona templada donde podrían brillar océanos.'
  },
  {
    objectId: 'sun',
    scaleIndex: 2,
    zoomValue: 60,
    yaw: 0.9,
    pitch: 0.3,
    title: 'Parada 8: Nuestro vecindario estelar',
    narration:
      'Al alejarnos, el Sol se convierte en una estrella más entre muchas: Sirio, Proción, Vega, Altair y docenas de vecinas en sus posiciones reales en el espacio, con la banda de la Vía Láctea brillando detrás.'
  },
  {
    objectId: 'sagittariusA',
    scaleIndex: 3,
    zoomValue: 84,
    faceOnGalaxy: true,
    title: 'Parada 9: La Galaxia Vía Láctea',
    narration:
      '¡Nos alejamos hasta 100,000 años luz! Todas las estrellas que acabamos de visitar viven en un pequeño rincón del Brazo de Orión en la Vía Láctea: una espiral barrada de más de 200 mil millones de estrellas con el agujero negro supermasivo Sagitario A* en su corazón.'
  },
  {
    objectId: 'andromeda',
    scaleIndex: 4,
    zoomValue: 90.5,
    yaw: 0.6,
    pitch: 0.5,
    title: 'Parada 10: Andrómeda y el Grupo Local',
    narration:
      'A dos millones y medio de años luz flota la Galaxia de Andrómeda, nuestra vecina gigante con un billón de estrellas. Junto con la Vía Láctea, la Galaxia del Triángulo y docenas de galaxias enanas, forma nuestro Grupo Local.'
  },
  {
    objectId: 'laniakea',
    scaleIndex: 4,
    zoomValue: 96.5,
    yaw: 1.0,
    pitch: 0.4,
    title: 'Parada 11: La Red Cósmica',
    narration:
      '¡Finalmente, miles de millones de años luz! Las galaxias se agrupan en cúmulos, los cúmulos en supercúmulos como Laniakea, y los supercúmulos en los filamentos brillantes de la red cósmica que rodean enormes vacíos. ¡Acabas de viajar por todo el universo observable!'
  }
];

export const SPACE_QUIZ_QUESTIONS_ES = [
  {
    question: '¿Qué nave espacial construida por humanos es la más lejana a la Tierra en este momento?',
    options: [
      'Estación Espacial Internacional',
      'Voyager 1',
      'Apolo 11',
      'Telescopio Espacial Hubble'
    ],
    correctIndex: 1,
    explanation:
      '¡Correcto! Voyager 1 despegó en 1977 y ahora está a más de 25 mil millones de kilómetros (~170 UA) en el espacio interestelar.'
  },
  {
    question: '¿Cuál es el sistema estelar más cercano a nuestro Sol y tiene algún exoplaneta?',
    options: [
      'Sirio (Sin planetas)',
      'Alfa Centauri / Próxima Centauri (¡Sí, Próxima b!)',
      'Betelgeuse (10 planetas)',
      'Polaris, la Estrella Polar'
    ],
    correctIndex: 1,
    explanation:
      '¡Exacto! Alfa Centauri está a solo 4.24 años luz, y su enana roja Próxima Centauri alberga al exoplaneta rocoso Próxima b en su zona habitable.'
  },
  {
    question: '¿Qué tesoro especial llevan Voyager 1 y Voyager 2 por si alguna civilización extraterrestre las encuentra?',
    options: [
      'Un mapa de un tesoro pirata',
      'El Disco de Oro con sonidos de la Tierra, música y saludos en 55 idiomas',
      'Una caja de galletas con chispas de chocolate',
      'Un trofeo de la NASA'
    ],
    correctIndex: 1,
    explanation:
      '¡Sí! Ambas sondas Voyager llevan el Disco de Oro de cobre bañado en oro ideado por Carl Sagan.'
  },
  {
    question: '¿Cuántos exoplanetas rocosos del tamaño de la Tierra orbitan la estrella cercana TRAPPIST-1?',
    options: ['Solo 1 planeta', '3 planetas', '¡7 planetas rocosos del tamaño de la Tierra!', '100 planetas'],
    correctIndex: 2,
    explanation:
      '¡Increíble! TRAPPIST-1 tiene 7 mundos rocosos del tamaño de la Tierra (b, c, d, e, f, g, h), con 3 dentro de la zona habitable.'
  },
  {
    question: '¿Cómo se llama la galaxia espiral gigante vecina a nuestra Vía Láctea (a 2.5 millones de años luz)?',
    options: [
      'La Galaxia de Andrómeda (M31)',
      'La Galaxia del Sombrero',
      'La Galaxia del Remolino',
      'Alfa Centauri'
    ],
    correctIndex: 0,
    explanation:
      '¡Acertaste! La Galaxia de Andrómeda tiene alrededor de un billón de estrellas y es el objeto más lejano visible a simple vista en una noche oscura.'
  }
];
