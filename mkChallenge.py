#!/usr/bin/env python3

from shutil import copyfile
import os

challengeNum = int(input("Challenge #:"))

print("Creating challenge #", challengeNum)

challengeDir = os.path.join(".", str(challengeNum))

templateFile = os.path.join(".", "utils", "template.py")
utilsFile = os.path.join(".", "utils", "Utils.py")

targetCodeFile = os.path.join(challengeDir, str(challengeNum) + ".py")
targetUtilsFile = os.path.join(challengeDir, "Utils.py")

if os.path.isdir(challengeDir):
    print("Aborted because", challengeNum, "already exists")
    exit()

print("Creating challenge directory", challengeDir)
os.mkdir(challengeDir)

print("Copying", templateFile, "to", targetCodeFile)
copyfile(templateFile, targetCodeFile)
print("Copying", utilsFile, "to", targetUtilsFile)
copyfile(utilsFile, targetUtilsFile)

print("Done!")
