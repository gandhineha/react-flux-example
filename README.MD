# Setup

1.  Build web binary
```bash
export GOPATH=$PWD
go get web
```
2.  Install web dependencies
```bash
npm install -g webpack
npm install -g bower
npm install -g react-tools
npm install
bower install
```

3.  Build web project
```bash
cd src/web/webpack-sample
npm install
bower install
npm run deploy
```

4.  Run web application
```bash
cd -
./bin/web -content-directory=./src/web/webpack-sample/dist/
```

5.  Open multiple browser windows http://localhost:8001/web/
