import { Hono } from "hono"

const routes = new Hono()

routes.post('/', (c) => {return c.text('hello world')})
routes.post('/login', (c) => {return c.text('Login')})
routes.get('/', (c) => {return c.text('Hello')})

export default routes