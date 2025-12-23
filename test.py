def test(callback, cases):
    for case in cases:
        input_value = case["input"]
        expected_value = case["expected"]

        result = callback(*input_value)

        print("input", input_value)
        print("result", result)
        print("expected", expected_value)

        print(
            "\x1b[32mPassed\x1b[0m"
            if expected_value == result
            else "\x1b[31mFailed\x1b[0m"
        )

        print("-----------------------------------")
