import { NestMiddleware } from "@nestjs/common";

export class AuthMiddleware implements NestMiddleware {
    use(req: any, res: any, next: (error?: any) => void) {
        console.log("Middlware called..")
        next()
    }
}