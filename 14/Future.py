# n ? n/2 (n is even)
# n ? 3n + 1 (n is odd)
# longest chain for n < 1 000 000

# Faulty assumption, because both the rules can result in an even number, thus it is impossible to know what the previous/next number is

print("Allocating")

cache = [0] * 1000000
cache[1] = 1

print("Finished allocating")

for startN in range(2, 1000000):
    # if startN % 10000 == 0:
    #    print(str(startN))
    
    if cache[startN] != 0:
        # already seen, thus all following numbers are already calculated
        pass
    else:
        # Calculate collatz number

        seq = 1
        n = startN
        
        while n != 1:
            if n % 2 == 0:
                n = n / 2
            else:
                n = 3 * n + 1
            seq += 1
        
        cache[startN] = seq
        
        n = startN
        
        # Forward cache
        while n < 1000000 and n > 1:
			cache[n] = seq
			
			if n % 2 == 0:
				n *= 2
				seq += 1
			else:
				if (n - 1) % 3 == 0:
					n = (n - 1) / 3
					seq += 1

longestN = 1
longestSeq = 1

for i in range(1, 1000000):
    if cache[i] > longestSeq:
        longestN = i
        longestSeq = cache[i]

print(str(longestN) + ": " + str(longestSeq))
    
    
