
export const formatPower = (watts?: number) => {
  if (!watts) return '-';
  return `${(watts / 1000).toFixed(0)} kW`;
};

export const formatEnergy = (wattHours?: number) => {
  if (!wattHours) return '-';
  return `${(wattHours / 1000).toFixed(0)} kWh`;
};

export const formatCapacity = (va?: number) => {
  if (!va) return '-';
  return `${(va / 1000).toFixed(1)} kVA`;
};

export const formatRunHours = (hours?: number) => {
  if (!hours) return '-';
  return `${hours.toFixed(1)}h`;
};

export const formatApparentPower = (va?: number) => {
  if (!va) return '-';
  return `${(va / 1000).toFixed(1)} kVA`; 
};