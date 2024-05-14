import UserApi from "@/api/UserApi";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

interface iUser {
  email: string | null | undefined;
  password1: string | null | undefined;
  password2: string | null | undefined;
  username: string | null | undefined;
}

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;

const VerifyUser = async (user: iUser) => {
  try {
    const api = new UserApi();
    return await api.verifyIsUser(user);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const getSessionUser = async (userEmail: string | null | undefined) => {
  try {
    const api = new UserApi();
    const responseData = await api.getUser(userEmail);
    return responseData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      // 로그인 성공 시 호출되는 콜백

      const _user = {
        email: user.email,
        password1: user.id,
        password2: user.id,
        username: user.name,
      };

      if (await VerifyUser(_user)) {
        return true;
      } else {
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      // 로그인 후 리디렉션될 주소를 정하는 콜백
      return baseUrl;
    },
    async session({ session, token, user }) {
      // 세션 정보를 커스텀하는 콜백

      // const _user = await getSessionUser(session.user?.email);

      // if (!session.user) {
      //   session.user = {};
      // }

      // session.user에 id 속성을 추가합니다.

      return session;
    },
    async jwt({ token, user, account }) {
      // JWT 토큰을 커스텀하는 콜백
      return token;
    },
  },
});

export { handler as GET, handler as POST };
