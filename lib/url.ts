export const OwnerURL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_OWNER_PRODUCTION_URL!
    : "http://localhost:3001"
