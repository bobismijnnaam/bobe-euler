import Utils

def isPandigital(numStr):
	if len(numStr) != 9:
		return False

	checklist = [0] * 10

	for digitStr in numStr:
		digit = int(digitStr)
		checklist[digit] = 1

	return sum(checklist) == 9 and checklist[0] == 0

print("Looking for pandigital products...")

allProducts = []
for a in range(0, 2000):
	for b in range(a, 2000):
		mmp = str(a) + str(b) + str(a * b)
		if isPandigital(mmp):
			allProducts.append(a * b)
			print(str(a) + " x " + str(b) + " = " + str(a * b) + " (" + str(sum(Utils.removeDupsOrdered(Utils.mergeSort(allProducts)))) + ")")

print("Sorting & filtering the list")

allProducts = Utils.removeDupsOrdered(Utils.mergeSort(allProducts))
print("Sum of pandigital products: " + str(sum(allProducts)))
