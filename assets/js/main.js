
  let obras = [
  {
    id: 1,
    nome: "Sertão Ardente",
    tecnica: "Óleo",
    ano: 2022,
    dimensoes: "80×100 cm",
    preco: 4800,
    colecao: "Sertão e Silêncio",
    descricao: "A imensidão do sertão nordestino capturada em tons de ocre e vermelho, numa composição que evoca o calor, a secura e a beleza intensa da caatinga.",
    disponivel: true,
    img: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&q=80"
  },
  {
    id: 2,
    nome: "Mangue ao Entardecer",
    tecnica: "Aquarela",
    ano: 2023,
    dimensoes: "50×70 cm",
    preco: 2900,
    colecao: "Paisagens Urbanas",
    descricao: "Reflexos dourados nos canais do mangue, um espelho d'água que guarda a memória de gerações. Aquarela em papel de algodão 300g.",
    disponivel: true,
    img: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=600&q=80"
  },
  {
    id: 3,
    nome: "Silêncio da Pedra",
    tecnica: "Acrílico",
    ano: 2021,
    dimensoes: "100×120 cm",
    preco: 6500,
    colecao: "Sertão e Silêncio",
    descricao: "Formações rochosas do interior do Nordeste em explosão de cores acrílicas. A pedra como personagem, como testemunha do tempo.",
    disponivel: false,
    img: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&q=80"
  },
  {
    id: 4,
    nome: "Recife de Noite",
    tecnica: "Óleo",
    ano: 2023,
    dimensoes: "70×90 cm",
    preco: 5200,
    colecao: "Paisagens Urbanas",
    descricao: "O skyline de Recife sob a luz artificial — pontes, rio e cidade se fundem numa dança luminosa sobre tela. Óleo com espátula.",
    disponivel: true,
    img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80"
  },
  {
    id: 5,
    nome: "Caatinga Florescendo",
    tecnica: "Aquarela",
    ano: 2020,
    dimensoes: "40×60 cm",
    preco: 1900,
    colecao: "Sertão e Silêncio",
    descricao: "Após a chuva, o sertão explode em vida. Uma celebração da resiliência nordestina em transparências de aquarela.",
    disponivel: false,
    img: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=600&q=80"
  },
  {
    id: 6,
    nome: "Olinda Vista do Mar",
    tecnica: "Óleo",
    ano: 2024,
    dimensoes: "90×110 cm",
    preco: 7800,
    colecao: "Paisagens Urbanas",
    descricao: "As torres barrocas de Olinda emergem da névoa matinal. Óleo com pinceladas impressionistas que capturam a leveza da brisa atlântica.",
    disponivel: true,
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80"
  }
]; 

const obrasDoAdmin = JSON.parse(localStorage.getItem('obras')) || [];

obras = [...obras, ...obrasDoAdmin];

let taxaDolar = null;
let taxaEuro  = null;
let filtroAtivo = { tecnica: 'todos', colecao: 'todos', preco: 'todos' };

function converterPreco(brl) {

  if (!taxaDolar || !taxaEuro) return '';

  const usd = (brl / taxaDolar).toFixed(2);
  const eur = (brl / taxaEuro).toFixed(2);

  return `US$ ${usd} · €${eur}`;
}

function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
}

function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    const spans = toggle.querySelectorAll('span');
    spans.forEach(s => s.style.background = links.classList.contains('open') ? '#B8963E' : '');
  });
}

function scrollInterativo() {
  const els = document.querySelectorAll('.fade-in');

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  els.forEach(el => obs.observe(el));
}
function renderObras(lista) {
  const grid = document.getElementById('obras-grid');
  if (!grid) return;
 
  if (lista.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:4rem;color:var(--muted)">
      <p style="font-family:var(--serif);font-size:1.5rem">Nenhuma obra encontrada</p>
      <p style="font-size:0.85rem;margin-top:0.5rem">Tente outros filtros</p>
    </div>`;
    return;
  }
 grid.innerHTML = lista.map(o => `
    <article class="obra-card fade-in" data-id="${o.id}">
      <div class="obra-img-wrap">
        <img src="${o.img}" alt="${o.nome}" loading="lazy">
        ${!o.disponivel ? '<span class="badge-vendido">Vendido</span>' : ''}
        <div class="obra-overlay">
          ${o.disponivel
            ? `<a href="adquirir.html?id=${o.id}" class="btn btn-outline-escuro">Adquirir Obra</a>`
            : `<span class="btn btn-outline" style="color:#fff;border-color:rgba(255,255,255,0.3);cursor:default">Esgotada</span>`
          }
        </div>
      </div>
      <div class="obra-info">
        <div class="obra-tecnica">${o.tecnica} · ${o.ano}</div>
        <h3 class="obra-nome">${o.nome}</h3>
        ${o.disponivel
          ? `<div class="obra-preco">R$ ${o.preco.toLocaleString('pt-BR')}</div>
             <div class="obra-preco-conv" data-preco-brl="${o.preco}">${converterPreco(o.preco)}</div>`
          : `<div class="obra-preco" style="color:var(--sold)">Vendida</div>`
        }
      </div>
    </article>
  `).join('');
 
  scrollInterativo();
}
function aplicarFiltros() {
  let resultado = [...obras];
 
  if (filtroAtivo.tecnica !== 'todos') {
    resultado = resultado.filter(o => o.tecnica === filtroAtivo.tecnica);
  }
  if (filtroAtivo.colecao !== 'todos') {
    resultado = resultado.filter(o => o.colecao === filtroAtivo.colecao);
  }
  if (filtroAtivo.preco !== 'todos') {
    const [min, max] = filtroAtivo.preco.split('-').map(Number);
    resultado = resultado.filter(o => {
      if (!max) return o.preco >= min;
      return o.preco >= min && o.preco <= max;
    });
  }
 
  renderObras(resultado);
}
 
function initFiltros() {
  document.querySelectorAll('[data-filtro-tecnica]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-filtro-tecnica]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filtroAtivo.tecnica = btn.dataset.filtroTecnica;
      aplicarFiltros();
    });
  });
 
  const selColecao = document.getElementById('sel-colecao');
  if (selColecao) {
    selColecao.addEventListener('change', () => {
      filtroAtivo.colecao = selColecao.value;
      aplicarFiltros();
    });
  }
 
  const selPreco = document.getElementById('sel-preco');
  if (selPreco) {
    selPreco.addEventListener('change', () => {
      filtroAtivo.preco = selPreco.value;
      aplicarFiltros();
    });
  }
}
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}
function initHeroObras() {
  const grid = document.getElementById('destaque-grid');
  if (!grid) return;
  const destaques = obras.filter(o => o.disponivel).slice(0, 3);
  grid.innerHTML = destaques.map(o => `
    <article class="obra-card fade-in">
      <div class="obra-img-wrap">
        <img src="${o.img}" alt="${o.nome}" loading="lazy">
        <div class="obra-overlay">
          <a href="adquirir.html?id=${o.id}" class="btn btn-outline-escuro">Adquirir</a>
        </div>
      </div>
      <div class="obra-info">
        <div class="obra-tecnica">${o.tecnica} · ${o.ano}</div>
        <h3 class="obra-nome">${o.nome}</h3>
        <div class="obra-preco">R$ ${o.preco.toLocaleString('pt-BR')}</div>
        <div class="obra-preco-conv" data-preco-brl="${o.preco}">${converterPreco(o.preco)}</div>
      </div>
    </article>
  `).join('');
   scrollInterativo();
}
function initFormAdquirir() {
  const form = document.getElementById('form-adquirir');
  if (!form) return;
 
  const params = new URLSearchParams(window.location.search);
  const idObra = parseInt(params.get('id'));
  const obra   = obras.find(o => o.id === idObra);
  let nomeDaObraSelecionada = "Contato Geral"; 
 
  if (obra) {
    nomeDaObraSelecionada = obra.nome;
    const el = document.getElementById('form-obra-info');
    if (el) {
      el.innerHTML = `
        <img src="${obra.img}" alt="${obra.nome}" class="form-obra-img">
        <div class="obra-tecnica">${obra.tecnica} · ${obra.dimensoes}</div>
        <div class="form-obra-nome">${obra.nome}</div>
        <div class="form-obra-detalhes">${obra.ano} · ${obra.colecao}</div>
        <div class="form-obra-preco">R$ ${obra.preco.toLocaleString('pt-BR')}</div>
        <div style="font-size:0.75rem;color:var(--muted);margin-top:0.3rem"></div>
      `;
    }
  }
 
  form.addEventListener('submit', (e) => {
    e.preventDefault(); 
 
    const nome     = document.getElementById('campo-nome').value.trim();
    const email    = document.getElementById('campo-email').value.trim();
    const telefone = document.getElementById('campo-telefone').value.trim();
    
    const mensagemInput = document.getElementById('campo-msg');
    const mensagem = mensagemInput ? mensagemInput.value.trim() : '';
 
   document.querySelectorAll('.form-group').forEach(g => g.classList.remove('has-error'));

let valido = true;

const grupoNome = document.getElementById('campo-nome').closest('.form-group');
const grupoEmail = document.getElementById('campo-email').closest('.form-group');
const grupoTelefone = document.getElementById('campo-telefone').closest('.form-group');

if (!nome) {
  grupoNome.classList.add('has-error');
  valido = false;
}

const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
if (!email || !emailValido) {
  grupoEmail.classList.add('has-error');
  valido = false;
}

if (!telefone) {
  grupoTelefone.classList.add('has-error');
  valido = false;
}

if (!valido) return;
 
    const dadosParaSalvar = { 
      nome, 
      email, 
      telefone, 
      mensagem, 
      obra: nomeDaObraSelecionada 
    };
 const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3000'
  : 'https://sistema-web-integracao-api-production.up.railway.app';

    fetch(`${API_URL}/contato`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dadosParaSalvar)
    })
    .then(resposta => {
      if (resposta.ok) {
        form.style.display = 'none';
        const divSucesso = document.getElementById('form-success');
        if (divSucesso) divSucesso.style.display = 'block';
        form.reset();
      } else {
        alert("Erro ao salvar no servidor. Tente novamente.");
      }
    })
    .catch(erro => {
      console.error("Erro na conexão com o servidor:", erro);
      alert("O servidor está desligado! Ligue o Node.js no terminal.");
    });
  });
}
 
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const cotacoes = await buscarCotacoes();
    taxaDolar = cotacoes.dolar;
    taxaEuro = cotacoes.euro;
  
    const currencyBar = document.getElementById('currency-bar');
    if(currencyBar && cotacoes){
      currencyBar.innerHTML = `<span><strong>USD:</strong> R$ ${cotacoes.dolar}</span> | <span><strong>EUR:</strong> R$ ${cotacoes.euro}</span>`;
    }
  } catch(e) {
    console.error("Erro ao buscar cotações na inicialização", e);
  }
 
  initNavbar();
  initMobileMenu();
  initHeroObras(); 
  renderObras(obras);
  scrollInterativo();
  initFiltros();
  initFormAdquirir();
});