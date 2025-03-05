import { CreateBranchSchema } from "@/schemas/create-brand.schema";
import apiClient from "./api-client";

export async function getNextPixelAvailable() {
  return apiClient
    .get("/brands/next-pixel-available")
    .then((res) => res.json());
}

export async function createBrand(data: CreateBranchSchema) {
  const formData = new FormData();

  const { template, ...rest } = data;

  for (const [key, value] of Object.entries(rest)) {
    if (value) {
      formData.append(key, value);
    }
  }

  for (const [key, value] of Object.entries(template)) {
    if (value) {
      formData.append(`template[${key}]`, value);
    }
  }

  return apiClient.post("/brands", {
    body: formData,
  });
}

export async function getPreviewBrandPublicationImage(
  data: CreateBranchSchema
) {
  const formData = new FormData();

  const { template, ...rest } = data;

  for (const [key, value] of Object.entries(rest)) {
    if (value) {
      formData.append(key, value);
    }
  }

  for (const [key, value] of Object.entries(template)) {
    if (value) {
      formData.append(`template[${key}]`, value);
    }
  }

  return apiClient.post("/brands/preview-publication-image", {
    body: formData,
  });
}
