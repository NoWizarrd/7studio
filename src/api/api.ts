import { useQuery, useMutation, QueryClient } from '@tanstack/react-query';
import { OutlayRowRequest, RowResponse } from '../types/types';

const API_BASE = 'http://185.244.172.108:8081/v1/outlay-rows/entity/148548/row';

const queryClient = new QueryClient()

export const useFetchRows = () =>
  useQuery<RowResponse[]>({
    queryKey: ['outlayRows'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/list`);
      if (!res.ok) throw new Error('Ошибка загрузки данных');
      return res.json();
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

export const useCreateRow = () => {
  return useMutation({
    mutationFn: async (row: OutlayRowRequest) => {
      const res = await fetch(`${API_BASE}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(row),
      });
      if (!res.ok) throw new Error('Ошибка создания строки');
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries(),
  });
};

export const useUpdateRow = () => {
  return useMutation({
    mutationFn: async ({ id, ...updateData }: OutlayRowRequest & { id: number }) => {
      const res = await fetch(`${API_BASE}/${id}/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });
      if (!res.ok) throw new Error('Ошибка обновления строки');
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries(),
  });
};

export const useDeleteRow = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`${API_BASE}/${id}/delete`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Ошибка удаления строки');
    },
    onSuccess: () => queryClient.invalidateQueries(),
  });
};
