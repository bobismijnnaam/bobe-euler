class PermCounter:
	def __init__(self):
		self.ctr = 0
		self.perm = []
	
	def inc(self, perm):
		self.ctr += 1
		self.perm = perm[:]
	
	def getCount(self):
		return self.ctr

	def getPerm(self):
		return self.perm

def doPerm(choices, perm, ctr):
	if len(perm) == 9:
		perm.append(choices[0])
		ctr.inc(perm)
		#if ctr.getCount() % 1000 == 0:
		#	print("Permutation #" + str(ctr.getCount()) + ": " + str(ctr.getPerm()))
	else:
		for choice in choices:
			hisChoices = choices[:]
			hisChoices.remove(choice)

			hisPerm = perm[:]
			hisPerm.append(choice)
			
			doPerm(hisChoices, hisPerm, ctr)

			if ctr.getCount() == 1000000:
				return

permutationCounter = PermCounter()
permutation = []
choices = list(range(0, 10))

doPerm(choices, permutation, permutationCounter)

print("1000000th permutation: " + str(permutationCounter.getPerm()))
