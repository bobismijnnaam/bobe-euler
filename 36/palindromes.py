def isPalindrome(p):
    edge = len(p) // 2;
    for i in range(0, edge):
        if p[i] != p[len(p) - i - 1]:
            return False

    return True

if isPalindrome("1001"):
    print("ok")

if not isPalindrome("10100"):
    print("ok")

total = 0

for i in range(1, 1000001):
    binary = bin(i)[2:]
    decimal = str(i)
    if isPalindrome(binary) and isPalindrome(decimal):
        total += i

print("total: " + str(total))
