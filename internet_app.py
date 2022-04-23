#Dependencies
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import numpy as np
import pandas as pd
import json
from flask import Flask, jsonify,render_template

 # Create engine using the database file
engine = create_engine("sqlite:///Resources/internet.sqlite")

#Reflect Database
Base = automap_base()
Base.prepare(engine, reflect = True)

#Create session
session = Session(engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

# API Pages
@app.route("/api/dashboard")
def api_overview():
    dbConnect = engine.connect()
    df = pd.read_sql('select * from internet_with_countrycodes', dbConnect)
    json_overview = json.loads(df.to_json(orient='records'))
    dbConnect.close()
    return jsonify(json_overview)

#################################################
# HTML Routes
#################################################

# @app.route('/html')
# def index():
#     return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)
