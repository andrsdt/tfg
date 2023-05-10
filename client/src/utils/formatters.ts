export const formatMoney = (amount: number) => {
  return amount.toLocaleString('es-ES', {
    style: 'currency',
    currency: 'EUR',
  });
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
