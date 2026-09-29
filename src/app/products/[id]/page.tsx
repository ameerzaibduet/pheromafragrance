"use client"

import { use, useEffect, useState } from "react"
import { notFound, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Products } from "@/lib/products"

import { isCarTopCoverProduct } from "@/lib/car-top-cover"
import {
  isRainSuitProduct,
  RAIN_SUIT_SIZES,
} from "@/lib/rain-suit"

import { formatPrice } from "@/lib/format-price"

import ProductCategoryRow from "@/components/ProductCategoryRow"
import ProductColorPicker from "@/components/ProductColorPicker"
import { groupRelatedProductsByCategory } from "@/lib/group-products-by-category"

import { Button } from "@/components/ui/button"

import { useCart } from "@/lib/use-cart"
import { useCartUI } from "@/lib/use-cart-ui"

import {
  buildTikTokProductParams,
  trackTikTokEvent,
} from "@/lib/tiktok"

import clsx from "clsx"

import {
  motion,
  AnimatePresence,
} from "framer-motion"

import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronUp,
  Minus,
  ShoppingBag,
  Sparkles,
  Truck,
  ShieldCheck,
} from "lucide-react"

type Props = {
  params: Promise<{ id: string }>
}

const bikeTypes = [
  "70cc",
  "110cc",
  "125cc",
  "150cc",
]

/* =========================================================
   DESCRIPTION HELPERS
========================================================= */

function getDescriptionParts(description: string) {
  return description
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
}

/* =========================================================
   SCENT PROFILE
========================================================= */

function getScentProfile(description: string) {
  const lines = getDescriptionParts(description)

  const start = lines.findIndex(
    (line) =>
      line.toLowerCase() === "scent profile"
  )

  if (start === -1) return ""

  const result: string[] = []

  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i]

    if (
      line.toLowerCase() ===
      "fragrance notes"
    ) {
      break
    }

    result.push(line)
  }

  return result.join(" ")
}

/* =========================================================
   FRAGRANCE NOTES
========================================================= */

function getFragranceNotes(description: string) {
  const lines = getDescriptionParts(description)

  const start = lines.findIndex(
    (line) =>
      line.toLowerCase() ===
      "fragrance notes"
  )

  if (start === -1) return []

  const notes: {
    label: string
    value: string
  }[] = []

  for (
    let i = start + 1;
    i < lines.length;
    i++
  ) {
    const line = lines[i]

    if (
      line.toLowerCase() ===
      "fragrance family"
    ) {
      break
    }

    const separator = line.indexOf(":")

    if (separator !== -1) {
      notes.push({
        label: line
          .slice(0, separator)
          .trim(),

        value: line
          .slice(separator + 1)
          .trim(),
      })
    }
  }

  return notes
}

/* =========================================================
   INFO VALUE
========================================================= */

function getInfoValue(
  description: string,
  label: string
) {
  const lines = getDescriptionParts(description)

  const line = lines.find((item) =>
    item
      .toLowerCase()
      .startsWith(
        `${label.toLowerCase()}:`
      )
  )

  if (!line) return null

  return line
    .slice(line.indexOf(":") + 1)
    .trim()
}

/* =========================================================
   PAGE
========================================================= */

export default function ProductDetailPage({
  params,
}: Props) {
  const { id } = use(params)

  const product = Products.find(
    (p) => p.id === id
  )

  const router = useRouter()

  const { addToCart } = useCart()

  const {
    openCart,
    closeCart,
  } = useCartUI()

  /* =======================================================
     PRODUCT TYPES
  ======================================================= */

  const isCarTopCover = product
    ? isCarTopCoverProduct(product)
    : false

  const isRainSuit = product
    ? isRainSuitProduct(product)
    : false

  const isPerfume =
    product?.category?.toLowerCase() ===
    "perfume"

  /* =======================================================
     SIZE
  ======================================================= */

  const defaultSize =
    product?.sizes?.find(
      (size) => size.default
    ) ||
    product?.sizes?.[0]

  const [
    selectedSize,
    setSelectedSize,
  ] = useState(
    defaultSize?.size || ""
  )

  /* =======================================================
     COLORS
  ======================================================= */

  const defaultColor =
    product?.colors?.find(
      (color) => color.default
    ) ||
    product?.colors?.[0]

  const [
    selectedColor,
    setSelectedColor,
  ] = useState(defaultColor)

  const [
    selectedCoverColor,
    setSelectedCoverColor,
  ] = useState(
    product?.colors?.find(
      (c) => c.default
    )?.name ||
      product?.colors?.[0]?.name ||
      "black"
  )

  /* =======================================================
     BIKE TYPE
  ======================================================= */

  const [
    selectedCC,
    setSelectedCC,
  ] = useState("70cc")

  /* =======================================================
     DESCRIPTION
  ======================================================= */

  const [
    showDescription,
    setShowDescription,
  ] = useState(false)

  /* =======================================================
     VIEW CONTENT
  ======================================================= */

  useEffect(() => {
    if (product) {
      trackTikTokEvent(
        "ViewContent",
        buildTikTokProductParams(product)
      )
    }
  }, [product])

  /* =======================================================
     NOT FOUND
  ======================================================= */

  if (!product) {
    return notFound()
  }

  /* =======================================================
     ACTIVE SIZE
  ======================================================= */

  const activeSize =
    product.sizes?.find(
      (size) =>
        size.size === selectedSize
    )

  /* =======================================================
     ACTIVE COLOR
  ======================================================= */

  const activeCoverColor =
    product.colors?.find(
      (color) =>
        color.name ===
        selectedCoverColor
    ) ||
    product.colors?.find(
      (color) => color.default
    ) ||
    product.colors?.[0]

  /* =======================================================
     IMAGE
  ======================================================= */

  const mainImage = isCarTopCover
    ? activeCoverColor?.image ||
      product.image
    : activeSize?.image ||
      product.image

  /* =======================================================
     PRICE
  ======================================================= */

  const activePrice =
    activeSize?.price ??
    product.price

  /* =======================================================
     SELECTION
  ======================================================= */

  const selectionLabel =
    isCarTopCover
      ? activeCoverColor?.name ??
        selectedCoverColor
      : selectedColor?.name

  /* =======================================================
     PERFUME DATA
  ======================================================= */

  const scentProfile =
    getScentProfile(
      product.description
    )

  const fragranceNotes =
    getFragranceNotes(
      product.description
    )

  const fragranceFamily =
    getInfoValue(
      product.description,
      "Fragrance Family"
    )

  const gender =
    getInfoValue(
      product.description,
      "Gender"
    )

  const occasion =
    getInfoValue(
      product.description,
      "Occasion"
    )

  const season =
    getInfoValue(
      product.description,
      "Season"
    )

  const longevity =
    getInfoValue(
      product.description,
      "Longevity"
    )

  const projection =
    getInfoValue(
      product.description,
      "Projection"
    )

  /* =======================================================
     ADD TO CART
  ======================================================= */

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: activePrice,
      image: mainImage,
      quantity: 1,

      ...(selectionLabel && {
        color: selectionLabel,
      }),

      ...(selectedSize && {
        size: selectedSize,
      }),
    })

    trackTikTokEvent(
      "AddToCart",
      buildTikTokProductParams(product)
    )

    openCart()
  }

  /* =======================================================
     BUY NOW
  ======================================================= */

  const handleBuyNow = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: activePrice,
      image: mainImage,
      quantity: 1,

      ...(selectionLabel && {
        color: selectionLabel,
      }),

      ...(selectedSize && {
        size: selectedSize,
      }),
    })

    trackTikTokEvent(
      "InitiateCheckout",
      buildTikTokProductParams(product)
    )

    closeCart()

    router.push("/checkout")
  }

  /* =======================================================
     RELATED
  ======================================================= */

  const relatedProductGroups =
    groupRelatedProductsByCategory(
      Products,
      product
    )

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <main className="min-h-screen bg-white text-[#171717]">

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-5 sm:px-6 sm:pb-24 sm:pt-8">

        {/* ===================================================
            BACK
        =================================================== */}

        <Link
          href="/products"
          className="group mb-5 inline-flex items-center gap-2 text-xs font-medium text-black/45 transition-colors hover:text-[#b08a3c] sm:mb-8 sm:text-sm"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />

          Back to collection
        </Link>

        {/* ===================================================
            PRODUCT
        =================================================== */}

        <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-[1.05fr_.95fr] lg:gap-16 xl:gap-24">

          {/* =================================================
              IMAGE
          ================================================= */}

          <div className="lg:sticky lg:top-6">

            <div className="relative overflow-hidden rounded-[1.5rem] border border-black/[0.07] bg-[#f8f7f4] sm:rounded-[2rem]">

              {/* subtle gold decoration */}

              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[55%] w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c6a15b]/10 blur-[80px]" />

              <AnimatePresence mode="wait">

                <motion.div
                  key={mainImage}
                  initial={{
                    opacity: 0,
                    scale: 0.97,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="relative h-[390px] w-full sm:h-[550px]"
                >

                  <Image
                    src={mainImage}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 52vw, 100vw"
                    priority
                  />

                </motion.div>

              </AnimatePresence>

              {/* Premium label */}

              {isPerfume && (
                <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-[#b08a3c]/20 bg-white/85 px-3 py-1.5 backdrop-blur-sm sm:left-5 sm:top-5">

                  <Sparkles className="size-3 text-[#b08a3c]" />

                  <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#8d6d2d] sm:text-[9px]">
                    Premium Fragrance
                  </span>

                </div>
              )}

            </div>

            {/* =================================================
                TRUST FEATURES
            ================================================= */}

            <div className="mt-3 grid grid-cols-2 gap-2.5 sm:mt-4 sm:gap-3">

              <div className="flex items-center gap-2.5 rounded-xl border border-black/[0.07] bg-white px-3 py-3 sm:rounded-2xl sm:p-4">

                <Truck className="size-4 shrink-0 text-[#b08a3c] sm:size-5" />

                <div>

                  <p className="text-[10px] font-semibold text-black/80 sm:text-xs">
                    Free Delivery
                  </p>

                  <p className="mt-0.5 text-[9px] text-black/40 sm:mt-1 sm:text-[10px]">
                    Across Pakistan
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-2.5 rounded-xl border border-black/[0.07] bg-white px-3 py-3 sm:rounded-2xl sm:p-4">

                <ShieldCheck className="size-4 shrink-0 text-[#b08a3c] sm:size-5" />

                <div>

                  <p className="text-[10px] font-semibold text-black/80 sm:text-xs">
                    Premium Quality
                  </p>

                  <p className="mt-0.5 text-[9px] text-black/40 sm:mt-1 sm:text-[10px]">
                    Carefully selected
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              PRODUCT DETAILS
          ================================================= */}

          <div>

            {/* Category */}

            <div className="flex items-center gap-2">

              <span className="h-px w-6 bg-[#b08a3c]" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#a17b32] sm:text-[10px]">
                {product.category}
              </span>

            </div>

            {/* Name */}

            <h1 className="mt-3 max-w-2xl font-serif text-[2rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#161616] sm:mt-4 sm:text-5xl lg:text-[3.5rem]">
              {product.name}
            </h1>

            {/* Price */}

            <div className="mt-4 flex items-baseline gap-3 sm:mt-5">

              <p className="text-2xl font-semibold tracking-tight text-[#a47c32] sm:text-3xl">
                {formatPrice(activePrice)}
              </p>

              {isPerfume &&
                selectedSize && (
                  <span className="text-xs text-black/35">
                    {selectedSize}
                  </span>
                )}

            </div>

            {/* =================================================
                SIZE SELECTOR
            ================================================= */}

            {product.sizes &&
              product.sizes.length > 0 && (

                <div className="mt-6 sm:mt-8">

                  <div className="mb-2.5 flex items-center justify-between">

                    <p className="text-xs font-semibold text-black/75 sm:text-sm">
                      Select Size
                    </p>

                    <span className="text-[10px] uppercase tracking-wider text-black/30">
                      {selectedSize}
                    </span>

                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:gap-3">

                    {product.sizes.map(
                      (size) => {

                        const selected =
                          selectedSize ===
                          size.size

                        return (
                          <button
                            key={size.size}
                            type="button"
                            onClick={() =>
                              setSelectedSize(
                                size.size
                              )
                            }
                            className={clsx(
                              "relative rounded-xl border px-2 py-3 text-center transition-all duration-200 sm:rounded-2xl sm:px-3 sm:py-4",

                              selected
                                ? "border-[#b08a3c] bg-[#fbf8f0]"
                                : "border-black/[0.09] bg-white hover:border-black/20"
                            )}
                          >

                            {selected && (
                              <span className="absolute right-2 top-2">

                                <Check className="size-3 text-[#a47c32]" />

                              </span>
                            )}

                            <span
                              className={clsx(
                                "block text-sm font-semibold sm:text-base",

                                selected
                                  ? "text-[#9b742e]"
                                  : "text-black/75"
                              )}
                            >
                              {size.size}
                            </span>

                            <span className="mt-1 block text-[10px] text-black/40 sm:text-xs">
                              {formatPrice(
                                size.price
                              )}
                            </span>

                          </button>
                        )
                      }
                    )}

                  </div>

                </div>
              )}

            {/* =================================================
                OTHER PRODUCT COLOR
            ================================================= */}

            {!isPerfume &&
              !isCarTopCover &&
              product.colors &&
              product.colors.length > 0 && (

                <div className="mt-6">

                  <ProductColorPicker
                    label="Color"
                    colors={product.colors}
                    selected={
                      selectedColor?.name ??
                      ""
                    }
                    onSelect={(name) => {

                      const color =
                        product.colors?.find(
                          (c) =>
                            c.name === name
                        )

                      if (color) {
                        setSelectedColor(
                          color
                        )
                      }

                    }}
                  />

                </div>
              )}

            {/* =================================================
                CAR COLOR
            ================================================= */}

            {isCarTopCover &&
              product.colors &&
              product.colors.length > 0 && (

                <div className="mt-6">

                  <ProductColorPicker
                    label="Cover color"
                    colors={product.colors}
                    selected={
                      selectedCoverColor
                    }
                    onSelect={
                      setSelectedCoverColor
                    }
                  />

                </div>
              )}

            {/* =================================================
                RAIN SUIT
            ================================================= */}

            {isRainSuit && (

              <div className="mt-6">

                <p className="mb-2.5 text-xs font-semibold text-black/75 sm:text-sm">
                  Select Size
                </p>

                <div className="flex flex-wrap gap-2">

                  {RAIN_SUIT_SIZES.map(
                    (size) => (

                      <button
                        key={size}
                        type="button"
                        onClick={() =>
                          setSelectedSize(
                            size
                          )
                        }
                        className={clsx(
                          "rounded-full border px-4 py-2 text-xs font-medium transition-all",

                          selectedSize ===
                            size
                            ? "border-[#b08a3c] bg-[#b08a3c] text-white"
                            : "border-black/10 bg-white text-black/60 hover:border-[#b08a3c]"
                        )}
                      >
                        {size}
                      </button>

                    )
                  )}

                </div>

              </div>
            )}

            {/* =================================================
                CTA
            ================================================= */}

            <div className="mt-6 grid grid-cols-1 gap-2.5 sm:mt-8 sm:grid-cols-2 sm:gap-3">

              <Button
                onClick={handleBuyNow}
                className="h-13 rounded-xl bg-[#171717] text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-none transition-all hover:bg-[#b08a3c] sm:h-14 sm:rounded-2xl"
              >
                Buy Now
              </Button>

              <Button
                onClick={handleAddToCart}
                variant="outline"
                className="h-13 rounded-xl border-black/15 bg-white text-xs font-semibold uppercase tracking-[0.14em] text-black/80 shadow-none hover:border-[#b08a3c] hover:bg-[#fbf8f0] sm:h-14 sm:rounded-2xl"
              >

                <ShoppingBag className="mr-2 size-4" />

                Add to Cart

              </Button>

            </div>

            {/* =================================================
                PERFUME DESCRIPTION
            ================================================= */}

            {isPerfume && (

              <section className="mt-8 border-t border-black/[0.08] pt-7 sm:mt-10 sm:pt-8">

                {/* Header */}

                <div className="flex items-center gap-2">

                  <span className="h-px w-6 bg-[#b08a3c]" />

                  <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#a17b32]">
                    About the fragrance
                  </span>

                </div>

                {/* Description (always visible, clamped to 3 lines) */}

                {scentProfile && (

                  <div className="mt-4">

                    <p
                      className={clsx(
                        "text-[13px] leading-6 text-black/55 sm:text-sm sm:leading-7",

                        !showDescription &&
                          "line-clamp-3"
                      )}
                    >
                      {scentProfile}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        setShowDescription(
                          !showDescription
                        )
                      }
                      className="mt-2.5 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#a17b32] transition-colors hover:text-black"
                    >

                      {showDescription
                        ? "Show Less"
                        : "See More"}

                      {showDescription ? (
                        <ChevronUp className="size-3" />
                      ) : (
                        <ChevronDown className="size-3" />
                      )}

                    </button>

                  </div>
                )}

                {/* =================================================
                    EXPANDABLE: NOTES + INFO TABLE
                    (only rendered once user taps "See More")
                ================================================= */}

                <AnimatePresence initial={false}>

                  {showDescription && (

                    <motion.div
                      initial={{
                        opacity: 0,
                        height: 0,
                      }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                      }}
                      className="overflow-hidden"
                    >

                      {/* NOTES */}

                      {fragranceNotes.length >
                        0 && (

                        <div className="mt-7">

                          <div className="mb-3 flex items-center gap-2">

                            <Sparkles className="size-3.5 text-[#b08a3c]" />

                            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-black/50">
                              Fragrance Notes
                            </p>

                          </div>

                          <div className="grid gap-2 sm:grid-cols-3">

                            {fragranceNotes.map(
                              (note) => (

                                <div
                                  key={
                                    note.label
                                  }
                                  className="rounded-xl border border-black/[0.07] bg-[#faf9f6] p-3.5 sm:rounded-2xl sm:p-4"
                                >

                                  <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#a17b32]">
                                    {note.label}
                                  </p>

                                  <p className="mt-1.5 text-xs leading-5 text-black/55">
                                    {note.value}
                                  </p>

                                </div>

                              )
                            )}

                          </div>

                        </div>
                      )}

                      {/* PERFUME INFORMATION */}

                      <div className="mt-6 overflow-hidden rounded-xl border border-black/[0.07] sm:rounded-2xl">

                        {[
                          [
                            "Fragrance Family",
                            fragranceFamily,
                          ],

                          [
                            "Gender",
                            gender,
                          ],

                          [
                            "Longevity",
                            longevity,
                          ],

                          [
                            "Projection",
                            projection,
                          ],

                          [
                            "Season",
                            season,
                          ],

                          [
                            "Occasion",
                            occasion,
                          ],
                        ]
                          .filter(
                            ([, value]) =>
                              Boolean(value)
                          )
                          .map(
                            ([label, value]) => (

                              <div
                                key={label}
                                className="flex items-start justify-between gap-4 border-b border-black/[0.06] px-4 py-3 last:border-0 sm:px-5 sm:py-4"
                              >

                                <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-black/35">
                                  {label}
                                </span>

                                <span className="max-w-[60%] text-right text-xs leading-5 text-black/65">
                                  {value}
                                </span>

                              </div>

                            )
                          )}

                      </div>

                    </motion.div>
                  )}

                </AnimatePresence>

              </section>
            )}

            {/* =================================================
                BIKE SIZE
            ================================================= */}

            {!isCarTopCover &&
              !isRainSuit &&
              !isPerfume && (

                <div className="mt-7">

                  <p className="mb-2.5 text-xs font-semibold text-black/75">
                    Bike engine size
                  </p>

                  <div className="flex flex-wrap gap-2">

                    {bikeTypes.map(
                      (cc) => (

                        <button
                          key={cc}
                          type="button"
                          onClick={() =>
                            setSelectedCC(
                              cc
                            )
                          }
                          className={clsx(
                            "rounded-full border px-4 py-2 text-xs font-medium transition-all",

                            selectedCC ===
                              cc
                              ? "border-[#b08a3c] bg-[#b08a3c] text-white"
                              : "border-black/10 bg-white text-black/60 hover:border-[#b08a3c]"
                          )}
                        >
                          {cc}
                        </button>

                      )
                    )}

                  </div>

                </div>
              )}

          </div>

        </div>

        {/* =====================================================
            RELATED PRODUCTS
        ===================================================== */}

        {relatedProductGroups.length >
          0 && (

          <section className="mt-16 border-t border-black/[0.08] pt-12 sm:mt-24 sm:pt-16">

            <div className="mb-8 text-center sm:mb-10">

              <div className="flex items-center justify-center gap-2">

                <span className="h-px w-6 bg-[#b08a3c]" />

                <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#a17b32]">
                  Explore the collection
                </span>

                <span className="h-px w-6 bg-[#b08a3c]" />

              </div>

              <h2 className="mt-3 font-serif text-2xl font-medium text-[#171717] sm:text-4xl">
                You May Also Like
              </h2>

            </div>

            {relatedProductGroups.map(
              (group) => (

                <ProductCategoryRow
                  key={group.category}
                  category={
                    group.category
                  }
                  products={
                    group.products
                  }
                  isCurrentCategory={
                    group.isCurrentCategory
                  }
                />

              )
            )}

          </section>
        )}

      </div>
    </main>
  )
}