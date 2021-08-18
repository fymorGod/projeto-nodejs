const moment = require('moment');
const conection = require('../infra/conection');

class Atendimento{
    adiciona(atendimento, res){ 
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteEhValido = atendimento.cliente.length >= 5

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if (existemErros){
            res.status(400).json(erros)
        }
        else{
            const atendimentoDatado = {...atendimento, dataCriacao, data};

            const sql = 'INSERT INTO Atendimentos SET ?';

            conection.query(sql, atendimentoDatado, (error, resultados) =>{
                if(error){
                    res.status(400).json(error);
                }
                else{
                    res.status(201).json(atendimento);
                }
            });
        }

        
    }
    listar(res){
        const sql = 'SELECT * FROM Atendimentos';
        conection.query(sql, (error, resultados)=>{
            if(error){
                res.status(400).json(error)
            }
            else{
                res.status(200).json(resultados);
            }
        });
    }
    buscarPorId(id, res){
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`;
        conection.query(sql, (error, resultados) =>{

            const atendimento = resultados[0]
            if(error){
                res.status(400).json(error)
            }
            else{
                res.status(200).json(atendimento)
            }
        })
    }
    alterar(id, valores, res){
        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        }
        const sql = 'UPDATE Atendimentos SET ? WHERE id=?';

        conection.query(sql,[valores, id], (error, resultados) =>{
            if(error){
                res.status(400).json(error)
            }
            else{
                res.status(200).json({...valores, id})
            }
        })
    }
    deleta(id, res){
        const sql = `DELETE FROM Atendimentos WHERE id=${id}`;

        conection.query(sql, (error, resultados) =>{
            if(error){
                res.status(400).json(error);
            }
            else{   
                res.status(200).json('Atendimento deletado com sucesso')
            }
        })
    }
}
module.exports = new Atendimento;