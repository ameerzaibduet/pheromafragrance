"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/use-cart"
import { supabase } from "@/lib/supabase"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import {
  Command,
  CommandInput,
  CommandItem,
  CommandGroup,
  CommandList,
} from "@/components/ui/command"
import { ChevronsUpDown, MapPin, ShoppingBag } from "lucide-react"
import { CITIES } from "@/lib/cities"
import { formatPrice } from "@/lib/format-price"
import { useCustomerOrders } from "@/lib/use-customer-orders"
import {
  buildTikTokCartParams,
  identifyTikTokCustomer,
  trackTikTokEvent,
} from "@/lib/tiktok"

export default function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const { addOrder, setPhone } = useCustomerOrders()
  const router = useRouter()

  const [hydrated, setHydrated] = useState(false)

  const [name, setName] = useState("")
  const [number, setNumber] = useState("")
  const [email, setEmail] = useState("")
  const [city, setCity] = useState("")
  const [address, setAddress] = useState("")

  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [cityOpen, setCityOpen] = useState(false)

  const [location, setLocation] = useState<{
    latitude: number
    longitude: number
  } | null>(null)

  const [locationLoading, setLocationLoading] = useState(false)

  useEffect(() => setHydrated(true), [])

  if (!hydrated) {
    return (
      <div className="py-10 text-center text-gray-500">
        Loading checkout...
      </div>
    )
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const getLocation = () => {
    if (!navigator.geolocation) {
      setErrorMsg("GPS not supported")
      return
    }

    setLocationLoading(true)

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        })
        setLocationLoading(false)
      },
      () => {
        setErrorMsg("Please allow location access")
        setLocationLoading(false)
      }
    )
  }

  const handlePlaceOrder = async () => {
    setErrorMsg("")

    if (!name || !number || !city || !address || cart.length === 0) {
      setErrorMsg("Please fill all required fields.")
      return
    }

    const phoneRegex = /^(?:\+92|92|0)3\d{9}$/
    if (!phoneRegex.test(number)) {
      setErrorMsg("Invalid phone number")
      return
    }

    setLoading(true)

    const order = {
      name,
      phone: number,
      email: email || null,
      city,
      address,
      // kept as an empty string so the existing orders table column still gets a value
      bike_specifications: "",
      latitude: location?.latitude || null,
      longitude: location?.longitude || null,
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        color: item.color ?? null,
        size: item.size ?? null,
        image: item.image,
      })),
      total,
      dispatched: false,
    }

    const { data, error } = await supabase.from("orders").insert([order]).select().single()

    if (error || !data) {
      setErrorMsg("Order failed. Try again.")
      setLoading(false)
      return
    }

    const savedOrder = {
      id: data.id,
      name: data.name,
      phone: data.phone,
      city: data.city,
      address: data.address,
      total: data.total,
      items: data.items,
      bike_specifications: data.bike_specifications,
      created_at: data.created_at,
      dispatched: data.dispatched,
      transaction_status: data.transaction_status ?? null,
      delivery_date: data.delivery_date ?? null,
      tracking_number: data.tracking_number ?? null,
    }

    addOrder(savedOrder)
    setPhone(data.phone)
    sessionStorage.setItem("lastPlacedOrder", JSON.stringify(savedOrder))

    await identifyTikTokCustomer({ email, phone: number })
    trackTikTokEvent("Purchase", buildTikTokCartParams(cart))
    clearCart()
    router.push("/order-success")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fafaf9] to-white">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-8 lg:grid-cols-[1fr_360px] lg:px-6 lg:py-12">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-slate-900">
            Checkout
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Complete your details to place the order
          </p>

          {errorMsg && (
            <div className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">
              {errorMsg}
            </div>
          )}

          <div className="mt-6 space-y-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <Input
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              autoComplete="name"
              className="h-12 rounded-xl"
            />

            <Input
              placeholder="Phone number (03XXXXXXXXX)"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              type="tel"
              name="phone"
              autoComplete="tel"
              inputMode="tel"
              className="h-12 rounded-xl"
            />

            <Input
              placeholder="Email address (optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              autoComplete="email"
              className="h-12 rounded-xl"
            />

            <Popover open={cityOpen} onOpenChange={setCityOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="h-12 w-full justify-between rounded-xl">
                  {city || "Select city"}
                  <ChevronsUpDown className="size-4 opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search city..." />
                  <CommandList>
                    <CommandGroup>
                      {CITIES.map((c) => (
                        <CommandItem
                          key={c}
                          onSelect={() => {
                            setCity(c)
                            setCityOpen(false)
                          }}
                        >
                          {c}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <Input
              placeholder="Complete delivery address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="h-12 rounded-xl"
            />

            <Button
              type="button"
              variant="outline"
              onClick={getLocation}
              className={`h-12 w-full gap-2 rounded-xl transition-all ${
                location
                  ? "border-green-600 bg-green-600 text-white hover:bg-green-700"
                  : "border-blue-600 bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              <MapPin className="size-4" />
              {locationLoading
                ? "Getting location..."
                : location
                  ? "Location captured"
                  : "Share my location"}
            </Button>

            {location && (
              <p className="text-xs text-green-600">GPS saved successfully</p>
            )}
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-900">
              <ShoppingBag className="size-4 text-orange-500" />
              Order summary
            </div>

            {cart.length === 0 ? (
              <p className="text-sm text-slate-500">Your cart is empty.</p>
            ) : (
              <ul className="space-y-3">
                {cart.map((item) => (
                  <li
                    key={`${item.id}-${item.color}-${item.size ?? ""}`}
                    className="flex gap-3 border-b border-slate-100 pb-3 last:border-0 last:pb-0"
                  >
                    <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {item.name}
                      </p>
                      {item.color && (
                        <p className="truncate text-xs capitalize text-slate-500">
                          {item.color}
                          {item.size ? ` · ${item.size}` : ""}
                        </p>
                      )}
                      {!item.color && item.size && (
                        <p className="truncate text-xs text-slate-500">{item.size}</p>
                      )}
                      <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="shrink-0 text-sm font-bold text-orange-600">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-900 px-4 py-3 text-white">
              <span className="font-semibold">Total</span>
              <span className="text-lg font-black">{formatPrice(total)}</span>
            </div>

            <Button
              onClick={handlePlaceOrder}
              disabled={loading || cart.length === 0}
              className="mt-4 h-12 w-full rounded-xl bg-orange-500 text-base font-bold hover:bg-orange-600"
            >
              {loading ? "Placing order..." : "Confirm order"}
            </Button>
          </div>
        </aside>
      </div>
    </div>
  )
}