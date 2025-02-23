import os
from flask import Flask, send_from_directory, request, redirect, url_for, render_template_string
from flask_mail import Mail, Message
from dotenv import load_dotenv
load_dotenv()
app = Flask(__name__, static_folder=os.path.join(os.pardir, "client"))

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv('EMAIL')
app.config['MAIL_PASSWORD'] = os.getenv('PASS')
mail = Mail(app)  # Initialize Flask-Mail



@app.route('/')
def serve_index():
    return send_from_directory(os.path.join(os.pardir, "client"), 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory(os.path.join(os.pardir, "client"), filename)

@app.route('/submit-form', methods=['POST'])
def submit_form():
    name = request.form.get('name')
    email = request.form.get('email')
    message = request.form.get('message')

    # if not name or not email or not message:
    #     return "Come on! You missed something. All fields are required.", 400 #bad request

    msg = Message(
        subject=f"New Contact Form Submission from {name}",
        sender=app.config['MAIL_USERNAME'],  # Your Gmail (avoid using user's email)
        recipients=['sagarkarki9731@gmail.com'],  # Your email where messages are received
        body=f"Name: {name}\nEmail: {email}\nMessage: {message}"
    )

    try:
        mail.send(msg)
        return render_template_string("""
                <html>
                    <body>
                        <h1>Thank you for contacting me, {{ name }}!</h1>
                        <p>I will get back to you soon.</p>
                        <a href="/">Go back to portfolio</a>
                    </body>
                </html>
            """, name=name)
    except Exception as e:
        return f"Error sending email: {str(e)}", 500  # Internal Server Error

if __name__ == '__main__':
    app.run(debug=True)
