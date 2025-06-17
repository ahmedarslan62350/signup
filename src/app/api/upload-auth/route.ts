import { getUploadAuthParams } from "@imagekit/next/server";

export async function GET() {
  const { token, expire, signature } = getUploadAuthParams({
    privateKey: "private_iXblBFV++xsgCgvw4C+OwcphSFo=", 
    publicKey: "public_2CNcB9UrCG3O09mZXDAp5pqqCt4=",
  });

  return Response.json({
    token,
    expire,
    signature,
    publicKey: "public_2CNcB9UrCG3O09mZXDAp5pqqCt4=",
  });
}
