import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

export class MyAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        console.log(context.switchToHttp().getRequest())
        return false
    }
    
}