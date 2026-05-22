function addTarefa(){
    var tabela = document.getElementById("Tabela");
    
    var inputNome = document.getElementById("inputNome");
    var inputData = document.getElementById("inputData");
    var selectSituacao = document.getElementById("selectSituacao");

    if (inputNome.value.trim() === "") {
        alert("Por favor, digite o nome da tarefa.");
        return;
    }
    var numeroSequencial = tabela.rows.length - 3; 

    // Insere a nova linha e define o ID
    var novaTarefa = tabela.insertRow(-1);
    novaTarefa.id = "linha-" + numeroSequencial;
    
    var celulaNumero = novaTarefa.insertCell(0);
    var celulaNome = novaTarefa.insertCell(1);
    var celulaData = novaTarefa.insertCell(2);
    var celulaSituação = novaTarefa.insertCell(3);

    //Preenche as células com os VALORES digitados nos inputs
    celulaNumero.textContent = numeroSequencial;
    celulaNome.textContent = inputNome.value;
    celulaData.textContent = inputData.value;       
    celulaSituação.textContent = selectSituacao.value;


    // isso é para adicionar o botão de excluir na própria linha 
    var celulaExcluir = novaTarefa.insertCell(4);
    celulaExcluir.innerHTML =
        `<button onclick="excluirTarefa('${novaTarefa.id}')">
            Excluir
        </button>`;


    
    var celulaSituação = novaTarefa.insertCell(4);
    celulaSituação.innerHTML =
        `<button onclick="mudarSituacao('${novaTarefa.id}')">
            Mudar Situação
        </button>`;

    var celulaEditar = novaTarefa.insertCell(4);
    celulaEditar.innerHTML =
        `<button onclick="editarTarefa('${novaTarefa.id}')">
            Editar
        </button>`;


    // para limpar o campo de input após a adição da linha
    inputNome.value = "";
    inputData.value = "";
}

function excluirTarefa(idLinha) {
    var linha = document.getElementById(idLinha);

    if (linha) {
        linha.remove();
    }
}

function mudarSituacao(idLinha){

    var linha = document.getElementById(idLinha);

    var celulaSituacao = linha.cells[3];

    if(celulaSituacao.textContent === "A fazer"){
        celulaSituacao.textContent = "Concluído";


    } else {
        celulaSituacao.textContent = "A fazer";

    }
}

function editarTarefa(idLinha){

    var linha = document.getElementById(idLinha);

    // pega os valores atuais
    var nome = linha.cells[1].textContent;
    var data = linha.cells[2].textContent;

    // transforma em inputs
    linha.cells[1].innerHTML =
        `<input type="text" id="editNome" value="${nome}">`;

    linha.cells[2].innerHTML =
        `<input type="date" id="editData" value="${data}">`;


    // muda o botão para salvar
    linha.cells[6].innerHTML =
        `<button onclick="salvarEdicao('${idLinha}')">
            Salvar
        </button>`;
}

function salvarEdicao(idLinha){

    var linha = document.getElementById(idLinha);

    // pega os novos valores
    var novoNome = document.getElementById("editNome").value;
    var novaData = document.getElementById("editData").value;

    linha.cells[1].textContent = novoNome;
    linha.cells[2].textContent = novaData;



    // volta botão editar
    linha.cells[6].innerHTML =
        `<button onclick="editarTarefa('${idLinha}')">
            Editar
        </button>`;
}