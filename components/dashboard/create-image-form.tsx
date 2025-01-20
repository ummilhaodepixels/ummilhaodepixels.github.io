import Image from "next/image";
import { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  name: string;
  headline: string;
  link: string;
  pixel: number | "";
  rows: number | "";
  columns: number | "";
  type: "regular" | "special";
  templateHeaderTitle: string;
  templateHeaderEmoji: string;
  image: File | null;
}

export default function CreteImageForm() {
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    headline: "",
    link: "",
    pixel: "",
    rows: "",
    columns: "",
    type: "regular",
    templateHeaderTitle: "",
    templateHeaderEmoji: "",
    image: null,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, files } = e.target as HTMLInputElement;
    if (type === "file" && files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "number" ? Number(value) || "" : value,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        data.append(key, value);
      }
    });

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/brands`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      );

      if (!response.ok) {
        alert("Failed to submit form");
      }

      alert("Form submitted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to submit the form");
    }
  };

  const handlePreview = async () => {
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        data.append(key, value);
      }
    });

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/brands/preview-publication-image`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      );

      if (!response.ok) {
        alert("Failed to fetch preview image");
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setPreviewImageUrl(imageUrl);
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch the preview image");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 space-y-4 mt-10"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome do Cliente
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Slogan
          </label>
          <input
            type="text"
            name="headline"
            value={formData.headline}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Link
          </label>
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pixel
          </label>
          <input
            type="number"
            name="pixel"
            value={formData.pixel}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rows
          </label>
          <input
            type="number"
            name="rows"
            value={formData.rows}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Columns
          </label>
          <input
            type="number"
            name="columns"
            value={formData.columns}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de template
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="regular">Regular</option>
            <option value="special">Especial</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Template Título
          </label>
          <input
            type="text"
            name="templateHeaderTitle"
            value={formData.templateHeaderTitle}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Template Emoji
          </label>
          <input
            type="text"
            name="templateHeaderEmoji"
            value={formData.templateHeaderEmoji}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Logo (imagem)
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex gap-1">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            Enviar
          </button>

          <button
            type="button"
            onClick={handlePreview}
            className="w-full bg-yellow-500 text-white font-medium py-2 rounded-lg shadow-md hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
          >
            Preview
          </button>
        </div>
      </form>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-4 max-w-md">
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-red-500 hover:text-red-700 font-bold"
              >
                X
              </button>
            </div>
            {previewImageUrl && (
              <Image
                src={previewImageUrl}
                alt="Preview"
                className="mt-4 w-full h-auto"
                width={500}
                height={500}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
