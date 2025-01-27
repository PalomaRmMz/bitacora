export const generateID = (prefijo) => {
  const numAleatorio = Math.floor(Math.random() * 100000);
  return `${prefijo}${numAleatorio.toString().padStart(5, "0")}`;
};
