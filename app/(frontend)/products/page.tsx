"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/frontend/ProductCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Filter, ArrowDownWideNarrow, Sparkles } from "lucide-react";

// 模擬商品資料
const products = [
  { id: "1", name: "北歐白橡木餐椅", price: 4500, originalPrice: 5200, image: "/images/chair.jpg", category: "Furniture", tag: "Hot" },
  { id: "2", name: "日式胡桃木茶几", price: 8900, image: "/images/table.jpg", category: "Furniture", tag: "New" },
  { id: "3", name: "簡約實木床架", price: 15800, originalPrice: 18000, image: "/images/bed.jpg", category: "Furniture" },
  { id: "4", name: "手工陶瓷花瓶", price: 1200, image: "/images/vase.jpg", category: "Lifestyle" },
  { id: "5", name: "編織收納籃", price: 890, image: "/images/basket.jpg", category: "Lifestyle" },
  { id: "6", name: "極簡落地燈", price: 3200, originalPrice: 3980, image: "/images/lamp.jpg", category: "Lighting" },
];

const categories = ["All", "Furniture", "Lighting", "Lifestyle", "Decor"];

export default function ProductsPage() {

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Filter logic (mock for now, can be expanded)
  const filteredProducts = products; // In real app, apply category filters here

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-background min-h-screen pt-24 pb-20">
      {/* Decorative Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-muted/20 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* Header */}
        <section className="relative py-24 lg:py-40">
          <ScrollReveal className="text-center mb-16">

           
            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-primary/10 bg-white/60 backdrop-blur-xl mb-12 shadow-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 hover:scale-105 cursor-default group">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-xs font-semibold text-primary/80 tracking-[0.25em] uppercase group-hover:tracking-[0.35em] transition-all duration-500">Collections</span>
          </div>

            <h1 className="text-4xl md:text-5xl font-light text-foreground mb-4 tracking-tight">
              Our <span className="text-primary font-normal">Collections</span>
            </h1>
            <p className="text-muted-foreground font-light max-w-xl mx-auto">
              探索我們精心挑選的系列，為您的居家生活注入自然與溫暖。
            </p>
          </ScrollReveal>
        </section>
        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
            <ScrollReveal direction="right" delay={0.1}>
              <div className="sticky top-32 space-y-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground tracking-wide border-b border-border/50 pb-2">Category</h3>
                  <ul className="space-y-2">
                    {categories.map((cat) => (
                      <li key={cat}>
                        <button className="text-base text-muted-foreground/80 hover:text-primary transition-all duration-300 text-left w-full py-2 hover:pl-2 border-l-2 border-transparent hover:border-primary/50 group">
                          <span className="group-hover:translate-x-1 transition-transform inline-block">{cat}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sort/Filter Buttons Mobile Friendly */}
                <div className="flex gap-2 md:hidden">
                  <Button variant="outline" size="sm" className="flex-1"><Filter className="w-4 h-4 mr-2" /> Filter</Button>
                  <Button variant="outline" size="sm" className="flex-1"><ArrowDownWideNarrow className="w-4 h-4 mr-2" /> Sort</Button>
                </div>
              </div>
            </ScrollReveal>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground text-sm">Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length} results</p>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Per page:</span>
                <select
                  className="bg-transparent border border-input rounded-md text-sm p-1"
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value={12}>12</option>
                  <option value={24}>24</option>
                  <option value={48}>48</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentProducts.map((product, index) => (
                <ScrollReveal key={product.id} delay={index * 0.1}>
                  <ProductCard product={product} />
                </ScrollReveal>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <ScrollReveal delay={0.4} className="mt-20 flex justify-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full w-10 h-10"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &lt;
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={page === currentPage ? "default" : "outline"}
                    size="icon"
                    className="rounded-full w-10 h-10 transition-transform active:scale-95"
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full w-10 h-10"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </Button>
              </ScrollReveal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
