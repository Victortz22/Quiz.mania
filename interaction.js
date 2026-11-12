const perguntas = [
    {
        pergunta: "O que significa HTML?",
        respostas: [
            "HyperText Markup Language",
            "HighText Machine Language",
            "HyperTool Multi Language",
            "Home Tool Markup Language"
        ],
        correta: 0
    },
    {
        pergunta: "Qual linguagem é utilizada para estilizar páginas web?",
        respostas: ["Python", "CSS", "Java", "C++"],
        correta: 1
    },
    {
        pergunta: "Qual linguagem adiciona interatividade a um site?",
        respostas: ["HTML", "CSS", "JavaScript", "SQL"],
        correta: 2
    },
    {
        pergunta: "O que significa CPU?",
        respostas: [
            "Central Processing Unit",
            "Computer Personal Unit",
            "Central Program Utility",
            "Control Processing User"
        ],
        correta: 0
    },
    {
        pergunta: "Qual destes é um sistema operacional?",
        respostas: ["Google", "Windows", "HTML", "JavaScript"],
        correta: 1
    }
];

const telaInicial = document.getElementById("start-screen");
const telaQuiz = document.getElementById("quiz");
const telaResultado = document.getElementById("result");

const botaoIniciar = document.getElementById("start-btn");
const botaoProxima = document.getElementById("next-btn");
const botaoReiniciar = document.getElementById("restart-btn");

const perguntaElemento = document.getElementById("question");
const respostasElemento = document.getElementById("answers");
const numeroPergunta = document.getElementById("question-number");
const pontuacaoElemento = document.getElementById("score");
const progresso = document.getElementById("progress");

const resultadoFinal = document.getElementById("final-score");
const mensagem = document.getElementById("message");

let perguntaAtual = 0;
let pontos = 0;
let respondeu = false;

// Iniciar o quiz
botaoIniciar.addEventListener("click", iniciarQuiz);

function iniciarQuiz() {
    perguntaAtual = 0;
    pontos = 0;

    telaInicial.classList.add("hidden");
    telaResultado.classList.add("hidden");
    telaQuiz.classList.remove("hidden");

    mostrarPergunta();
}

// Mostrar pergunta
function mostrarPergunta() {
    respondeu = false;

    const pergunta = perguntas[perguntaAtual];

    perguntaElemento.textContent = pergunta.pergunta;

    numeroPergunta.textContent =
        `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

    pontuacaoElemento.textContent = `Pontos: ${pontos}`;

    progresso.style.width =
        `${((perguntaAtual + 1) / perguntas.length) * 100}%`;

    respostasElemento.innerHTML = "";

    botaoProxima.disabled = true;

    pergunta.respostas.forEach((resposta, indice) => {
        const botao = document.createElement("button");

        botao.textContent = resposta;
        botao.classList.add("answer-btn");

        botao.addEventListener("click", () => {
            verificarResposta(indice);
        });

        respostasElemento.appendChild(botao);
    });
}

// Verificar resposta
function verificarResposta(indice) {
    if (respondeu) return;

    respondeu = true;

    const pergunta = perguntas[perguntaAtual];
    const botoes = respostasElemento.querySelectorAll("button");

    botoes.forEach(botao => {
        botao.disabled = true;
    });

    if (indice === pergunta.correta) {
        pontos += 10;
        botoes[indice].classList.add("correct");
    } else {
        botoes[indice].classList.add("wrong");
        botoes[pergunta.correta].classList.add("correct");
    }

    pontuacaoElemento.textContent = `Pontos: ${pontos}`;

    botaoProxima.disabled = false;
}

// Próxima pergunta
botaoProxima.addEventListener("click", () => {
    if (!respondeu) return;

    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
});

// Mostrar resultado
function mostrarResultado() {
    telaQuiz.classList.add("hidden");
    telaResultado.classList.remove("hidden");

    resultadoFinal.textContent =
        `Você fez ${pontos} de ${perguntas.length * 10} pontos!`;

    if (pontos === 50) {
        mensagem.textContent = "Excelente! Você acertou tudo! 🏆";
    } else if (pontos >= 30) {
        mensagem.textContent = "Muito bem! Você conhece bastante! 🚀";
    } else {
        mensagem.textContent = "Continue estudando e tente novamente! 📚";
    }
}

// Reiniciar
botaoReiniciar.addEventListener("click", iniciarQuiz);