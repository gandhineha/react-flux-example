CGO_ENABLED=0 GOOS=linux go build -o bin/web.linux -a -tags netgo -ldflags '-w' web
