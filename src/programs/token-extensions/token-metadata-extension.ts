import { getArrayCodec, getBytesCodec, getStructCodec, getTupleCodec, getUnitCodec, getDataEnumCodec, getBooleanCodec } from "@solana/codecs-data-structures";
import { getOptionCodec, getU64Codec } from "@solana/codecs";
import { getStringCodec } from "@solana/codecs-strings";

export const metadataLayout = getStructCodec([
	["instruction", getBytesCodec({ size: 8 })],
	["name", getStringCodec()],
	["symbol", getStringCodec()],
	["uri", getStringCodec()],
	["additionalMetadata", getArrayCodec(getTupleCodec([getStringCodec(), getStringCodec()]))],
]);

const getFieldCodec = () =>
	[
		["Name", getUnitCodec()],
		["Symbol", getUnitCodec()],
		["Uri", getUnitCodec()],
		["Key", getStructCodec([["value", getTupleCodec([getStringCodec()])]])],
	] as const;

export const updateMetadataLayout = getStructCodec([
	["instruction", getBytesCodec({ size: 8 })],
	["field", getDataEnumCodec(getFieldCodec())],
	["value", getStringCodec()],
]);

export const removeKeyLayout = getStructCodec([
	["idempotent", getBooleanCodec()],
	["key", getStringCodec()],
]);

export const updateAuthorityLayout = getStructCodec([["newAuthority", getBytesCodec({ size: 32 })]]);

export const emitLayout = getStructCodec([
	["start", getOptionCodec(getU64Codec())],
	["end", getOptionCodec(getU64Codec())],
]);
