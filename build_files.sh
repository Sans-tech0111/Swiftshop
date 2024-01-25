echo "START"


PYTHON_PATH=$(which python3.10.7)


if [ -z "$PYTHON_PATH" ]; then
    echo "Python 3.10.7 not found. Make sure it's installed and in your PATH."
    exit 1
fi

$PYTHON_PATH -m pip install -r requirements.txt
$PYTHON_PATH manage.py collectstatic --noinput --clear
$PYTHON_PATH manage.py makemigrations
$PYTHON_PATH manage.py migrate

echo "END"
