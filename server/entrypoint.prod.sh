#!/bin/sh

# Wait until Postgres is ready
while ! nc -z db 5432; do
    sleep 1
done

python manage.py migrate

# Populate the database if it's empty
if [ "$(python manage.py count_users)" = "0" ]; then
    echo "Populating database..."
    python manage.py flush --no-input
    python manage.py loaddata fixture.json
fi

python manage.py runserver 0.0.0.0:8000

exec "$@"
