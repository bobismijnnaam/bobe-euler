triangle = []
with open("trianglebig.txt") as f:
	content = f.readlines()

	for line in content:
		nums = line.split(" ");
		numsInt = []
		for num in nums:
			numsInt.append(int(num))
		triangle.append(numsInt)

triangle = triangle[::-1]

for row in range(1, len(triangle)):
	for index in range(0, len(triangle[row])):
		triangle[row][index] += max(triangle[row - 1][index], triangle[row - 1][index + 1])

triangle = triangle[::-1]

print(triangle[0][0])
