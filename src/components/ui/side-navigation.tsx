"use client";

import { useState, useEffect } from "react";
import {
  X,
  Home,
  Film,
  Tv,
  Play,
  Newspaper,
  Trophy,
  ChevronRight,
} from "lucide-react";

import { SITE_CONFIG } from "@/lib/config";

interface SideNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SideNavigation({ isOpen, onClose }: SideNavigationProps) {
  console.log("SideNavigation render - isOpen:", isOpen);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // 点击遮罩层关闭菜单
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // ESC键关闭菜单
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
      // 禁止背景滚动
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleItemClick = (itemName: string, href: string) => {
    if (itemName === "首页") {
      // 首页直接跳转
      window.location.href = href;
      onClose();
    } else {
      // 其他菜单项展开/收起
      setExpandedItems((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(itemName)) {
          newSet.delete(itemName);
        } else {
          newSet.add(itemName);
        }
        return newSet;
      });
    }
  };

  const menuItems = [
    { name: "首页", icon: Home, href: "/", isActive: true },
    {
      name: "电影片",
      icon: Film,
      href: "/category/1",
      hasArrow: true,
      subItems: [
        { name: "动作片", href: "/category/1?tag=action" },
        { name: "喜剧片", href: "/category/1?tag=comedy" },
        { name: "爱情片", href: "/category/1?tag=romance" },
        { name: "科幻片", href: "/category/1?tag=sci-fi" },
        { name: "恐怖片", href: "/category/1?tag=horror" },
        { name: "剧情片", href: "/category/1?tag=drama" },
      ],
    },
    {
      name: "连续剧",
      icon: Tv,
      href: "/category/2",
      hasArrow: true,
      subItems: [
        { name: "国产剧", href: "/category/2?tag=domestic" },
        { name: "韩剧", href: "/category/2?tag=korean" },
        { name: "美剧", href: "/category/2?tag=american" },
        { name: "日剧", href: "/category/2?tag=japanese" },
        { name: "港剧", href: "/category/2?tag=hongkong" },
        { name: "台剧", href: "/category/2?tag=taiwan" },
      ],
    },
    {
      name: "综艺片",
      icon: Play,
      href: "/category/3",
      hasArrow: true,
      subItems: [
        { name: "真人秀", href: "/category/3?tag=reality" },
        { name: "脱口秀", href: "/category/3?tag=talk" },
        { name: "选秀节目", href: "/category/3?tag=talent" },
        { name: "访谈节目", href: "/category/3?tag=interview" },
        { name: "游戏节目", href: "/category/3?tag=game" },
      ],
    },
    {
      name: "动漫片",
      icon: Film,
      href: "/category/4",
      hasArrow: true,
      subItems: [
        { name: "国产动漫", href: "/category/4?tag=domestic" },
        { name: "日本动漫", href: "/category/4?tag=japanese" },
        { name: "欧美动漫", href: "/category/4?tag=western" },
        { name: "韩国动漫", href: "/category/4?tag=korean" },
      ],
    },
    {
      name: "新闻资讯",
      icon: Newspaper,
      href: "/category/34",
      hasArrow: true,
      subItems: [
        { name: "娱乐新闻", href: "/category/34?tag=entertainment" },
        { name: "体育新闻", href: "/category/34?tag=sports" },
        { name: "社会新闻", href: "/category/34?tag=society" },
        { name: "科技新闻", href: "/category/34?tag=tech" },
      ],
    },
    {
      name: "体育赛事",
      icon: Trophy,
      href: "/category/35",
      hasArrow: true,
      subItems: [
        { name: "足球", href: "/category/35?tag=football" },
        { name: "篮球", href: "/category/35?tag=basketball" },
        { name: "网球", href: "/category/35?tag=tennis" },
        { name: "综合体育", href: "/category/35?tag=general" },
      ],
    },
  ];

  return (
    <>
      {/* 遮罩层 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={handleOverlayClick}
        />
      )}

      {/* 侧边菜单 */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* 头部 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center space-x-3">
            {/* Logo */}
            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
              <Film className="w-5 h-5 text-white" />
            </div>
            {/* 标题 */}
            <span className="text-lg font-semibold text-gray-800">
              {SITE_CONFIG.shortName}
            </span>
          </div>
          {/* 关闭按钮 */}
          <button
            onClick={onClose}
            className="p-1 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* 菜单项 - 可滚动区域 */}
        <div className="flex-1 overflow-y-auto py-4">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            const isExpanded = expandedItems.has(item.name);
            const hasSubItems = item.subItems && item.subItems.length > 0;

            return (
              <div key={index}>
                <button
                  onClick={() => handleItemClick(item.name, item.href)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors ${
                    item.isActive ? "bg-blue-500 text-white rounded-r-lg" : ""
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <IconComponent
                      size={20}
                      className={item.isActive ? "text-white" : "text-gray-600"}
                    />
                    <span
                      className={item.isActive ? "text-white font-medium" : ""}
                    >
                      {item.name}
                    </span>
                  </div>
                  {hasSubItems && (
                    <ChevronRight
                      size={16}
                      className={`text-gray-400 transition-transform duration-200 ${
                        isExpanded ? "rotate-90" : ""
                      }`}
                    />
                  )}
                </button>

                {/* 子菜单 */}
                {hasSubItems && isExpanded && (
                  <div className="bg-gray-50 border-l-2 border-blue-500">
                    {item.subItems.map((subItem, subIndex) => (
                      <a
                        key={subIndex}
                        href={subItem.href}
                        className="flex items-center px-8 py-2 text-sm text-gray-600 hover:bg-gray-100 transition-colors"
                        onClick={onClose}
                      >
                        {subItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
