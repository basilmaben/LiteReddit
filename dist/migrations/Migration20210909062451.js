"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20210909062451 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20210909062451 extends migrations_1.Migration {
    async up() {
        this.addSql('create table "post" ("id" serial primary key, "created_at" jsonb not null, "updated_at" jsonb not null, "title" varchar(255) not null);');
    }
}
exports.Migration20210909062451 = Migration20210909062451;
//# sourceMappingURL=Migration20210909062451.js.map