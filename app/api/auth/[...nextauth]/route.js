import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import connectDB from '@/lib/db'
import User from '@/models/User'

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login"
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "github") {
        try {
          await connectDB();
          // Check if user already exists
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            // Create a new user document
            await User.create({
              name: user.name || profile.login,
              email: user.email,
              username: profile.login,  // GitHub login = username (e.g. "aditya123")
              profilePic: user.image || '',
              coverPic: '',
            });
          }
        } catch (err) {
          console.error("Error saving user to DB:", err);
          // Don't block sign-in even if DB write fails
        }
      }
      return true;
    },

    async jwt({ token, account, profile }) {
      if (account && profile) {
        // Store GitHub login (username) in the token
        token.username = profile.login;
      }
      return token;
    },

    async session({ session, token }) {
      // Expose username on the session object so all client components can use it
      if (token?.username) {
        session.user.username = token.username;
      }
      return session;
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
