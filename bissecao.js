// Função para avaliar a expressão matemática usando math.js
function leFuncao(expr, x) {
    const scope = { x: x };
    return math.evaluate(expr, scope);
}

// Método da bisseção
function metodoBissecao(f, a, b, tol) {
    if (f(a) * f(b) >= 0) {
        return "Erro: A função deve trocar de sinal no intervalo [a, b].";
    }    
    
    let c_velho;
    let c_novo = null;
    let erro = null;
    let iteracao = 0;

    const tabela = document.getElementById("resultado-tabela").getElementsByTagName('tbody')[0];
    tabela.innerHTML = '';

    do{
        c_velho = c_novo;
        c_novo = (a+b)/2;
        iteracao++;

        if(c_velho != null){
            erro = Math.abs((c_novo - c_velho)/c_novo) * 100;
        }

        const novaLinha = tabela.insertRow();
        novaLinha.insertCell().innerText = iteracao;
        novaLinha.insertCell().innerText = a;
        novaLinha.insertCell().innerText = b;
        novaLinha.insertCell().innerText = c_novo;
        novaLinha.insertCell().innerText = f(a);
        novaLinha.insertCell().innerText = f(b);
        novaLinha.insertCell().innerText = f(c_novo);
        novaLinha.insertCell().innerText = erro ? erro.toFixed(4) : 'N/A';

        if(f(a)*f(c_novo) < 0){
            b = c_novo;
        }
        else if (f(b)*f(c_novo) < 0){
            a = c_novo;
        }
    }
    while(c_velho == null || tol < erro);
    

    return c_novo;
}

document.getElementById("botao").addEventListener("click", function(){
    document.getElementById("cabecalho").style.display = 'table-header-group';
});

// Manipulador de eventos para o formulário
document.getElementById("form-bissecao").addEventListener("submit", function(event) {
    event.preventDefault();

    const funcStr = document.getElementById("funcao").value;
    const a = parseFloat(document.getElementById("a").value);
    const b = parseFloat(document.getElementById("b").value);
    let tol = parseFloat(document.getElementById("tolerancia").value);


    // Recebe a função
    const func = (x) => leFuncao(funcStr, x);

    // Calcula a raiz usando o método da bisseção
    const raiz = metodoBissecao(func, a, b, tol);

    // Resultado
    document.getElementById("result").innerText = `A raiz encontrada é: ${raiz}`;
});
