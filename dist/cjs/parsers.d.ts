/// <reference types="node" />
import { Buffer } from "buffer";
import { PublicKey, TransactionInstruction, Connection, Message, ParsedMessage, Finality, VersionedMessage, LoadedAddresses } from "@solana/web3.js";
import { Idl } from "@coral-xyz/anchor";
import { InstructionNames, InstructionParserInfo, ParsedInstruction, ParserFunction, ProgramInfoType } from "./interfaces";
/**
 * Class for parsing arbitrary solana transactions in various formats
 * - by txHash
 * - from raw transaction data (base64 encoded or buffer)
 * - @solana/web3.js getTransaction().message object
 * - @solana/web3.js getParsedTransaction().message or Transaction.compileMessage() object
 * - @solana/web3.js TransactionInstruction object
 */
export declare class SolanaParser {
    private instructionParsers;
    /**
     * Initializes parser object
     * `SystemProgram`, `TokenProgram` and `AssociatedTokenProgram` are supported by default
     * but may be overriden by providing custom idl/custom parser
     * @param programInfos list of objects which contains programId and corresponding idl
     * @param parsers list of pairs (programId, custom parser)
     */
    constructor(programInfos: ProgramInfoType[], parsers?: InstructionParserInfo[]);
    /**
     * Adds (or updates) parser for provided programId
     * @param programId program id to add parser for
     * @param parser parser to parse programId instructions
     */
    addParser(programId: PublicKey, parser: ParserFunction<Idl, string>): void;
    /**
     * Adds (or updates) parser for provided programId
     * @param programId program id to add parser for
     * @param idl IDL that describes anchor program
     */
    addParserFromIdl(programId: PublicKey | string, idl: Idl): void;
    private buildIdlParser;
    /**
     * Removes parser for provided program id
     * @param programId program id to remove parser for
     */
    removeParser(programId: PublicKey): void;
    private buildUnknownParsedInstruction;
    /**
     * Parses instruction
     * @param instruction transaction instruction to parse
     * @returns parsed transaction instruction or UnknownInstruction
     */
    parseInstruction<I extends Idl, IxName extends InstructionNames<I>>(instruction: TransactionInstruction): ParsedInstruction<I, IxName>;
    /**
     * Parses transaction data
     * @param txMessage message to parse
     * @param altLoadedAddresses VersionedTransaction.meta.loaddedAddresses if tx is versioned
     * @returns list of parsed instructions
     */
    parseTransactionData<T extends Message | VersionedMessage>(txMessage: T, altLoadedAddresses?: T extends VersionedMessage ? LoadedAddresses | undefined : undefined): ParsedInstruction<Idl, string>[];
    /**
     * Parses transaction data retrieved from Connection.getParsedTransaction
     * @param txParsedMessage message to parse
     * @returns list of parsed instructions
     */
    parseTransactionParsedData(txParsedMessage: ParsedMessage): ParsedInstruction<Idl, string>[];
    /**
     * Fetches tx from blockchain and parses it
     * @param connection web3 Connection
     * @param txId transaction id
     * @param flatten - true if CPI calls need to be parsed too
     * @returns list of parsed instructions
     */
    parseTransaction(connection: Connection, txId: string, flatten?: boolean, commitment?: Finality): Promise<ParsedInstruction<Idl, string>[] | null>;
    /**
     * Parses transaction dump
     * @param txDump base64-encoded string or raw Buffer which contains tx dump
     * @returns list of parsed instructions
     */
    parseTransactionDump(txDump: string | Buffer): ParsedInstruction<Idl, string>[];
}
//# sourceMappingURL=parsers.d.ts.map