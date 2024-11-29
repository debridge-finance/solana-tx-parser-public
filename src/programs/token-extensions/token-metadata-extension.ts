import { getArrayCodec, getBytesCodec, getStructCodec, getTupleCodec, getUnitCodec, getDataEnumCodec, getBooleanCodec } from "@solana/codecs-data-structures";
import { getOptionCodec, getU64Codec } from "@solana/codecs";
import { fixCodecSize } from "@solana/codecs";
import { getUtf8Codec } from "@solana/codecs-strings";

export const metadataLayout = getStructCodec([
	["instruction", fixCodecSize(getBytesCodec(), 8)],
	["name", getUtf8Codec()],
	["symbol", getUtf8Codec()],
	["uri", getUtf8Codec()],
	["additionalMetadata", getArrayCodec(getTupleCodec([getUtf8Codec(), getUtf8Codec()]))],
]);

const getFieldCodec = () =>
	[
		["Name", getUnitCodec()],
		["Symbol", getUnitCodec()],
		["Uri", getUnitCodec()],
		["Key", getStructCodec([["value", getTupleCodec([getUtf8Codec()])]])],
	] as const;

export const updateMetadataLayout = getStructCodec([
	["instruction", fixCodecSize(getBytesCodec(), 8)],
	["field", getDataEnumCodec(getFieldCodec())],
	["value", getUtf8Codec()],
]);

export const removeKeyLayout = getStructCodec([
	["idempotent", getBooleanCodec()],
	["key", getUtf8Codec()],
]);

export const updateAuthorityLayout = getStructCodec([["newAuthority", fixCodecSize(getBytesCodec(), 32)]]);

export const emitLayout = getStructCodec([
	["start", getOptionCodec(getU64Codec())],
	["end", getOptionCodec(getU64Codec())],
]);
