import { HonoRequest } from "hono";

const registerUser = async (c: HonoRequest) => {
    const { name, email, password, pic } = c.req.body;
    if (!name || !email || !password) {
        return c.res.status(422).json({ error: "Please add all the fields" });
    }
    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            c.status(201);
            return c.json({ error: "Email already exist" });
        }
        const user = new User({ name, email, password, pic });
        await user.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.log(error);
    }
}