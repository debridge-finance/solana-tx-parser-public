"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaParser = void 0;
const buffer_1 = require("buffer");
const web3_js_1 = require("@solana/web3.js");
const spl_token_1 = require("@solana/spl-token");
const anchor_1 = require("@coral-xyz/anchor");
const buffer_layout_1 = require("@solana/buffer-layout");
const helpers_1 = require("./helpers");
function decodeSystemInstruction(instruction) {
    const ixType = web3_js_1.SystemInstruction.decodeInstructionType(instruction);
    let parsed;
    switch (ixType) {
        case "AdvanceNonceAccount": {
            const decoded = web3_js_1.SystemInstruction.decodeNonceAdvance(instruction);
            parsed = {
                name: "advanceNonceAccount",
                accounts: [
                    { name: "nonce", pubkey: decoded.noncePubkey, isSigner: false, isWritable: true },
                    { name: "recentBlockhashSysvar", ...instruction.keys[1] },
                    { name: "nonceAuthority", pubkey: decoded.authorizedPubkey, isSigner: true, isWritable: false },
                ],
                args: {},
            };
            break;
        }
        case "Allocate": {
            const decoded = web3_js_1.SystemInstruction.decodeAllocate(instruction);
            parsed = {
                name: "allocate",
                accounts: [{ name: "newAccount", pubkey: decoded.accountPubkey, isSigner: true, isWritable: true }],
                args: { space: new anchor_1.BN(decoded.space) },
            };
            break;
        }
        case "AllocateWithSeed": {
            const decoded = web3_js_1.SystemInstruction.decodeAllocateWithSeed(instruction);
            parsed = {
                name: "allocateWithSeed",
                accounts: [
                    { name: "newAccount", pubkey: decoded.accountPubkey, isSigner: false, isWritable: true },
                    { name: "base", pubkey: decoded.basePubkey, isSigner: true, isWritable: false },
                ],
                args: {
                    seed: decoded.seed,
                    space: new anchor_1.BN(decoded.space),
                    owner: decoded.programId,
                    base: decoded.basePubkey,
                },
            };
            break;
        }
        case "Assign": {
            const decoded = web3_js_1.SystemInstruction.decodeAssign(instruction);
            parsed = {
                name: "assign",
                accounts: [{ name: "assignedAccount", pubkey: decoded.accountPubkey, isSigner: true, isWritable: true }],
                args: { owner: decoded.programId },
            };
            break;
        }
        case "AssignWithSeed": {
            const decoded = web3_js_1.SystemInstruction.decodeAssignWithSeed(instruction);
            parsed = {
                name: "assignWithSeed",
                accounts: [
                    { name: "assigned", pubkey: decoded.accountPubkey, isSigner: false, isWritable: true },
                    { name: "base", pubkey: decoded.basePubkey, isSigner: true, isWritable: false },
                ],
                args: {
                    seed: decoded.seed,
                    owner: decoded.programId,
                    base: decoded.basePubkey,
                },
            };
            break;
        }
        case "AuthorizeNonceAccount": {
            const decoded = web3_js_1.SystemInstruction.decodeNonceAuthorize(instruction);
            parsed = {
                name: "authorizeNonceAccount",
                accounts: [
                    { name: "nonce", isSigner: false, isWritable: true, pubkey: decoded.noncePubkey },
                    { name: "nonceAuthority", isSigner: true, isWritable: false, pubkey: decoded.authorizedPubkey },
                ],
                args: { authorized: decoded.newAuthorizedPubkey },
            };
            break;
        }
        case "Create": {
            const decoded = web3_js_1.SystemInstruction.decodeCreateAccount(instruction);
            parsed = {
                name: "createAccount",
                accounts: [
                    { name: "payer", pubkey: decoded.fromPubkey, isSigner: true, isWritable: true },
                    { name: "newAccount", pubkey: decoded.newAccountPubkey, isSigner: true, isWritable: true },
                ],
                args: { lamports: new anchor_1.BN(decoded.lamports), owner: decoded.programId, space: new anchor_1.BN(decoded.space) },
            };
            break;
        }
        case "CreateWithSeed": {
            const decoded = web3_js_1.SystemInstruction.decodeCreateWithSeed(instruction);
            parsed = {
                name: "createAccountWithSeed",
                accounts: [
                    { name: "payer", pubkey: decoded.fromPubkey, isSigner: true, isWritable: true },
                    { name: "created", pubkey: decoded.newAccountPubkey, isSigner: false, isWritable: true },
                    { name: "base", pubkey: decoded.basePubkey, isSigner: true, isWritable: false },
                ],
                args: {
                    lamports: new anchor_1.BN(decoded.lamports),
                    owner: decoded.programId,
                    space: new anchor_1.BN(decoded.space),
                    seed: decoded.seed,
                    base: decoded.basePubkey,
                },
            };
            break;
        }
        case "InitializeNonceAccount": {
            const decoded = web3_js_1.SystemInstruction.decodeNonceInitialize(instruction);
            parsed = {
                name: "initializeNonceAccount",
                accounts: [
                    { name: "nonce", pubkey: decoded.noncePubkey, isSigner: false, isWritable: true },
                    { name: "recentBlockhashSysvar", ...instruction.keys[1] },
                    { name: "rentSysvar", ...instruction.keys[2] },
                ],
                args: { authorized: decoded.authorizedPubkey },
            };
            break;
        }
        case "Transfer": {
            const decoded = web3_js_1.SystemInstruction.decodeTransfer(instruction);
            parsed = {
                name: "transfer",
                accounts: [
                    { name: "sender", pubkey: decoded.fromPubkey, isSigner: true, isWritable: true },
                    { name: "receiver", pubkey: decoded.toPubkey, isWritable: true, isSigner: false },
                ],
                args: { lamports: new anchor_1.BN(decoded.lamports.toString()) },
            };
            break;
        }
        case "TransferWithSeed": {
            const decoded = web3_js_1.SystemInstruction.decodeTransferWithSeed(instruction);
            parsed = {
                name: "transferWithSeed",
                accounts: [
                    { name: "sender", pubkey: decoded.fromPubkey, isSigner: false, isWritable: true },
                    { name: "base", pubkey: decoded.basePubkey, isSigner: true, isWritable: false },
                    { name: "receiver", pubkey: decoded.toPubkey, isSigner: false, isWritable: true },
                ],
                args: { owner: decoded.programId, lamports: new anchor_1.BN(decoded.lamports.toString()), seed: decoded.seed },
            };
            break;
        }
        case "WithdrawNonceAccount": {
            const decoded = web3_js_1.SystemInstruction.decodeNonceWithdraw(instruction);
            parsed = {
                name: "withdrawNonceAccount",
                accounts: [
                    { name: "nonce", pubkey: decoded.noncePubkey, isSigner: false, isWritable: true },
                    { name: "recepient", pubkey: decoded.toPubkey, isSigner: false, isWritable: true },
                    { name: "recentBlockhashSysvar", ...instruction.keys[2] },
                    { name: "rentSysvar", ...instruction.keys[3] },
                    { name: "nonceAuthority", pubkey: decoded.noncePubkey, isSigner: true, isWritable: false },
                ],
                args: { lamports: new anchor_1.BN(decoded.lamports) },
            };
            break;
        }
        default: {
            parsed = null;
        }
    }
    return parsed
        ? {
            ...parsed,
            programId: web3_js_1.SystemProgram.programId,
        }
        : {
            programId: web3_js_1.SystemProgram.programId,
            name: "unknown",
            accounts: instruction.keys,
            args: { unknown: instruction.data },
        };
}
function decodeTokenInstruction(instruction) {
    let parsed;
    const decoded = (0, buffer_layout_1.u8)().decode(instruction.data);
    switch (decoded) {
        case spl_token_1.TokenInstruction.InitializeMint: {
            const decodedIx = (0, spl_token_1.decodeInitializeMintInstruction)(instruction);
            parsed = {
                name: "initializeMint",
                accounts: [
                    { name: "tokenMint", ...decodedIx.keys.mint },
                    { name: "rentSysvar", ...decodedIx.keys.rent },
                ],
                args: { decimals: decodedIx.data.decimals, mintAuthority: decodedIx.data.mintAuthority, freezeAuthority: decodedIx.data.freezeAuthority },
            };
            break;
        }
        case spl_token_1.TokenInstruction.InitializeAccount: {
            const decodedIx = (0, spl_token_1.decodeInitializeAccountInstruction)(instruction);
            parsed = {
                name: "initializeAccount",
                accounts: [
                    { name: "newAccount", ...decodedIx.keys.account },
                    { name: "tokenMint", ...decodedIx.keys.mint },
                    { name: "owner", ...decodedIx.keys.owner },
                    { name: "rentSysvar", ...decodedIx.keys.rent },
                ],
                args: {},
            };
            break;
        }
        case spl_token_1.TokenInstruction.InitializeMultisig: {
            const decodedIx = (0, spl_token_1.decodeInitializeMultisigInstruction)(instruction);
            const multisig = decodedIx.keys.signers.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
            parsed = {
                name: "initializeMultisig",
                accounts: [{ name: "multisig", ...decodedIx.keys.account }, { name: "rentSysvar", ...decodedIx.keys.rent }, ...multisig],
                args: { m: decodedIx.data.m },
            };
            break;
        }
        case spl_token_1.TokenInstruction.Transfer: {
            const decodedIx = (0, spl_token_1.decodeTransferInstruction)(instruction);
            const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
            parsed = {
                name: "transfer",
                accounts: [
                    { name: "source", ...decodedIx.keys.source },
                    { name: "destination", ...decodedIx.keys.destination },
                    { name: "owner", ...decodedIx.keys.owner },
                    ...multisig,
                ],
                args: { amount: new anchor_1.BN(decodedIx.data.amount.toString()) },
            };
            break;
        }
        case spl_token_1.TokenInstruction.Approve: {
            const decodedIx = (0, spl_token_1.decodeApproveInstruction)(instruction);
            const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
            parsed = {
                name: "approve",
                accounts: [
                    { name: "source", ...decodedIx.keys.account },
                    { name: "delegate", ...decodedIx.keys.delegate },
                    { name: "owner", ...decodedIx.keys.owner },
                    ...multisig,
                ],
                args: { amount: new anchor_1.BN(decodedIx.data.amount.toString()) },
            };
            break;
        }
        case spl_token_1.TokenInstruction.Revoke: {
            const decodedIx = (0, spl_token_1.decodeRevokeInstruction)(instruction);
            const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
            parsed = {
                name: "revoke",
                accounts: [{ name: "source", ...decodedIx.keys.account }, { name: "owner", ...decodedIx.keys.owner }, ...multisig],
                args: {},
            };
            break;
        }
        case spl_token_1.TokenInstruction.SetAuthority: {
            const decodedIx = (0, spl_token_1.decodeSetAuthorityInstruction)(instruction);
            const authrorityTypeMap = {
                [spl_token_1.AuthorityType.AccountOwner]: { accountOwner: {} },
                [spl_token_1.AuthorityType.CloseAccount]: { closeAccount: {} },
                [spl_token_1.AuthorityType.FreezeAccount]: { freezeAccount: {} },
                [spl_token_1.AuthorityType.MintTokens]: { mintTokens: {} },
            };
            const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
            parsed = {
                name: "setAuthority",
                accounts: [{ name: "account", ...decodedIx.keys.account }, { name: "currentAuthority", ...decodedIx.keys.currentAuthority }, ...multisig],
                args: { authorityType: authrorityTypeMap[decodedIx.data.authorityType], newAuthority: decodedIx.data.newAuthority },
            };
            break;
        }
        case spl_token_1.TokenInstruction.MintTo: {
            const decodedIx = (0, spl_token_1.decodeMintToInstruction)(instruction);
            const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
            parsed = {
                name: "mintTo",
                accounts: [
                    { name: "tokenMint", ...decodedIx.keys.mint },
                    { name: "mintTo", ...decodedIx.keys.destination },
                    { name: "authority", ...decodedIx.keys.authority },
                    ...multisig,
                ],
                args: { amount: new anchor_1.BN(decodedIx.data.amount.toString()) },
            };
            break;
        }
        case spl_token_1.TokenInstruction.Burn: {
            const decodedIx = (0, spl_token_1.decodeBurnInstruction)(instruction);
            const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
            parsed = {
                name: "burn",
                accounts: [
                    { name: "burnFrom", ...decodedIx.keys.account },
                    { name: "tokenMint", ...decodedIx.keys.mint },
                    { name: "owner", ...decodedIx.keys.owner },
                    ...multisig,
                ],
                args: { amount: new anchor_1.BN(decodedIx.data.amount.toString()) },
            };
            break;
        }
        case spl_token_1.TokenInstruction.CloseAccount: {
            const decodedIx = (0, spl_token_1.decodeCloseAccountInstruction)(instruction);
            const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
            parsed = {
                name: "closeAccount",
                accounts: [
                    { name: "account", ...decodedIx.keys.account },
                    { name: "destination", ...decodedIx.keys.destination },
                    { name: "owner", ...decodedIx.keys.authority },
                    ...multisig,
                ],
                args: {},
            };
            break;
        }
        case spl_token_1.TokenInstruction.FreezeAccount: {
            const decodedIx = (0, spl_token_1.decodeFreezeAccountInstruction)(instruction);
            const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
            parsed = {
                name: "freezeAccount",
                accounts: [
                    { name: "account", ...decodedIx.keys.account },
                    { name: "tokenMint", ...decodedIx.keys.mint },
                    { name: "authority", ...decodedIx.keys.authority },
                    ...multisig,
                ],
                args: {},
            };
            break;
        }
        case spl_token_1.TokenInstruction.ThawAccount: {
            const decodedIx = (0, spl_token_1.decodeThawAccountInstruction)(instruction);
            const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
            parsed = {
                name: "thawAccount",
                accounts: [
                    { name: "account", ...decodedIx.keys.account },
                    { name: "tokenMint", ...decodedIx.keys.mint },
                    { name: "authority", ...decodedIx.keys.authority },
                    ...multisig,
                ],
                args: {},
            };
            break;
        }
        case spl_token_1.TokenInstruction.TransferChecked: {
            const decodedIx = (0, spl_token_1.decodeTransferCheckedInstruction)(instruction);
            const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
            parsed = {
                name: "transferChecked",
                accounts: [
                    { name: "source", ...decodedIx.keys.source },
                    { name: "tokenMint", ...decodedIx.keys.mint },
                    { name: "destination", ...decodedIx.keys.destination },
                    { name: "owner", ...decodedIx.keys.owner },
                    ...multisig,
                ],
                args: { amount: new anchor_1.BN(decodedIx.data.amount.toString()), decimals: decodedIx.data.decimals },
            };
            break;
        }
        case spl_token_1.TokenInstruction.ApproveChecked: {
            const decodedIx = (0, spl_token_1.decodeApproveCheckedInstruction)(instruction);
            const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
            parsed = {
                name: "approveChecked",
                accounts: [
                    { name: "source", ...decodedIx.keys.account },
                    { name: "tokenMint", ...decodedIx.keys.mint },
                    { name: "delegate", ...decodedIx.keys.delegate },
                    { name: "owner", ...decodedIx.keys.owner },
                    ...multisig,
                ],
                args: { amount: new anchor_1.BN(decodedIx.data.amount.toString()), decimals: decodedIx.data.decimals },
            };
            break;
        }
        case spl_token_1.TokenInstruction.MintToChecked: {
            const decodedIx = (0, spl_token_1.decodeMintToCheckedInstruction)(instruction);
            const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
            parsed = {
                name: "mintToChecked",
                accounts: [
                    { name: "tokenMint", ...decodedIx.keys.mint },
                    { name: "mintTo", ...decodedIx.keys.destination },
                    { name: "authority", ...decodedIx.keys.authority },
                    ...multisig,
                ],
                args: { amount: new anchor_1.BN(decodedIx.data.amount.toString()), decimals: decodedIx.data.decimals },
            };
            break;
        }
        case spl_token_1.TokenInstruction.BurnChecked: {
            const decodedIx = (0, spl_token_1.decodeBurnCheckedInstruction)(instruction);
            const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
            parsed = {
                name: "burnChecked",
                accounts: [
                    { name: "burnFrom", ...decodedIx.keys.account },
                    { name: "tokenMint", ...decodedIx.keys.mint },
                    { name: "owner", ...decodedIx.keys.owner },
                    ...multisig,
                ],
                args: { amount: new anchor_1.BN(decodedIx.data.amount.toString()), decimals: decodedIx.data.decimals },
            };
            break;
        }
        case spl_token_1.TokenInstruction.InitializeAccount2: {
            const initializeAccount2InstructionData = (0, buffer_layout_1.struct)([(0, buffer_layout_1.u8)("instruction"), (0, buffer_layout_1.blob)(32, "owner")]);
            const decodedIx = initializeAccount2InstructionData.decode(instruction.data);
            parsed = {
                name: "initializeAccount2",
                accounts: [
                    { name: "newAccount", ...instruction.keys[0] },
                    { name: "tokenMint", ...instruction.keys[1] },
                    { name: "rentSysvar", ...instruction.keys[2] },
                ],
                args: { owner: new web3_js_1.PublicKey(decodedIx.owner) },
            };
            break;
        }
        case spl_token_1.TokenInstruction.SyncNative: {
            parsed = {
                name: "syncNative",
                accounts: [{ name: "account", ...instruction.keys[0] }],
                args: {},
            };
            break;
        }
        case spl_token_1.TokenInstruction.InitializeAccount3: {
            const initializeAccount3InstructionData = (0, buffer_layout_1.struct)([(0, buffer_layout_1.u8)("instruction"), (0, buffer_layout_1.blob)(32, "owner")]);
            const decodedIx = initializeAccount3InstructionData.decode(instruction.data);
            parsed = {
                name: "initializeAccount3",
                accounts: [
                    { name: "newAccount", ...instruction.keys[0] },
                    { name: "tokenMint", ...instruction.keys[1] },
                ],
                args: { owner: new web3_js_1.PublicKey(decodedIx.owner) },
            };
            break;
        }
        case spl_token_1.TokenInstruction.InitializeMultisig2: {
            const multisig = instruction.keys.slice(1).map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
            parsed = {
                name: "initializeMultisig2",
                accounts: [{ name: "multisig", ...instruction.keys[0] }, ...multisig],
                args: { m: instruction.data[1] },
            };
            break;
        }
        case spl_token_1.TokenInstruction.InitializeMint2: {
            const decodedIx = (0, spl_token_1.decodeInitializeMintInstructionUnchecked)(instruction);
            const tokenMint = decodedIx.keys.mint;
            if (!tokenMint)
                throw new Error(`Failed to parse InitializeMint2 instruction`);
            parsed = {
                name: "initializeMint2",
                accounts: [{ name: "tokenMint", ...decodedIx.keys.mint }],
                args: { decimals: decodedIx.data.decimals, mintAuthority: decodedIx.data.mintAuthority, freezeAuthority: decodedIx.data.freezeAuthority },
            };
            break;
        }
        default: {
            parsed = null;
        }
    }
    return parsed
        ? {
            ...parsed,
            programId: spl_token_1.TOKEN_PROGRAM_ID,
        }
        : {
            programId: spl_token_1.TOKEN_PROGRAM_ID,
            name: "unknown",
            accounts: instruction.keys,
            args: { unknown: instruction.data },
        };
}
function decodeAssociatedTokenInstruction(instruction) {
    return {
        name: "createAssociatedTokenAccount",
        accounts: [
            { name: "fundingAccount", ...instruction.keys[0] },
            { name: "newAccount", ...instruction.keys[1] },
            { name: "wallet", ...instruction.keys[2] },
            { name: "tokenMint", ...instruction.keys[3] },
            { name: "systemProgram", ...instruction.keys[4] },
            { name: "tokenProgram", ...instruction.keys[5] },
            ...[instruction.keys.length > 5 ? { name: "rentSysvar", ...instruction.keys[6] } : undefined],
        ],
        args: {},
        programId: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
    };
}
function flattenIdlAccounts(accounts, prefix) {
    return accounts
        .map((account) => {
        const accName = account.name;
        if (Object.prototype.hasOwnProperty.call(account, "accounts")) {
            const newPrefix = prefix ? `${prefix} > ${accName}` : accName;
            return flattenIdlAccounts(account.accounts, newPrefix);
        }
        else {
            return {
                ...account,
                name: prefix ? `${prefix} > ${accName}` : accName,
            };
        }
    })
        .flat();
}
/**
 * Class for parsing arbitrary solana transactions in various formats
 * - by txHash
 * - from raw transaction data (base64 encoded or buffer)
 * - @solana/web3.js getTransaction().message object
 * - @solana/web3.js getParsedTransaction().message or Transaction.compileMessage() object
 * - @solana/web3.js TransactionInstruction object
 */
class SolanaParser {
    /**
     * Initializes parser object
     * `SystemProgram`, `TokenProgram` and `AssociatedTokenProgram` are supported by default
     * but may be overriden by providing custom idl/custom parser
     * @param programInfos list of objects which contains programId and corresponding idl
     * @param parsers list of pairs (programId, custom parser)
     */
    constructor(programInfos, parsers) {
        const standartParsers = [
            [web3_js_1.SystemProgram.programId.toBase58(), decodeSystemInstruction],
            [spl_token_1.TOKEN_PROGRAM_ID.toBase58(), decodeTokenInstruction],
            [spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID.toBase58(), decodeAssociatedTokenInstruction],
        ];
        let result;
        parsers = parsers || [];
        for (const programInfo of programInfos) {
            parsers.push(this.buildIdlParser(new web3_js_1.PublicKey(programInfo.programId), programInfo.idl));
        }
        if (!parsers) {
            result = new Map(standartParsers);
        }
        else {
            // first set provided parsers
            result = new Map(parsers);
            // append standart parsers if parser not exist yet
            for (const parserInfo of standartParsers) {
                if (!result.has(parserInfo[0])) {
                    result.set(...parserInfo);
                }
            }
        }
        this.instructionParsers = result;
    }
    /**
     * Adds (or updates) parser for provided programId
     * @param programId program id to add parser for
     * @param parser parser to parse programId instructions
     */
    addParser(programId, parser) {
        this.instructionParsers.set(programId.toBase58(), parser);
    }
    /**
     * Adds (or updates) parser for provided programId
     * @param programId program id to add parser for
     * @param idl IDL that describes anchor program
     */
    addParserFromIdl(programId, idl) {
        this.instructionParsers.set(...this.buildIdlParser(new web3_js_1.PublicKey(programId), idl));
    }
    buildIdlParser(programId, idl) {
        const idlParser = (instruction) => {
            const coder = new anchor_1.BorshInstructionCoder(idl);
            const parsedIx = coder.decode(instruction.data);
            if (!parsedIx) {
                return this.buildUnknownParsedInstruction(instruction.programId, instruction.keys, instruction.data);
            }
            else {
                const ix = idl.instructions.find((instr) => instr.name === parsedIx.name);
                if (!ix) {
                    return this.buildUnknownParsedInstruction(instruction.programId, instruction.keys, instruction.data, parsedIx.name);
                }
                const flatIdlAccounts = flattenIdlAccounts(ix.accounts);
                const accounts = instruction.keys.map((meta, idx) => {
                    if (idx < flatIdlAccounts.length) {
                        return {
                            name: flatIdlAccounts[idx].name,
                            ...meta,
                        };
                    }
                    // "Remaining accounts" are unnamed in Anchor.
                    else {
                        return {
                            name: `Remaining ${idx - flatIdlAccounts.length}`,
                            ...meta,
                        };
                    }
                });
                return {
                    name: parsedIx.name,
                    accounts,
                    programId: instruction.programId,
                    args: parsedIx.data, // as IxArgsMap<typeof idl, typeof idl["instructions"][number]["name"]>,
                };
            }
        };
        return [programId.toBase58(), idlParser.bind(this)];
    }
    /**
     * Removes parser for provided program id
     * @param programId program id to remove parser for
     */
    removeParser(programId) {
        this.instructionParsers.delete(programId.toBase58());
    }
    buildUnknownParsedInstruction(programId, accounts, argData, name) {
        return {
            programId,
            accounts,
            args: { unknown: argData },
            name: name || "unknown",
        };
    }
    /**
     * Parses instruction
     * @param instruction transaction instruction to parse
     * @returns parsed transaction instruction or UnknownInstruction
     */
    parseInstruction(instruction) {
        if (!this.instructionParsers.has(instruction.programId.toBase58())) {
            return this.buildUnknownParsedInstruction(instruction.programId, instruction.keys, instruction.data);
        }
        else {
            const parser = this.instructionParsers.get(instruction.programId.toBase58());
            return parser(instruction);
        }
    }
    /**
     * Parses transaction data
     * @param txMessage message to parse
     * @param altLoadedAddresses VersionedTransaction.meta.loaddedAddresses if tx is versioned
     * @returns list of parsed instructions
     */
    parseTransactionData(txMessage, altLoadedAddresses = undefined) {
        const parsedAccounts = (0, helpers_1.parseTransactionAccounts)(txMessage, altLoadedAddresses);
        return txMessage.compiledInstructions.map((instruction) => this.parseInstruction((0, helpers_1.compiledInstructionToInstruction)(instruction, parsedAccounts)));
    }
    /**
     * Parses transaction data retrieved from Connection.getParsedTransaction
     * @param txParsedMessage message to parse
     * @returns list of parsed instructions
     */
    parseTransactionParsedData(txParsedMessage) {
        const parsedAccounts = txParsedMessage.accountKeys.map((metaLike) => ({
            isSigner: metaLike.signer,
            isWritable: metaLike.writable,
            pubkey: metaLike.pubkey,
        }));
        return txParsedMessage.instructions.map((parsedIx) => this.parseInstruction((0, helpers_1.parsedInstructionToInstruction)(parsedIx, parsedAccounts)));
    }
    /**
     * Fetches tx from blockchain and parses it
     * @param connection web3 Connection
     * @param txId transaction id
     * @param flatten - true if CPI calls need to be parsed too
     * @returns list of parsed instructions
     */
    async parseTransaction(connection, txId, flatten = false, commitment = "confirmed") {
        var _a;
        const transaction = await connection.getTransaction(txId, { commitment: commitment, maxSupportedTransactionVersion: 0 });
        if (!transaction)
            return null;
        if (flatten) {
            const flattened = (0, helpers_1.flattenTransactionResponse)(transaction);
            return flattened.map((ix) => this.parseInstruction(ix));
        }
        return this.parseTransactionData(transaction.transaction.message, (_a = transaction.meta) === null || _a === void 0 ? void 0 : _a.loadedAddresses);
    }
    /**
     * Parses transaction dump
     * @param txDump base64-encoded string or raw Buffer which contains tx dump
     * @returns list of parsed instructions
     */
    parseTransactionDump(txDump) {
        if (!(txDump instanceof buffer_1.Buffer))
            txDump = buffer_1.Buffer.from(txDump, "base64");
        const tx = web3_js_1.Transaction.from(txDump);
        const message = tx.compileMessage();
        return this.parseTransactionData(message);
    }
}
exports.SolanaParser = SolanaParser;
//# sourceMappingURL=parsers.js.map