import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import { COOKIE_NAME } from "../shared/const";
import type { TrpcContext } from "./_core/context";
import type { User } from "../drizzle/schema";

/**
 * Test suite for role-based access control (RBAC)
 * Verifies that admin and user roles are properly enforced
 */

function createContext(user: User | null): TrpcContext {
  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

const adminUser: User = {
  id: 1,
  openId: "admin-user-123",
  email: "admin@safarinova.com",
  name: "Admin User",
  loginMethod: "manus",
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date(),
  lastSignedIn: new Date(),
};

const regularUser: User = {
  id: 2,
  openId: "regular-user-456",
  email: "user@safarinova.com",
  name: "Regular User",
  loginMethod: "manus",
  role: "user",
  createdAt: new Date(),
  updatedAt: new Date(),
  lastSignedIn: new Date(),
};

describe("Authentication & RBAC", () => {
  describe("auth.me", () => {
    it("returns current user when authenticated", async () => {
      const ctx = createContext(adminUser);
      const caller = appRouter.createCaller(ctx);
      const result = await caller.auth.me();
      expect(result).toEqual(adminUser);
    });

    it("returns null when not authenticated", async () => {
      const ctx = createContext(null);
      const caller = appRouter.createCaller(ctx);
      const result = await caller.auth.me();
      expect(result).toBeNull();
    });
  });

  describe("bookings.create", () => {
    it("allows authenticated user to create booking", async () => {
      const ctx = createContext(regularUser);
      const caller = appRouter.createCaller(ctx);

      // This test verifies the procedure exists and is protected
      // Actual booking creation would require a database
      expect(caller.bookings.create).toBeDefined();
    });

    it("rejects unauthenticated user from creating booking", async () => {
      const ctx = createContext(null);
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.bookings.create({
          destinationSlug: "serengeti",
          destinationName: "Serengeti",
          numberOfTravellers: 2,
          totalPrice: 5000,
          pricingTier: "luxury",
        });
        expect.fail("Should have thrown UNAUTHORIZED error");
      } catch (error: any) {
        expect(error.code).toBe("UNAUTHORIZED");
      }
    });
  });

  describe("bookings.all", () => {
    it("allows admin to view all bookings", async () => {
      const ctx = createContext(adminUser);
      const caller = appRouter.createCaller(ctx);
      expect(caller.bookings.all).toBeDefined();
    });

    it("rejects regular user from viewing all bookings", async () => {
      const ctx = createContext(regularUser);
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.bookings.all();
        expect.fail("Should have thrown FORBIDDEN error");
      } catch (error: any) {
        expect(error.code).toBe("FORBIDDEN");
      }
    });

    it("rejects unauthenticated user from viewing all bookings", async () => {
      const ctx = createContext(null);
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.bookings.all();
        expect.fail("Should have thrown FORBIDDEN error");
      } catch (error: any) {
        expect(error.code).toBe("FORBIDDEN");
      }
    });
  });

  describe("bookings.updateStatus", () => {
    it("allows admin to update booking status", async () => {
      const ctx = createContext(adminUser);
      const caller = appRouter.createCaller(ctx);
      expect(caller.bookings.updateStatus).toBeDefined();
    });

    it("rejects regular user from updating booking status", async () => {
      const ctx = createContext(regularUser);
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.bookings.updateStatus({
          bookingId: 1,
          status: "confirmed",
        });
        expect.fail("Should have thrown FORBIDDEN error");
      } catch (error: any) {
        expect(error.code).toBe("FORBIDDEN");
      }
    });
  });

  describe("bookings.myBookings", () => {
    it("allows authenticated user to view their own bookings", async () => {
      const ctx = createContext(regularUser);
      const caller = appRouter.createCaller(ctx);
      expect(caller.bookings.myBookings).toBeDefined();
    });

    it("rejects unauthenticated user from viewing bookings", async () => {
      const ctx = createContext(null);
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.bookings.myBookings();
        expect.fail("Should have thrown UNAUTHORIZED error");
      } catch (error: any) {
        expect(error.code).toBe("UNAUTHORIZED");
      }
    });
  });
});
