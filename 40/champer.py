concat = "S"
ctr = 1
while len(concat) < 1000010:
    # if ctr % 1000 == 0: print(str(ctr) + "[" + str(len(concat)) + "]")
    concat += str(ctr)
    ctr += 1

print(str(ctr) + "[" + str(len(concat)) + "]")

result = int(concat[1]) * int(concat[10]) * int(concat[100]) * int(concat[1000]) * int(concat[10000]) * int(concat[100000]) * int(concat[1000000])

print(result)
