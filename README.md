## Phishing app frontend

Build the docker container
```
docker build -t react-app .
```

Run the react app container in docker
```
docker run -p 3000:3000 react-app
```

Some of the known issues to fix:
1. API response error handling. Need to add central error handling for RTK query. The error handler should also redirect to login page when 401 status is received.
