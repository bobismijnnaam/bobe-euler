def makeConProd(num, tup):
    total = "";
    for e in tup:
        total += str(num * e)
    return total

def isPandigital(numStr):
    seen = [False] * 9
    total = 0
    for c in numStr:
        cInt = int(c)
        if not seen[cInt - 1]:
            total += 1
            seen[cInt - 1] = True
        else:
            total = 10
            break

    return total == 9

most = 0;

if isPandigital("789345612"):
    print("ok")

for i in range(1, 10001):
    if i % 100 == 0: print(most)
    for j in range(1, 10):
        pand = makeConProd(i, range(1, j + 1))
        if len(pand) < 9:
            continue
        elif len(pand) > 9:
            break;
        else:
            if isPandigital(pand):
                if int(pand) > most:
                    most = int(pand)

print("\n" + str(most))
