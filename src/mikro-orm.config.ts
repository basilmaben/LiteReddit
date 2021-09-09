import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from "path";


export default
    {
    migrations:{
        path: path.join(__dirname,'./migrations'), // path to the folder with migrations
        pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
    },
        entities:[Post],
        dbName: 'lireddit',
        type: 'postgresql',
        debug: !__prod__   //when not in production debug on
    } as Parameters<typeof MikroORM.init>[0]; //to pass Mikro not as strings but values