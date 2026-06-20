"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { ProductDetail } from "../../../types";
import {
  productFormSchema,
  toFormValues,
  type ProductFormValues,
} from "../../../types/validation";

export type { ProductFormValues };

export function useProductDetailForm(detail: ProductDetail) {
  return useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: toFormValues(detail),
    mode: "onBlur",
  });
}

export function useNewProductForm() {
  return useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      description: "",
      isFree: false,
      price: 0,
      published: false,
      coverImage: null,
      contentFile: null,
    },
    mode: "onChange",
  });
}
