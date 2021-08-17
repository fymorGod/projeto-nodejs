const conection = require('../infra/conection');

class Atendimento{
    adiciona(atendimento){
        const sql = 'INSERT INTO Atendimentos SET ?';
        conection.query(sql, atendimento, (error, resultados) =>{
            if(error){
                console.log(error);
            }
            else{
                console.log(resultados);
            }
        });
    }
}
module.exports = new Atendimento;