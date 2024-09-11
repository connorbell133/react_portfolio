import { Header } from "@/sections/Header";
import { Hero } from "@/sections/AboutHero";
import { CallToAction } from "@/sections/CallToAction";
import { Footer } from "@/sections/Footer";
import { GithubShowcase } from "@/sections/GithubShowcase";
import { CollabShowcase } from "../../sections/CollabShowcase";

export default function About() {
  return (
    <>
      <Header />
      <Hero />
      <GithubShowcase />
      <CollabShowcase />
      <CallToAction />
      <Footer />
    </>
  );
}
