"use client";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Modal from "@/components/ui/modal";
import Image from "next/image";
import Spinner from "@/components/ui/spinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useMutation } from "@tanstack/react-query";
import {
  createBrand,
  getNextPixelAvailable,
  getPreviewBrandPublicationImage,
} from "@/api/brands";
import {
  CreateBranchSchema,
  createBranchSchema,
} from "@/schemas/create-brand.schema";
import { toast } from "@/hooks/use-toast";
import { FormInputField } from "@/components/form/form-input-field";
import { FormFileField } from "@/components/form/form-file-field";
import { FormSelectField } from "@/components/form/form-select-field";
import { Form } from "@/components/ui/form";
import { useEffect } from "react";
import { Download } from "lucide-react";

export default function NewBrandPage() {
  const [submitType, setSubmitType] = useState<"create" | "preview">("create");
  const [isModalPreviewOpen, setIsModalPreviewOpen] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState("");

  const createBrandMutation = useMutation({
    mutationFn: createBrand,
  });

  const previewBrandMutation = useMutation({
    mutationFn: getPreviewBrandPublicationImage,
  });

  const form = useForm<CreateBranchSchema>({
    resolver: zodResolver(createBranchSchema),
    defaultValues: {
      name: "",
      headline: "",
      link: "",
      type: "regular",
      pixel: 0,
      rows: 1,
      columns: 1,
      template: {
        headerTitle: "",
        headerEmoji: "",
      },
    },
  });
  const fileRef = form.register("logo");

  function updateNextPixelAvailable() {
    getNextPixelAvailable().then((data) => {
      form.reset((prevValues) => ({
        ...prevValues,
        pixel: data.pixel ?? prevValues.pixel,
      }));
    });
  }

  useEffect(() => {
    updateNextPixelAvailable();
  }, []);

  async function handleSubmit(data: CreateBranchSchema) {
    setPreviewImageUrl("");

    try {
      if (submitType === "preview") {
        setIsModalPreviewOpen(true);

        const response = await previewBrandMutation.mutateAsync(data);

        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);

        setPreviewImageUrl(imageUrl);
      } else {
        await createBrandMutation.mutateAsync(data);

        form.reset();
        updateNextPixelAvailable();

        toast({
          variant: "success",
          title: "Adicionado com sucesso.",
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  function downloadPreviewImage() {
    const link = document.createElement("a");
    link.download = `preview - ${form.getValues("name")}.png`;
    link.href = previewImageUrl;
    link.click();
  }

  return (
    <>
      <Modal
        title="Preview"
        isOpen={isModalPreviewOpen}
        onOpenChange={setIsModalPreviewOpen}
        className="w-[800px] h-[800px]"
      >
        {previewBrandMutation.isPending && (
          <div className="flex flex-col gap-2 items-center justify-center w-full h-full">
            <Spinner />
            <span className="text text-gray-600">Carregando preview...</span>
          </div>
        )}

        {!previewBrandMutation.isPending && previewImageUrl && (
          <div className="relative w-full h-full">
            <Image
              src={previewImageUrl}
              alt="Preview"
              fill
              className="object-contain"
            />
            <Button
              className="absolute bottom-4 right-4"
              variant="default"
              onClick={downloadPreviewImage}
            >
              Download
              <Download />
            </Button>
          </div>
        )}

        {!previewBrandMutation.isPending && !previewImageUrl && (
          <div className="flex flex-col gap-2 items-center justify-center w-full h-full">
            <span className="text text-gray-600">
              Não foi possível carregar o preview
            </span>
          </div>
        )}
      </Modal>

      <Card className="w-full relative">
        <CardHeader className="space-y-5">
          <CardTitle className="text-xl">Nova marca</CardTitle>

          <Separator />
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="w-full space-y-6"
            >
              <FormInputField
                control={form.control}
                name="name"
                label="Nome do cliente"
                required
              />

              <FormInputField
                control={form.control}
                name="headline"
                label="Slogan"
                required
              />

              <FormInputField
                control={form.control}
                name="link"
                label="Link"
                required
              />

              <div className="grid grid-cols-3 gap-4">
                <FormInputField
                  control={form.control}
                  name="pixel"
                  label="Pixel inicial"
                  required
                  type="number"
                />

                <FormInputField
                  control={form.control}
                  name="columns"
                  label="Quantidade de colunas"
                  type="number"
                />

                <FormInputField
                  control={form.control}
                  name="rows"
                  label="Quantidade de linhas"
                  type="number"
                />
              </div>

              <FormSelectField
                control={form.control}
                name="type"
                label="Tipo de cliente"
                required
                options={[
                  { value: "regular", label: "Regular" },
                  { value: "special", label: "Especial" },
                ]}
              />

              <FormInputField
                control={form.control}
                name="template.headerTitle"
                label="Título no template"
                required
              />

              <FormInputField
                control={form.control}
                name="template.headerEmoji"
                label="Emoji no template"
              />

              <FormFileField
                control={form.control}
                label="Logo"
                {...fileRef}
                required
              />

              <div className="flex gap-2 w-64">
                <Button
                  type="submit"
                  disabled={createBrandMutation.isPending}
                  onClick={() => setSubmitType("create")}
                  className="flex-1"
                >
                  {submitType === "create" && createBrandMutation.isPending ? (
                    <>
                      <Spinner className="text-white" /> Salvando...
                    </>
                  ) : (
                    "Salvar"
                  )}
                </Button>

                <Button
                  type="submit"
                  disabled={createBrandMutation.isPending}
                  variant={"secondary"}
                  onClick={() => setSubmitType("preview")}
                  className="flex-1"
                >
                  Preview
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
