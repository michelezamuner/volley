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
	@npm install

ci:
	@npm run ci