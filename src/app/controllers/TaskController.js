import * as Yup from 'yup';
import Task from "../models/Task";

class TaskController{

    //Criar uma task
    async store(req, res) {

        //Validação dos campos
        const schema = Yup.object().shape({
            task: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Falha ao Cadastrar Tarefa."})
        }

        const { task } = req.body;

        const tasks = await Task.create({
            user_id: req.userId,
            task,
        });
        
        return res.json(tasks);
    }

    //Mostar todas as task
    async index(req, res) {
    const tasks = await Task.findAll({
        where: { user_id: req.userId, check: false}
    });

    return res.json(tasks);
    }   

    //Atualizar a task
    async update(req, res) {
        
        const { task_id } = req.params;

        const task = await Task.findByPk(task_id);

        if(!task){
            return res.status(400).json({ error: "Tarefa não existe."})
        }

        await task.update(req.body);

        return res.json(task);
    }   

     //Deletar a task
     async delete(req, res) {
        
        const { task_id } = req.params;

        const task = await Task.findByPk(task_id);

        if(!task){
            return res.status(400).json({ error: "Tarefa não existe."})
        }

       if(task.user_id != req.userId){
          return res.status(401).json({ error: "Requisição não autorizada. A tarefa não é desse usuário."})

       }

       await task.destroy();

        return res.send();
    }   
    
}

export default new TaskController;