import { Application , config} from './depts.ts'
import { userRouter} from "./routes/user.routes.ts"
const app = new Application()

const {PORT} = config()

// app.use((ctx)=>{
//     ctx.response.body="wacome"
// })

app.use(userRouter.routes())

app.listen({port:Number(PORT)})