/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import express, { Express } from 'express';
import { authRouter } from './routers/auth';
import { rootRouter } from './routers/root';

export interface RestApiConfig {
    port: string,
    isProduction: boolean,
}

export class RestApi {
    private readonly app: Express;

    constructor(
        private config: RestApiConfig,
    ) {
        this.app = express();
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
        this.app.use(rootRouter);
        this.app.use(authRouter);
    }

    start() {
        this.app.listen(this.config.port, () => {
            console.log(`⚡️[Rest Api]: Ready at http://localhost:${this.config.port}`);
        });
    }
}
