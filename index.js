const customExpress = require('./config/customExpress');
const app = customExpress();
const tables = require('./infra/tables');
const conection = require('./infra/conection');

conection.connect((error)=>{
    if (error){
        console.log(error);
    }
    else{
        console.log('Conectado com sucesso!');
        tables.init(conection);

        app.listen(3000, ()=>{
            console.log('Server living in port 3000')
        });
        
    }
})

