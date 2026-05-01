document.getElementById('btn-salvar').addEventListener('click', salvarObra); 

function salvarObra() { 

  const titulo     = document.getElementById('titulo').value.trim(); 
  const tecnica    = document.getElementById('tecnica').value; 
  const colecao    = document.getElementById('colecao').value; 
  const preco      = Number(document.getElementById('preco').value); 
  const imagem     = document.getElementById('imagem').value.trim(); 
  const disponivel = document.getElementById('disponivel').value === 'true'; 

  if (!titulo || !preco || !imagem) { 
    alert('Preencha título, preço e URL da imagem.'); 
    return; 
  } 
  const obra = { 
    id: Date.now(), 
    titulo, 
    tecnica, 
    colecao, 
    preco, 
    imagem, 
    disponivel 

  }; 

  const obras = JSON.parse(localStorage.getItem('obras') || '[]'); 
  obras.push(obra); 
  localStorage.setItem('obras', JSON.stringify(obras)); 
  limparFormulario(); 
  renderizarLista(); 
  alert('Obra salva com sucesso!'); 

} 
 
function excluirObra(id) { 

  if (!confirm('Tem certeza que deseja excluir esta obra?')) return; 
  const obras = JSON.parse(localStorage.getItem('obras') || '[]'); 
  const novas = obras.filter(o => o.id !== id); 
  localStorage.setItem('obras', JSON.stringify(novas)); 
  renderizarLista(); 
} 

function limparFormulario() { 
  document.getElementById('titulo').value  = ''; 
  document.getElementById('preco').value   = ''; 
  document.getElementById('imagem').value  = ''; 
  document.getElementById('tecnica').selectedIndex    = 0; 
  document.getElementById('colecao').selectedIndex    = 0; 
  document.getElementById('disponivel').selectedIndex = 0; 
} 

function renderizarLista() { 
  const obras = JSON.parse(localStorage.getItem('obras') || '[]'); 
  const lista = document.getElementById('lista-admin'); 
  if (obras.length === 0) { 
    lista.innerHTML = '<p>Nenhuma obra cadastrada ainda.</p>'; 
    return; 
  } 

  lista.innerHTML = obras.map(o => ` 
    <div class="item-lista-admin"> 
      <span>${o.titulo} — ${o.tecnica} — R$ ${o.preco.toLocaleString('pt-BR')}</span> 
      <button class="btn" onclick="excluirObra(${o.id})">Excluir</button> 
    </div> 
  `).join(''); 

} 
renderizarLista(); 