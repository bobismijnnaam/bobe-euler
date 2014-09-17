single = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
tens = ["", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"]
multiTens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"]
hundred = "hundred"

total = "";

for i in range(1, 10):
	w = single[i]
	print(w)
	total += w

for i in range(1, 11):
	w = tens[i]
	print(w)
	total += w

for i in range(2, 10):
	w = multiTens[i]
	print(w)
	total += w
	for j in range(1, 10):
		w = multiTens[i] + single[j]
		print(w)
		total += w 

for i in range(1, 10):
	prefix = single[i] + hundred
	print(prefix)
	total += prefix

	prefix += "and"

	for j in range(1, 10):
		w = prefix + single[j]
		print(w)
		total += w 

	for j in range(1, 11):
		w = prefix + tens[j]
		print(w)
		total += w 

	for j in range(2, 10):
		w = prefix + multiTens[j]
		print(w)
		total += w

		for k in range(1, 10):
			w = prefix + multiTens[j] + single[k]
			print(w)
			total += w 

total += "onethousand"

print(len(total))
