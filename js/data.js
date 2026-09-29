/* =====================================================================
   CONTEÚDO DO SITE
   ---------------------------------------------------------------------
   ⚠ TODO O CONTEÚDO ABAIXO É FICTÍCIO / PLACEHOLDER.
   Substitua pelos dados reais do escritório antes de publicar.

   Fotos da equipe: coloque os arquivos em assets/img/equipe/ e preencha
   o campo `foto` (ex.: "assets/img/equipe/caetano.jpg"). Proporção
   recomendada 3:4 (ex.: 900x1200). Sem foto, o card mostra as iniciais.

   REGRAS DA OAB PARA OS TEXTOS (CED arts. 39–47 e Provimento 205/2021)
   - Currículos: use apenas títulos acadêmicos, distinções honoríficas,
     instituições jurídicas de que o advogado faça parte, áreas a que se
     dedica, idiomas e docência universitária (CED art. 44, §1º).
     Não cite empregos, cargos ou funções, atuais ou passados, em órgãos
     ou instituições, salvo professor universitário (CED art. 44, §2º).
   - Só use "especialista"/"especialização" com título certificado
     (Prov. 205, art. 3º, III).
   - Nada de expressões persuasivas, de autoengrandecimento ou comparação,
     promessa de resultados, casos concretos, números de vitórias,
     lista de clientes, valores ou gratuidade de honorários
     (Prov. 205, arts. 3º e 6º; CED art. 42, IV).
   ===================================================================== */

const AREAS = [
  {
    id: "constitucional",
    titulo: "Direito Constitucional",
    resumo: "Atuação em ações de controle de constitucionalidade, mandados de segurança e demandas perante os tribunais superiores.",
  },
  {
    id: "administrativo",
    titulo: "Direito Administrativo",
    resumo: "Licitações, contratos públicos, processos administrativos sancionadores e relações com o Poder Público.",
  },
  {
    id: "tributario",
    titulo: "Direito Tributário",
    resumo: "Planejamento tributário, contencioso administrativo e judicial e recuperação de créditos.",
  },
  {
    id: "civil",
    titulo: "Cível e Empresarial",
    resumo: "Contratos, responsabilidade civil, societário, recuperação de crédito e resolução de disputas empresariais.",
  },
  {
    id: "eleitoral",
    titulo: "Direito Eleitoral",
    resumo: "Consultoria a candidatos e partidos, prestação de contas e contencioso eleitoral em todas as instâncias.",
  },
  {
    id: "digital",
    titulo: "Direito Digital & LGPD",
    resumo: "Adequação à LGPD, proteção de dados, crimes cibernéticos e contratos de tecnologia.",
  },
  {
    id: "agronegocio",
    titulo: "Agronegócio",
    resumo: "Contratos agrários, questões fundiárias, crédito rural e regularização ambiental.",
  },
  {
    id: "consultoria",
    titulo: "Consultoria Estratégica",
    resumo: "Pareceres, análise de risco regulatório e assessoria preventiva para decisões de alto impacto.",
  },
];

const EQUIPE = [
  {
    nome: "Caetano Veríssimo",
    cargo: "Sócio-fundador",
    oab: "OAB/UF 00.000",
    foto: "",
    areas: ["constitucional", "administrativo", "consultoria"],
    email: "caetano@caetanoverissimo.adv.br",
    linkedin: "#",
    resumo: "Dedica-se ao Direito Constitucional e ao Direito Público, com atuação perante os tribunais superiores.",
    trajetoria: [
      { ano: "2024", titulo: "Membro da Comissão de Estudos Constitucionais", local: "OAB/UF" },
      { ano: "2021", titulo: "Publica “Controle de constitucionalidade e segurança jurídica”", local: "Editora Exemplo" },
      { ano: "2020", titulo: "Doutor em Direito do Estado", local: "Universidade Exemplo" },
      { ano: "2016", titulo: "Professor de Direito Constitucional", local: "Universidade Exemplo" },
      { ano: "2015", titulo: "Funda o escritório Caetano Veríssimo", local: "Cidade/UF" },
    ],
    formacao: [
      { grau: "Doutorado em Direito do Estado", instituicao: "Universidade Exemplo", ano: "2020" },
      { grau: "Mestrado em Direito Constitucional", instituicao: "Universidade Exemplo", ano: "2014" },
      { grau: "Bacharelado em Direito", instituicao: "Universidade Exemplo", ano: "2008" },
    ],
    atuacao: [
      "Direito Constitucional e controle de constitucionalidade",
      "Pareceres em matéria constitucional e regulatória",
      "Professor de pós-graduação em Direito Público — Universidade Exemplo",
      "Membro do Instituto Brasileiro de Direito Constitucional",
    ],
    publicacoes: [
      "Controle de constitucionalidade e segurança jurídica (Editora Exemplo, 2021)",
      "Artigos em revistas especializadas de Direito Público",
    ],
    idiomas: ["Português", "Inglês", "Espanhol"],
  },
  {
    nome: "Helena Duarte",
    cargo: "Sócia",
    oab: "OAB/UF 00.001",
    foto: "",
    areas: ["tributario", "civil"],
    email: "helena@caetanoverissimo.adv.br",
    linkedin: "#",
    resumo: "Dedica-se ao Direito Tributário e ao Direito Empresarial, nas esferas consultiva e contenciosa.",
    trajetoria: [
      { ano: "2019", titulo: "Torna-se sócia do escritório", local: "Caetano Veríssimo" },
      { ano: "2017", titulo: "Mestre em Direito Tributário", local: "Universidade Exemplo" },
      { ano: "2013", titulo: "Especialista em Direito Empresarial", local: "Instituto Exemplo" },
    ],
    formacao: [
      { grau: "Mestrado em Direito Tributário", instituicao: "Universidade Exemplo", ano: "2017" },
      { grau: "Especialização em Direito Empresarial", instituicao: "Instituto Exemplo", ano: "2013" },
      { grau: "Bacharelado em Direito", instituicao: "Universidade Exemplo", ano: "2010" },
    ],
    atuacao: [
      "Contencioso tributário administrativo e judicial",
      "Planejamento tributário",
      "Membro do Instituto de Estudos Tributários (exemplo)",
    ],
    publicacoes: ["Artigos sobre reforma tributária em periódicos jurídicos"],
    idiomas: ["Português", "Inglês"],
  },
  {
    nome: "Rafael Moreira",
    cargo: "Advogado associado",
    oab: "OAB/UF 00.002",
    foto: "",
    areas: ["eleitoral", "administrativo"],
    email: "rafael@caetanoverissimo.adv.br",
    linkedin: "#",
    resumo: "Dedica-se ao Direito Eleitoral e ao Direito Administrativo, no consultivo e no contencioso.",
    trajetoria: [
      { ano: "2020", titulo: "Integra a equipe do escritório", local: "Caetano Veríssimo" },
      { ano: "2019", titulo: "Especialista em Direito Eleitoral", local: "Instituto Exemplo" },
      { ano: "2016", titulo: "Bacharel em Direito", local: "Universidade Exemplo" },
    ],
    formacao: [
      { grau: "Especialização em Direito Eleitoral", instituicao: "Instituto Exemplo", ano: "2019" },
      { grau: "Bacharelado em Direito", instituicao: "Universidade Exemplo", ano: "2016" },
    ],
    atuacao: [
      "Contencioso eleitoral",
      "Consultoria em prestação de contas de campanha",
      "Processos administrativos disciplinares",
    ],
    publicacoes: [],
    idiomas: ["Português", "Inglês"],
  },
  {
    nome: "Marina Albuquerque",
    cargo: "Advogada associada",
    oab: "OAB/UF 00.003",
    foto: "",
    areas: ["digital", "agronegocio", "civil"],
    email: "marina@caetanoverissimo.adv.br",
    linkedin: "#",
    resumo: "Dedica-se à proteção de dados, aos contratos de tecnologia e às questões do agronegócio.",
    trajetoria: [
      { ano: "2023", titulo: "Publica guia prático de LGPD", local: "E-book" },
      { ano: "2022", titulo: "Integra a equipe do escritório", local: "Caetano Veríssimo" },
      { ano: "2021", titulo: "LL.M. em Direito e Tecnologia", local: "Universidade Exemplo" },
    ],
    formacao: [
      { grau: "LL.M. em Direito e Tecnologia", instituicao: "Universidade Exemplo", ano: "2021" },
      { grau: "Bacharelado em Direito", instituicao: "Universidade Exemplo", ano: "2019" },
    ],
    atuacao: [
      "Programas de adequação à LGPD",
      "Contratos agrários e crédito rural",
      "Certificação CIPP/E (exemplo)",
    ],
    publicacoes: ["Guia prático de LGPD para pequenas empresas (e-book, 2023)"],
    idiomas: ["Português", "Inglês", "Francês"],
  },
];

const ARTIGOS = [
  {
    categoria: "Artigo",
    data: "2026-09-12",
    titulo: "O STF e os limites da modulação de efeitos em matéria tributária",
    resumo: "Uma análise dos critérios adotados pela Corte e seus impactos para contribuintes e para a segurança jurídica.",
    link: "#",
  },
  {
    categoria: "Notícia",
    data: "2026-08-28",
    titulo: "Escritório participa de audiência pública sobre proteção de dados",
    resumo: "A equipe apresentou contribuições técnicas sobre a regulamentação de incidentes de segurança.",
    link: "#",
  },
  {
    categoria: "Artigo",
    data: "2026-08-03",
    titulo: "Contratos públicos: o que muda com a nova jurisprudência do TCU",
    resumo: "Pontos de atenção para empresas que contratam com a Administração Pública.",
    link: "#",
  },
];
