const numeroSenha = document.querySelector('.parametro-senha__texto'); // cria um selecionador baseado no nome da classe em html
let tamanhoSenha = 12; // cria uma variavel para guardar o tamanho da senha
numeroSenha.textContent = tamanhoSenha;
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ'; // define as letras que serao utilizadas ne senha
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz'; // define as letras que serao utilizadas ne senha
const numeros = '0123456789'; // define as numeros que serao utilizadas ne senha  
const simbolos = '!@%*?'; // define as simbolos que serao utilizadas ne senha
const botoes = document.querySelectorAll('.parametro-senha__botao'); // cria um selecionador baseado no nome da classe em html
const campoSenha = document.querySelector('#campo-senha');// cria a constante campo senha
const checkbox = document.querySelectorAll('.checkbox'); // checkboces
const forcaSenha = document.querySelector('.forca'); // variavel para verificar a forca da senha

botoes[0].onclick = diminuiTamanho; // define os botoes em javascript
botoes[1].onclick = aumentaTamanho;
console.log(botoes);

function diminuiTamanho() {  // diminui o tamanho da senha
    if (tamanhoSenha > 1) { // faz com que o valor não va para numeros negativos
        tamanhoSenha = tamanhoSenha - 1; // reduz 1 no tamanho da senha
        //tamanhoSenha--; // reduz 1 no tamanho da senha
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}
function aumentaTamanho() { //aumenta o tamanho da senha
    if (tamanhoSenha < 20) { //faz com que o valor nao passe de 20
        tamanhoSenha = tamanhoSenha + 1; //adiciona 1 ao tamanho da senha
        //tamanhoSenha++;  //adiciona 1 ao tamanho da senha
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

for (i = 0; i < checkbox.length; i++) { // verifica quais checkbox estao selecionadas
    checkbox[i].onclick = geraSenha;
}

geraSenha(); //executa a função geraSenha
function geraSenha() { //gera a senha 
    let alfabeto = '';
    if (checkbox[0].checked) {
        alfabeto = alfabeto + letrasMaiusculas; // adiociona o alfabeto de maiusculas aos valores que serao utilizados
    }
    if (checkbox[1].checked) {
        alfabeto = alfabeto + letrasMinusculas; // adiociona o alfabeto de minusculas aos valores que serao utilizados
    }
    if (checkbox[2].checked) {
        alfabeto = alfabeto + numeros; // adiociona o alfabeto de numeros aos valores que serao utilizados
    }
    if (checkbox[3].checked) {
        alfabeto = alfabeto + simbolos; // adiociona o alfabeto de simbolos aos valores que serao utilizados
    } 

    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++) { //laço de repetição
        let numeroAleatorio = Math.random() * alfabeto.length; //gera um valor aleatorio
        numeroAleatorio = Math.floor(numeroAleatorio); //arredonda o valor 
        senha = senha + alfabeto[numeroAleatorio]; //se baseando no valor aleatorio criado acima seleciona a posição equivalente a este valor na lista de letrasMaiusculas

    }
    campoSenha.value = senha;
    classificaSenha(alfabeto.length);
}

function classificaSenha(tamanhoAlfabeto) {  //classifica a senha 
    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    forcaSenha.classList.remove('fraca','media','forte');
    if (entropia > 57){
        forcaSenha.classList.add('forte');
    } else if (entropia > 35 && entropia < 57 ) {
        forcaSenha.classList.add('media');
    } else if (entropia <= 35){
        forcaSenha.classList.add('fraca');
    }
    const valorEntropia = document.querySelector('.entropia');
    valorEntropia.textContent = "Um computador pode levar até " + Math.floor(2**entropia/(100e6*60*60*24)) + " dias para descobrir essa senha."; // retorna o tempo necessario para quebrar a senha em dias
}


