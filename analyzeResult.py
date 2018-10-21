import scipy.stats as stats
import numpy as np
import matplotlib.pyplot as plt
import json
import numpy
import pprint
from statsmodels.stats.multicomp import pairwise_tukeyhsd
import matplotlib.pyplot as plt
import statsmodels.formula.api as smf
import statsmodels.stats.multicomp as multi
import pandas as pd
from statsmodels.stats.multicomp import pairwise_tukeyhsd
from statsmodels.stats.multicomp import MultiComparison


array = "[[[2355,2926,2234,2560,2092,2356],[2388,2353,2017,1961,1886,1833],[3317,1809,1859,1738,1802,1759],[1793,1819,1569,1817,1611,1754],[1899,1712,1626,1723,1570,1894],[1834,1781,1589,2897,1819,1846],[1832,1618,1818,1819,1709,1525],[1758,1699,1619,1792,1701,1635],[1823,1692,1805,1695,1718,2027],[1559,2007,2348,1799,1730,1703],[2112,1789,1543,1555,1595,1608],[2104,1743,1588,1892,1802,1784]],[[1887,3332,2008,1970,2378,1975],[2502,2006,2010,1848,2039,1948],[2880,1935,2035,1715,1769,1830],[2132,1761,1532,1629,1932,2181],[1868,1831,1719,1750,2395,1574],[1562,1843,1710,1508,1624,1647],[1559,1695,1579,1518,1804,1754],[1739,1837,1674,1450,1669,1761],[1636,1771,1484,1874,1854,1545],[1700,1500,1860,1802,1903,1706],[1767,4481,1829,1512,1818,1669],[1924,1658,2074,1555,1688,1837]],[[3177,3917,1600,2043,2107,1981],[2112,1713,1628,1577,1542,1540],[1670,2338,1625,1550,1531,1646],[1932,1522,1515,1530,1492,1450],[1672,1424,1413,1452,1434,1578],[1488,1664,1525,1680,1464,1498],[1635,1429,1455,1439,1537,1623],[1514,1497,1462,1483,1727,1935],[1484,1528,1816,1433,1455,1514],[1494,1900,1569,1515,1577,2375],[1828,1530,1524,1713,1911,1592],[1838,1643,1970,1882,1746,1664]],[[1743,1693,1631,1634,1631,1712],[1823,1622,1572,1704,1913,1687],[1608,1508,1718,1489,1533,1458],[1632,1620,1422,1446,1468,1467],[1519,1807,1446,1459,1467,1453],[1526,1499,1429,1578,1439,1492],[1553,1493,1465,1406,1478,1468],[2162,1536,1442,1422,1446,2005],[1714,1493,1545,1425,1467,1467],[1907,1531,1611,1727,1625,2014],[1865,1819,2538,1551,1599,1671],[2816,2007,2300,1739,1840,1810]],[[1803,1690,2378,2114,2187,1616],[2079,2165,1544,1685,2093,1626],[1859,1657,1691,1617,1882,1548],[1622,1519,1522,1461,1499,1571],[1672,1604,1490,1592,1442,1487],[1794,1617,1607,1459,1516,1454],[1554,1479,1443,1779,1440,1580],[1519,1597,1486,2029,1561,5942],[1561,1545,1512,1478,1569,1463],[1766,2285,1691,1603,1455,1559],[8062,2125,1918,1713,1622,2179],[3956,1782,1666,1723,1638,1647]]]"
data  = json.loads(array)

# Normalize vvv-----------
# Find min/max
for testNr in range(0, len(data)):

    maxFound = 0
    minFound = float('inf')

    for col in range(0, len(data[0])):
        for row in range(0, len(data[0][0])):

            if(data[testNr][col][row] > maxFound):
                maxFound = data[testNr][col][row]
            if(data[testNr][col][row] < minFound):
                minFound = data[testNr][col][row]
    
    # Update values to 0-1
    for col in range(0, len(data[0])):
        for row in range(0, len(data[0][0])):
            data[testNr][col][row] = (data[testNr][col][row] - minFound)/(maxFound - minFound)
# Normalize ^^^----------

# Move testNr arr-indexes last
col, row, testNr = len(data[0]), len(data[0][0]), len(data)
averageForButtonArray = [[[0 for k in range(0, testNr)] for j in range(0, row)] for i in range(0, col)]

# for groupnames and turkeytest
namesQueue = []
valuesQueue = []

for col in range(0,len(data[0])):
    for row in range(0,len(data[0][0])):
        for testNr in range(0,len(data)):
            namesQueue.append("Button: (" + str(col) + ";" + str(row) + ")") # Group names for turkey test
            averageForButtonArray[col][row][testNr] = data[testNr][col][row]
            valuesQueue.append(averageForButtonArray[col][row][testNr]) # flat array for turkey test
            

print("Test subjects #: ", len(averageForButtonArray[0][0]))
print(stats.f_oneway(averageForButtonArray[0][0], averageForButtonArray[0][1], averageForButtonArray[0][2], averageForButtonArray[0][3], averageForButtonArray[0][4], averageForButtonArray[0][5], averageForButtonArray[1][0], averageForButtonArray[1][1], averageForButtonArray[1][2], averageForButtonArray[1][3], averageForButtonArray[1][4], averageForButtonArray[1][5], averageForButtonArray[2][0], averageForButtonArray[2][1], averageForButtonArray[2][2], averageForButtonArray[2][3], averageForButtonArray[2][4], averageForButtonArray[2][5], averageForButtonArray[3][0], averageForButtonArray[3][1], averageForButtonArray[3][2], averageForButtonArray[3][3], averageForButtonArray[3][4], averageForButtonArray[3][5], averageForButtonArray[4][0], averageForButtonArray[4][1], averageForButtonArray[4][2], averageForButtonArray[4][3], averageForButtonArray[4][4], averageForButtonArray[4][5], averageForButtonArray[5][0], averageForButtonArray[5][1], averageForButtonArray[5][2], averageForButtonArray[5][3], averageForButtonArray[5][4], averageForButtonArray[5][5], averageForButtonArray[6][0], averageForButtonArray[6][1], averageForButtonArray[6][2], averageForButtonArray[6][3], averageForButtonArray[6][4], averageForButtonArray[6][5], averageForButtonArray[7][0], averageForButtonArray[7][1], averageForButtonArray[7][2], averageForButtonArray[7][3], averageForButtonArray[7][4], averageForButtonArray[7][5], averageForButtonArray[8][0], averageForButtonArray[8][1], averageForButtonArray[8][2], averageForButtonArray[8][3], averageForButtonArray[8][4], averageForButtonArray[8][5], averageForButtonArray[9][0], averageForButtonArray[9][1], averageForButtonArray[9][2], averageForButtonArray[9][3], averageForButtonArray[9][4], averageForButtonArray[9][5], averageForButtonArray[10][0], averageForButtonArray[10][1], averageForButtonArray[10][2], averageForButtonArray[10][3], averageForButtonArray[10][4], averageForButtonArray[10][5], averageForButtonArray[11][0], averageForButtonArray[11][1], averageForButtonArray[11][2], averageForButtonArray[11][3], averageForButtonArray[11][4], averageForButtonArray[11][5]))
print("\n")

# Pairwise_tukeyhsd
mc = MultiComparison(valuesQueue, namesQueue)
result = mc.tukeyhsd()

print(result)
print("\nGroups-unique: ", mc.groupsunique)
