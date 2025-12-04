"use client";

import { useState } from "react";
import { ChevronRight, Users,  User, Stethoscope } from "lucide-react";
import { CategoryModal } from './modal'
import { FaChild, FaWheelchair } from 'react-icons/fa'


const categories = [
  {
    id: 1,
    title: "Nogironlar",
    icon: FaWheelchair,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    description: "Turli guruhdagi nogiron fuqarolar",
    subcategories: [
      { id: 1, name: "1-guruh nogiron", count: 1240, icon: "👨‍🦽" },
      { id: 2, name: "2-guruh nogiron", count: 2560, icon: "👩‍🦽" },
      { id: 3, name: "3-guruh nogiron", count: 3780, icon: "🧑‍🦯" },
      { id: 4, name: "Bolalar nogironligi", count: 890, icon: "👶" },
      { id: 5, name: "Ko'rlar", count: 1560, icon: "👨‍🦯" },
      { id: 6, name: "Kar va so'zlash muammoli", count: 2340, icon: "🧏" }
    ],
    stats: {
      total: 12500,
      helped: 8900,
      needs: ["Tibbiy jihozlar", "Reabilitatsiya", "Transport", "Maslahat xizmati"]
    }
  },
  {
    id: 2,
    title: "Bola-ona",
    icon: FaChild,
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-50",
    description: "Yolg'iz ona va otalar, yetim bolalar",
    subcategories: [
      { id: 1, name: "Yolg'iz onalar", count: 5670, icon: "👩" },
      { id: 2, name: "Yolg'iz otalar", count: 1230, icon: "👨" },
      { id: 3, name: "Yetim bolalar", count: 2340, icon: "👶" },
      { id: 4, name: "Ko'p bolali oilalar", count: 4560, icon: "👨‍👩‍👧‍👦" }
    ]
  },
  {
    id: 3,
    title: "Qariyalar",
    icon: User,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    description: "Yolg'iz va ehtiyojmand qariyalar",
    subcategories: [
      { id: 1, name: "80+ yosh", count: 2340, icon: "👵" },
      { id: 2, name: "70-80 yosh", count: 4560, icon: "👴" },
      { id: 3, name: "Yolg'iz qariyalar", count: 1890, icon: "🧓" }
    ]
  },
  {
    id: 4,
    title: "Tibbiy Yordam",
    icon: Stethoscope,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    description: "Qimmat tibbiy davolanish muhtojlari",
    subcategories: [
      { id: 1, name: "Onkologik bemorlar", count: 780, icon: "🩺" },
      { id: 2, name: "Yurak-qon tomir", count: 1230, icon: "❤️" },
      { id: 3, name: "Neyroxirurgiya", count: 450, icon: "🧠" }
    ]
  },
  {
    id: 5,
    title: "Ta'lim",
    icon: Users,
    color: "from-amber-500 to-amber-600",
    bgColor: "bg-amber-50",
    description: "Imkoniyati cheklangan bolalar",
    subcategories: [
      { id: 1, name: "Maktab ta'limi", count: 5670, icon: "📚" },
      { id: 2, name: "Maxsus ta'lim", count: 890, icon: "🎓" },
      { id: 3, name: "Kasb-hunar ta'limi", count: 1560, icon: "🔧" }
    ]
  }
];

export function CategoryGrid() {
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <div 
              key={category.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
              onClick={() => setSelectedCategory(category)}
            >
              {/* Header */}
              <div className={`p-6 ${category.bgColor}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color}`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <ChevronRight className="h-6 w-6 text-gray-400" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {category.description}
                </p>
              </div>
              
              {/* Subcategories */}
              <div className="p-6">
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-3">
                    Subkategoriyalar ({category.subcategories.length})
                  </h4>
                  <div className="space-y-2">
                    {category.subcategories.slice(0, 3).map((sub) => (
                      <div 
                        key={sub.id} 
                        className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{sub.icon}</span>
                          <span className="text-gray-700">{sub.name}</span>
                        </div>
                        <span className="text-sm font-semibold bg-white px-2 py-1 rounded">
                          {sub.count.toLocaleString()} kishi
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {category.subcategories.length > 3 && (
                  <div className="text-center">
                    <button className="text-blue-600 text-sm font-semibold hover:text-blue-700">
                      + {category.subcategories.length - 3} boshqa subkategoriya
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {selectedCategory && (
        <CategoryModal 
          category={selectedCategory}
          onClose={() => setSelectedCategory(null)}
        />
      )}
    </>
  );
}	