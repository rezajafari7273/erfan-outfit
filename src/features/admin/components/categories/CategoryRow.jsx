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

  return (
    <div
      className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/40 transition group"
      style={{ paddingRight: `${indent + 12}px` }}
    >
      {/* Expand toggle */}
      <div className="w-5 shrink-0">
        {hasChildren ? (
          <button
            onClick={() => onToggleExpand(category.id)}
            className="p-0.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          >
            {isExpanded ? (
              <ChevronDownIcon className="w-4 h-4" />
            ) : (
              <ChevronLeftIcon className="w-4 h-4" />
            )}
          </button>
        ) : (
          <span className="block w-4 h-4 text-slate-300 dark:text-slate-600 text-center text-xs">•</span>
        )}
      </div>

      {/* Image */}
      {category.image ? (
        <img src={category.image} alt="" className="w-9 h-9 rounded-lg object-cover border shrink-0" />
      ) : (
        <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0" />
      )}

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold ${depth === 0 ? "text-slate-800 dark:text-slate-100" : "text-slate-600 dark:text-slate-300"}`}>
            {category.name}
          </span>
          {category.code && (
            <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-1.5 py-0.5 rounded font-mono">
              {category.code}
            </span>
          )}
          {category.is_featured && (
            <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold">داغ</span>
          )}
          {category.is_collection && (
            <span className="text-[10px] bg-violet-100 text-violet-700 px-1.5 py-0.5 rounded font-bold">کالکشن</span>
          )}
        </div>
        <div className="text-[10px] text-slate-500 mt-0.5">
          {category.slug}
          {typeof category.products_count === "number" && (
            <> · {category.products_count} محصول</>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={() => onAddChild(category)}
          title="افزودن زیردسته"
          className="p-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg"
        >
          <PlusIcon className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onToggleActive(category.id)}
          title={category.is_active ? "غیرفعال" : "فعال"}
          className={`p-1.5 rounded-lg ${category.is_active ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400"}`}
        >
          {category.is_active ? <EyeIcon className="w-3.5 h-3.5" /> : <EyeSlashIcon className="w-3.5 h-3.5" />}
        </button>
        <button
          onClick={() => onEdit(category)}
          title="ویرایش"
          className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg"
        >
          <PencilSquareIcon className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onDelete(category)}
          title="حذف"
          className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg"
        >
          <TrashIcon className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}