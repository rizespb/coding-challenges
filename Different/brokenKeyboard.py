# У Пети сломалась клавиатура. Когда он вводит b, то вместо этого стирается последняя введенная строчная буква. Когда вводит B (большая английская бэ), то стирается последняя введенная заглавная буква. Остальные работают нормально. Дана строка из больших и маленьких английских букв, показывающая последовательность нажатия клавиш. Нужно вывести, что будет введено по факту.


def broken_keyboard(string):
    prev_upper = None
    prev_lower = None

    result = []

    if prev_lower is not None:
        print(result[prev_lower])

    for index, char in enumerate((string)):
        if char == "B":
            if prev_upper is not None:
                new_prev_upper = result[prev_upper]["prev"]
                result[prev_upper] = None
                prev_upper = new_prev_upper

        if char == "b":
            if prev_lower is not None:
                new_prev_lower = result[prev_lower]["prev"]
                result[prev_lower] = None
                prev_lower = new_prev_lower

        if char == "b" or char == "B":
            result.append(None)
            continue

        result.append(
            {"char": char, "prev": prev_upper if char.isupper() else prev_lower}
        )

        if char.isupper():
            prev_upper = index
        else:
            prev_lower = index

    return "".join(map(lambda char_dict: char_dict["char"], filter(None, result)))


def test(cases):
    for [input_value, expected] in cases:
        result = broken_keyboard(input_value)
        print("input", input_value)
        print("result", result)
        print("expected", expected)

        is_correct = result == expected

        print("\x1b[32mTrue\x1b[0m" if is_correct else "\x1b[31mFalse\x1b[0m")


test(
    [
        ["abcdeffgbbFEDbb", "cdFED"],
        ["iPpBBb", "i"],
        ["PbBBA", "A"],
        ["abcd", "cd"],
        ["ABCD", "CD"],
        ["abba", "a"],
        ["ABBA", "A"],
        ["aAbB", ""],
        ["xXyYzZbB", "xXyY"],
        ["xXyYBbzZ", "xXzZ"],
        ["abcdefgijklmnopqrstuvwxyz", "cdefgijklmnopqrstuvwxyz"],
        ["ABCDEFGIJKLMNOPQRSTUVWXYZ", "CDEFGIJKLMNOPQRSTUVWXYZ"],
    ]
)
