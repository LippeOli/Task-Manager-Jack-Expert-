import * as Yup from 'yup';
import User from '../models/User';


class UserController {
    //Funcao para registrar Usuário 
    async store(req, res) {

        //Validação dos campos
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            password: Yup.string()
                .required()
                .min(4)
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Falha na Validação."})
        }

        
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

    //Funcao para atualizar cadast. Usuário
    async update(req, res){

        //Validação dos campos
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(4),
            password: Yup.string()
                .min(4)
                .when('oldPassword', (oldPassword, field) => 
                    oldPassword ? field.required(): field
                ),
                confirmPassword: Yup.string().when('password', (password, field) =>
                    password ? field.required().oneOf([Yup.ref('password')]): field
                ),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Falha na Validação."})
        }


    
        //Verificação Se mudar de email
        const { email, oldPassword} = req.body;
        
        //Detecta usuário pelo Id
        const user = await User.findByPk(req.userId);

        if (email != user.email){
            
            //condicional para não haver duplicação de emails
            const userExists = await User.findOne({
                where: { email},
            });
            if(userExists){
                return res.status(400).json({ error: "Este email já cadastrado, usuário já existe."});
            }
        }
        
        //Verificação Se houver uma OldPassword ai faz busca se as senhas batem
        if( oldPassword && !(await user.checkPassword(oldPassword))){
            return res.status(401).json({ error: "Senha incorreta."})
        }

        const {id, name} = await user.update(req.body);
        
        return res.json({
            id,
            name,
            email,    
        }); 

    }
}

export default new UserController();