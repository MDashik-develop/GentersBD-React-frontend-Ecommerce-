// ProductCreate.jsx
import axios from "axios";
import React, { useState, useEffect } from "react";
import ImageUpload from "../../section/ImageUpload";
import { IoAddCircleSharp, IoRemoveCircle } from "react-icons/io5";

function ProductCreate() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [status, setStatus] = useState("pending");
  const [hasVariants, setHasVariants] = useState(false);

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [attributes, setAttributes] = useState([]);

  const [brandId, setBrandId] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [variants, setVariants] = useState([
    {
      price: "",
      stock: "",
      barcode: "",
      media_id: null,
      attributes: [{ attribute_id: "", attribute_value_id: "" }],
    },
  ]);

  const token = sessionStorage.getItem("token")?.replace(/"/g, "").trim();
  const http = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/",
    headers: { Authorization: `Bearer ${token}` },
  });

  // Fetch brands, categories, attributes
  useEffect(() => {
    http.get("brands").then((res) => setBrands(res.data.data));
    http.get("categories").then((res) => setCategories(res.data.data));
    http.get("attributes").then((res) => setAttributes(res.data));
  }, []);

  // Variant handlers
  const addVariant = () => {
    setVariants([
      ...variants,
      {
        price: "",
        stock: "",
        barcode: "",
        media_id: null,
        attributes: [{ attribute_id: "", attribute_value_id: "" }],
      },
    ]);
  };

  const removeVariant = (vIndex) => {
    const updated = [...variants];
    updated.splice(vIndex, 1);
    setVariants(updated);
  };

  const updateVariantField = (vIndex, field, value) => {
    const updated = [...variants];
    updated[vIndex][field] = value;
    setVariants(updated);
  };

  // Attribute handlers inside variant
  const addAttributeRow = (vIndex) => {
    const updated = [...variants];
    updated[vIndex].attributes.push({ attribute_id: "", attribute_value_id: "" });
    setVariants(updated);
  };

  const removeAttributeRow = (vIndex, aIndex) => {
    const updated = [...variants];
    updated[vIndex].attributes.splice(aIndex, 1);
    setVariants(updated);
  };

  const updateAttributeField = (vIndex, aIndex, field, value) => {
    const updated = [...variants];
    updated[vIndex].attributes[aIndex][field] = value;
    setVariants(updated);
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: ensure each variant has at least one attribute and all attribute fields are filled
    for (const v of variants) {
      if (!v.attributes.length) {
        alert("Each variant must have at least one attribute");
        return;
      }
      for (const a of v.attributes) {
        if (!a.attribute_id || !a.attribute_value_id) {
          alert("All variant attributes must be selected");
          return;
        }
      }
    }

    const payload = {
  brand_id: parseInt(brandId),
  category_id: parseInt(categoryId),
  name,
  slug,
  description,
  short_description: shortDescription,
  base_price: parseFloat(basePrice) || 0,
  cost_price: parseFloat(costPrice) || 0,
  weight: parseFloat(weight) || 0,
  dimensions,
  status,
  has_variants: hasVariants ? 1 : 0,
  variant: variants.map(v => ({
    price: parseFloat(v.price) || 0,
    stock: parseInt(v.stock) || 0,
    barcode: parseInt(v.barcode) || 0,
    media_id: v.media_id,
  })),
  attribute: variants.flatMap((v, vIndex) =>
    v.attributes.map(a => ({
      product_variant_id: vIndex,   // index of the variant
      attribute_id: parseInt(a.attribute_id),
      attribute_value_id: parseInt(a.attribute_value_id),
    }))
  ),
};


    console.log("Payload to send:", payload);

    try {
      const res = await http.post("products/create", payload, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(res.data);
      alert("Product created successfully!");
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Error: " + JSON.stringify(err.response?.data));
    }
  };

  return (
    <form className="max-w-5xl mx-auto p-4 space-y-6" onSubmit={handleSubmit}>
      {/* Basic Product Info */}
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <select
          value={brandId}
          onChange={(e) => setBrandId(e.target.value)}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Brand</option>
          {brands.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Base Price"
          value={basePrice}
          onChange={(e) => setBasePrice(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Cost Price"
          value={costPrice}
          onChange={(e) => setCostPrice(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Dimensions"
          value={dimensions}
          onChange={(e) => setDimensions(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Status</option>
          <option value="published">Published</option>
          <option value="pending">Pending</option>
        </select>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={hasVariants}
            onChange={(e) => setHasVariants(e.target.checked)}
          />
          Has Variants
        </label>
      </div>

      {/* Variants */}
      {variants.map((variant, vIndex) => (
        <div key={vIndex} className="border p-4 rounded space-y-3 bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold">Variant {vIndex + 1}</h3>
            {variants.length > 1 && (
              <IoRemoveCircle
                size={24}
                className="text-red-500 cursor-pointer"
                onClick={() => removeVariant(vIndex)}
              />
            )}
          </div>

          <div className="grid grid-cols-4 gap-4 mb-2">
            <input
              type="number"
              placeholder="Price"
              value={variant.price}
              onChange={(e) => updateVariantField(vIndex, "price", e.target.value)}
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              placeholder="Stock"
              value={variant.stock}
              onChange={(e) => updateVariantField(vIndex, "stock", e.target.value)}
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              placeholder="Barcode"
              value={variant.barcode}
              onChange={(e) => updateVariantField(vIndex, "barcode", e.target.value)}
              className="border p-2 rounded"
              required
            />
            <ImageUpload
              http={http}
              setMediaId={(id) => updateVariantField(vIndex, "media_id", id)}
            />
          </div>

          {/* Attributes inside variant */}
          <div className="space-y-2">
            {variant.attributes.map((attr, aIndex) => (
              <div key={aIndex} className="grid grid-cols-3 gap-4 items-center">
                <select
                  value={attr.attribute_id}
                  onChange={(e) =>
                    updateAttributeField(vIndex, aIndex, "attribute_id", e.target.value)
                  }
                  className="border p-2 rounded"
                  required
                >
                  <option value="">Select Attribute</option>
                  {attributes.map((attrItem) => (
                    <option key={attrItem.id} value={attrItem.id}>
                      {attrItem.name}
                    </option>
                  ))}
                </select>
                <select
                  value={attr.attribute_value_id}
                  onChange={(e) =>
                    updateAttributeField(vIndex, aIndex, "attribute_value_id", e.target.value)
                  }
                  className="border p-2 rounded"
                  required
                >
                  <option value="">Select Value</option>
                  {attributes
                    .find((a) => a.id == attr.attribute_id)
                    ?.values.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.value}
                      </option>
                    ))}
                </select>
                {variant.attributes.length > 1 && (
                  <IoRemoveCircle
                    size={24}
                    className="text-red-500 cursor-pointer"
                    onClick={() => removeAttributeRow(vIndex, aIndex)}
                  />
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addAttributeRow(vIndex)}
              className="text-blue-500 flex items-center gap-1"
            >
              <IoAddCircleSharp /> Add Attribute
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addVariant}
        className="text-blue-600 flex items-center gap-1"
      >
        <IoAddCircleSharp /> Add Variant
      </button>

      <button
        type="submit"
        className="bg-blue-600 text-white px-5 py-2 rounded mt-4"
      >
        Submit Product
      </button>
    </form>
  );
}

export default ProductCreate;
