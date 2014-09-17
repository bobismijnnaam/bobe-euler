import Utils
from fractions import Fraction

def simplifyFraction(nj, numerator, denominator):
	if denominator == 0:
		return (0, 0)
	if numerator == 0:
		return (0, 0)

	numFactors = nj.getFactors(numerator)
	denFactors = nj.getFactors(denominator)

	i = 0
	while i < len(denFactors):
		currFactor = denFactors[i]
		if currFactor in denFactors and currFactor in numFactors:
			denFactors.remove(currFactor)
			numFactors.remove(currFactor)
		else:
			i += 1
	
	newNumerator = 1
	for f in numFactors:
		newNumerator *= f
	
	newDenominator = 1
	for f in denFactors:
		newDenominator *= f

	return (newNumerator, newDenominator)

nj = Utils.NumberJuggler(2000000)
specialFracs = []

for numer in range(10, 100):
	for denom in range(numer + 1, 100):
		# print(str(numer) + "/" + str(denom))

		sNumer = list(str(numer))
		sDenom = list(str(denom))

		i = 0
		while i < len(sDenom):
			digit = sDenom[i]
			if digit in sNumer and digit in sDenom:
				sNumer.remove(digit)
				sDenom.remove(digit)
			else:
				i += 1
		
		if len(sNumer) > 0 and len(sDenom) > 0:
			newNumer = int(''.join(sNumer))
			newDenom = int(''.join(sDenom))

			if simplifyFraction(nj, numer, denom) == simplifyFraction(nj, newNumer, newDenom) and (newNumer != numer or newDenom != denom) and numer % 10 != 0:
				# print(str(numer) + "/" + str(denom) + " == " + str(newNumer) + "/" + str(newDenom))
				specialFracs.append((newNumer, newDenom))

print(specialFracs)
result = [1, 1]
for frac in specialFracs:
	result[0] *= frac[0]
	result[1] *= frac[1]

print(simplifyFraction(nj, result[0], result[1]))
