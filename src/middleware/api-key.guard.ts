import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Observable } from "rxjs";

@Injectable()
export class ApiKeyGuard implements CanActivate{
    constructor(private readonly configService: ConfigService){}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();

        const incomingApiKey = request.headers['x-api-key'];

        const validApiKey = this.configService.get<string>('API_KEY')

        if(!incomingApiKey || incomingApiKey !== validApiKey){
            throw new UnauthorizedException('Invalid or missing API key');
        }

        return true;
    }
}