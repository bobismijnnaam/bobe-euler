import os
clear = lambda: os.system('cls')

s = 20

cache = [[0] * (s + 1)] * (s + 1)

def getRoutes(x, y):
	n = 0
	
	#if cache[x][y] != 0:
	#	return cache[x][y]

	if y == s or x == s:
		n = 1
	else:
		n = getRoutes(x + 1, y) + getRoutes(x, y + 1)
	
	# cache[x][y] = n

	return n

print(getRoutes(0, 0))
