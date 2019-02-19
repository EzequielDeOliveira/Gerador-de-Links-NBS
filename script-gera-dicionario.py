import pandas as pd
from slugify import slugify
import string


file = 'NBS-e-NEBS-em-excel.xlsx'

xl = pd.ExcelFile(file)
nebs = xl.parse('NEBS')

nbsCodeDescDict = {'1':'Nomenclatura Brasileira de Serviços'}


i = 0
for a in range(len(nebs)):
    i += 1
    nbsCodeDescDict[nebs.NBS2.get(a)] = nebs.DESCRIÇÃO.get(a)


arq = open('nbs-linker.js','a')

arq.write('const nbsMapping = {\n')


for node in nbsCodeDescDict:
    for letter in nbsCodeDescDict[node]:
        if letter == "\"":
            nbsCodeDescDict[node] = nbsCodeDescDict[node].replace(letter,"")
    arq.write("\"" + node + '\" : [' + "\"" + nbsCodeDescDict[node] + "\", \"" + slugify(nbsCodeDescDict[node]) + "\"]")
    if node != '1.2606.00.00':
        arq.write(',')
    arq.write('\n')
arq.write('}\n\n')

code = open('nbs-linker-parcial.js').read()
arq.write(code)

arq.close()
