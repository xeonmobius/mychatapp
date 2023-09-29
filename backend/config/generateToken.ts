import { decode, sign, verify } from "hono/jwt";

const generateToken = async (id: string) => {
  const token = await sign({ id }, Bun.env.JWT_SECRET_KEY!);
  return token;
};

export default generateToken;