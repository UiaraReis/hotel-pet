// Navegação: mostra a tela escolhida no menu e esconde as outras
function mostrarTela(idTela) {
    document.querySelectorAll('.tela').forEach(tela => {
        tela.classList.add('oculta');
    });
    document.getElementById(idTela).classList.remove('oculta');

    document.querySelectorAll('.menu button').forEach(botao => {
        botao.classList.remove('ativo');
    });
    document.getElementById('menu-' + idTela).classList.add('ativo');
}

// Busca de reservas por campos específicos
function realizarBusca() {
    let id = document.getElementById('filtroId').value.toLowerCase();
    let proprietario = document.getElementById('filtroProprietario').value.toLowerCase();
    let pet = document.getElementById('filtroPet').value.toLowerCase();
    let status = document.getElementById('filtroStatus').value.toLowerCase();

    let linhas = document.querySelectorAll('.item-lista');

    linhas.forEach(linha => {
        let c = linha.cells;
        let combina =
            c[0].textContent.toLowerCase().includes(id) &&
            c[1].textContent.toLowerCase().includes(pet) &&
            c[2].textContent.toLowerCase().includes(proprietario) &&
            c[5].textContent.toLowerCase().includes(status);

        linha.style.display = combina ? '' : 'none';
    });
}

function limparBusca() {
    document.getElementById('filtroId').value = '';
    document.getElementById('filtroProprietario').value = '';
    document.getElementById('filtroPet').value = '';
    document.getElementById('filtroStatus').value = '';
    realizarBusca();
}

// Busca simples usada nas telas de Pets e Usuários
function buscarTabela(idCampo, idTabela) {
    let termo = document.getElementById(idCampo).value.toLowerCase();
    let linhas = document.querySelectorAll('#' + idTabela + ' tbody tr');

    linhas.forEach(linha => {
        let texto = linha.textContent.toLowerCase();
        linha.style.display = texto.includes(termo) ? '' : 'none';
    });
}

// Pergunta o novo valor de cada coluna que pode ser editada
function editarLinha(botao, colunas) {
    let linha = botao.parentNode.parentNode;
    let titulos = linha.parentNode.parentNode.querySelectorAll('thead th');

    colunas.forEach(indice => {
        let atual = linha.cells[indice].innerText;
        let novo = prompt('Editar ' + titulos[indice].innerText + ':', atual);

        if (novo !== null && novo.trim() !== '') {
            linha.cells[indice].innerText = novo.trim();
        }
    });
}

// O gerente pode editar até reservas finalizadas
function editarReserva(botao) {
    editarLinha(botao, [1, 3, 4, 5]);
}

function editarPet(botao) {
    editarLinha(botao, [0, 1, 2, 3, 4]);
}

function excluirLinha(botao) {
    if (confirm('Deseja realmente excluir este registro?')) {
        botao.parentNode.parentNode.remove();
    }
}

// Troca a função do usuário entre cliente, funcionário e gerente
function trocarFuncao(select) {
    let nome = select.parentNode.parentNode.cells[0].innerText;
    document.getElementById('avisoUsuarios').innerText =
        'A função de ' + nome + ' agora é ' + select.value + '.';
}

// Configurações do gerente: valor da diária e número de vagas
function salvarConfiguracoes() {
    let diaria = parseFloat(document.getElementById('valorDiaria').value);
    let vagas = parseInt(document.getElementById('numeroVagas').value);
    let aviso = document.getElementById('avisoConfig');

    if (isNaN(diaria) || diaria < 0 || isNaN(vagas) || vagas < 0) {
        aviso.innerText = 'Informe valores válidos para a diária e para as vagas.';
        return;
    }

    aviso.innerText = 'Configurações salvas: diária de R$ ' + diaria.toFixed(2) +
        ' e ' + vagas + ' vagas.';
}