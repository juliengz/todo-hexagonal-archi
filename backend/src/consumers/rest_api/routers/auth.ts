import { Request, Response, Router } from 'express';
// import { CreateUser } from '../../../core/components/auth/use_cases/create_user';
// import { UuidGenerator } from '../../../providers/persistence/in_memory/iuid_generator';
// import { UserRepository } from '../../../providers/persistence/in_memory/user_repository';

export const authRouter = Router();

authRouter.post(
    '/sign-up',
    async (req: Request, res:Response) => {
        const { login, password } = req.body;

        return res.status(200).send({ login, password });

        // const result = await new CreateUser(new UserRepository(), new UuidGenerator()).execute(login, password);

        // if (result.isOk()) {
        //     return res.status(200).send(result.value);
        // }

        // return res.status(400).send(result.error);
    },
);
