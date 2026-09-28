# Plano de tarefas do projeto

## Objetivo

Construir o sistema de achados e perdidos em entregas pequenas, para que todos aprendam Java, Spring Boot, banco de dados, testes e frontend enquanto o produto evolui.

A regra principal é: cada tarefa deve gerar uma mudança pequena, demonstrável e revisada por Pull Request.

## Calendário oficial do Ânima HUB 2026/2

Este projeto faz parte do programa Ânima HUB. Por isso, o desenvolvimento deve acompanhar as datas oficiais abaixo. As datas internas deste documento são metas de organização da equipe e não substituem os prazos da plataforma Way.

| Data | Evento ou prazo |
|---|---|
| 10/09/2026 | Início da seleção dos inscritos |
| 12/09/2026 | Final da seleção dos inscritos |
| 17/09/2026 | Kick-off e início oficial das atividades |
| 21/10/2026 | Entrega da Sprint 1 na plataforma Way |
| 18/11/2026 | Entrega da Sprint 2 na plataforma Way |
| 20/11/2026 | Final para solicitar revisão da avaliação |
| 09/12/2026 | Semifinais do Shark HUB 11 |
| 10/12/2026 | Data final para certificação dos alunos |
| 12/12/2026 | Encerramento do edital 2026/2 |

As datas de eventos de formação ainda estão **a confirmar**. A equipe deve acompanhar os comunicados do orientador, do professor TI HUB, da plataforma Way e dos canais oficiais do Ânima HUB.

### Como interpretar as datas

- **Data interna:** prazo recomendado para terminar o trabalho dentro do GitHub.
- **Data de corte:** prazo oficial em que o artefato precisa estar completo na plataforma Way.
- **Sprint:** período de avaliação. A Sprint 1 pode aceitar atraso conforme as regras do HUB, mas a Sprint 2 atrasada não será avaliada.
- **Entrega técnica:** código funcionando, testes passando, documentação e vídeo de demonstração quando necessário.

O nível da Squad ainda precisa ser confirmado com o orientador. As entregas obrigatórias mudam entre os níveis 1, 2, 3 e 4.

## Arquitetura em camadas

O projeto deve seguir esta direção:

```text
Controller -> Service -> Repository -> Banco de dados
                 |
              Model
```

- **Model/domain:** entidades, enums e regras básicas dos dados.
- **Repository:** acesso ao banco usando Spring Data JPA.
- **Service/application:** regras de negócio e validações; não deve depender de detalhes HTTP.
- **Controller/presentation:** endpoints, entrada/saída HTTP e códigos de resposta.
- **Aplicativo mobile:** telas do React Native e chamadas para a API.
- **Testes:** verificam cada camada e os fluxos principais.

## Regras de trabalho para iniciantes

1. Antes de codar, criar uma Issue com objetivo, critérios de aceite e responsável.
2. Uma branch por tarefa: `feature/nome-curto-da-tarefa`.
3. Fazer commits pequenos e explicativos.
4. Abrir Pull Request para revisão de outro integrante.
5. O autor explica o que aprendeu e como testar a mudança.
6. Não misturar duas funcionalidades na mesma branch.
7. Toda funcionalidade deve ter pelo menos um teste ou uma forma documentada de teste manual.

## Regra de trabalho em paralelo

Nenhuma tarefa deve ficar esperando a conclusão da tarefa de outra pessoa. As tarefas da mesma fase podem ser feitas ao mesmo tempo, em branches separadas.

Para garantir isso:

1. Cada Issue deve ter um objetivo que possa ser entregue e revisado sozinho.
2. Quem trabalha no frontend pode usar dados fictícios enquanto a API ainda não estiver pronta.
3. Quem escreve testes pode testar uma classe isoladamente, usando objetos criados no próprio teste ou mocks.
4. Quem precisa de uma classe ou endpoint que ainda não existe deve documentar o formato esperado e continuar usando um exemplo local.
5. A integração das branches acontece depois que cada tarefa individual já funciona, e não durante o desenvolvimento.
6. Se a tarefa de um colega atrasar, a pessoa não fica parada: ela conclui sua parte com dados de exemplo e informa no Pull Request o que precisará ser conectado depois.
7. Uma tarefa só pode depender de uma decisão ou contrato escrito, nunca da branch ou da presença física do código de outra pessoa.

### O que fazer quando uma tarefa depende de outra funcionalidade

Exemplo: Alan precisa da API para criar a tela, mas a API ainda não está pronta. Alan deve criar a tela usando um objeto de exemplo com `title` e `description`, documentar o formato esperado da resposta e deixar a conexão real para uma pequena tarefa de integração posterior. Assim, Alan entrega a tela e Enzo ou William entrega a API sem bloquear o trabalho dele.

Essa tarefa de integração deve ser criada separadamente, com responsável e prazo próprios. Ela não substitui nem invalida as duas entregas individuais.

## Antes de começar qualquer tarefa

Esta é a sequência que todos devem seguir, mesmo quem nunca programou:

1. **Leia a Issue:** entenda o problema, o resultado esperado e a data de entrega.
2. **Abra o projeto:** abra a pasta do projeto no VS Code e confira se existem os arquivos `pom.xml` e `mvnw.cmd`.
3. **Atualize sua cópia:** no terminal, execute `git pull` para baixar as mudanças da equipe.
4. **Crie sua branch:** execute `git checkout -b feature/nome-da-tarefa`. Branch é uma cópia isolada para não quebrar o código dos colegas.
5. **Estude antes de alterar:** veja os links indicados nesta tarefa e leia o código próximo ao ponto que será modificado.
6. **Faça uma mudança pequena:** implemente somente o que está descrito na Issue.
7. **Execute os testes:** no Windows, execute `./mvnw.cmd test`. Se aparecer erro, copie a mensagem completa antes de tentar corrigir.
8. **Teste manualmente:** inicie a aplicação com `./mvnw.cmd spring-boot:run` e verifique a funcionalidade pela tela, pelo navegador ou pelo Swagger.
9. **Registre a evidência:** tire um print, anote o endpoint testado ou descreva o resultado no Pull Request.
10. **Salve no Git:** execute `git add .`, depois `git commit -m "descreve a mudança"` e `git push -u origin nome-da-sua-branch`.
11. **Abra o Pull Request:** explique o que foi feito, como testar e qual Issue ele resolve. Espere a revisão de outro integrante.

### Palavras básicas

- **Código:** instruções escritas para o computador.
- **Classe:** arquivo que reúne dados e comportamentos relacionados.
- **Endpoint:** endereço da API que recebe uma ação, como criar ou listar um item.
- **Banco de dados:** local onde os registros ficam armazenados.
- **Teste:** código que verifica se o comportamento continua funcionando.
- **Pull Request:** pedido para juntar a sua branch ao código principal depois da revisão.

## Materiais para estudar

Os links oficiais devem ser a primeira referência. Os links do YouTube são buscas de tutoriais para que a equipe escolha uma explicação atualizada e em português ou inglês, conforme a preferência.

### Java, Git e Maven

- [Java 21 - documentação oficial](https://docs.oracle.com/en/java/javase/21/docs/api/index.html)
- [Dev.java - primeiros passos com Java](https://dev.java/learn/)
- [Git - livro oficial em português](https://git-scm.com/book/pt-br/v2)
- [Maven - guia oficial](https://maven.apache.org/guides/getting-started/)
- [YouTube: Java para iniciantes](https://www.youtube.com/results?search_query=java+para+iniciantes+portugues)
- [YouTube: Git e GitHub para iniciantes](https://www.youtube.com/results?search_query=git+e+github+para+iniciantes+portugues)

### Spring Boot e API

- [Spring Boot - documentação oficial](https://docs.spring.io/spring-boot/documentation.html)
- [Spring Guides - guia para criar uma API REST](https://spring.io/guides/gs/rest-service)
- [Spring Guides - acesso a dados com JPA](https://spring.io/guides/gs/accessing-data-jpa)
- [Jakarta Bean Validation](https://jakarta.ee/specifications/bean-validation/)
- [Swagger/OpenAPI com Spring](https://springdoc.org/)
- [YouTube: Spring Boot REST API para iniciantes](https://www.youtube.com/results?search_query=spring+boot+rest+api+para+iniciantes+portugues)

### Banco de dados, testes e aplicativo mobile

- [PostgreSQL - documentação oficial](https://www.postgresql.org/docs/)
- [JUnit 5 - documentação oficial](https://junit.org/junit5/docs/current/user-guide/)
- [Spring Boot - testes](https://spring.io/guides/gs/testing-web)
- [MDN - HTML, CSS e JavaScript](https://developer.mozilla.org/pt-BR/docs/Learn)
- [MDN - Fetch API](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API)
- [React Native - documentação oficial](https://reactnative.dev/docs/getting-started)
- [Expo - documentação oficial](https://docs.expo.dev/)
- [React - documentação oficial](https://react.dev/learn)
- [YouTube: PostgreSQL para iniciantes](https://www.youtube.com/results?search_query=postgresql+para+iniciantes+portugues)
- [YouTube: testes com JUnit 5](https://www.youtube.com/results?search_query=junit+5+java+para+iniciantes+portugues)
- [YouTube: JavaScript para iniciantes](https://www.youtube.com/results?search_query=javascript+para+iniciantes+portugues)
- [YouTube: React Native com Expo para iniciantes](https://www.youtube.com/results?search_query=react+native+expo+para+iniciantes+portugues)

## Divisão inicial da equipe

A pessoa indicada é responsável por conduzir a tarefa, mas outra pessoa deve revisar o Pull Request. A responsabilidade pode rodar a cada sprint para que todos aprendam as camadas.

| Integrante | Primeira responsabilidade | O que deve praticar |
|---|---|---|
| William | Coordenação técnica e domínio de itens | Git, entidades, JPA e integração das branches |
| Enzo | Usuário e autenticação | DTOs, validação, segurança e regras de acesso |
| Alan | Aplicativo mobile e experiência das telas | JavaScript, React, React Native, Expo, navegação, componentes e consumo de API |
| Gabriel | Testes, banco e pesquisa | JUnit, testes HTTP, consultas JPA e qualidade |

## Fases e entregas

### Fase 0 - Preparação do time

**Data interna de entrega: 16/09/2026.**

**Objetivo:** todos conseguem executar, testar e alterar o projeto.

- [ ] **Enzo:** criar um glossário do projeto para iniciantes, explicando palavras como API, endpoint, controller, service, repository, entidade, DTO, branch, commit, teste e Pull Request.
- [ ] **Alan:** configurar o aplicativo mobile em React Native com Expo e criar uma tela inicial simples que possa evoluir.
- [ ] **Gabriel:** verificar o teste de contexto existente e criar um checklist de revisão de Pull Request.

**O que aprender:** organização de projeto, Git, execução do Maven, revisão de código e divisão de responsabilidades.

**Passo a passo do Enzo:**

1. Abra o README e o código das pastas `domain`, `application` e `presentation`.
2. No arquivo `GLOSSARIO.md`, explique obrigatoriamente estes 15 termos: **Java, Spring Boot, Maven, classe, objeto, entidade, `Item`, enum, controller, endpoint, service, repository, DTO, banco de dados e teste automatizado**.
3. Para cada termo, escreva três coisas: o que significa em linguagem simples, em qual arquivo ou pasta ele aparece e um exemplo usando o sistema de achados e perdidos.
4. Use os arquivos atuais como referência: `Item.java`, `ItemStatus.java`, `ItemRepository.java`, `ItemService.java`, `TestController.java`, `pom.xml` e `LostandfoundApplicationTests.java`.
5. Salve o material como `GLOSSARIO.md` e confira se existem 15 explicações, uma para cada termo da lista.
6. Abra um Pull Request contendo o glossário. A tarefa estará concluída quando outro integrante conseguir ler o arquivo e responder, sem consultar outra pessoa, o que cada termo significa no projeto.

**Passo a passo do Alan:**

1. Estude a diferença entre JavaScript, React e React Native usando os links de estudo desta seção.
2. Instale o Node.js e o Expo conforme a documentação oficial. Expo é uma ferramenta que facilita executar o aplicativo React Native durante o desenvolvimento.
3. Crie o aplicativo mobile em uma pasta própria, sem alterar o backend Java.
4. Execute o aplicativo no celular, emulador ou Expo Go e confirme que a tela inicial aparece.
5. Crie uma tela inicial com componentes simples como `View`, `Text` e `Button`.
6. Use `StyleSheet` para organizar as cores, espaçamentos e tamanhos; React Native não usa HTML e CSS exatamente como um site.
7. Salve uma captura da tela funcionando e explique no Pull Request como executar o aplicativo.

**Entrega específica do Alan:** um aplicativo React Native iniciado com Expo, com uma tela inicial funcionando e instruções para executá-lo. Essa entrega pode ser feita mesmo que a API Java ainda não esteja pronta.

**Entrega da fase:** o projeto inicia localmente, todos executam o teste de contexto, o glossário está disponível e a equipe sabe abrir uma branch e um Pull Request antes do Kick-off.

### Fase 1 - Fundação do item

**Data interna de entrega: 30/09/2026.**

**Objetivo:** ter um cadastro mínimo de item funcionando de ponta a ponta.

**O que é uma entrega de ponta a ponta:** o usuário envia dados, o controller recebe, o service aplica a regra, o repository salva no banco e a resposta volta para o usuário.

- [ ] **William:** revisar `Item`, `ItemStatus` e `ItemRepository`; explicar no Pull Request como a entidade é salva no banco e definir campos obrigatórios e estados permitidos.
- [ ] **Enzo:** criar DTO de entrada e validações para título e descrição, sem receber a entidade diretamente no controller; demonstrar o que acontece quando os dados são inválidos.
- [ ] **Gabriel:** escrever testes para criar, listar e buscar item inexistente; registrar no teste qual comportamento está sendo protegido.
- [ ] **Alan:** criar uma tela mobile de cadastro de item em React Native e exibir mensagens de sucesso e erro; documentar como a tela chamará a API.

**Passos independentes para a equipe:**

1. William abre a classe `Item` e o `ItemRepository` no VS Code e explica no Pull Request o que cada campo representa e para que serve o repository. Ele não precisa esperar nenhuma outra tarefa.
2. Enzo cria uma classe de entrada para receber `title` e `description`. Essa classe deve rejeitar título ou descrição vazios antes que os dados sejam salvos. Ele pode testar a classe com exemplos próprios.
3. Gabriel cria testes automatizados na pasta `src/test/java`. Os testes executam o código sozinhos e informam se o resultado foi o esperado. Se a funcionalidade ainda não existir, ele registra o formato esperado e usa um teste isolado ou mock.
4. Alan cria os campos de título e descrição em componentes React Native e conecta o botão a dados fictícios ou ao formato de endpoint documentado. A conexão real com a API será uma Issue separada se necessário.
5. Cada pessoa executa sua própria verificação e registra o resultado no Pull Request. A integração entre as partes só acontece depois das entregas individuais.

### O que significa criar testes?

Um teste automatizado é uma pequena verificação escrita em Java. Ele faz uma pergunta ao sistema e confere a resposta. Por exemplo: “quando envio um item válido, ele deve ser criado” ou “quando envio um título vazio, o sistema deve rejeitar os dados”.

Gabriel deve criar pelo menos estes três testes:

1. **Entrada válida:** enviar um título e uma descrição preenchidos e verificar se o item é salvo ou retornado corretamente.
2. **Entrada inválida:** enviar um título vazio ou uma descrição vazia e verificar se o sistema informa o erro e não salva o item.
3. **Nenhum resultado:** consultar a listagem quando não existem itens e verificar se o sistema retorna uma lista vazia ou uma mensagem adequada, sem quebrar.

Para executar os testes, abra o terminal na pasta do projeto e execute `./mvnw.cmd test`. Se todos funcionarem, o Maven exibirá `BUILD SUCCESS`. Se algum falhar, ele mostrará qual comportamento não funcionou. O arquivo do teste deve ficar próximo do pacote da classe testada, dentro de `src/test/java`.

**Exemplo simples de teste:**

```java
@Test
void deveAceitarItemComTituloEDescricao() {
   Item item = new Item("Mochila", "Mochila preta encontrada na biblioteca");

   assertEquals("Mochila", item.getTitle());
   assertEquals("Mochila preta encontrada na biblioteca", item.getDescription());
}
```

Nesse exemplo, `@Test` informa que o método é um teste e `assertEquals` compara o resultado real com o resultado esperado. O teste passa quando os dois valores são iguais.

**O que aprender:** fluxo de uma requisição, diferença entre entidade e DTO, validação, persistência e teste automatizado.

**Entrega da fase:** cadastrar e listar item perdido pela API e pela primeira tela, com evidência de teste manual e automatizado.

### Fase 2 - Cadastro completo de itens

**Data interna de entrega: 09/10/2026.**

**Objetivo:** atender os fluxos de item perdido e item encontrado.

**O que é uma regra de negócio:** é uma condição do sistema, por exemplo: local e data são obrigatórios e um item recuperado não deve continuar disponível.

- [ ] **William:** adicionar categoria, local, data, horário, características, contato permitido e tipo do registro.
- [ ] **Enzo:** implementar atualização do próprio item e impedir dados obrigatórios ausentes.
- [ ] **Gabriel:** criar testes de validação e testes de persistência com banco de teste.
- [ ] **Alan:** criar dois fluxos de formulário mobile: item perdido e item encontrado, reutilizando componentes React Native quando possível.

**Passos independentes para a equipe:**

1. Cada integrante transforma sua tarefa em uma Issue própria e lista os campos ou comportamentos que serão entregues.
2. William adiciona os campos no model e no banco, usando exemplos locais se a tela ainda não existir.
3. Enzo atualiza o DTO e o service; antes de salvar, o service deve rejeitar dados obrigatórios ausentes. Ele pode testar o service com objetos criados no teste.
4. Gabriel cria um teste para cada regra importante e pode usar um banco de teste ou mocks, sem esperar o frontend.
5. Alan cria a escolha “Item perdido” ou “Item encontrado” usando componentes React Native e dados fictícios; também deixa documentado o formato que a API deverá receber.
6. Cada integrante testa sua parte e abre seu próprio Pull Request. A conexão entre as partes é feita depois, em uma Issue de integração.

**O que aprender:** modelagem de dados, evolução de banco, regras de negócio e reutilização de componentes de interface.

**Entrega da fase:** usuário consegue registrar e editar um item completo com validação clara. Esta fase deve formar a base técnica dos artefatos apresentados na Sprint 1.

### Fase 3 - Usuários e login

**Data interna de entrega: 16/10/2026.**

**Objetivo:** relacionar cada item ao usuário que o cadastrou.

**Atenção:** senha nunca deve ser salva em texto puro. Se houver dúvida sobre segurança, pare a implementação e peça revisão ao orientador.

- [ ] **Enzo:** criar entidade `User`, cadastro, e-mail único, senha protegida e login.
- [ ] **William:** relacionar `Item` e `User` e ajustar serviços e banco sem quebrar dados existentes.
- [ ] **Gabriel:** testar cadastro duplicado, senha inválida, login válido e acesso sem autenticação.
- [ ] **Alan:** criar telas mobile de cadastro, login, logout e estado de usuário conectado usando React Native e navegação entre telas.

**Passos independentes para a equipe:**

1. Cada integrante define em sua Issue os campos, entradas e respostas que irá produzir.
2. Enzo implementa o cadastro e o login usando uma solução segura de senha aprovada pelo orientador, com usuários de exemplo no teste.
3. William cria o relacionamento entre usuário e item usando IDs de exemplo, mesmo que o login ainda não esteja conectado.
4. Gabriel testa cadastro repetido, senha errada, login correto e tentativa de alterar item de outra pessoa usando testes isolados.
5. Alan cria as telas mobile com dados fictícios, navegação entre elas e uma mensagem clara para credenciais inválidas.
6. Depois que as entregas individuais passarem na revisão, a equipe cria uma Issue curta para conectar login, usuário e item.

**O que aprender:** relacionamento entre entidades, autenticação, armazenamento seguro de senhas, autorização e proteção de dados pessoais.

**Entrega da fase:** somente usuário autenticado cria e altera seus itens. O fluxo deve estar pronto para a demonstração da Sprint 1 em 21/10/2026.

### Fase 4 - Listagem, detalhes e pesquisa

**Data interna de entrega: 13/11/2026.**

**Objetivo:** tornar os registros úteis para encontrar um objeto.

**O que o usuário precisa conseguir fazer:** digitar parte do nome, escolher filtros, ver os resultados e abrir um item sem receber dados pessoais desnecessários.

- [ ] **Gabriel:** criar consultas por título, descrição, categoria, local, período e status; definir ordenação e paginação.
- [ ] **William:** implementar endpoint de listagem, detalhes e respostas para nenhum resultado.
- [ ] **Enzo:** revisar privacidade e definir quais dados de contato podem aparecer para cada situação.
- [ ] **Alan:** criar no aplicativo mobile a listagem, os filtros, a paginação e a tela de detalhes usando componentes React Native.

**Passos independentes para a equipe:**

1. Gabriel escreve exemplos de buscas esperadas, como “mochila”, “campus” e “item perdido em determinado período”, e testa as consultas com dados de exemplo.
2. Gabriel cria os métodos de consulta no repository sem depender da tela.
3. William cria endpoints de listagem e detalhes usando respostas HTTP documentadas, mesmo que a pesquisa ainda esteja usando exemplos.
4. Enzo revisa quais dados do responsável podem ser mostrados e documenta a decisão.
5. Alan cria a lista, os filtros, o estado “nenhum resultado” e a tela de detalhes com dados fictícios, adaptados para telas de celular.
6. Depois das revisões, a equipe cria uma Issue de integração para ligar a tela aos endpoints e testar busca parcial, filtro combinado e paginação.

**O que aprender:** consultas com filtros, paginação, ordenação, tratamento de resultados vazios, privacidade e comunicação entre frontend e backend.

**Entrega da fase:** qualquer visitante consegue pesquisar itens disponíveis e abrir seus detalhes sem exposição desnecessária. O resultado deve estar pronto para a Sprint 2 em 18/11/2026.

### Fase 5 - Recuperação e acabamento

**Data interna de entrega: 04/12/2026.**

**Objetivo:** concluir o ciclo de vida do item e preparar uma versão demonstrável.

**O que é o ciclo de vida:** o item começa como perdido ou encontrado e, depois da confirmação, muda para recuperado. Essa mudança não deve acontecer por acidente.

- [ ] **William:** implementar ação para marcar item como recuperado, com confirmação e histórico mínimo.
- [ ] **Enzo:** garantir que somente o responsável ou usuário autorizado possa alterar o status.
- [ ] **Gabriel:** testar autorização, transição de status e regressão dos fluxos anteriores.
- [ ] **Alan:** ocultar ou destacar itens recuperados e melhorar mensagens, acessibilidade e adaptação a diferentes tamanhos de celular.

**Passos independentes para a equipe:**

1. William define o endpoint e a regra de transição para `RECUPERADO` usando um item de exemplo.
2. Enzo verifica a identidade do usuário com IDs fictícios e documenta a regra de autorização.
3. Gabriel testa confirmação, autorização, item inexistente e repetição da operação sem depender da tela.
4. Alan adiciona confirmação visual no React Native, atualiza a listagem e diferencia itens recuperados usando dados fictícios.
5. Cada integrante executa os testes da própria tarefa e registra o resultado no Pull Request.
6. Depois das entregas, a equipe cria uma Issue de integração para conectar cadastro, pesquisa, detalhes e recuperação na demonstração final.

**O que aprender:** transição de estados, autorização de operações importantes, regressão, acessibilidade e preparação de uma demonstração de produto.

**Entrega da fase:** um item recuperado deixa de ser tratado como disponível e o fluxo completo pode ser demonstrado em vídeo até 07/12/2026, antes das semifinais.

## Entregas obrigatórias por nível

Confirme com o orientador em qual nível a Squad está classificada. A tabela abaixo resume o que deve ser preparado para cada Sprint. Os itens devem ser enviados pela plataforma Way, no formato exigido pelo HUB.

| Nível | Sprint 1 - até 21/10/2026 | Sprint 2 - até 18/11/2026 |
|---|---|---|
| 1 - Prototipação e Ideação | Canvas de Produto, Matriz Estratégica e Descrição de Impacto Social | Canvas de Projeto, Pré-projeto em PDF e Pitch em vídeo no YouTube |
| 2 - Pesquisa Aplicada | Canvas de Projeto e Pré-artigo em PDF | Artigo, Protótipos, Pitch e Descrição de Impacto Social |
| 3 - Profissional | Canvas de Projeto, Matriz SWOT e Canvas de Solução | Fluxograma ou Diagrama de Atividades, MVP demonstrado em vídeo, Pitch e Descrição de Impacto Social |
| 4 - Empreendedor | Canvas de Projeto, Matriz 5W2H, Marca e Simulador Financeiro | MVP demonstrado em vídeo, Business Model Canvas, levantamento de coparticipantes, Termo de Uso, Política de Privacidade, Pitch e Descrição de Impacto Social |

### Regras para os artefatos e vídeos

- Ferramentas nativas, como Canvas, Matrizes e Impacto Social, devem ser preenchidas diretamente na plataforma Way.
- PDFs, links de repositórios e aplicações precisam estar acessíveis para avaliação.
- Vídeos de protótipo, MVP e Pitch devem ser publicados no YouTube como **Público-Não Listado** e enviados pela Way.
- O Pitch deve ter no máximo 5 minutos; o vídeo do MVP deve ter entre 2 e 4 minutos e provar que a solução funciona.
- Pelo menos 50% da narração dos vídeos deve ser feita por alunos da Squad.
- O time pode entregar artefatos antes do prazo, mas a avaliação considera o estado do material na data oficial da Sprint.

## Critérios de aceite de cada Issue

Uma Issue só pode ser movida para `Feito` quando:

- o comportamento esperado está escrito e funciona;
- os campos inválidos geram mensagem compreensível;
- o código segue as camadas do projeto;
- existe teste automatizado ou roteiro de teste manual;
- o Pull Request foi revisado por outra pessoa;
- `mvnw.cmd test` passa;
- a documentação foi atualizada quando necessário.

## Primeiras Issues que podem ser feitas em paralelo

1. Todos executam o projeto e o teste de contexto individualmente.
2. William revisa o model e o repository; Gabriel cria testes isolados; Enzo cria DTOs e validações; Alan cria a tela com dados fictícios.
3. Cada integrante abre seu Pull Request sem esperar os demais.
4. Quando as primeiras entregas estiverem disponíveis, uma nova Issue pode conectar as partes. Essa integração não precisa esperar todos os Pull Requests; quem ainda estiver trabalhando continua sua tarefa separadamente.
5. A mesma regra é repetida nas fases seguintes: entregas individuais primeiro, integração depois.

## Definition of Done da versão 1

A versão inicial está pronta quando um usuário consegue:

1. criar uma conta e entrar;
2. cadastrar item perdido ou encontrado;
3. visualizar e pesquisar itens;
4. abrir detalhes sem expor dados indevidos;
5. editar o próprio item;
6. marcar o item como recuperado;
7. receber mensagens claras quando algo der errado.
