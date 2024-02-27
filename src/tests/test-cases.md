## Casos de Testes Unitários

##### Componente de listagem: NoteList

- [x] Exibir o Loader quando os dados estiverem sendo carregados.
- [x] Exibir a Lista de Notas quando não estiver carregando e houver notas para exibir.
- [x] Exibir a mensagem informando que não há notas e botão de criar quando quando não estiver carregando e não houver notas para exibir.
- [x] Exibir o Loader e, depois que os dados do Mock estiverem carregados, a Lista de Notas.

##### Componente de Nota: NoteCard

- [x] Exibir as informações da nota corretamente.
- [x] Clicar no card e abrir o modal com as informações da nota.
- [x] Ao clicar no card, abrir o modal e, ao clicar no botão de fechar o modal, fechá-lo.

##### Componente para criar Nota: NewNote

- [x] Renderizar o botão de criar nova nota, clicar nele, abrir o modal e clicar para fechar o modal.
- [x] Preencher os campos, clicar no botão para criar a nota e ver se a função de create é chamada com os parâmetros corretos.

##### Componente de busca: NoteSearch

- [x] Renderizar campo de busca corretamente.
- [x] Digitar no campo, clicar no botão para filtrar e ver se o onSubmitSearchNote é chamado com o valor digitado.

##### Página: Notes

- [x] Renderizar loader e, depois, campo de busca, listagem e botão para criar nota.
- [x] Filtrar nota e ver se apenas ela é renderizada na listagem.
- [x] Criar nova nota e ver se ela é renderizada na listagem.
