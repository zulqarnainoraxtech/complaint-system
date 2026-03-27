import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../prisma/prismaClient";
import { RegisterInput, LoginInput } from "./auth.validation";
import { ApiError } from "../../utils/apiResponse";

export class AuthService {
  async register(input: RegisterInput) {
    const { email, password, name, phone, role, societyId } = input;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ApiError(400, "User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone: phone ? String(phone) : undefined,
        role: role || "user",
        societyId,
      },
    });

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async login(input: LoginInput) {
    const { email, password } = input;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new ApiError(401, "Invalid email or password");
    }

    const token = this.generateToken(user.id, user.email, user.role);

    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }

  private generateToken(userId: string, email: string, role: string) {
    const secret = process.env.JWT_SECRET || "mt-secret-key";
    const expiresIn = process.env.JWT_EXPIRES_IN || "7d";

    return jwt.sign({ id: userId, email, role }, secret, {
      expiresIn: expiresIn as any,
    });
  }
}

export const authService = new AuthService();
