'use client'
import UserApi from "@/api/UserApi";
import MainHero from "@/components/MainHero";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {

  return (
    <main className="flex flex-col items-center py-14 space-y-14">
      <MainHero />
    </main>
  );
}
