from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

@app.route("/api/employees", methods=["GET", "POST"])
def handle_employees():
    conn = sqlite3.connect("database.db")
    cur = conn.cursor()
    if request.method == "POST":
        data = request.json
        cur.execute("INSERT INTO employees (name, max_hours) VALUES (?, ?)", (data["name"], data["max_hours"]))
        conn.commit()
        return jsonify({"status": "ok"})
    else:
        cur.execute("SELECT id, name, max_hours FROM employees")
        employees = [dict(id=row[0], name=row[1], max_hours=row[2]) for row in cur.fetchall()]
        return jsonify(employees)

if __name__ == "__main__":
    conn = sqlite3.connect("database.db")
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS employees (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            max_hours INTEGER
        )
    """)
    conn.commit()
    conn.close()
    app.run(debug=True)
