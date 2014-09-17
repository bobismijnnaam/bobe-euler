import Utils

pows = []

for a in range(2, 100 + 1):
	for b in range(2, 100 + 1):
		pows.append(a**b)

pows = Utils.mergeSort(pows)
pows = Utils.removeDupsOrdered(pows)

print(Utils.removeDupsOrdered(Utils.mergeSort([2, 5, 4, 3, 6, 7, 2, 6, 7, 7, 3, 4, 5])))

print(len(pows))
