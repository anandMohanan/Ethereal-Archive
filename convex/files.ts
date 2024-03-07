import { ConvexError, v } from "convex/values";
import { MutationCtx, QueryCtx, mutation, query } from "./_generated/server";
import { getUser } from "./users";
import { fileType } from "./schema";

export const generateUploadUrl = mutation(async (ctx) => {
  const isAuth = await ctx.auth.getUserIdentity();
  if (!isAuth) {
    throw new ConvexError("Login to insert files");
  }

  return await ctx.storage.generateUploadUrl();
});

const validateAccess = async (
  ctx: QueryCtx | MutationCtx,
  tokenIdentifier: string,
  orgId: string
) => {
  const user = await getUser(ctx, tokenIdentifier);

  const hasAccess =
    user.orgIds.includes(orgId) || user.tokenIdentifier.includes(orgId);

  return hasAccess;
};

export const createFile = mutation({
  args: {
    name: v.string(),
    orgId: v.string(),
    fileId: v.id("_storage"),
    fileType: fileType,
  },
  async handler(ctx, args) {
    const isAuth = await ctx.auth.getUserIdentity();
    if (!isAuth) {
      throw new ConvexError("Login to insert files");
    }

    const hasAccess = validateAccess(ctx, isAuth.tokenIdentifier, args.orgId);

    if (!hasAccess) {
      throw new ConvexError("You dont have access to this org");
    }
    ctx.db.insert("files", {
      name: args.name,
      orgId: args.orgId,
      fileId: args.fileId,
      fileType: args.fileType,
    });
  },
});

export const getFiles = query({
  args: {
    orgId: v.string(),
    query: v.optional(v.string()),
  },
  async handler(ctx, args) {
    const isAuth = await ctx.auth.getUserIdentity();
    if (!isAuth) {
      return [];
    }

    const hasAccess = validateAccess(ctx, isAuth.tokenIdentifier, args.orgId);
    if (!hasAccess) {
      return [];
    }
    const files = await ctx.db
      .query("files")
      .withIndex("by_orgId", (q) => q.eq("orgId", args.orgId))
      .collect();

    const query = args.query;
    if (!query || query == "") {
      return files;
    } else {
      return files.filter((file) =>
        file.name.toLowerCase().includes(query.toLowerCase())
      );
    }
  },
});

export const deleteFile = mutation({
  args: {
    fileId: v.id("files"),
  },
  async handler(ctx, args) {
    const isAuth = await ctx.auth.getUserIdentity();
    if (!isAuth) {
      throw new ConvexError(
        "You dont have access to perform this operation on this file"
      );
    }

    const file = await ctx.db.get(args.fileId);
    if (!file) {
      throw new ConvexError("File does not exist");
    }

    const hasAccess = validateAccess(ctx, isAuth.tokenIdentifier, file.orgId);
    if (!hasAccess) {
      throw new ConvexError(
        "You dont have access to perform this operation on this file"
      );
    }
    await ctx.storage.delete(file.fileId);
    await ctx.db.delete(args.fileId);
  },
});
