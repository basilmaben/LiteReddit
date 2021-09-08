import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";

export default
    {
        entities:[Post],
        dbName: 'lireddit',
        type: 'postgresql',
        debug: !__prod__   //when not in production debug on
    } as Parameters<typeof MikroORM.init>[0]; //to pass Mikro not as strings but values