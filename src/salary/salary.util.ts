//근로소득공제금액
export const earnIncomeDedution = (totalIncome: number) => {
  let dedution: number;
  if (totalIncome <= 5_000_000) {
    dedution = totalIncome * 0.7;
  } else if (totalIncome <= 15_000_000) {
    dedution = 3_500_000 + (totalIncome - 5_000_000) * 0.4;
  } else if (totalIncome <= 45_000_000) {
    dedution = 7_500_000 + (totalIncome - 15_000_000) * 0.15;
  } else if (totalIncome <= 100_000_000) {
    dedution = 12_000_000 + (totalIncome - 45_000_000) * 0.05;
  } else if (totalIncome > 100_000_000) {
    dedution = 14_750_000 + (totalIncome - 100_000_000) * 0.02;
  }
  return totalIncome - dedution;
};
//인적공제 (가족)
export const familyDedution = (headCount: number) => {
  return headCount === 0 ? 1_500_000 : headCount * 1_500_000;
};
//연금보험료공제
export const pensionInsuranceDedution = (monthIncome: number) => {
  if (monthIncome <= 290_000) {
    return Math.floor((290_000 * 0.045) / 10) * 10 * 12;
  } else if (monthIncome >= 4_490_000) {
    return Math.floor((4_490_000 * 0.045) / 10) * 10 * 12;
  } else {
    return Math.floor((monthIncome * 0.045) / 10) * 10 * 12;
  }
};
//특별소득공제
export const specialIncomeDedution = (
  totalIncome: number,
  familiCount: number
) => {
  if (totalIncome <= 30_000_000) {
    if (familiCount === 1) {
      return 3_100_000 + totalIncome * 0.004;
    } else if (familiCount === 2) {
      return 3_600_000 + totalIncome * 0.004;
    } else if (familiCount >= 3) {
      return (
        5_000_000 + totalIncome * 0.007 + (totalIncome - 40_000_000) * 0.004
      );
    }
  } else if (totalIncome > 30_000_000 && totalIncome <= 45_000_000) {
    if (familiCount === 1) {
      return (
        3_100_000 + totalIncome * 0.004 - (totalIncome - 30_000_000) * 0.005
      );
    } else if (familiCount === 2) {
      return (
        3_600_000 + totalIncome * 0.004 - (totalIncome - 30_000_000) * 0.005
      );
    } else if (familiCount >= 3) {
      return (
        3_600_000 +
        totalIncome * 0.004 -
        (totalIncome - 30_000_000) * 0.005 +
        (totalIncome - 40_000_000) * 0.004
      );
    }
  } else if (totalIncome > 45_000_000 && totalIncome <= 70_000_000) {
    if (familiCount === 1) {
      return 3_100_000 + totalIncome * 0.015;
    } else if (familiCount === 2) {
      return 3_600_000 + totalIncome * 0.002;
    } else if (familiCount >= 3) {
      return (
        5_000_000 + totalIncome * 0.005 + (totalIncome - 40_000_000) * 0.004
      );
    }
  } else if (totalIncome > 70_000_000 && totalIncome <= 120_000_000) {
    if (familiCount === 1) {
      return 3_100_000 + totalIncome * 0.005;
    } else if (familiCount === 2) {
      return 3_600_000 + totalIncome * 0.001;
    } else if (familiCount >= 3) {
      5_000_000 + totalIncome * 0.003 + (totalIncome - 40_000_000) * 0.004;
    }
  }
};
//과세표준
export const taxBase = (
  earnIncome: number,
  f_dedution: number,
  pi_dedution: number,
  s_edution: number
) => earnIncome - f_dedution - pi_dedution - s_edution;
//산출세액
export const taxCalculate = (taxBase: number) => {
  if (taxBase <= 12_000_000) {
    return taxBase * 0.6;
  } else if (taxBase > 12_000_000 && taxBase <= 46_000_000) {
    return 720_000 + (taxBase - 12_000_000) * 0.15;
  } else if (taxBase > 46_000_000 && taxBase <= 88_000_000) {
    return 5_820_000 + (taxBase - 46_000_000) * 0.24;
  } else if (taxBase > 88_000_000 && taxBase <= 150_000_000) {
    return 15_900_000 + (taxBase - 88_000_000) * 0.35;
  } else if (taxBase > 150_000_000 && taxBase <= 300_000_000) {
    return 37_600_000 + (taxBase - 150_000_000) * 0.38;
  } else if (taxBase > 300_000_000 && taxBase <= 500_000_000) {
    return 94_600_000 + (taxBase - 300_000_000) * 0.4;
  } else if (taxBase > 500_000_000) {
    return 174_600_000 + (taxBase - 500_000_000) * 0.42;
  }
};
//근소소득세액공제
export const earnIncomeTaxCredit = (
  totalSalary: number,
  taxCalculate: number
) => {
  if (totalSalary <= 55_000_000) {
    if (taxCalculate <= 500_000) {
      return taxCalculate * 0.55 > 660_000 ? 660_000 : taxCalculate * 0.55;
    } else if (taxCalculate > 500_000) {
      return 275_000 + (taxCalculate - 500_000) * 0.3 > 660_000
        ? 660_000
        : 275_000 + (taxCalculate - 500_000) * 0.3;
    }
  } else if (totalSalary > 55_000_000 && totalSalary <= 70_000_000) {
    if (taxCalculate <= 500_000) {
      return taxCalculate * 0.55 > 630_000 ? 630_000 : taxCalculate * 0.55;
    } else if (taxCalculate > 500_000) {
      return 275_000 + (taxCalculate - 500_000) * 0.3 > 630_000
        ? 630_000
        : 275_000 + (taxCalculate - 500_000) * 0.3;
    }
  } else if (totalSalary > 70_000_000) {
    if (taxCalculate <= 500_000) {
      return taxCalculate * 0.55 > 500_000 ? 500_000 : taxCalculate * 0.55;
    } else if (taxCalculate > 500_000) {
      return 275_000 + (taxCalculate - 500_000) * 0.3 > 500_000
        ? 500_000
        : 275_000 + (taxCalculate - 500_000) * 0.3;
    }
  }
};

//간이세액
export const simplifiedTax = (taxDetermined: number) =>
  Math.floor(taxDetermined / 12 / 10) * 10;

export const childTax = (childCount: number) => {
  if (childCount === 0) {
    return 0;
  } else if (childCount === 1) {
    return 12500;
  } else if (childCount === 2) {
    return 29160;
  } else {
    return 29160 + (childCount - 2) * 25000;
  }
};
