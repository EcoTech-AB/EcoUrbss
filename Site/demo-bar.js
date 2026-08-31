/**
 * demo-bar.js
 * Injects the Demo Role Switcher Bar on every page for Hackathon presentations.
 */
(function () {
  window.addEventListener('DOMContentLoaded', () => {
    // Detect folder context
    const path = window.location.pathname.replace(/\\/g, '/');
    let prefixCidadao = '../ÁREADOCIDADÃO/';
    let prefixEmpresa = '../ÁREADAEMPRESA/';
    let prefixONG = '../Site/';
    let prefixPublic = '../TELAS SEM LOGIN/';

    if (path.includes('TELAS%20SEM%20LOGIN') || path.includes('TELAS SEM LOGIN')) {
      prefixPublic = '';
      prefixCidadao = '../ÁREADOCIDADÃO/';
      prefixEmpresa = '../ÁREADAEMPRESA/';
      prefixONG = '../Site/';
    } else if (path.includes('ÁREADOCIDADÃO') || path.includes('%C3%81READOCIDAD%C3%83O')) {
      prefixCidadao = '';
      prefixPublic = '../TELAS SEM LOGIN/';
      prefixEmpresa = '../ÁREADAEMPRESA/';
      prefixONG = '../Site/';
    } else if (path.includes('ÁREADAEMPRESA') || path.includes('%C3%81READAEMPRESA')) {
      prefixEmpresa = '';
      prefixPublic = '../TELAS SEM LOGIN/';
      prefixCidadao = '../ÁREADOCIDADÃO/';
      prefixONG = '../Site/';
    } else if (path.includes('/Site/') || path.endsWith('/Site')) {
      prefixONG = '';
      prefixPublic = '../TELAS SEM LOGIN/';
      prefixCidadao = '../ÁREADOCIDADÃO/';
      prefixEmpresa = '../ÁREADAEMPRESA/';
    }

    // Determine current role
    let currentRole = 'public';
    if (path.includes('cidadao')) currentRole = 'cidadao';
    else if (path.includes('empresa')) currentRole = 'empresa';
    else if (path.includes('ong') || path.includes('login') || path.includes('cadastro')) currentRole = 'ong';

    const bar = document.createElement('div');
    bar.id = 'litoral-demo-bar';
    bar.innerHTML = `
      <div class="demo-bar-label">
        <span>⚡ Demo Hackathon</span>
      </div>
      <a href="${prefixPublic}index.html" class="demo-btn ${currentRole === 'public' ? 'active' : ''}" title="Portal Público">🌐 Público</a>
      <a href="${prefixCidadao}cidadao1.html" class="demo-btn ${currentRole === 'cidadao' ? 'active' : ''}" title="Área do Cidadão">🙋‍♂️ Cidadão</a>
      <a href="${prefixEmpresa}empresa1.html" class="demo-btn ${currentRole === 'empresa' ? 'active' : ''}" title="Área da Empresa ESG">🏢 Empresa</a>
      <a href="${prefixONG}ong1.html" class="demo-btn ${currentRole === 'ong' ? 'active' : ''}" title="Área da ONG">🌿 ONG</a>
      <button class="demo-btn demo-btn-reset" onclick="LitoralState.resetToDefault()" title="Restaurar dados demo">🔄 Reset</button>
    `;

    document.body.appendChild(bar);
  });
})();
