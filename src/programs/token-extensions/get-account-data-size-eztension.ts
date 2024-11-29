import { getArrayCodec, getStructCodec } from "@solana/codecs-data-structures";
import { getU8Codec } from "@solana/codecs";

export const getAccountDataSizeLayout = getStructCodec([
	["instruction", getU8Codec()],
	["extensions", getArrayCodec(getU8Codec(), { size: 1 })],
]);
