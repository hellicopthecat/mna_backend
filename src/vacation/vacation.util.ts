export const annualCalculator = (joinDate: string) => {
  const d_vacation = 15;
  const max_vacation = 25;

  const joinCompanyMonthly =
    ((Number(joinDate) - Date.now()) / 1000) * 60 * 60 * 24 * 30;
  const joinCompanyAnnual =
    ((Number(joinDate) - Date.now()) / 1000) * 60 * 60 * 24 * 365;

  if (joinCompanyAnnual < 0) {
    for (let month = 0; month <= joinCompanyMonthly; month++) {
      if (month === 0) {
        return 0;
      } else {
        return month;
      }
    }
  }

  if (joinCompanyAnnual >= 2 && joinCompanyAnnual / 2 === 0) {
    for (let year = 2; year <= joinCompanyAnnual; year++) {
      if (d_vacation + year / 2 === max_vacation) {
        return max_vacation;
      } else {
        d_vacation + year / 2;
      }
    }
  }
};
