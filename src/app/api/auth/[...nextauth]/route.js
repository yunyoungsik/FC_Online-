import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@/models/user';
import { connectToDB } from '@/utils/database';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        await connectToDB();
        const sessionUser = await User.findOne({ email: session.user.email});
        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
          session.user.role = sessionUser.role;
        }
        return session;
      } catch (error) {
        console.error('Error fetching session user:', error);
        throw error;
      }
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
        const existingUser = await User.findOne({ email: profile.email });
        if (!existingUser) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(' ', '').toLowerCase(),
            role: profile.role,
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.error('Error signing in user:', error);
        throw error;
      }
    },
  },
});

export { handler as GET, handler as POST };