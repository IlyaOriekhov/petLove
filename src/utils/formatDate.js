export function formatDate(dateString) {
  const date = new Date(dateString);

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
}

export function formatBirthday(dateStr) {
  if (!dateStr) {
    return null;
  }

  const [year, month, day] = dateStr.split("-");
  return `${day}.${month}.${year}`;
}

export const handleDatePicker = (date, setBirthDate, setValue) => {
  if (!date) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  setBirthDate(formattedDate);
  setValue("birthday", formattedDate);

  return formattedDate;
};
