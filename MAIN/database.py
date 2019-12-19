# ===========
#   Imports
# ===========
import sqlite3 as sql

# ========================
#  Connecting to database
# ========================
conn = sql.connect("test.db")
cur = conn.cursor()

# =================
#  Query execution
# =================
query = ('''CREATE TABLE USERS11
    (fname TEXT NOT NULL,
     lname TEXT NOT NULL,
     gender TEXT NOT NULL,
     bday TEXT NOT NULL,
     email TEXT Primary key,
     username TEXT NOT NULL,
     psw TEXT NOT NULL,
     contact  INT);''')
cur.execute(query)

# ================================
#  Closing connection to database
# ================================
conn.close()
