# Fullstack Developer Challenge

## Descrição do projeto

Projeto desenvolvido com NodeJS, MongoDB, Docker e VueJS, com o objetivo de expor uma API com um método GET de um endpoint com uma lista de clientes inadimplentes.

## Critérios de aceitação especificados

DADO QUE sou um analista financeiro
QUANDO acesso a tela de clientes inadimplentes
ENTÃO é apresentada uma lista de clientes com títulos em atraso

DADO QUE sou um analista financeiro na tela de clientes inadimplentes
QUANDO clico na coluna “Nome do cliente”
ENTÃO a lista de clientes é ordenada com base no nome do cliente

DADO QUE sou um analista financeiro na tela de clientes inadimplentes
QUANDO clico na coluna “Valor”
ENTÃO a lista de clientes é ordenada com base no valor total de inadimplência

DADO QUE sou um analista financeiro na tela de clientes inadimplentes
QUANDO clico na coluna “Desde”
ENTÃO a lista de clientes é ordenada com base na data da primeira inadimplência

DADO QUE sou um analista financeiro na tela de clientes inadimplentes
QUANDO preencho o campo busca
E clico em “Buscar”
ENTÃO a lista de clientes é filtrada com base no texto que digitei no campo de busca

## Instruções de execução 

* Fazer o clone deste repositório
* Na pasta do projeto, executar as instruções "docker-compose build" e "docker-compose up"
* No navegador de internet, acessar http://localhost:8080

Na primeira execução, a base de dados já será preenchida com um conjunto de dados de exemplo (clientes e títulos).
Caso deseje incluir novos clientes, pode-se fazê-lo através do enpoint http://localhost:3000/api/v1/clientes (com método POST). Abaixo um exemplo do JSON para uso na request de inclusão de cliente:

```json
{
  "nome": "Fulano de tal",
  "email": "fulanodetal@gmail.com"
}
```

Da mesma forma, se desejar incluir novos títulos, pode ser feito através do endpoint http://localhost:3000/api/v1/titulos (com método POST). Abaixo um exemplo do JSON para uso na request de inclusão de títulos:

```json
{
    "descricao": "Pedido nº 111111",
    "dataVencimento": "2021-08-02",
    "dataPagamento": null,
    "valor": 100,
    "cliente": "615a00de6b5ac0dad3b7b4c2"    
}
```

### Observações

As opções de filtro da tabela (busca) e ordenação dos dados, foram implementadas no backend. Como as instruções do desafio não especificavam como deveria ser feita, optou-se por implementar no backend por considerar que esta seria a parte do projeto que teria mais foco na avaliação, uma vez que foram especificadas as tecnologias a se utilizar no backend e o mesmo não aconteceu para o frontend. 
No entanto, seria perfeitamente possível fazer a implementação destas duas funcionalidades no frontend.

