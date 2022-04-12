npm run build
aws s3 sync ./dist s3://fnwf.knollfear.com-static-content
aws cloudfront create-invalidation --distribution-id E145H1C59HUA57 --paths "/*"
