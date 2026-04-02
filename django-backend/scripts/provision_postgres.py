import psycopg2


def main() -> None:
    conn = psycopg2.connect(
        host="localhost",
        port=5432,
        dbname="postgres",
        user="postgres",
        password="postgres",
    )
    conn.autocommit = True

    with conn.cursor() as cur:
        cur.execute("SELECT 1 FROM pg_roles WHERE rolname = 'projectpilot_user'")
        role_exists = cur.fetchone() is not None
        if role_exists:
            cur.execute("ALTER ROLE projectpilot_user WITH LOGIN PASSWORD 'password'")
        else:
            cur.execute("CREATE ROLE projectpilot_user LOGIN PASSWORD 'password'")

        cur.execute("SELECT 1 FROM pg_database WHERE datname = 'projectpilot'")
        db_exists = cur.fetchone() is not None
        if not db_exists:
            cur.execute("CREATE DATABASE projectpilot OWNER projectpilot_user")
        else:
            cur.execute("ALTER DATABASE projectpilot OWNER TO projectpilot_user")

        cur.execute("GRANT ALL PRIVILEGES ON DATABASE projectpilot TO projectpilot_user")

    conn.close()
    print("db-provisioned")


if __name__ == "__main__":
    main()
