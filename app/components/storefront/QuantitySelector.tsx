"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

export function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);

  function increment() {
    setQuantity((prev) => Math.min(prev + 1, 99));
  }

  function decrement() {
    setQuantity((prev) => Math.max(prev - 1, 1));
  }

  return (
    <div className="mt-6 flex items-center gap-4">
      <span className="text-sm font-medium text-gray-700">Quantité :</span>

      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
        <button
          type="button"
          onClick={decrement}
          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
        >
          <Minus className="w-4 h-4" />
        </button>

        <input
  type="number"
  name="quantity"
  value={quantity}
  readOnly
  className="w-12 text-center text-sm outline-none bg-transparent"
/>


        <button
          type="button"
          onClick={increment}
          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
