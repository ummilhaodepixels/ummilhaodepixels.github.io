import { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  name: string;
  headline: string;
  link: string;
  pixel: number | '';
  rows: number | '';
  columns: number | '';
  type: string;
  image: File | null;
}

export default function CreteImageForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    headline: '',
    link: '',
    pixel: '',
    rows: '',
    columns: '',
    type: '',
    image: null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, files } = e.target as HTMLInputElement;
    if (type === 'file' && files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: type === 'number' ? Number(value) || '' : value }));
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

    try {
      const response = await fetch('https://api-fc6m.onrender.com/brands', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      alert('Form submitted successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to submit the form');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 space-y-4 mt-10"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Cliente</label>
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
        <label className="block text-sm font-medium text-gray-700 mb-1">Slogan</label>
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
        <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
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
        <label className="block text-sm font-medium text-gray-700 mb-1">Pixel</label>
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
        <label className="block text-sm font-medium text-gray-700 mb-1">Rows</label>
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
        <label className="block text-sm font-medium text-gray-700 mb-1">Columns</label>
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
        <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de template</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="special">Especial</option>
          <option value="regular">Regular</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Logo (imagem)</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        Enviar
      </button>
    </form>
  );
}
