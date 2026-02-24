import { useState, useEffect, useRef } from "react";

// ─── TRANSLATIONS ───────────────────────────────────────────────────────────
const T = {
  en: {
    langSelect: "Choose Your Language",
    langSub: "Select to begin your foundation journey",
    welcome: "Foundation Design Lab",
    welcomeSub: "A research-driven self-discovery platform for design students entering higher education",
    begin: "Begin Your Journey",
    researchNote: "Your responses contribute to global design education research",
    stepProfile: "Your Profile",
    stepJourney: "Learning Journey",
    stepAssess: "Self-Assessment",
    stepInsights: "Your Insights",
    nameLabel: "Your Full Name",
    namePlaceholder: "Enter your name",
    trackLabel: "Your Selected Design Track",
    tracks: {
      product: "Product Design",
      fashion: "Fashion Design",
      communication: "Communication Design",
      film: "Film & Motion",
      gaming: "Game Design",
      business: "Business & Design Management",
    },
    institutionLabel: "Your Institution (optional)",
    institutionPlaceholder: "University / College name",
    countryLabel: "Country",
    continue: "Continue",
    back: "Back",
    journeyTitle: "Your Foundation Learning Map",
    journeySub: "Explore the disciplines that form the backbone of your creative education",
    disciplines: {
      drawing: { title: "Drawing & Visual Thinking", desc: "The hand as an instrument of the mind — observation, ideation, mark-making" },
      color: { title: "Colour Theory & Perception", desc: "Hue, value, saturation — how colour communicates meaning across cultures" },
      form: { title: "Form, Space & Materiality", desc: "3D thinking, material properties, volume and spatial relationships" },
      typography: { title: "Typography & Communication", desc: "The architecture of text — letterforms as designed objects and systems" },
      research: { title: "Design Research Methods", desc: "Ethnography, observation, synthesis — turning insight into design strategy" },
      history: { title: "Design History & Criticism", desc: "From Bauhaus to Now — context, movements, critical perspectives" },
      digital: { title: "Digital Tools & Fabrication", desc: "Software, prototyping, rapid iteration between physical and digital" },
      business_found: { title: "Business & Design Strategy", desc: "Value creation, brand thinking, design as a driver of enterprise" },
    },
    rateYourself: "How familiar are you with this area entering foundation?",
    levels: ["Never explored", "Heard of it", "Some exposure", "Comfortable", "Confident"],
    assessTitle: "Self-Discovery Assessment",
    assessSub: "There are no right answers — this maps your learning mindset",
    questions: [
      { id: "q1", q: "When you see an object for the first time, you are most drawn to...", options: ["Its form and silhouette", "The materials and textures", "How it communicates a message", "How it was made or could be improved", "Its cultural or historical context"] },
      { id: "q2", q: "Your strongest instinct in a design brief is to...", options: ["Sketch ideas immediately", "Research and gather references first", "Talk to people who will use it", "Identify the business or strategic need", "Challenge the brief itself"] },
      { id: "q3", q: "Which environment makes you most creative?", options: ["A well-lit studio with physical materials", "A digital workspace with multiple screens", "Outdoors, observing real environments", "A library or archive surrounded by references", "Collaborative chaotic spaces with others"] },
      { id: "q4", q: "Which word best describes your relationship with failure?", options: ["It paralyses me briefly but I recover", "It motivates me to iterate faster", "I reframe it as unexpected data", "I avoid it by planning thoroughly", "It rarely bothers me — I embrace ambiguity"] },
      { id: "q5", q: "In a group design project you naturally become...", options: ["The visual maker — drawing and rendering", "The researcher — building knowledge base", "The connector — bridging people and ideas", "The critic — questioning assumptions", "The organiser — keeping process on track"] },
      { id: "q6", q: "Which foundation discipline feels most unfamiliar to you?", options: ["Drawing and mark-making", "Colour and composition", "3D form and materiality", "Typography and layout", "Business thinking and strategy"] },
      { id: "q7", q: "Your approach to learning a new design skill is...", options: ["Copy masters first, then diverge", "Experiment randomly and discover", "Find the underlying system or logic", "Watch others and absorb by observation", "Apply it immediately to a real problem"] },
      { id: "q8", q: "If your design practice were a material it would be...", options: ["Clay — intuitive and tactile", "Code — structured and systematic", "Fabric — sensitive to context and body", "Glass — refined, fragile, precise", "Steel — bold, industrial, enduring"] },
    ],
    submitAssessment: "See My Insights",
    insightsTitle: "Your Design Foundation Profile",
    insightsSub: "Based on your responses — a starting portrait of your creative identity",
    archetypes: {
      maker: { title: "The Intuitive Maker", desc: "You think through your hands. Tactile, sensory, immediate — foundation will unlock your physical intelligence into structured creative power." },
      researcher: { title: "The Analytical Researcher", desc: "You build knowledge before you build form. Foundation will sharpen your ability to translate deep insight into visual and material language." },
      systems: { title: "The Systems Thinker", desc: "You see patterns, structures and underlying logic. Foundation will give you the vocabulary to communicate complex thinking with clarity and beauty." },
      storyteller: { title: "The Visual Storyteller", desc: "You lead with meaning and narrative. Foundation will expand your toolkit from concept to craft — giving your stories powerful form." },
      strategist: { title: "The Design Strategist", desc: "You connect design to impact and value. Foundation will give you the visual and material fluency to partner creativity with clear intent." },
    },
    strengthAreas: "Emerging Strengths",
    growthAreas: "Growth Territories",
    researchThankYou: "Thank you for contributing to global design education research",
    researchNote2: "Your anonymised responses help us understand foundation learning worldwide.",
    downloadProfile: "Download Profile",
    startOver: "Start New Journey",
    globalStudy: "Global Design Education Study 2025",
  },
  hi: {
    langSelect: "अपनी भाषा चुनें",
    langSub: "अपनी फाउंडेशन यात्रा शुरू करने के लिए चुनें",
    welcome: "फाउंडेशन डिज़ाइन लैब",
    welcomeSub: "उच्च शिक्षा में प्रवेश करने वाले डिज़ाइन छात्रों के लिए एक शोध-आधारित आत्म-खोज मंच",
    begin: "अपनी यात्रा शुरू करें",
    researchNote: "आपके उत्तर वैश्विक डिज़ाइन शिक्षा अनुसंधान में योगदान देते हैं",
    stepProfile: "आपका प्रोफ़ाइल",
    stepJourney: "सीखने की यात्रा",
    stepAssess: "स्व-मूल्यांकन",
    stepInsights: "आपकी अंतर्दृष्टि",
    nameLabel: "आपका पूरा नाम",
    namePlaceholder: "अपना नाम दर्ज करें",
    trackLabel: "आपका चुना हुआ डिज़ाइन ट्रैक",
    tracks: {
      product: "प्रोडक्ट डिज़ाइन",
      fashion: "फ़ैशन डिज़ाइन",
      communication: "कम्युनिकेशन डिज़ाइन",
      film: "फ़िल्म और मोशन",
      gaming: "गेम डिज़ाइन",
      business: "बिज़नेस और डिज़ाइन मैनेजमेंट",
    },
    institutionLabel: "आपका संस्थान (वैकल्पिक)",
    institutionPlaceholder: "विश्वविद्यालय / कॉलेज का नाम",
    countryLabel: "देश",
    continue: "जारी रखें",
    back: "वापस",
    journeyTitle: "आपका फाउंडेशन लर्निंग मैप",
    journeySub: "उन विषयों का अन्वेषण करें जो आपकी रचनात्मक शिक्षा की रीढ़ बनाते हैं",
    disciplines: {
      drawing: { title: "ड्राइंग और विज़ुअल थिंकिंग", desc: "मन का साधन — अवलोकन, विचार, और रेखा-चित्रण" },
      color: { title: "रंग सिद्धांत और धारणा", desc: "रंग — कैसे रंग संस्कृतियों में अर्थ संचारित करता है" },
      form: { title: "रूप, स्थान और सामग्री", desc: "3D सोच, सामग्री गुण, और स्थानिक संबंध" },
      typography: { title: "टाइपोग्राफी और संचार", desc: "पाठ की वास्तुकला — अक्षर एक डिज़ाइन प्रणाली के रूप में" },
      research: { title: "डिज़ाइन अनुसंधान विधियाँ", desc: "अवलोकन और संश्लेषण — अंतर्दृष्टि को रणनीति में बदलना" },
      history: { title: "डिज़ाइन इतिहास और आलोचना", desc: "बौहॉस से अब तक — संदर्भ, आंदोलन, दृष्टिकोण" },
      digital: { title: "डिजिटल टूल्स और फेब्रिकेशन", desc: "सॉफ़्टवेयर, प्रोटोटाइपिंग, भौतिक और डिजिटल के बीच पुनरावृत्ति" },
      business_found: { title: "बिज़नेस और डिज़ाइन रणनीति", desc: "मूल्य निर्माण, ब्रांड सोच, उद्यम के चालक के रूप में डिज़ाइन" },
    },
    rateYourself: "फाउंडेशन में प्रवेश करते समय इस क्षेत्र से आप कितने परिचित हैं?",
    levels: ["कभी नहीं देखा", "सुना है", "कुछ परिचय", "सहज", "आत्मविश्वासी"],
    assessTitle: "आत्म-खोज मूल्यांकन",
    assessSub: "कोई सही उत्तर नहीं है — यह आपकी सीखने की मानसिकता का मानचित्र बनाता है",
    questions: [
      { id: "q1", q: "जब आप किसी वस्तु को पहली बार देखते हैं, तो आप सबसे अधिक किसकी ओर आकर्षित होते हैं?", options: ["इसका रूप और सिल्हूट", "सामग्री और बनावट", "यह संदेश कैसे संचारित करती है", "इसे कैसे बनाया गया या सुधारा जा सकता है", "इसका सांस्कृतिक या ऐतिहासिक संदर्भ"] },
      { id: "q2", q: "डिज़ाइन ब्रीफ में आपकी सबसे मजबूत प्रवृत्ति क्या है?", options: ["तुरंत स्केच करना", "पहले शोध करना", "उपयोगकर्ताओं से बात करना", "व्यावसायिक आवश्यकता की पहचान करना", "ब्रीफ को ही चुनौती देना"] },
      { id: "q3", q: "कौन सा वातावरण आपको सबसे रचनात्मक बनाता है?", options: ["भौतिक सामग्री के साथ स्टूडियो", "कई स्क्रीन के साथ डिजिटल कार्यक्षेत्र", "बाहर, वास्तविक वातावरण का अवलोकन", "संदर्भों से भरी लाइब्रेरी", "दूसरों के साथ सहयोगी स्थान"] },
      { id: "q4", q: "असफलता के साथ आपका संबंध कैसा है?", options: ["यह मुझे थोड़ा रोकती है पर मैं ठीक हो जाता हूं", "यह मुझे तेज़ी से आगे बढ़ने के लिए प्रेरित करती है", "मैं इसे अप्रत्याशित डेटा मानता हूं", "मैं इसे योजना से टालता हूं", "यह मुझे शायद ही परेशान करती है"] },
      { id: "q5", q: "समूह डिज़ाइन प्रोजेक्ट में आप स्वाभाविक रूप से क्या बनते हैं?", options: ["दृश्य निर्माता", "शोधकर्ता", "संयोजक", "आलोचक", "आयोजक"] },
      { id: "q6", q: "कौन सा फाउंडेशन अनुशासन आपको सबसे अपरिचित लगता है?", options: ["ड्राइंग और मार्क-मेकिंग", "रंग और संरचना", "3D रूप और सामग्री", "टाइपोग्राफी और लेआउट", "व्यावसायिक सोच और रणनीति"] },
      { id: "q7", q: "एक नया डिज़ाइन कौशल सीखने का आपका तरीका क्या है?", options: ["पहले उस्तादों की नकल करें", "यादृच्छिक रूप से प्रयोग करें", "अंतर्निहित प्रणाली खोजें", "दूसरों को देखकर अवशोषित करें", "इसे तुरंत किसी असली समस्या पर लागू करें"] },
      { id: "q8", q: "अगर आपका डिज़ाइन अभ्यास एक सामग्री होती तो वह होती...", options: ["मिट्टी — सहज और स्पर्शीय", "कोड — संरचित और व्यवस्थित", "कपड़ा — संदर्भ और शरीर के प्रति संवेदनशील", "काँच — परिष्कृत, नाजुक, सटीक", "इस्पात — साहसी, औद्योगिक, स्थायी"] },
    ],
    submitAssessment: "मेरी अंतर्दृष्टि देखें",
    insightsTitle: "आपका डिज़ाइन फाउंडेशन प्रोफाइल",
    insightsSub: "आपके उत्तरों के आधार पर — आपकी रचनात्मक पहचान का एक प्रारंभिक चित्र",
    archetypes: {
      maker: { title: "सहज निर्माता", desc: "आप अपने हाथों से सोचते हैं। फाउंडेशन आपकी भौतिक बुद्धिमत्ता को संरचित रचनात्मक शक्ति में परिवर्तित करेगी।" },
      researcher: { title: "विश्लेषणात्मक शोधकर्ता", desc: "आप रूप बनाने से पहले ज्ञान बनाते हैं। फाउंडेशन आपको गहरी अंतर्दृष्टि को दृश्य भाषा में अनुवाद करने में मदद करेगी।" },
      systems: { title: "सिस्टम थिंकर", desc: "आप पैटर्न और संरचनाएं देखते हैं। फाउंडेशन आपको जटिल सोच को स्पष्टता और सौंदर्य के साथ संप्रेषित करने की शब्दावली देगी।" },
      storyteller: { title: "दृश्य कथाकार", desc: "आप अर्थ और कथा से नेतृत्व करते हैं। फाउंडेशन आपकी कहानियों को शक्तिशाली रूप देगी।" },
      strategist: { title: "डिज़ाइन रणनीतिकार", desc: "आप डिज़ाइन को प्रभाव और मूल्य से जोड़ते हैं। फाउंडेशन आपको रचनात्मकता के साथ स्पष्ट इरादे जोड़ने की क्षमता देगी।" },
    },
    strengthAreas: "उभरती शक्तियाँ",
    growthAreas: "विकास के क्षेत्र",
    researchThankYou: "वैश्विक डिज़ाइन शिक्षा अनुसंधान में योगदान के लिए धन्यवाद",
    researchNote2: "आपके गुमनाम उत्तर दुनिया भर में फाउंडेशन शिक्षा को समझने में मदद करते हैं।",
    downloadProfile: "प्रोफाइल डाउनलोड करें",
    startOver: "नई यात्रा शुरू करें",
    globalStudy: "वैश्विक डिज़ाइन शिक्षा अध्ययन 2025",
  },
  pt: {
    langSelect: "Escolha o seu Idioma",
    langSub: "Selecione para iniciar a sua jornada de fundamentos",
    welcome: "Foundation Design Lab",
    welcomeSub: "Uma plataforma de autodescoberta orientada pela pesquisa para estudantes de design a ingressar no ensino superior",
    begin: "Iniciar a Jornada",
    researchNote: "As suas respostas contribuem para a pesquisa global em educação de design",
    stepProfile: "O seu Perfil",
    stepJourney: "Jornada de Aprendizagem",
    stepAssess: "Autoavaliação",
    stepInsights: "Os seus Insights",
    nameLabel: "Nome Completo",
    namePlaceholder: "Introduza o seu nome",
    trackLabel: "Área de Design Selecionada",
    tracks: {
      product: "Design de Produto",
      fashion: "Design de Moda",
      communication: "Design de Comunicação",
      film: "Cinema e Motion",
      gaming: "Design de Jogos",
      business: "Gestão de Negócios e Design",
    },
    institutionLabel: "Instituição (opcional)",
    institutionPlaceholder: "Nome da Universidade / Faculdade",
    countryLabel: "País",
    continue: "Continuar",
    back: "Voltar",
    journeyTitle: "O seu Mapa de Aprendizagem Fundacional",
    journeySub: "Explore as disciplinas que formam a espinha dorsal da sua educação criativa",
    disciplines: {
      drawing: { title: "Desenho e Pensamento Visual", desc: "A mão como instrumento da mente — observação, ideação, traçado" },
      color: { title: "Teoria e Perceção da Cor", desc: "Matiz, valor, saturação — como a cor comunica significado entre culturas" },
      form: { title: "Forma, Espaço e Materialidade", desc: "Pensamento 3D, propriedades dos materiais, volume e relações espaciais" },
      typography: { title: "Tipografia e Comunicação", desc: "A arquitetura do texto — formas de letras como objetos e sistemas de design" },
      research: { title: "Métodos de Pesquisa em Design", desc: "Etnografia, observação, síntese — transformar insight em estratégia de design" },
      history: { title: "História e Crítica do Design", desc: "Da Bauhaus ao presente — contexto, movimentos, perspetivas críticas" },
      digital: { title: "Ferramentas Digitais e Fabricação", desc: "Software, prototipagem, iteração rápida entre o físico e o digital" },
      business_found: { title: "Estratégia de Negócios e Design", desc: "Criação de valor, branding, design como motor da empresa" },
    },
    rateYourself: "Qual a sua familiaridade com esta área ao entrar nos fundamentos?",
    levels: ["Nunca explorei", "Já ouvi falar", "Alguma exposição", "Confortável", "Confiante"],
    assessTitle: "Avaliação de Autodescoberta",
    assessSub: "Não há respostas certas — isto mapeia a sua mentalidade de aprendizagem",
    questions: [
      { id: "q1", q: "Quando vê um objeto pela primeira vez, o que mais o atrai?", options: ["A sua forma e silhueta", "Os materiais e texturas", "Como comunica uma mensagem", "Como foi feito ou poderia ser melhorado", "O seu contexto cultural ou histórico"] },
      { id: "q2", q: "O seu instinto mais forte num briefing de design é...", options: ["Fazer esboços imediatamente", "Pesquisar e reunir referências primeiro", "Falar com as pessoas que vão utilizá-lo", "Identificar a necessidade estratégica ou de negócio", "Questionar o próprio briefing"] },
      { id: "q3", q: "Que ambiente o torna mais criativo?", options: ["Um estúdio com materiais físicos", "Um espaço digital com múltiplos ecrãs", "Ao ar livre, observando ambientes reais", "Uma biblioteca rodeado de referências", "Espaços colaborativos e caóticos com outros"] },
      { id: "q4", q: "Qual a sua relação com o fracasso?", options: ["Paralisa-me brevemente mas recupero", "Motiva-me a iterar mais rapidamente", "Reencadro-o como dados inesperados", "Evito-o através de um planeamento cuidadoso", "Raramente me perturba — abraço a ambiguidade"] },
      { id: "q5", q: "Num projeto de design em grupo torna-se naturalmente...", options: ["O criador visual", "O investigador", "O conector de ideias e pessoas", "O crítico — questionando pressupostos", "O organizador do processo"] },
      { id: "q6", q: "Qual a disciplina fundacional que lhe parece menos familiar?", options: ["Desenho e marcação", "Cor e composição", "Forma 3D e materialidade", "Tipografia e layout", "Pensamento de negócios e estratégia"] },
      { id: "q7", q: "A sua abordagem para aprender uma nova competência de design é...", options: ["Copiar mestres primeiro, depois divergir", "Experimentar aleatoriamente e descobrir", "Encontrar o sistema ou a lógica subjacente", "Observar outros e absorver pela observação", "Aplicá-la imediatamente a um problema real"] },
      { id: "q8", q: "Se a sua prática de design fosse um material seria...", options: ["Argila — intuitiva e tátil", "Código — estruturado e sistemático", "Tecido — sensível ao contexto e ao corpo", "Vidro — refinado, frágil, preciso", "Aço — ousado, industrial, duradouro"] },
    ],
    submitAssessment: "Ver os meus Insights",
    insightsTitle: "O seu Perfil de Design Fundacional",
    insightsSub: "Com base nas suas respostas — um retrato inicial da sua identidade criativa",
    archetypes: {
      maker: { title: "O Criador Intuitivo", desc: "Pensa com as mãos. Tátil, sensorial, imediato — os fundamentos transformarão a sua inteligência física em poder criativo estruturado." },
      researcher: { title: "O Investigador Analítico", desc: "Constrói conhecimento antes de construir forma. Os fundamentos vão aperfeiçoar a sua capacidade de traduzir insights profundos em linguagem visual." },
      systems: { title: "O Pensador Sistémico", desc: "Vê padrões e estruturas. Os fundamentos darão vocabulário para comunicar pensamento complexo com clareza e beleza." },
      storyteller: { title: "O Contador de Histórias Visual", desc: "Lidera com significado e narrativa. Os fundamentos expandirão o seu repertório do conceito ao ofício." },
      strategist: { title: "O Estrategista de Design", desc: "Liga o design ao impacto e ao valor. Os fundamentos darão a fluência visual e material para unir criatividade a intenção clara." },
    },
    strengthAreas: "Pontos Fortes Emergentes",
    growthAreas: "Territórios de Crescimento",
    researchThankYou: "Obrigado por contribuir para a pesquisa global em educação de design",
    researchNote2: "As suas respostas anonimizadas ajudam-nos a compreender a aprendizagem fundacional em todo o mundo.",
    downloadProfile: "Descarregar Perfil",
    startOver: "Iniciar Nova Jornada",
    globalStudy: "Estudo Global de Educação em Design 2025",
  },
};

// ─── ARCHETYPE LOGIC ──────────────────────────────────────────────────────────
function computeArchetype(answers) {
  const map = {
    q1: ["maker","maker","storyteller","researcher","researcher"],
    q2: ["maker","researcher","storyteller","strategist","systems"],
    q3: ["maker","systems","storyteller","researcher","storyteller"],
    q4: ["storyteller","maker","systems","strategist","researcher"],
    q5: ["maker","researcher","storyteller","systems","strategist"],
    q6: ["maker","systems","maker","storyteller","strategist"],
    q7: ["researcher","maker","systems","storyteller","strategist"],
    q8: ["maker","systems","storyteller","systems","strategist"],
  };
  const scores = { maker:0, researcher:0, systems:0, storyteller:0, strategist:0 };
  Object.entries(answers).forEach(([q, idx]) => {
    if (map[q] && map[q][idx]) scores[map[q][idx]]++;
  });
  return Object.entries(scores).sort((a,b) => b[1]-a[1])[0][0];
}

function computeStrengths(discRatings) {
  return Object.entries(discRatings).filter(([,v]) => v >= 3).map(([k]) => k);
}
function computeGrowth(discRatings) {
  return Object.entries(discRatings).filter(([,v]) => v <= 1).map(([k]) => k);
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function DesignFoundationPlatform() {
  const [lang, setLang] = useState(null);
  const [screen, setScreen] = useState("lang"); // lang | welcome | profile | journey | assess | insights
  const [profile, setProfile] = useState({ name:"", track:"", institution:"", country:"" });
  const [discRatings, setDiscRatings] = useState({});
  const [assessAnswers, setAssessAnswers] = useState({});
  const [archetype, setArchetype] = useState(null);
  const [tick, setTick] = useState(0);
  const canvasRef = useRef(null);

  const t = lang ? T[lang] : T.en;
  const disciplines = lang ? Object.keys(T[lang].disciplines) : [];

  // Animated background grid
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let frame = 0;
    let raf;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(232,255,0,0.04)";
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }
      // Animated diagonal line
      const progress = (frame % 300) / 300;
      const x1 = progress * canvas.width * 2 - canvas.width;
      ctx.strokeStyle = "rgba(232,255,0,0.07)";
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x1, 0); ctx.lineTo(x1 + canvas.height, canvas.height); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x1 - 80, 0); ctx.lineTo(x1 + canvas.height - 80, canvas.height); ctx.stroke();
      frame++;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  const selectLang = (l) => { setLang(l); setScreen("welcome"); };
  const goProfile = () => setScreen("profile");
  const goJourney = () => { if (profile.name && profile.track) setScreen("journey"); };
  const goAssess = () => setScreen("assess");
  const goInsights = () => {
    const a = computeArchetype(assessAnswers);
    setArchetype(a);
    setScreen("insights");
  };
  const reset = () => { setLang(null); setScreen("lang"); setProfile({name:"",track:"",institution:"",country:""}); setDiscRatings({}); setAssessAnswers({}); setArchetype(null); };

  const steps = [t.stepProfile, t.stepJourney, t.stepAssess, t.stepInsights];
  const stepIdx = { profile:0, journey:1, assess:2, insights:3 }[screen] ?? -1;

  const trackKeys = Object.keys(t.tracks || T.en.tracks);

  return (
    <div style={{ minHeight:"100vh", background:"#080808", fontFamily:"'Cormorant Garamond', serif", color:"#F0EDE8", position:"relative", overflow:"hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:4px; } ::-webkit-scrollbar-track { background:#111; } ::-webkit-scrollbar-thumb { background:#E8FF00; }
        .btn-primary { background:#E8FF00; color:#080808; border:none; padding:14px 36px; font-family:'DM Mono',monospace; font-size:13px; letter-spacing:0.15em; text-transform:uppercase; cursor:pointer; transition:all 0.2s; }
        .btn-primary:hover { background:#fff; transform:translateY(-2px); box-shadow:0 8px 32px rgba(232,255,0,0.3); }
        .btn-ghost { background:transparent; color:#E8FF00; border:1px solid rgba(232,255,0,0.4); padding:12px 28px; font-family:'DM Mono',monospace; font-size:12px; letter-spacing:0.12em; text-transform:uppercase; cursor:pointer; transition:all 0.2s; }
        .btn-ghost:hover { border-color:#E8FF00; background:rgba(232,255,0,0.07); }
        .input-field { background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); color:#F0EDE8; padding:14px 18px; font-family:'DM Mono',monospace; font-size:13px; width:100%; outline:none; transition:border 0.2s; }
        .input-field:focus { border-color:#E8FF00; }
        .input-field::placeholder { color:rgba(240,237,232,0.3); }
        .track-card { border:1px solid rgba(255,255,255,0.08); padding:18px 22px; cursor:pointer; transition:all 0.2s; position:relative; }
        .track-card:hover { border-color:rgba(232,255,0,0.5); background:rgba(232,255,0,0.04); }
        .track-card.selected { border-color:#E8FF00; background:rgba(232,255,0,0.08); }
        .disc-card { border:1px solid rgba(255,255,255,0.07); padding:20px; transition:all 0.2s; }
        .disc-card:hover { border-color:rgba(232,255,0,0.3); }
        .rating-btn { width:36px; height:36px; border:1px solid rgba(255,255,255,0.15); background:transparent; color:#F0EDE8; font-family:'DM Mono',monospace; font-size:11px; cursor:pointer; transition:all 0.15s; display:flex; align-items:center; justify-content:center; }
        .rating-btn:hover, .rating-btn.active { background:#E8FF00; color:#080808; border-color:#E8FF00; }
        .q-option { border:1px solid rgba(255,255,255,0.1); padding:14px 20px; cursor:pointer; font-family:'DM Mono',monospace; font-size:12px; letter-spacing:0.05em; transition:all 0.2s; margin-bottom:8px; display:flex; align-items:center; gap:12px; }
        .q-option:hover { border-color:rgba(232,255,0,0.4); background:rgba(232,255,0,0.03); }
        .q-option.selected { border-color:#E8FF00; background:rgba(232,255,0,0.07); }
        .tag { display:inline-block; border:1px solid rgba(232,255,0,0.4); color:#E8FF00; padding:4px 12px; font-family:'DM Mono',monospace; font-size:11px; letter-spacing:0.1em; margin:4px; }
        .fade-in { animation: fadeInUp 0.6s ease both; }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .stagger-1 { animation-delay:0.1s; } .stagger-2 { animation-delay:0.2s; } .stagger-3 { animation-delay:0.3s; } .stagger-4 { animation-delay:0.4s; } .stagger-5 { animation-delay:0.5s; }
        .progress-line { height:1px; background:rgba(255,255,255,0.1); position:relative; flex:1; }
        .progress-line::after { content:''; position:absolute; left:0; top:0; height:100%; background:#E8FF00; transition:width 0.6s ease; }
        select.input-field { appearance:none; -webkit-appearance:none; }
      `}</style>

      {/* Background canvas */}
      <canvas ref={canvasRef} style={{ position:"fixed", top:0, left:0, pointerEvents:"none", zIndex:0 }} />

      {/* Corner decoration */}
      <div style={{ position:"fixed", top:24, left:24, zIndex:10, fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:"0.2em", color:"rgba(232,255,0,0.5)", textTransform:"uppercase" }}>
        FDL — {t.globalStudy || "Global Design Education Study 2025"}
      </div>
      <div style={{ position:"fixed", top:24, right:24, zIndex:10, fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:"0.2em", color:"rgba(240,237,232,0.3)", textTransform:"uppercase" }}>
        {lang ? lang.toUpperCase() : "—"}
      </div>

      <div style={{ position:"relative", zIndex:1, minHeight:"100vh" }}>

        {/* ── LANGUAGE SELECTION ─────────────────────────────────────── */}
        {screen === "lang" && (
          <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"60px 24px" }}>
            <div className="fade-in" style={{ textAlign:"center", marginBottom:80 }}>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:"0.3em", color:"#E8FF00", textTransform:"uppercase", marginBottom:24 }}>Foundation Design Lab</div>
              <div style={{ fontSize:"clamp(52px,8vw,100px)", fontWeight:300, lineHeight:0.9, letterSpacing:"-0.02em", color:"#F0EDE8", marginBottom:20 }}>
                Select<br /><em style={{ fontStyle:"italic" }}>Language</em>
              </div>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:12, color:"rgba(240,237,232,0.4)", letterSpacing:"0.1em", marginTop:20 }}>{T.en.langSub}</div>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:16, width:"100%", maxWidth:480 }}>
              {[
                { code:"en", label:"English", sub:"Foundation Design Lab", num:"01" },
                { code:"hi", label:"हिन्दी", sub:"फाउंडेशन डिज़ाइन लैब", num:"02" },
                { code:"pt", label:"Português", sub:"Foundation Design Lab", num:"03" },
              ].map((l, i) => (
                <button key={l.code} onClick={() => selectLang(l.code)} className="fade-in" style={{ animationDelay:`${i*0.15}s`, background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.1)", padding:"28px 32px", cursor:"pointer", textAlign:"left", color:"#F0EDE8", transition:"all 0.3s", display:"flex", alignItems:"center", justifyContent:"space-between" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor="#E8FF00"; e.currentTarget.style.background="rgba(232,255,0,0.06)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"; e.currentTarget.style.background="rgba(255,255,255,0.03)"; }}>
                  <div>
                    <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"rgba(232,255,0,0.6)", letterSpacing:"0.2em", marginBottom:6 }}>{l.num}</div>
                    <div style={{ fontSize:32, fontWeight:300, letterSpacing:"-0.01em" }}>{l.label}</div>
                    <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:"rgba(240,237,232,0.35)", marginTop:4 }}>{l.sub}</div>
                  </div>
                  <div style={{ width:40, height:40, border:"1px solid rgba(232,255,0,0.3)", display:"flex", alignItems:"center", justifyContent:"center", color:"#E8FF00", fontSize:18 }}>→</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── WELCOME ──────────────────────────────────────────────────── */}
        {screen === "welcome" && (
          <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"60px 24px" }}>
            <div style={{ maxWidth:700, textAlign:"center" }}>
              <div className="fade-in" style={{ fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:"0.3em", color:"#E8FF00", textTransform:"uppercase", marginBottom:32 }}>◆ Research Platform ◆</div>
              <div className="fade-in stagger-1" style={{ fontSize:"clamp(48px,7vw,90px)", fontWeight:300, lineHeight:0.92, letterSpacing:"-0.02em", marginBottom:32 }}>
                {t.welcome.split(" ").map((w,i) => <span key={i} style={{ display:"block", fontStyle: i===1?"italic":"normal" }}>{w}</span>)}
              </div>
              <p className="fade-in stagger-2" style={{ fontFamily:"'DM Mono',monospace", fontSize:13, lineHeight:1.7, color:"rgba(240,237,232,0.55)", maxWidth:500, margin:"0 auto 48px", letterSpacing:"0.04em" }}>
                {t.welcomeSub}
              </p>
              <div className="fade-in stagger-3" style={{ display:"inline-flex", alignItems:"center", gap:8, border:"1px solid rgba(232,255,0,0.25)", padding:"10px 20px", marginBottom:40 }}>
                <div style={{ width:6, height:6, background:"#E8FF00", borderRadius:"50%", animation:"pulse 2s infinite" }} />
                <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:"0.15em", color:"rgba(232,255,0,0.7)", textTransform:"uppercase" }}>{t.researchNote}</span>
              </div>
              <div className="fade-in stagger-4" style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
                <button className="btn-primary" onClick={goProfile}>{t.begin}</button>
                <button className="btn-ghost" onClick={() => setScreen("lang")}>{t.back}</button>
              </div>
            </div>
            {/* Decorative lines */}
            <div style={{ position:"absolute", bottom:40, left:"50%", transform:"translateX(-50%)", display:"flex", gap:40, fontFamily:"'DM Mono',monospace", fontSize:10, color:"rgba(240,237,232,0.2)", letterSpacing:"0.15em", textTransform:"uppercase" }}>
              {["Product","Fashion","Communication","Film","Gaming","Business"].map(d => <span key={d}>{d}</span>)}
            </div>
          </div>
        )}

        {/* ── STEP PROGRESS BAR ────────────────────────────────────────── */}
        {stepIdx >= 0 && (
          <div style={{ position:"fixed", top:0, left:0, right:0, zIndex:20, background:"rgba(8,8,8,0.95)", borderBottom:"1px solid rgba(255,255,255,0.07)", padding:"20px 40px" }}>
            <div style={{ maxWidth:900, margin:"0 auto", display:"flex", alignItems:"center", gap:0 }}>
              {steps.map((s, i) => (
                <div key={s} style={{ display:"flex", alignItems:"center", flex: i < steps.length-1 ? "1" : "0" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
                    <div style={{ width:24, height:24, border:`1px solid ${i<=stepIdx?"#E8FF00":"rgba(255,255,255,0.2)"}`, background:i<stepIdx?"#E8FF00":"transparent", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Mono',monospace", fontSize:10, color:i<stepIdx?"#080808":i===stepIdx?"#E8FF00":"rgba(255,255,255,0.3)", transition:"all 0.4s" }}>
                      {i < stepIdx ? "✓" : i+1}
                    </div>
                    <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:i<=stepIdx?"rgba(240,237,232,0.7)":"rgba(240,237,232,0.25)", display:window.innerWidth < 500 ? "none":"inline" }}>{s}</span>
                  </div>
                  {i < steps.length-1 && (
                    <div style={{ flex:1, height:1, margin:"0 16px", background:"rgba(255,255,255,0.1)", position:"relative" }}>
                      <div style={{ position:"absolute", left:0, top:0, height:"100%", background:"#E8FF00", width: i < stepIdx ? "100%" : "0%", transition:"width 0.6s ease" }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── PROFILE ──────────────────────────────────────────────────── */}
        {screen === "profile" && (
          <div style={{ minHeight:"100vh", paddingTop:100, paddingBottom:60, padding:"100px 24px 60px" }}>
            <div style={{ maxWidth:680, margin:"0 auto" }}>
              <div className="fade-in" style={{ marginBottom:48 }}>
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:"0.2em", color:"#E8FF00", textTransform:"uppercase", marginBottom:12 }}>01 — {t.stepProfile}</div>
                <div style={{ fontSize:48, fontWeight:300, lineHeight:1, letterSpacing:"-0.02em" }}>Who are<br /><em>you?</em></div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
                <div className="fade-in stagger-1">
                  <label style={{ display:"block", fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:"0.15em", color:"rgba(240,237,232,0.5)", textTransform:"uppercase", marginBottom:8 }}>{t.nameLabel}</label>
                  <input className="input-field" placeholder={t.namePlaceholder} value={profile.name} onChange={e => setProfile({...profile, name:e.target.value})} />
                </div>
                <div className="fade-in stagger-2">
                  <label style={{ display:"block", fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:"0.15em", color:"rgba(240,237,232,0.5)", textTransform:"uppercase", marginBottom:12 }}>{t.trackLabel}</label>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(200px,1fr))", gap:10 }}>
                    {trackKeys.map(k => (
                      <button key={k} className={`track-card ${profile.track===k?"selected":""}`} onClick={() => setProfile({...profile, track:k})}>
                        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"rgba(232,255,0,0.5)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:4 }}>
                          {["product","fashion","communication","film","gaming","business"].indexOf(k)+1 < 10 ? `0${["product","fashion","communication","film","gaming","business"].indexOf(k)+1}` : `${["product","fashion","communication","film","gaming","business"].indexOf(k)+1}`}
                        </div>
                        <div style={{ fontSize:15, fontWeight:500, letterSpacing:"-0.01em" }}>{t.tracks[k]}</div>
                        {profile.track===k && <div style={{ position:"absolute", top:10, right:10, width:8, height:8, background:"#E8FF00", borderRadius:"50%" }} />}
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }} className="fade-in stagger-3">
                  <div>
                    <label style={{ display:"block", fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:"0.15em", color:"rgba(240,237,232,0.5)", textTransform:"uppercase", marginBottom:8 }}>{t.institutionLabel}</label>
                    <input className="input-field" placeholder={t.institutionPlaceholder} value={profile.institution} onChange={e => setProfile({...profile, institution:e.target.value})} />
                  </div>
                  <div>
                    <label style={{ display:"block", fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:"0.15em", color:"rgba(240,237,232,0.5)", textTransform:"uppercase", marginBottom:8 }}>{t.countryLabel}</label>
                    <input className="input-field" placeholder="e.g. India / Brazil / UK" value={profile.country} onChange={e => setProfile({...profile, country:e.target.value})} />
                  </div>
                </div>
                <div className="fade-in stagger-4" style={{ display:"flex", gap:12, marginTop:16 }}>
                  <button className="btn-primary" onClick={goJourney} style={{ opacity: (profile.name && profile.track) ? 1 : 0.4 }}>{t.continue}</button>
                  <button className="btn-ghost" onClick={() => setScreen("welcome")}>{t.back}</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── JOURNEY ──────────────────────────────────────────────────── */}
        {screen === "journey" && (
          <div style={{ minHeight:"100vh", paddingTop:90, paddingBottom:60, padding:"90px 24px 60px" }}>
            <div style={{ maxWidth:900, margin:"0 auto" }}>
              <div className="fade-in" style={{ marginBottom:48 }}>
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:"0.2em", color:"#E8FF00", textTransform:"uppercase", marginBottom:12 }}>02 — {t.stepJourney}</div>
                <div style={{ fontSize:"clamp(32px,5vw,56px)", fontWeight:300, lineHeight:1, letterSpacing:"-0.02em", marginBottom:12 }}>{t.journeyTitle}</div>
                <p style={{ fontFamily:"'DM Mono',monospace", fontSize:12, color:"rgba(240,237,232,0.4)", letterSpacing:"0.06em" }}>{t.journeySub}</p>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:16 }}>
                {Object.entries(t.disciplines).map(([key, disc], i) => (
                  <div key={key} className={`disc-card fade-in stagger-${Math.min(i+1,5)}`}>
                    <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:"0.2em", color:"rgba(232,255,0,0.5)", textTransform:"uppercase", marginBottom:8 }}>
                      {String(i+1).padStart(2,"0")}
                    </div>
                    <div style={{ fontSize:18, fontWeight:500, marginBottom:8, letterSpacing:"-0.01em" }}>{disc.title}</div>
                    <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:"rgba(240,237,232,0.4)", lineHeight:1.6, marginBottom:16 }}>{disc.desc}</div>
                    <div>
                      <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"rgba(240,237,232,0.35)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:8 }}>{t.rateYourself}</div>
                      <div style={{ display:"flex", gap:4 }}>
                        {t.levels.map((lbl, li) => (
                          <button key={li} className={`rating-btn ${discRatings[key]===li?"active":""}`} onClick={() => setDiscRatings({...discRatings, [key]:li})} title={lbl}>
                            {li+1}
                          </button>
                        ))}
                      </div>
                      {discRatings[key] !== undefined && (
                        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"#E8FF00", marginTop:6 }}>{t.levels[discRatings[key]]}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display:"flex", gap:12, marginTop:40 }} className="fade-in">
                <button className="btn-primary" onClick={goAssess}>{t.continue}</button>
                <button className="btn-ghost" onClick={() => setScreen("profile")}>{t.back}</button>
              </div>
            </div>
          </div>
        )}

        {/* ── ASSESSMENT ───────────────────────────────────────────────── */}
        {screen === "assess" && (
          <div style={{ minHeight:"100vh", paddingTop:90, paddingBottom:60, padding:"90px 24px 60px" }}>
            <div style={{ maxWidth:720, margin:"0 auto" }}>
              <div className="fade-in" style={{ marginBottom:48 }}>
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:"0.2em", color:"#E8FF00", textTransform:"uppercase", marginBottom:12 }}>03 — {t.stepAssess}</div>
                <div style={{ fontSize:"clamp(32px,5vw,54px)", fontWeight:300, lineHeight:1, letterSpacing:"-0.02em", marginBottom:12 }}>{t.assessTitle}</div>
                <p style={{ fontFamily:"'DM Mono',monospace", fontSize:12, color:"rgba(240,237,232,0.4)", letterSpacing:"0.06em" }}>{t.assessSub}</p>
              </div>
              {t.questions.map((q, qi) => (
                <div key={q.id} className={`fade-in stagger-${Math.min(qi+1,5)}`} style={{ marginBottom:40, paddingBottom:40, borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"rgba(232,255,0,0.5)", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:8 }}>Q{String(qi+1).padStart(2,"0")}</div>
                  <div style={{ fontSize:22, fontWeight:400, marginBottom:20, lineHeight:1.4, letterSpacing:"-0.01em" }}>{q.q}</div>
                  {q.options.map((opt, oi) => (
                    <button key={oi} className={`q-option ${assessAnswers[q.id]===oi?"selected":""}`} onClick={() => setAssessAnswers({...assessAnswers, [q.id]:oi})}>
                      <div style={{ width:22, height:22, border:`1px solid ${assessAnswers[q.id]===oi?"#E8FF00":"rgba(255,255,255,0.2)"}`, background:assessAnswers[q.id]===oi?"#E8FF00":"transparent", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, color:assessAnswers[q.id]===oi?"#080808":"rgba(255,255,255,0.3)" }}>
                        {assessAnswers[q.id]===oi?"✓":String.fromCharCode(65+oi)}
                      </div>
                      {opt}
                    </button>
                  ))}
                </div>
              ))}
              <div style={{ display:"flex", gap:12, marginTop:16 }}>
                <button className="btn-primary" onClick={goInsights} style={{ opacity: Object.keys(assessAnswers).length >= 6 ? 1 : 0.5 }}>{t.submitAssessment}</button>
                <button className="btn-ghost" onClick={() => setScreen("journey")}>{t.back}</button>
              </div>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"rgba(240,237,232,0.25)", marginTop:12 }}>
                {Object.keys(assessAnswers).length} / {t.questions.length} answered
              </div>
            </div>
          </div>
        )}

        {/* ── INSIGHTS ─────────────────────────────────────────────────── */}
        {screen === "insights" && archetype && (
          <div style={{ minHeight:"100vh", paddingTop:90, paddingBottom:80, padding:"90px 24px 80px" }}>
            <div style={{ maxWidth:860, margin:"0 auto" }}>
              <div className="fade-in" style={{ marginBottom:16 }}>
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:"0.2em", color:"#E8FF00", textTransform:"uppercase", marginBottom:12 }}>04 — {t.stepInsights}</div>
                <div style={{ fontSize:"clamp(14px,2vw,18px)", fontFamily:"'DM Mono',monospace", color:"rgba(240,237,232,0.4)", marginBottom:4 }}>{profile.name}</div>
                <div style={{ fontSize:"clamp(32px,5vw,58px)", fontWeight:300, lineHeight:1, letterSpacing:"-0.02em" }}>{t.insightsTitle}</div>
              </div>

              {/* Archetype card */}
              <div className="fade-in stagger-1" style={{ border:"1px solid #E8FF00", padding:"40px", marginBottom:32, position:"relative", background:"rgba(232,255,0,0.03)" }}>
                <div style={{ position:"absolute", top:-1, left:40, background:"#E8FF00", padding:"4px 16px", fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:"0.2em", textTransform:"uppercase", color:"#080808" }}>Your Archetype</div>
                <div style={{ fontSize:"clamp(28px,4vw,48px)", fontWeight:300, letterSpacing:"-0.02em", marginBottom:16, marginTop:12 }}>
                  <em>{t.archetypes[archetype].title}</em>
                </div>
                <p style={{ fontFamily:"'DM Mono',monospace", fontSize:13, color:"rgba(240,237,232,0.6)", lineHeight:1.8, maxWidth:560, letterSpacing:"0.04em" }}>
                  {t.archetypes[archetype].desc}
                </p>
                <div style={{ marginTop:20, fontFamily:"'DM Mono',monospace", fontSize:11, color:"rgba(232,255,0,0.5)", textTransform:"uppercase", letterSpacing:"0.1em" }}>
                  Track: {t.tracks[profile.track]} {profile.institution && `· ${profile.institution}`} {profile.country && `· ${profile.country}`}
                </div>
              </div>

              {/* Strength & growth */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:32 }}>
                <div className="fade-in stagger-2" style={{ border:"1px solid rgba(255,255,255,0.08)", padding:28 }}>
                  <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:"0.2em", color:"#E8FF00", textTransform:"uppercase", marginBottom:16 }}>◆ {t.strengthAreas}</div>
                  {computeStrengths(discRatings).length > 0 ? computeStrengths(discRatings).map(k => (
                    <div key={k} className="tag">{t.disciplines[k]?.title || k}</div>
                  )) : <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:"rgba(240,237,232,0.3)" }}>Rate disciplines to reveal strengths</div>}
                </div>
                <div className="fade-in stagger-3" style={{ border:"1px solid rgba(255,255,255,0.08)", padding:28 }}>
                  <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:"0.2em", color:"rgba(255,100,60,0.8)", textTransform:"uppercase", marginBottom:16 }}>◆ {t.growthAreas}</div>
                  {computeGrowth(discRatings).length > 0 ? computeGrowth(discRatings).map(k => (
                    <div key={k} style={{ display:"inline-block", border:"1px solid rgba(255,100,60,0.3)", color:"rgba(255,160,120,0.8)", padding:"4px 12px", fontFamily:"'DM Mono',monospace", fontSize:11, margin:"4px" }}>{t.disciplines[k]?.title || k}</div>
                  )) : <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:"rgba(240,237,232,0.3)" }}>Rate disciplines to reveal growth areas</div>}
                </div>
              </div>

              {/* Discipline radar visual */}
              <div className="fade-in stagger-4" style={{ border:"1px solid rgba(255,255,255,0.07)", padding:32, marginBottom:32 }}>
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:"0.2em", color:"rgba(240,237,232,0.4)", textTransform:"uppercase", marginBottom:20 }}>Foundation Readiness Map</div>
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {Object.entries(t.disciplines).map(([k, d], i) => {
                    const v = discRatings[k] !== undefined ? discRatings[k] : -1;
                    const pct = v >= 0 ? ((v+1)/5)*100 : 0;
                    return (
                      <div key={k} style={{ display:"flex", alignItems:"center", gap:12 }}>
                        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"rgba(240,237,232,0.4)", width:180, flexShrink:0, letterSpacing:"0.02em" }}>{d.title}</div>
                        <div style={{ flex:1, height:4, background:"rgba(255,255,255,0.06)", position:"relative" }}>
                          <div style={{ position:"absolute", left:0, top:0, height:"100%", width:`${pct}%`, background: pct > 60 ? "#E8FF00" : pct > 30 ? "rgba(232,255,0,0.5)" : "rgba(232,255,0,0.2)", transition:"width 1s ease", transitionDelay:`${i*0.08}s` }} />
                        </div>
                        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"rgba(232,255,0,0.6)", width:14 }}>{v>=0?v+1:"-"}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Research note */}
              <div className="fade-in stagger-5" style={{ borderTop:"1px solid rgba(255,255,255,0.07)", paddingTop:32, display:"flex", alignItems:"flex-start", gap:20, flexWrap:"wrap" }}>
                <div style={{ flex:1, minWidth:240 }}>
                  <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:"rgba(232,255,0,0.6)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:8 }}>{t.researchThankYou}</div>
                  <p style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:"rgba(240,237,232,0.3)", lineHeight:1.7, letterSpacing:"0.04em" }}>{t.researchNote2}</p>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  <button className="btn-primary">{t.downloadProfile}</button>
                  <button className="btn-ghost" onClick={reset}>{t.startOver}</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
