document.addEventListener('DOMContentLoaded' , async  () => {

const cotacoes =  await buscarCotacoes();

const currencyBar = document.getElementById('currency-bar');

if(currencyBar && cotacoes){
        currencyBar.innerHTML = `<span><strong>USD:</strong> R$ ${cotacoes.dolar}</span> | <span><strong>EUR:</strong> R$ ${cotacoes.euro}</span>`;
    }

const precosBRL = document.querySelectorAll('.preco-brl');

if(precosBRL.length > 0 && cotacoes) {
    precosBRL.forEach(element => {
    const valorReal = parseFloat(element.innerText.replace('R$', '').replace(/\./g, '').replace(',', '.'));
    const valorUSD = (valorReal/cotacoes.dolar).toFixed(2)

    const infoConversao = document.createElement('p');
    infoConversao.className = 'preco-convertido';
    infoConversao.innerHTML = `<strong>USD:</strong> $ ${valorUSD}`;

    element.parentElement.appendChild(infoConversao);
    });
}

const formAdquirir = document.getElementById('form-adquirir');
if(formAdquirir) {
    formAdquirir.addEventListener('submit', (evento)  => {
        evento.preventDefault(); 

        const nome = document.getElementById('campo-nome').value.trim();
        const email = document.getElementById('campo-email').value.trim();
        const telefone = document.getElementById('campo-telefone').value.trim();

        if (!nome || !email || !telefone) {
            alert("Carlos ventura precisa do seu nome, e-mail e telefone para retornar o contato!");
        } else {
            const dadosParaSalvar = { nome, email, telefone };

            fetch('http://localhost:3000/contato', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(dadosParaSalvar) 
            })
            .then(resposta => {
                if (resposta.ok) {
                    formAdquirir.style.display = 'none';

                    const divSucesso = document.getElementById('form-success');
                    if (divSucesso) {
                        divSucesso.style.display = 'block';
                    }
                    formAdquirir.reset();
                } else {
                    alert("Erro ao salvar no servidor. Tente novamente.");
                }
            })
            .catch(erro => {
                console.error("Erro na conexão com o servidor:", erro);
                alert("O servidor está desligado! Ligue o Node.js no terminal.");
            });
        }
    });

}
    

});
let taxaDolar = null;
let taxaEuro  = null;
let filtroAtivo = { tecnica: 'todos', colecao: 'todos', preco: 'todos' };

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

function initFadeIn() {
  const els = document.querySelectorAll('.fade-in');
  const obs  = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.12 });
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
            ? `<a href="adquirir.html?id=${o.id}" class="btn btn-outline-gold">Adquirir Obra</a>`
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
 
  initFadeIn();
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
