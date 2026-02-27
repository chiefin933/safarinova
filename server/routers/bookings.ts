import { z } from "zod";
import { protectedProcedure, adminProcedure, router } from "../_core/trpc";
import { createBooking, getUserBookings, getAllBookings, updateBookingStatus } from "../db";

export const bookingsRouter = router({
  // Create a new booking (protected - authenticated users only)
  create: protectedProcedure
    .input(
      z.object({
        destinationSlug: z.string(),
        destinationName: z.string(),
        tripStartDate: z.date().optional(),
        tripEndDate: z.date().optional(),
        numberOfTravellers: z.number().int().positive(),
        totalPrice: z.number().int().nonnegative(),
        pricingTier: z.string(),
        specialRequests: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const booking = await createBooking({
        userId: ctx.user.id,
        destinationSlug: input.destinationSlug,
        destinationName: input.destinationName,
        tripStartDate: input.tripStartDate,
        tripEndDate: input.tripEndDate,
        numberOfTravellers: input.numberOfTravellers,
        totalPrice: input.totalPrice,
        pricingTier: input.pricingTier,
        specialRequests: input.specialRequests,
        status: "pending",
      });
      return booking;
    }),

  // Get user's own bookings (protected)
  myBookings: protectedProcedure.query(async ({ ctx }) => {
    return await getUserBookings(ctx.user.id);
  }),

  // Get all bookings (admin only)
  all: adminProcedure.query(async () => {
    return await getAllBookings();
  }),

  // Update booking status (admin only)
  updateStatus: adminProcedure
    .input(
      z.object({
        bookingId: z.number().int(),
        status: z.enum(["pending", "confirmed", "cancelled", "completed"]),
      })
    )
    .mutation(async ({ input }) => {
      return await updateBookingStatus(input.bookingId, input.status);
    }),
});
