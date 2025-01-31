export const formatCurrency = (currency)=>{
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
  }).format(currency)
}

export const generateHours = (start ,end) => {
  const hours = [];
  for(let i = start; i <= end; i++){
    hours.push(`${i}:00`)
  }
  return hours

}