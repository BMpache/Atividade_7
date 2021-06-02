const express = require("express");
const app = express();
app.use(express.json()); //isso para garantir o tratamento do json

// Permissões, senão colocar pode ser que não 
// funcione com o cliente
var cors = require('cors');
app.use(cors());

// Porta que eu estou ouvindo, o primeiro é pro heroku e o segundo é pra usar no PC
app.listen(process.env.PORT || 3000);


// strings para o banco de dados
const Bulbasaur = '{ "name":"Bulbasaur", "type":"Grass/Poison", "about":"There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger." }';
const Ivysaur = '{ "name":"Ivysaur", "type":"Grass/Poison", "about":"When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs." }';
const Venusaur = '{ "name":"Venusaur", "type":"Grass/Poison", "about":"Its plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight." }';
const Charmander = '{ "name":"Charmander", "type":"Fire", "about":"It has a preference for hot things. When it rains, steam is said to spout from the tip of its tail." }';
const Charmeleon = '{ "name":"Charmeleon", "type":"Fire", "about":"It has a barbaric nature. In battle, it whips its fiery tail around and slashes away with sharp claws." }';
const Charizard  = '{ "name":"Charizard ", "type":"Fire/Flying", "about":"It spits fire that is hot enough to melt boulders. It may cause forest fires by blowing flames." }';
const Squirtle = '{ "name":"Squirtle", "type":"Water", "about":"When it retracts its long neck into its shell, it squirts out water with vigorous force." }';
const Wartortle = '{ "name":"Wartortle", "type":"Water", "about":"It is recognized as a symbol of longevity. If its shell has algae on it, that Wartortle is very old." }';
const Blastoise  = '{ "name":"Blastoise ", "type":"Water", "about":"It crushes its foe under its heavy body to cause fainting. In a pinch, it will withdraw inside its shell." }';


// array simulando um banco de dados, com os objeto Json
const pokedex = [ JSON.parse(Bulbasaur), 
                  JSON.parse(Ivysaur),
                  JSON.parse(Venusaur),
                  JSON.parse(Charmander),
                  JSON.parse(Charmeleon),
                  JSON.parse(Charizard),
                  JSON.parse(Squirtle),
                  JSON.parse(Wartortle),
                  JSON.parse(Blastoise)
];

// novo endpoint com uma explicação inicial
app.get('/',
    function(req, res){
        res.send("Olá esse é o Backend do Bruno Miguel e da Maria Eduarda, fizemos um banco de dados baseado em Pokemon. Nosso banco de dados é um Pokedex com os nove primeiros Pokemons da Região de Kanto."); 
    }
);

// novo endpoint com o banco de dados
app.get('/pokedex',
    function(req, res){
        res.send(pokedex.filter(Boolean)); //isso é pra tratar os valores q aparecem como
                                             //null, que são lidos como boleano
    }
);

// arrumando os indeces do arry para facilitar interface para o usuario
app.get('/pokedex/:id',
    function(req, res){
        const id = req.params.id - 1;
        const pokedexs = pokedex[id];

        if (!pokedexs){
            res.send("Pokemon não encontrado");
        } else {
            res.send(pokedexs);
        }
    }
)
// usando o verbo post
app.post('/pokedex', 
    (req, res) => {
        console.log(req.body.pokedexs); // codigo para receber a mensagem 
        const pokedexs = req.body.pokedexs;
        pokedex.push(pokedexs); // vai colocar a nova mensgem no banco de dados, quando atualizar o localhost vai aparecer
                                 // a mensagem adicionada ao banco de dados, no caso um array
        res.send("Pokemon adicionado")
    }
);
// trocar algo antigo por algo novo
app.put('/pokedex/:id',
    (req, res) => {
        const id = req.params.id - 1;
        const pokedexs = req.body.pokedexs;
        pokedex[id] = pokedexs;        
        res.send("Pokemon atualizado com sucesso.")
    }
)

app.delete('/pokedex/:id', 
    (req, res) => {
        const id = req.params.id - 1;
        delete pokedex[id];

        res.send("Pokemon removido com sucesso");
    }
);