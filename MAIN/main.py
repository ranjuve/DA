# ===========
#   Imports
# ===========

from flask import Flask, render_template, request, redirect, url_for, jsonify
import sqlite3 as sql
from flask_cors import CORS, cross_origin

# ===================
#   Flask instance
# ===================
app = Flask(__name__)

# ======================
#   Allow Cross Origin
# ======================
@app.after_request # blueprint can also be app~~
def after_request(response):
    header = response.headers
    header['Access-Control-Allow-Origin'] = '*'
    return response


# ==================================
#  Insert data in database (SIGNUP)
# ==================================
def insertUser(fname,lname,gender,bday,email,username,psw,contact):
    con = sql.connect("test.db")
    cur = con.cursor()
    phone = int(contact)
    
    query = ("""INSERT INTO USERS11
             (fname,lname,gender,bday,email,username,psw,contact)
             VALUES ('%s','%s','%s',%s,'%s','%s','%s','%d')""" %
             (fname,lname,gender,bday,email,username,psw,phone))
    cur.execute(query)
    con.commit()
    con.close()


# =====================================
#  Validating data in database (LOGIN)
# =====================================
def validUser(email, psw):
    con = sql.connect("test.db")
    cur = con.cursor()
    print(email)
    print(psw)
    query = ("""SELECT * FROM USERS11
             where email = '%s' and psw = '%s'
             """ %
             (email, psw))
    cur.execute(query)
    data = cur.fetchall()
    con.close()
    print(data)
    return data


# ===================
#    Flask Routing
# ===================

@app.route('/')
def home():
    return "go at /signin or /signup"

# Login page
@app.route('/signin/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        rd = validUser(request.form['email'], request.form['psw'])
        if rd:
            return "Successful Login"
        else:
            return "UnSuccessful login"
    else:
        return render_template('index2.html')


# Signup page
@app.route('/signup/', methods=['GET','POST'])
def signup():
    
        if request.method == 'POST':
            fname = request.form['fname']
            lname = request.form['lname']
            gender = request.form['gender']
            bday = request.form['bday']
            
            email = request.form['email']
            username = request.form['username']
            psw = request.form['psw']
            contact = request.form['phone']
            
            
          
        #prob = request.form.getlist['prob']
      
        #habits = request.form.getlist['habits']
       
        #remember = request.form.get['remember']
            
            insertUser(fname,lname,gender,bday,email,username,psw,contact)
            return redirect(url_for('login'))
        else:
            return render_template('index.html')
    

#second.html page
@app.route('/signup/sec/',methods=['GET','POST'])
def second():
    if request.method == 'POST':
        return redirect(url_for('container'))
    else:
        return render_template('second.html')

    
'''  fname = request.form['fname']
        lname = request.form['lname']
        gender = request.form['gender']
        bday = request.form['bday']
        country = request.form['country']
        city = request.form['city']
        email = request.form['email']
        username = request.form['username']
        psw = request.form['psw']
        contact = request.form['contact']
        handw = request.form['handw']
        psychic = request.form['psychic']
        physical = request.form['physical']
        none1 = request.form['none1']
        yoga = request.form['yoga']
        meditate = request.form['meditate']
        smoke = request.form['smoke']
        drink = request.form['drink']
        ecs = request.form['ecs']
        none2 = request.form['none2']
        remember = request.form['remember']
        l=[fname,lname,gender,bday,country,city,email,username,psw,contact,handw,psychic,physical,none1,yoga,meditate,smoke,drink,ecs,none2,remember]
        print(l)
        insertUser(fname,lname,gender,bday,country,city,email,username,psw,contact,handw,psychic,physical,none1,yoga,meditate,smoke,drink,ecs,none2,remember) '''

    
# api json 
@app.route('/sum', methods=['GET','POST'])
def sum():
    sum = 0
    a = int(request.args.get('a'))
    b = int(request.args.get('b'))
    sum = a+b
    return jsonify(sum)


# Always at end of file !Important!
if __name__ == '__main__':
    app.secret_key = 'SURAJ_SECRET_KEY'
    app.debug = True
    app.run(host='localhost', port=5000)
