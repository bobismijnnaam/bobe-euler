#!/usr/bin/env python3

from Utils import *

basis = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
# basis = ["1", "2", "8", "9"]

total = 0

rules = [ 2
        , 3
        , 5
        , 7
        , 11
        , 13
        , 17
        ]

def get3CompositeNum(num, i):
    numStr = num[i] + num[i + 1] + num[i + 2]
    return int(numStr)

def digitStrToNum(nums):
    number = ""

    for num in nums:
        number = number + num

    return int(number)

if __name__ == "__main__":
    print("Generating permutations...", end="")
    allNums = generatePermutations(basis)
    print(" Done.")
    print("Permutations:", len(allNums))

    print("Starting to look!")
    numsTested = 0
    for num in allNums:
        # print("Considering", num)
        okay = True
        for (i, rule) in enumerate(rules):
            subject = get3CompositeNum(num, i + 1)

            # print("\tSubject:", subject)

            okay = okay and ((subject % rule) == 0)

            # print("\t", subject, " % ", rule, "==", subject % rule)
            # print("\tOkay:", okay)

            if not okay:
                break

        if okay:
            total = total + digitStrToNum(num)

        numsTested = numsTested + 1
        if ((numsTested % 1000) == 0) and (not (numsTested == 0)):
            print("Iters:", numsTested, "Total:", total)

    print(total)
