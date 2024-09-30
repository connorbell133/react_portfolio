"use client";
import { useState } from "react";
import ArrowRight from "@/assets/arrow-right.svg";
import Logo from "@/assets/me_avatar.png";
import Image from "next/image";
import MenuIcon from "@/assets/menu.svg";
import Link from "next/link";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    // { href: "/chat", label: "Chat" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/portfolio", label: "Portfolio" },
    // { href: "#", label: "Help" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-20">
      <div className="flex justify-center items-center py-3 bg-black text-white text-sm gap-3">
        <p className="text-white/60 hidden md:block">
          Streamline your workflow and boost your productivity
        </p>
        {/* <div className="inline-flex gap-1 items-center">
          <p>Get started for free</p>
          <ArrowRight className="h-4 w-4 inline-flex justify-center items-center" />
        </div> */}
      </div>
      <div className="py-5">
        <div className="container">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Image src={Logo} alt="Saas Logo" height={40} width={40} />
            </Link>
            <div className="md:hidden">
              <button onClick={toggleMenu}>
                {isMenuOpen ? (
                  <span className="h-5 w-5 text-3xl font-bold text-black">
                    &times;
                  </span>
                ) : (
                  <MenuIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            <nav className="hidden md:flex gap-6 text-black/60 items-center">
              {navLinks.map((link, index) => (
                <a key={index} href={link.href}>
                  {link.label}
                </a>
              ))}
              <Link href="mailto:connor.m.bell13@gmail.com">
                <button className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex align-items justify-center tracking-tight">
                  Contact
                </button>
              </Link>
            </nav>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white text-black absolute top-0 left-0 w-full h-screen z-10 flex flex-col items-center justify-center">
          <nav className="flex flex-col gap-6 text-lg items-center">
            {navLinks.map((link, index) => (
              <a key={index} href={link.href} className="text-black/80">
                {link.label}
              </a>
            ))}
            <Link href="mailto:connor.m.bell13@gmail.com">
              <button className="bg-black text-white px-4 py-2 rounded-lg font-medium tracking-tight">
                Get in touch
              </button>
            </Link>
          </nav>
          <button
            className="absolute top-5 right-5 text-3xl font-bold text-black"
            onClick={toggleMenu}
          >
            &times;
          </button>
        </div>
      )}
    </header>
  );
};
