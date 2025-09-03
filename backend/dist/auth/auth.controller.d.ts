import { AuthService } from "./auth.service";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        access_token: string;
        user: {
            id: any;
            firstName: any;
            lastName: any;
            email: any;
            role: any;
            agency: any;
        };
    }>;
    validateToken(body: {
        token: string;
    }): Promise<{
        valid: boolean;
    }>;
    getCurrentUser(req: any): Promise<any>;
}
