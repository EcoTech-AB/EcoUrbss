/**
 * LitoralState.js
 * Central State Management & Reactive Mock Backend for Eco-Urbs / Litoral Limpo
 * Persists seamlessly in localStorage across all roles (Cidadão, Empresa, ONG, Público).
 */

const LitoralState = (function () {
  const STORAGE_KEY = 'litoral_limpo_state_v1';

  const defaultData = {
    cidadao: {
      nome: 'Carlos Eduardo Silva',
      email: 'carlos.eduardo@exemplo.com',
      telefone: '(13) 99876-5432',
      cidade: 'Mongaguá - SP',
      bairro: 'Praia do Centro / Agenor de Campos',
      pontos: 180,
      nivel: 3,
      nivelNome: 'Guardião da Praia',
      proximoNivelPts: 300,
      conquistas: ['Primeira Onda', 'Olho Clínico', 'Guardião'],
      missoesConcluidas: 4,
      recompensasResgatadas: [
        { id: 1, nome: 'Vale-Desconto 20% Quiosque do Sol', data: '15/09/2025', codigo: 'DESC-SOL-882' }
      ]
    },
    empresa: {
      razaoSocial: 'EcoMar Soluções Ambientais e Logística S.A.',
      cnpj: '12.345.678/0001-90',
      setor: 'Logística & Gestão Sustentável',
      email: 'sustentabilidade@ecomar.com.br',
      telefone: '(13) 3448-0000',
      endereco: 'Av. Beira Mar, 1250 - Mongaguá / SP',
      pontosESG: 1200,
      seloAtivo: 'Empresa Amiga da Praia 2025',
      campanhas: [
        { id: 1, titulo: 'Verão Sem Plástico na Praia do Pier', local: 'Praia do Pier (Mongaguá)', alcance: 1450, inscritos: 38, status: 'Ativa' },
        { id: 2, titulo: 'Orla 100% Viva', local: 'Orla Sul (Praia Grande)', alcance: 2890, inscritos: 42, status: 'Encerrada' }
      ],
      chamados: [
        { protocolo: '#2025-9481', assunto: 'Instalação de Totem Informativo', secretaria: 'Meio Ambiente', data: '14/10/2025', status: 'Aprovado' },
        { protocolo: '#2025-8820', assunto: 'Vistoria Final Orla Sul', secretaria: 'Meio Ambiente', data: '20/09/2025', status: 'Em vistoria' }
      ]
    },
    ong: {
      nome: 'VerdeMar ONG',
      cnpj: '12.345.678/0001-90',
      responsavel: 'Julio Cesar Alves da Silva',
      cidades: ['Mongaguá', 'Praia Grande', 'Itanhaém'],
      pontosONG: 320,
      voluntarios: [
        { nome: 'Mariana Souza', contato: '@mariana · 9xx', participacoes: 12, pontos: 240 },
        { nome: 'Carlos Lima', contato: '@carlos · 9xx', participacoes: 8, pontos: 160 },
        { nome: 'Beatriz Ramos', contato: '@bia · 9xx', participacoes: 5, pontos: 110 }
      ]
    },
    locais: [
      {
        id: 1,
        nome: 'Praia do Pier',
        cidade: 'Mongaguá',
        bairro: 'Centro',
        coords: [-24.0934, -46.6218],
        tipo: 'lixo',
        tipoNome: 'Lixo Plástico / Descartáveis',
        status: 'andamento',
        statusNome: 'Em limpeza ativa',
        urgencia: 'Alta',
        reporter: 'Carlos Eduardo Silva',
        empresaMantenedora: 'EcoMar Soluções S.A.',
        ongResponsavel: 'VerdeMar ONG',
        foto: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=600&q=80',
        descricao: 'Acúmulo intenso de garrafas PET, canudos e redes de pesca nos pilares do pier.',
        estimativaKg: 350,
        recolhidoKg: 210,
        progresso: 60,
        dataReporte: '05/10/2025',
        dataUltimaAcao: '05/10/2025'
      },
      {
        id: 2,
        nome: 'Orla Sul — Trecho 2',
        cidade: 'Praia Grande',
        bairro: 'Orla Sul',
        coords: [-24.0125, -46.4533],
        tipo: 'entulho',
        tipoNome: 'Entulho de Obras & Móveis',
        status: 'aguardando',
        statusNome: 'Aguardando Validação',
        urgencia: 'Média',
        reporter: 'Carlos Eduardo Silva',
        empresaMantenedora: 'Recicla+ Brasil',
        ongResponsavel: 'VerdeMar ONG',
        foto: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80',
        descricao: 'Descarte irregular de restos de construção próximo ao acesso da ciclovia.',
        estimativaKg: 480,
        recolhidoKg: 480,
        progresso: 100,
        dataReporte: '12/09/2025',
        dataUltimaAcao: '18/09/2025'
      },
      {
        id: 3,
        nome: 'Costão Norte — Enseada',
        cidade: 'Itanhaém',
        bairro: 'Costão',
        coords: [-24.1834, -46.7912],
        tipo: 'oleo',
        tipoNome: 'Microplásticos & Mancha Oleosa',
        status: 'concluido',
        statusNome: '100% Regenerado',
        urgencia: 'Baixa',
        reporter: 'Mariana Souza',
        empresaMantenedora: 'BioClean Corp',
        ongResponsavel: 'Guardiões do Mar',
        foto: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
        descricao: 'Área completamente descontaminada. Recuperação das piscinas naturais concluída com sucesso.',
        estimativaKg: 250,
        recolhidoKg: 250,
        progresso: 100,
        dataReporte: '01/08/2025',
        dataUltimaAcao: '28/08/2025'
      },
      {
        id: 4,
        nome: 'Canto do Forte',
        cidade: 'Praia Grande',
        bairro: 'Canto do Forte',
        coords: [-24.0048, -46.4021],
        tipo: 'lixo',
        tipoNome: 'Lixo disperso de praia',
        status: 'analise',
        statusNome: 'Disponível para Adoção',
        urgencia: 'Alta',
        reporter: 'Morador local',
        empresaMantenedora: null,
        ongResponsavel: 'Guardiões do Mar',
        foto: 'https://images.unsplash.com/photo-1520116468418-86595e094077?auto=format&fit=crop&w=600&q=80',
        descricao: 'Grande volume de descartáveis deixados no final de semana na faixa de areia.',
        estimativaKg: 180,
        recolhidoKg: 0,
        progresso: 0,
        dataReporte: '24/10/2025',
        dataUltimaAcao: '24/10/2025'
      },
      {
        id: 5,
        nome: 'Praia dos Pescadores',
        cidade: 'Itanhaém',
        bairro: 'Prainha',
        coords: [-24.1912, -46.7821],
        tipo: 'lixo',
        tipoNome: 'Redes de pesca e carcaças',
        status: 'analise',
        statusNome: 'Disponível para Adoção',
        urgencia: 'Alta',
        reporter: 'Comunidade Pesqueira',
        empresaMantenedora: null,
        ongResponsavel: null,
        foto: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&w=600&q=80',
        descricao: 'Redes fantasmas presas nas pedras colocando em risco a fauna marinha.',
        estimativaKg: 500,
        recolhidoKg: 0,
        progresso: 0,
        dataReporte: '27/10/2025',
        dataUltimaAcao: '27/10/2025'
      },
      {
        id: 6,
        nome: 'Praia do Gonzaga',
        cidade: 'Santos',
        bairro: 'Gonzaga',
        coords: [-23.9689, -46.3332],
        tipo: 'lixo',
        tipoNome: 'Microplásticos e Bitucas',
        status: 'andamento',
        statusNome: 'Em limpeza ativa',
        urgencia: 'Média',
        reporter: 'Cidadão Conectado',
        empresaMantenedora: 'Porto Sustentável S.A.',
        ongResponsavel: 'EcoSantos ONG',
        foto: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&q=80',
        descricao: 'Ação diária de triagem de microplástico na faixa de areia central.',
        estimativaKg: 150,
        recolhidoKg: 95,
        progresso: 65,
        dataReporte: '15/10/2025',
        dataUltimaAcao: '28/10/2025'
      }
    ],
    notificacoes: [
      { id: 1, texto: 'Nova denúncia de foco na Praia do Pier validada (+50 pts para Carlos Eduardo).', hora: 'Há 10 min' },
      { id: 2, texto: 'VerdeMar ONG cadastrou novo mutirão em Mongaguá.', hora: 'Há 1 hora' },
      { id: 3, texto: 'EcoMar Soluções renovou o patrocínio territorial ESG.', hora: 'Há 3 horas' }
    ]
  };

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        save(defaultData);
        return JSON.parse(JSON.stringify(defaultData));
      }
      return JSON.parse(raw);
    } catch (e) {
      console.error('Error loading state:', e);
      return JSON.parse(JSON.stringify(defaultData));
    }
  }

  function save(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      window.dispatchEvent(new CustomEvent('litoral_state_change', { detail: data }));
    } catch (e) {
      console.error('Error saving state:', e);
    }
  }

  return {
    getState() {
      return load();
    },

    resetToDefault() {
      save(defaultData);
      this.toast('Dados de demonstração restaurados com sucesso!', 'success');
      return defaultData;
    },

    // Cidadão Actions
    addReport(reportData) {
      const state = load();
      const novoId = state.locais.length > 0 ? Math.max(...state.locais.map(l => l.id)) + 1 : 1;
      
      const novoLocal = {
        id: novoId,
        nome: reportData.nome || 'Ponto Reportado',
        cidade: reportData.cidade || 'Mongaguá',
        bairro: reportData.bairro || 'Centro',
        coords: reportData.coords || [-24.0934 + (Math.random() - 0.5) * 0.05, -46.6218 + (Math.random() - 0.5) * 0.05],
        tipo: reportData.tipo || 'lixo',
        tipoNome: reportData.tipoNome || 'Lixo Plástico',
        status: 'analise',
        statusNome: 'Em análise',
        urgencia: reportData.urgencia || 'Média',
        reporter: state.cidadao.nome,
        empresaMantenedora: null,
        ongResponsavel: null,
        foto: reportData.foto || 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=600&q=80',
        descricao: reportData.descricao || '',
        estimativaKg: parseInt(reportData.estimativaKg) || 150,
        recolhidoKg: 0,
        progresso: 0,
        dataReporte: new Date().toLocaleDateString('pt-BR'),
        dataUltimaAcao: new Date().toLocaleDateString('pt-BR')
      };

      state.locais.unshift(novoLocal);
      state.cidadao.pontos += 50;
      if (state.cidadao.pontos >= state.cidadao.proximoNivelPts) {
        state.cidadao.nivel += 1;
        state.cidadao.nivelNome = 'Protetor do Manguezal';
        state.cidadao.proximoNivelPts += 200;
        this.toast(`🎉 Parabéns! Você subiu para o Nível ${state.cidadao.nivel} (${state.cidadao.nivelNome})!`, 'success');
      }

      state.notificacoes.unshift({
        id: Date.now(),
        texto: `Novo reporte cadastrado em ${novoLocal.nome} por ${state.cidadao.nome} (+50 pts).`,
        hora: 'Agora mesmo'
      });

      save(state);
      this.toast('📍 Reporte cadastrado! +50 pontos adicionados ao seu saldo.', 'success');
      return novoLocal;
    },

    redeemReward(nomeRecompensa, custoPontos) {
      const state = load();
      if (state.cidadao.pontos < custoPontos) {
        this.toast(`Pontos insuficientes! Você possui ${state.cidadao.pontos} pts.`, 'error');
        return false;
      }
      state.cidadao.pontos -= custoPontos;
      const voucher = 'LL-VOUCHER-' + Math.floor(100000 + Math.random() * 900000);
      state.cidadao.recompensasResgatadas.unshift({
        id: Date.now(),
        nome: nomeRecompensa,
        data: new Date().toLocaleDateString('pt-BR'),
        codigo: voucher
      });
      save(state);
      this.toast(`🎉 Resgate confirmado! Código: ${voucher}`, 'success');
      return voucher;
    },

    // Empresa Actions
    adoptLocal(localId, empresaNome) {
      const state = load();
      const local = state.locais.find(l => l.id === localId);
      if (local) {
        local.empresaMantenedora = empresaNome || state.empresa.razaoSocial;
        local.status = 'andamento';
        local.statusNome = 'Em limpeza ativa';
        state.empresa.pontosESG += 250;
        save(state);
        this.toast(`🤝 Local ${local.nome} adotado com sucesso! +250 Pontos ESG.`, 'success');
        return true;
      }
      return false;
    },

    // ONG Actions
    assumeLocal(localId, ongNome) {
      const state = load();
      const local = state.locais.find(l => l.id === localId);
      if (local) {
        local.ongResponsavel = ongNome || state.ong.nome;
        local.status = 'andamento';
        local.statusNome = 'Em limpeza ativa';
        save(state);
        this.toast(`📋 ${local.nome} assumido pela ${local.ongResponsavel}!`, 'success');
        return true;
      }
      return false;
    },

    finishCleanup(localId, kgRecolhidos) {
      const state = load();
      const local = state.locais.find(l => l.id === localId);
      if (local) {
        local.status = 'concluido';
        local.statusNome = '100% Regenerado';
        local.progresso = 100;
        local.recolhidoKg = parseInt(kgRecolhidos) || local.estimativaKg;
        state.ong.pontosONG += 100;
        state.empresa.pontosESG += 300;
        save(state);
        this.toast(`🌊 Mutirão finalizado em ${local.nome}! Selo ESG emitido.`, 'success');
        return true;
      }
      return false;
    },

    // Modern Toast System
    toast(mensagem, tipo = 'info') {
      let toastContainer = document.getElementById('litoral-toast-container');
      if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'litoral-toast-container';
        toastContainer.style.cssText = `
          position: fixed;
          top: 24px;
          right: 24px;
          z-index: 999999;
          display: flex;
          flex-direction: column;
          gap: 10px;
          pointer-events: none;
        `;
        document.body.appendChild(toastContainer);
      }

      const toast = document.createElement('div');
      const bgColors = {
        success: '#145a52',
        error: '#c0392b',
        info: '#0E2E29'
      };

      toast.style.cssText = `
        background: ${bgColors[tipo] || '#0E2E29'};
        color: #fff;
        padding: 14px 20px;
        border-radius: 12px;
        font-family: 'Inter', sans-serif;
        font-size: 13.5px;
        font-weight: 500;
        box-shadow: 0 14px 34px -10px rgba(0,0,0,0.3);
        border: 1px solid rgba(255,255,255,0.15);
        display: flex;
        align-items: center;
        gap: 10px;
        pointer-events: auto;
        opacity: 0;
        transform: translateY(-10px) scale(0.95);
        transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        max-width: 380px;
      `;

      toast.innerHTML = `<span>${mensagem}</span>`;
      toastContainer.appendChild(toast);

      requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0) scale(1)';
      });

      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-10px) scale(0.95)';
        setTimeout(() => toast.remove(), 300);
      }, 4000);
    }
  };
})();

// Attach to window
window.LitoralState = LitoralState;
