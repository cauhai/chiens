# chiens

Showing some dog breeds. User can search by breed name by entering the name or any part of the name.

Data are from public API at `https://docs.thedogapi.com`

## DEV setup
We need Node version 14. Higher version not tested yet.

```
git clone https://github.com/cauhai/chiens.git
cd chiens
npm install  // on Windows, may have to run npm clean-install
npm start
```

Visit `http://localhost:8080`

Try to search for something like `hound`, `german`, `ca`, or just one letter `a`

# Build
`npm run build` will build into `dist` folder. We can test with

`npx serve -d dist -p 8080`

and check `http://localhost:8080`
