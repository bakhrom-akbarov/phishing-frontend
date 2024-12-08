## Phishing app frontend

Run backend server and MongoDB in docker-compose
```
yarn start:docker
```

Some of the known issues to fix:
1. API response error handling. Need to add central error handling for RTK query. The error handler should also redirect to login page when 401 status is received.
