// Função de busca para o Hotel Pet
function realizarBusca() {
    let termo = document.getElementById('campoBusca').value.toLowerCase();
    let itens = document.querySelectorAll('.item-lista');

    itens.forEach(item => {
        let texto = item.textContent.toLowerCase();
        if (texto.includes(termo)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}
function editarReserva(botao) {
    let linha = botao.parentNode.parentNode;
    let pet = linha.cells[0].innerText;
    let novoPet = prompt("Editar nome do Pet:", pet);

    if (novoPet !== null && novoPet.trim() !== "") {
        linha.cells[0].innerText = novoPet;
    }
}