@debridge-finance/solana-transaction-parser

# @debridge-finance/solana-transaction-parser

## Table of contents

### Classes

- [SolanaParser](classes/SolanaParser.md)

### Interfaces

- [ParsedAccount](interfaces/ParsedAccount.md)
- [ParsedCustomInstruction](interfaces/ParsedCustomInstruction.md)
- [ParsedIdlInstruction](interfaces/ParsedIdlInstruction.md)
- [ProgramInfoType](interfaces/ProgramInfoType.md)

### Type Aliases

- [IdlAccount](README.md#idlaccount)
- [IdlAccounts](README.md#idlaccounts)
- [InstructionNames](README.md#instructionnames)
- [InstructionParserInfo](README.md#instructionparserinfo)
- [InstructionParsers](README.md#instructionparsers)
- [IxByName](README.md#ixbyname)
- [LogContext](README.md#logcontext)
- [ParsedArgs](README.md#parsedargs)
- [ParsedIdlArgs](README.md#parsedidlargs)
- [ParsedIdlArgsByInstructionName](README.md#parsedidlargsbyinstructionname)
- [ParsedInstruction](README.md#parsedinstruction)
- [ParserFunction](README.md#parserfunction)
- [TransactionWithLogs](README.md#transactionwithlogs)
- [UnknownInstruction](README.md#unknowninstruction)

### Functions

- [compiledInstructionToInstruction](README.md#compiledinstructiontoinstruction)
- [flattenTransactionResponse](README.md#flattentransactionresponse)
- [hexToBuffer](README.md#hextobuffer)
- [parseLogs](README.md#parselogs)
- [parseTransactionAccounts](README.md#parsetransactionaccounts)
- [parsedInstructionToInstruction](README.md#parsedinstructiontoinstruction)

## Type Aliases

### IdlAccount

Ƭ **IdlAccount**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `isMut` | `boolean` |
| `isSigner` | `boolean` |
| `name` | `string` |

#### Defined in

[interfaces.ts:133](https://github.com/debridge-finance/solana-tx-parser-public/blob/b05f439/src/interfaces.ts#L133)

___

### IdlAccounts

Ƭ **IdlAccounts**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `accounts` | [`IdlAccount`](README.md#idlaccount)[] |
| `name` | `string` |

#### Defined in

[interfaces.ts:139](https://github.com/debridge-finance/solana-tx-parser-public/blob/b05f439/src/interfaces.ts#L139)

___

### InstructionNames

Ƭ **InstructionNames**<`I`\>: `I`[``"instructions"``][`number`][``"name"``]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `I` | extends `Idl` |

#### Defined in

[interfaces.ts:49](https://github.com/debridge-finance/solana-tx-parser-public/blob/b05f439/src/interfaces.ts#L49)

___

### InstructionParserInfo

Ƭ **InstructionParserInfo**: [`string`, [`ParserFunction`](README.md#parserfunction)<`Idl`, `string`\>]

public key as base58 string, parser

#### Defined in

[interfaces.ts:35](https://github.com/debridge-finance/solana-tx-parser-public/blob/b05f439/src/interfaces.ts#L35)

___

### InstructionParsers

Ƭ **InstructionParsers**: `Map`<`string`, [`ParserFunction`](README.md#parserfunction)<`Idl`, `string`\>\>

Map which keys are programIds (base58-encoded) and values are ix parsers

#### Defined in

[interfaces.ts:26](https://github.com/debridge-finance/solana-tx-parser-public/blob/b05f439/src/interfaces.ts#L26)

___

### IxByName

Ƭ **IxByName**<`I`, `IxName`\>: `I`[``"instructions"``][`number`] & { `name`: `IxName`  }

Interface to get instruction by name from IDL

#### Type parameters

| Name | Type |
| :------ | :------ |
| `I` | extends `Idl` |
| `IxName` | extends `I`[``"instructions"``][`number`][``"name"``] |

#### Defined in

[interfaces.ts:131](https://github.com/debridge-finance/solana-tx-parser-public/blob/b05f439/src/interfaces.ts#L131)

___

### LogContext

Ƭ **LogContext**: `Object`

Context of logs for specific instruction

#### Type declaration

| Name | Type |
| :------ | :------ |
| `dataLogs` | `string`[] |
| `depth` | `number` |
| `errors` | `string`[] |
| `id` | `number` |
| `instructionIndex` | `number` |
| `logMessages` | `string`[] |
| `programId` | `string` |
| `rawLogs` | `string`[] |

#### Defined in

[interfaces.ts:7](https://github.com/debridge-finance/solana-tx-parser-public/blob/b05f439/src/interfaces.ts#L7)

___

### ParsedArgs

Ƭ **ParsedArgs**: `Object`

#### Index signature

▪ [key: `string`]: `unknown`

#### Defined in

[interfaces.ts:53](https://github.com/debridge-finance/solana-tx-parser-public/blob/b05f439/src/interfaces.ts#L53)

___

### ParsedIdlArgs

Ƭ **ParsedIdlArgs**<`I`, `IxName`\>: [`ParsedIdlArgsByInstructionName`](README.md#parsedidlargsbyinstructionname)<`I`, [`IxByName`](README.md#ixbyname)<`I`, `IxName`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `I` | extends `Idl` |
| `IxName` | extends [`InstructionNames`](README.md#instructionnames)<`I`\> = [`InstructionNames`](README.md#instructionnames)<`I`\> |

#### Defined in

[interfaces.ts:51](https://github.com/debridge-finance/solana-tx-parser-public/blob/b05f439/src/interfaces.ts#L51)

___

### ParsedIdlArgsByInstructionName

Ƭ **ParsedIdlArgsByInstructionName**<`I`, `Ix`\>: { [ArgName in Ix["args"][number]["name"]]: DecodeType<(Ix["args"][number] & Object)["type"], IdlTypes<I\>\> }

Instructions args with correct types for specific instruction by instruction name

#### Type parameters

| Name | Type |
| :------ | :------ |
| `I` | extends `Idl` |
| `Ix` | extends `I`[``"instructions"``][`number`] |

#### Defined in

[interfaces.ts:45](https://github.com/debridge-finance/solana-tx-parser-public/blob/b05f439/src/interfaces.ts#L45)

___

### ParsedInstruction

Ƭ **ParsedInstruction**<`I`, `IxName`\>: [`UnknownInstruction`](README.md#unknowninstruction) \| [`ParsedIdlInstruction`](interfaces/ParsedIdlInstruction.md)<`I`, `IxName`\> \| [`ParsedCustomInstruction`](interfaces/ParsedCustomInstruction.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `I` | extends `Idl` |
| `IxName` | extends [`InstructionNames`](README.md#instructionnames)<`I`\> = [`InstructionNames`](README.md#instructionnames)<`I`\> |

#### Defined in

[interfaces.ts:64](https://github.com/debridge-finance/solana-tx-parser-public/blob/b05f439/src/interfaces.ts#L64)

___

### ParserFunction

Ƭ **ParserFunction**<`I`, `IxName`\>: (`arg`: `TransactionInstruction`) => [`ParsedInstruction`](README.md#parsedinstruction)<`I`, `IxName`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `I` | extends `Idl` |
| `IxName` | extends [`InstructionNames`](README.md#instructionnames)<`I`\> |

#### Type declaration

▸ (`arg`): [`ParsedInstruction`](README.md#parsedinstruction)<`I`, `IxName`\>

Function that takes transaction ix and returns parsed variant

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `TransactionInstruction` |

##### Returns

[`ParsedInstruction`](README.md#parsedinstruction)<`I`, `IxName`\>

#### Defined in

[interfaces.ts:30](https://github.com/debridge-finance/solana-tx-parser-public/blob/b05f439/src/interfaces.ts#L30)

___

### TransactionWithLogs

Ƭ **TransactionWithLogs**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `logs?` | `string`[] |
| `transaction` | `Transaction` |

#### Defined in

[interfaces.ts:18](https://github.com/debridge-finance/solana-tx-parser-public/blob/b05f439/src/interfaces.ts#L18)

___

### UnknownInstruction

Ƭ **UnknownInstruction**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `accounts` | [`ParsedAccount`](interfaces/ParsedAccount.md)[] |
| `args` | { `unknown`: `unknown`  } |
| `args.unknown` | `unknown` |
| `name` | ``"unknown"`` \| `string` |
| `programId` | `PublicKey` |

#### Defined in

[interfaces.ts:57](https://github.com/debridge-finance/solana-tx-parser-public/blob/b05f439/src/interfaces.ts#L57)

## Functions

### compiledInstructionToInstruction

▸ **compiledInstructionToInstruction**(`compiledInstruction`, `parsedAccounts`): `TransactionInstruction`

Converts compiled instruction into common TransactionInstruction

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `compiledInstruction` | `CompiledInstruction` |  |
| `parsedAccounts` | `AccountMeta`[] | account meta, result of [parseTransactionAccounts](README.md#parsetransactionaccounts) |

#### Returns

`TransactionInstruction`

TransactionInstruction

___

### flattenTransactionResponse

▸ **flattenTransactionResponse**(`transaction`): `Transaction`

Converts transaction response with CPI into artifical transaction that contains all instructions from tx and CPI

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transaction` | `TransactionResponse` | transactionResponse to convert from |

#### Returns

`Transaction`

Transaction object

___

### hexToBuffer

▸ **hexToBuffer**(`data`): `Buffer`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` |

#### Returns

`Buffer`

___

### parseLogs

▸ **parseLogs**(`logs`): [`LogContext`](README.md#logcontext)[]

Parses transaction logs and provides additional context such as
- programId that generated the message
- call id of instruction, that generated the message
- call depth of instruction
- data messages, log messages and error messages

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `logs` | `string`[] | logs from TransactionResponse.meta.logs |

#### Returns

[`LogContext`](README.md#logcontext)[]

parsed logs with call depth and additional context

___

### parseTransactionAccounts

▸ **parseTransactionAccounts**(`message`): `AccountMeta`[]

Parse transaction message and extract account metas

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `Message` | transaction message |

#### Returns

`AccountMeta`[]

parsed accounts metas

___

### parsedInstructionToInstruction

▸ **parsedInstructionToInstruction**(`parsedInstruction`, `accountMeta`): `TransactionInstruction`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parsedInstruction` | `PartiallyDecodedInstruction` |
| `accountMeta` | `AccountMeta`[] |

#### Returns

`TransactionInstruction`
