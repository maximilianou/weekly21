
create-ui:
	npx create-react-app ui --template typescript	
run-ui:
	cd ui && npm run start

ghcr:
	docker login ghcr.io --username maximilianou #cat ~/personal_full.github
ghcr-curl:
	docker pull appropriate/curl:latest 
ghcr-push:
	docker tag appropriate/curl:latest ghcr.io/maximilianou/curl:latest
	docker push ghcr.io/maximilianou/curl:latest
ghcr-pull:
	docker pull ghcr.io/maximilianou/curl:latest # public image

deploy:
	docker-compose -f docker-compose.yml up -d
undeploy:
	docker-compose -f docker-compose.yml down

#deploy-aws:
#	docker compose --context myecscontext -f docker-compose.yml up
#undeploy-aws:
#	docker compose --context myecscontext -f docker-compose.yml down


