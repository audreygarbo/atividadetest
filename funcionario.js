class Funcionario {
    constructor(nome, idade, cargo) {
      this.nome = nome;
      this.idade = idade;
      this.cargo = cargo;
    }
  
    seApresentar() {
      return `Olá, meu nome é ${this.nome}, tenho ${this.idade} anos e sou ${this.cargo}.`;
    }
  
    trabalhar() {
      return `${this.nome} está trabalhando atualmente.`;
    }
  }
  
  class Gerente extends Funcionario {
    constructor(nome, idade, cargo, departamento) {
      super(nome, idade, cargo);
      this.departamento = departamento;
    }
  
    gerenciar() {
      return `${this.nome} está gerenciando o departamento de ${this.departamento}.`;
    }
  }
  
  class Desenvolvedor extends Funcionario {
    constructor(nome, idade, cargo, linguagem) {
      super(nome, idade, cargo);
      this.linguagem = linguagem;
    }
  
    programar() {
      return `${this.nome} está programando em ${this.linguagem}.`;
    }
  }
  
  function validarDados(nome, idade, cargo, departamento, linguagem) {
    if (!nome || !idade || !cargo) {
      throw new Error("Todos os campos obrigatórios devem ser preenchidos.");
    }
    if (isNaN(idade) || idade <= 0) {
      throw new Error("A idade deve ser um número inteiro positivo.");
    }
    if (cargo !== "Gerente" && cargo !== "Desenvolvedor") {
      throw new Error("Cargo inválido.");
    }
    if (cargo === "Gerente" && !departamento) {
      throw new Error("O campo 'Departamento' é obrigatório para gerentes.");
    }
    if (cargo === "Desenvolvedor" && !linguagem) {
      throw new Error("O campo 'Linguagem' é obrigatório para desenvolvedores.");
    }
  }
  
  function exibirMensagem(mensagem, tipo = 'error') {
    const mensagensDiv = document.getElementById('mensagens');
    const p = document.createElement('p');
    p.textContent = mensagem;
    p.classList.add(tipo);
    mensagensDiv.appendChild(p);
  }
  
  document.getElementById('formFuncionario').addEventListener('submit', (event) => {
    event.preventDefault();
  
    try {
      const nome = document.getElementById('nome').value;
      const idade = parseInt(document.getElementById('idade').value);
      const cargo = document.getElementById('cargo').value;
      const departamento = document.getElementById('departamento').value;
      const linguagem = document.getElementById('linguagem').value;
  
      validarDados(nome, idade, cargo, departamento, linguagem);
  
      let funcionario;
      if (cargo === "Gerente") {
        funcionario = new Gerente(nome, idade, cargo, departamento);
      } else {
        funcionario = new Desenvolvedor(nome, idade, cargo, linguagem);
      }
  
      const resultadoDiv = document.getElementById('resultado');
      resultadoDiv.innerHTML = `
        <p>${funcionario.seApresentar()}</p>
        <p>${funcionario.trabalhar()}</p>
        ${cargo === "Gerente" ? `<p>${funcionario.gerenciar()}</p>` : ''}
        ${cargo === "Desenvolvedor" ? `<p>${funcionario.programar()}</p>` : ''}
      `;
  
      exibirMensagem('Funcionário cadastrado com sucesso!', 'success');
      document.getElementById('formFuncionario').reset();
    } catch (error) {
      exibirMensagem(error.message);
    }
  });