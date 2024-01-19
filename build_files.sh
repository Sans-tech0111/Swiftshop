echo "START"
sudo apt-get install libsqlite3-dev
python3.9 -m pip install -r requirements.txt
python3.9 manage.py collectstatic --noinput --clear
echo "END"
