daysPerMonth = {
	False: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
	True: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
}

day = 0
spotOnSundays = 0

for y in range(1900, 2001):
	leap = y % 4 == 0 and (y % 100 != 0 or y % 400 == 0)

	for m in daysPerMonth[leap]:
		for d in range (0, m):
			day = (day + 1) % 7
			
			if y > 1900 and d == 0 and day == 6:
				spotOnSundays += 1

print(spotOnSundays)
