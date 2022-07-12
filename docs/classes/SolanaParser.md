[@debridge-finance/solana-transaction-parser](../README.md) / SolanaParser

# Class: SolanaParser

Class for parsing arbitrary solana transactions in various formats
- by txHash
- from raw transaction data (base64 encoded or buffer)
- @solana/web3.js getTransaction().message object
- @solana/web3.js getParsedTransaction().message or Transaction.compileMessage() object
- @solana/web3.js TransactionInstruction object

## Table of contents

### Constructors

- [constructor](SolanaParser.md#constructor)

### Methods

- [addParser](SolanaParser.md#addparser)
- [addParserFromIdl](SolanaParser.md#addparserfromidl)
- [parseInstruction](SolanaParser.md#parseinstruction)
- [parseTransaction](SolanaParser.md#parsetransaction)
- [parseTransactionData](SolanaParser.md#parsetransactiondata)
- [parseTransactionDump](SolanaParser.md#parsetransactiondump)
- [parseTransactionParsedData](SolanaParser.md#parsetransactionparseddata)
- [removeParser](SolanaParser.md#removeparser)

## Constructors

### constructor

• **new SolanaParser**(`programInfos`, `parsers?`)

Initializes parser object
`SystemProgram`, `TokenProgram` and `AssociatedTokenProgram` are supported by default
but may be overriden by providing custom idl/custom parser

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `programInfos` | [`ProgramInfoType`](../interfaces/ProgramInfoType.md)[] | list of objects which contains programId and corresponding idl |
| `parsers?` | [`InstructionParserInfo`](../README.md#instructionparserinfo)[] | list of pairs (programId, custom parser) |

## Methods

### addParser

▸ **addParser**(`programId`, `parser`): `void`

Adds (or updates) parser for provided programId

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `programId` | `PublicKey` | program id to add parser for |
| `parser` | [`ParserFunction`](../README.md#parserfunction)<`Idl`, `string`\> | parser to parse programId instructions |

#### Returns

`void`

___

### addParserFromIdl

▸ **addParserFromIdl**(`programId`, `idl`): `void`

Adds (or updates) parser for provided programId

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `programId` | `string` \| `PublicKey` | program id to add parser for |
| `idl` | `Idl` | IDL that describes anchor program |

#### Returns

`void`

___

### parseInstruction

▸ **parseInstruction**<`I`, `IxName`\>(`instruction`): [`ParsedInstruction`](../README.md#parsedinstruction)<`I`, `IxName`\>

Parses instruction

#### Type parameters

| Name | Type |
| :------ | :------ |
| `I` | extends `Idl` |
| `IxName` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `instruction` | `TransactionInstruction` | transaction instruction to parse |

#### Returns

[`ParsedInstruction`](../README.md#parsedinstruction)<`I`, `IxName`\>

parsed transaction instruction or UnknownInstruction

___

### parseTransaction

▸ **parseTransaction**(`connection`, `txId`, `flatten?`): `Promise`<``null`` \| [`ParsedInstruction`](../README.md#parsedinstruction)<`Idl`, `string`\>[]\>

Fetches tx from blockchain and parses it

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `connection` | `Connection` | `undefined` | web3 Connection |
| `txId` | `string` | `undefined` | transaction id |
| `flatten` | `boolean` | `false` | true if CPI calls need to be parsed too |

#### Returns

`Promise`<``null`` \| [`ParsedInstruction`](../README.md#parsedinstruction)<`Idl`, `string`\>[]\>

list of parsed instructions

___

### parseTransactionData

▸ **parseTransactionData**(`txMessage`): [`ParsedInstruction`](../README.md#parsedinstruction)<`Idl`, `string`\>[]

Parses transaction data

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `txMessage` | `Message` | message to parse |

#### Returns

[`ParsedInstruction`](../README.md#parsedinstruction)<`Idl`, `string`\>[]

list of parsed instructions

___

### parseTransactionDump

▸ **parseTransactionDump**(`txDump`): [`ParsedInstruction`](../README.md#parsedinstruction)<`Idl`, `string`\>[]

Parses transaction dump

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `txDump` | `string` \| `Buffer` | base64-encoded string or raw Buffer which contains tx dump |

#### Returns

[`ParsedInstruction`](../README.md#parsedinstruction)<`Idl`, `string`\>[]

list of parsed instructions

___

### parseTransactionParsedData

▸ **parseTransactionParsedData**(`txParsedMessage`): [`ParsedInstruction`](../README.md#parsedinstruction)<`Idl`, `string`\>[]

Parses transaction data retrieved from Connection.getParsedTransaction

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `txParsedMessage` | `ParsedMessage` | message to parse |

#### Returns

[`ParsedInstruction`](../README.md#parsedinstruction)<`Idl`, `string`\>[]

list of parsed instructions

___

### removeParser

▸ **removeParser**(`programId`): `void`

Removes parser for provided program id

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `programId` | `PublicKey` | program id to remove parser for |

#### Returns

`void`
