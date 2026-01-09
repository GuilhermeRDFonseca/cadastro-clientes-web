// ============================
// OBTER TODOS OS CLIENTES
// ============================
async function obterClientes() {
    const response = await fetch("http://localhost:3000/clientes");
    return await response.json();
}



// ============================
// CADASTRAR CLIENTE
// ============================
async function cadastrarCliente(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;

    const novoCliente = { nome, email, telefone };

    await fetch("http://localhost:3000/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoCliente)
    });

    alert("Cliente cadastrado com sucesso!");
    window.location.href = "listar.html";
}



// ============================
// LISTAR CLIENTES
// ============================
async function listarClientes() {
    const clientes = await obterClientes();
    const tabela = document.getElementById("tabelaClientes");
    if (!tabela) return;

    tabela.innerHTML = "";

    clientes.forEach((cliente) => {
        tabela.innerHTML += `
      <tr>
        <td>${cliente.nome}</td>
        <td>${cliente.email}</td>
        <td>${cliente.telefone}</td>
        <td>
          <button onclick="editarCliente('${cliente.id}')">Editar</button>
          <button onclick="excluirCliente('${cliente.id}')">Excluir</button>
        </td>
      </tr>
    `;
    });
}

listarClientes(); // executa apenas na página listar



// ============================
// EXCLUIR CLIENTE
// ============================
async function excluirCliente(id) {
    await fetch(`http://localhost:3000/clientes/${id}`, {
        method: "DELETE"
    });

    listarClientes();
}



// ============================
// PREPARAR EDIÇÃO
// ============================
function editarCliente(id) {
    localStorage.setItem("editarId", id);
    window.location.href = "editar.html";
}



// ============================
// SALVAR EDIÇÃO
// ============================
async function salvarEdicao(event) {
    event.preventDefault();

    const id = localStorage.getItem("editarId");

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;

    await fetch(`http://localhost:3000/clientes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, telefone })
    });

    alert("Cliente atualizado com sucesso!");
    localStorage.removeItem("editarId");
    window.location.href = "listar.html";
}



// ============================
// CARREGAR DADOS PARA O EDITAR
// ============================
async function carregarEdicao() {
    const id = localStorage.getItem("editarId");
    if (!id) return;

    const response = await fetch(`http://localhost:3000/clientes/${id}`);
    const cliente = await response.json();

    document.getElementById("nome").value = cliente.nome;
    document.getElementById("email").value = cliente.email;
    document.getElementById("telefone").value = cliente.telefone;
}

// carregarEdicao() será executado somente no editar.html
carregarEdicao();
