"use client"

import { useState, type MouseEvent } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

import { Product } from "@/types/product"
import { useCart } from "@/lib/use-cart"
import { useCartUI } from "@/lib/use-cart-ui"
import { isRainSuitProduct } from "@/lib/rain-suit"
import { formatPrice } from "@/lib/format-price"
import { colorMap } from "@/lib/color-map"
import { buildTikTokProductParams, trackTikTokEvent } from "@/lib/tiktok"

import { Button } from "@/components/ui/button"
import { ShoppingBag, Truck, Check } from "lucide-react"
import clsx from "clsx"

type Props = {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const router = useRouter()
  const { addToCart } = useCart()
  const { openCart } = useCartUI()

  const isPerfume = product.category.toLowerCase() === "perfume"
  const isRainSuit = isRainSuitProduct(product)
  const isCarCover = product.category.toLowerCase() === "car top cover"

  const defaultColor = product.colors?.find((c) => c.default) || product.colors?.[0]
  const [selectedColor, setSelectedColor] = useState(defaultColor?.name || "")

  const defaultSize = product.sizes?.find((s) => s.default) || product.sizes?.[0]
  const [selectedSize, setSelectedSize] = useState(isRainSuit ? "Medium" : defaultSize?.size || "")

  const activeSize = product.sizes?.find((s) => s.size === selectedSize)
  const activeColor = product.colors?.find((c) => c.name === selectedColor) || defaultColor

  const cardImage = isPerfume ? activeSize?.image || product.image : activeColor?.image || product.image

  const activePrice = activeSize?.price ?? product.price

  const handleViewProduct = () => {
    router.push(`/products/${product.id}`)
  }

  const buildCartItem = () => ({
    ...product,
    price: activePrice,
    image: cardImage,
    quantity: 1,
    ...(selectedColor && { color: selectedColor }),
    ...(selectedSize && { size: selectedSize }),
  })

  const handleAddToCart = (e: MouseEvent) => {
    e.stopPropagation()
    addToCart(buildCartItem())
    trackTikTokEvent("AddToCart", buildTikTokProductParams(product))
    openCart()
  }

  const handleBuyNow = (e: MouseEvent) => {
    e.stopPropagation()
    addToCart(buildCartItem())
    trackTikTokEvent("InitiateCheckout", buildTikTokProductParams(product))
    router.push("/checkout")
  }

  const visibleColors = product.colors?.slice(0, 5) || []
  const extraColorCount = Math.max((product.colors?.length || 0) - visibleColors.length, 0)

  return (
    <div
      onClick={handleViewProduct}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-black/[0.06] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#b08a3c]/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.10)] active:scale-[0.99]"
    >
      {/* IMAGE — clean, nothing overlaid on it */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#f2f1ed]">
        <Image
          src={cardImage}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>

      {/* PRODUCT INFO */}
      <div className="flex flex-1 flex-col p-3.5 sm:p-5">
        {/* PERFUME ML SELECTOR — top of info panel, above everything else */}
        {isPerfume && product.sizes && product.sizes.length > 0 && (
          <div className="mb-3 flex gap-1.5 overflow-x-auto scrollbar-hide">
            {product.sizes.map((size) => {
              const selected = selectedSize === size.size
              return (
                <button
                  key={size.size}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedSize(size.size)
                  }}
                  className={clsx(
                    "shrink-0 rounded-full border px-2.5 py-1.5 text-[9px] font-semibold transition-all sm:px-3 sm:text-[10px]",
                    selected
                      ? "border-[#b08a3c] bg-[#fbf8f0] text-[#9b742e]"
                      : "border-black/[0.09] bg-white text-black/45 hover:border-[#b08a3c]"
                  )}
                >
                  {selected && <Check className="mr-0.5 inline size-2.5" />}
                  {size.size}
                </button>
              )
            })}
          </div>
        )}

        {/* CATEGORY LABEL — moved off the image, sits as plain text now */}
        <span className="mb-1 text-[8px] font-bold uppercase tracking-[0.16em] text-black/40 sm:text-[9px]">
          {product.category}
        </span>

        {/* NAME + PRICE */}
        <div className="flex items-start justify-between gap-2">
          <h2 className="line-clamp-2 min-w-0 font-serif text-[14px] font-medium leading-[1.3] tracking-tight text-[#171717] sm:text-base">
            {product.name}
          </h2>
          <p className="shrink-0 text-[13px] font-bold tabular-nums text-[#a17b32] sm:text-base">
            {formatPrice(activePrice)}
          </p>
        </div>

        <div className="mt-1.5 flex items-center gap-1.5 text-[9px] font-medium text-black/40 sm:text-[10px]">
          <Truck className="size-3 text-[#b08a3c]" />
          Free delivery
        </div>

        {/* COLOR SWATCHES */}
        {!isPerfume && visibleColors.length > 0 && (
          <div className="mt-3 flex items-center justify-between gap-2 border-t border-black/[0.06] pt-3">
            <div className="flex items-center -space-x-1.5">
              {visibleColors.map((color) => (
                <button
                  key={`${product.id}-${color.name}`}
                  type="button"
                  title={color.name}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedColor(color.name)
                  }}
                  className={clsx(
                    "size-5 rounded-full border-2 border-white shadow ring-1 transition-all hover:scale-110 sm:size-5.5",
                    selectedColor === color.name ? "ring-2 ring-[#b08a3c]" : "ring-black/10"
                  )}
                  style={{ backgroundColor: colorMap[color.name] || "#e5e7eb" }}
                />
              ))}
              {extraColorCount > 0 && (
                <span className="ml-2 text-[9px] font-semibold text-black/40">+{extraColorCount}</span>
              )}
            </div>
            <span className="text-[9px] text-black/35">{product.colors?.length || 0} colors</span>
          </div>
        )}

        {/* ACTIONS — now live only in the info panel, not on the image */}
        {!isCarCover && (
          <div className="mt-4 flex gap-1.5">
            <Button
              onClick={handleAddToCart}
              className="h-10 flex-1 rounded-full bg-[#171717] px-2 text-[10px] font-semibold text-white hover:bg-[#b08a3c] sm:text-xs"
            >
              <ShoppingBag className="size-3.5" />
              Add to Cart
            </Button>
            <Button
              onClick={handleBuyNow}
              variant="outline"
              className="h-10 flex-1 rounded-full border-black/[0.15] px-2 text-[10px] font-semibold text-black hover:border-[#b08a3c] hover:bg-[#fbf8f0] sm:text-xs"
            >
              Buy Now
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}