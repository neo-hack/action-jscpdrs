# action-jscpdrs
> a action to detect copy/paste

## usage

```yaml
name: "cpd"
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

it will create issue contain `copy/paste` code.

## develop


```console
yarn build
git add .
git push
```
