# 1
# 2
# 3
# 2 2
# 5
# 2 3
# 7
# 2 2 2
# 3 3
# 2 5
# 11
# 2 2 3
# 13
# 2 7
# 3 5
# 2 2 2 2
# 17
# 2 3 3
# 19
# 2 2 5
# 
# 2: 4
# 3: 2
# 5: 1
# 7: 1
# 11: 1
# 13: 1
# 17: 1
# 19: 1
#   
# => 2 * 2 * 2 * 2 * 3 * 3 * 5 * 7 * 11 * 13 * 17 * 19 = 232792560

import math

num = 232792560

while True:
	found = True

	for x in range(1, 20 + 1):
		if not (num % x == 0):
			found = False
			break
	
	if found:
		break

	num += 1

print(str(num))
