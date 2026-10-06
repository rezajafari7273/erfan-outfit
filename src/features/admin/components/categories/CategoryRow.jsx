"use client";

import {
  PencilSquareIcon,
  TrashIcon,
  PlusIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

export default function CategoryRow({
  category,
  depth = 0,
  isExpanded,
  hasChildren,
  onToggleExpand,
  onEdit,
  onDelete,
  onAddChild,
  onToggleActive,
}) {
  const indent = depth * 24;

  const formatNum = (v) => Number(v || 0).toLocaleString("fa-IR");

  return (
    <div
      className="flex items-center gap-3 p-3 rounded-2xl hover:bg-admin-background/60 border border-transparent hover:border-admin-border/50 transition group"
      style={{ paddingRight: `${indent + 12}px` }}
    >
      {/* دکمه باز و بسته‌شدن شاخه */}
      <div className="w-5 shrink-0 flex items-center justify-center">
        {hasChildren ? (
          <button
            onClick={() => onToggleExpand(category.id)}
            className="p-1 rounded-lg text-admin-text-muted hover:text-admin-text hover:bg-admin-border/40 transition"
          >
            {isExpanded ? (
              <ChevronDownIcon className="w-4 h-4" />
            ) : (
              <ChevronLeftIcon className="w-4 h-4" />
            )}
          </button>
        ) : (
          <span className="block w-2 h-2 rounded-full bg-admin-border/80" />
        )}
      </div>

      {/* تصویر */}
      {category.image ? (
        <img
          src={category.image}
          alt=""
          className="w-10 h-10 rounded-xl object-cover border border-admin-border/50 shrink-0"
        />
      ) : (
        <div className="w-10 h-10 rounded-xl bg-admin-border/40 shrink-0" />
      )}

      {/* اطلاعات */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`text-xs font-bold ${
              depth === 0 ? "text-admin-text" : "text-admin-text-muted"
            }`}
          >
            {category.name}
          </span>
          {category.code && (
            <span className="text-[10px] bg-admin-background text-admin-text-muted px-2 py-0.5 rounded-md font-mono border border-admin-border/60">
              {category.code}
            </span>
          )}
          {category.is_featured && (
            <span className="text-[10px] bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded-md font-bold">
              محبوب
            </span>
          )}
          {category.is_collection && (
            <span className="text-[10px] bg-violet-500/10 text-violet-500 border border-violet-500/20 px-2 py-0.5 rounded-md font-bold">
              کالکشن
            </span>
          )}
        </div>
        <div className="text-[10px] font-bold text-admin-text-muted mt-1">
          {category.slug}
          {typeof category.products_count === "number" && (
            <> · {formatNum(category.products_count)} محصول</>
          )}
        </div>
      </div>

      {/* عملیات */}
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={() => onAddChild(category)}
          title="افزودن زیردسته"
          className="p-1.5 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 rounded-xl transition"
        >
          <PlusIcon className="w-4 h-4" />
        </button>
        <button
          onClick={() => onToggleActive(category.id)}
          title={category.is_active ? "غیرفعال کردن" : "فعال کردن"}
          className={`p-1.5 rounded-xl transition ${
            category.is_active
              ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
              : "bg-admin-border/40 text-admin-text-muted hover:bg-admin-border/70"
          }`}
        >
          {category.is_active ? (
            <EyeIcon className="w-4 h-4" />
          ) : (
            <EyeSlashIcon className="w-4 h-4" />
          )}
        </button>
        <button
          onClick={() => onEdit(category)}
          title="ویرایش"
          className="p-1.5 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 rounded-xl transition"
        >
          <PencilSquareIcon className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(category)}
          title="حذف"
          className="p-1.5 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 rounded-xl transition"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}