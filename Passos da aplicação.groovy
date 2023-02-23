Passos da aplicação

1-> Criação de orçamento
    name (nome do projeto)
    amount (quantidade)
    price ("" ou preço)
    status (waiting budget)
    aprovedDate ("" : data de aprovamento do cliente)
    dateRequest (data de pedido de orçamento cleinte)
    dateAgreedDelivery (data combinada de entrega de orçamento)
    dateDelivery ( data real de entrega de orçamento)
    dateDeliveryProject ( data combinada de entrega de projeto )
    image ("")
    obs ("" ou observações relativos ao orçamento)
    belongsTo(project "urn:ngsi-ld:Project: + name orçamento")
    orderBy ( "urn:ngsi-ld:Owner:_nome cliente_" )
    category (null ou category do "projeto")
2-> Entrega de orçamento
    price ( preço )
    status ( waiting adjudication)
    dateDelivery ( data de entrega do orçamento -> quando na plataforma o projeto passou á espera de adjudicação    )
3-> Adjudicação de orçamento
        amount (quantidade)
        price ( preço aceite pelo cliente )
        status ( "adjudicated" )
        3.1-> Criação de projeto
            name (urn:ngsi-ld:Project: + nome orçamento)
            status ( "drawing" )
            budgetId ( urn:ngsi-ld:Budget: + nome orçamento : onde se vai "buscar" todos os dados de orçamento)
            producedBy ("")
            assemblyBy ("")
            expedition (urn:ngsi-ld:expedition: + nome orçamento)
        3.2-> Criação de expedition
            deliveryFlag ( "" : data de instalação/entrega do projeto )
            expeditionTime ("": data de quando passa na fase de montagem e testes )
            orderBy (orderBy do orçamento :cliente)
        3.3-> Criação de parts ( tudo vazio ou a 0 )
            id("urn:ngsi-ld:Part:nome_projeto0")
            tag (0)
            ref: '',
            material: '',
            belongsTo (urn:ngsi-ld:Project: + nome orçamento)
            orderBy (orderBy do orçamento :cliente)
            ...
        3.4-> Criação de consumables  ( tudo vazio ou a 0 )
        3.5-> Criação de assembly
            id ("urn:ngsi-ld:Assembly:nome_projeto")
            startTime ("")
            finishTime ("")
            statusAssembly (0)
            belongsTo ("urn:ngsi-ld:Project:nome_projeto")
            orderBy (orderBy do orçamento :cliente)
4-> Entra em produção : Entrega de documentos (ao fazer upload pelo Website )
    status ("production")
5-> Entra em Montagem
    status ("testing")
    statusAssembly (1)
    flagConsumable (1)
    (disponibiliza as etiquetas das peças   )
6-> Entra em Testes
    status ("testing")
    statusAssembly (2)
    (disponibiliza as etiquetas das embalagens )
7-> Entra em Transport
    status ("transport")
    expedition.expeditionTime (timestamp)

8-> Entra em Finished
    status ("finished")
    expedition.deliveryFlag (1)



