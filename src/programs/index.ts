import { splTokenProgram } from "@coral-xyz/spl-token";
import { SystemProgram } from "@coral-xyz/anchor";

import { AssociatedTokenProgram } from "./ata";
import { ComputeBudget } from "./compute.budget";
import { SplToken22 } from "./spl-token-22.program";

export type SplTokenIdl = ReturnType<typeof splTokenProgram>["idl"];
export type SystemProgramIdl = SystemProgram;
export type SplToken22Idl = SplToken22;
export type ComputeBudgetIdl = ComputeBudget;
export type AssociatedTokenProgramIdl = AssociatedTokenProgram;
