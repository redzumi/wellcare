# wellcare

## install

```
yarn
yarn bootstrap
# just for typings from api / core / etc
yarn build --ignore web
```

```
# build and run mongo:
docker run -d -p 127.0.0.1:27017:27017 --name wellcare-db mongo
# or start
docker start wellcare-db
```

```MOBILE_BREAKPOINT is 920```

# eslint vscode

```
{
 "eslint.workingDirectories": [
   "packages/web/src"
 ]
}
```

### TODO: 
```
1. use classnames
2. throttle for window resize
```