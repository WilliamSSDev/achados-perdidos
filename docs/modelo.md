# Documentação da Modelagem do Banco de Dados - Sistema de Achados e Perdidos

Esta documentação apresenta a modelagem inicial do banco de dados relacional para o sistema de Achados e Perdidos, contendo as entidades, atributos, tipos de dados, chaves primárias, chaves estrangeiras, relacionamentos e regras de negócio.

---

## 1. Visão Geral das Entidades

O sistema é composto por 3 entidades principais:
1. **`usuario`**: Representa as pessoas cadastradas que utilizam o sistema.
2. **`local`**: Representa os locais geográficos ou pontos de referência onde os itens foram perdidos ou encontrados.
3. **`item`**: Representa os objetos perdidos ou encontrados cadastrados no sistema.

---

## 2. Definição das Entidades, Atributos e Tipos de Dados

### 2.1. Entidade: `usuario`
Armazena as informações de cadastro e autenticação dos usuários.

| Atributo | Tipo de Dado | Restrições / Regras | Descrição |
| :--- | :--- | :--- | :--- |
| **id** | `INT` | **PK** (Primary Key), Auto-incremento, Obrigatório | Identificador único do usuário. |
| **nome** | `VARCHAR(255)` | Obrigatório (NOT NULL) | Nome completo do usuário. |
| **email** | `VARCHAR(255)` | Obrigatório (NOT NULL), Único (UNIQUE) | E-mail do usuário (usado para login). |
| **senha** | `VARCHAR(255)` | Obrigatório (NOT NULL) | Senha de acesso criptografada do usuário. |
| **telefone** | `VARCHAR(50)` | Opcional (NULL) | Telefone de contato do usuário. |
| **cidade** | `TEXT` ou `VARCHAR(100)` | Opcional (NULL) | Cidade onde o usuário reside/atua. |

---

### 2.2. Entidade: `local`
Armazena os locais cadastrados no sistema para associação com os itens.

| Atributo | Tipo de Dado | Restrições / Regras | Descrição |
| :--- | :--- | :--- | :--- |
| **id** | `INT` | **PK** (Primary Key), Auto-incremento, Obrigatório | Identificador único do local. |
| **nome** | `VARCHAR(255)` | Obrigatório (NOT NULL) | Nome do local (ex: "Biblioteca Central", "Bloco B"). |
| **tipo** | `VARCHAR(100)` | Opcional (NULL) | Categoria do local (ex: Sala de Aula, Prédio, Praça). |
| **endereco** | `VARCHAR(255)` | Opcional (NULL) | Endereço descritivo ou rua. |
| **latitude** | `DECIMAL` | Opcional (NULL) | Coordenada geográfica de latitude. |
| **longitude** | `DECIMAL` | Opcional (NULL) | Coordenada geográfica de longitude. |
| **descricao** | `TEXT` | Opcional (NULL) | Detalhes adicionais sobre o local. |
| **usuario_id** | `INT` | **FK** (Foreign Key), Obrigatório (NOT NULL) | ID do usuário que cadastrou o local. |

---

### 2.3. Entidade: `item`
Armazena os objetos que foram perdidos ou encontrados.

| Atributo | Tipo de Dado | Restrições / Regras | Descrição |
| :--- | :--- | :--- | :--- |
| **id** | `INT` | **PK** (Primary Key), Auto-incremento, Obrigatório | Identificador único do item. |
| **titulo** | `VARCHAR(255)` | Obrigatório (NOT NULL) | Título ou nome curto do item (ex: "Chaveiro com chave azul"). |
| **descricao** | `TEXT` | Obrigatório (NOT NULL) | Descrição detalhada do objeto. |
| **categoria** | `VARCHAR(100)` | Obrigatório (NOT NULL) | Categoria do item (ex: Eletrônicos, Documentos, Roupas). |
| **status** | `VARCHAR(50)` | Obrigatório (NOT NULL) | Estado atual do item (Ex: `ATIVO`, `RECUPERADO`). |
| **data_cadastro** | `DATETIME` | Obrigatório (NOT NULL) | Data e hora em que o item foi registrado no sistema. |
| **localizacao_detalhada** | `VARCHAR(255)` | Opcional (NULL) | Detalhe interno de onde o item foi achado (ex: "Carteira 3 da fileira do fundo"). |
| **imagem** | `VARCHAR(255)` | Opcional (NULL) | Caminho/URL da imagem do item. |
| **usuario_id** | `INT` | **FK** (Foreign Key), Obrigatório (NOT NULL) | ID do usuário responsável pelo cadastro do item. |
| **local_id** | `INT` | **FK** (Foreign Key), Obrigatório (NOT NULL) | ID do local associado ao item. |
| **tipo** | `ENUM` ou `VARCHAR(50)` | Obrigatório (NOT NULL) | Define se o item foi `PERDIDO` ou `ENCONTRADO`. |

---

## 3. Chaves Primárias (PK) e Estrangeiras (FK)

- **Chaves Primárias (Primary Keys):**
  - `usuario.id`
  - `local.id`
  - `item.id`

- **Chaves Estrangeiras (Foreign Keys):**
  - `local.usuario_id` -> referencia `usuario.id`
  - `item.usuario_id` -> referencia `usuario.id`
  - `item.local_id` -> referencia `local.id`

---

## 4. Relacionamentos entre as Entidades

1. **`usuario` (1) ───────── (N) `local`**: 
   - Um usuário pode cadastrar vários locais, mas cada local pertence a um único usuário responsável pelo cadastro.
2. **`usuario` (1) ───────── (N) `item`**: 
   - Um usuário pode cadastrar vários itens, mas cada item possui um único usuário responsável pelo registro.
3. **`local` (1) ───────── (N) `item`**: 
   - Um local pode estar associado a vários itens, mas cada item está vinculado a um único local específico.

---

## 5. Regras Principais do Banco de Dados

- **Campos Únicos (`UNIQUE`):** O campo `email` na tabela `usuario` deve ser estritamente único para evitar duplicidade de cadastros e permitir a autenticação correta.
- **Integridade Referencial:** Nenhuma tabela dependente (`item` ou `local`) pode existir sem estar vinculada a um `usuario` válido (através da restrição de chave estrangeira).
- **Valores Padrão / Domínios:** 
  - O campo `tipo` em `item` aceita apenas os valores: `PERDIDO` ou `ENCONTRADO`.
  - O campo `status` em `item` gerencia se o item continua em aberto (`ATIVO`) ou se já foi devolvido/encontrado (`RECUPERADO`).
