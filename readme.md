
# Links

* https://actix.rs/docs/getting-started/
* https://actix.rs/docs/databases
    + https://actix.rs/docs/autoreload
    + Postgres: https://github.com/actix/examples/tree/master/databases/postgres
        - Macos Homebrew:  `brew install postgresql@15`
            - see: https://www.moncefbelyamani.com/how-to-install-postgresql-on-a-mac-with-homebrew-and-lunchy/
            - see:  https://www.postgresql.org/download/macosx/
            - Docu: https://www.postgresql.org/docs/current/index.html
* Diesel ORM
    + https://diesel.rs/guides/getting-started

* https://blog.ediri.io/building-a-restful-api-with-actix-web-and-diesel-for-persistent-data-storage

* https://codevoweb.com/build-a-simple-api-with-rust-and-actix-web/#conclusion

---

# Setup Docker

* Repository aus clonen: 
* `cd docker`
* `docker-compose up -d`

DB Setup:
Adminer: `localhost:8081`
  Server: rust-postgres
  User:   postgres
  Password: example
Links "Importieren" Datei "backup_users.sql" und "AusfÃ¼hren" klicken.
DB "Postgres" enthÃ¤lt nun eine "Users" Tabelle
==> DB Einrichten erledigt.

---

Docker starten:

* `docker exec -it 006b32426a14 sh`

* Docker Workdir: `cargo install --path .`

* `cargo run` (Der erste Aufruf nach Setup geht evtl. schief)

---



## Setup Alternative Postgres on MacOs via Homebrew

* `brew install postgresql@15`

```bash
This formula has created a default database cluster with:
  initdb --locale=C -E UTF-8 /opt/homebrew/var/postgresql@15
For more details, read:
  https://www.postgresql.org/docs/15/app-initdb.html

postgresql@15 is keg-only, which means it was not symlinked into /opt/homebrew,
because this is an alternate version of another formula.

If you need to have postgresql@15 first in your PATH, run:
  echo 'export PATH="/opt/homebrew/opt/postgresql@15/bin:$PATH"' >> ~/.zshrc

For compilers to find postgresql@15 you may need to set:
  export LDFLAGS="-L/opt/homebrew/opt/postgresql@15/lib"
  export CPPFLAGS="-I/opt/homebrew/opt/postgresql@15/include"

For pkg-config to find postgresql@15 you may need to set:
  export PKG_CONFIG_PATH="/opt/homebrew/opt/postgresql@15/lib/pkgconfig"

To start postgresql@15 now and restart at login:
  brew services start postgresql@15
Or, if you don't want/need a background service you can just run:
  LC_ALL="C" /opt/homebrew/opt/postgresql@15/bin/postgres -D /opt/homebrew/var/postgresql@15
==> Summary
ðŸº  /opt/homebrew/Cellar/postgresql@15/15.4: 3,698 files, 61.5MB
==> Running `brew cleanup postgresql@15`...
```