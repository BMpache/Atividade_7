const express = require("express");
const app = express();
app.use(express.json()); //isso para garantir o tratamento do json

// Permissões, senão colocar pode ser que não 
// funcione com o cliente
var cors = require('cors');
app.use(cors());

// Porta que eu estou ouvindo, o primeiro é pro heroku e o segundo é pra usar no pc
app.listen(process.env.PORT || 3000);


// array simulando um banco de dados
const Bulbasaur = '{ "name":"Bulbasaur", "type":"Grass/Poison", "about":"There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger." }';
const Ivysaur = '{ "name":"Ivysaur", "type":"Grass/Poison", "about":"When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs." }';
const Venusaur = '{ "name":"Venusaur", "type":"GrassPoison", "about":"Its plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight." }';

// array simulando um banco de dados
const pokedex = [ JSON.parse(Bulbasaur), 
                  JSON.parse(Ivysaur),
                  JSON.parse(Venusaur)
];

// novo endpoint
app.get('/pokedex',
    function(req, res){
        res.send(pokedex.filter(Boolean)); //isso é pra tratar os valores q aparecem como
                                             //null, que são lidos como boleanos
    }
);
app.get('/pokedex/:id', function(req, res){
    let id=req.params.id-1;
    res.send(pokedex[id][req.params.nn]);
})

// arrumando os indeces do arry para facilitar interface para o usuario
app.get('/pokedex/:id',
    function(req, res){
        const id = req.params.id - 1;
        const pokedexs = pokedex[id];

        if (!pokedexs){
            res.send("Pokemon não encontrada");
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
        res.send("criar uma mensagem.")
    }
);
// trocar algo antigo por algo novo
app.put('/pokedex/:id',
    (req, res) => {
        const id = req.params.id - 1;
        const pokedexs = req.body.pokedexs;
        pokedex[id] = pokedexs;        
        res.send("Pokemon atualizada com sucesso.")
    }
)

app.delete('/pokedex/:id', 
    (req, res) => {
        const id = req.params.id - 1;
        delete pokedex[id];

        res.send("Pokemon removida com sucesso");
    }
);