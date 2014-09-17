import Utils

lines = ""

with open("names.txt", 'r') as f:
	lines = f.readline()

namesQuoted = lines.split(",");
names = []

for name in namesQuoted:
	names.append(name.strip("\""))

names = Utils.mergeSort(names)

total = 0

for i in range(0, len(names)):
	nameTotal = 0
	for letter in names[i]:
		nameTotal += ord(letter.upper()) - 64 
	
	total += (i + 1) * nameTotal

print("Total = " + str(total))
