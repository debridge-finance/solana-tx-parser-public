[@debridge-finance/solana-transaction-parser](../README.md) / ParsedIdlInstruction

# Interface: ParsedIdlInstruction<I, IxName\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `I` | extends `Idl` |
| `IxName` | extends [`InstructionNames`](../README.md#instructionnames)<`I`\> = [`InstructionNames`](../README.md#instructionnames)<`I`\> |

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

[interfaces.ts:86](https://github.com/debridge-finance/solana-tx-parser-public/blob/b05f439/src/interfaces.ts#L86)

___

### args

• **args**: [`ParsedIdlArgs`](../README.md#parsedidlargs)<`I`, `IxName`\>

Parsed arguments

#### Defined in

[interfaces.ts:84](https://github.com/debridge-finance/solana-tx-parser-public/blob/b05f439/src/interfaces.ts#L84)

___

### name

• **name**: `IxName`

Instruction name

#### Defined in

[interfaces.ts:81](https://github.com/debridge-finance/solana-tx-parser-public/blob/b05f439/src/interfaces.ts#L81)

___

### programId

• **programId**: `PublicKey`

#### Defined in

[interfaces.ts:82](https://github.com/debridge-finance/solana-tx-parser-public/blob/b05f439/src/interfaces.ts#L82)
