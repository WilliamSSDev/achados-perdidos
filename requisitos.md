# Requisitos do Sistema — App de Achados e Perdidos

## 1. Cadastro de usuário

### Objetivo
Permitir que novos usuários criem uma conta no sistema para registrar, consultar e acompanhar itens perdidos ou encontrados.

### Informações
O cadastro deve solicitar:
- Nome completo;
- E-mail;
- Senha;
- Telefone (opcional);
- Cidade ou localização de referência.

### Comportamento da funcionalidade
1. O usuário acessa a opção de cadastro.
2. O sistema apresenta o formulário.
3. O usuário informa os dados obrigatórios.
4. O sistema valida as informações.
5. Caso os dados sejam válidos, a conta é criada.
6. O sistema confirma o cadastro e permite que o usuário faça login.

### Regras de negócio
- O e-mail deve ser único no sistema.
- Campos obrigatórios não podem ficar vazios.
- A senha deve atender aos critérios mínimos de segurança definidos pelo sistema.
- O usuário deve aceitar os termos de uso antes da criação da conta.

### Restrições
- Não é permitido cadastrar dois usuários com o mesmo e-mail.
- Dados inválidos devem impedir a conclusão do cadastro.

---

## 2. Conecte-se (Login)

### Objetivo
Permitir que um usuário cadastrado acesse sua conta.

### Informações
- E-mail;
- Senha.

### Comportamento da funcionalidade
1. O usuário informa e-mail e senha.
2. O sistema verifica os dados cadastrados.
3. Se estiverem corretos, o acesso é liberado.
4. Se estiverem incorretos, o sistema informa que as credenciais são inválidas.

### Regras de negócio
- Somente usuários cadastrados podem acessar a área autenticada.
- A senha deve ser armazenada de forma segura, nunca em texto puro.
- Após o login, o sistema deve identificar o usuário para relacionar seus registros à conta.

### Restrições
- O acesso deve ser bloqueado quando as credenciais forem inválidas.
- Funcionalidades que exigem autenticação não devem ser acessadas sem login.

---

## 3. Cadastro de item perdido

### Objetivo
Permitir que o usuário registre um objeto que perdeu para facilitar sua localização e recuperação.

### Informações
- Nome ou título do item;
- Categoria;
- Descrição detalhada;
- Foto (opcional);
- Local onde foi perdido;
- Data aproximada da perda;
- Horário aproximado (opcional);
- Características que ajudem na identificação;
- Forma de contato, quando aplicável.

### Comportamento da funcionalidade
1. O usuário seleciona a opção de cadastrar item perdido.
2. O sistema apresenta o formulário.
3. O usuário preenche as informações e, se desejar, adiciona uma foto.
4. O sistema valida os campos obrigatórios.
5. O item é registrado com status de “Perdido”.
6. O item passa a aparecer nas listagens e pesquisas.

### Regras de negócio
- Todo item deve estar associado ao usuário que realizou o cadastro.
- O local e a data da perda devem ser informados.
- O item deve possuir uma descrição suficiente para permitir sua identificação.
- O usuário poderá alterar as informações enquanto o item não estiver marcado como recuperado.

### Restrições
- Não permitir cadastro sem os campos obrigatórios.
- Fotos devem respeitar o formato e tamanho máximos definidos pelo sistema.

---

## 4. Cadastro de item encontrado

### Objetivo
Permitir que o usuário registre um objeto encontrado para que o proprietário possa identificá-lo e recuperá-lo.

### Informações
- Nome ou título do item;
- Categoria;
- Descrição;
- Foto (opcional);
- Local onde foi encontrado;
- Data e horário aproximados;
- Características visíveis do item;
- Forma de contato.

### Comportamento da funcionalidade
1. O usuário seleciona “Cadastrar item encontrado”.
2. O sistema apresenta o formulário.
3. O usuário informa os dados do objeto.
4. O sistema valida as informações.
5. O registro é criado com status de “Encontrado”.
6. O item fica disponível para consulta e pesquisa.

### Regras de negócio
- O item encontrado deve ser associado ao usuário responsável pelo registro.
- O local e a data do encontro devem ser informados.
- O usuário não deve publicar informações excessivamente específicas que permitam que terceiros se apropriem indevidamente do objeto.
- O item deve permanecer disponível até ser marcado como recuperado.

### Restrições
- O cadastro não pode ser concluído sem os dados obrigatórios.
- Conteúdo ofensivo, ilegal ou inadequado não deve ser permitido.

---

## 5. Listagem de itens

### Objetivo
Exibir os itens perdidos e encontrados cadastrados no sistema de forma organizada.

### Informações
Cada item da listagem deve apresentar, quando disponível:
- Foto;
- Nome do item;
- Categoria;
- Status;
- Local;
- Data;
- Breve descrição.

### Comportamento da funcionalidade
1. O sistema consulta os itens cadastrados.
2. Os itens são exibidos em uma lista ou grade.
3. O usuário pode selecionar um item para visualizar seus detalhes.
4. Itens recuperados podem ser ocultados da listagem principal ou identificados claramente como recuperados.

### Regras de negócio
- Somente registros válidos devem aparecer na listagem.
- A ordenação padrão deve priorizar itens mais recentes.
- Itens recuperados não devem ser apresentados como disponíveis para recuperação.

### Restrições
- A listagem deve possuir paginação ou carregamento progressivo quando houver muitos registros.
- Informações pessoais do usuário não devem ser exibidas sem necessidade.

---

## 6. Pesquisa e filtros

### Objetivo
Permitir que o usuário encontre rapidamente um item perdido ou encontrado por meio de palavras-chave e filtros.

### Informações
A pesquisa pode utilizar:
- Nome do item;
- Categoria;
- Local;
- Data ou período;
- Status;
- Palavras-chave da descrição.

### Comportamento da funcionalidade
1. O usuário informa uma palavra-chave ou seleciona filtros.
2. O sistema pesquisa os registros correspondentes.
3. Os resultados são apresentados na listagem.
4. Caso nenhum resultado seja encontrado, o sistema informa que não foram localizados itens correspondentes.

### Regras de negócio
- A pesquisa deve considerar apenas itens que correspondam aos critérios informados.
- Os filtros podem ser utilizados individualmente ou em conjunto.
- Itens recuperados devem ser diferenciados dos itens ainda disponíveis.

### Restrições
- A pesquisa deve funcionar mesmo quando o usuário preencher apenas parte do nome ou descrição.
- O sistema deve tratar pesquisas sem resultados sem apresentar erro.

---

## 7. Visualização de detalhes do item

### Objetivo
Permitir que o usuário visualize todas as informações relevantes de um item antes de tentar identificá-lo ou recuperá-lo.

### Informações
A tela de detalhes deve apresentar:
- Foto;
- Nome do item;
- Categoria;
- Descrição;
- Local;
- Data;
- Status;
- Informações de contato permitidas;
- Data de publicação.

### Comportamento da funcionalidade
1. O usuário seleciona um item na listagem ou nos resultados da pesquisa.
2. O sistema abre a página de detalhes.
3. Todas as informações disponíveis são apresentadas de forma organizada.
4. Quando aplicável, o usuário pode iniciar o contato com o responsável pelo cadastro.

### Regras de negócio
- O sistema deve exibir somente informações permitidas para aquele tipo de usuário.
- O responsável pelo item pode editar suas próprias informações.
- Itens recuperados devem apresentar o status atualizado.

### Restrições
- Dados pessoais desnecessários não devem ser expostos.
- O contato entre usuários deve respeitar as regras de privacidade do sistema.

---

## 8. Marcar item como recuperado

### Objetivo
Permitir que um item perdido ou encontrado seja identificado como recuperado, evitando que continue sendo tratado como disponível.

### Informações
- Item selecionado;
- Novo status: “Recuperado”;
- Data da recuperação;
- Observação opcional.

### Comportamento da funcionalidade
1. O responsável pelo cadastro acessa os detalhes do item.
2. Seleciona a opção “Marcar como recuperado”.
3. O sistema solicita a confirmação.
4. Após a confirmação, o status é alterado para “Recuperado”.
5. O item deixa de aparecer entre os itens disponíveis ou passa a ser exibido somente com o status de recuperado.

### Regras de negócio
- Somente o responsável pelo cadastro ou usuário autorizado pode alterar o status.
- Um item recuperado não deve continuar sendo tratado como perdido ou disponível.
- A alteração deve ser registrada no sistema.

### Restrições
- A ação deve exigir confirmação para evitar alterações acidentais.
- Depois de recuperado, o item não deve voltar automaticamente ao status anterior.

---

# Requisitos gerais do sistema

Além das funcionalidades específicas, o sistema deve seguir algumas regras gerais:

- A interface deve ser simples e fácil de utilizar.
- O sistema deve validar os dados antes de salvá-los.
- As informações dos usuários devem ser protegidas.
- Cada item deve possuir um identificador único.
- Os registros devem possuir status para indicar sua situação.
- O sistema deve evitar duplicidade de cadastros quando possível.
- Operações importantes, como alteração de status, devem ser registradas.
- O sistema deve apresentar mensagens claras de sucesso e erro.
- Funcionalidades que envolvam dados pessoais devem respeitar boas práticas de privacidade e segurança.
