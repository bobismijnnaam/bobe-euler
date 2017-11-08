#!/usr/bin/env python3

from Utils import *

def isNormalCharacter(c):
    if c == ' ':
        return True
    if ord(c) >= ord('a') and ord(c) <= ord('z'):
        return True
    if ord(c) >= ord('A') and ord(c) <= ord('Z'):
        return True
    return False

if __name__ == "__main__":
    with open("./p059_cipher.txt", "r") as f:
        contents = f.read()

    contents = contents[:-1].split(",")
    contents = [int(x) for x in contents]
    print(contents)

    testContents = contents[:120]
    candidates = []

    # Your code here!
    for a in range(ord('a'), ord('z') + 1):
        print("progress", chr(a))
        for b in range(ord('a'), ord('z') + 1):
            for c in range(ord('a'), ord('z') + 1):
                key = [a, b, c]

                # decrypted = []
                # for i, v in enumerate(testContents):
                    # decryptedChar = v ^ key[i % 3]
                    # if not (decryptedChar >= ord('a') and decryptedChar <= ord('z'

                decrypted = "".join([chr(v ^ key[i % 3]) for i, v in enumerate(contents)])
                
                numNormalChars = sum([1 for x in decrypted if isNormalCharacter(x)])
                if numNormalChars / len(decrypted) > 0.95:
                    print(decrypted)
                    print("Solution", sum([ord(x) for x in decrypted]))

                # if decrypted.find("the") != -1 and decrypted.find("and") != -1:
                    # print(decrypted)

                checks = [isNormalCharacter(c) for c in decrypted]
                if not False in checks:
                    print(decrypted)

    print("Candidates:", len(candidates))
