"use client"

import Hero from "@/components/Hero"
import ProductCard from "@/components/ProductCard"
import { Products } from "@/lib/products"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react"

export default function HomePage() {
  /* =========================================================
     PRODUCTS
  ========================================================= */

  const perfumes = Products.filter(
    (product) => product.category.toLowerCase() === "men" ||
      product.category.toLowerCase() === "female" ||
      product.category.toLowerCase() === "unisex"
  )

  const featuredProducts = perfumes.slice(0, 4)
  const moreProducts = perfumes.slice(4, 12)

  /* =========================================================
     CATEGORIES — matched against real product.category values.
     Each category's photo is pulled from the first product
     that actually belongs to it, so "Men" always shows a
     men's fragrance, "Female" always shows a women's one, etc.
     Falls back to the first product overall if a category is
     empty so the avatar never renders blank.
  ========================================================= */

  const findByCategory = (value: string) =>
    Products.find((p) => p.category.toLowerCase() === value.toLowerCase())

  const categories = [
    {
      name: "All",
      href: "/products",
      image: "/images/victoriassecretbombshellattar.jpeg",
    },
    {
      name: "Men",
      href: "/category/men",
      image: findByCategory("Men")?.image ?? Products[0]?.image,
    },
    {
      name: "Women",
      href: "/category/female",
      image: findByCategory("Female")?.image ?? Products[0]?.image,
    },
    {
      name: "Unisex",
      href: "/category/unisex",
      image: findByCategory("Unisex")?.image ?? Products[0]?.image,
    },
  ]

  return (
    <main className="min-h-screen bg-white text-[#171717] antialiased">
      {/* =====================================================
          HERO
      ===================================================== */}

      <div className="pt-20">
        <Hero />
      </div>

      {/* =====================================================
          CATEGORY SELECTOR — circular, photo-led, no scrollbar
      ===================================================== */}

      <section className="border-b border-black/[0.06] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
          <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth scrollbar-hide sm:justify-center sm:gap-10">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                href={category.href}
                className="group flex shrink-0 snap-center flex-col items-center gap-2.5"
              >
                <span
                  className={`
                    relative grid size-16 shrink-0 place-items-center overflow-hidden
                    rounded-full ring-1 ring-offset-4 ring-offset-white
                    transition-all duration-300
                    sm:size-20
                    ${
                      index === 0
                        ? "ring-2 ring-[#b08a3c]"
                        : "ring-black/[0.08] group-hover:ring-[#b08a3c]/60"
                    }
                  `}
                >
                  {category.image ? (
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="80px"
                    />
                  ) : (
                    <span className="text-[9px] font-semibold uppercase text-black/30">
                      {category.name.slice(0, 2)}
                    </span>
                  )}
                </span>

                <span
                  className={`
                    whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.14em]
                    transition-colors duration-300
                    sm:text-[11px]
                    ${
                      index === 0
                        ? "text-[#9b742e]"
                        : "text-black/50 group-hover:text-[#9b742e]"
                    }
                  `}
                >
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURED COLLECTION
      ===================================================== */}

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          {/* Section Heading */}
          <div className="mb-10 flex items-end justify-between sm:mb-14">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="h-px w-6 bg-[#b08a3c]" />
                <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#a17b32]">
                  Our Selection
                </span>
              </div>

              <h2 className="font-serif text-3xl font-medium tracking-tight text-[#171717] sm:text-4xl">
                Signature Fragrances
              </h2>

              <p className="mt-2 max-w-md text-xs leading-5 text-black/40 sm:text-sm">
                Discover fragrances selected for elegance, character and
                everyday sophistication.
              </p>
            </div>

            <Link
              href="/products"
              className="group hidden items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50 transition-colors hover:text-[#a17b32] sm:flex"
            >
              View All
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Products */}
          {featuredProducts.length > 0 ? (
            <div className="grid gap-x-3 gap-y-10 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center text-sm text-black/40">
              No fragrances available yet.
            </div>
          )}

          {/* Mobile View All */}
          <div className="mt-10 flex justify-center sm:hidden">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full border border-black/10 px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/60 transition hover:border-[#b08a3c] hover:text-[#a17b32]"
            >
              View All Fragrances
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          LUXURY PERFUME BANNER
      ===================================================== */}

      <section className="px-4 sm:px-6">
        <div className="relative mx-auto h-[440px] max-w-7xl overflow-hidden rounded-[1.75rem] sm:h-[540px] sm:rounded-[2.25rem]">
          <Image
            src="/hero3.png"
            alt="Luxury Perfume Collection"
            fill
            className="object-cover"
            sizes="100vw"
          />

          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />

          <div className="relative z-10 flex h-full items-center px-6 sm:px-12 lg:px-20">
            <div className="max-w-lg text-white">
              <div className="mb-4 flex items-center gap-2">
                <Sparkles className="size-3.5 text-[#d0ad68]" />
                <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/70">
                  The Art of Fragrance
                </span>
              </div>

              <h2 className="font-serif text-4xl font-medium leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                A scent that
                <br />
                becomes your signature.
              </h2>

              <p className="mt-5 max-w-md text-xs leading-6 text-white/70 sm:text-sm sm:leading-7">
                Explore refined fragrances created for those who appreciate
                subtle luxury, confidence and individuality.
              </p>

              <Link
                href="/products"
                className="group mt-7 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-black transition-all hover:bg-[#b08a3c] hover:text-white"
              >
                Discover Fragrances
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MORE PRODUCTS
      ===================================================== */}

      {moreProducts.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
            <div className="mb-10 text-center sm:mb-14">
              <div className="flex items-center justify-center gap-2">
                <span className="h-px w-6 bg-[#b08a3c]" />
                <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#a17b32]">
                  Explore More
                </span>
                <span className="h-px w-6 bg-[#b08a3c]" />
              </div>

              <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-[#171717] sm:text-4xl">
                More to Discover
              </h2>

              <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-black/40 sm:text-sm">
                Find the fragrance that fits your personality and your
                moment.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-6">
              {moreProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mt-14 flex justify-center">
              <Link
                href="/products"
                className="group inline-flex items-center gap-3 rounded-full border border-black/10 px-7 py-3.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/60 transition-all hover:border-[#b08a3c] hover:bg-[#fbf8f0] hover:text-[#9b742e]"
              >
                Explore Full Collection
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          FINAL BRAND STATEMENT
      ===================================================== */}

      <section className="border-t border-black/[0.06] bg-[#faf9f6]">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center sm:py-28">
          <div className="mx-auto mb-5 flex size-10 items-center justify-center rounded-full border border-[#b08a3c]/30">
            <Sparkles className="size-4 text-[#a17b32]" />
          </div>

          <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#a17b32]">
            Wear Your Identity
          </p>

          <h2 className="mt-3 font-serif text-3xl font-medium leading-tight text-[#171717] sm:text-4xl">
            Fragrance is more than a scent.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-xs leading-6 text-black/45 sm:text-sm sm:leading-7">
            It is the impression you leave behind, the memory someone carries
            with them, and a quiet expression of who you are.
          </p>
        </div>
      </section>
    </main>
  )
}