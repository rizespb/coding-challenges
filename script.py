from test import test


# Жадный алгоритм: стараемся избавиться в первую очередь от наиболее крупных купюр
# Покупатели расплачиваются только 5, 10 и 20
# 20 никогда не будет участвовать в сдаче, поэтому не храним
class Solution:

    def lemonadeChange(self, bills: list[int]) -> bool:
        bank: dict[int, int] = {10: 0, 5: 0}

        price = 5

        for banknote in bills:
            if banknote != 20:
                bank[banknote] += 1

            if banknote == price:
                continue

            rest = banknote - price

            for key, value in bank.items():

                target_number_of_banknotes = min(rest // key, value)

                if target_number_of_banknotes == 0:
                    continue

                rest -= key * target_number_of_banknotes

                bank[key] -= target_number_of_banknotes

                if rest == 0:
                    break

            if rest != 0:
                return False

        return True


solution = Solution()


test(
    solution.lemonadeChange,
    [
        {
            "input": [[5, 5, 5, 10, 20]],
            "expected": True,
        },
        {
            "input": [[5, 5, 10, 10, 20]],
            "expected": False,
        },
    ],
)
