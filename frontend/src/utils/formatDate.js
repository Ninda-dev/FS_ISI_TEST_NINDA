export function formatDate(dateString) {
  const bulan = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  const dataDate = new Date(dateString);
  dataDate.setHours(dataDate.getHours() + 7);
  const date = dataDate.getDate();
  const month = bulan[dataDate.getMonth()];
  const year = dataDate.getFullYear();
  const hour = String(dataDate.getHours()).padStart(2, "0");
  const minute = String(dataDate.getMinutes()).padStart(2, "0");
  return `${date} ${month} ${year} ${hour}:${minute}`;
}