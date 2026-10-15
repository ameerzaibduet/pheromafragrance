
"use client"

import { useEffect, useState, type FormEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Camera, MessageSquare, LoaderCircle } from "lucide-react"

type Review = {
  id: number
  product_id: string
  product_name: string
  customer_name: string
  rating: number
  review_text: string
  photo_url: string | null
  created_at: string
}

type ProductReviewsProps = {
  productId?: string
  productName?: string
  latestOnly?: boolean
}

function Stars({
  rating,
  size = 16,
}: {
  rating: number
  size?: number
}) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={
            star <= rating
              ? "fill-[#b08a3c] text-[#b08a3c]"
              : "fill-transparent text-black/20"
          }
        />
      ))}
    </span>
  )
}

export default function ProductReviews({
  productId,
  productName,
  latestOnly = false,
}: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [customerName, setCustomerName] = useState("")
  const [rating, setRating] = useState(5)
  const [reviewText, setReviewText] = useState("")
  const [photo, setPhoto] = useState<File | null>(null)
  const [website, setWebsite] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    let active = true

    async function loadReviews() {
      setLoading(true)

      try {
        const endpoint = latestOnly
          ? "/api/reviews?latest=1"
          : `/api/reviews?productId=${encodeURIComponent(productId ?? "")}`

        const response = await fetch(endpoint)
        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.error || "Could not load reviews.")
        }

        if (active) {
          setReviews(result.reviews ?? [])
        }
      } catch {
        if (active) {
          setError("Reviews could not be loaded. Please refresh the page.")
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    if (latestOnly || productId) {
      loadReviews()
    } else {
      setLoading(false)
    }

    return () => {
      active = false
    }
  }, [productId, latestOnly])

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((total, review) => total + review.rating, 0) /
        reviews.length
      : 0

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setSuccess("")

    if (!productId) {
      setError("Product information is missing.")
      return
    }

    if (customerName.trim().length < 2) {
      setError("Please enter your name.")
      return
    }

    if (reviewText.trim().length < 5) {
      setError("Please write at least 5 characters in your review.")
      return
    }

    if (photo && photo.size > 3 * 1024 * 1024) {
      setError("Photo must be 3 MB or smaller.")
      return
    }

    if (
      photo &&
      !["image/jpeg", "image/png", "image/webp"].includes(photo.type)
    ) {
      setError("Please select a JPG, PNG, or WebP photo.")
      return
    }

    setSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("productId", productId)
      formData.append("customerName", customerName.trim())
      formData.append("rating", String(rating))
      formData.append("reviewText", reviewText.trim())
      formData.append("website", website)

      if (photo) formData.append("photo", photo)

      const response = await fetch("/api/reviews", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Could not submit your review.")
      }

      if (result.review) {
        setReviews((current) => [result.review, ...current])
      }

      setCustomerName("")
      setRating(5)
      setReviewText("")
      setPhoto(null)
      setWebsite("")

      const fileInput = document.getElementById(
        "review-photo"
      ) as HTMLInputElement | null

      if (fileInput) fileInput.value = ""

      setSuccess("Thank you! Your review is now published.")
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      className="bg-white py-14 text-[#171717] sm:py-20"
      aria-labelledby="reviews-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 flex items-center gap-2">
          <span className="h-px w-7 bg-[#b08a3c]" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a17b32]">
            Customer Experiences
          </span>
        </div>

        <div className="mb-10 flex flex-col justify-between gap-5 border-b border-black/[0.08] pb-8 sm:flex-row sm:items-end">
          <div>
            <h2
              id="reviews-heading"
              className="font-serif text-3xl font-medium tracking-tight sm:text-4xl"
            >
              {latestOnly ? "What Our Customers Say" : "Customer Reviews"}
            </h2>

            <p className="mt-2 text-sm leading-6 text-black/50">
              {latestOnly
                ? "Real reviews shared by our fragrance customers."
                : `Share your experience${productName ? ` with ${productName}` : ""}.`}
            </p>
          </div>

          {!latestOnly && (
            <div className="flex items-center gap-3">
              <span className="font-serif text-4xl">
                {reviews.length ? averageRating.toFixed(1) : "—"}
              </span>
              <div>
                <Stars rating={Math.round(averageRating)} />
                <p className="mt-1 text-xs text-black/45">
                  {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
                </p>
              </div>
            </div>
          )}
        </div>

        {!latestOnly && (
          <form
            onSubmit={handleSubmit}
            className="mb-12 rounded-2xl border border-black/[0.08] bg-[#faf9f6] p-5 sm:p-7"
          >
            <h3 className="font-serif text-2xl">Write a Review</h3>
            <p className="mt-1 text-sm text-black/50">
              Tell others about your fragrance experience.
            </p>

            <div className="mt-6">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider">
                Your Rating
              </label>

              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    aria-label={`Rate ${value} out of 5 stars`}
                    aria-pressed={rating === value}
                    className="rounded p-1 transition hover:scale-110 focus-visible:outline-2 focus-visible:outline-[#b08a3c]"
                  >
                    <Star
                      size={28}
                      className={
                        value <= rating
                          ? "fill-[#b08a3c] text-[#b08a3c]"
                          : "text-black/20"
                      }
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm text-black/55">
                  {rating}/5
                </span>
              </div>
            </div>

            <div className="mt-5 grid gap-5">
              <div>
                <label
                  htmlFor="review-name"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider"
                >
                  Your Name
                </label>
                <input
                  id="review-name"
                  value={customerName}
                  onChange={(event) => setCustomerName(event.target.value)}
                  maxLength={60}
                  minLength={2}
                  required
                  placeholder="Enter your name"
                  autoComplete="name"
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#b08a3c]"
                />
              </div>

              <div>
                <label
                  htmlFor="review-text"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider"
                >
                  Your Review
                </label>
                <textarea
                  id="review-text"
                  value={reviewText}
                  onChange={(event) => setReviewText(event.target.value)}
                  minLength={5}
                  maxLength={1000}
                  required
                  rows={4}
                  placeholder="How was the fragrance, packaging, and overall experience?"
                  className="w-full resize-y rounded-xl border border-black/10 bg-white px-4 py-3 text-sm leading-6 outline-none transition focus:border-[#b08a3c]"
                />
                <p className="mt-1 text-right text-xs text-black/35">
                  {reviewText.length}/1000
                </p>
              </div>

              <div>
                <label
                  htmlFor="review-photo"
                  className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider"
                >
                  <Camera size={15} />
                  Add a Photo (Optional)
                </label>
                <input
                  id="review-photo"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(event) =>
                    setPhoto(event.target.files?.[0] ?? null)
                  }
                  className="block w-full text-sm text-black/55 file:mr-3 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2.5 file:text-xs file:font-semibold file:text-black file:ring-1 file:ring-black/10 hover:file:bg-[#fbf8f0]"
                />
                <p className="mt-1 text-xs text-black/40">
                  JPG, PNG or WebP · Maximum 3 MB
                </p>
              </div>

              {/* Honeypot field for basic bot detection */}
              <div
                aria-hidden="true"
                className="absolute -left-[10000px] h-px w-px overflow-hidden"
              >
                <label htmlFor="review-website">Website</label>
                <input
                  id="review-website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(event) => setWebsite(event.target.value)}
                />
              </div>
            </div>

            {error && (
              <p role="alert" className="mt-4 text-sm text-red-600">
                {error}
              </p>
            )}

            {success && (
              <p role="status" className="mt-4 text-sm text-green-700">
                {success}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#171717] px-7 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#a17b32] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <LoaderCircle size={16} className="animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <MessageSquare size={15} />
                  Publish Review
                </>
              )}
            </button>
          </form>
        )}

        {loading ? (
          <div className="py-10 text-center text-sm text-black/45">
            Loading reviews...
          </div>
        ) : reviews.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-black/15 px-5 py-10 text-center">
            <MessageSquare className="mx-auto mb-3 text-[#b08a3c]" size={25} />
            <p className="font-serif text-xl">Be the first to share your experience.</p>
            <p className="mt-2 text-sm text-black/45">
              {latestOnly
                ? "Customer reviews will appear here after they are submitted."
                : "Your review can help other customers discover their next fragrance."}
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <article
                key={review.id}
                className="flex h-full flex-col rounded-2xl border border-black/[0.08] bg-white p-5 transition hover:border-[#b08a3c]/50 sm:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <Stars rating={review.rating} />
                  <time className="shrink-0 text-[11px] text-black/40">
                    {new Date(review.created_at).toLocaleDateString("en-PK", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </time>
                </div>

                {latestOnly && (
                  <Link
                    href={`/products/${review.product_id}`}
                    className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#a17b32] hover:underline"
                  >
                    {review.product_name}
                  </Link>
                )}

                <p className="mt-4 flex-1 whitespace-pre-wrap break-words text-sm leading-7 text-black/70">
                  {review.review_text}
                </p>

                {review.photo_url && (
                  <a
                    href={review.photo_url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 block w-fit"
                    aria-label="Open customer review photo"
                  >
                    <Image
                      src={review.photo_url}
                      alt={`Photo shared by ${review.customer_name}`}
                      width={240}
                      height={240}
                      unoptimized
                      className="h-40 w-40 rounded-xl border border-black/10 object-cover"
                    />
                  </a>
                )}

                <div className="mt-5 border-t border-black/[0.07] pt-4">
                  <p className="text-sm font-semibold">
                    {review.customer_name}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-black/40">
                    Customer review
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
