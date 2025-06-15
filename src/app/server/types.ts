import { RowDataPacket } from "mysql2";

import { BaseTodo } from "../../lib/types";

export type TodoRow = BaseTodo & RowDataPacket;
