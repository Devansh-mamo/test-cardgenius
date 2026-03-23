import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const cardsRouter = createTRPCRouter({
  getCardById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const card = await ctx.prisma.card.findUnique({
        where: {
          id: input.id
        }
      });
      if (!card) throw new TRPCError({ code: 'NOT_FOUND' });
      else return card
    }),


  getCardsByUserId: protectedProcedure
    .query(async ({ ctx }) => {
      const Id = ctx.session.user.id
      const cards = await ctx.prisma.card.findMany({
        where: {
          userId: Id
        }
      });

      if (!Id) throw new TRPCError({ code: 'NOT_FOUND' });
      else return cards
    }),

  createCard: protectedProcedure
    .input(
      z.object({
        address: z.string(),
        company: z.string(),
        email: z.string(),
        facebook: z.string(),
        github: z.string(),
        imgUrl: z.string(),
        instagram: z.string(),
        link: z.string(),
        linkedin: z.string(),
        logoUrl: z.string(),
        name: z.string(),
        phone: z.string(),
        title: z.string(),
        twitter: z.string(),
        websitelink: z.string(),
        whatsapp: z.string(),
        youtube: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const Id = ctx.session.user.id
      const cardData = await ctx.prisma.card.create({
        data: {
          userId: Id,
          address: input.address,
          company: input.company,
          email: input.email,
          facebook: input.facebook,
          github: input.github,
          imgUrl: input.imgUrl,
          instagram: input.instagram,
          link: input.link,
          linkedin: input.linkedin,
          logoUrl: input.logoUrl,
          name: input.name,
          phone: input.phone,
          title: input.title,
          twitter: input.twitter,
          websitelink: input.websitelink,
          whatsapp: input.whatsapp,
          youtube: input.youtube
        }
      })
      return cardData
    }),
  deleteCardById: protectedProcedure
    .input(
      z.object({
        Id: z.string()
      }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id
      const deleteCard = await ctx.prisma.card.delete({
        where:{
          id: input.Id
        }
      })
    }
    ),
    EditCardById: protectedProcedure
    .input(
      z.object({
        cardId: z.string(),
        address: z.string(),
        company: z.string(),
        email: z.string(),
        facebook: z.string(),
        github: z.string(),
        imgUrl: z.string(),
        instagram: z.string(),
        link: z.string(),
        linkedin: z.string(),
        logoUrl: z.string(),
        name: z.string(),
        phone: z.string(),
        title: z.string(),
        twitter: z.string(),
        websitelink: z.string(),
        whatsapp: z.string(),
        youtube: z.string()
      }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id
      const editCard = await ctx.prisma.card.update({
        where:{
          id: input.cardId
        },
        data: {
          userId: userId,
          address: input.address,
          company: input.company,
          email: input.email,
          facebook: input.facebook,
          github: input.github,
          imgUrl: input.imgUrl,
          instagram: input.instagram,
          link: input.link,
          linkedin: input.linkedin,
          logoUrl: input.logoUrl,
          name: input.name,
          phone: input.phone,
          title: input.title,
          twitter: input.twitter,
          websitelink: input.websitelink,
          whatsapp: input.whatsapp,
          youtube: input.youtube
        }
      })
    }
    )

});

