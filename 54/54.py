#!/usr/bin/env python3

from Utils import *
import collections
import random

HIGH_CARD = 0
ONE_PAIR = 1
TWO_PAIR = 2
THREE_OF_A_KIND = 3
STRAIGHT = 4
FLUSH = 5
FULL_HOUSE = 7
FOUR_OF_A_KIND = 7
STRAIGHT_FLUSH = 8
ROYAL_FLUSH = 9

VALUE_ORDER = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"]
ALL_SUITS = ["C", "D", "S", "H"]

## Utility functions

def parseValue(rawCard):
    assert(rawCard[0] in VALUE_ORDER)
    return rawCard[0]

def parseSuit(rawCard):
    assert(rawCard[-1] in ALL_SUITS)
    return rawCard[-1]

def parseCard(rawCard):
    return (parseValue(rawCard), parseSuit(rawCard))

def suit(card):
    return card[1]

def value(card):
    return card[0]

def allElementsEqual(lst):
    return len(set(lst)) <= 1

def allSameSuit(hand):
    return allElementsEqual([suit(x) for x in hand])

def isOrdered(hand, valueOrder=None):
    values = [value(x) for x in hand]

    if valueOrder == None:
        # print("Recursing...")
        res = isOrdered(sorted(hand, key=getNominalCardValue), list(VALUE_ORDER))
        # print("Got", res)
        return res
    elif valueOrder == []:
        # print("No match!")
        return False
    else:
        # print(values, valueOrder[:5])
        if values == valueOrder[:5]:
            # print("Match!")
            return True
        else:
            # print("Deeper...")
            valueOrder = valueOrder[1:]
            return isOrdered(hand, valueOrder)

def getHighCard(hand):
    highCard = None
    highCardValue = -1

    for card in hand:
        val = VALUE_ORDER.index(value(card))
        if val > highCardValue:
            highCard = card
            highCardValue = val

    assert(not highCard == None)

    return highCard

def splitInTwo(lst):
    return (lst[:int(len(lst)/2)], lst[int(len(lst)/2):])

def getNominalCardValue(card):
    return VALUE_ORDER.index(value(card))

def convertToValues(hand):
    return [value(x) for x in hand]

def getNominalValue(val):
    return VALUE_ORDER.index(val)

def sortByNomVal(hand):
    return convertToValues(sorted(hand, key=getNominalCardValue))

## Rank functions

def checkHighestCard(hand):
    return (HIGH_CARD, sortByNomVal(hand))

# => The value of the card
def checkOnePair(hand):
    values = [value(x) for x in hand]
    count = collections.defaultdict(int)
    for cardValue in values:
        count[cardValue] += 1
    
    for k, v in count.items():
        if v == 2: 
            return (ONE_PAIR, [k])

# => The ordered two values of the pairs
def checkTwoPairs(hand):
    values = [value(x) for x in hand]
    count = collections.defaultdict(int)
    for cardValue in values:
        count[cardValue] += 1
    
    pairs = []
    for k, v in count.items():
        if v == 2: pairs += [k]

    if len(pairs) == 2:
        assert(set(count.values()) == set([2, 2, 1]))
        return (TWO_PAIR, sorted(pairs, key=lambda x: VALUE_ORDER.index(x)))
    else:
        return None

# => The value of the three
def checkThreeOfAKind(hand):
    values = [value(x) for x in hand]
    count = collections.defaultdict(int)
    for cardValue in values:
        count[cardValue] += 1
    
    for k, v in count.items():
        if v == 3: 
            return (THREE_OF_A_KIND, [k])

# => All the values ordered
def checkStraight(hand):
    if isOrdered(hand):
        return (STRAIGHT, sortByNomVal(hand))

# => All the values ordered
def checkFlush(hand):
    if allSameSuit(hand):
        return (FLUSH, sortByNomVal(hand))

# => value of the two, value of the three
def checkFullHouse(hand):
    values = [value(x) for x in hand]
    count = collections.defaultdict(list)

    for card in hand:
        count[value(card)] += [card]

    thePair = None
    theThree = None

    for k, v in count.items():
        if len(v) == 2:
            thePair = k

        if len(v) == 3:
            theThree = k

    if thePair == None or theThree == None:
        return None

    return (FULL_HOUSE, [thePair, theThree])

# The value of the four of a kind
def checkFourOfAKind(hand):
    values = [value(x) for x in hand]
    count = collections.defaultdict(int)
    for cardValue in values:
        count[cardValue] += 1

    for k, v in count.items():
        if v == 4:
            return (FOUR_OF_A_KIND, [k])

# All the values, ordered
def checkStraightFlush(hand):
    if allSameSuit(hand) and isOrdered(hand):
        return (STRAIGHT_FLUSH, sortByNomVal(hand))

# None? Since this can't happen according to the question's definition
def checkRoyalFlush(hand):
    values = [value(x) for x in hand]

    if (allSameSuit(hand) and \
        "T" in values and \
        "J" in values and \
        "Q" in values and \
        "K" in values and \
        "A" in values):
        return (ROYAL_FLUSH, None) # sortByNomVal(hand))

def getRank(hand):
    funcs = [ checkHighestCard, checkOnePair, checkTwoPairs, checkThreeOfAKind, checkStraight, checkFlush, checkFullHouse, checkFourOfAKind, checkStraightFlush, checkRoyalFlush ]

    for check in funcs[::-1]:
        result = check(hand)
        if not result == None:
            return result

def isLeftBetterThanRight(left, leftRes, right, rightRes):
    assert(len(left) > 0)
    assert(len(right) > 0)
    assert(len(leftRes) > 0)
    assert(len(rightRes) > 0)

    left = list(left)
    right = list(right)

    while len(rightRes) > 0 and len(leftRes) > 0:
        leftBack = getNominalValue(leftRes[-1])
        rightBack = getNominalValue(rightRes[-1])

        leftRes = leftRes[:-1]
        rightRes = rightRes[:-1]

        if leftBack == rightBack: continue

        if leftBack > rightBack:
            return True
        else:
            return False

    left = sortByNomVal(left)
    right = sortByNomVal(right)

    while len(left) > 0 and len(right) > 0:
        leftBack = getNominalValue(left[-1])
        rightBack = getNominalValue(right[-1])

        left = left[:-1]
        right = right[:-1]

        if leftBack == rightBack: continue

        if leftBack > rightBack:
            return True
        else:
            return False

    assert(False)

def fuzz(checkFunc, hand, intensity=100):
    res = checkFunc(h)
    print("Fuzzing", checkFunc, "\n", hand, "\n", res)
    for i in range(100):
        random.shuffle(h)
        assert(res == checkFunc(h))

if __name__ == "__main__":
    # Your code here!
    with open("p054_poker.txt", "r") as f:
        content = f.readlines()

    # with open("testset.txt", "r") as f:
        # content = f.readlines()

    h = [("5", "H"), ("5", "S"), ("5", "C"), ("3", "H"), ("J", "D")]
    fuzz(checkThreeOfAKind, h)

    h = [("6", "C"), ("7", "C"), ("8", "C"), ("9", "C"), ("T", "C")]
    fuzz(checkStraight, h)
    
    h = [("5", "C"), ("6", "C"), ("2", "C"), ("A", "C"), ("T", "C")]
    fuzz(checkFlush, h)

    h = [("A", "H"), ("A", "S"), ("A", "C"), ("Q", "H"), ("Q", "D")]
    fuzz(checkFullHouse, h)

    h = [("5", "H"), ("5", "S"), ("5", "C"), ("5", "H"), ("A", "D")]
    fuzz(checkFourOfAKind, h)

    h = [("3", "D"), ("4", "D"), ("5", "D"), ("6", "D"), ("7", "D")]
    fuzz(checkStraightFlush, h)

    h = [("T", "D"), ("J", "D"), ("Q", "D"), ("K", "D"), ("A", "D")]
    fuzz(checkRoyalFlush, h)

    print("Royal flush:", checkRoyalFlush(h))
    print("Ordered:", isOrdered(h))
    print("Straight flush:", checkStraightFlush(h))
    print("Flush:", checkFlush(h))

    h = [("2", "D"), ("2", "D"), ("2", "D"), ("3", "D"), ("3", "D")]
    print("Full house:", checkFullHouse(h))

    content = [x[:-1].split(" ") for x in content]
    content = [splitInTwo([parseCard(rawCard) for rawCard in oneLine]) for oneLine in content]

    # print(content)

    battles = content
    wins = 0
    losses = 0
    
    print("#### BATTLE!!! ####")

    for battle in battles:
        assert(len(battle) == 2)
        for x in battle:
            assert(len(x) == 5)

        p1 = battle[0]
        p2 = battle[1]
        
        p1res = getRank(p1)
        p2res = getRank(p2)

        print("-- Battle --")
        print(sorted(p1, key=getNominalCardValue), "vs.", sorted(p2, key=getNominalCardValue))
        print(p1res, p2res)

        p1rank = p1res[0]
        p2rank = p2res[0]

        if p1rank > p2rank:
            wins += 1
            print("p1")
        elif p1rank == p2rank and isLeftBetterThanRight(p1, p1res[1], p2, p2res[1]):
            assert(not p1rank == ROYAL_FLUSH)

            wins += 1
            print("p1")
        else:
            losses += 1
            # print(p1res)
            # print(sorted(p1, key=getNominalCardValue))
            # print(p2res)
            # print(p2)
            # print(p1rank, "<", p2rank)
            print("p2")
            pass
                

    print("Wins", wins)
    print("Losses", losses)
    print(wins+losses)

