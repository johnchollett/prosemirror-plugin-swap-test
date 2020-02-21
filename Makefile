clean:
	rm -rf node_modules .cache dist build
install:
	npm install
watch:
	npx parcel --port 8888 index.html