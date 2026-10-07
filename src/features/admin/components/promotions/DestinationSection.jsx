"use client";

const fieldClass =
  "w-full px-3 py-2 border border-admin-border rounded-xl bg-admin-background text-admin-text text-xs focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary transition-all";

function Field({ label, help, children }) {
  return (
    <div>
      <label className="block font-bold text-admin-text mb-1">{label}</label>
      {children}
      {help && <p className="text-[10px] text-admin-text-muted mt-1">{help}</p>}
    </div>
  );
}

export const DESTINATION_TYPES = [
  { value: "external", label: "لینک خارجی" },
  { value: "product_detail", label: "صفحه محصول مشخص" },
  { value: "products", label: "محصولات فیلترشده" },
  { value: "landing", label: "لندینگ پیج" },
];

export const emptyDestination = {
  destination_type: "external",
  external_url: "",
  target_product: "",
  target_landing: "",
  filter_category: "",
  filter_color: [],
  filter_size: [],
  filter_brand: "",
  filter_min_price: "",
  filter_max_price: "",
  filter_has_discount: false,
};

export function destinationToFormData(fd, form) {
  fd.append("destination_type", form.destination_type || "external");

  if (form.destination_type === "external") {
    if (form.external_url) fd.append("external_url", form.external_url);
  } else if (form.destination_type === "product_detail") {
    if (form.target_product) fd.append("target_product", form.target_product);
  } else if (form.destination_type === "landing") {
    if (form.target_landing) fd.append("target_landing", form.target_landing);
  } else if (form.destination_type === "products") {
    if (form.filter_category) fd.append("filter_category", form.filter_category);
    (form.filter_color || []).forEach((c) => fd.append("filter_color", c));
    (form.filter_size || []).forEach((s) => fd.append("filter_size", s));
    if (form.filter_brand) fd.append("filter_brand", form.filter_brand);
    if (form.filter_min_price !== "" && form.filter_min_price != null) {
      fd.append("filter_min_price", form.filter_min_price);
    }
    if (form.filter_max_price !== "" && form.filter_max_price != null) {
      fd.append("filter_max_price", form.filter_max_price);
    }
    if (form.filter_has_discount) fd.append("filter_has_discount", "true");
  }
}

export function destinationFromApi(data) {
  return {
    destination_type: data.destination_type || "external",
    external_url: data.external_url || "",
    target_product: data.target_product || "",
    target_landing: data.target_landing || "",
    filter_category: data.filter_category || "",
    filter_color: (data.filter_color || []).map(Number),
    filter_size: (data.filter_size || []).map(Number),
    filter_brand: data.filter_brand || "",
    filter_min_price: data.filter_min_price ?? "",
    filter_max_price: data.filter_max_price ?? "",
    filter_has_discount: data.filter_has_discount || false,
  };
}

export default function DestinationSection({
  form,
  setForm,
  products = [],
  landings = [],
  categories = [],
  colors = [],
  sizes = [],
}) {
  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="space-y-3 p-4 rounded-2xl bg-admin-background/60 border border-admin-border">
      <h3 className="text-xs font-black text-admin-text">مقصد (Destination)</h3>

      <Field label="نوع مقصد">
        <select
          value={form.destination_type}
          onChange={(e) => setField("destination_type", e.target.value)}
          className={fieldClass}
        >
          {DESTINATION_TYPES.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </Field>

      {form.destination_type === "external" && (
        <Field label="آدرس لینک خارجی">
          <input
            type="url"
            value={form.external_url || ""}
            onChange={(e) => setField("external_url", e.target.value)}
            placeholder="https://example.com"
            className={fieldClass}
          />
        </Field>
      )}

      {form.destination_type === "product_detail" && (
        <Field label="محصول مقصد">
          <select
            value={form.target_product || ""}
            onChange={(e) => setField("target_product", e.target.value)}
            className={fieldClass}
          >
            <option value="">انتخاب کنید...</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
        </Field>
      )}

      {form.destination_type === "landing" && (
        <Field label="لندینگ پیج مقصد">
          <select
            value={form.target_landing || ""}
            onChange={(e) => setField("target_landing", e.target.value)}
            className={fieldClass}
          >
            <option value="">انتخاب کنید...</option>
            {landings.map((l) => (
              <option key={l.id} value={l.id}>{l.title}</option>
            ))}
          </select>
        </Field>
      )}

      {form.destination_type === "products" && (
        <div className="space-y-3 pt-2 border-t border-admin-border">
          <p className="text-[10px] text-admin-text-muted">
            این فیلترها به فرانت ارسال می‌شوند تا محصولات را واکشی کند.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="دسته‌بندی">
              <select
                value={form.filter_category || ""}
                onChange={(e) => setField("filter_category", e.target.value)}
                className={fieldClass}
              >
                <option value="">همه دسته‌ها</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </Field>

            <Field label="برند">
              <input
                type="text"
                value={form.filter_brand || ""}
                onChange={(e) => setField("filter_brand", e.target.value)}
                placeholder="مثلاً Nike (خالی = همه)"
                className={fieldClass}
              />
            </Field>
          </div>

          <Field label="رنگ‌ها">
            <div className="flex flex-wrap gap-2 p-2.5 border border-admin-border rounded-xl bg-admin-surface min-h-[44px]">
              {colors.length === 0 ? (
                <span className="text-[10px] text-admin-text-muted">رنگی ثبت نشده</span>
              ) : (
                colors.map((c) => {
                  const checked = (form.filter_color || []).map(Number).includes(c.id);
                  return (
                    <label
                      key={c.id}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border cursor-pointer transition-all text-xs font-medium ${
                        checked
                          ? "bg-admin-primary text-button-text border-admin-primary shadow-sm"
                          : "bg-admin-background border-admin-border text-admin-text hover:border-admin-primary/50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={checked}
                        onChange={(e) => {
                          const ids = (form.filter_color || []).map(Number);
                          const next = e.target.checked
                            ? [...ids, c.id]
                            : ids.filter((x) => x !== c.id);
                          setField("filter_color", next);
                        }}
                      />
                      <span
                        className="w-3 h-3 rounded-full border border-black/10 dark:border-white/20"
                        style={{ backgroundColor: c.hex_code }}
                      />
                      {c.name}
                    </label>
                  );
                })
              )}
            </div>
          </Field>

          <Field label="سایزها">
            <div className="flex flex-wrap gap-2 p-2.5 border border-admin-border rounded-xl bg-admin-surface min-h-[44px]">
              {sizes.length === 0 ? (
                <span className="text-[10px] text-admin-text-muted">سایزی ثبت نشده</span>
              ) : (
                sizes.map((s) => {
                  const checked = (form.filter_size || []).map(Number).includes(s.id);
                  return (
                    <label
                      key={s.id}
                      className={`px-3 py-1 rounded-lg border cursor-pointer transition-all text-xs font-medium ${
                        checked
                          ? "bg-admin-primary text-button-text border-admin-primary shadow-sm"
                          : "bg-admin-background border-admin-border text-admin-text hover:border-admin-primary/50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={checked}
                        onChange={(e) => {
                          const ids = (form.filter_size || []).map(Number);
                          const next = e.target.checked
                            ? [...ids, s.id]
                            : ids.filter((x) => x !== s.id);
                          setField("filter_size", next);
                        }}
                      />
                      {s.name}
                    </label>
                  );
                })
              )}
            </div>
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="حداقل قیمت (ریال)">
              <input
                type="number"
                value={form.filter_min_price ?? ""}
                onChange={(e) => setField("filter_min_price", e.target.value)}
                className={fieldClass}
              />
            </Field>
            <Field label="حداکثر قیمت (ریال)">
              <input
                type="number"
                value={form.filter_max_price ?? ""}
                onChange={(e) => setField("filter_max_price", e.target.value)}
                className={fieldClass}
              />
            </Field>
          </div>

          <label className="flex items-center gap-2 cursor-pointer pt-1 text-admin-text">
            <input
              type="checkbox"
              checked={form.filter_has_discount || false}
              onChange={(e) => setField("filter_has_discount", e.target.checked)}
              className="w-4 h-4 rounded text-admin-primary focus:ring-admin-primary border-admin-border bg-admin-background"
            />
            <span className="font-bold text-xs">فقط محصولات تخفیف‌دار</span>
          </label>
        </div>
      )}
    </div>
  );
}