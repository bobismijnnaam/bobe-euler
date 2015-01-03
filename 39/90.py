maxCount = 0;
maxP = 0;

print("Generating lookup table")
s = [x ** 2 for x in range(0, 1001)]
print("Generated lookup table")

for p in range(8, 1001):
    if p % 100 == 0: print("|" + str(maxP))
    total = 0
    for a in range(1, p // 2 - 1):
        for b in range(a, p // 2):
            c = p - a - b
            if c < 0: continue
            if s[a] + s[b] == s[c]:
                total += 1
    if total > maxCount:
        maxP = p
        maxCount = total

print("p = " + str(maxP) + " with " + str(maxCount))

