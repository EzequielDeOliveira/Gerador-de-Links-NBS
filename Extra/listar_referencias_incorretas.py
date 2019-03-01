import pandas as pd
from slugify import slugify
import string
import re


file = 'NBS-e-NEBS-em-excel.xlsx'

xl = pd.ExcelFile(file)
nebs = xl.parse('NEBS')
pattern = re.compile(r'([0-9]{1}\.[0-9]{2}([0-9]{2})?(\.[0-9])?([0-9])?(\.[0-9]{2})?)')

nbsCodeDescDict = {'1':'Nomenclatura Brasileira de Serviços'}


for a in range(len(nebs)):
    nbsCodeDescDict[nebs.NBS2.get(a)] = nebs.DESCRIÇÃO.get(a)
    

for a in range(len(nebs)):
    # print(nebs.NEBS.get(a))
    if isinstance(nebs.NEBS.get(a), str):
        for number in re.findall(pattern, nebs.NEBS.get(a)):
            if number[0] not in nbsCodeDescDict: 
                code = number[0]
                if len(code) == 6:
                    code = code + ".00.00"
                elif len(code) == 8:
                    code = code + "0.00"
                elif len(code) == 9:
                    code = code + ".00"
                
                if code not in nbsCodeDescDict:
                    print("Código NBS " + number[0] + " encontrado na NEBS da NBS " + nebs.NBS2.get(a) + " nâo existe ")


