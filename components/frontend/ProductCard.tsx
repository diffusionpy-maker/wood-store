"use client";

import { useCartStore, CartItem } from "@/lib/cartStore";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus } from "lucide-react";

interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    tag?: string;
}

import { useToastStore } from "@/lib/toastStore";

export function ProductCard({ product }: { product: Product }) {
    const addToCart = useCartStore((state) => state.addToCart);
    const addToast = useToastStore((state) => state.addToast);

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
        });
        addToast(`${product.name} 已加入購物車`, 'success');
    };

    return (
        <div className="group relative bg-white/40 backdrop-blur-md border border-white/50 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2">
            {/* Image Container */}
            <div className="aspect-[4/5] relative overflow-hidden bg-muted/20">
                {/* Tag */}
                {product.tag && (
                    <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-white/80 backdrop-blur-md rounded-full text-xs font-medium text-foreground border border-white/50">
                        {product.tag}
                    </div>
                )}

                {/* Placeholder Image Logic - using div or img if available */}
                <div className="absolute inset-0 bg-muted flex items-center justify-center text-muted-foreground/30 text-lg">
                    {/* If we had real images we would put Next Image here */}
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>

                {/* Mobile Add Button (Visible on hover for desktop, always for mobile potentially, but let's stick to hover/overlay) */}
                <div className="absolute bottom-4 right-4 translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <Button size="icon" className="rounded-full shadow-lg h-12 w-12 bg-white hover:bg-primary hover:text-white text-foreground border border-border" onClick={handleAddToCart}>
                        <ShoppingCart className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="mb-2 text-xs text-muted-foreground uppercase tracking-wider">{product.category}</div>
                <h3 className="text-lg font-medium text-foreground mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                <div className="flex items-baseline gap-2">
                    <span className="text-lg font-semibold">NT$ {product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">NT$ {product.originalPrice.toLocaleString()}</span>
                    )}
                </div>
            </div>
        </div>
    );
}
