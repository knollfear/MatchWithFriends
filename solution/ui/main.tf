provider "aws" {
  region  = "us-east-1"
}

module "static_site" {
  source = "USSBA/static-website/aws"
  version = "~> 4.0"


  domain_name = "fnwf.knollfear.com"
  acm_certificate_arn = "arn:aws:acm:us-east-1:040343200390:certificate/a1f5bd4b-0110-497e-b244-fb3dfb56f059"

  # Optional
  hosted_zone_id = "Z0323898HN01KM7UWL5Z"
  default_subdirectory_object = "index.html"
  hsts_header = "max-age=31536000"
}
