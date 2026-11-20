import React, { useState, useMemo } from 'react';
import {
  Search,
  Building2,
  Target,
  TrendingUp,
  Users,
  Sparkles,
  CheckCircle2,
  XCircle,
  Download,
  Copy,
  Check,
  Info,
  X,
  Briefcase,
  Layers,
  MapPin,
  DollarSign,
  Calendar,
  ExternalLink,
  MessageSquareQuote,
  Award,
  Zap,
  Filter,
  RefreshCw,
  Server
} from 'lucide-react';

// Base de contingência local caso haja bloqueio de rede/CORS
const EMPRESAS_DEMO = {
  '00000000000191': {
    cnpj: '00000000000191',
    razao_social: 'BANCO DO BRASIL SA',
    nome_fantasia: 'DIRECAO GERAL',
    descricao_situacao_cadastral: 'ATIVA',
    data_inicio_atividade: '1966-08-01',
    porte: 'DEMAIS',
    capital_social: 120000000000,
    natureza_juridica: '203-8 - Sociedade de Economia Mista',
    municipio: 'BRASILIA',
    uf: 'DF',
    cnae_fiscal: 6422100,
    cnae_fiscal_descricao: 'Bancos múltiplos, com carteira comercial',
    cnaes_secundarios: [
      { codigo: 6499999, descricao: 'Outras atividades de serviços financeiros não especificadas anteriormente' },
      { codigo: 6613400, descricao: 'Administração de cartões de crédito' },
      { codigo: 6431000, descricao: 'Bancos múltiplos, sem carteira comercial' },
      { codigo: 6622300, descricao: 'Corretores e agentes de seguros, de planos de previdência complementar e de saúde' },
      { codigo: 6204000, descricao: 'Consultoria em tecnologia da informação' }
    ],
    qsa: [
      { nome_socio: 'TARCIANA PAULA GOMES MEDEIROS', qualificacao_socio: 'Presidente' },
      { nome_socio: 'FELIPE GUIMARAES GEISSLER PRINCE', qualificacao_socio: 'Diretor' },
      { nome_socio: 'JOSE RICARDO FAGONDE FORNI', qualificacao_socio: 'Diretor' }
    ]
  },
  '33000167000101': {
    cnpj: '33000167000101',
    razao_social: 'PETROLEO BRASILEIRO S A PETROBRAS',
    nome_fantasia: 'PETROBRAS',
    descricao_situacao_cadastral: 'ATIVA',
    data_inicio_atividade: '1966-09-28',
    porte: 'DEMAIS',
    capital_social: 205431960490.52,
    natureza_juridica: '203-8 - Sociedade de Economia Mista',
    municipio: 'RIO DE JANEIRO',
    uf: 'RJ',
    cnae_fiscal: 600001,
    cnae_fiscal_descricao: 'Extração de petróleo e gás natural',
    cnaes_secundarios: [
      { codigo: 1921700, descricao: 'Fabricação de produtos do refino de petróleo' },
      { codigo: 4681801, descricao: 'Comércio atacadista de álcool carburante, biodiesel, gasolina e demais derivados de petróleo' },
      { codigo: 4940000, descricao: 'Transporte dutoviário' },
      { codigo: 3511501, descricao: 'Geração de energia elétrica' },
      { codigo: 7210000, descricao: 'Pesquisa e desenvolvimento experimental em ciências físicas e naturais' }
    ],
    qsa: [
      { nome_socio: 'MAGDA MARIA DE REGINA CHAMBRIARD', qualificacao_socio: 'Presidente' },
      { nome_socio: 'FERNANDO SCHUENCK MORGADO MELGAREJO', qualificacao_socio: 'Diretor' },
      { nome_socio: 'CLARICE COPPETTI', qualificacao_socio: 'Diretor' }
    ]
  },
  '00776574000156': {
    cnpj: '00776574000156',
    razao_social: 'AMERICANAS S.A. - EM RECUPERACAO JUDICIAL',
    nome_fantasia: 'AMERICANAS',
    descricao_situacao_cadastral: 'ATIVA',
    data_inicio_atividade: '1995-08-22',
    porte: 'DEMAIS',
    capital_social: 15460000000,
    natureza_juridica: '204-6 - Sociedade Anônima Aberta',
    municipio: 'RIO DE JANEIRO',
    uf: 'RJ',
    cnae_fiscal: 4711302,
    cnae_fiscal_descricao: 'Comércio varejista de mercadorias em geral, com predominância de produtos alimentícios - supermercados',
    cnaes_secundarios: [
      { codigo: 4713002, descricao: 'Lojas de variedades, exceto lojas de departamentos ou magazines' },
      { codigo: 4789099, descricao: 'Comércio varejista de outros produtos não especificados anteriormente' },
      { codigo: 5211799, descricao: 'Depósitos de mercadorias para terceiros, exceto armazéns gerais e guarda-móveis' },
      { codigo: 4930202, descricao: 'Transporte rodoviário de carga, exceto produtos perigosos e mudanças, intermunicipal, interestadual e internacional' },
      { codigo: 6319400, descricao: 'Portais, provedores de conteúdo e outros serviços de informação na internet' }
    ],
    qsa: [
      { nome_socio: 'LEONARDO COELHO PEREIRA', qualificacao_socio: 'Diretor' },
      { nome_socio: 'CAMILLE LOYOLA FARIA', qualificacao_socio: 'Diretor' }
    ]
  },
  '18236120000158': {
    cnpj: '18236120000158',
    razao_social: 'NU PAGAMENTOS S.A. - INSTITUICAO DE PAGAMENTO',
    nome_fantasia: 'NUBANK',
    descricao_situacao_cadastral: 'ATIVA',
    data_inicio_atividade: '2013-05-15',
    porte: 'DEMAIS',
    capital_social: 8950000000,
    natureza_juridica: '205-4 - Sociedade Anônima Fechada',
    municipio: 'SAO PAULO',
    uf: 'SP',
    cnae_fiscal: 6613400,
    cnae_fiscal_descricao: 'Administração de cartões de crédito',
    cnaes_secundarios: [
      { codigo: 6499999, descricao: 'Outras atividades de serviços financeiros não especificadas anteriormente' },
      { codigo: 6201501, descricao: 'Desenvolvimento de programas de computador sob encomenda' },
      { codigo: 6311900, descricao: 'Tratamento de dados, provedores de serviços de aplicação e serviços de hospedagem na internet' }
    ],
    qsa: [
      { nome_socio: 'DAVID VELEZ OSORNO', qualificacao_socio: 'Diretor' },
      { nome_socio: 'CRISTINA HELENA ZINGARETTI JUNQUEIRA', qualificacao_socio: 'Diretor' }
    ]
  }
};

function limparCnpj(valor) {
  return (valor || '').replace(/\D/g, '');
}

function formatarCnpj(valor) {
  const digits = limparCnpj(valor).slice(0, 14);
  return digits
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');
}

function formatarCodigoCnae(codigo) {
  const str = String(codigo || '').replace(/\D/g, '').padStart(7, '0');
  return `${str.slice(0, 4)}-${str.slice(4, 5)}/${str.slice(5, 7)}`;
}

function formatarMoeda(valor) {
  if (!valor && valor !== 0) return 'Não informado';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0
  }).format(valor);
}

function calcularAnosEmpresa(dataInicio) {
  if (!dataInicio) return null;
  const inicio = new Date(dataInicio);
  if (isNaN(inicio.getTime())) return null;
  const hoje = new Date();
  const diff = (hoje - inicio) / (1000 * 60 * 60 * 24 * 365.25);
  return Math.max(0, Math.floor(diff));
}

function validarCnpj(cnpj) {
  const clean = limparCnpj(cnpj);
  if (clean.length !== 14) return false;
  if (/^(\d)\1+$/.test(clean)) return false;

  let tamanho = clean.length - 2;
  let numeros = clean.substring(0, tamanho);
  const digitos = clean.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += Number(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== Number(digitos.charAt(0))) return false;

  tamanho = tamanho + 1;
  numeros = clean.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += Number(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  return resultado === Number(digitos.charAt(1));
}

// Fetch com timeout explícito via AbortController
async function fetchWithTimeout(url, timeoutMs = 7000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal });
    return response;
  } finally {
    clearTimeout(id);
  }
}

// Normaliza a resposta da API de contingência (publica.cnpj.ws) para o padrão interno
function normalizarDadosCnpjWs(raw) {
  const est = raw.estabelecimento || {};
  const atvPrincipal = est.atividade_principal || {};
  const atvsSecundarias = Array.isArray(est.atividades_secundarias) ? est.atividades_secundarias : [];
  const socios = Array.isArray(raw.socios) ? raw.socios : [];

  return {
    cnpj: est.cnpj || '',
    razao_social: raw.razao_social || '',
    nome_fantasia: est.nome_fantasia || '',
    descricao_situacao_cadastral: (est.situacao_cadastral || '').toUpperCase(),
    data_inicio_atividade: est.data_inicio_atividade || '',
    porte: raw.porte?.descricao ? raw.porte.descricao.toUpperCase() : '',
    capital_social: Number(raw.capital_social) || 0,
    natureza_juridica: raw.natureza_juridica
      ? `${raw.natureza_juridica.id || ''} - ${raw.natureza_juridica.descricao || ''}`.trim()
      : '',
    municipio: est.cidade?.nome || '',
    uf: est.estado?.sigla || '',
    cnae_fiscal: Number(String(atvPrincipal.id || '').replace(/\D/g, '')) || 0,
    cnae_fiscal_descricao: atvPrincipal.descricao || 'Atividade não informada',
    cnaes_secundarios: atvsSecundarias.map((a) => ({
      codigo: Number(String(a.id || '').replace(/\D/g, '')) || 0,
      descricao: a.descricao || ''
    })),
    qsa: socios.map((s) => ({
      nome_socio: s.nome || '',
      qualificacao_socio: s.qualificacao_socio?.descricao || 'Sócio'
    }))
  };
}

function classificarMacroSegmento(codigo) {
  const div = Number(String(codigo || '').padStart(7, '0').slice(0, 2));
  if (div >= 1 && div <= 3) return 'Agronegócio';
  if (div >= 5 && div <= 9) return 'Extrativa & Mineração';
  if (div >= 10 && div <= 33) return 'Indústria / Fabricação';
  if (div >= 35 && div <= 39) return 'Energia & Saneamento';
  if (div >= 41 && div <= 43) return 'Construção & Engenharia';
  if (div === 45) return 'Automotivo';
  if (div === 46) return 'Atacado & Distribuição';
  if (div === 47) return 'Varejo';
  if (div >= 49 && div <= 53) return 'Logística & Transporte';
  if (div >= 55 && div <= 56) return 'Hospitalidade & Food Service';
  if (div >= 58 && div <= 63) return 'Tecnologia, Dados & Mídia';
  if (div >= 64 && div <= 66) return 'Financeiro & Fintech';
  if (div === 68) return 'Imobiliário';
  if (div >= 69 && div <= 75) return 'Serviços Corporativos B2B';
  if (div >= 77 && div <= 82) return 'Terceirização & Apoio Operacional';
  if (div === 85) return 'Educação';
  if (div >= 86 && div <= 88) return 'Saúde & Bem-estar';
  return 'Serviços Especializados';
}

function analisarInteligenciaComercial(empresa) {
  const principal = {
    codigo: empresa.cnae_fiscal,
    descricao: empresa.cnae_fiscal_descricao,
    macro: classificarMacroSegmento(empresa.cnae_fiscal)
  };

  const secundarios = (empresa.cnaes_secundarios || [])
    .filter((c) => c.codigo && c.codigo !== 0)
    .map((c) => {
      const macro = classificarMacroSegmento(c.codigo);
      let papelComercial = 'Expansão / Cross-sell';
      if (macro === principal.macro) {
        papelComercial = 'Core Business';
      } else if (['Logística & Transporte', 'Tecnologia, Dados & Mídia', 'Terceirização & Apoio Operacional'].includes(macro)) {
        papelComercial = 'Apoio / Infraestrutura';
      }
      return {
        ...c,
        macro,
        papelComercial
      };
    });

  const todosCnaes = [principal, ...secundarios];
  const macrosUnicos = [...new Set(todosCnaes.map((c) => c.macro))];

  // 1. Definição do Modelo de Negócio Comercial
  let modeloNegocio = principal.macro;
  let subtituloModelo = 'Operação focada em uma vertical principal';

  const temIndustria = macrosUnicos.includes('Indústria / Fabricação');
  const temAtacado = macrosUnicos.includes('Atacado & Distribuição');
  const temVarejo = macrosUnicos.includes('Varejo');
  const temTech = macrosUnicos.includes('Tecnologia, Dados & Mídia');
  const temLogistica = macrosUnicos.includes('Logística & Transporte');

  if (temIndustria && (temAtacado || temVarejo)) {
    modeloNegocio = 'Indústria Verticalizada (B2B + B2C)';
    subtituloModelo = 'Fabrica e escoa produção diretamente no atacado ou varejo';
  } else if (temAtacado && temVarejo) {
    modeloNegocio = 'Distribuidor & Varejo Híbrido';
    subtituloModelo = 'Atua tanto na revenda B2B quanto no consumidor final';
  } else if (temVarejo && (temLogistica || temTech)) {
    modeloNegocio = 'Varejo Omnichannel / E-commerce';
    subtituloModelo = 'Estrutura preparada para vendas digitais e entrega própria';
  } else if (macrosUnicos.includes('Financeiro & Fintech') && temTech) {
    modeloNegocio = 'Fintech / Serviços Financeiros Digitais';
    subtituloModelo = 'Operação financeira apoiada por desenvolvimento de software';
  } else if (macrosUnicos.length >= 4) {
    modeloNegocio = `${principal.macro} (Multi-operação)`;
    subtituloModelo = `Atua em ${macrosUnicos.length} frentes econômicas complementares`;
  }

  // 2. Cálculo do Score de Maturidade & Capacidade de Compra (ICP Score 0-100)
  let score = 20;
  const fatoresScore = [];

  if ((empresa.descricao_situacao_cadastral || '').toUpperCase() === 'ATIVA') {
    score += 20;
    fatoresScore.push('CNPJ Ativo');
  } else {
    score -= 15;
    fatoresScore.push('Situação cadastral irregular/inativa');
  }

  const porteStr = (empresa.porte || '').toUpperCase();
  if (porteStr.includes('DEMAIS') || porteStr.includes('GRANDE') || porteStr.includes('MEDIO') || porteStr.includes('MÉDIO')) {
    score += 25;
    fatoresScore.push('Porte Médio/Grande');
  } else if (porteStr.includes('EPP') || porteStr.includes('PEQUENO')) {
    score += 18;
    fatoresScore.push('Empresa de Pequeno Porte (EPP)');
  } else if (porteStr.includes('ME') || porteStr.includes('MICRO')) {
    score += 10;
    fatoresScore.push('Microempresa (ME)');
  }

  const capital = Number(empresa.capital_social) || 0;
  if (capital >= 1000000) {
    score += 20;
    fatoresScore.push('Alto Capital Social (> R$ 1M)');
  } else if (capital >= 100000) {
    score += 12;
    fatoresScore.push('Capital Social consolidado');
  } else if (capital > 0) {
    score += 5;
  }

  const anos = calcularAnosEmpresa(empresa.data_inicio_atividade);
  if (anos !== null) {
    if (anos >= 5) {
      score += 10;
      fatoresScore.push(`${anos} anos de mercado`);
    } else if (anos >= 2) {
      score += 6;
      fatoresScore.push(`${anos} anos de operação`);
    } else {
      score += 2;
      fatoresScore.push('Empresa recente (< 2 anos)');
    }
  }

  if (secundarios.length >= 3) {
    score += 5;
    fatoresScore.push('Múltiplas linhas de receita');
  }

  score = Math.min(100, Math.max(5, score));

  let classificacaoLead = 'Ticket Inicial / SMB';
  let corScore = 'amber';
  if (score >= 80) {
    classificacaoLead = 'Enterprise / Alto Potencial';
    corScore = 'emerald';
  } else if (score >= 55) {
    classificacaoLead = 'Mid-Market / Qualificado';
    corScore = 'indigo';
  }

  // 3. Gatilhos de Abordagem Comercial (Playbook de Vendas baseado nos CNAEs)
  const gatilhos = [];
  const doresProvaveis = [];

  if (temVarejo || temAtacado) {
    doresProvaveis.push('Giro de estoque, ruptura de produtos, tributação interestadual (ICMS-ST) e margem comercial.');
    gatilhos.push('Focar em ganho de margem líquida, giro rápido e previsibilidade de demanda.');
  }
  if (temIndustria) {
    doresProvaveis.push('Eficiência produtiva (OEE), custo de matéria-prima, PCP e compliance fiscal.');
    gatilhos.push('Abordar redução de custos operacionais e automação da cadeia de suprimentos.');
  }
  if (temLogistica) {
    doresProvaveis.push('Custo de frete, roteirização, gestão de frota e emissão ágil de CT-e / MDF-e.');
    gatilhos.push('Explorar otimização de malha logística e redução de tempo de entrega.');
  }
  if (temTech || macrosUnicos.includes('Financeiro & Fintech')) {
    doresProvaveis.push('Escala de aquisição de clientes (CAC), segurança de dados, retenção e integração via API.');
    gatilhos.push('Destacar velocidade de implementação, ROI rápido e escalabilidade técnica.');
  }
  if (macrosUnicos.includes('Saúde & Bem-estar') || macrosUnicos.includes('Hospitalidade & Food Service')) {
    doresProvaveis.push('Agendamento/atendimento, controle de validade/insumos e fidelização recorrente.');
    gatilhos.push('Apresentar casos de aumento de recorrência e redução de perdas operacionais.');
  }
  if (doresProvaveis.length === 0) {
    doresProvaveis.push('Produtividade da equipe, aquisição de novos contratos B2B e controle financeiro.');
    gatilhos.push('Conectar sua solução ao aumento de eficiência da operação principal da empresa.');
  }

  const nomeCurto = empresa.nome_fantasia || empresa.razao_social;
  const pitchSugerido = `Olá! Analisei a operação da ${nomeCurto} e vi que vocês atuam fortemente em ${principal.macro.toLowerCase()}${
    secundarios.length > 0 ? ` com frentes complementares em ${secundarios.length} atividades secundárias` : ''
  }. Empresas com esse perfil costumam buscar ${doresProvaveis[0].toLowerCase().replace('.', '')} — faz sentido conversarmos 10 minutos sobre como estamos apoiando players desse setor?`;

  return {
    principal,
    secundarios,
    macrosUnicos,
    modeloNegocio,
    subtituloModelo,
    score,
    classificacaoLead,
    corScore,
    fatoresScore,
    doresProvaveis,
    gatilhos,
    pitchSugerido,
    anosEmpresa: anos,
    potencialCrossSell: secundarios.length >= 4 ? 'Alto' : secundarios.length >= 1 ? 'Médio' : 'Focado'
  };
}

export default function App() {
  const [cnpjInput, setCnpjInput] = useState('00.776.574/0001-56');
  const [loading, setLoading] = useState(false);
  const [statusConsulta, setStatusConsulta] = useState('');
  const [erro, setErro] = useState('');
  const [empresa, setEmpresa] = useState(null);
  const [fonteDados, setFonteDados] = useState('');
  const [buscaSecundario, setBuscaSecundario] = useState('');
  const [filtroPapel, setFiltroPapel] = useState('TODOS');
  const [copiadoPitch, setCopiadoPitch] = useState(false);
  const [copiadoResumo, setCopiadoResumo] = useState(false);
  const [modalIbge, setModalIbge] = useState(null);
  const [loadingIbge, setLoadingIbge] = useState(false);

  const analise = useMemo(() => {
    if (!empresa) return null;
    return analisarInteligenciaComercial(empresa);
  }, [empresa]);

  const secundariosFiltrados = useMemo(() => {
    if (!analise) return [];
    return analise.secundarios.filter((item) => {
      const matchTexto =
        item.descricao.toLowerCase().includes(buscaSecundario.toLowerCase()) ||
        String(item.codigo).includes(buscaSecundario.replace(/\D/g, '')) ||
        item.macro.toLowerCase().includes(buscaSecundario.toLowerCase());

      const matchPapel = filtroPapel === 'TODOS' || item.papelComercial === filtroPapel;
      return matchTexto && matchPapel;
    });
  }, [analise, buscaSecundario, filtroPapel]);

  async function consultarCnpj(cnpjAlvo = cnpjInput) {
    const clean = limparCnpj(cnpjAlvo);
    setErro('');
    setBuscaSecundario('');
    setFiltroPapel('TODOS');

    if (clean.length !== 14) {
      setErro('Digite um CNPJ completo com 14 dígitos.');
      return;
    }

    if (!validarCnpj(clean)) {
      setErro('CNPJ inválido: os dígitos verificadores não conferem.');
      return;
    }

    setLoading(true);
    setStatusConsulta('Consultando BrasilAPI (Primária)...');

    try {
      // 1ª Tentativa: BrasilAPI (Timeout 7s)
      const response = await fetchWithTimeout(`https://brasilapi.com.br/api/cnpj/v1/${clean}`, 7000);
      if (!response.ok) {
        throw new Error(`BrasilAPI retornou status ${response.status}`);
      }
      const data = await response.json();
      setEmpresa(data);
      setFonteDados('BrasilAPI (Primária)');
    } catch (errPrimaria) {
      // 2ª Tentativa: Contingência publica.cnpj.ws (Timeout 7s)
      try {
        setStatusConsulta('BrasilAPI indisponível. Acionando contingência CNPJ.ws...');
        const fallbackResp = await fetchWithTimeout(`https://publica.cnpj.ws/cnpj/${clean}`, 7000);
        if (!fallbackResp.ok) {
          if (fallbackResp.status === 404) {
            throw new Error('NOT_FOUND');
          }
          if (fallbackResp.status === 429) {
            throw new Error('RATE_LIMIT');
          }
          throw new Error(`CNPJ.ws retornou status ${fallbackResp.status}`);
        }
        const rawFallback = await fallbackResp.json();
        const dataNormalizada = normalizarDadosCnpjWs(rawFallback);
        setEmpresa(dataNormalizada);
        setFonteDados('CNPJ.ws (Contingência)');
      } catch (errSecundaria) {
        // 3ª Tentativa: Cache local de demonstração
        if (EMPRESAS_DEMO[clean]) {
          setEmpresa(EMPRESAS_DEMO[clean]);
          setFonteDados('Cache Local (Offline)');
        } else if (errSecundaria.message === 'NOT_FOUND') {
          setErro('CNPJ não encontrado na base da Receita Federal.');
        } else if (errSecundaria.message === 'RATE_LIMIT') {
          setErro('Limite de consultas por minuto atingido na API pública. Aguarde alguns segundos e tente novamente.');
        } else {
          setErro('Ambas as APIs públicas (BrasilAPI e CNPJ.ws) falharam ou excederam o tempo limite. Tente novamente em instantes.');
        }
      }
    } finally {
      setLoading(false);
      setStatusConsulta('');
    }
  }

  async function abrirDetalhesIbge(codigo, descricaoFallback) {
    const idSubclasse = String(codigo).padStart(7, '0');
    setLoadingIbge(true);
    setModalIbge({
      codigo: idSubclasse,
      descricao: descricaoFallback,
      carregando: true
    });

    try {
      const resp = await fetchWithTimeout(`https://servicodados.ibge.gov.br/api/v2/cnae/subclasses/${idSubclasse}`, 6000);
      if (!resp.ok) throw new Error('Erro IBGE');
      const data = await resp.json();
      const item = Array.isArray(data) ? data[0] : data;

      if (!item) throw new Error('Subclasse não encontrada');

      setModalIbge({
        codigo: idSubclasse,
        descricao: item.descricao || descricaoFallback,
        secao: item.classe?.grupo?.divisao?.secao,
        divisao: item.classe?.grupo?.divisao,
        grupo: item.classe?.grupo,
        classe: item.classe,
        atividades: item.atividades || [],
        observacoes: item.observacoes || [],
        carregando: false
      });
    } catch {
      setModalIbge({
        codigo: idSubclasse,
        descricao: descricaoFallback,
        erro: 'Não foi possível carregar a árvore detalhada do IBGE no momento.',
        carregando: false
      });
    } finally {
      setLoadingIbge(false);
    }
  }

  function copiarPitch() {
    if (!analise) return;
    navigator.clipboard.writeText(analise.pitchSugerido);
    setCopiadoPitch(true);
    setTimeout(() => setCopiadoPitch(false), 2000);
  }

  function copiarResumoCrm() {
    if (!empresa || !analise) return;
    const texto = [
      `[RAIO-X COMERCIAL B2B] ${empresa.razao_social}`,
      `CNPJ: ${formatarCnpj(empresa.cnpj)} | Status: ${empresa.descricao_situacao_cadastral}`,
      `Local: ${empresa.municipio}/${empresa.uf} | Porte: ${empresa.porte || 'N/I'} | Capital: ${formatarMoeda(empresa.capital_social)}`,
      `Modelo de Negócio: ${analise.modeloNegocio}`,
      `ICP Score: ${analise.score}/100 (${analise.classificacaoLead})`,
      `CNAE Principal: ${formatarCodigoCnae(analise.principal.codigo)} - ${analise.principal.descricao}`,
      `Total de CNAEs: ${1 + analise.secundarios.length} | Potencial Cross-Sell: ${analise.potencialCrossSell}`,
      `Decisores (QSA): ${(empresa.qsa || []).map((s) => `${s.nome_socio} (${s.qualificacao_socio})`).join('; ') || 'Não listado'}`,
      `Gatilho Comercial: ${analise.gatilhos[0]}`
    ].join('\n');

    navigator.clipboard.writeText(texto);
    setCopiadoResumo(true);
    setTimeout(() => setCopiadoResumo(false), 2000);
  }

  function exportarCsv() {
    if (!empresa || !analise) return;
    const linhas = [
      ['Tipo', 'Codigo_CNAE', 'Descricao', 'Macro_Segmento', 'Papel_Comercial'],
      [
        'PRINCIPAL',
        formatarCodigoCnae(analise.principal.codigo),
        `"${analise.principal.descricao.replace(/"/g, '""')}"`,
        analise.principal.macro,
        'Core Business'
      ],
      ...analise.secundarios.map((s) => [
        'SECUNDARIO',
        formatarCodigoCnae(s.codigo),
        `"${s.descricao.replace(/"/g, '""')}"`,
        s.macro,
        s.papelComercial
      ])
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + linhas.map((e) => e.join(';')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `raio_x_comercial_${limparCnpj(empresa.cnpj)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const exemplosRapidos = [
    { label: 'Americanas (Varejo)', cnpj: '00.776.574/0001-56' },
    { label: 'Nubank (Fintech)', cnpj: '18.236.120/0001-58' },
    { label: 'Petrobras (Indústria)', cnpj: '33.000.167/0001-01' },
    { label: 'Banco do Brasil', cnpj: '00.000.000/0001-91' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      {/* Top Navbar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-indigo-600 p-2 rounded-lg shadow-inner">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight">CNAE Sales Intel</span>
              <span className="hidden sm:inline-block ml-2.5 text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full">
                Raio-X Comercial B2B
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="hidden md:flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Tempo Real • BrasilAPI + CNPJ.ws
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
        {/* Hero / Barra de Consulta Unitária */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 mb-8">
          <div className="max-w-3xl">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Qualifique qualquer prospect em segundos pelo CNPJ
            </h1>
            <p className="text-slate-600 mt-1.5 text-sm sm:text-base">
              Consulta unitária em tempo real com redundância automática para mapear o modelo de negócio, maturidade de compra (ICP), decisores e gatilhos comerciais a partir dos CNAEs.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              consultarCnpj();
            }}
            className="mt-6 flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={cnpjInput}
                onChange={(e) => setCnpjInput(formatarCnpj(e.target.value))}
                placeholder="Digite o CNPJ do prospect (ex: 00.776.574/0001-56)"
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-300 rounded-xl text-base font-mono focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold rounded-xl shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Analisando...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Gerar Raio-X Comercial
                </>
              )}
            </button>
          </form>

          {/* Status dinâmico de fallback durante a requisição */}
          {loading && statusConsulta && (
            <div className="mt-3 flex items-center gap-2 text-xs text-indigo-700 font-medium">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>{statusConsulta}</span>
            </div>
          )}

          {/* Exemplos Rápidos */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Testar com prospects:</span>
            {exemplosRapidos.map((ex) => (
              <button
                key={ex.cnpj}
                type="button"
                onClick={() => {
                  setCnpjInput(ex.cnpj);
                  consultarCnpj(ex.cnpj);
                }}
                className="px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 rounded-md border border-slate-200 transition cursor-pointer"
              >
                {ex.label}
              </button>
            ))}
          </div>

          {erro && (
            <div className="mt-4 p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2.5 text-rose-700 text-sm">
              <XCircle className="w-5 h-5 shrink-0" />
              <span>{erro}</span>
            </div>
          )}
        </section>

        {/* Resultado da Análise Comercial */}
        {empresa && analise && (
          <div className="space-y-6 animate-fadeIn">
            {/* Cabeçalho da Empresa + Ações CRM */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      empresa.descricao_situacao_cadastral === 'ATIVA'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {empresa.descricao_situacao_cadastral}
                  </span>
                  <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
                    {formatarCnpj(empresa.cnpj)}
                  </span>
                  {fonteDados && (
                    <span
                      className={`inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-md border ${
                        fonteDados.includes('Contingência')
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                    >
                      <Server className="w-3 h-3" />
                      {fonteDados}
                    </span>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {empresa.nome_fantasia ? `${empresa.nome_fantasia} — ` : ''}
                  <span className={empresa.nome_fantasia ? 'font-normal text-slate-600 text-lg' : ''}>
                    {empresa.razao_social}
                  </span>
                </h2>

                <div className="mt-2.5 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs sm:text-sm text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    {empresa.municipio}/{empresa.uf}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-slate-400" />
                    Porte: <strong>{empresa.porte || 'Não informado'}</strong>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-slate-400" />
                    Capital Social: <strong>{formatarMoeda(empresa.capital_social)}</strong>
                  </span>
                  {analise.anosEmpresa !== null && (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <strong>{analise.anosEmpresa} anos</strong> de operação
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={copiarResumoCrm}
                  className="px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium text-sm rounded-xl border border-indigo-200 transition flex items-center gap-2 cursor-pointer"
                >
                  {copiadoResumo ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  {copiadoResumo ? 'Copiado para CRM!' : 'Copiar Ficha CRM'}
                </button>
                <button
                  type="button"
                  onClick={exportarCsv}
                  className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 font-medium text-sm rounded-xl border border-slate-300 transition flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Exportar CSV
                </button>
              </div>
            </div>

            {/* 4 KPIs Comerciais */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: Modelo de Negócio */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  <span>Modelo de Negócio</span>
                  <Briefcase className="w-4 h-4 text-indigo-600" />
                </div>
                <p className="mt-2 text-lg font-bold text-slate-900 leading-snug">{analise.modeloNegocio}</p>
                <p className="mt-1 text-xs text-slate-500">{analise.subtituloModelo}</p>
              </div>

              {/* Card 2: ICP Score */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  <span>ICP & Maturidade</span>
                  <Award className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-slate-900">{analise.score}</span>
                  <span className="text-xs font-medium text-slate-400">/ 100 pts</span>
                </div>
                <span
                  className={`mt-1.5 inline-block text-xs font-semibold px-2 py-0.5 rounded-md ${
                    analise.corScore === 'emerald'
                      ? 'bg-emerald-100 text-emerald-800'
                      : analise.corScore === 'indigo'
                      ? 'bg-indigo-100 text-indigo-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {analise.classificacaoLead}
                </span>
              </div>

              {/* Card 3: Potencial Cross-Sell */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  <span>Amplitude & Cross-Sell</span>
                  <TrendingUp className="w-4 h-4 text-violet-600" />
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-slate-900">{analise.potencialCrossSell}</span>
                  <span className="text-xs text-slate-500">({1 + analise.secundarios.length} CNAEs)</span>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Atua em {analise.macrosUnicos.length} {analise.macrosUnicos.length === 1 ? 'vertical' : 'verticais'} econômicas
                </p>
              </div>

              {/* Card 4: Decisores Mapeados */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  <span>Decisores (QSA)</span>
                  <Users className="w-4 h-4 text-sky-600" />
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-slate-900">{(empresa.qsa || []).length}</span>
                  <span className="text-xs text-slate-500">sócios / diretores</span>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  {(empresa.qsa || []).length > 0
                    ? 'Prontos para busca no LinkedIn'
                    : 'S/A Aberta ou Empresário Individual'}
                </p>
              </div>
            </div>

            {/* Bloco Estratégico: Playbook de Abordagem + Decisores (QSA) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Gatilhos & Pitch Comercial (2 colunas) */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-indigo-700 font-bold text-base mb-4">
                    <Sparkles className="w-5 h-5" />
                    <h3>Inteligência de Abordagem & Gatilhos de Venda</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Dores Típicas do Perfil CNAE
                      </span>
                      <ul className="mt-2 space-y-2 text-sm text-slate-700">
                        {analise.doresProvaveis.map((dor, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                            <span>{dor}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Ângulos de Argumentação
                      </span>
                      <ul className="mt-2 space-y-2 text-sm text-slate-700">
                        {analise.gatilhos.map((gatilho, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                            <span>{gatilho}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Sugestão de Cold Outreach / Icebreaker */}
                <div className="bg-indigo-50/70 border border-indigo-200/80 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                      <MessageSquareQuote className="w-4 h-4 text-indigo-600" />
                      Sugestão de Quebra-Gelo (Cold Mail / LinkedIn)
                    </span>
                    <button
                      type="button"
                      onClick={copiarPitch}
                      className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 flex items-center gap-1 cursor-pointer"
                    >
                      {copiadoPitch ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiadoPitch ? 'Copiado!' : 'Copiar texto'}
                    </button>
                  </div>
                  <p className="text-sm text-slate-800 italic leading-relaxed">"{analise.pitchSugerido}"</p>
                </div>
              </div>

              {/* Mapa de Decisores (QSA) */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <Users className="w-5 h-5 text-sky-600" />
                    <h3>Mapa de Decisores</h3>
                  </div>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                    QSA Oficial
                  </span>
                </div>

                {empresa.qsa && empresa.qsa.length > 0 ? (
                  <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                    {empresa.qsa.map((socio, idx) => {
                      const queryLinkedin = encodeURIComponent(
                        `${socio.nome_socio} ${empresa.nome_fantasia || empresa.razao_social}`
                      );
                      return (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-2"
                        >
                          <div>
                            <p className="text-sm font-semibold text-slate-900 leading-snug">{socio.nome_socio}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{socio.qualificacao_socio}</p>
                          </div>
                          <a
                            href={`https://www.linkedin.com/search/results/all/?keywords=${queryLinkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Buscar decisor no LinkedIn"
                            className="shrink-0 p-2 bg-white hover:bg-sky-50 text-sky-700 border border-slate-200 rounded-lg transition"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 px-4 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    <p className="text-sm text-slate-600 font-medium">Quadro societário não divulgado</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Empresas de capital aberto (S/A) ou individuais podem não listar diretores nesta base.
                    </p>
                    <a
                      href={`https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(
                        empresa.nome_fantasia || empresa.razao_social
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                    >
                      Buscar equipe no LinkedIn <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* CNAE Principal */}
            <div className="bg-white rounded-2xl border-2 border-indigo-600/20 shadow-sm p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="px-2.5 py-0.5 bg-indigo-600 text-white text-xs font-bold rounded-md uppercase tracking-wide">
                      CNAE Principal (Core)
                    </span>
                    <span className="font-mono text-sm font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md">
                      {formatarCodigoCnae(analise.principal.codigo)}
                    </span>
                    <span className="text-xs font-medium bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md">
                      Vertical: {analise.principal.macro}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{analise.principal.descricao}</h3>
                </div>

                <button
                  type="button"
                  onClick={() => abrirDetalhesIbge(analise.principal.codigo, analise.principal.descricao)}
                  className="shrink-0 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Info className="w-4 h-4 text-indigo-600" />
                  Escopo Oficial IBGE
                </button>
              </div>
            </div>

            {/* Lista de CNAEs Secundários com Papel Comercial */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-indigo-600" />
                    Atividades Secundárias & Oportunidades ({analise.secundarios.length})
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Classificadas pelo papel comercial em relação à operação principal do prospect
                  </p>
                </div>

                {analise.secundarios.length > 0 && (
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <div className="relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={buscaSecundario}
                        onChange={(e) => setBuscaSecundario(e.target.value)}
                        placeholder="Filtrar atividade ou setor..."
                        className="pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Filter className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                      <select
                        value={filtroPapel}
                        onChange={(e) => setFiltroPapel(e.target.value)}
                        className="px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="TODOS">Todos os papéis</option>
                        <option value="Core Business">Core Business</option>
                        <option value="Expansão / Cross-sell">Expansão / Cross-sell</option>
                        <option value="Apoio / Infraestrutura">Apoio / Infraestrutura</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {analise.secundarios.length === 0 ? (
                <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-sm text-slate-500">
                  Esta empresa possui apenas o CNAE principal registrado (operação 100% focada).
                </div>
              ) : secundariosFiltrados.length === 0 ? (
                <div className="text-center py-8 text-sm text-slate-500">
                  Nenhuma atividade secundária encontrada com os filtros atuais.
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {secundariosFiltrados.map((item, index) => (
                    <div
                      key={`${item.codigo}-${index}`}
                      className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 px-2 rounded-lg transition"
                    >
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                            {formatarCodigoCnae(item.codigo)}
                          </span>
                          <span
                            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                              item.papelComercial === 'Core Business'
                                ? 'bg-indigo-100 text-indigo-800'
                                : item.papelComercial === 'Expansão / Cross-sell'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {item.papelComercial}
                          </span>
                          <span className="text-xs text-slate-500">• {item.macro}</span>
                        </div>
                        <p className="text-sm text-slate-800 font-medium">{item.descricao}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => abrirDetalhesIbge(item.codigo, item.descricao)}
                        title="Ver detalhes oficiais no IBGE"
                        className="self-start sm:self-center shrink-0 p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition cursor-pointer"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Modal Hierarquia Oficial IBGE */}
      {modalIbge && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full shadow-xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-indigo-300">
                  CNAE {formatarCodigoCnae(modalIbge.codigo)}
                </span>
                <h4 className="font-bold text-base">Detalhamento Oficial IBGE</h4>
              </div>
              <button
                type="button"
                onClick={() => setModalIbge(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 max-h-[75vh] overflow-y-auto space-y-4">
              <p className="font-bold text-slate-900 text-base">{modalIbge.descricao}</p>

              {modalIbge.carregando || loadingIbge ? (
                <div className="py-8 text-center text-sm text-slate-500 flex flex-col items-center gap-2">
                  <RefreshCw className="w-5 h-5 animate-spin text-indigo-600" />
                  Consultando base oficial do IBGE...
                </div>
              ) : modalIbge.erro ? (
                <div className="p-4 bg-amber-50 text-amber-800 rounded-xl text-sm">{modalIbge.erro}</div>
              ) : (
                <>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                    {modalIbge.secao && (
                      <div>
                        <span className="font-bold text-slate-500">Seção {modalIbge.secao.id}:</span>{' '}
                        <span className="text-slate-800">{modalIbge.secao.descricao}</span>
                      </div>
                    )}
                    {modalIbge.divisao && (
                      <div>
                        <span className="font-bold text-slate-500">Divisão {modalIbge.divisao.id}:</span>{' '}
                        <span className="text-slate-800">{modalIbge.divisao.descricao}</span>
                      </div>
                    )}
                    {modalIbge.grupo && (
                      <div>
                        <span className="font-bold text-slate-500">Grupo {modalIbge.grupo.id}:</span>{' '}
                        <span className="text-slate-800">{modalIbge.grupo.descricao}</span>
                      </div>
                    )}
                    {modalIbge.classe && (
                      <div>
                        <span className="font-bold text-slate-500">Classe {modalIbge.classe.id}:</span>{' '}
                        <span className="text-slate-800">{modalIbge.classe.descricao}</span>
                      </div>
                    )}
                  </div>

                  {modalIbge.atividades && modalIbge.atividades.length > 0 && (
                    <div>
                      <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Atividades Compreendidas
                      </h5>
                      <ul className="space-y-1.5 text-xs text-slate-700 list-disc pl-4">
                        {modalIbge.atividades.slice(0, 6).map((atv, i) => (
                          <li key={i}>{atv}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
