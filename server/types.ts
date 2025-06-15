import { RowDataPacket } from "mysql2";

import { BaseTodo } from "../src/lib/types";

export type TodoRow = BaseTodo & RowDataPacket;
