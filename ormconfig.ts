import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { UserEntity } from "src/auth/entities/user.entity";

export const ormConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgre',
    database: 'nest-basics',
    entities: [UserEntity],  
    synchronize: true,
}