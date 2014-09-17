import Utils

def rotateNumber(num):
	numnum = list(str(num))
	if len(numnum) == 1: return num
	
	carrier = numnum[0]
	numnum = numnum[1:]
	numnum.append(carrier)

	return(int(''.join(numnum)))

nj = Utils.NumberJuggler(1000000)

circulars = [2]
for prime in nj.primeList:
	strPrime = str(prime)	
	if "0" in strPrime or "2" in strPrime or "4" in strPrime or "6" in strPrime or "8" in strPrime:
		pass
	else:
		dyn = rotateNumber(prime)
		isCircular = True
		while dyn != prime:
			if not nj.primeTable[dyn]:
				isCircular = False
				break
			dyn = rotateNumber(dyn)
		if isCircular:
			circulars.append(prime)

print(len(circulars))
