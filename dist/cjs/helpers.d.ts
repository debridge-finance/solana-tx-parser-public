/// <reference types="node" />
import { AccountMeta, CompiledInstruction, LoadedAddresses, Message, MessageCompiledInstruction, PartiallyDecodedInstruction, TransactionInstruction, VersionedMessage, VersionedTransactionResponse } from "@solana/web3.js";
import { LogContext } from "./interfaces";
export declare function hexToBuffer(data: string): Buffer;
/**
 * Parse transaction message and extract account metas
 * @param message transaction message
 * @returns parsed accounts metas
 */
export declare function parseTransactionAccounts<T extends Message | VersionedMessage>(message: T, loadedAddresses?: T extends VersionedMessage ? LoadedAddresses | undefined : undefined): AccountMeta[];
/**
 * Converts compiled instruction into common TransactionInstruction
 * @param compiledInstruction
 * @param parsedAccounts account meta, result of {@link parseTransactionAccounts}
 * @returns TransactionInstruction
 */
export declare function compiledInstructionToInstruction<Ix extends CompiledInstruction | MessageCompiledInstruction>(compiledInstruction: Ix, parsedAccounts: AccountMeta[]): TransactionInstruction;
export declare function parsedInstructionToInstruction(parsedInstruction: PartiallyDecodedInstruction, accountMeta: AccountMeta[]): TransactionInstruction;
/**
 * Converts transaction response with CPI into artifical transaction that contains all instructions from tx and CPI
 * @param transaction transactionResponse to convert from
 * @returns Transaction object
 */
export declare function flattenTransactionResponse(transaction: VersionedTransactionResponse): TransactionInstruction[];
/**
 * Parses transaction logs and provides additional context such as
 * - programId that generated the message
 * - call id of instruction, that generated the message
 * - call depth of instruction
 * - data messages, log messages and error messages
 * @param logs logs from TransactionResponse.meta.logs
 * @returns parsed logs with call depth and additional context
 */
export declare function parseLogs(logs: string[]): LogContext[];
//# sourceMappingURL=helpers.d.ts.map