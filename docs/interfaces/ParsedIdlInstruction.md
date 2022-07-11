[@debridge-finance/solana-transaction-parser](../README.md) / [Exports](../modules.md) / ParsedIdlInstruction

# Interface: ParsedIdlInstruction<I, IxName\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `I` | extends `Idl` |
| `IxName` | extends [`InstructionNames`](../modules.md#instructionnames)<`I`\> = [`InstructionNames`](../modules.md#instructionnames)<`I`\> |

## Table of contents

### Properties

- [accounts](ParsedIdlInstruction.md#accounts)
- [args](ParsedIdlInstruction.md#args)
- [name](ParsedIdlInstruction.md#name)
- [programId](ParsedIdlInstruction.md#programid)

## Properties

### accounts

• **accounts**: [`ParsedAccount`](ParsedAccount.md)[]

Parsed accounts

#### Defined in

interfaces.ts:73

___

### args

• **args**: [`ParsedIdlArgs`](../modules.md#parsedidlargs)<`I`, `IxName`\>

Parsed arguments

#### Defined in

interfaces.ts:71

___

### name

• **name**: `IxName`

Instruction name

#### Defined in

interfaces.ts:68

___

### programId

• **programId**: `PublicKey`

#### Defined in

interfaces.ts:69
