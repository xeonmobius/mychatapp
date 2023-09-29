import { Hono } from "hono"
import User from "../models/userModel"
import generateToken from "../config/generateToken"
const routes = new Hono()

// Register User
routes.post('/', async (c) => {
    const {name, email, password, pic}  = await c.req.json();
    if (!name || !email || !password) {
        c.status(400);
        return c.json({ error: "Please add all the fields" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        c.status(400);
        return c.json({ error: "Email already exists" });
    }

    const user = await User.create({
        name,
        email,
        password,
        pic
    })

    if (user) {
        c.status(201);
        return c.json({ 
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.picture,
            token: await generateToken(user._id.toString())
        });
    } else {
        c.status(500);
        return c.json({ error: "Something went wrong" });
    }
})

routes.post('/login', async (c) => {
    const { email, password } = await c.req.json();
    if (!email || !password) {
        c.status(400);
        return c.json({ error: "Please add all the fields" });
    }
    const user = await User.findOne({ email });

    if (user && await Bun.password.verify(password, user.password)) {
        c.status(201);
        return c.json({ 
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.picture,
            token: await generateToken(user._id.toString())
        });
    }

    return c.json({ token: generateToken(email) });
})


export default routes