const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');


function criaLi(){
    const li = document.createElement('li');
    return li;
}

inputTarefa.addEventListener("keypress", function(e){
    if (e.keyCode === 13) {
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
        
    }
})

function limpaInput(){
    inputTarefa.value = '';
    inputTarefa.focus(); //essa função é responsável por trazer o foco do cursor para o input. (MUITO BOA)
}

function botaoExcluir(li){
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute("class", 'apagar')
    botaoApagar.setAttribute("title", 'Apagar essa tarefa')
    li.appendChild(botaoApagar);
}

function criaTarefa(textoInput){
    const li = criaLi() // criando um Li
    li.innerText = textoInput;
    tarefas.appendChild(li);
    limpaInput();
    botaoExcluir(li);
    salvarTarefas();
}

btnTarefa.addEventListener('click', function(){
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
    
})

document.addEventListener('click', function(e){
    const el = e.target;
    if (el.classList.contains('apagar')) {
         el.parentElement.remove(); //o metodo parentElement seleciona o elemento PAI do atributo que estamos selecionando.
         salvarTarefas();
    } 
})

function salvarTarefas(){
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace("Apagar", "").trim();

        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON)
}

function adicionarTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas); //transformand JSON em array

    for (let tarefa of listaDeTarefas){
        criaTarefa(tarefa);
    }

}

adicionarTarefasSalvas();