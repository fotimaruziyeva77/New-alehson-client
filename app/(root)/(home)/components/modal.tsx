"use client";

import { X, BarChart3, Target, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Subcategory {
  id: number;
  name: string;
  count: number;
  icon: string;
}

interface CategoryModalProps {
  category: {
    id: number;
    title: string;
    description: string;
    subcategories: Subcategory[];
    stats?: {
      total: number;
      helped: number;
      needs: string[];
    };
  };
  onClose: () => void;
}

export function CategoryModal({ category, onClose }: CategoryModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
              <p className="text-gray-600 mt-1">{category.description}</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Stats Section */}
          {category.stats && (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                  <h3 className="text-lg font-bold">Umumiy Son</h3>
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {category.stats.total.toLocaleString()}
                </div>
                <p className="text-gray-600 text-sm mt-2">O'zbekistonda</p>
              </div>
              
              <div className="bg-green-50 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <Heart className="h-8 w-8 text-green-600" />
                  <h3 className="text-lg font-bold">Yordam Berilgan</h3>
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {category.stats.helped.toLocaleString()}
                </div>
                <p className="text-gray-600 text-sm mt-2">Alehson tomonidan</p>
              </div>
              
              <div className="bg-amber-50 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <Target className="h-8 w-8 text-amber-600" />
                  <h3 className="text-lg font-bold">Ehtiyojlar</h3>
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {category.stats.needs.length}+
                </div>
                <p className="text-gray-600 text-sm mt-2">Turli yo'nalishlar</p>
              </div>
            </div>
          )}

          {/* Subcategories */}
          <div>
            <h3 className="text-xl font-bold mb-6">Subkategoriyalar</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {category.subcategories.map((sub) => (
                <div 
                  key={sub.id} 
                  className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{sub.icon}</span>
                      <h4 className="font-semibold text-gray-900">{sub.name}</h4>
                    </div>
                    <div className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                      {sub.count.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Yordam berildi:</span>
                      <span className="font-semibold">
                        {Math.floor(sub.count * 0.7).toLocaleString()} kishi
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                        style={{ width: '70%' }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Needs */}
          {category.stats?.needs && (
            <div>
              <h3 className="text-xl font-bold mb-4">Asosiy Ehtiyojlar</h3>
              <div className="flex flex-wrap gap-3">
                {category.stats.needs.map((need, idx) => (
                  <div 
                    key={idx}
                    className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
                  >
                    {need}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t p-6 rounded-b-2xl">
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={onClose}>
              Yopish
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Bu kategoriyaga yordam berish
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}