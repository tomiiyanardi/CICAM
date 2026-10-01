"use client";

import { useState } from "react";
import Link from "next/link";
import { LINES } from "@/lib/data";

type CartItem = { id: string; name: string; title: string; price: number; quantity: number };

const PRODUCT_PRICE = 45000;
const SHIPPING_COST = 3500;

export default function Tienda() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "delivery" | "payment" | "success">("cart");
  
  // Checkout form state
  const [deliveryType, setDeliveryType] = useState<"envio" | "retiro">("envio");
  const [address, setAddress] = useState("");

  const addToCart = (line: typeof LINES[0]) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === line.n);
      if (existing) {
        return prev.map(item => item.id === line.n ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { id: line.n, name: line.name, title: line.title, price: PRODUCT_PRICE, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = subtotal + (deliveryType === "envio" ? SHIPPING_COST : 0);

  return (
    <main className="min-h-screen bg-niebla pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Header con carrito */}
        <div className="flex items-center justify-between border-b border-tinta/10 pb-6 mb-12">
          <div>
            <h1 className="font-display text-4xl font-bold md:text-5xl">Tienda Oficial</h1>
            <p className="mt-2 text-tinta/70">Catálogo completo de líneas CICAM</p>
          </div>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 rounded-full bg-tinta px-5 py-3 font-semibold text-white transition hover:bg-tinta/85"
          >
            Carrito
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-hoja text-xs font-bold text-bosque">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Listado de productos (Responsive: Pedestal on Mobile, Swoosh on Desktop) */}
        <div className="mt-16 flex flex-col gap-20 md:gap-16">
          {LINES.map(l => (
            <div key={l.n} className="relative flex flex-col items-center md:h-48 md:flex-row md:justify-start">
              {/* Backgrounds */}
              <div className="absolute inset-0 z-0 overflow-visible" style={{ color: l.bg }}>
                {/* Desktop Swoosh */}
                <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="hidden h-full w-full drop-shadow-sm md:block">
                  <path 
                    d="M 120,90 L 880,90 Q 960,90 1000,10 Q 940,60 880,60 L 120,60 A 15,15 0 0,0 120,90 Z" 
                    fill="currentColor" 
                  />
                </svg>
                {/* Mobile Pedestal */}
                <div className="absolute bottom-0 h-[85%] w-full rounded-[2.5rem] bg-current drop-shadow-sm md:hidden" />
              </div>

              {/* Botella */}
              <div className="relative z-10 -mt-12 h-56 w-full md:absolute md:-bottom-4 md:left-12 md:mt-0 md:h-[140%] md:w-48">
                <img 
                  src="/frascocanabis.png" 
                  alt={`Frasco ${l.title}`} 
                  className="mx-auto h-full w-full object-contain drop-shadow-2xl md:mx-0" 
                />
              </div>

              {/* Contenido (Textos y Botón) */}
              <div className="relative z-10 mt-2 flex w-full flex-col items-center px-6 pb-8 text-center md:ml-64 md:mt-0 md:flex-row md:justify-between md:px-0 md:pb-0 md:pr-24 md:text-left">
                <div className="md:pt-0">
                  <div className="flex items-center justify-center gap-3 md:justify-start">
                    <span className="rounded-full bg-tinta/5 px-2 py-1 text-xs font-bold text-tinta">Nº {l.n}</span>
                    <span className="text-sm font-semibold text-tinta/80">{l.name}</span>
                  </div>
                  <h3 className="mt-2 font-display text-3xl font-bold text-tinta md:mt-1">{l.title}</h3>
                  <div className="mt-1 font-bold text-tinta/70">${PRODUCT_PRICE.toLocaleString()}</div>
                </div>

                <div className="mt-6 md:mt-0">
                  <button 
                    onClick={() => addToCart(l)}
                    className="rounded-full bg-white px-8 py-3 text-sm font-bold text-tinta shadow-md transition hover:bg-tinta hover:text-white"
                  >
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar de Carrito / Checkout Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-tinta/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-tinta/10 p-6">
              <h2 className="font-display text-2xl font-bold">
                {checkoutStep === "cart" ? "Tu Carrito" : checkoutStep === "delivery" ? "Envío" : checkoutStep === "payment" ? "Confirmación" : "¡Listo!"}
              </h2>
              <button onClick={() => { setIsCartOpen(false); setCheckoutStep("cart"); }} className="p-2 text-tinta/50 hover:text-tinta">
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 && checkoutStep === "cart" ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="text-tinta/60">Tu carrito está vacío</p>
                  <button onClick={() => setIsCartOpen(false)} className="mt-6 rounded-full bg-tinta px-6 py-3 font-semibold text-white">Seguir comprando</button>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {/* Step: Carrito */}
                  {checkoutStep === "cart" && (
                    <>
                      {cart.map(item => (
                        <div key={item.id} className="flex items-center justify-between gap-4 border-b border-tinta/10 pb-4">
                          <div>
                            <p className="font-bold">{item.title}</p>
                            <p className="text-sm text-tinta/60">{item.name} · {item.quantity} x ${item.price.toLocaleString()}</p>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-sm text-red-500 hover:underline">Quitar</button>
                        </div>
                      ))}
                    </>
                  )}

                  {/* Step: Delivery */}
                  {checkoutStep === "delivery" && (
                    <div className="flex flex-col gap-5">
                      <div>
                        <label className="mb-2 block font-semibold">Opciones de entrega</label>
                        <select 
                          className="w-full rounded-lg border border-tinta/20 p-3 outline-none focus:border-bosque"
                          value={deliveryType} 
                          onChange={(e) => setDeliveryType(e.target.value as any)}
                        >
                          <option value="envio">Envío a domicilio (+${SHIPPING_COST})</option>
                          <option value="retiro">Retiro en sucursal Mendoza (Gratis)</option>
                        </select>
                      </div>
                      {deliveryType === "envio" && (
                        <div>
                          <label className="mb-2 block font-semibold">Dirección completa</label>
                          <input 
                            type="text" 
                            placeholder="Calle, Número, Localidad..." 
                            className="w-full rounded-lg border border-tinta/20 p-3 outline-none focus:border-bosque"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step: Success */}
                  {checkoutStep === "success" && (
                    <div className="text-center py-10">
                      <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-hoja text-bosque text-2xl">✓</div>
                      <h3 className="font-display text-2xl font-bold">¡Pedido Confirmado!</h3>
                      <p className="mt-4 text-tinta/70">Pronto nos comunicaremos con vos para coordinar el pago y la entrega.</p>
                      <button 
                        onClick={() => { setIsCartOpen(false); setCart([]); setCheckoutStep("cart"); }}
                        className="mt-8 w-full rounded-full bg-tinta px-6 py-3 font-semibold text-white"
                      >
                        Volver a la tienda
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer Carrito */}
            {cart.length > 0 && checkoutStep !== "success" && (
              <div className="border-t border-tinta/10 bg-niebla p-6">
                <div className="mb-4 flex items-center justify-between text-tinta/70">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                {checkoutStep === "delivery" && deliveryType === "envio" && (
                  <div className="mb-4 flex items-center justify-between text-tinta/70">
                    <span>Envío</span>
                    <span>${SHIPPING_COST.toLocaleString()}</span>
                  </div>
                )}
                <div className="mb-6 flex items-center justify-between font-display text-2xl font-bold">
                  <span>Total</span>
                  <span>${(checkoutStep === "cart" ? subtotal : total).toLocaleString()}</span>
                </div>
                
                {checkoutStep === "cart" && (
                  <button onClick={() => setCheckoutStep("delivery")} className="w-full rounded-full bg-tinta py-4 font-semibold text-white transition hover:bg-bosque">
                    Continuar compra
                  </button>
                )}
                {checkoutStep === "delivery" && (
                  <button 
                    disabled={deliveryType === "envio" && !address}
                    onClick={() => setCheckoutStep("payment")} 
                    className="w-full rounded-full bg-bosque py-4 font-semibold text-white transition hover:bg-tinta disabled:opacity-50"
                  >
                    Confirmar datos
                  </button>
                )}
                {checkoutStep === "payment" && (
                  <button 
                    onClick={() => setCheckoutStep("success")} 
                    className="w-full rounded-full bg-tinta py-4 font-semibold text-white transition hover:bg-bosque"
                  >
                    Finalizar pedido
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
