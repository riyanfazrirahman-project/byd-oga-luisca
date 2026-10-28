import { useMemo } from "react";
import { useParams } from "react-router";
import { getModel } from "@/lib/data";

export function useModel() {
  const { slug } = useParams();
  return useMemo(() => getModel(slug), [slug]);
}
