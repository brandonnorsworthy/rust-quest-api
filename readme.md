Rust Quest API

# docker instructions
## stand docker up
initializes a postgres database with the schema and data from the sql script
the sql script is /database/init.sql
```bash
docker-compose up -d
```

## tear docker down
you probably want to do this to reinitialize the database with the sql script
```bash
docker compose down -v
```