export const getPassedYears = (dateISO: string) => {
  const [year, month, day] = dateISO.split('-').map(Number);
  const today = new Date();

  let age = today.getFullYear() - year;
  const notHadBirthdayThisYear =
    (today.getMonth() + 1) < month ||
    ((today.getMonth() + 1) === month && today.getDate() < day);

  if (notHadBirthdayThisYear) age--;

  return age;
};
