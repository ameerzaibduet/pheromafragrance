
import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { Products } from "@/lib/products"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

function getSupabase() {
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Supabase server environment variables are missing")
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

const allowedPhotoTypes: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
}

// Basic in-memory rate limit. For multiple server instances,
// use a persistent rate limiter before production traffic grows.
const postAttempts = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string) {
  const now = Date.now()
  const current = postAttempts.get(ip)

  if (!current || current.resetAt <= now) {
    postAttempts.set(ip, {
      count: 1,
      resetAt: now + 10 * 60 * 1000,
    })
    return false
  }

  current.count += 1
  return current.count > 5
}

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabase()
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get("productId")
    const latest = searchParams.get("latest") === "1"

    let query = supabase
      .from("product_reviews")
      .select(
        "id, product_id, product_name, customer_name, rating, review_text, photo_url, created_at"
      )
      .order("created_at", { ascending: false })

    if (productId) {
      const exists = Products.some((product) => product.id === productId)

      if (!exists) {
        return NextResponse.json(
          { error: "Invalid product." },
          { status: 400 }
        )
      }

      query = query.eq("product_id", productId).limit(100)
    } else if (latest) {
      query = query.limit(8)
    } else {
      return NextResponse.json(
        { error: "Provide a productId or latest=1." },
        { status: 400 }
      )
    }

    const { data, error } = await query

    if (error) {
      console.error("Reviews fetch error:", error.message)
      return NextResponse.json(
        { error: "Could not load reviews." },
        { status: 500 }
      )
    }

    return NextResponse.json({ reviews: data ?? [] })
  } catch (error) {
    console.error("Reviews API error:", error)
    return NextResponse.json(
      { error: "Could not load reviews." },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  let uploadedPhotoPath: string | null = null

  try {
    const forwardedFor = request.headers.get("x-forwarded-for")
    const ip =
      forwardedFor?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown"

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many reviews submitted. Please try again later." },
        { status: 429 }
      )
    }

    const form = await request.formData()

    // Honeypot field: normal users should leave this empty.
    if (String(form.get("website") ?? "").trim()) {
      return NextResponse.json({ success: true })
    }

    const productId = String(form.get("productId") ?? "").trim()
    const customerName = String(form.get("customerName") ?? "").trim()
    const reviewText = String(form.get("reviewText") ?? "").trim()
    const rating = Number(form.get("rating"))
    const photo = form.get("photo")

    const product = Products.find((item) => item.id === productId)

    if (!product) {
      return NextResponse.json(
        { error: "Product not found." },
        { status: 400 }
      )
    }

    if (customerName.length < 2 || customerName.length > 60) {
      return NextResponse.json(
        { error: "Name must be between 2 and 60 characters." },
        { status: 400 }
      )
    }

    if (
      !Number.isInteger(rating) ||
      rating < 1 ||
      rating > 5
    ) {
      return NextResponse.json(
        { error: "Please select a rating from 1 to 5 stars." },
        { status: 400 }
      )
    }

    if (reviewText.length < 5 || reviewText.length > 1000) {
      return NextResponse.json(
        { error: "Review must be between 5 and 1000 characters." },
        { status: 400 }
      )
    }

    const supabase = getSupabase()
    let photoUrl: string | null = null

    if (photo instanceof File && photo.size > 0) {
      const extension = allowedPhotoTypes[photo.type]

      if (!extension) {
        return NextResponse.json(
          { error: "Photo must be JPG, PNG, or WebP." },
          { status: 400 }
        )
      }

      if (photo.size > 3 * 1024 * 1024) {
        return NextResponse.json(
          { error: "Photo must be 3 MB or smaller." },
          { status: 400 }
        )
      }

      const filePath = `${productId}/${crypto.randomUUID()}.${extension}`

      const { error: uploadError } = await supabase.storage
        .from("review-photos")
        .upload(filePath, photo, {
          contentType: photo.type,
          upsert: false,
        })

      if (uploadError) {
        console.error("Review photo upload error:", uploadError.message)
        return NextResponse.json(
          { error: "Photo upload failed. Please try another image." },
          { status: 500 }
        )
      }

      uploadedPhotoPath = filePath

      const { data } = supabase.storage
        .from("review-photos")
        .getPublicUrl(filePath)

      photoUrl = data.publicUrl
    } else if (photo !== null && !(photo instanceof File)) {
      return NextResponse.json(
        { error: "Invalid photo upload." },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from("product_reviews")
      .insert({
        product_id: product.id,
        product_name: product.name,
        customer_name: customerName,
        rating,
        review_text: reviewText,
        photo_url: photoUrl,
      })
      .select(
        "id, product_id, product_name, customer_name, rating, review_text, photo_url, created_at"
      )
      .single()

    if (error) {
      console.error("Review save error:", error.message)

      // Clean up an uploaded photo if saving its review failed.
      if (uploadedPhotoPath) {
        await supabase.storage
          .from("review-photos")
          .remove([uploadedPhotoPath])
      }

      return NextResponse.json(
        { error: "Could not save your review. Please try again." },
        { status: 500 }
      )
    }

    // Reviews publish immediately after successful insertion.
    return NextResponse.json({ success: true, review: data }, { status: 201 })
  } catch (error) {
    console.error("Review submission error:", error)
    return NextResponse.json(
      { error: "Something went wrong while submitting your review." },
      { status: 500 }
    )
  }
}
