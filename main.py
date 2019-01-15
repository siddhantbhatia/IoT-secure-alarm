from flask import Flask, render_template # looks for HTML in templates/ folder

# set current file as app
app = Flask(__name__) # __name__ represents current filename

# http://127.0.0.1:5000/
@app.route("/")
def home():
#    return "Hello, World!"
    return render_template("index.html")

### http://127.0.0.1:5000/cynthia
##@app.route("/cynthia")
##def cynthia():
##    return "Hello, Cynthia"

if __name__ == "__main__":
    app.run(debug=True)
