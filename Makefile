.PHONY: build ssh run ci

root=$(shell pwd)

clean:
	@docker image ls | grep volley >/dev/null && docker image rm volley

build:
	@docker image ls | grep volley >/dev/null || docker build -t volley .

ssh: build
	@docker run -ti --rm -v $(root):/app:delegated volley bash

run:
	@docker run --rm volley

install:
	@yarn install

web\:compile:
	@lib/.bin/browserify src/simulation-context/adapters/clients/web/main/main.js -o dist/bundle.js -s main

ci:
	@yarn run ci