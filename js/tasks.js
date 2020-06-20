const TasksElement = document.querySelector('.texto-da-tarefa') // Recebe o texto da tarefa escrita
const SubmitElement = document.querySelector('.Adicionar-tarefa') // Elemento que adiciona a tarefa
const AddedTasks = document.querySelector('.tarefa-adicionada') // Local onde as tarefas aparecem
let TasksLocal = localStorage.getItem('tasks') // onde as tarefas irão ficar armazanadas
 TasksLocal  = JSON.parse(TasksLocal) // converto em string se houver tarefas
if(TasksLocal==null){
    TasksLocal= [] // se não houver tarefas eu inicializo a mesma variável como array
}

/*  Esta função fica responsável por pegar a tarefa no campo
    Ela também verifica se há ou não algo escrito
    Se tiver algo escrito ela chama funções auxiliares
*/
const PegarTarefa = () =>{

    let texto = TasksElement.value.trim()
    if(texto ==""){
        alert('Escreva uma tarefa')
        return 
    }
    AdicionarTarefa(texto)
    TasksLocal.forEach(CriarTarefaInterface) // Cria o elemento na interface para cada tarefa
    localStorage.setItem('tasks',JSON.stringify(TasksLocal)) // Coloca a tarefa como string Json
    Inicializador() // Chama a função que inicializa o conteúdo
    LimpaTexto(TasksElement) // Limpa a caixa de texto
    AtualizarStorage() // Atualiza o armazenamento LocalStorage
}
/* Função atualiza o armazenamento LocalStorage com valores atuais */
const AtualizarStorage = ( ) => {
    localStorage.setItem('tasks',JSON.stringify(TasksLocal))
}
/* Esta função é responsável por criar os elementos
  e colocar as classes (Bootstrap) neles.
  Ela recebe o IdTask para colocar como parâmetro no onclick,
  e recebe também o TextTask para colocar no elemento como
  tarefa  e por fim insere no campo AddedTasks

*/
const CriarTarefaInterface = ( { IdTask, TextTask }) => {

    
    PElement = document.createElement('p') // Cria o elemento p
    ButtonElement = document.createElement('button') // cria o elemento  button
    SpanElement = document.createElement('span') //// cria o elemento  span
    
    ButtonElement.classList.add("close","float-right") // Coloca classes de fechar alinhado a direita
    ButtonElement.setAttribute("type","button") // Botão do tipo Button
    ButtonElement.setAttribute("aria-label","close") // Atributos no Botstrap
    ButtonElement.setAttribute("onclick",`RemoverTarefa(${IdTask})`) // Coloco a função de remover a tarefa 
    SpanElement.innerHTML="&times" // Coloco o 'x' no span dentro do botão em entidade HTML 

    ButtonElement.appendChild(SpanElement) // Adiciono o span dentro do botão
    PElement.textContent = TextTask // Coloco a tarefa dentro do p
    PElement.appendChild(ButtonElement) // Coloco o botão com o span dentro do p
    AddedTasks.appendChild(PElement) // Coloco o p finalizado dentro da area de tarefas
    

}
/* Esta função para remover a tarefa que é adicionada na função CriarTarefaInterface,
   recebe o id do parâmetro onclick, que é o id da tarefa no LocalStorage
   redefine também a variável como sem esta tarefa associada ao id porque foi removido.

*/
const RemoverTarefa = ID => {

TasksLocal =  TasksLocal.filter(TasksLocal => TasksLocal.IdTask !== ID) // filtro as tarefas sem o id
AtualizarStorage() // Atualizo o armazenamento do LocalStorage 
Inicializador() // Inicializo os dados atuais
}
/* Esta função gera um Id aleatório para não limitar id a 8 como você fez  */
const GerarIdTarefa = () => Math.round(Math.random() * 100) 

/* Esta função limpa o texto e recebe o elemento 
   que deseja limpar os valores
*/
const LimpaTexto = ( elemento ) => {
    
    elemento.value=""
}

/* Esta função adiciona uma tarefa como um JSON 
   no array TaskLocal e recebe o texto que é a tarefa  que o 
   usuário escreveu
*/
const AdicionarTarefa = ( texto ) => {
        TasksLocal.push({
        IdTask: GerarIdTarefa(), // Adiciona o Id aleatório
        TextTask: texto // A tarefa escrita
     })

}
/* Esta função inicializa os dados atuais na interface
   ela também limpa a area antes de colocar 
   e atualiza o armazenamento
*/
const Inicializador = ( ) => {

    AddedTasks.innerHTML=''; // Limpa a area de tarefas
    TasksLocal.forEach(CriarTarefaInterface) // Coloca cada tarefa lida  na interface
    AtualizarStorage() // Atualiza o armazenamento  LocalStorage
}
Inicializador() // Começa o inicializador para ler as tarefas que já foram escritas

SubmitElement.addEventListener('click',PegarTarefa) // um listener para o envio da tarefa

/* Lembre sempre de compartilhar conhecimento e não se intimide achando que sabe menos
   ninguém sabe mais do que ninguém, apenas há saberes diferentes. 
   E o mais importante: JESUS TE AMA :)
*/
