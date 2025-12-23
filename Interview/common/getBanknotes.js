// Дан массив номиналов купюр и сумма, которую нужно выдать этими купюрами

// Рассчитать оптимальный вариант выдачи (то есть тот, который будет содержать минимальное количество купюр)

let banknotes = [10, 100, 500, 1000, 5000];
let sum = 7400;

const getBanknotes = (sum) => {
  let rest = sum;

  const map = new Map();

  let index = banknotes.length - 1;

  while (rest) {
    if (rest < banknotes[index]) {
      index--;
      continue;
    }

    const banknote = Math.trunc(rest / banknotes[index]);
    map.set(banknotes[index], banknote);

    rest = rest % banknotes[index];
  }

  console.log(map);

  return map;
};

getBanknotes(7400);
