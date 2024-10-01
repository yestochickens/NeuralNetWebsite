import sys
import os

# Activate the virtual environment
activate_this = "/home/linuxuser/.local/share/virtualenvs/html-NW9Setf-/bin/activate_this.py"
with open(activate_this) as file:
    exec(file_.read(), dict(__file__=activate_this))

# Add the application directory to the Python path
sys.path.insert(0, "/var/www/html")

from app import app as application  # Import your Flask app
