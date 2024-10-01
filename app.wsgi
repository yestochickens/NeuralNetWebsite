import sys

sys.path.insert(0, "/var/www/html")

activate_this = "/home/linuxuser/.local/share/virtualenvs/html-NW9Setf-/bin/activate_this.py"

with open(activate_this) as file:
    exect(file_.read(), dict(__file)__=activate_this)

from app import app as application