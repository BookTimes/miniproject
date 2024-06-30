import mysql.connector as ms
import eel
import csv

eel.init('public')

db = ms.connect(host="localhost" , user='root' , password='divya123',database='canteen')
c = db.cursor()
order = {}
csv_file = 'chayapediaSales.csv'


@eel.expose
def dat(cat) : 
    c.execute('select * from ' + cat)
    l = c.fetchall()
    k = []
    for i in l:
        o =[]
        for w in i :
            o.append(str(w))
        k.append(o)

    return k
@eel.expose
def placeinOrder(code , cat):
    print(code,cat)
    c.execute('select NameOfproduct,Unitprice from ' + cat + " where productcode =" + code)
    j = list(c.fetchone())
    print(j)
    l = j.pop()
    l = float(l)
    j.append(l)
    if (j[0] not in order.keys()):
     order[j[0]] = [j[1],1]
    else:
       order[j[0]][0] += j[1]
       order[j[0]][1] += 1
    
@eel.expose
def getorder():
   return order

@eel.expose
def clo():
     global order
     order = {}

@eel.expose
def ordernow():
    

    with open(csv_file, 'a', newline='') as file:
        writer = csv.writer(file)
        
        # Write the header
        writer.writerow(['Item', 'Price', 'Quantity', 'Total'])
        
        # Write the data
        for item, values in order.items():
            price, quantity = values
            total = price * quantity
            writer.writerow([item, price, quantity, total])


@eel.expose
def edf():
    total_sales = 0

    with open(csv_file, 'r') as file:
        reader = csv.reader(file)
        next(reader)  # Skip header row
        for row in reader:
            total = float(row[3])
            total_sales += total
    
    return total_sales

eel.start('index.html' ,size=(1114,654) )