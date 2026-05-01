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