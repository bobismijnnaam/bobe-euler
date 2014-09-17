def findRepetitionLength(seq):
	longestRepetition = 0
	maxWidth = len(seq) // 2 + 1
	# print("Maxwidth: " + str(maxWidth))

	for width in range(1, maxWidth):
		inSeq = seq[len(seq) - width:]
		last = len(seq) % width
		curr = len(seq) - 2 * width
		repetition = True
		
		# print("Looking for substring: " + inSeq)

		while curr >= last:
			currSeq = seq[curr:curr+width]
			if currSeq != inSeq:
				repetition = False
				break
			# else:
				# print(str(currSeq) + " == " + str(inSeq))
			curr -= width

		if repetition and width > longestRepetition:
			# print(str(currSeq) + " is new longest substring" )
			longestRepetition = width
	
	return longestRepetition

# testString = "xyzabababab"
# print("Test: " + testString)
# print("Test length: " + str(len(testString)))
# print("Max repeat in " + testString + ": " + str(findRepetitionLength("xyzabababab")))

maxLen = 0
maxD = 0

for d in range(2, 1001):
	# d = 7
	head = 1
	headHis = [head]

	repeatLen = -1
	while len(headHis) < 1000 and head != 0:
		head *= 10
		if head >= d:
			head %= d

		for i in range(len(headHis) - 1, -1, -1):
			if head == headHis[i]:
				repeatLen = len(headHis) - i
				break

		headHis.append(head)	

		if repeatLen != -1:
			break

	if repeatLen > maxLen:
		maxLen = repeatLen
		maxD = d
	

print("Denom: " + str(maxD))
print("Len: " + str(maxLen))

"""for d in range(2, 1001):
	head = 1
	result = ""
	maxSeq = 0
	maxRepeatLen = 0

	if d % 10 == 0:
		print(d)

	while head != 0 and len(result) < 500:
		head *= 10
		if head < d:
			result += "0"
		else:
			result += str(head // d)
			head %= d

		possibleRepeatLen = findRepetitionLength(result)
		if possibleRepeatLen > maxRepeatLen:
			maxRepeatLen = possibleRepeatLen
	
	# print("1/" + str(d) + ": 0." + result + " | Repeat: " + str(maxRepeatLen) + "\n")

	if maxRepeatLen > maxMaxRepeat:
		maxMaxRepeat = maxRepeatLen
		maxResult = result
		maxNum = d"""

