s = 20
field = [[0] * (s + 1)] * (s + 1)

field[0][0] = 1

for p in range(0, s + 1):
	field[0][p] = 1
	field[p][0] = 1

for x in range(1, s + 1):
	for y in range(1, s + 1):
		field[x][y] = field[x - 1][y] + field[x][y - 1]

print(field[s][s])
		
