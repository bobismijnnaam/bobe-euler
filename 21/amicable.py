import Utils

pf = Utils.NumberJuggler()
total = []

for i in range(1, 10000):
	iDiv = pf.getDivisors(i);
	j = sum(iDiv);
	jDiv = pf.getDivisors(j);
	k = sum(jDiv);
	
	if i == k and i != j:
		print(str(i) + " <=> " + str(j))
		if i not in total:
			total.append(i)
		if j not in total:
			total.append(j)

print("All amicable numbers < 10000: " + str(total))
print("The sum: " + str(sum(total)))
