# n ? n/2 (n is even)
# n ? 3n + 1 (n is odd)
# longest chain for n < 1 000 000

print("Allocating")
cache = [0] * 1000000
print("Starting search")

for startN in range(1, 1000000):
    if startN % 1000 == 0:
        print(str(startN))
   
    if startN % 2 == 0 and cache[startN / 2] != 0:
        cache[startN] = cache[startN / 2] + 1
    elif (startN - 1) % 3 == 0 and cache[(startN - 1) / 3] != 0:
        cache[startN] = cache[(startN - 1) / 3] + 1
    else:
        seq = 1
        n = startN
        
        while n != 1:
            if n % 2 == 0:
                n = n / 2
            else:
                n = 3 * n + 1
            seq += 1
        
        cache[startN] = seq

longestN = 1
longestSeq = 1

for i in range(1, 1000000):
    if cache[i] > longestSeq:
        longestN = i
        longestSeq = cache[i]

print(str(longestN) + ": " + str(longestSeq))
    
    
