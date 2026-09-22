"use client";

import { useMemo } from "react";
import CategoryRow from "./CategoryRow";

export default function CategoryTree({
  categories,
  expanded,
  onToggleExpand,
  onEdit,
  onDelete,
  onAddChild,
  onToggleActive,
}) {
  // ساخت ساختار درختی
  const tree = useMemo(() => {
    const map = {};
    categories.forEach((c) => { map[c.id] = { ...c, children: [] }; });
    const roots = [];
    categories.forEach((c) => {
      if (c.parent && map[c.parent]) map[c.parent].children.push(map[c.id]);
      else roots.push(map[c.id]);
    });
    const sort = (nodes) => {
      nodes.sort((a, b) => {
        if (a.sort_order !== b.sort_order) return a.sort_order - b.sort_order;
        return a.name.localeCompare(b.name, "fa");
      });
      nodes.forEach((n) => sort(n.children));
    };
    sort(roots);
    return roots;
  }, [categories]);

  const renderNode = (node, depth = 0) => {
    const hasChildren = node.children.length > 0;
    const isExpanded = expanded.has(node.id);

    return (
      <div key={node.id}>
        <CategoryRow
          category={node}
          depth={depth}
          isExpanded={isExpanded}
          hasChildren={hasChildren}
          onToggleExpand={onToggleExpand}
          onEdit={onEdit}
          onDelete={onDelete}
          onAddChild={onAddChild}
          onToggleActive={onToggleActive}
        />
        {hasChildren && isExpanded && (
          <div className="space-y-0.5">
            {node.children.map((child) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  if (tree.length === 0) {
    return (
      <div className="p-12 text-center text-xs text-slate-500">
        دسته‌بندی‌ای ثبت نشده است
      </div>
    );
  }

  return <div className="space-y-0.5">{tree.map((n) => renderNode(n))}</div>;
}