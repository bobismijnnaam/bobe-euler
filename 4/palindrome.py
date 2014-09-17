def isPalindrome(num):
	numStr = str(num)
	reversed = ""

	for c in numStr:
		reversed = c + reversed

	return numStr == reversed

foundPalindrome = 1;

for left in range(1, 999 + 1):
	for right in range(1, 999+1):
		product = left * right;
		if isPalindrome(product):
			if product > foundPalindrome:
				foundPalindrome = product;

print(str(foundPalindrome))
