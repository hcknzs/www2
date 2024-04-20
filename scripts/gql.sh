# if file exists

if [ -f .vercel/.env.development.local ]; then
	source .vercel/.env.development.local
fi

./node_modules/.bin/gql-tada generate-schema $CMS_ENDPOINT --header "authorization: Bearer $CMS_API_TOKEN_READONLY" --header "X-Exclude-Invalid: true" --header "X-Include-Drafts: true"
