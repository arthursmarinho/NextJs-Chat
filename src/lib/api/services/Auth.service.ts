// import {ApiAuthException} from "@/lib/shared/exceptions/ApiAuth.exception";
import {User} from "@prisma/client";
import jwt from "jsonwebtoken";
import {omit} from "lodash";
import {ApiError} from "next/dist/server/api-utils";

import {admin} from "../firebase";

export class AuthService {
  static createPayload(user: Partial<User>): Record<string, unknown> {
    return {...omit(user, "id"), sub: user.id};
  }

  static extractUserId(token?: string): number {
    if (!token) throw new ApiError(401, "No token provided");

    const payload = jwt.verify(token, "");

    return Number(payload.sub as string);
  }

  static async extractUserIdFromSsoToken(token?: string): Promise<string> {
    if (!token) throw new ApiError(401, "No token provided");

    const payload = await admin.auth().verifyIdToken(token);

    return payload.sub;
  }

  static generateRefreshToken(user: Partial<User>): string {
    const payload = AuthService.createPayload(user);

    return jwt.sign(payload, "", {});
  }

  static signIn(user: Partial<User>): string {
    const payload = AuthService.createPayload(user);

    return jwt.sign(payload, "");
  }

  static signInWithSso(token: string): undefined {
    // TODO: Implement SSO sign-in logic
    return;
  }

  static verifyRefreshToken(token?: string): boolean {
    if (!token) throw new Error("No token provided");

    jwt.verify(token, "");

    return true;
  }
}
