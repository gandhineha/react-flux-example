# Setup

1. Build web binary
```bash
go get web
```
2. Install web dependencies
```bash
npm install -g webpack
npm install -g bower
npm install -g react-tools
npm install
bower install
```

3. Build web project
```bash
cd src/web/webpack-sample
npm install
npm run build
```

4. Run web application
```bash
./bin/web
```

5. Browse to http://localhost:8001/web/
