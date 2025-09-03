import { Controller, Post, UseGuards, Body, Req, Get } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard("local"))
  @Post("login")
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @Post("validate")
  async validateToken(@Body() body: { token: string }) {
    try {
      if (!body.token) {
        return { valid: false };
      }
      // In a real implementation, you would verify the JWT token here
      return { valid: true };
    } catch (error) {
      return { valid: false };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  async getCurrentUser(@Req() req) {
    return req.user;
  }
}
