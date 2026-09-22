import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";
import type { Car, CarStatus, OrderRow } from "@/lib/rental";

export const carsQueryKey = ["cars"] as const;

export function useCars() {
  return useQuery({
    queryKey: carsQueryKey,
    queryFn: async (): Promise<Car[]> => {
      const { data, error } = await supabase
        .from("cars")
        .select("id,name,image_url,seats,transmission,fuel_type,price_per_24h,service_type,status")
        .order("price_per_24h", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Car[];
    },
    staleTime: 30_000,
  });
}

export function useCar(id: string | undefined) {
  const { data, ...rest } = useCars();
  return { car: data?.find((c) => c.id === id), cars: data, ...rest };
}

export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async (): Promise<OrderRow[]> => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as OrderRow[];
    },
  });
}

export function useUpdateCarStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: CarStatus }) => {
      const { error } = await supabase.from("cars").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: carsQueryKey });
      const previous = queryClient.getQueryData<Car[]>(carsQueryKey);
      queryClient.setQueryData<Car[]>(carsQueryKey, (old) =>
        (old ?? []).map((c) => (c.id === id ? { ...c, status } : c)),
      );
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) queryClient.setQueryData(carsQueryKey, ctx.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: carsQueryKey });
    },
  });
}
