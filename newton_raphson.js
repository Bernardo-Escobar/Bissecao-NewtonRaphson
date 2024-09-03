// Função para avaliar a expressão matemática usando math.js
function leFuncao(expr, x) {
    const scope = { x: x };
    return math.evaluate(expr, scope);
}

// Método da bisseção
function metodoBissecao(f, d, a, tol) {
 
    
    let x_novo;
    let erro = null;
    let iteracao = 0;

    const tabela = document.getElementById("resultado-tabela").getElementsByTagName('tbody')[0];
    tabela.innerHTML = '';

    do{
        iteracao++;

        x_novo = a-(f(a)/d(a));

        erro = Math.abs((x_novo - a)/x_novo) * 100;

        const novaLinha = tabela.insertRow();
        novaLinha.insertCell().innerText = iteracao;
        novaLinha.insertCell().innerText = a;
        novaLinha.insertCell().innerText = f(a);
        novaLinha.insertCell().innerText = d(a);
        novaLinha.insertCell().innerText = x_novo;
        novaLinha.insertCell().innerText = erro ? erro.toFixed(4) : 'N/A';

        a = x_novo;

    }
    while(tol < erro);
    

    return x_novo;
}

document.getElementById("botao").addEventListener("click", function(){
    document.getElementById("cabecalho").style.display = 'table-header-group';
});

// Manipulador de eventos para o formulário
document.getElementById("form-bissecao").addEventListener("submit", function(event) {
    event.preventDefault();

    const funcStr = document.getElementById("funcao").value;
    const a = parseFloat(document.getElementById("a").value);
    let tol = parseFloat(document.getElementById("tolerancia").value);


    // Recebe a função
    const func = (x) => leFuncao(funcStr, x);

    const deriv = math.derivative(funcStr, 'x');

    const funcDeriv = (x) => leFuncao(deriv.toString(), x);

    // Calcula a raiz usando o método da bisseção
    const raiz = metodoBissecao(func, funcDeriv, a, tol);

    // Resultado
    document.getElementById("result").innerText = `A raiz encontrada é: ${raiz}`;
});
