"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/use-cart";
import { useCartUI } from "@/lib/use-cart-ui";
import { ShoppingCart, Menu, X } from "lucide-react";
import CartDrawer from "./CartDrawer";
import Image from "next/image";

export default function Navbar() {
  const { cart } = useCart();
  const { isCartOpen, openCart, closeCart } = useCartUI();
  const [mobileOpen, setMobileOpen] = useState(false);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* 1. Announcement Bar */}
      <div className="fixed top-0 left-0 w-full bg-[#1E1E1E] text-white text-[10px] py-1 text-center z-[60] tracking-widest uppercase">
        Free Shipping
      </div>

      {/* 2. Straight Navbar, stuck to top (below announcement bar) */}
      <nav className="fixed top-[15px] left-0 w-full z-50 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 h-16">

          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 hover:bg-gray-100 transition"
          >
            <Menu size={20} className="text-black" />
          </button>

          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={24} height={24} />
            <span className="font-bold tracking-tighter text-black">PHEROMA</span>
          </Link>

          <button
            onClick={openCart}
            className="relative p-2 hover:bg-gray-100 transition"
          >
            <ShoppingCart size={20} className="text-black" />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#F97316] text-[10px] text-white">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* 3. Full-screen Mobile Menu */}
      <div
        className={`fixed inset-0 z-[70] bg-white transition-transform duration-300 ${
          mobileOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <button onClick={() => setMobileOpen(false)} className="absolute top-6 right-6 p-2">
          <X size={28} />
        </button>

        <div className="flex flex-col items-center justify-center h-full gap-8 text-2xl font-medium tracking-tight">
          <Link href="/" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link href="/category/Parachute" onClick={() => setMobileOpen(false)}>Parachute</Link>
          <Link href="/category/Rexine" onClick={() => setMobileOpen(false)}>Rexine</Link>
          <Link href="/orders" onClick={() => setMobileOpen(false)}>My Orders</Link>
        </div>
      </div>

      {/* Cart Drawer remains functional */}
      <CartDrawer open={isCartOpen} onOpenChange={(open) => (open ? openCart() : closeCart())} />

      {/* Spacer so page content isn't hidden behind the fixed bars */}
      
    </>
  );
}