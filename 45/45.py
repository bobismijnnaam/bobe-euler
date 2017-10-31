#!/usr/bin/env python3

def triangle(n):
    return n * (n+1) / 2

def pentagonal(n):
    return n * (3 * n - 1) / 2

def hexagonal(n):
    return n * (2 * n - 1)

if __name__ == "__main__":
    # triangleIndex = 2
    # pentaIndex = 2
    # hexaIndex = 2

    triangleIndex = 285 + 1
    pentaIndex = 165 + 1
    hexaIndex = 143 + 1

    i = 0
    while not (triangle(triangleIndex) == pentagonal(pentaIndex) and pentagonal(pentaIndex) == hexagonal(hexaIndex)):
        # print(triangleIndex, pentaIndex, hexaIndex)

        T = triangle(triangleIndex)
        P = pentagonal(pentaIndex)
        H = hexagonal(hexaIndex)

        # print("\t", T, P, H)

        if T < P:
            if T < H:
                triangleIndex = triangleIndex + 1
            else:
                hexaIndex = hexaIndex + 1
        elif P < H:
            pentaIndex = pentaIndex + 1
        else:
            hexaIndex = hexaIndex + 1

        if (i % 100 == 0) and not i == 0:
            print("Iter:", i)

    print("triangleIndex =", triangleIndex)
    print("pentaIndex =", pentaIndex)
    print("hexaIndex =", hexaIndex)
    print("Tn = Pn = Hn =", triangle(triangleIndex))
    
