# Instalação

Para executar o projeto instale o Docker e o Docker Compose. entre no diretório e execute o comando: "docker-compose up".
*Testado em ambiente Linux

# Autenticação

Para efetuar a autenticação crie um usúario em POST localhost:8080/user, enviando como corpo uma mensagem em JSON com os atributos email e password, exemplo: {"email": "João@gmail.com", "password" : "Joao12345"}.
Ao criar o usuário o pegue o token retornado para executar a API dos carros.
Caso Já tenha um usuário cadastrado, utilize POST localhost:8080/user/login com um JSON no corpo da requisição com os atributos email e password, para retornar o token JWT de acesso.
o token gerado tem inspiração de 50 minutos.

# API de carros
Para acessar a API de carros é necessario passar o token JWT de acesso retornado na criação do usuário ou no login. Envie o token no cabeçalho "authorization" no formato "bearer valor_do_token" 

# POST localhost:8080/car/
Para criar um novo carro, envie no corpo um JSON com os atributos: brand, model, color, fuel, year e price. Todos os atributos são obrigatorios, e o atributo fuel somente pode ter os valores: "electric", "hybrid", "gasoline", "diesel", "ethanol", "flex" 

# GET localhost:8080/car/
Retorna todos os carros cadastrados


# GET localhost:8080/car/:id
Retorna um carro pelo seu id

# PUT localhos:8080/car/:id
Atualiza os dados de um carro pelo id. O carro tem que pertencer ao usuario logado via JWT. Os atributos brand, model, color, fuel, year e price podem ser atualizados, não é necessario passar todos os paramentros, somente os que seram atualizados.

# DELETE localhos:8080/car/:id
Remove um carro pelo id. O carro tem que pertencer ao usuario logado via JWT.
