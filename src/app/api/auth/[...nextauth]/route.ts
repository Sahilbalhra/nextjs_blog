import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connect from "@/utils/db";
import UserModel from "@/models/User.model";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials: any) {
        await connect();
        try {
          const user: any = UserModel.findOne({ email: credentials.email });

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (isPasswordCorrect) {
              return JSON.stringify(user);
            } else {
              throw new Error("Wrong Credentials!");
            }
          } else {
            throw new Error("User not found !");
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
