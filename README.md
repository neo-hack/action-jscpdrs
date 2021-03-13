# spring-catponents/action-jscpdrs
> a action to detect copy/paste

## usage

```yaml
name: "units-test"
on: [push]

jobs:
  # test action works running from the graph
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: spring-catponents/action-jscpdrs@v1
      with:
        repotoken: ${{ secrets.GITHUB_TOKEN }}
```

## develop


```console
yarn build
git add .
git push
```