class Tables{
    init(conection) {
        this.conection = conection;

        this.criarAtendimentos();
    }

    criarAtendimentos(){
        const sql = 'CREATE TABLE IF NOT EXISTS atendimentos (id INT NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, status varchar(20) NOT NULL, observacoes TEXT, PRIMARY KEY(id))';

        this.conection.query(sql, (error) =>{
            if(error){
                console.log(error);
            }
            else{
                console.log('Tabela atendimentos criada com sucesso!');
            }
        })
    }
}

module.exports = new Tables;