import User from '../models/User';


class UserController {
    async store(req, res) {

        //condicional para não haver duplicação de emails
        const userExists = await User.findOne({
            where: {email: req.body.email}
        });

        if(userExists){
            return res.status(400).json({ error: "Email já cadastrado."})
        }

        //retorna o id, nome ... para o front
        const { id, name, email} = await User.create(req.body);

        
        return res.json({
            id,
            name,
            email,
        }); 
    }

    async update(req, res){

        console.log(req.userId);
        return res.json({ ok: true}); 

    }
}

export default new UserController();