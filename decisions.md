# Decisions

## Fri 15 Apr, 2016

- revert to using karma with tape and electron, because of a need to test
the canvas element
- prettify a little :/

## Thur 14 Apr, 2016

- looked at generators for async nature of retrieving the tiles
- used async/await instead

## Wed 13 Apr, 2016

- decided to use es2015 syntax, hence Babel
- use webpack to bundle the source

### Testing

- [ava](https://github.com/sindresorhus/ava): super easy to setup and use for testing. maybe use `jsdom` to simulate browser environment.