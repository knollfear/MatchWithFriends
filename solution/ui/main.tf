provider "aws" {
  region  = "us-east-1"
}

module "static_site" {
  source = "USSBA/static-website/aws"
  version = "~> 4.0"


  domain_name = "mwf.knollfear.com"
  acm_certificate_arn = "arn:aws:acm:us-east-1:040343200390:certificate/35747686-dc63-47e3-876b-abb5c9202749"

  # Optional
  hosted_zone_id = "Z0323898HN01KM7UWL5Z"
  default_subdirectory_object = "index.html"
  hsts_header = "max-age=31536000"
}
